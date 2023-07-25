import React, { Fragment, useState } from 'react';
import Header from '../components/common/Header';
import Modal from '../components/common/Modal';
import SettingModal from '../components/common/SettingModal';

export default function Lobby() {
  const [isMakeModal, setIsMakeModal] = useState(false);
  const [isEnterModal, setIsEnterModal] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  const openMakeModal = () => {
    setIsMakeModal(true);
  };
  const closeMakeModal = () => {
    setIsMakeModal(false);
  };

  const openEnterModal = () => {
    setIsEnterModal(true);
  };
  const closeEnterModal = () => {
    setIsEnterModal(false);
    setInviteCode('')
  };

  const enterCode = (event : any) => {
    setInviteCode(event.target.value);
    console.log(inviteCode)
  }

  const MOPTIONS = [
    { value: 'mode_choice', name: '모드 선택' },
    { value: 'coop', name: '협동전' },
    // { value: 'team', name: '팀전' },
  ];

  const ROPTIONS = [
    { value: 'round_choice', name: '라운드 선택' },
    // { value: 3, name: '3' },
    { value: 5, name: '5' },
  ];

  // const [mode, setMode] = useState('');
  // const [round, setRound] = useState('');
  // const chooseMode = (mode : any) => {
  //   setMode(mode);
  // }
  // const getRound = (round : any) => {
  //   setRound(round);
  // }

  return (
    <Fragment>
      <header>
        <Header />
      </header>
      <div className='h-screen bg-gradient-to-b from-sky-900 to-pink-800'>
        <div className=' w-full h-[220px] text-5xl text-center items-center flex justify-center font-bold text-white'>[] with us</div>
        <div className='flex flex-auto justify-center content-center'>
          <Fragment>
            <button onClick={openMakeModal} className='bg-red-600 hover:bg-red-800 me-5 aspect-square h-96 rounded-xl font-semibold text-2xl text-white'>방 만들기</button>
            <SettingModal isMakeModal={isMakeModal} closeMakeModal={closeMakeModal}></SettingModal>
          </Fragment>
          <Fragment>
            <button onClick={openEnterModal} className='bg-green-600 hover:bg-green-700 ms-5 aspect-square h-96 rounded-xl font-semibold text-2xl text-white'>참여하기</button>
            <Modal open={isEnterModal} close={closeEnterModal}>
              <p className='text-indigo-900 font-bold text-3xl mb-10 text-center'>참여 코드</p>
              <div className='flex mb-7'>
                <span className='me-5 font-semibold text-xl flex items-center'>참여코드</span>
                <input className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400' placeholder='참여코드 입력' type="text" value={inviteCode} onChange={enterCode} />
              </div>
              <span>{inviteCode}</span>
            </Modal>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
}