// 4명의 참가자 중 한 명이라도 나가면 게임 종료
// 게임 종료를 안내하는 모달창

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

export default function EndGameModal() {
  const [modalStatus, setModalStatus] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // 모달창 여는 기능
  const openModal = () => {
    setModalStatus(true);
  };
  // 모달창 닫는 기능(후에 삭제 예정)
  const closeModal = () => {
    setModalStatus(false);
  };

  const onClickEndGame = () => {
    if (token != null) {
      // 토큰이 있으면, '/lobby' 페이지로 이동
      console.log('토큰 있음')
      navigate('/lobby');
    } else {
      // 토큰이 없으면, '/login' 페이지로 이동
      console.log('토큰 없음')
      navigate('/login');
    }
  }

  return (
    <div>
      <button
        onClick={openModal}
        className='bg-red-500 hover:bg-red-500 w-[22rem] h-24 rounded-lg border-4 border-white font-medium font-kdisplay text-3xl text-white'
      >
        게임 종료
      </button>
      <Modal openModal={modalStatus} closeModal={closeModal} isSettingModal={false}>
        <div className='text-[#514148] font-medium text-3xl my-16 text-center me-3 font-kdisplay'>
          <span className='text-red-500'>인원 부족</span>으로 게임을 종료합니다😥
        </div>
        {/* 로그인이 되어있는 유저라면 로비, 게스트라면 로그인 페이지로 이동 */}
        <div className='flex justify-center'>
          <button onClick={onClickEndGame} className='text-white font-medium text-4xl text-center font-kdisplay bg-[#FA8D8D] w-40 pt-2 h-16 rounded-lg hover:bg-red-500'>확인</button>
        </div>
      </Modal>
    </div>
  )
}