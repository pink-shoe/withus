import Kakaoimg from '../../assets/kakaoSymbol.png';

export default function KakaoLogin(): any {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_URL;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    // <button className='flex justify-center' onClick={loginHandler}>
    //   <img src={Kakaoimg} alt='카카오 로그인 버튼' />
    // </button>
    <button
      className='bg-[#FEE500] hover:bg-[#FEE500] text-[rgba(0,0,0,0.85)] text-30 font-bold px-4 w-64 h-8 mx-auto rounded-[12px] hover:text-white flex items-center'
      onClick={loginHandler}
    >
      <img src={Kakaoimg} alt='Kakao Logo' className='h-4 w-auto inline-block' />
      <span className='mx-auto'>카카오 로그인</span>
    </button>
  );
}
