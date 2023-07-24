import { Outlet } from 'react-router-dom';

export default function WaitingRoomLayout() {
  return (
    <div className='w-full h-full flex  justify-center text-center'>
      <header className='w-fit h-28 absolute'>
        <div className=' text-white font-extrabold text-6xl text-center py-10'>[] with us</div>
      </header>
      <Outlet />
    </div>
  );
}
