import React, { useState } from 'react';
import { useAtom } from 'jotai';
import Tutorial from '@components/login/Tutorial';
import GuestLogin from '@components/login/GuestLogin';
import Login from '@components/login/Login';
import { userAtom } from '../../stores/user';
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
    console.log(`토큰 있음: ${token}`);
    if (token) {
      // 토큰이 있으면, "/lobby" 페이지로 이동
      navigate('/lobby');
    }
  }, []);

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
    // 게스트는 로비로 보내지 않고 바로 방으로 갈 수 있도록 변경할거임. --------- 게스트 로그인 api 로 가서 서버로 부터 받아오고 정리 아직 미정 --------
  }

  function onClickSocialLogin() {
    console.log('Email: ', email);
    console.log('Email Password:', emailPassword);
  }

  return (
    // <div className="bg-[url('/src/assets/background2.jpg')] bg-cover">
    <div className='h-screen bg-gradient-to-b from-sky-900 to-pink-800'>
      <div className=' w-full h-[150px] text-5xl text-center items-center flex justify-center font-bold text-white'>
        [] with us
      </div>
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
