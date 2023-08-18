import { Outlet } from 'react-router-dom';

export default function About() {
  return (
    <div>
      <h1>Posts Layout 이거 중복되서 나옴?</h1>
      <Outlet />
    </div>
  );
}
