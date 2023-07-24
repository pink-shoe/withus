import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import GameStart from '../common/GameStart';

export default function Modal(props : any) {
  const { open, close } = props;

  return (
    <div>
      {open ? (
        <Fragment>
          <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70'>
            <div className='bg-slate-50 w-[31rem] rounded-lg px-5 py-3'>
              <header className='flex justify-end'><FontAwesomeIcon icon={faXmark} size="xl" onClick={close} className='cursor-pointer hover:text-red-500' /></header>
              <div className='mx-3 my-3'>{props.children}</div>
              <div className='flex justify-center my-9'>
                <GameStart />
              </div>
            </div>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};