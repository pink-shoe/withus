import { AxiosError } from 'axios';
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';

// 특정 주소와 토큰을 변수로 설정합니다.
const apiUrl = `${import.meta.env.VITE_API}/api/members`; // 변동될 수 있음

// Axios 요청 함수 정의
export async function withdrawApi() {
  const navigate = useNavigate();

  try {
    // 헤더에 토큰만 포함해서 보내기
    const response = await axios.delete(apiUrl);

    console.log('성공:', response.data);
    localStorage.removeItem('token');
    navigate('/login');

    // 삭제완료!
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.error('실패:', (error as AxiosError).message);
  }
}
