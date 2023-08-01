import naverimg from '../../assets/btnG_완성형.png';

export default function Naverlogin(): any {
  const NAVER_CLIENT_ID = '추후 생각해보자'; // 발급받은 클라이언트 아이디
  const REDIRECT_URI = 'http://localhost:3000/oauth'; // Callback URL 이건 변경될 수 있음
  const STATE = 'false';
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  const NaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <button className='flex justify-center' onClick={NaverLogin}>
      <img className='w-48 h-auto' src={naverimg} alt='네이버 로그인 버튼' />
    </button>
  );
}
