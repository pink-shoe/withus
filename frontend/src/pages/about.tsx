// 모달창 보여주기 화면(대기실 설정, 게임 결과)
// 게임 결과는 현재 진행 중
import React, { useState } from 'react';
import { Settings } from 'react-feather';
import SettingModalContainer from '../components/common/SettingModal/SettingModalContainer';
import ResultModal from '../components/common/ResultModal';
import Spinner from '@components/common/Spinner';

export default function About() {
  const [updateModalStatus, setUpdateModalStatus] = useState(false);

  // 참여하기 버튼을 누르면 참여 코드를 입력할 수 있는 모달창이 뜸
  const openUpdateModal = () => {
    setUpdateModalStatus(true);
  };
  const closeUpdateModal = () => {
    setUpdateModalStatus(false);
  };

  return (
    <div>
      <Settings onClick={openUpdateModal} className='text-red hover:rotate-45' />
      {/* <SettingModalContainer
        boardType='WAIT'
        isUpdateModal={true}
        openModal={updateModalStatus}
        closeModal={closeUpdateModal}
      ></SettingModalContainer> */}
      <div>==============구분선=================</div>
      {/* <ResultModal></ResultModal> */}
      <div>==============구분선=================</div>
      <div>==============구분선=================</div>
      <div>==============구분선=================</div>
      {/* <FontAwesomeIcon icon={faCircleUser} size="2xl" style={{color: "#ffffff"}} className='cursor-pointer me-1 text-[42px] z-50' /> */}
      <Settings className='text-white cursor-pointer' />
    </div>
  );
}
