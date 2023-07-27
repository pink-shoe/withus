import React, { useState } from 'react';
import Logo from '@components/common/Logo';
import Input from '@components/common/Input';
import SmallContainer from '@components/common/SmallContainer';
import Button from '@components/common/Button';
import { Link } from '../../router';

export default function Mypage() {
  const [nickname, setNickname] = useState('');

  function handleNicknameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNickname(event.target.value);
  }

  function handleSubmit() {
    console.log('New nickname:', nickname);
  }

  return (
    <div>
      <Logo />
      <SmallContainer>
        <p>마이 페이지</p>
        <Input
          type='text'
          label='변경할 닉네임'
          value={nickname}
          placeholder={nickname}
          onChange={handleNicknameChange}
        />
        <Button onClick={handleSubmit}>변경하기</Button>
        <Link to='/mypage/photoalbum'> 사진첩으로 이동 </Link>
      </SmallContainer>
    </div>
  );
}
