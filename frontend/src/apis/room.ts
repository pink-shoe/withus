import { AxiosError } from 'axios';
import axios from '.';

const apiUrl = `/rooms`;

// Axios 요청 함수 정의
export const createRoomApi = async (memberId: number, roomRound: number, roomType: string) => {
  try {
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    console.log(memberId, roomRound, roomType);
    const response = await axios.post(apiUrl, { id: memberId, roomRound, roomType });
    console.log('성공:', response.data);
    return response;
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};

export const updateRoomApi = async (memberId: number, roomRound: number, roomType: string) => {
  try {
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    console.log(memberId, roomRound, roomType);
    const response = await axios.post(apiUrl, { id: memberId, roomRound, roomType });
    console.log('성공:', response.data);
    return response;
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};
