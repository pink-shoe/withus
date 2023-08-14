import { Outlet } from 'react-router-dom';
import ExceptionModal from '@components/common/ExceptionModal';
import { ErrorContext } from 'stores/error';
import { useMemo, useState } from 'react';
import WithAxios from '@components/common/WithAxios';
// import { Link, useModals, useNavigate, useParams } from '../router';

export const Catch = () => {
  return <div>Something went wrong... Caught at _app error boundary</div>;
};

export const Pending = () => <div>Loading from _app...</div>;

export interface IError {
  code: string;
  message: string;
}
export default function App() {
  const [error, setError] = useState<{ code: string; message: string }>({ code: '', message: '' });
  const errorData = useMemo(
    () => ({ code: error.code, message: error.message, setError }),
    [error]
  );

  return (
    <ErrorContext.Provider value={{ code: errorData.code, message: errorData.message, setError }}>
      <WithAxios>
        <section>
          <main>
            <Outlet />
          </main>
          {/* <Modals /> */}
        </section>
        <ExceptionModal />
      </WithAxios>
    </ErrorContext.Provider>
  );
}
