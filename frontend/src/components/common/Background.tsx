import { Fragment } from 'react';
import Logo from './Logo/Logo';
import Header from './Header';

export default function Background() {
  return (
    <Fragment>
      <Header />
      <div className='flex justify-center place-items-center h-screen bg-red-200'>
        <div className='h-[41rem] w-[75rem]'>
          <div>
            <div className='flex justify-center place-items-center drop-shadow-xl rounded-md bg-yellow-100 h-[2.5rem]'></div>
            <Logo />
          </div>
            <div className='flex justify-center place-items-center h-5/6 w-5/6 mx-10 bg-white'>
              dddddddd
            </div>
          <div className='flex justify-center place-items-center drop-shadow-lg rounded-md bg-yellow-100 h-[2.5rem]'></div>

        </div>
      </div>

    </Fragment>
  )
}