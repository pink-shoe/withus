import React, { FC } from 'react';
import { MicOff, VideoOff } from 'react-feather';

interface IVideoStreamBoxProps {
  name: string;
  speaking: boolean;
  micStatus: boolean;
  videoStatus: boolean;
  isMe: boolean;
  children: React.ReactNode;
}

export const VideoStreamBox: FC<IVideoStreamBoxProps> = ({
  name,
  speaking,
  micStatus,
  videoStatus,
  isMe,
  children,
}) => {
  return (
    <div className='w-full h-full'>
      {children}
      <div className='px-3 relative bottom-7 h-7 text-white flex justify-between bg-blue-700 bg-opacity-50'>
        <div className='h-7 leading-7'>
          {name}
          {isMe && ' (나)'}
        </div>
        <div>
          {!micStatus ? (
            // <FontAwesomeIcon
            //   icon={faMicrophoneSlashIconDefinition}
            //   color={'red'}
            //   fontSize={'16px'}
            // />
            <MicOff className='text-red text-2xl' />
          ) : (
            <></>
          )}
          {!videoStatus ? (
            // <FontAwesomeIcon icon={faVideoSlashIconDefinition} color={'red'} fontSize={'16px'} />
            <VideoOff className='text-red text-2xl' />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
