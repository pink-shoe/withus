import React, { Fragment } from 'react';
import { X } from 'react-feather';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IModalProps {
  openModal: boolean;
  closeModal?: React.MouseEventHandler<SVGSVGElement>;
  mode?: string;
  round?: number;
  isSettingModal: boolean;
  children: React.ReactNode;
}

export default function Modal({ openModal, closeModal, isSettingModal, children }: IModalProps) {
  return (
    <div>
      {openModal ? (
        <Fragment>
          {/* 모달창 띄우면 뒷배경 불투명해지는 효과 */}
          <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 z-50'>
            {/* 모달창 */}
            <div className='bg-slate-50 w-[32rem] rounded-lg px-5 py-3'>
              {/* 닫기 버튼 */}
              {/* 세팅 모달에서만 닫기 버튼 존재 */}
              {isSettingModal ? (
                <div className='flex justify-end'>
                <X onClick={closeModal} className='cursor-pointer hover:text-red-500' />
              </div>
              ) : null}
              <div className='ms-5 my-3'>{children}</div>
              <div className='flex justify-center mt-10'></div>
            </div>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}
