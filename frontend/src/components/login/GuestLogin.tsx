import React from 'react';
import ButtonComponent from '../common/ButtonComponent';
import Container from '@components/common/Container';
import { useAtom } from 'jotai';
import { userAtom } from 'stores/index';
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
    <div>
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
        <p className='font-kdisplay text-lg hover:text-[#FF8D8D] p-3'>
          로그인한 유저만 방을 생성할 수 있습니다.
        </p>
      </div>
      <ButtonComponent onClick={onClickGuestLogin}>
        <div className='font-kdisplay text-xl text-white hover:text-black'>게스트 로그인</div>
      </ButtonComponent>
    </div>
  );
};

export default GuestLogin;
