import { Outlet } from 'react-router-dom';

export default function WaitingRoomLayout() {
  return (
    <div>
      <h1>대기실</h1>
      <Outlet />
    </div>
  );
}
