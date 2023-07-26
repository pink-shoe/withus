// 결과를 나타내는 모달창
// 현재 진행 중
import { Fragment, useState } from 'react';
import Modal from './Modal';

export default function ResultModal() {
  const [modalStatus, setModalStatus] = useState(false);

  // 모달창 여는 기능
  const openModal = () => {
    setModalStatus(true);
  };
  // 모달창 닫는 기능
  const closeModal = () => {
    setModalStatus(false);
  };

  return (
    <Fragment>
      <button onClick={openModal} className='bg-violet-800 hover:bg-indigo-950 w-60 h-10 rounded-md font-semibold text-lg text-white'>게임 결과</button>
      <Modal openModal={modalStatus} closeModal={closeModal}>
        <div className='text-center text-indigo-900 font-bold text-3xl mb-10'>🏆게임결과🏆</div>
        <div className='overflow-y-auto h-96'>
          <Fragment>
            <span className='font-semibold text-xl flex items-center'>ROUND 1</span>
            <div>
            </div>
          </Fragment>
        </div>
      </Modal>
    </Fragment>
  )
}