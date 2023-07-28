const DEV = process.env.NODE_ENV !== 'production';

const PORT_WEB = ':3000';
const PORT_SERVER = ':8080';
const PORT_OPENVIDU = ':4443';

const URL_LOCAL = 'http://localhost';
const URL_RELEASE = 'https://i7a309.p.ssafy.io';

export const REDIRECT_URI_KAKAO: string =
  (DEV ? `${URL_LOCAL}${PORT_SERVER}` : URL_RELEASE) + '/kakao'; // 8080
export const REDIRECT_URI_NAVER: string =
  (DEV ? `${URL_LOCAL}${PORT_WEB}` : URL_RELEASE) + '/naver'; // 3000
export const WS_BASE_URL =
  (DEV ? `ws://localhost${PORT_SERVER}` : 'wss://i7a309.p.ssafy.io') + '/ws/ava';
export const API_BASE_URL = (DEV ? `${URL_LOCAL}${PORT_SERVER}` : URL_RELEASE) + '/api/v1';

export const OPENVIDU_SERVER_URL =
  (DEV ? 'https://localhost' : 'https://i7a309.p.ssafy.io') + PORT_OPENVIDU;
export const OPENVIDU_SERVER_SECRET = DEV ? 'MY_SECRET' : 'avatime';
