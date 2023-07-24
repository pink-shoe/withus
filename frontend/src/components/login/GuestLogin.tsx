import React from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Container from '@components/common/Container';

interface GuestLoginProps {
  nickname: string;
  enterCode: string;
  onNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGuestLoginClick: () => void;
}

const GuestLogin: React.FC<GuestLoginProps> = ({
  nickname,
  enterCode,
  onNicknameChange,
  onEnterCodeChange,
  onGuestLoginClick,
}) => {
  return (
    <Container>
      <Input
        label='닉네임 설정'
        type='text'
        value={nickname}
        placeholder='placeholder test'
        onChange={onNicknameChange}
      />
      <Input
        label='입장 코드'
        type='text'
        value={enterCode}
        placeholder='placeholder test'
        onChange={onEnterCodeChange}
      />
      <div className='flex justify-center'>
        <p className='text-black hover:text-purple-600'>로그인한 유저만 방을 생성할 수 있습니다.</p>
      </div>
      <Button onClick={onGuestLoginClick}>로그인</Button>
    </Container>
  );
};

export default GuestLogin;
