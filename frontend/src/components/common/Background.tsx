import { Fragment } from 'react';
import UserHeader from './UserHeader';
import Board from './Board';

interface IBackgroundProps {
  children: React.ReactNode;
  isBoard: string;
}

export default function Background({children, isBoard}: IBackgroundProps) {
  return (
    <Fragment>
      <UserHeader />
      <div className='flex justify-center place-items-center h-screen bg-[#F9C7C8]'>
        <Board isBoard={isBoard}>
          {children}
        </Board>
      </div>
    </Fragment>
  )
}