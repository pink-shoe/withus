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
      });
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    },
    flow: 'auth-code',
  });

  return <Button onClick={googleSocialLogin}>Google Button</Button>;
}
