// 모든 모달의 토대
// 닫기 버튼을 포함하고 있음
import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface iModalProps {
  openModal: boolean;
  closeModal: React.MouseEventHandler<SVGSVGElement>;
  children: React.ReactNode;
};

export default function Modal({ openModal, closeModal, children }: iModalProps) {
  return (
    <div>
      {openModal ? (
        <Fragment>
          {/* 모달창 띄우면 뒷배경 불투명해지는 효과 */}
          <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70'>
            {/* 모달창 */}
            <div className='bg-slate-50 w-[31rem] rounded-lg px-5 py-3'>
              {/* 닫기 버튼 */}
              <header className='flex justify-end'>
                <FontAwesomeIcon
                  icon={faXmark}
                  size='xl'
                  onClick={closeModal}
                  className='cursor-pointer hover:text-red-500'
                />
              </header>
              <div className='mx-3 my-3'>{children}</div>
              <div className='flex justify-center mt-10'></div>
            </div>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}
