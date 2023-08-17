// 에러를 받는 모달창

import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useContext, useEffect, useState } from 'react';
import { ErrorContext } from 'stores/error';
import { getRoomInfoApi } from 'apis/roomApi';
import { IRoomAtom, roomAtom } from 'stores/room';

export default function ExceptionModal() {
  const [modalStatus, setModalStatus] = useState(false);
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const { code, message, setError } = useContext(ErrorContext);

  // 모달창 여는 기능
  const openModal = () => {
    setModalStatus(true);
  };
  // 모달창 닫는 기능
  const closeModal = () => {
    setModalStatus(false);
  };

  const onClickConfirmBtn = () => {
    if (token != null) {
      // 토큰이 있으면, '/lobby' 페이지로 이동
      console.log('토큰 있음');
      // navigate('/lobby');
    } else {
      // 토큰이 없으면, '/login' 페이지로 이동
      console.log('토큰 없음');
      // navigate('/login');
    }
    closeModal();
    setError({ code: '', message: '' });
  };

  return (
    <div>
      {code && message && (
        <Modal openModal={openModal} isSettingModal={false}>
          <div className='text-[#514148] font-medium text-4xl my-16 text-center me-3 font-kdisplay'>
            {message}
            <div>새로고침이나 뒤로가기 버튼을 이용하여 다시 시도해주세요.😅</div>
          </div>

          <div className='flex justify-center'>
            <button
              onClick={onClickConfirmBtn}
              className='text-white font-medium text-4xl text-center font-kdisplay bg-[#FA8D8D] w-40 pt-2 h-16 rounded-lg hover:bg-red-500'
            >
              확인
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
