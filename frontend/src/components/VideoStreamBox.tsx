// import { Box } from "@mui/system";
import React, { FC } from 'react';
// import { Typography, useTheme } from "@mui/material";
// import VideocamOffIcon from "@mui/icons-material/VideocamOff";
// import MicOffIcon from "@mui/icons-material/MicOff";

interface IProps {
  name: string;
  speaking: boolean;
  micStatus: boolean;
  videoStatus: boolean;
  me: boolean;
  children: React.ReactNode;
}

export const VideoStreamBox: FC<IProps> = ({
  name,
  speaking,
  micStatus,
  videoStatus,
  me,
  children,
}) => {
  //   const theme = useTheme();
  return (
    <div>
      {children}

      <div>
        <div>
          {name}
          {me && ' (나)'}
        </div>
      </div>

      <div>
        {!micStatus && <div style={{ width: '32px', color: 'red' }} />}
        {!videoStatus && <div style={{ width: '32px', color: 'red' }} />}
      </div>
    </div>
  );
};
