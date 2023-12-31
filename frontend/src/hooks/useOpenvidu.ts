import { OpenVidu } from 'openvidu-browser';
import { getToken } from 'apis/openviduApi';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { exitRoomApi } from 'apis/roomApi';
import { useNavigate } from 'router';
export interface IUser {
  connectionId: string;
  userId: number;
  streamManager?: any;
}
export type signalType =
  | 'ENTER'
  | 'EXIT'
  | 'CHAT'
  | 'READY'
  | 'CANCEL_READY'
  | 'UPDATE'
  | 'START'
  | 'ROUND'
  | 'NEXTROUND'
  | 'GAMEEND';

export interface IStreamList {
  streamManager: any;
  userId: number;
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
  const navigate = useNavigate();
  const leaveSession = useCallback(async () => {
    if (session) {
      session.disconnect();
      const result: any = await exitRoomApi(gameRoomId);
      if (result.status <= 300) {
        sendSignal(`${gameRoomId}`, 'EXIT');
        navigate('/lobby');
      }
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
          {
            streamManager: subscriber,
            userId: +data.userId,
            // nickname: data.nickname,
          },
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
      session!
        .connect(token.token, JSON.stringify({ userId }))
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

  const sendSignal = (message: string, type: signalType) => {
    if (session && publisher && message) {
      let msg = message.replace(/ +(?= )/g, '');
      if (msg !== '' && msg !== ' ') {
        {
          session
            .signal({
              data: JSON.stringify({
                message: message,
                userId,
                streamId: publisher.stream.streamId,
              }),
              type,
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

  const streamList: any = useMemo(
    () => [
      {
        streamManager: publisher,
        userId,
      },
      ...subscribers.filter((it) => it.userId !== userId),
    ],
    [publisher, subscribers, userId]
  );

  return {
    session,
    publisher,
    streamList,
    onChangeCameraStatus,
    onChangeMicStatus,
    sendSignal,
  };
};

export { getConnectionId, getToken, setConnectionId };
