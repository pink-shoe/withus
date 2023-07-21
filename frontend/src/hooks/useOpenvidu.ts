import { OpenVidu } from 'openvidu-browser';
// import { getToken } from '../utils/api/openviduApi';
import { getToken } from 'apis/openviduApi';
import { useCallback, useEffect, useMemo, useState } from 'react';
export interface IUser {
  connectionId: string;
  audioActive: boolean;
  videoActive: boolean;
  screenShareActive: boolean;
  nickname: string;
  streamManager?: any;
  type: string;
}
const isAudioActive = (user: IUser) => {
  return user.audioActive;
};

const isVideoActive = (user: IUser) => {
  return user.videoActive;
};

const isScreenShareActive = (user: IUser) => {
  return user.screenShareActive;
};

const getConnectionId = (user: IUser) => {
  return user.connectionId;
};

const getNickname = (user: IUser) => {
  return user.nickname;
};

const getStreamManager = (user: IUser) => {
  return user.streamManager;
};

const isLocal = (user: IUser) => {
  return user.type === 'local';
};
const isRemote = (user: IUser) => {
  return !isLocal(user);
};
const setAudioActive = (user: IUser, isAudioActive: boolean) => {
  user.audioActive = isAudioActive;
  return user;
};
const setVideoActive = (user: IUser, isVideoActive: boolean) => {
  user.videoActive = isVideoActive;
  return user;
};

const setScreenShareActive = (user: IUser, isScreenShareActive: boolean) => {
  user.screenShareActive = isScreenShareActive;
  return user;
};
const setStreamManager = (user: IUser, streamManager: any) => {
  user.streamManager = streamManager;
  return user;
};

const setConnectionId = (user: IUser, conecctionId: string) => {
  user.connectionId = conecctionId;
  return user;
};
const setNickname = (user: IUser, nickname: string) => {
  user.nickname = nickname;
  return user;
};
const setType = (user: IUser, type: string) => {
  if (type === 'local' || type === 'remote') {
    user.type = type;
  }
  return user;
};
export const useOpenvidu = (userId: number, gameRoomId: string) => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [publisher, setPublisher] = useState<any>();
  const [session, setSession] = useState<any>();

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
          { streamManager: subscriber, userId: +data.userId },
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
        .connect(
          token,
          // { clientData: userId }
          JSON.stringify({ userId })
        )
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

  const streamList = useMemo(
    () => [{ streamManager: publisher, userId }, ...subscribers],
    [publisher, subscribers, userId]
  );

  return {
    publisher,
    streamList,
    onChangeCameraStatus,
    onChangeMicStatus,
  };
};

export {
  isAudioActive,
  isLocal,
  isRemote,
  isScreenShareActive,
  isVideoActive,
  getConnectionId,
  getNickname,
  getStreamManager,
  getToken,
  setAudioActive,
  setConnectionId,
  setNickname,
  setScreenShareActive,
  setStreamManager,
  setType,
  setVideoActive,
};
