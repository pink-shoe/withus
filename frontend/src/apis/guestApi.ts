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
    const response = await axios.post(apiUrl + `/room/${entercode}`, nickname);
    console.log('1차로 게스트 정보 받아오기 성공:', response.data);
    // 토큰 저장
    localStorage.setItem('token', response.data.jwtToken);
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
