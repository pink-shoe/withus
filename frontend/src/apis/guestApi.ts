import axios, { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { playerAtom, userAtom } from 'stores/user';
import { useNavigate } from 'react-router-dom';
import { getMemberApi } from './memberApi';

const apiUrl = `/members/guest`;

export async function guestLoginApi(nickname: string, entercode: string) {
  const navigate = useNavigate();

  try {
    const [, setUser] = useAtom(userAtom);
    const response = await axios.post(apiUrl + `/room/${entercode}`, nickname);
    console.log('1차로 게스트 정보 받아오기 성공:', response.data);
    // 토큰 저장
    localStorage.setItem('token', response.data.jwtToken);
    getMemberApi(setUser)
      .then(() => navigate(`/waitingrooms/${entercode}`))
      .catch(() => navigate('/login'));
  } catch (error) {
    console.error('실패:', (error as AxiosError).message);
  }
}

export async function guestNickNameUpdate(nickname: string) {
  try {
    const response = await axios.post(apiUrl, nickname);

    console.log('성공:', response.data);
    const [, setUser] = useAtom(userAtom); // useAtom 훅을 이용해 userAtom을 가져옴
    setUser((prevUser) => ({ ...prevUser, nickname: response.data.nickname }));

    return response;
  } catch (error) {
    console.error('실패:', (error as AxiosError).message);
  }
}
