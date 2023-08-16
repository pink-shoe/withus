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
  const response = await axios.put(apiUrl + `/members/social`, nickname, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
  return response;
};

export const readyApi = async (roomId: number) => {
  const response = await axios.post(apiUrl + `/ready/${roomId}`);
  return response;
};
export const cancelApi = async (roomId: number) => {
  const response = await axios.post(apiUrl + `/cancel/${roomId}`);
  return response;
};

export const checkStartApi = async (roomId: number) => {
  const response = await axios.get(apiUrl + `/start/${roomId}`);
  return response;
};
