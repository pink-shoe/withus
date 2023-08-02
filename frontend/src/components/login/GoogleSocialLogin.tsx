import { useGoogleLogin } from '@react-oauth/google';
import ButtonComponent from '@components/common/ButtonComponent';
import axios from 'axios';

export default function GoogleSocialLogin() {
  const googleSocialLogin = useGoogleLogin({
    scope: 'email profile',
    onSuccess: async ({ code }) => {
      console.log(code);
      axios.post(`${import.meta.env.VITE_API}/api/oauth/google`, { code }).then(({ data }) => {
        console.log(`구글 로그인 토큰 받기 성공 ${data}`);
        localStorage.setItem('token', data);
      });
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    },
    flow: 'auth-code',
  });

  return <ButtonComponent onClick={googleSocialLogin}>Google ButtonComponent</ButtonComponent>;
}
