import { OpenVidu } from 'openvidu-browser';
import { getToken } from 'apis/openviduApi';
import { useCallback, useEffect, useMemo, useState } from 'react';
export interface IUser {
  connectionId: string;
  userId: number;
  streamManager?: any;
}

const getConnectionId = (user: IUser) => {
  return user.connectionId;
};

const setConnectionId = (user: IUser, conecctionId: string) => {
  user.connectionId = conecctionId;
  return user;
};

export const useOpenvidu = (userId: number, gameRoomId: number) => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [publisher, setPublisher] = useState<any>();
  const [session, setSession] = useState<any>();
  const [userName, setUserName] = useState<string>('name' + userId);
  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }
    setSession(null);
    setPublisher(null);
    setSubscribers([]);
  }, [session]);

  useEffect(() => {
    const openVidu = new OpenVidu();
    let session = openVidu.initSession();

    session.on('streamCreated', (event) => {
      const subscriber = session.subscribe(event.stream, '');
      const data = JSON.parse(event.stream.connection.data);
      setSubscribers((prev) => {
        return [
          ...prev.filter((it) => it.userId !== +data.userId),
          { streamManager: subscriber, userId: +data.userId, userName: 'name' + data.userId },
        ];
      });
    });

    session.on('streamDestroyed', (event) => {
      event.preventDefault();

      const data = JSON.parse(event.stream.connection.data);
      setSubscribers((prev) => prev.filter((it) => it.userId !== +data.userId));
    });

    session.on('exception', (exception) => {
      console.warn(exception);
    });

    getToken(String(gameRoomId)).then((token) => {
      console.log(gameRoomId, token);
      session!
        .connect(token, JSON.stringify({ userId }))
        .then(async () => {
          await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          const devices = await openVidu.getDevices();
          const videoDevices = devices.filter((device) => device.kind === 'videoinput');

          const publisher = openVidu.initPublisher('', {
            audioSource: undefined,
            videoSource: videoDevices[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: false,
          });

          setPublisher(publisher);
          session.publish(publisher);
        })
        .catch((error) => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    });

    setSession(session);

    return () => {
      if (session) {
        session.disconnect();
      }
      setSession(null);
      setPublisher(null);
      setSubscribers([]);
    };
  }, [gameRoomId, userId]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => leaveSession());
    return () => {
      window.removeEventListener('beforeunload', () => leaveSession());
    };
  }, [leaveSession]);

  const onChangeCameraStatus = useCallback(
    (status: boolean) => {
      publisher?.publishVideo(status);
    },
    [publisher]
  );

  const onChangeMicStatus = useCallback(
    (status: boolean) => {
      publisher?.publishAudio(status);
    },
    [publisher]
  );

  const onChangeUserName = useCallback(
    (nickname: string) => {
      setUserName(nickname!);
      console.log(publisher);
      // sendSignalUserChanged({ nickname: nickname! });
    },
    [userName]
  );

  const sendMessage = (message: string) => {
    if (session && publisher && message) {
      let msg = message.replace(/ +(?= )/g, '');
      if (msg !== '' && msg !== ' ') {
        {
          session
            .signal({
              data: JSON.stringify({
                message: message,
                nickname: userName,
                streamId: publisher.stream.streamId,
              }),
              type: 'chat',
            })
            .then(() => {
              console.log('Message successfully sent');
            })
            .catch((err: any) => {
              console.error(err);
            });
        }
      }
    }
  };

  const receiveMessage = useCallback(
    (messageList: any[]) => {
      if (session && publisher) {
        let msgList = messageList;
        session
          .on('signal:chat', (e: any) => {
            console.log(e.data);
            console.log(e.from);
            console.log(e.type);
            // const data = JSON.parse(e.data);
            // msgList.push({
            //   connectionId: e.from.connectionId,
            //   nickname: data.nickname,
            //   message: data.message,
            // });
          })
          .then(() => {
            console.log('Message successfully received');
          })
          .catch((err: any) => {
            console.error(err);
          });
        // onChangeMsgList(msgList);
        return msgList;
      }
      // return messageList;
    },
    [publisher]
  );

  const streamList = useMemo(
    () => [{ streamManager: publisher, userId, userName }, ...subscribers],
    [publisher, subscribers, userId, userName]
  );

  return {
    session,
    publisher,
    streamList,
    onChangeCameraStatus,
    onChangeMicStatus,
    onChangeUserName,
    receiveMessage,
    sendMessage,
  };
};

export { getConnectionId, getToken, setConnectionId };
