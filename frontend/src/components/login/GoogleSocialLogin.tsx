import { useGoogleLogin } from '@react-oauth/google';
import ButtonComponent from '@components/common/ButtonComponent';
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

  return <ButtonComponent onClick={googleSocialLogin}>Google ButtonComponent</ButtonComponent>;
}
