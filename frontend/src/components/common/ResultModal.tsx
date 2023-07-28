// 결과를 나타내는 모달창
// 현재 진행 중
import { Fragment, useState } from 'react';
import Modal from './Modal';
import picture1 from '@src/assets/loopy2.jpg'

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
            <div className='flex space-x-2'>
              <span>
                <span className='font-semibold text-xl'>ROUND 1</span>
                <div className='flex justify-center align-bottom'>유사도</div>
              </span>
              <div className='w-40 h-32 bg-slate-500 rounded-lg'></div>
              <img className='w-40 h-32 rounded-lg display: inline' src={picture1} />
            </div>
          </Fragment>
        </div>
      </Modal>
    </Fragment>
  )
}