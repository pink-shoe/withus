import { Outlet } from 'react-router-dom';
import { Modals } from '@generouted/react-router';

// import { Link, useModals, useNavigate, useParams } from '../router';

export const Catch = () => {
  return <div>Something went wrong... Caught at _app error boundary</div>;
};

export const Pending = () => <div>Loading from _app...</div>;

export default function App() {
  return (
    <section>
      <main>
        <Outlet />
      </main>
      <Modals />
    </section>
  );
}
