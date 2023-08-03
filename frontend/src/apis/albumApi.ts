import { AxiosResponse, AxiosError } from 'axios';
import axios from './axiosConfig';

// 사진 조회
const apiUrl = `${import.meta.env.VITE_API}/api/albums`; // 변동될 수 있음

// 토큰 주면 images[] 배열 줄거임.
export async function album(): Promise<{ imgId: number; imgUrl: string; savedAt: string }[]> {
  try {
    // Request body에 전달할 데이터는 없고 header는 자동
    const response = await axios.post(apiUrl);

    // 요청이 성공하면 데이터를 출력합니다.
    console.log('성공:', response.data);

    const images = Array.isArray(response.data)
      ? response.data.map((item: { imgId: number; imgUrl: string; savedAt: string }) => ({
          imgId: item.imgId,
          imgUrl: item.imgUrl,
          savedAt: item.savedAt,
        }))
      : []; // 데이터가 배열이 아니라면 빈 배열을 반환합니다.

    return images; // image 객체를 반환
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.error('실패:', (error as AxiosError).message);
    return []; // 에러 발생 시 빈 배열을 반환합니다.
  }
}
