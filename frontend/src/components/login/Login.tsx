import KakaoLogin from './KakaoLogin';
import Naverlogin from './NaverLogin';
import GoogleSocialLogin from './GoogleSocialLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Login() {
  const GOOGLE_GOOGLECLIENT_ID = import.meta.env.VITE_GOOGLECLIENT_ID;

  return (
    <div className='flex flex-col justify-center h-screen'>
      <div className='flex flex-wrap justify-center mb-10'>
        <p className='font-kdisplay text-4xl flex hover:text-[#FF8D8D]'>나만의 방과 사진첩을</p>
        <p className='font-kdisplay text-4xl flex hover:text-[#FF8D8D]'>구경해보세요!!</p>
      </div>
      <KakaoLogin />
      <div className='mt-4'>
        <GoogleOAuthProvider clientId={`${GOOGLE_GOOGLECLIENT_ID}`}>
          <GoogleSocialLogin />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
