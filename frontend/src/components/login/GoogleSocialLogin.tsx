import googleSymbol from '../../assets/googleSymbol.png';

export default function GoogleSocialLogin() {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLECLIENT_ID;
  const GOOGLE_REDIRECT_URL = import.meta.env.VITE_GOOGLE_URL;

  const link = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URL}&response_type=code&scope=openid email profile`;

  const loginHandler = () => {
    window.location.href = link;
  };
  return (
    <button
      className='bg-white text-[rgba(0,0,0,0.85)] text-30 font-bold px-4 w-64 h-8 mx-auto rounded-[12px] border-2 border-black hover:text-[#4285F4] flex items-center'
      onClick={loginHandler}
    >
      <img src={googleSymbol} className='h-4 w-auto inline-block' />
      <span className='mx-auto'>구글 로그인</span>
    </button>
  );
}
