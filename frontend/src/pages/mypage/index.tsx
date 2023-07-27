import React, { useState } from 'react';
import Logo from '@components/common/Logo';
import Input from '@components/common/Input';
import PhotoAlbum from '@components/photoAlbum/PhotoAlbum';

export default function Mypage() {
  const [nickname, setNickname] = useState('');

  function handleNicknameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNickname(event.target.value);
  }

  return (
    <div className="bg-[url('/src/assets/background2.jpg')] bg">
      <Logo />
      <PhotoAlbum />
    </div>
  );
}
