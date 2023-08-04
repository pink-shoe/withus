import { AxiosError } from 'axios';
import axios from './axiosConfig';

// 앨범에서
export async function userInfoApi(img_id: string) {
  try {
    // 특정 주소와 토큰을 변수로 설정합니다.
    const apiUrl = `${import.meta.env.VITE_API}/api/albums/${img_id}`;
    const response = await axios.get(apiUrl);
    console.log(`앨범 사진 삭제 성공: ${img_id}`, response.data);
  } catch (error) {
    console.error('실패:', (error as AxiosError).message);
  }
}
