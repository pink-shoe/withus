import React, { Fragment } from 'react';
import GameStart from '../common/GameStart';

export default function Modal(props) {
  const { open, close } = props;

  return (
    <div>
      {open ? (
        <Fragment>
          <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70'>
            <div className='bg-slate-50 w-[31rem] rounded-lg px-5 py-3'>
              <div className='mx-3 my-8'>{props.children}</div>
              <div className='flex justify-center mb-8'>
                <GameStart />
                <button className='bg-red-600 hover:bg-red-800 w-1/4 h-10 rounded-md ms-1 font-semibold text-lg text-white' onClick={close}>
                  닫기
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      ) : null}
    </div>
    
  );
};