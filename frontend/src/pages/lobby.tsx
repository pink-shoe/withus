import React, { Fragment, useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Modal from '../components/common/Modal';
import SettingModal from '../components/common/SettingModal';

export default function Lobby() {
  const [makeRoomModal, setMakeRoomModal] = useState(false);
  const [enterRoomModal, setEnterRoomModal] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  const openMakeModal = () => {
    setMakeRoomModal(true);
  };
  const closeMakeModal = () => {
    setMakeRoomModal(false);
  };

  const openEnterModal = () => {
    setEnterRoomModal(true);
  };
  const closeEnterModal = () => {
    setEnterRoomModal(false);
    setInviteCode('')
  };

  const writeCode = (event: any) => {
    setInviteCode(event.target.value);
  };

  // 시작 버튼을 누르면 입력한 코드에 따라
  // 코드를 다시 입력해야 하거나, 대기실로 넘어감
  // 현재는 콘솔창에 코드가 출력되도록 함
  const enterCode = () => {
    // 예시 코드
    if(inviteCode === 'ddddd') {
      console.log('잘못된 코드 입력')
      alert('방이 존재하지 않습니다😥')
      setInviteCode('')
    } else {
      console.log(inviteCode)
    }
  }

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
            <SettingModal isInviteAreaOpen={false} openModal={makeRoomModal} closeModal={closeMakeModal}></SettingModal>
          </Fragment>
          <Fragment>
            <button onClick={openEnterModal} className='bg-green-600 hover:bg-green-700 ms-5 aspect-square h-96 rounded-xl font-semibold text-2xl text-white'>참여하기</button>
            <Modal openModal={enterRoomModal} closeModal={closeEnterModal}>
              <p className='text-indigo-900 font-bold text-3xl mb-10 text-center'>참여 코드</p>
              <div className='flex mb-7'>
                <span className='me-5 font-semibold text-xl flex items-center'>참여코드</span>
                <input className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400' placeholder='참여코드 입력' type="text" value={inviteCode} onChange={writeCode} />
              </div>
              <div className='flex justify-center'>
                <button onClick={enterCode} className='bg-violet-800 hover:bg-indigo-950 w-72 h-12 rounded-md font-semibold text-lg text-white'>시작</button>
              </div>
            </Modal>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
}