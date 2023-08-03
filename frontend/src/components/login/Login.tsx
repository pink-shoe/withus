import React from 'react';
import InputComponet from '../common/InputComponent';
import ButtonComponent from '../common/ButtonComponent';
import Container from '@components/common/Container';
import KakaoLogin from './KakaoLogin';
import Naverlogin from './NaverLogin';
import GoogleSocialLogin from './GoogleSocialLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface IEmailLoginProps {
  email: string;
  emailPassword: string;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmailPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSocialLogin: () => void;
}

export default function Login({}: // email,
// emailPassword,
// onChangeEmail,
// onChangeEmailPassword,
// onClickSocialLogin,
IEmailLoginProps) {
  const GOOGLE_REST_API_KEY = import.meta.env.VITE_GOOGLECLIENT_ID;

  return (
    <Container>
      {/* <InputComponet
        label='이메일'
        type='email'
        value={email}
        placeholder='placeholder test'
        onChange={onChangeEmail}
      />
      <InputComponet
        label='비밀 번호'
        type='password'
        value={emailPassword}
        placeholder='비밀번호 입력'
        onChange={onChangeEmailPassword}
      />
      <ButtonComponent onClick={onClickSocialLogin}>로그인</ButtonComponent> */}
      <div className='flex mb-3'>
        <span className='flex items-center h-10 px-20 bg-violet-800 text-white hover:bg-slate-800 hover:text-white rounded-lg m-2'>
          Social Login
        </span>
        <span className='flex items-center h-10 px-20 hover:bg-slate-800 hover:text-white rounded-lg m-2'>
          Guest Login
        </span>
      </div>
      <div className='flex justify-center'>
        <span className='flex items-center h-40 text-xl'>
          로그인하고 나만의 사진을 저장해보세요😊
        </span>
      </div>
      <span className='flex m-2'>
        <KakaoLogin />
      </span>
      {/* <Naverlogin /> */}
      <span className='flex mx-2'>
        <GoogleOAuthProvider clientId={`${GOOGLE_REST_API_KEY}`}>
          <div className='w-60'>
            <GoogleSocialLogin />
          </div>
        </GoogleOAuthProvider>
      </span>
    </Container>
  );
}
