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

export default function Login({
  email,
  emailPassword,
  onChangeEmail,
  onChangeEmailPassword,
  onClickSocialLogin,
}: IEmailLoginProps) {
  const GOOGLE_REST_API_KEY = import.meta.env.VITE_GOOGLECLIENT_ID;

  return (
    <Container>
      <InputComponet
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
      <ButtonComponent onClick={onClickSocialLogin}>로그인</ButtonComponent>
      <KakaoLogin />
      <Naverlogin />
      <GoogleOAuthProvider clientId={`${GOOGLE_REST_API_KEY}`}>
        <GoogleSocialLogin />
      </GoogleOAuthProvider>
      ;
    </Container>
  );
}
