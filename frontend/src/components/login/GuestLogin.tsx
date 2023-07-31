import React from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import SmallContainer from '@components/common/SmallContainer';
import { useAtom } from 'jotai';
import { nicknameAtom } from 'stores/index';

interface GuestLoginProps {
  enterCode: string;
  onEnterCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGuestLoginClick: () => void;
}

const GuestLogin: React.FC<GuestLoginProps> = ({
  enterCode,
  onEnterCodeChange,
  onGuestLoginClick,
}) => {
  const [nickname, setNickname] = useAtom(nicknameAtom);

  return (
    <SmallContainer>
      <Input
        label='닉네임 설정'
        type='text'
        value={nickname}
        placeholder='닉네임'
        onChange={(event) => setNickname(event.target.value)}
      />
      <Input
        label='입장 코드'
        type='text'
        value={enterCode}
        placeholder='입장 코드'
        onChange={onEnterCodeChange}
      />
      <div className='flex justify-center'>
        <p className='text-black hover:text-purple-600'>로그인한 유저만 방을 생성할 수 있습니다.</p>
      </div>
      <Button onClick={onGuestLoginClick}>로그인</Button>
    </SmallContainer>
  );
};

export default GuestLogin;
