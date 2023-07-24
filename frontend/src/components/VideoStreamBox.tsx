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
      <div className='w-full '>
        <div className='absolute '>
          {name}
          {me && ' (나)'}
        </div>
      </div>
      {children}

      <div>
        {!micStatus && <div style={{ width: '32px', color: 'red' }} />}
        {!videoStatus && <div style={{ width: '32px', color: 'red' }} />}
      </div>
    </div>
  );
};
