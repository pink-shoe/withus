import React, { FC } from 'react';

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
      <div className=' relative top-[-25px] left-[-5px] pb-3'>
        <div className=' text-right'>
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
