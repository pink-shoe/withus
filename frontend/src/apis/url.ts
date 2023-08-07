// const DEV = process.env.NODE_ENV !== 'production';
const DEV = true;

const PORT_WEB = ':3000';
const PORT_SERVER = ':9001';
const PORT_OPENVIDU = ':4443';

const URL_LOCAL = 'http://localhost';
const URL_RELEASE = 'http://connectwithus.site';

export const REDIRECT_URI_KAKAO: string =
  (DEV ? `${URL_LOCAL}${PORT_SERVER}` : URL_RELEASE) + '/kakao'; // 9001
export const REDIRECT_URI_NAVER: string =
  (DEV ? `${URL_LOCAL}${PORT_WEB}` : URL_RELEASE) + '/naver'; // 3000
export const WS_BASE_URL =
  (DEV ? `ws://localhost${PORT_SERVER}` : 'wss://connectwithus.site') + '/ws/ava';
export const API_BASE_URL = (DEV ? `${URL_LOCAL}${PORT_SERVER}` : URL_RELEASE) + '/api/v1';

export const OPENVIDU_SERVER_URL = 'http://connectwithus.site:5000/';
// (DEV ? 'https://localhost' : 'https://demos.openvidu.io') + PORT_OPENVIDU;
export const OPENVIDU_SERVER_SECRET = DEV ? 'MY_SECRET' : 'avatime';
