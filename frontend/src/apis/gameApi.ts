import { AxiosError } from 'axios';
import axios from '.';
import { IPlayerInfo, IRoom } from 'stores/room';

const apiUrl = `/games`;
export interface ITotalGameResult {
  gameResult: IGameResult;
  shape: IShape;
}
export interface IGameResult {
  captureUrl: string;
  correct: boolean;
  correctRate: number;
  id: number;
  round: number;
}

export interface IShape {
  shapeId: number;
  shapeLabel: string;
  shapeUrl: string;
}
export interface IGameInfo {
  // currentRound: number;
  hostId: number;
  playerInfos: IPlayerInfo[];
  room: IRoom;
  shapes: IShape[];
}

export interface IMvpInfo {
  playerId: number;
  vote: number
}[]

// export interface IMvpResult {
//   playerId: number;
//   vote: number;
// }

// Axios 요청 함수 정의
export const getGameResultApi = async (roomId: number) => {
  const response = await axios.get<ITotalGameResult[]>(apiUrl + `/result/${roomId}`);
  return response.data;
};

export const getGameInfoApi = async (roomId: number) => {
  const response = await axios.get<IGameInfo>(apiUrl + `/${roomId}`);
  return response.data;
};

export const sendCaptureImageApi = async (
  roomId: number,
  currentRound: number,
  formData: FormData
) => {
  const response = await axios.post(apiUrl + `/image/${roomId}/${currentRound}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const electMvpApi = async (roomId: number, votedId: number) => {
  try {
    const response = await axios.post(apiUrl + `/vote/${roomId}`, {
      votedId: votedId,
    });
    console.log('MVP 선택 성공!!', response.data);
    return response.data;
  } catch (error) {
    console.error('MVP 선택 실패!! :', (error as AxiosError).message);
    throw error;
  }
};

export const getMvpResultApi = async (roomId: number) => {
  try {
    const response = await axios.get(apiUrl + `/vote/${roomId}`);
    if (response.status === 200) {
      console.log('MVP 출력 성공:', response.data);
      return response.data;
    } 
  } catch (error) {
    console.log('MVP 출력 실패:', (error as AxiosError).message);
    throw error;
  }
};
