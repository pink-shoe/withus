import { AxiosError } from 'axios';
import axios from '.';
import { useNavigate } from 'react-router-dom';

// 특정 주소와 토큰을 변수로 설정합니다.
const apiUrl = '/members'; // 변동될 수 있음

// Axios 요청 함수 정의
export async function getMemberApi(setUser: any) {
  try {
    const response = await axios.get(apiUrl);

    console.log('성공:', response.data);
    console.log(`memberId: ${response.data.memberId}`);
    console.log(`email: ${response.data.email}`);
    console.log(`nickname: ${response.data.nickname}`);

    setUser((prevUser: any) => ({
      ...prevUser,
      memberId: response.data.memberId, // 백엔드 수정 시 해당 코드로 변경 예정
      email: response.data.email,
      nickname: response.data.nickname,
    }));
  } catch (error) {
    console.error('실패:', (error as AxiosError).message);
  }
}

export async function updateMemberApi(nickname: string) {
  try {
    console.log(`nickname 변경 시작! nickname: ${nickname}`);
    const response = await axios.put(apiUrl, null, {
      params: {
        nickname: nickname,
      },
    });

    console.log('성공:', response.data);
  } catch (error) {
    console.log('실패:', (error as AxiosError).message);
  }
}

//회원탈퇴
export async function deleteMemberApi(nickname: string) {
  const config = {
    headers: {
      'Content-Type': 'text/plain', // 이 부분을 text/plain으로 설정
    },
  };

  try {
    const response = await axios.delete(apiUrl, config);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('accessToken');
    return response; // 성공한 경우 response 반환
  } catch (error) {
    console.log('실패:', (error as AxiosError).message);
    throw error; // 실패한 경우 error 다시 던지기
  }
}
