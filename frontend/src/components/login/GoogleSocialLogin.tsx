import { useGoogleLogin } from '@react-oauth/google';
import Button from '@components/common/Button';
import axios from 'axios';

export default function GoogleSocialLogin() {
  const googleSocialLogin = useGoogleLogin({
    scope: 'email profile',
    onSuccess: async ({ code }) => {
      console.log(code);
      axios.post(import.meta.env.VITE_KakaobackURL, { code }).then(({ data }) => {
        console.log(data);
        // data받아서 어디에 저장해둘까 흠.... 월요일에 물어보자
      });
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    },
    flow: 'auth-code',
  });

  return <Button onClick={googleSocialLogin}>Google Button</Button>;
}
