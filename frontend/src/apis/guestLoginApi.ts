import axios, { AxiosError } from 'axios';

const apiUrl = `/members/guest`;

export async function GuestLoginApi(nickname: string) {
  try {
    // axios의 post 메서드를 사용하여 API 요청을 보냅니다.
    const response = await axios.post(apiUrl, nickname);

    console.log('성공:', response.data);
    // -------------- 게스트 로그인 하면 추가할 부분, 받아온 데이터를 바탕으로 로직 구성 ---------
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.error('실패:', (error as AxiosError).message);
  }
}
