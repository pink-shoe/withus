import { Fragment } from 'react';
import Logo from './Logo/Logo';

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
        <div className='h-[38rem] w-full'>
          <div className='static'>
            <div className='flex justify-center'>
              <div className='drop-shadow-xl rounded-md bg-yellow-100 h-[2.5rem] w-2/3'></div>
            </div>
            <div className='w-full flex justify-center place-items-center'>
              <Logo isGameRoomLogo={true} />
            </div>
          </div>
          <div className='flex justify-center align-middle'>
            <div className='flex justify-center place-items-center h-[34rem] w-7/12 bg-white'>
              {children}
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='flex justify-center place-items-center drop-shadow-lg rounded-md bg-yellow-100 h-[2.5rem] w-2/3'></div>
          </div>
        </div>
      ) : boardType === 'WAIT' ? (
        // 대기실 화면
        <div className='h-[38rem] w-full'>
          <div className='static'>
            <div className='flex justify-center'>
              <div className='drop-shadow-xl rounded-md bg-yellow-100 h-[2.5rem] w-2/3'></div>
            </div>
            <div className='w-full flex justify-center place-items-center'>
              <Logo isGameRoomLogo={false} />
            </div>
          </div>
          <div className='flex justify-center align-middle'>
            <div className='flex justify-center place-items-center h-[34rem] w-7/12 bg-white'>
              {children}
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='flex justify-center place-items-center drop-shadow-lg rounded-md bg-yellow-100 h-[2.5rem] w-2/3'></div>
          </div>
        </div>
      ) : (
        // 로비 화면(다른 곳에서도 사용 가능)
        <div className='h-[38rem] min-w-[490px] 2sm:w-full'>
          <div className='static'>   
            <div className='flex justify-center'>
              <div className='drop-shadow-xl rounded-md bg-yellow-100 h-[2.5rem] w-10/12'></div>
            </div>
            <div className='w-full flex justify-center place-items-center'>
              <Logo isGameRoomLogo={false} />
            </div>
          </div>
          <div className='flex justify-center align-middle'>
            <div className='flex justify-center place-items-center h-[34rem] w-9/12 bg-white'>
              {children}
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='flex justify-center place-items-center drop-shadow-lg rounded-md bg-yellow-100 h-[2.5rem] w-10/12'></div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
