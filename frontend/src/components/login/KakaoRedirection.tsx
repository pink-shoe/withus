import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Kakaoredirection() {
  const code = window.location.search;
  const navigate = useNavigate();

  function handleKakaoLogin() {
    console.log(process.env.REACT_APP_URL);
    axios.post(`${process.env.REACT_APP_URL}kakaoLogin${code}`).then((r) => {
      console.log(r.data);

      // 토큰을 받아서 localStorage같은 곳에 저장하는 코드를 여기에 쓴다.
      localStorage.setItem('name', r.data.user_name); // 이름만 저장.

      navigate('/loginSuccess'); //loginSuccess로 보낸다. 아마 카카오,구글,네이버 다 여기로 보내면 될듯;
    });
  }

  useEffect(handleKakaoLogin, [navigate, code]); // navigate or code가 변경될시 자동으로 handleKakaoLogin 실행

  return <div>로그인 중입니다.</div>;
}

export default Kakaoredirection;
