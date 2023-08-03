import { Fragment } from 'react';
import UserHeader from './UserHeader';
import Board from './Board';

interface IBackgroundProps {
  children: React.ReactNode;
}

export default function Background({children}: IBackgroundProps) {
  return (
    <Fragment>
      <UserHeader />
      <div className='flex justify-center place-items-center h-screen bg-[#F9C7C8]'>
        {children}
      </div>
    </Fragment>
  )
}