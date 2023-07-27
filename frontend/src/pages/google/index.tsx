import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleSocialLogin from '@components/login/GoogleSocialLogin';

const GOOGLE_REST_API_KEY = import.meta.env.VITE_GoogleClient_Secret;

<GoogleOAuthProvider clientId={`${GOOGLE_REST_API_KEY}`}>
  <GoogleSocialLogin />
</GoogleOAuthProvider>;
