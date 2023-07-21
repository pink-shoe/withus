export const Loader = () => 'Route loader';
export const Action = () => 'Route action';
export const Catch = () => <div>Something went wrong...</div>;

export const Pending = () => <div>Loading...</div>;

export default function Home() {
  return <h1 className='text-9xl'>Home</h1>;
}
