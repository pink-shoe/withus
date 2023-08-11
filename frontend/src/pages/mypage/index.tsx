import { useAtom } from 'jotai'; // Import useAtom hook
import { userAtom } from '../../stores/user';
import Container from '@components/common/Container';
import ButtonComponent from '@components/common/ButtonComponent';
import { Link, useNavigate } from '../../router';
import InputComponent from '@components/common/InputComponent';
import { updateMemberApi } from 'apis/memberApi';
import Board from '@components/common/Board';
import Background from '@components/common/Background';
import React, { useState } from 'react';
import Modal from '@components/common/Modal';

export default function Mypage() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const [isNickNameModalOpen, setIsNickNameModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

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

  const CloseWithdraweModal = () => {
    setIsWithdrawModalOpen(false);
  };

  const onChangeNickName = (data: any) => {
    setUser((prevUser) => ({
      ...prevUser,
      nickname: data.target.value,
    }));
  };

  const UpdateNickName = () => {
    updateMemberApi(user.nickname)
      .then(() => {})
      .catch((error) => {
        console.error('Error updating nickname:', error);
      });
  };

  const onClickGoLobby = () => {
    navigate('/lobby');
  };

  return (
    <div>
      <Background isLobbyPage={true} isLobbyDropdown={false}>
        <Board boardType='LOBBY'>
          <Container type='isBig'>
            <div className='flex justify-center text-3xl pt-10 font-kdisplay'>회원 정보 관리</div>
            <div className='flex justify-center'>
              <InputComponent
                type='nickname'
                label='변경할 닉네임'
                value={user.nickname} // Access the nickname from the userAtom
                placeholder={user.nickname}
                onChange={onChangeNickName}
              />
            </div>
            <ButtonComponent type='isBig' onClick={UpdateNickName}>
              닉네임 변경하기
            </ButtonComponent>
            <ButtonComponent type='isBig' onClick={onClickGoLobby}>
              로비로 돌아가기
            </ButtonComponent>
            <div className='flex justify-end'>
              <Link
                className='font-kdisplay text-lg text-gray-500 pr-4 pt-8 hover:text-black'
                to='/login'
              >
                회원탈퇴
              </Link>
            </div>
          </Container>
        </Board>
      </Background>
    </div>
  );
}
