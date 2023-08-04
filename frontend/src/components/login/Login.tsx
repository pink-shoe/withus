import KakaoLogin from './KakaoLogin';
import Naverlogin from './NaverLogin';
import GoogleSocialLogin from './GoogleSocialLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Login() {
  const GOOGLE_GOOGLECLIENT_ID = import.meta.env.VITE_GOOGLECLIENT_ID;

  return (
    <div>
      <p className='font-kdisplay text-4xl'> 나만의 방과 사진첩을 구경해보세요!! </p>
      <KakaoLogin />
      <Naverlogin />
      <GoogleOAuthProvider clientId={`${GOOGLE_GOOGLECLIENT_ID}`}>
        <GoogleSocialLogin />
      </GoogleOAuthProvider>
    </div>
  );
}
