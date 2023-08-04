import React from 'react';
import ButtonComponent from '../common/ButtonComponent';
import Container from '@components/common/Container';
import { useAtom } from 'jotai';
import { userAtom } from 'stores/user';
import InputComponent from '../common/InputComponent';

interface IGuestLoginProps {
  enterCode: string;
  onChangeEnterCode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickGuestLogin: () => void;
}

const GuestLogin: React.FC<IGuestLoginProps> = ({
  enterCode,
  onChangeEnterCode,
  onClickGuestLogin,
}) => {
  const [{ nickname }, setNickname] = useAtom(userAtom); // useAtom에서 setNickname도 가져옴

  // nickname 변경 함수
  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname((prev) => ({ ...prev, nickname: event.target.value }));
  };
  return (
    <Container>
      <InputComponent
        label='닉네임 설정'
        type='text'
        value={nickname}
        placeholder='닉네임'
        onChange={onChangeNickname}
      />
      <InputComponent
        label='입장 코드'
        type='text'
        value={enterCode}
        placeholder='입장 코드'
        onChange={onChangeEnterCode}
      />
      <div className='flex justify-center'>
        <p className='text-black hover:text-purple-600'>로그인한 유저만 방을 생성할 수 있습니다.</p>
      </div>
      <ButtonComponent onClick={onClickGuestLogin}>로그인</ButtonComponent>
    </Container>
  );
};

export default GuestLogin;
