import { useAtom } from 'jotai'; // Import useAtom hook
import { userAtom } from '../../stores/user';
import Container from '@components/common/Container';
import ButtonComponent from '@components/common/ButtonComponent';
import { Link, useNavigate } from '../../router';
import InputComponent from '@components/common/InputComponent';
import { updateMemberApi } from 'apis/memberApi';
import Board from '@components/common/Board';
import Background from '@components/common/Background';
import React, { useState, useEffect } from 'react';
import Modal from '@components/common/Modal';
import { deleteMemberApi } from 'apis/memberApi';
import { getMemberApi } from 'apis/memberApi';

export default function Mypage() {
  const [user, setUser] = useAtom(userAtom);
  const [newNickname, setNewNickname] = useState('');
  const navigate = useNavigate();
  const [isNickNameModalOpen, setIsNickNameModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  // 비정상적인 접근 차단 & 새로고침마다 유저 정보 재확인
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/login');
      // accessToken이 없으면 게스트 or 게스트조차 아닌 로그아웃 상태이니 login 이동
    } else {
      getMemberApi(setUser).catch((error) => {
        console.log('Error fetching data:', error);
      });
    }
  }, []);

  console.log(`닉네임 확인: ${user.nickname}`);

  const OpenNickNameModal = () => {
    setIsNickNameModalOpen(true);
  };

  const CloseNickNameModal = () => {
    setIsNickNameModalOpen(false);
  };

  const OpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  const CloseWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
  };

  const onChangeNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  const UpdateNickName = () => {
    updateMemberApi(newNickname)
      .then(() => {
        setUser((prevUser) => ({
          ...prevUser,
          nickname: newNickname,
        }));
        CloseNickNameModal();
      })
      .catch((error) => {
        console.error('Error updating nickname:', error);
      });
  };

  const WithdrawAccount = async () => {
    try {
      await deleteMemberApi(user.nickname);
      sessionStorage.removeItem('token');
      navigate('/login');
      console.log('성공');
      CloseWithdrawModal();
    } catch (error) {
      console.log('실패:', error);
    }
  };

  const onClickGoLobby = () => {
    navigate('/lobby');
  };

  return (
    <div>
      <Background backgroundType='LOBBY' isLobbyDropdown={false}>
        <Board boardType='LOBBY'>
          <Container type='isBig'>
            <div className='flex justify-center text-3xl pt-10 font-kdisplay'>회원 정보 관리</div>
            <div className='lg:flex justify-center'>
              <InputComponent
                type='nickname'
                label='변경할 닉네임'
                placeholder={user.nickname}
                onChange={onChangeNickName}
              />
            </div>
            <ButtonComponent type='isBig' onClick={OpenNickNameModal}>
              닉네임 변경하기
            </ButtonComponent>
            <Modal openModal={isNickNameModalOpen} isSettingModal={false}>
              <p className='font-kdisplay text-xl flex justify-center'>
                정말로 닉네임을 변경하시겠습니까?
              </p>
              <div className='flex justify-center mt-4'>
                <button
                  className='bg-[#8D98FF] font-kdisplay text-2xl w-24 h-12 text-white rounded-lg hover:bg-violet-700 mr-2'
                  onClick={UpdateNickName}
                >
                  예
                </button>
                <button
                  className='bg-[#FA8D8D] font-kdisplay text-2xl w-24 h-12 text-white rounded-lg hover:bg-red-500 ml-2'
                  onClick={CloseNickNameModal}
                >
                  아니오
                </button>
              </div>
            </Modal>
            <ButtonComponent type='isBig' onClick={onClickGoLobby}>
              로비로 돌아가기
            </ButtonComponent>
            <div className='flex justify-end'>
              <div
                className='font-kdisplay text-lg text-gray-500 pr-4 pt-8 hover:text-black'
                onClick={OpenWithdrawModal}
              >
                회원탈퇴
              </div>
            </div>
            <Modal openModal={isWithdrawModalOpen} isSettingModal={false}>
              <p className='font-kdisplay text-xl flex justify-center'>
                정말로 회원탈퇴를 하시겠습니까?
              </p>
              <div className='flex justify-center mt-4'>
                <button
                  className='bg-[#8D98FF] font-kdisplay text-2xl w-24 h-12 text-white rounded-lg hover:bg-violet-700 mr-2'
                  onClick={WithdrawAccount}
                >
                  예
                </button>
                <button
                  className='bg-[#FA8D8D] font-kdisplay text-2xl w-24 h-12 text-white rounded-lg hover:bg-red-500 ml-2'
                  onClick={CloseWithdrawModal}
                >
                  아니오
                </button>
              </div>
            </Modal>
          </Container>
        </Board>
      </Background>
    </div>
  );
}
