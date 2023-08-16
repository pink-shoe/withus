import React, { Fragment } from 'react';
import { X } from 'react-feather';
import { emitKeypressEvents } from 'readline';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IModalProps {
  openModal: any;
  closeModal?: any;
  mode?: string;
  round?: number;
  isSettingModal: boolean;
  children: React.ReactNode;
}

export default function Modal({ openModal, closeModal, isSettingModal, children }: IModalProps) {
  // Enter 버튼으로 모달창 닫기 시도해봄
  // const activeEnter = (e: any) => {
  //   if (e.key === 'Enter') {
  //     closeModal
  //   }
  // }
  return (
    <div>
      {openModal ? (
        <Fragment>
          {/* 모달창 띄우면 뒷배경 불투명해지는 효과 */}
          <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-90 z-50'>
            {/* 모달창 */}
            <div className='bg-slate-50 w-[32rem] rounded-lg px-5 py-3'>
              {/* 닫기 버튼 */}
              {/* 세팅 모달에서만 닫기 버튼 존재 */}
              {isSettingModal ? (
                <div className='flex justify-end'>
                  <X onClick={closeModal} className='cursor-pointer hover:text-red-500' />
                </div>
              ) : null}
              <div className='mx-5 my-3 '>{children}</div>
              <div className='mt-10' />
            </div>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}
