// 대기실에서 사용할 방 설정 모달창

import React, { Fragment, useState } from 'react';
import Modal from './Modal';
import SelectMood from './SelectMood';
import SelectRound from './SelectRound';

export default function RoomSetting() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const MOPTIONS = [
    { value: 'mood_choice', name: '모드 선택' },
    { value: 'coop', name: '협동전' },
    // { value: 'team', name: '팀전' },
  ];

  const ROPTIONS = [
    { value: 'round_choice', name: '라운드 선택' },
    // { value: 3, name: '3' },
    { value: 5, name: '5' },
  ];

  return (
    <Fragment>
      <Fragment>
        <button onClick={openModal} className='bg-red-600 hover:bg-red-800 me-5 aspect-square h-96 rounded-xl font-semibold text-2xl text-white'>대기실 방 설정</button>
        <Modal open={modalOpen} close={closeModal}>
          <p className='text-indigo-900 font-bold text-3xl mb-10 text-center'>방 설정</p>
          <div className='flex my-7'>
            <span className='me-5 font-semibold text-xl flex items-center'>게임모드</span>
            <SelectMood options={MOPTIONS}></SelectMood>
          </div>
          {/* <div className='flex mb-7'>
            <span className='me-5 font-semibold text-xl flex items-center'>비밀번호</span>
            <input className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' type="password" />
          </div> */}
          <div className='flex mb-10'>
            <span className='me-5 font-semibold text-xl flex items-center'>게임진행</span>
            <SelectRound options={ROPTIONS}></SelectRound>
            <span className='me-5 font-semibold text-xl flex items-center ms-2'>판</span>
          </div>
          <div>
            <span className='me-5 font-semibold text-xl flex items-center'>초대하기</span>
          </div>
        </Modal>
      </Fragment>
    </Fragment>
  );
}