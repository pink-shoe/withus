import { AxiosError } from 'axios';
import axios from './axiosConfig';

// 특정 주소와 토큰을 변수로 설정합니다.
const apiUrl = `${import.meta.env.VITE_API}/albums/image/save`; // 변동될 수 있음

// Axios 요청 함수 정의
export async function albumImageSaveApi(imgUrls: string[]): Promise<void> {
  try {
    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.post(apiUrl, {
      img_url: imgUrls,
    });

    // 요청이 성공하면 데이터를 출력합니다.
    console.log('성공:', response.data);
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.error('실패:', (error as AxiosError).message);
  }
}
