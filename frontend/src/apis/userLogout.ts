import axios, { AxiosError } from 'axios';

const apiUrl = ``;

export async function userLogoutApi(navigate: any) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    console.log(`JWTtoken: ${localStorage.getItem('token')}`);
    console.log(`accessToken : ${accessToken}`);
    const response = await axios.post(apiUrl, accessToken);
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
