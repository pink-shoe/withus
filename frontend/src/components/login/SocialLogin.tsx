import React from 'react';
// import Input from '../common/Input';
// import Button from '../common/Button';
import SmallContainer from '@components/common/SmallContainer';
import Kakaologin from './KakaoLogin';
// import Naverlogin from './NaverLogin';
import GoogleSocialLogin from './GoogleSocialLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface GuestLoginProps {
  email: string;
  emailPassword: string;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSocialLoginClick: () => void;
}

function SocialLogin({
  // email,
  // emailPassword,
  // onEmailChange,
  // onEmailPasswordChange,
  // onSocialLoginClick,
}: GuestLoginProps) {
  const GOOGLE_REST_API_KEY = import.meta.env.VITE_GoogleClient_ID;

  return (
    <SmallContainer>
      {/* <Input
        label='이메일'
        type='email'
        value={email}
        placeholder='placeholder test'
        onChange={onEmailChange}
      />
      <Input
        label='비밀 번호'
        type='password'
        value={emailPassword}
        placeholder='비밀번호 입력'
        onChange={onEmailPasswordChange}
      />
      <Button onClick={onSocialLoginClick}>로그인</Button>
      <Naverlogin /> */}
      <div className='flex mb-3'>
      <span className='flex items-center h-10 px-20 bg-violet-800 text-white hover:bg-slate-800 hover:text-white rounded-lg m-2'>Social Login</span>
      <span className='flex items-center h-10 px-20 hover:bg-slate-800 hover:text-white rounded-lg m-2'>Guest Login</span>

      </div>
      <div className='flex justify-center'>
        <span className='flex items-center h-40 text-xl'>로그인하고 나만의 사진을 저장해보세요😊</span>
      </div>
      <span className='flex m-2'>
        <Kakaologin />
      </span>
      <span className='flex mx-2'>
        <GoogleOAuthProvider clientId={`${GOOGLE_REST_API_KEY}`}>
          <div className='w-60'>
            <GoogleSocialLogin />
          </div>
        </GoogleOAuthProvider>
      </span>
      ;
    </SmallContainer>
  );
}

export default SocialLogin;
