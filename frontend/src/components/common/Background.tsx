import { Fragment } from 'react';
import UserHeader from './UserHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

interface IBackgroundProps {
  children: React.ReactNode;
}

export default function Background({children}: IBackgroundProps) {
  return (
    <div className='min-w-[480px]'>
      <div className='hover:text-red-300'>
        <UserHeader />

      </div>
      <FontAwesomeIcon icon={faCircleUser} size="2xl" style={{color: "#ffffff"}} />
      <div className='flex justify-center place-items-center h-[46.7rem] tall:h-screen bg-[#F9C7C8]'>
        {children}
      </div>
    </div>
  )
}