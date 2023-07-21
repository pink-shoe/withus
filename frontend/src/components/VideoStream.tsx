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
  balance?: boolean;
}

export const VideoStream: FC<IProps> = ({ streamManager, name, me, balance }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { videoRef, speaking, micStatus, videoStatus } = useStream(streamManager);
  //   useFaceMask(videoRef.current, canvasRef.current, avatarPath);

  //   const theme = useTheme();

  //   const balanceA = useSelector((state: any) => state.meeting.balanceA);
  //   const balanceB = useSelector((state: any) => state.meeting.balanceB);

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
      {/* <canvas
        id='faceCanvas'
        ref={canvasRef}
        tabIndex={1}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          objectFit: 'cover',
          borderRadius: '10px',
          backgroundImage: `url(가상배경.png)`,
        }}
      /> */}

      {/* {balance !== undefined && (
        <div>
          <div>
            <div>{balance ? 'A' : 'B'}</div>
          </div>
        </div>
      )} */}
    </VideoStreamBox>
  );
};
