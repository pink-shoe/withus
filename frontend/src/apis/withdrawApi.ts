import { AxiosError } from 'axios';
import axios from './axiosConfig';

// 특정 주소와 토큰을 변수로 설정합니다.
const apiUrl = `${import.meta.env.VITE_API}/api/members`; // 변동될 수 있음

// Axios 요청 함수 정의
export async function withdrawApi() {
  try {
    // 헤더에 토큰과 nickname을 포함하여 요청 보내기
    const response = await axios.delete(apiUrl, {});

    console.log('성공:', response.data);
    // 삭제완료!
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.error('실패:', (error as AxiosError).message);
  }
}
