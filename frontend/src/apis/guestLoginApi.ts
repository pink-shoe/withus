import axios, { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { userAtom } from '../stores/index';

const apiUrl = `${import.meta.env.VITE_API}/api/members/guest`;

export async function GuestLoginApi() {
  try {
    // Get the value of the nickname from the userAtom
    const [{ nickname }] = useAtom(userAtom);

    // Request body에 전달할 데이터
    console.log(`Jotai 잘 가져와지는지 확인 nickname: ${nickname}`);

    // axios의 post 메서드를 사용하여 API 요청을 보냅니다.
    const response = await axios.post(apiUrl, nickname);

    // 요청이 성공하면 데이터를 출력합니다.
    console.log('성공:', response.data);
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.error('실패:', (error as AxiosError).message);
  }
}
