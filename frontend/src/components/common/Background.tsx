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
        {/* Background를 사용할 페이지에서 isBoard를 game, wait, lobby 중 하나로 지정해서 사용 */}
        <Board isBoard={isBoard}>
          {children}
        </Board>
      </div>
    </Fragment>
  )
}