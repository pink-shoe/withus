// 에러를 받는 모달창

import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useContext, useEffect, useState } from 'react';
import { ErrorContext } from 'stores/error';

export default function ExceptionModal() {
  const [modalStatus, setModalStatus] = useState(false);
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const { code, message, setError } = useContext(ErrorContext);
  // 모달창 여는 기능
  const openModal = () => {
    setModalStatus(true);
  };
  // 모달창 닫는 기능(후에 삭제 예정)
  const closeModal = () => {
    setModalStatus(false);
  };

  const onClickConfirmBtn = () => {
    if (token != null) {
      // 토큰이 있으면, '/lobby' 페이지로 이동
      console.log('토큰 있음');
      navigate('/lobby');
    } else {
      // 토큰이 없으면, '/login' 페이지로 이동
      console.log('토큰 없음');
      navigate('/login');
    }
    setError({ code: '', message: '' });
  };
  useEffect(() => {
    console.log('dddddddddddd', code, message);
  }, [message]);
  return (
    <div>
      {code && message && (
        <Modal openModal={openModal} isSettingModal={false}>
          <div className='text-[#514148] font-medium text-4xl my-16 text-center me-3 font-kdisplay'>
            {message}
          </div>

          {/* 로그인이 되어있는 유저라면 로비, 게스트라면 로그인 페이지로 이동 */}
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
