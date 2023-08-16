import axios, { AxiosError } from 'axios';

const memberapiUrl = `${import.meta.env.VITE_API}/api/members`;

export async function userLogoutApi(navigate: any) {
  try {
    const token = sessionStorage.getItem('token');
    const accessToken = sessionStorage.getItem('accessToken');
    console.log(`JWTtoken: ${token}`);
    console.log(`accessToken : ${accessToken}`);
    // 두개 확인하고 일단 지금 유저가 어떤 타입인지 부터 확인
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(memberapiUrl, { headers });
    console.log(`login타입 확인: ${response.data.loginType}`);

    if (response.data.loginType === 'kakao') {
      const link = `https://kapi.kakao.com/v1/user/unlink`;
      const kakaoHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.post(link, null, { headers: kakaoHeaders });
      console.log(`엑세스 토큰 만료 id : ${response.data.id}`);

      // 중복되는 부분
      if (response.data.id !== null && response.data.id !== undefined) {
        console.log('로그아웃 됨');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('accessToken');
        navigate('/login');
      } else {
        console.log('로그아웃 안됨');
      }
    } else if (response.data.loginType === 'google') {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('accessToken');
      const googleLogoutUrl = 'https://accounts.google.com/logout';
      const redirectUri = `http://localhost:5173/login`;

      // Open a new small window for Google logout
      const popup = window.open(googleLogoutUrl, '_blank', 'width=600,height=400');

      // Close the popup and navigate to redirectUri after 0.5 seconds
      setTimeout(() => {
        if (popup) {
          popup.close();
          window.location.href = redirectUri;
        }
      }, 500); // Wait for 0.5 seconds
    }
  } catch (error) {
    console.error('실패:', (error as AxiosError).message);
  }
}
