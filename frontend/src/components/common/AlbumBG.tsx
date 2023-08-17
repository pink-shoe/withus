import React, { useCallback, useState } from 'react';
import ButtonComponent from './ButtonComponent';
import UserHeader from './UserHeader';

interface IBackgroundProps {
  children: React.ReactNode;
  onChangePhotoFrame: (Number: number) => void;
  onChangeBackground: (Number: number) => void;
  setFourCut: React.Dispatch<React.SetStateAction<boolean>>;
  fourCut: boolean;
}

export default function AlbumBG({
  children,
  onChangePhotoFrame,
  onChangeBackground,
  setFourCut,
  fourCut,
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
      <div className='hover:text-red-100'>
        <UserHeader />
      </div>
      <div className='flex justify-center place-items-center h-full bg-red-100'>
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
          <button
            className={`rounded w-28 h-8 font-kdisplay flex justify-center items-center mt-4 ${
              fourCut ? 'bg-blue-100 text-black' : 'bg-yellow-100 hover:bg-yellow-200 text-black'
            }`}
            onClick={() => {
              setFourCut((prevValue) => !prevValue);
              console.log('FourCut 값:', fourCut);
            }}
          >
            {fourCut ? '앨범 보기' : '네컷 저장'}
          </button>
        </div>
      </div>
    </div>
  );
}
