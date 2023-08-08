import { Fragment, useEffect, useState } from 'react';
import Modal from '../components/common/Modal';
import SettingModalContainer from '../components/common/SettingModal/SettingModalContainer';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from 'stores/user';
import Background from '../components/common/Background';
import Board from '../components/common/Board';
import { getMemberApi } from 'apis/memberApi';
import { participateRoomApi } from 'apis/roomApi';
import { roomAtom } from 'stores/room';

export default function Lobby() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const [makeRoomModal, setMakeRoomModal] = useState(false);
  const [enterRoomModal, setEnterRoomModal] = useState(false);
  // inviteCode는 초대 코드를 의미함
  const [enterCode, setEnterCode] = useState('');

  useEffect(() => {
    getMemberApi(setUser).catch((error) => {
      console.log('Error fetching data:', error);
    });
  }, []);

  console.log('user확인:', user);

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
  const onClickParticipantBtn = async () => {
    if (enterCode === '') {
      // 공백이면 참여코드를 입력해달라는 창이 뜸
      alert('참여코드를 입력해주세요😳');
    } else {
      const result: any = await participateRoomApi(Number(enterCode), user.memberId);
      if (result.status === 200) {
        setEnterCode('');
        navigate(`/waitingrooms/${enterCode}`);
      }
    }
  };

  return (
    <Fragment>
      {/* 드롭다운 true는 로비 항목이 없고, false는 로비 항목이 있음*/}
      <Background isLobbyDropdown={false} isLobbyPage={true}>
        <Board boardType={'LOBBY'}>
          <div className='flex justify-center content-center'>
            <div>
              {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'> */}
              <button
                onClick={openMakeModal}
                className='bg-[#FF8D8D] hover:bg-red-500 me-2 xl:aspect-square xl:h-96 lg:aspect-square lg:h-80 md:aspect-[3/4] md:h-80 sm:aspect-[3/4] sm:h-60 md:m-8 sm:me-4 aspect-[3/5] h-60 rounded-xl font-medium font-kdisplay text-4xl text-white'
              >
                방 만들기
              </button>
              <SettingModalContainer
                isUpdateModal={false}
                openModal={makeRoomModal}
                closeModal={closeMakeModal}
              ></SettingModalContainer>
            </div>
            <div>
              <button
                onClick={openEnterModal}
                className='bg-[#8D98FF] hover:bg-violet-700 ms-2 xl:aspect-square xl:h-96 lg:aspect-square lg:h-80 md:aspect-[3/4] md:h-80 md:m-8 sm:ms-4 sm:aspect-[3/4] sm:h-60 aspect-[3/4] h-60 rounded-xl font-medium font-kdisplay text-4xl text-white'
              >
                방 참여하기
              </button>
              <Modal openModal={enterRoomModal} closeModal={closeEnterModal} isSettingModal={true}>
                <p className='text-[#514148] font-kdisplay font-medium text-4xl mb-10 text-center'>
                  참여 코드
                </p>
                <div className='flex mb-7'>
                  <span className='me-5 font-kdisplay font-medium text-2xl flex items-center'>
                    참여코드
                  </span>
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
            </div>
          </div>
        </Board>
      </Background>
    </Fragment>
  );
}
