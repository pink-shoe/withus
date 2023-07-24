import React, { Fragment, useState } from 'react';
import Header from '../components/common/Header';
import Modal from '../components/common/Modal';
import SelectMood from '../components/common/SelectMood';
import SelectRound from '../components/common/SelectRound';

export default function Lobby() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMake, setModalMake] = useState(false);
  const [joinCode, setCode] = useState('');

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const makeModal = () => {
    setModalMake(true);
  };
  const closemakeModal = () => {
    setModalMake(false);
    setCode('')
  };

  const saveCode = (event : any) => {
    setCode(event.target.value);
    console.log(joinCode)
  }

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
      <header>
        <Header />
      </header>
      <div className='h-screen bg-gradient-to-b from-sky-900 to-pink-800'>
        <div className=' w-full h-[220px] text-5xl text-center items-center flex justify-center font-bold text-white'>[] with us</div>
        <div className='flex flex-auto justify-center content-center'>
          <Fragment>
            <button onClick={openModal} className='bg-red-600 hover:bg-red-800 me-5 aspect-square h-96 rounded-xl font-semibold text-2xl text-white'>방 만들기</button>
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
            </Modal>
          </Fragment>
          <Fragment>
            <button onClick={makeModal} className='bg-green-600 hover:bg-green-700 ms-5 aspect-square h-96 rounded-xl font-semibold text-2xl text-white'>참여하기</button>
            <Modal open={modalMake} close={closemakeModal}>
              <p className='text-indigo-900 font-bold text-3xl mb-10 text-center'>참여 코드</p>
              <div className='flex mb-7'>
                <span className='me-5 font-semibold text-xl flex items-center'>참여코드</span>
                <input className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400' placeholder='참여코드 입력' type="text" value={joinCode} onChange={saveCode} />
              </div>
              <span>{joinCode}</span>
            </Modal>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
}