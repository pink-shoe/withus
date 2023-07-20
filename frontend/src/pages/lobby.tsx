import React, { Fragment } from 'react';
import Header from '../components/common/Header';

export default function Lobby() {
  return (
    <Fragment>
      <header>
        <Header />
      </header>
      <div className='h-screen bg-gradient-to-b from-sky-900 to-pink-700'>
        <div className=' w-full h-[220px] text-5xl text-center items-center flex justify-center font-bold text-white'>[] with us</div>
        <div className='flex flex-auto justify-center content-center'>
          <button className='bg-red-600 hover:bg-red-800 me-5 aspect-square h-96 rounded-xl font-semibold text-2xl text-white'>방 만들기</button>
          <button className='bg-green-600 hover:bg-green-700 ms-5 aspect-square h-96 rounded-xl font-semibold text-2xl text-white'>참여하기</button>
        </div>
      </div>
    </Fragment>
  );
}