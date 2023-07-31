import axios, { AxiosResponse, AxiosError } from 'axios';
import { memberIdAtom, emailAtom, nicknameAtom } from '../stores/index';
import { useAtom } from 'jotai';

// 특정 주소와 토큰을 변수로 설정합니다.
const apiUrl = `${import.meta.env.VITE_API}/api/members`; // 변동될 수 있음
const token = localStorage.getItem('token'); // 토큰 일단 로컬 스토리지

// Axios 요청 함수 정의
export async function myPageApi() {
  try {
    // Request body에 전달할 데이터인데 보낼거 없고

    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('성공:', response.data);
    // memberId : Long , email: String, nickname: String을 받아서 조타이로 전역변수화
    const [, setMemberId] = useAtom(memberIdAtom);
    const [, setEmail] = useAtom(emailAtom);
    const [, setNickname] = useAtom(nicknameAtom);

    setMemberId(response.data.memberId);
    setEmail(response.data.email);
    setNickname(response.data.nickname);
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
  }
}
