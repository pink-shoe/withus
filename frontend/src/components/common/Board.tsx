import { Fragment } from 'react';
import Logo from './Logo/Logo'

interface IBoardProps {
  children: React.ReactNode;
  isGameBoard: boolean;
}

export default function Board({children, isGameBoard}: IBoardProps) {
  return (
    <Fragment>
      {isGameBoard ? (
        // 게임의 화면
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
      ) : (
        // 그 이외의 큰 화면
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