import React, { useState } from 'react';
import { useAtom } from 'jotai';
import MyCarousel from '@components/login/MyCarousel';
import Logo from '@components/common/Logo';
import GuestLogin from '@components/login/GuestLogin';
import SocialLogin from '@components/login/SocialLogin';
import { nicknameAtom } from '../../stores/index';

export default function Layout() {
  // Atom 값과 상태 업데이트 함수 가져오기
  const [nickname, setNickname] = useAtom(nicknameAtom);
  const [enterCode, setEnterCode] = useState('');
  const [email, setEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  function handleEnterCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEnterCode(event.target.value);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleEmailPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmailPassword(event.target.value);
  }

  function handleGuestLoginClick() {
    console.log('Nickname:', nickname);
    console.log('Enter Code:', enterCode);
    //로그인 되도록 짜야함
  }

  function handleSocialLoginClick() {
    console.log('Email: ', email);
    console.log('Email Password:', emailPassword);
  }

  return (
    <div className="bg-[url('/src/assets/background1.jpg')] bg-cover">
      <Logo />
      <div className='flex justify-center space-x-4 m-4'>
        <button className='bg-white' onClick={() => setShowLoginForm(false)}>
          Guest Login
        </button>
        <button className='bg-white' onClick={() => setShowLoginForm(true)}>
          Social Login
        </button>
      </div>
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {showLoginForm ? (
            <SocialLogin
              email={email}
              emailPassword={emailPassword}
              onEmailChange={handleEmailChange}
              onEmailPasswordChange={handleEmailPasswordChange}
              onSocialLoginClick={handleSocialLoginClick}
            />
          ) : (
            <GuestLogin
              enterCode={enterCode}
              onEnterCodeChange={handleEnterCodeChange}
              onGuestLoginClick={handleGuestLoginClick}
            />
          )}

          <MyCarousel />
        </div>
      </div>
    </div>
  );
}
