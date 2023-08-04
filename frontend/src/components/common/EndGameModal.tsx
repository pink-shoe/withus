// 4명의 참가자 중 한 명이라도 나가면 게임 종료
// 게임 종료를 안내하는 모달창

import { useState } from 'react';
import Modal from './Modal';


export default function EndGameModal() {
  const [modalStatus, setModalStatus] = useState(false);

  // 모달창 여는 기능
  const openModal = () => {
    setModalStatus(true);
  };
  // 모달창 닫는 기능(후에 삭제 예정)
  const closeModal = () => {
    setModalStatus(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className='bg-[#FF8DA3] hover:bg-red-500 w-[22rem] h-24 rounded-lg border-4 border-white font-medium font-kdisplay text-3xl text-white'
      >
        게임 결과 확인
      </button>
      <Modal openModal={modalStatus} closeModal={closeModal} isSettingModal={true}>
        <div></div>
        {/* 로그인이 되어있는 유저라면 로비, 게스트라면 로그인 페이지로 이동 */}
        <button>종료</button>
      </Modal>
    </div>
  )
}