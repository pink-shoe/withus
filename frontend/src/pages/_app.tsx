import { Outlet } from 'react-router-dom';
import { Modals } from '@generouted/react-router';

import { Link, useModals, useNavigate, useParams } from '../router';
import Page404 from './Page404';

export const Catch = () => {
  return <div>Something went wrong... Caught at _app error boundary</div>;
};

export const Pending = () => <div>Loading from _app...</div>;

export default function App() {
  const navigate = useNavigate();
  const modals = useModals();
  //   const { id, pid } = useParams('/posts/:id/:pid?' as never);

  const a = () => navigate('/posts/:id', { params: { id: 'a' } });
  const b = () => navigate('/posts/:id', { params: { id: '' } });
  const c = () => navigate(-1);
  const d = () => navigate('/posts/:id/deep', { params: { id: 'd' } });
  const e = () => navigate('/posts/:id/deep', { params: { id: 'e' } });

  return (
    <section style={{ margin: 0 }}>
      {/* <header style={{ display: 'flex', gap: 24 }}>
        <Link to='/'>Home</Link>
        <Link to='/login'>두현's test</Link>
        <Link to={{ pathname: '/about' }}>About</Link>
        <Link to='/posts'>Posts</Link>
        <Link to='/posts/:id/:pid?' params={{ id: '1', pid: '2' }}>
          Posts by id/pid
        </Link>
        <Link to='/posts/:id' params={{ id: 'id' }}>
          Posts by id
        </Link>
        <Link to='/kakao'> kakao </Link>
        <Link to='/mypage'> mypage </Link>
        <Link to='/Page404'> Page404</Link>
        <button onClick={() => modals.open('/modal')}>Global modal at current route</button>
        <button onClick={() => modals.open('/modal', { at: '/about' })}>
          Global modal at /about
        </button>
        <button onClick={e}>navigate to</button>
      </header> */}

      <main>
        <Outlet />
      </main>

      <Modals />
    </section>
  );
}
