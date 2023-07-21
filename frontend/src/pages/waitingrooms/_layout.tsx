import { Outlet } from 'react-router-dom';

export default function WaitingRoomLayout() {
  return (
    <div className='w-full h-full '>
      <header className='w-full h-28 absolute'>
        <div className=' text-white font-extrabold text-6xl text-center py-10'>[] with us</div>
      </header>
      <Outlet />
    </div>
  );
}
