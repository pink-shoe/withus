import { AxiosError } from 'axios';
import axios from './axiosConfig';
import { userAtom } from '../stores/index';
import { useAtom } from 'jotai';

// 특정 주소와 토큰을 변수로 설정합니다.
const apiUrl = `${import.meta.env.VITE_API}/api/members`; // 변동될 수 있음

// Axios 요청 함수 정의
export async function myPageUpdateApi() {
  try {
    const [{ nickname }] = useAtom(userAtom); // nicknameAtom을 불러와서 nickname 상태를 가져옵니다.

    // 헤더에 토큰과 nickname을 포함하여 요청 보내기
    const response = await axios.patch(apiUrl, nickname, {});

    console.log('성공:', response.data);
    // 닉네임은 이미 변동됐으니 추가로 받아와서 할건 없다.
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
  }
}