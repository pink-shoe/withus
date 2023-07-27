import { Outlet } from 'react-router-dom';

export default function WaitingRoomLayout() {
  return (
    <div className='w-full h-screen flex overflow-y-hidden justify-center text-center'>
      <Outlet />
    </div>
  );
}
