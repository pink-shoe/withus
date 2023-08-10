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
  const navigate = useNavigate();
  try {
    const response = await axios.delete(apiUrl);
    localStorage.removeItem('token');
    navigate('/login');
    console.log('성공:', response);

    return response;
  } catch (error) {
    console.log('실패:', (error as AxiosError).message);
    return error;
  }
}
