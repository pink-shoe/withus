import React, { Fragment, useState } from 'react';
import Header from '../components/common/Header';
import Modal from '../components/common/Modal';
import SelectBox from '../components/common/SelectBox';

export default function Lobby() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMake, setModalMake] = useState(false);
  

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
  };

  const MOPTIONS = [
    { value: 'cooperation', name: '협동전' },
    { value: 'competition', name: '팀전' },
  ];

  const ROPTIONS = [
    { value: 'three', name: '3' },
    { value: 'five', name: '5' },
  ];

  return (
    <Fragment>
      <header>
        <Header />
      </header>
      <div className='h-screen bg-gradient-to-b from-sky-900 to-pink-700'>
        <div className=' w-full h-[220px] text-5xl text-center items-center flex justify-center font-bold text-white'>[] with us</div>
        <div className='flex flex-auto justify-center content-center'>
          <Fragment>
            <button onClick={openModal} className='bg-red-600 hover:bg-red-800 me-5 aspect-square h-96 rounded-xl font-semibold text-2xl text-white'>방 만들기</button>
            <Modal open={modalOpen} close={closeModal}>
              <p className='text-indigo-900 font-bold text-3xl mb-10 text-center'>방 설정</p>
              <div className='flex my-7'>
                <span className='me-5 font-semibold text-xl flex items-center'>게임모드</span>
                <SelectBox options={MOPTIONS}></SelectBox>
              </div>
              {/* <div className='flex mb-7'>
                <span className='me-5 font-semibold text-xl flex items-center'>비밀번호</span>
                <input className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' type="password" />
              </div> */}
              <div className='flex mb-10'>
                <span className='me-5 font-semibold text-xl flex items-center'>게임진행</span>
                <SelectBox options={ROPTIONS}></SelectBox>
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
                <input className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' type="text" />
              </div>
            </Modal>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
}