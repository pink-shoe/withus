import React from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Container from '@components/common/Container';
import Kakaologin from './KakaoLogin';
import Naverlogin from './NaverLogin';
import GoogleSocialLogin from './GoogleSocialLogin';

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
  const handleGoogleLoginSuccess = (response: any) => {
    // Handle successful login here
    console.log('Logged in with Google:', response);
  };

  const handleGoogleLoginFailure = (error: any) => {
    // Handle login failure here
    console.error('Google Login Error:', error);
  };

  return (
    <Container>
      <Input
        label='이메일'
        type='email'
        value={email}
        placeholder='placeholder test'
        onChange={onEmailChange}
      />
      <Input
        label='비밀 번호'
        type='text'
        value={emailPassword}
        placeholder='placeholder test'
        onChange={onEmailPasswordChange}
      />
      <Button onClick={onSocialLoginClick}>로그인</Button>
      <Kakaologin />
      <Naverlogin />
      <GoogleSocialLogin
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
      />
    </Container>
  );
}

export default SocialLogin;
