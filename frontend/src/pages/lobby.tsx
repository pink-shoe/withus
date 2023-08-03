import React, { Fragment, useEffect, useState } from 'react';
import Modal from '../components/common/Modal';
import SettingModalContainer from '../components/common/SettingModal/SettingModalContainer';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { myPageApi } from 'apis/myPageApi';
import { useAtom } from 'jotai';
import { userAtom } from 'stores/index';
=======
import Background from '@components/common/Background';
>>>>>>> dca94f6be3f6711c709c5b5f897314a55d9729f0

export default function Lobby() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const [makeRoomModal, setMakeRoomModal] = useState(false);
  const [enterRoomModal, setEnterRoomModal] = useState(false);
  // inviteCode는 초대 코드를 의미함
  const [enterCode, setEnterCode] = useState('');

  useEffect(() => {
    myPageApi(setUser).catch((error) => {
      console.log('Error fetching data:', error);
    });
  }, []);

  console.log(`user확인: ${user}`);

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
    setEnterCode('');
  };

  const writeCode = (event: any) => {
    setEnterCode(event.target.value);
  };

  // 시작 버튼을 누르면 입력한 코드에 따라
  // 코드를 다시 입력해야 하거나, 대기실로 넘어감
  // 현재는 콘솔창에 코드가 출력되도록 함
  const onClickParticipantBtn = () => {
    // 예시 코드
    if (enterCode !== 'ddddd') {
      if (enterCode === '') {
        // 공백이면 참여코드를 입력해달라는 창이 뜸
        alert('참여코드를 입력해주세요😳');
      } else {
        // 존재하지 않는 코드를 입력하면 방이 존재하지 않는다고 뜸
        console.log('잘못된 코드 입력');
        alert('방이 존재하지 않습니다😥');
        setEnterCode('');}
    } else {
      console.log(enterCode);
      navigate(`/waitingrooms/${enterCode}`);
    }
  };

  return (
    <Fragment>
      <Background isBoard='lobby'>
      <div className='flex flex-auto justify-center content-center'>
          <Fragment>
            <button
              onClick={openMakeModal}
              className='bg-[#FF8D8D] hover:bg-red-500 me-10 aspect-square h-96 rounded-xl font-medium font-kdisplay text-4xl text-white'
            >
              방 만들기
            </button>
            <SettingModalContainer
              isUpdateModal={false}
              openModal={makeRoomModal}
              closeModal={closeMakeModal}
            ></SettingModalContainer>
          </Fragment>
          <Fragment>
            <button
              onClick={openEnterModal}
              className='bg-[#8D98FF] hover:bg-violet-700 ms-10 aspect-square h-96 rounded-xl font-medium font-kdisplay text-4xl text-white'
            >
              방 참여하기
            </button>
            <Modal openModal={enterRoomModal} closeModal={closeEnterModal}>
              <p className='text-[#514148] font-kdisplay font-medium text-4xl mb-10 text-center'>참여 코드</p>
              <div className='flex mb-7'>
                <span className='me-5 font-kdisplay font-medium text-2xl flex items-center'>참여코드</span>
                <input
                  className='p-2 border-2 w-[19rem] border-[#8D98FF] focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-md font-medium text-2xl text-center text-[#514148] font-kdisplay'
                  placeholder='참여코드 입력'
                  type='text'
                  value={enterCode}
                  onChange={writeCode}
                />
              </div>
              <div className='flex justify-center'>
                <button
                  onClick={onClickParticipantBtn}
                  className='bg-[#8D98FF] hover:bg-violet-700 w-72 h-12 rounded-md font-medium font-kdisplay text-2xl text-white'
                >
                  참여
                </button>
              </div>
            </Modal>
          </Fragment>
        </div>
      </Background>
    </Fragment>
  );
}
