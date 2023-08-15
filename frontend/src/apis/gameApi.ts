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
  // shapeUrl: string;
}
export interface IGameInfo {
  currentRound: number;
  hostId: number;
  playerInfos: IPlayerInfo[];
  room: IRoom;
  shapes: IShape;
}
// Axios 요청 함수 정의
export const getGameResultApi = async (roomId: number) => {
  try {
    const response = await axios.get<ITotalGameResult[]>(apiUrl + `/result/${roomId}`);
    if (response.status === 200) {
      console.log('성공:', response.data);
      return response.data;
    } else {
      console.error(response);
    }
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};

export const getGameInfoApi = async (roomId: number) => {
  try {
    const response = await axios.get<IGameInfo>(apiUrl + `/${roomId}`);
    console.log('성공:', response.data);
    return response.data;
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};

export const sendCaptureImageApi = async (
  roomId: number,
  currentRound: number,
  formData: FormData
) => {
  try {
    // const formData = new FormData();
    // formData.append('captureImage', image);
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    console.log(formData);
    const response = await axios.post(apiUrl + `/image/${roomId}/${currentRound}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
