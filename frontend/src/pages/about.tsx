// 모달창 보여주기 화면(대기실 설정, 게임 결과)
// 게임 결과는 현재 진행 중
import React, { Fragment, useState } from 'react';
import ResultModal from '../components/common/ResultModal';
import SettingModal from '../components/common/SettingModal';

export default function About() {
  const [inviteModalStatus, setInviteModalStatus] = useState(false);

  // 참여하기 버튼을 누르면 참여 코드를 입력할 수 있는 모달창이 뜸
  const openInviteModal = () => {
    setInviteModalStatus(true);
  };
  const closeInviteModal = () => {
    setInviteModalStatus(false);
  };

  return (
    <Fragment>
      <button
        onClick={openInviteModal}
        className='bg-violet-800 hover:bg-indigo-950 w-60 h-10 rounded-md font-semibold text-lg text-white'
      >
        대기실 방 설정
      </button>
      <SettingModal
        isInviteAreaOpen={true}
        openModal={inviteModalStatus}
        closeModal={closeInviteModal}
      ></SettingModal>
      <div>하하하</div>
      <ResultModal></ResultModal>
    </Fragment>
  );
}
