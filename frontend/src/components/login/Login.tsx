import KakaoLogin from './KakaoLogin';
import GoogleSocialLogin from './GoogleSocialLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Login() {
  const GOOGLE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLECLIENT_ID;

  return (
    // 화면 밖으로 해당 div가 나가는 것 h-full로 변경함
    <div className='flex flex-col justify-center h-full'>
      <div className='flex flex-wrap justify-center mb-10'>
        <p className='font-kdisplay text-4xl flex hover:text-[#FF8D8D]'>나만의 방과 사진첩을</p>
        <p className='font-kdisplay text-4xl flex hover:text-[#FF8D8D]'>구경해보세요!!</p>
      </div>
      <KakaoLogin />
      <div className='mt-4'>
        <GoogleOAuthProvider clientId={`${GOOGLE_GOOGLE_CLIENT_ID}`}>
          <GoogleSocialLogin />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
