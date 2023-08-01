import { FC } from 'react';
import { StreamManager } from 'openvidu-browser';
import { useStream } from '../hooks/useStream';
import { VideoStreamBox } from './VideoStreamBox';
// import { useSelector } from 'react-redux';

interface IVideoStreamProps {
  streamManager: StreamManager;
  name: string;
  isMe: boolean;
}

export const VideoStream: FC<IVideoStreamProps> = ({ streamManager, name, isMe }) => {
  const { videoRef, speaking, micStatus, videoStatus } = useStream(streamManager);

  return (
    <VideoStreamBox
      name={name}
      speaking={speaking}
      micStatus={micStatus}
      videoStatus={videoStatus}
      isMe={isMe}
    >
      <video
        autoPlay={true}
        id='streamVideo'
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '0px',
          objectFit: 'contain',
        }}
      />
    </VideoStreamBox>
  );
};
