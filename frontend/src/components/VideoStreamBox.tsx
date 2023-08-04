import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMicrophoneSlash, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import { IconLookup, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
interface IVideoStreamBoxProps {
  name: string;
  speaking: boolean;
  micStatus: boolean;
  videoStatus: boolean;
  isMe: boolean;
  children: React.ReactNode;
}
const faMicrophoneSlash: IconLookup = { prefix: 'fas', iconName: 'microphone-slash' };
const faMicrophoneSlashIconDefinition: IconDefinition = findIconDefinition(faMicrophoneSlash);
const faVideoSlash: IconLookup = { prefix: 'fas', iconName: 'video-slash' };
const faVideoSlashIconDefinition: IconDefinition = findIconDefinition(faVideoSlash);

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
          {/* {!micStatus ? (
            <FontAwesomeIcon
              icon={faMicrophoneSlashIconDefinition}
              color={'red'}
              fontSize={'16px'}
            />
          ) : (
            <></>
          )}
          {!videoStatus ? (
            <FontAwesomeIcon icon={faVideoSlashIconDefinition} color={'red'} fontSize={'16px'} />
          ) : (
            <></>
          )} */}
        </div>
      </div>
    </div>
  );
};
