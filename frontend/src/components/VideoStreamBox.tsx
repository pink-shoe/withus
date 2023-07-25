import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneSlash, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
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
  return (
    <div className='w-full h-full'>
      {children}
      <div className=' px-3 relative bottom-7 h-7 text-white flex justify-between bg-transparent bg-blue-700 bg-opacity-50'>
        <div className='h-7  leading-7'>
          {name}
          {me && ' (나)'}
        </div>
        <div>
          {!micStatus ? (
            <FontAwesomeIcon icon={faMicrophoneSlash} color={'red'} fontSize={'16px'} />
          ) : (
            <></>
          )}
          {!videoStatus ? (
            <FontAwesomeIcon icon={faVideoSlash} color={'red'} fontSize={'16px'} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
