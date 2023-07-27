import React, { useState } from 'react';
import MyCarousel from '@components/login/MyCarousel';
import Logo from '@components/common/Logo';
import GuestLogin from '@components/login/GuestLogin';
import SocialLogin from '@components/login/SocialLogin';

export default function Layout() {
  const [nickname, setNickname] = useState('');
  const [enterCode, setEnterCode] = useState('');
  const [email, setEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  function handleNicknameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNickname(event.target.value);
  }

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
  }

  function handleSocialLoginClick() {
    console.log('Email: ', email);
    console.log('Email Password:', emailPassword);
  }

  return (
    // <div className="bg-[url('/src/assets/background2.jpg')] bg-cover">
    <div className="h-screen bg-gradient-to-b from-sky-900 to-pink-800">
      {/* <Logo /> */}
      <div className=' w-full h-[150px] text-5xl text-center items-center flex justify-center font-bold text-white'>[] with us</div>
      {/* <div className='flex justify-center space-x-4 m-4'> */}
      <div className='flex justify-center space-x-4'>
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
              nickname={nickname}
              enterCode={enterCode}
              onNicknameChange={handleNicknameChange}
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
