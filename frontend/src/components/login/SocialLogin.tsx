import React from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import SmallContainer from '@components/common/SmallContainer';
import Kakaologin from './KakaoLogin';
import Naverlogin from './NaverLogin';
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
  email,
  emailPassword,
  onEmailChange,
  onEmailPasswordChange,
  onSocialLoginClick,
}: GuestLoginProps) {
  const GOOGLE_REST_API_KEY = import.meta.env.VITE_GoogleClient_ID;

  return (
    <SmallContainer>
      <Input
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
      <Kakaologin />
      <Naverlogin />
      <GoogleOAuthProvider clientId={`${GOOGLE_REST_API_KEY}`}>
        <GoogleSocialLogin />
      </GoogleOAuthProvider>
      ;
    </SmallContainer>
  );
}

export default SocialLogin;
