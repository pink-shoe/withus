import { AxiosError } from 'axios';
import { getMemberApi } from './memberApi';
import axios from '.';

const apiUrl = `/members/guest`;

export async function guestLoginApi(
  nickname: string,
  entercode: string,
  setUser: any,
  navigate: any
) {
  try {
    const config = {
      headers: {
        'Content-Type': 'text/plain', // 이 부분을 text/plain으로 설정
      },
    };
    const response = await axios.post(apiUrl + `/room/${entercode}`, nickname, config);
    console.log('1차로 게스트 정보 받아오기 성공:', response.data);
    // 토큰 저장
    sessionStorage.setItem('token', response.data.jwtToken);
    await getMemberApi(setUser);
    navigate(`/waitingrooms/${entercode}`);
  } catch (error) {
    console.error('실패:', (error as AxiosError).message);
    navigate('/login');
  }
}

export async function guestNickNameUpdate(nickname: string, setUser: any) {
  try {
    const response = await axios.post(apiUrl, nickname);

    console.log('성공:', response.data);
    await getMemberApi(setUser);

    return response;
  } catch (error) {
    console.error('실패:', (error as AxiosError).message);
  }
}
