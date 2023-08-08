const DEV = process.env.NODE_ENV === 'development' ? true : false;

const PORT_WEB = ':3000';
const PORT_SERVER = ':9001';
const PORT_OPENVIDU = ':4443';
// const PORT_OPENVIDU_SERVER = ':5000';

const URL_LOCAL = 'http://localhost';
const URL_RELEASE = 'http://connectwithus.site';

export const REDIRECT_URI_KAKAO: string =
  (DEV ? `${URL_LOCAL}${PORT_SERVER}` : URL_RELEASE) + '/kakao'; // 8080
export const REDIRECT_URI_NAVER: string =
  (DEV ? `${URL_LOCAL}${PORT_WEB}` : URL_RELEASE) + '/naver'; // 3000
// export const WS_BASE_URL = DEV ? `ws://localhost${PORT_SERVER}` : 'ws://connectwithus.site';
// export const API_BASE_URL = (DEV ? `${URL_LOCAL}${PORT_SERVER}` : URL_RELEASE) + '/api/v1';

export const OPENVIDU_SERVER_URL =
  // 'http://localhost:5000';
  (DEV ? 'http://localhost' : 'http://connectwithus.site') + PORT_OPENVIDU;
export const OPENVIDU_SERVER_SECRET = DEV ? 'MY_SECRET' : 'WITHUS';
