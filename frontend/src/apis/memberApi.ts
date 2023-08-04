import { AxiosError } from 'axios';
import axios from '.';

// 특정 주소와 토큰을 변수로 설정합니다.
const apiUrl = '/members'; // 변동될 수 있음

// Axios 요청 함수 정의
export async function getMemberApi(setUser: any) {
  try {
    const response = await axios.get(apiUrl);

    console.log('성공:', response.data);

    setUser((prevUser: any) => ({
      ...prevUser,
      memberId: response.data.id,
      // memberId: response.data.memberId, // 백엔드 수정 시 해당 코드로 변경 예정
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
    console.error('실패:', (error as AxiosError).message);
  }
}

export async function updateMemberApi(nickname: string) {
  try {
    const response = await axios.patch(apiUrl, nickname, {});

    console.log('성공:', response.data);
  } catch (error) {
    console.log('실패:', (error as AxiosError).message);
  }
}

export async function deleteMemberApi(nickname: string) {
  try {
    const response = await axios.delete(apiUrl);
    console.log('성공:', response);
    return response;
  } catch (error) {
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
}
