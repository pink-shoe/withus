import { AxiosError } from 'axios';
import axios from './axiosConfig';
import { userAtom } from '../stores/index';
import { useAtom } from 'jotai';

// 특정 주소와 토큰을 변수로 설정합니다.
const apiUrl = `${import.meta.env.VITE_API}/api/members`; // 변동될 수 있음

// Axios 요청 함수 정의
export async function myPageApi() {
  try {
    const [user, setUser] = useAtom(userAtom);

    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.get(apiUrl);

    console.log('성공:', response.data);

    setUser((prevUser) => ({
      ...prevUser,
      memberId: response.data.memberId,
      email: response.data.email,
      nickname: response.data.nickname,
    }));

    // setUser({
    //   memberId: response.data.memberId,
    //   email: response.data.email,
    //   nickname: response.data.nickname,
    // }); 이런식의 코드는 권장되지 않음 왜냐면 값의 일부만 변형될 때 삭제될 가능성이 있어서
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.log('실패:', (error as AxiosError).message);
  }
}