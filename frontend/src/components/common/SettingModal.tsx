// 셀렉트 박스(게임 모드, 게임 라운드)만 포함한 모달창
// 해당 모달창은 방 만들기 버튼을 누르면 나오는 모달창이면서
// 대기실 방 설정 모달창의 토대가 됨

import React, { Fragment, useState } from 'react';
import Modal from './Modal';
import SelectBox from './SelectBox';
import GameStartButton from './GameStartButton';

export default function RoomSetting(props : any) {
  const [myMode, setMyMode] = useState('');
  const [myRound, setMyRound] = useState('');

  const getMode = (myMode: any) => {
    setMyMode(myMode);
  };
  const getRound = (myRound: any) => {
    setMyRound(myRound);
  };

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

  return (
    <Fragment>
      <Fragment>
        <Modal myMode={myMode} myRound={myRound} open={props.modalOpen} close={props.closeModal}>
          <p className='text-indigo-900 font-bold text-3xl mb-10 text-center'>방 설정</p>
          <div className='flex my-7'>
            <span className='me-5 font-semibold text-xl flex items-center'>게임모드</span>
            <SelectBox getContent={getMode} options={MOPTIONS}></SelectBox>
          </div>
          <div className='flex mb-7'>
            <span className='me-5 font-semibold text-xl flex items-center'>게임진행</span>
            <SelectBox getContent={getRound} options={ROPTIONS}></SelectBox>
            <span className='me-5 font-semibold text-xl flex items-center ms-2'>판</span>
          </div>
          <div>
            {props.children}
          </div>
          <div className='flex justify-center'>
            <GameStartButton myMode={myMode} myRound={myRound} />
          </div>
        </Modal>
      </Fragment>
    </Fragment>
  );
}