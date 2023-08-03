import React, { useState } from 'react';
import { useAtom } from 'jotai';
import Tutorial from '@components/login/Tutorial';
import Logo from '@components/common/Logo';
import GuestLogin from '@components/login/GuestLogin';
import Login from '@components/login/Login';
import { userAtom } from '../../stores/index';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  // Atom 값과 상태 업데이트 함수 가져오기
  const [{ email, nickname }, setUser] = useAtom(userAtom);
  const [enterCode, setEnterCode] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 토큰이 있으면, "/lobby" 페이지로 이동
      navigate('/lobby');
    }
  }, [navigate]);

  function onChangeEnterCode(event: React.ChangeEvent<HTMLInputElement>) {
    setEnterCode(event.target.value);
  }

  function onChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setUser((prev) => ({ ...prev, email: event.target.value }));
    console.log(`이메일 확인: ${email}`);
  }

  function onChangeEmailPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setEmailPassword(event.target.value);
  }

  function onClickGuestLogin() {
    setUser((prev) => ({ ...prev, nickname: nickname }));
    console.log('Nickname:', nickname);
    console.log('Enter Code:', enterCode);
    //로그인 되도록 짜야하고, 입장코드가 잘못된 경우에 입장할 수 없도록 코드 짜야함.
  }

  function onClickSocialLogin() {
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
            <Login
              email={email}
              emailPassword={emailPassword}
              onChangeEmail={onChangeEmail}
              onChangeEmailPassword={onChangeEmailPassword}
              onClickSocialLogin={onClickSocialLogin}
            />
          ) : (
            <GuestLogin
              enterCode={enterCode}
              onChangeEnterCode={onChangeEnterCode}
              onClickGuestLogin={onClickGuestLogin}
            />
          )}

          <Tutorial />
        </div>
      </div>
    </div>
  );
}
