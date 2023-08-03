import { useState } from 'react';
import Modal from './Modal';


export default function EndGameModal() {
  const [modalStatus, setModalStatus] = useState(false);

  // 모달창 여는 기능
  const openModal = () => {
    setModalStatus(true);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className='bg-[#FF8DA3] hover:bg-red-500 w-[22rem] h-24 rounded-lg border-4 border-white font-medium font-kdisplay text-3xl text-white'
      >
        게임 결과 확인
      </button>
      <Modal openModal={modalStatus}>
        <div></div>
      </Modal>
    </div>
  )
}