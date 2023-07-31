import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '@components/common/Spinner';

export default function KakaoRedirection() {
  const code = new URL(document.location.toString()).searchParams.get('code');
  console.log(`code: ${code}`);
  const navigate = useNavigate();
  const kakaobackURL = import.meta.env.VITE_KakaobackURL;
  console.log(`카카오 리다이렉션 확인 카카오 URL: ${kakaobackURL}`);

  function handleKakaoLogin() {
    console.log(`handleKakaologin 함수 스타트! 카카오 ${code}`);

    axios
      .get(kakaobackURL, {
        params: {
          code: code,
        },
      })
      .then(
        (r) => {
          console.log(r.data); // 받아온 데이터 확인
          // 받아온 데이터 처리 코드 작성

          navigate('/'); // login이 성공했다면 해당 페이지로 이동
        },
        (error) => {
          console.error('카카오 로그인 실패:', error);
          navigate('/login'); // 로그인 실패시 실패 화면으로 이동
        }
      );
  }

  useEffect(handleKakaoLogin, [navigate, code]); // navigate or code가 변경될 시 자동으로 handleKakaoLogin 실행

  return <Spinner />;
}
