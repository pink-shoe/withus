import { Fragment } from 'react';
import UserHeader from './UserHeader';

interface IBackgroundProps {
  // isLobbyDropdown true는 로비 항목이 없고, false는 로비 항목이 있음
  isLobbyDropdown? : any;
  isLobbyPage: boolean;
  children: React.ReactNode;
}

export default function Background({isLobbyDropdown, isLobbyPage, children}: IBackgroundProps) {
  return (
    <div className='min-w-[640px] white'>
      {isLobbyPage ? (
        // 로비 페이지와 같이 드롭다운이 필요한 경우
        <Fragment>
          <div className='hover:text-red-300'>
            <UserHeader isLobbyDropdown={isLobbyDropdown} />
          </div>
          <div className='flex justify-center place-items-center h-[740px] md:h-screen tall:h-screen bg-[#F9C7C8]'>
            {children}
          </div>
        </Fragment>
      ) : (
        // 드롭다운이 필요 없는 경우
        <Fragment>
          <div className='flex justify-center place-items-center h-[805px] bg-[#F9C7C8]'>
            {children}
          </div>
        </Fragment>
      )}
    </div>
  );
}
