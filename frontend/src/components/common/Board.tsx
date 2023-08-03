import { Fragment } from 'react';
import Logo from './Logo/Logo'

export type boardType = 'GAME' | 'WAIT' | 'LOBBY';

interface IBoardProps {
  boardType: boardType;
  children: React.ReactNode;
}

export default function Board({ boardType, children }: IBoardProps) {
  return (
    <Fragment>
      {boardType === 'GAME' ? (
        // 게임 화면
        <div className='h-[38rem] w-[60rem]'>
          <div className='static'>
            <div className='flex justify-center place-items-center drop-shadow-xl rounded-md bg-yellow-100 h-[2.5rem]'></div>
            <div className='w-full flex justify-center place-items-center'>
              <Logo isGameRoomLogo={true} />
            </div>
          </div>
          <div className='flex justify-center place-items-center h-[32.4rem] w-[57rem] ms-[1.5rem] bg-white'>
            {children}
          </div>
          <div className='flex justify-center place-items-center drop-shadow-lg rounded-md bg-yellow-100 h-[2.5rem]'></div>
        </div>
      ) : boardType === 'WAIT' ? (
        // 대기실 화면
        <div className='h-[38rem] w-[60rem]'>
          <div className='static'>
            <div className='flex justify-center place-items-center drop-shadow-xl rounded-md bg-yellow-100 h-[2.5rem]'></div>
            <div className='w-full flex justify-center place-items-center'>
              <Logo isGameRoomLogo={false} />
            </div>
          </div>
          <div className='flex justify-center place-items-center h-[32.4rem] w-[57rem] ms-[1.5rem] bg-white'>
            {children}
          </div>
          <div className='flex justify-center place-items-center drop-shadow-lg rounded-md bg-yellow-100 h-[2.5rem]'></div>
        </div>
      ) : (
        // 그 이외의 화면
        <div className='h-[38rem] w-[75rem]'>
          <div className='static'>
            <div className='flex justify-center place-items-center drop-shadow-xl rounded-md bg-yellow-100 h-[2.5rem]'></div>
            <div className='w-full flex justify-center place-items-center'>
              <Logo isGameRoomLogo={false} />
            </div>
          </div>
          <div className='flex justify-center place-items-center h-[35rem] w-[70rem] ms-[2.5rem] bg-white'>
            {children}
          </div>
          <div className='flex justify-center place-items-center drop-shadow-lg rounded-md bg-yellow-100 h-[2.5rem]'></div>
        </div>
      )}
    </Fragment>
  )
}