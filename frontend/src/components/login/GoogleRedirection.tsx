import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Spinner from '@components/common/Spinner';

export default function GoogleRedirection() {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate();
  const googlebackURL = `${import.meta.env.VITE_API}/api/oauth/google`;
  const [isLoading, setIsLoading] = useState(true);

  function handleGoogleLogin() {
    console.log(`handleGooglelogin 스타트! code: ${code}`);

    axios
      .get(googlebackURL, {
        params: {
          code,
        },
      })
      .then(
        (result) => {
          console.log(result.data); // 받아온 데이터 확인
          const { jwtToken, accessToken } = result.data;

          console.log(`jwttoken확인: ${jwtToken}`);
          console.log(`accesstoken확인: ${accessToken}`);

          if (jwtToken) {
            sessionStorage.setItem('token', jwtToken);
          }

          if (accessToken) {
            sessionStorage.setItem('accessToken', accessToken);
          }

          navigate('/lobby'); // login이 성공했다면 해당 페이지로 이동
        },
        (error) => {
          console.error('구글 로그인 실패:', error);
          navigate('/login'); // 구글 실패시 실패 화면으로 이동
        }
      );
  }

  useEffect(handleGoogleLogin, [navigate, code]); // navigate or code가 변경될 시 자동으로 handleKakaoLogin 실행
  if (isLoading) {
    return <Spinner />;
  }

  return null;
}
