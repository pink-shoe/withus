import { Outlet } from 'react-router-dom';
import { Modals } from '@generouted/react-router';
// import ExceptionModal from '@components/common/ExceptionModal';
import { useAtom } from 'jotai';
// import { errorAtom } from 'stores/error';

// import { Link, useModals, useNavigate, useParams } from '../router';

export const Catch = () => {
  return <div>Something went wrong... Caught at _app error boundary</div>;
};

export const Pending = () => <div>Loading from _app...</div>;

export default function App() {
  // const [error, setError] = useAtom(errorAtom);

  return (
    <section>
      <main>
        <Outlet />
      </main>
      {/* <ExceptionModal message={error.message} /> */}
      <Modals />
    </section>
  );
}
