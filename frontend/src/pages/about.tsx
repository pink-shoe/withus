// 모달창 보여주기 화면(대기실 설정, 게임 결과)
// 게임 결과는 현재 진행 중
import React, { useState } from 'react';
import { Settings } from 'react-feather';
import SettingModalContainer from '../components/common/SettingModal/SettingModalContainer';
import ResultModal from '../components/common/ResultModal';
import Spinner from '@components/common/Spinner';
import { IGameInfo } from 'apis/gameApi';
import Modal from '@components/common/Modal';

import picture1 from '@src/assets/shapes/4star.png';

export default function About() {
  const [updateModalStatus, setUpdateModalStatus] = useState(false);
  const [gameRoomInfo, setGameRoomInfo] = useState<IGameInfo>();

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
      <SettingModalContainer
        boardType='WAIT'
        isUpdateModal={true}
        openModal={updateModalStatus}
        closeModal={closeUpdateModal}
      ></SettingModalContainer>
      <div>==============구분선=================</div>
      {/* <Modal openModal={true} isSettingModal={false}>
        <div className='flex w-full flex-col justify-center me-2 mt-11 pb-2 font-edisplay text-6xl'>
          <div className='flex justify-center w-full'>
            <span className='text-2xl'>✨</span>
            Round 1<span className='text-3xl'>✨</span>
          </div>
          <div className='flex justify-center items-center mt-11 mb-6 w-full h-48'>
            <div className='flex w-5/12'>
              <img src={picture1} className='w-full h-full' />
            </div>
          </div>
        </div>
      </Modal> */}
      <div>==============구분선=================</div>
      <div className='logo-game'>
          <span className='text'>[</span>
          <span className='text'>
            <div className=' bg-white border-4 border-[#FF8DA3] w-36 h-28 inline-block items-center justify-center align-middle rounded-lg ms-5 me-3'>
            <div className='h-[5.8rem] mt-[0.38rem] flex justify-center'>
            <img src={picture1} />
            </div>  
            </div>
            ] with us
        </span>
      </div>
      <div>==============구분선=================</div>
      <div>==============구분선=================</div>
      {/* <FontAwesomeIcon icon={faCircleUser} size="2xl" style={{color: "#ffffff"}} className='cursor-pointer me-1 text-[42px] z-50' /> */}
      <Settings className='text-white cursor-pointer' />
    </div>
  );
}
