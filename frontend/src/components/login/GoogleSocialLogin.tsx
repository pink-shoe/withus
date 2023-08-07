import { useGoogleLogin } from '@react-oauth/google';
import googleSymbol from '../../assets/googleSymbol.png';
import axios from 'axios';

export default function GoogleSocialLogin() {
  const googleSocialLogin = useGoogleLogin({
    scope: 'email profile',
    onSuccess: async ({ code }) => {
      console.log(code);
      const googlebackURL = `${import.meta.env.VITE_API}/api/oauth/google`;

      axios.get(googlebackURL, { params: { code } }).then((data: any) => {
        console.log(`구글 로그인 토큰 받기 성공 ${data}`);
        localStorage.setItem('token', data);
      });
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    },
    flow: 'auth-code',
  });

  return (
    <button
      className='bg-white hover:bg-[#4285F4] text-[rgba(0,0,0,0.85)] text-30 font-bold px-4 w-64 h-8 mx-auto rounded-[12px] border-black border hover:text-white flex items-center'
      onClick={googleSocialLogin}
    >
      <img src={googleSymbol} className='h-4 w-auto inline-block' />
      <span className='mx-auto'>구글 로그인</span>
    </button>
  );
}
