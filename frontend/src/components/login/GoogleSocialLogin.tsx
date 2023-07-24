import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

interface GoogleLoginProps {
  onSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  onFailure: (error: any) => void;
}

function GoogleSocialLogin({ onSuccess, onFailure }: GoogleLoginProps) {
  // 'YOUR_GOOGLE_CLIENT_ID' 는 Google Client id로 변경
  const googleClientId = 'YOUR_GOOGLE_CLIENT_ID';

  function handleGoogleLoginSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    console.log('Google Login Success:', response);
    onSuccess(response);
  }

  function handleGoogleLoginFailure(error: any) {
    console.error('Google Login Error:', error);
    onFailure(error);
  }

  return (
    <GoogleLogin
      className='flex justify-center w-48 h-auto'
      clientId={googleClientId}
      buttonText='Login with Google'
      onSuccess={handleGoogleLoginSuccess}
      onFailure={handleGoogleLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default GoogleSocialLogin;
