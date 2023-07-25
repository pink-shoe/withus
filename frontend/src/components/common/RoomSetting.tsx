// 대기실에서 사용할 방 설정 모달창
// 셀렉트 박스만 포함

import React, { Fragment, useState } from 'react';
import Modal from './Modal';
import SelectContent from './SelectContent';

export default function RoomSetting(props : any) {
  const [myMood, setMyMood] = useState('');
  const [myRound, setMyRound] = useState('');

  const getMood = (myMood: any) => {
    setMyMood(myMood);
  };
  const getRound = (myRound: any) => {
    setMyRound(myRound);
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
        <Modal myMood={myMood} myRound={myRound} open={props.modalOpen} close={props.closeModal}>
          <p className='text-indigo-900 font-bold text-3xl mb-10 text-center'>방 설정</p>
          <div className='flex my-7'>
            <span className='me-5 font-semibold text-xl flex items-center'>게임모드</span>
            <SelectContent getContent={getMood} options={MOPTIONS}></SelectContent>
          </div>
          <div className='flex mb-10'>
            <span className='me-5 font-semibold text-xl flex items-center'>게임진행</span>
            <SelectContent getContent={getRound} options={ROPTIONS}></SelectContent>
            <span className='me-5 font-semibold text-xl flex items-center ms-2'>판</span>
          </div>
          <div>
            {props.children}
          </div>
        </Modal>
      </Fragment>
    </Fragment>
  );
}