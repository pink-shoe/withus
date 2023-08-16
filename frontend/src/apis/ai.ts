import axios, { AxiosError } from 'axios';
const apiUrl = `${import.meta.env.VITE_API}/ai/predict`;

export const sendRoundInfoApi = async (
  roomId: number,
  image: string,
  currentRound: number,
  shapeId: number
) => {
  try {
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.post(apiUrl, {
      roomId,
      image,
      currentRound,
      shapeId,
    });
    console.log('성공:', response.data);
    return response;
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
};
