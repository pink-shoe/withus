import Kakaoimg from '../../assets/kakao_login_medium_narrow.png';

export default function KakaoLogin(): any {
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_URL;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <button className='flex justify-center' onClick={loginHandler}>
      <img src={Kakaoimg} alt='카카오 로그인 버튼' />
    </button>
  );
}