import React, { FC } from 'react';
import { useRef } from 'react';
// import { useFaceMask } from "../../hooks/useFaceMesh";
import { StreamManager } from 'openvidu-browser';
import { useStream } from '../hooks/useStream';
import { VideoStreamBox } from './VideoStreamBox';
// import { Box, Tooltip, Typography, useTheme } from "@mui/material";
// import { useSelector } from 'react-redux';

interface IProps {
  streamManager: StreamManager;
  name: string;
  me: boolean;
}

export const VideoStream: FC<IProps> = ({ streamManager, name, me }) => {
  const { videoRef, speaking, micStatus, videoStatus } = useStream(streamManager);

  return (
    <VideoStreamBox
      name={name}
      speaking={speaking}
      micStatus={micStatus}
      videoStatus={videoStatus}
      me={me}
    >
      <video
        autoPlay={true}
        id='streamVideo'
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          objectFit: 'cover',
        }}
      />
    </VideoStreamBox>
  );
};
