// 모달창 보여주기 화면(대기실 설정, 게임 결과)
// 게임 결과는 현재 진행 중
import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import SettingModalContainer from '../components/common/SettingModal/SettingModalContainer';
import ResultModal from '../components/common/ResultModal';
import EndGameModal from '../components/common/EndGameModal';


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
      {/* <FontAwesomeIcon
        onClick={openUpdateModal}
        icon={faGear}
        size='2xl'
        style={{ color: '#000000' }}
        className='bg-[#D9D9D9] p-2 rounded-full hover:cursor-pointer hover:bg-[#FF8DA3] hover:rotate-12'
      /> */}
      {/* <button
        onClick={openUpdateModal}
        className='bg-violet-800 hover:bg-indigo-950 w-60 h-10 rounded-md font-semibold text-lg text-white'
      >
        대기실 방 설정
      </button> */}
      <SettingModalContainer
        isUpdateModal={true}
        openModal={updateModalStatus}
        closeModal={closeUpdateModal}
      ></SettingModalContainer>
      <div>==============구분선=================</div>
      <ResultModal></ResultModal>
      <div>==============구분선=================</div>
      <EndGameModal></EndGameModal>
      <div>==============구분선=================</div>
      <div>==============구분선=================</div>
      <FontAwesomeIcon icon={faCircleUser} size="2xl" style={{color: "#ffffff"}} className='cursor-pointer me-1 text-[42px] z-50' />
    </div>
  );
}
