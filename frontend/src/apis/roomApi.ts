import { AxiosError } from 'axios';
import axios from '.';
import { IRoomAtom } from 'stores/room';

const apiUrl = `/rooms`;

export type roomType = 'coop' | 'team';

// Axios 요청 함수 정의
export const getRoomInfoApi = async (roomCode: number) => {
  const response = await axios.get<IRoomAtom>(apiUrl + `/info/${roomCode}`);
  return response.data;
};

export const createRoomApi = async (memberId: number, roomRound: number, roomType: string) => {
  // 헤더에 토큰을 포함하여 요청을 보냅니다.
  const response = await axios.post(apiUrl, { memberId, roomRound, roomType });
  return response;
};

export const participateRoomApi = async (roomCode: number) => {
  const response = await axios.get(apiUrl + `/${roomCode}`);
  return response;
};

export const updateRoomApi = async (roomId: number, roomRound: number, roomType: string) => {
  const response = await axios.put(apiUrl + `/${roomId}`, {
    roomRound,
    roomType,
  });
  return response;
};

export const exitRoomApi = async (roomId: number) => {
  const response = await axios.delete(apiUrl + `/${roomId}`);
  return response;
};

export const updateMemberNicknameApi = async (nickname: string) => {
  try {
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.put(apiUrl + `/members/social`, nickname, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    console.log('성공:', response.data);
    return response;
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};

export const readyApi = async (roomId: number) => {
  try {
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.post(apiUrl + `/ready/${roomId}`);
    console.log('성공:', response.data);
    return response;
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};
export const cancelApi = async (roomId: number) => {
  try {
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.post(apiUrl + `/cancel/${roomId}`);
    console.log('성공:', response.data);
    return response;
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};

export const checkStartApi = async (roomId: number) => {
  try {
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.get(apiUrl + `/start/${roomId}`);
    console.log('성공:', response.data);
    return response;
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};
