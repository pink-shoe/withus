import { Fragment } from 'react';
import UserHeader from './UserHeader';

export type backgroundType = 'LOBBY' | 'NOLOBBY' | 'LOGIN' | 'ALBUM';

interface IBackgroundProps {
  backgroundType: backgroundType;
  // isLobbyDropdown true는 로비 항목이 없고, false는 로비 항목이 있음
  isLobbyDropdown?: any;
  children: React.ReactNode;
}

export default function Background({
  backgroundType,
  isLobbyDropdown,
  children,
}: IBackgroundProps) {
  return (
    <Fragment>
      {backgroundType === 'LOBBY' ? (
        // 로비 페이지와 같이 드롭다운이 필요한 경우
        <div className='min-w-[480px] white'>
          <Fragment>
            <div className='hover:text-red-300'>
              <UserHeader isLobbyDropdown={isLobbyDropdown} />
            </div>
            <div className='flex justify-center place-items-center h-[740px] tall:h-screen bg-[#F9C7C8]'>
              {children}
            </div>
          </Fragment>
        </div>
      ) : backgroundType === 'NOLOBBY' ? (
        // 드롭다운이 필요 없는 경우
        <div className='min-w-[865px] white'>
          <Fragment>
            <div className='flex justify-center place-items-center h-[740px] tall:h-screen bg-[#F9C7C8]'>
              {children}
            </div>
          </Fragment>
        </div>
      ) : backgroundType === 'ALBUM' ? (
        // 드롭다운이 필요 없는 경우
        <div className='min-w-[865px] white'>
          <Fragment>
            <div className='flex justify-center place-items-center h-[740px] tall:h-screen bg-white'>
              {children}
            </div>
          </Fragment>
        </div>
      ) : (
        // 로그인 페이지의 배경
        <div className='min-w-[865px] white'>
          <Fragment>
            <div className='flex justify-center pt-16 h-[1150px] 2lg:h-screen bg-[#F9C7C8]'>
              {children}
            </div>
          </Fragment>
        </div>
      )}
    </Fragment>
  );
}
