import { Fragment } from 'react';
import UserHeader from './UserHeader';
import Board from './Board';

interface IBackgroundProps {
  children: React.ReactNode;
  BoardType: any;
}

export default function Background({children, BoardType}: IBackgroundProps) {
  return (
    <Fragment>
      <UserHeader />
      <div className='flex justify-center place-items-center h-screen bg-[#F9C7C8]'>
        <Board boardType={BoardType}>
          {children}
        </Board>
      </div>
    </Fragment>
  )
}