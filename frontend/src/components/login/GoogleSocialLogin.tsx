import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default function GoogleSocialLogin() {
  const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const credential: string = credentialResponse.credential!;
        console.log(jwtDecode(credential));

        // credentail에서 받은 데이터 서버로 넘겨서 로그인 확인 하고
        //

        navigate('/');
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}
