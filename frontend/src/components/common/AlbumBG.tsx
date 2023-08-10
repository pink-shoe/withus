import React, { useCallback, useState } from 'react';
import ButtonComponent from './ButtonComponent';
import UserHeader from './UserHeader';

interface IBackgroundProps {
  children: React.ReactNode;
  onChangePhotoFrame: (Number: number) => void;
  onChangeBackground: (Number: number) => void;
}

export default function AlbumBG({
  children,
  onChangePhotoFrame,
  onChangeBackground,
}: IBackgroundProps) {
  const [photoFrameNumber, setPhotoFrameNumber] = useState(1);
  const [backgroundNumber, setBackgroundNumber] = useState(1);

  const ChangePhotoFrame = useCallback(
    (Number: number) => {
      setPhotoFrameNumber(Number);
      onChangePhotoFrame(Number);
    },
    [onChangePhotoFrame]
  );

  const ChangeBackground = useCallback(
    (Number: number) => {
      setBackgroundNumber(Number);
      onChangeBackground(Number);
    },
    [onChangeBackground]
  );

  return (
    <div className='min-w-[480px]'>
      <div className='hover:text-red-300'>
        <UserHeader />
      </div>
      <div className='flex justify-center place-items-center h-full bg-[#F9C7C8]'>
        {children}
        <div className='flex flex-col items-end'>
          {[1, 2, 3, 4, 5].map((number) => (
            <ButtonComponent
              key={number}
              type={photoFrameNumber === number ? 'tinyPointed' : 'tiny'}
              onClick={() => ChangePhotoFrame(number)}
            >
              사진틀{number}
            </ButtonComponent>
          ))}
          <div className='pt-4' />
          {[1, 2, 3, 4, 5].map((number) => (
            <ButtonComponent
              key={number}
              type={backgroundNumber === number ? 'tinyPointed' : 'tiny'}
              onClick={() => ChangeBackground(number)}
            >
              배경{number}
            </ButtonComponent>
          ))}
        </div>
      </div>
    </div>
  );
}
