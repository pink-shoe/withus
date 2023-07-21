import { Outlet } from 'react-router-dom';
import { Modals } from '@generouted/react-router';

import { Link, useModals, useNavigate, useParams } from '../router';

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
    <section className='w-full h-full bg-gradient-to-b from-slate-800 via-indigo-500 to-purple-300'>
      <main>
        <Outlet />
      </main>

      <Modals />
    </section>
  );
}
