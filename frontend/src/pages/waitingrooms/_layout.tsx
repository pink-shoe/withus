import Background from '@components/common/Background';
import { Outlet } from 'react-router-dom';

export default function WaitingRoomLayout() {
  return (
    <Background>
      <Outlet />
    </Background>
  );
}
