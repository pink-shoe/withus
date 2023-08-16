import React, { useCallback, useState } from 'react';
import ButtonComponent from './ButtonComponent';
import UserHeader from './UserHeader';

interface IBackgroundProps {
  children: React.ReactNode;
  onChangePhotoFrame: (Number: number) => void;
  onChangeBackground: (Number: number) => void;
  setFourCut: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AlbumBG({
  children,
  onChangePhotoFrame,
  onChangeBackground,
  setFourCut,
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

  const BGIMG = [1, 2, 3, 4, 5];

  return (
    <div className='min-w-[480px]'>
      <div className='hover:text-red-300'>
        <UserHeader />
      </div>
      <div className='flex justify-center place-items-center h-full bg-[#F9C7C8]'>
        {children}
        <div className='flex flex-col items-end'>
          <p className='rounded w-28 h-8 bg-yellow-100 font-kdisplay flex justify-center items-center'>
            {' '}
            배치 선택{' '}
          </p>
          {BGIMG.map((number) => (
            <ButtonComponent
              key={number}
              type={photoFrameNumber === number ? 'tinyPointed' : 'tiny'}
              onClick={() => ChangePhotoFrame(number)}
            >
              사진배치{number}
            </ButtonComponent>
          ))}
          <div className='pt-4' />
          <p className='rounded w-28 h-8 bg-yellow-100 font-kdisplay flex justify-center items-center'>
            {' '}
            배경 선택{' '}
          </p>
          {[1, 2, 3, 4, 5].map((number) => (
            <ButtonComponent
              key={number}
              type={backgroundNumber === number ? 'tinyPointed' : 'tiny'}
              onClick={() => ChangeBackground(number)}
            >
              배경{number}
            </ButtonComponent>
          ))}
          <p
            className='rounded w-28 h-8 bg-yellow-100 font-kdisplay flex justify-center items-center'
            onClick={() => setFourCut(true)}
          >
            네컷저장
          </p>
        </div>
      </div>
    </div>
  );
}
