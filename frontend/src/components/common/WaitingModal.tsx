// 초대하기 기능까지 포함한 모달창

import React, { Fragment, useState } from 'react';
import RoomSetting from './RoomSetting';
import TextCopy from './TextCopy';

export default function WaitingModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [decideCode, setDecideCode] = useState('')
  const [decideUrl, setDecideUrl] = useState('')

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  
  const copyCode = (event: any) => {
    setDecideCode(event.target.value);
    console.log(decideCode);
  };

  const copyUrl = (event: any) => {
    setDecideUrl(event.target.value);
    console.log(decideUrl);
  };

  return (
    <Fragment>
      <button onClick={openModal} className='bg-violet-800 hover:bg-indigo-950 w-60 h-10 rounded-md font-semibold text-lg text-white'>대기실 방 설정</button>
      <RoomSetting modalOpen={modalOpen} closeModal={closeModal}>
        <div className='flex mb-2'>
          <span className='me-5 font-semibold text-xl flex items-center'>초대하기</span>
          <div className='w-[19.5rem]'>
            <div>
              <input value={decideCode} onChange={copyCode} className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400' placeholder='코드 입력' type="text" />
              <TextCopy text={decideCode} />
            </div>
            <div className='my-1'>
              <input value={decideUrl} onChange={copyUrl} className='p-2 border-2 w-[17.5rem] border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400' placeholder='URL 입력' type="text" />
              <TextCopy text={decideUrl} />
            </div>
          </div>
        </div>
      </RoomSetting>
    </Fragment>
  );
}