import axios, { AxiosResponse, AxiosError } from 'axios';

// 사진 조회
const apiUrl = `${import.meta.env.VITE_API}/albums`; //
const token = localStorage.getItem('token'); // 토큰 일단 로컬 스토리지

// Axios 요청 함수 정의
export async function album() {
  try {
    // Request body에 전달할 데이터

    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: token,
      },
    });
    // 요청이 성공하면 데이터를 출력합니다.
    console.log('성공:', response.data);
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.error('실패:', (error as AxiosError).message);
  }
}
