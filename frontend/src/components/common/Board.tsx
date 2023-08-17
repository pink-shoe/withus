import { Fragment, useEffect } from 'react';
import Logo from './Logo/Logo';
import './Logo/LogoStyle.css';

export type boardType = 'GAME' | 'WAIT' | 'LOBBY' | 'ALBUM' | 'LOGIN';

interface IBoardProps {
  boardType: boardType;
  canPlay?: boolean;
  roundTimer?: number;
  handleSendImage?: () => void;
  children: React.ReactNode;
}

export default function Board({
  boardType,
  canPlay,
  roundTimer,
  handleSendImage,
  children,
}: IBoardProps) {
  useEffect(() => {
    console.log('asdf', roundTimer);
  }, [roundTimer]);
  return (
    <Fragment>
      {boardType === 'GAME' ? (
        // 게임 화면
        <div className='w-full mt-[2rem]'>
          <div className='static'>
            <div className='flex justify-center'>
              <div className='drop-shadow-xl rounded-md bg-yellow-100 h-[2.5rem] w-10/12'></div>
            </div>
            <div className='flex justify-center'>
              {roundTimer && handleSendImage && (
                <Logo
                  logoType={'GAMELOGO'}
                  roundTimer={roundTimer}
                  canPlay={canPlay}
                  handleSendImage={handleSendImage}
                />
              )}
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
      ) : boardType === 'WAIT' ? (
        // 대기실 화면
        <div className='w-full mt-[4.5rem]'>
          <div className='static'>
            <div className='flex justify-center'>
              <div className='drop-shadow-xl rounded-md bg-yellow-100 h-[2.5rem] w-10/12'></div>
            </div>
            <div className='flex justify-center'>
              <Logo logoType={'LOBBYLOGO'} />
            </div>
          </div>
          <div className='flex justify-center align-middle'>
            <div className='flex justify-center place-items-center h-[30rem] w-9/12 bg-white'>
              {children}
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='flex justify-center place-items-center drop-shadow-lg rounded-md bg-yellow-100 h-[2.5rem] w-10/12'></div>
          </div>
        </div>
      ) : boardType === 'ALBUM' ? (
        // 사진첩 화면
        <div className='h-full min-w-[500px] 2sm:w-full pl-20 pt-12 pb-8'>
          <div className='flex justify-center'>
            <div className='drop-shadow-xl rounded-md bg-yellow-100 h-[2.5rem] w-11/12'></div>
          </div>
          <div className='flex justify-center align-middle'>
            <div className='flex justify-center place-items-center h-[600px] w-10/12 bg-white'>
              {children}
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='flex justify-center place-items-center drop-shadow-lg rounded-md bg-yellow-100 h-[2.5rem] w-11/12'></div>
          </div>
        </div>
      ) : boardType === 'LOBBY' ? (
        // 로비 화면(다른 곳에서도 사용 가능)
        <div className='h-[38rem] min-w-[500px] 2sm:w-full'>
          <div className='static'>
            <div className='flex justify-center'>
              <div className='drop-shadow-xl rounded-md bg-yellow-100 h-[2.5rem] w-10/12'></div>
            </div>
            <div className='w-full flex justify-center'>
              <Logo logoType={'LOBBYLOGO'} />
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
      ) : (
        // 로그인 화면
        <div className='h-[38rem] min-w-[500px] 2sm:w-full'>
          <div className='static'>
            <div className='flex justify-center'>
              <div className='drop-shadow-xl rounded-md bg-yellow-100 h-[2.5rem] w-10/12'></div>
            </div>
            <div className='w-full flex justify-center'>
              <Logo logoType={'LOBBYLOGO'} />
            </div>
          </div>
          <div className='flex justify-center align-middle'>
            <div className='flex justify-center place-items-center h-[890px] 2lg:h-[34rem] w-9/12 bg-white'>
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
