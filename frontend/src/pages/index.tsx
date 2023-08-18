import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Loader = () => 'Route loader';
export const Action = () => 'Route action';
export const Catch = () => <div>Something went wrong...</div>;

export const Pending = () => <div>Loading...</div>;

export default function Home() {
  const navigate = useNavigate();
  const path = useLocation();

  useEffect(() => {
    navigate('/login');
    console.log(path);
  }, []);
  return <h1 className='text-9xl'>Home</h1>;
}
