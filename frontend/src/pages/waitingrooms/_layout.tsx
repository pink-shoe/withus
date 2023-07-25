import { Outlet } from 'react-router-dom';

export default function WaitingRoomLayout() {
  return (
    <div className='w-full h-full flex  justify-center text-center'>
      <Outlet />
    </div>
  );
}
