import { AxiosError } from 'axios';
import axios from '.';

const apiUrl = `/rooms`;

export type roomType = 'coop' | 'team';
// Axios 요청 함수 정의
export const createRoomApi = async (memberId: number, roomRound: number, roomType: string) => {
  try {
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    console.log(memberId, roomRound, roomType);
    const response = await axios.post(apiUrl, { memberId, roomRound, roomType });
    console.log('성공:', response.data);
    return response;
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};
export const participateRoomApi = async (roomCode: number, memberId: number) => {
  try {
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.get(apiUrl + `/${roomCode}/${memberId}`);
    console.log('성공:', response.data);
    return response;
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};

export const updateRoomApi = async (
  roomId: number,
  roomCode: number,
  roomLink: string,
  roomRound: number,
  roomType: roomType
) => {
  try {
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.put(apiUrl + `/${roomId}`, {
      roomCode,
      roomLink,
      roomRound,
      roomType,
    });
    console.log('성공:', response.data);
    return response;
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};

export const exitRoomApi = async (roomId: number, memberId: number) => {
  try {
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.delete(apiUrl + `/${roomId}/${memberId}`);
    console.log('성공:', response.data);
    return response;
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};

export const updateMemberNicknameApi = async (nickname: string) => {
  try {
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.put(apiUrl + `/members/social`, nickname);
    console.log('성공:', response.data);
    return response;
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};