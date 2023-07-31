import axios, { AxiosResponse, AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { nicknameAtom } from '../stores/index'; // 전역 변수로 지정한 nicknameAtom을 불러옵니다.

const apiUrl = `${import.meta.env.VITE_API}/api/members/guest`; // 변동될 수 있음

export async function GuestLoginApi() {
  try {
    const [nickname] = useAtom(nicknameAtom); // nicknameAtom을 불러와서 nickname 상태를 가져옵니다.

    // Request body에 전달할 데이터
    const data = {
      nickname: nickname, // nickname을 data 객체에 추가합니다.
    };

    // axios의 post 메서드를 사용하여 API 요청을 보냅니다.
    const response = await axios.post(apiUrl, data);

    // 요청이 성공하면 데이터를 출력합니다.
    console.log('성공:', response.data);
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
  }
}
