import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '@components/common/Spinner';

function KakaoRedirection() {
  const code = new URL(document.location.toString()).searchParams.get('code');
  console.log(`code: ${code}`);
  const navigate = useNavigate();
  const kakaobackURL = import.meta.env.VITE_KakaobackURL;
  console.log(`카카오 리다이렉션 제대로 옴??? 카카오 URL: ${kakaobackURL}`);

  function handleKakaoLogin() {
    console.log(`handleKakaologin 함수 스타트! 카카오 ${code}`);
    axios.post(kakaobackURL, code).then(
      (r) => {
        console.log(r.data); // 받아온 데이터 확인
        const ACCESS_TOKEN = r.data.accessToken;
        // 토큰을 받아서 처리하는 과정을 쓴다.
        // 로컬 스트로지에 저장하는게 보안상 취약하다하니 테스트만 고고.
        localStorage.setItem('token', ACCESS_TOKEN); // 토큰도 저장
        localStorage.setItem('name', r.data.user_name); // 이름도 저장.

        navigate('/'); //login이 성공했다면 해당 페이지로 이동 아마 카카오,구글,네이버 다 여기로 보내면 될듯;
      },
      (error) => {
        console.error('카카오 로그인 실패 :', error);
        navigate('/login'); //로그인 실패시 실패 화면으로 진행 ;
      }
    );
  }

  useEffect(handleKakaoLogin, [navigate, code]); // navigate or code가 변경될시 자동으로 handleKakaoLogin 실행

  return <Spinner />;
}

export default KakaoRedirection;
