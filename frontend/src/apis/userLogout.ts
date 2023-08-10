import axios, { AxiosError } from 'axios';

const memberapiUrl = `${import.meta.env.VITE_API}/api/members`;

export async function userLogoutApi(navigate: any) {
  try {
    const token = localStorage.getItem('token');
    const accessToken = localStorage.getItem('accessToken');
    console.log(`JWTtoken: ${token}`);
    console.log(`accessToken : ${accessToken}`);
    // 두개 확인하고 일단 지금 유저가 어떤 타입인지 부터 확인
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(memberapiUrl, { headers });
    console.log(`login타입 확인: ${response.data.loginType}`);

    if (response.data.loginType === 'kakao') {
      const link = `https://kapi.kakao.com/v1/user/logout`;
    } else if (response.data.loginType === 'google') {
    }

    console.log('data.id:', response.data.id);

    if (response.data.id !== null && response.data.id !== undefined) {
      console.log('로그아웃 됨');
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      navigate('/login');
    } else {
      console.log('로그아웃 안됨');
    }
  } catch (error) {
    console.error('실패:', (error as AxiosError).message);
  }
}
