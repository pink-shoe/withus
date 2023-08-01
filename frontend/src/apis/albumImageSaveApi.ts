import axios, { AxiosResponse, AxiosError } from 'axios';

// 특정 주소와 토큰을 변수로 설정합니다.
const apiUrl = `${import.meta.env.VITE_API}/albums/image/save`; // 변동될 수 있음
const token = localStorage.getItem('token'); // 토큰 일단 로컬 스토리지

// Axios 요청 함수 정의
export async function albumImageSaveApi(): Promise<
  { imgId: number; imgUrl: string; savedAt: string }[]
> {
  try {
    // Request body에 전달할 데이터

    // 헤더에 토큰을 포함하여 요청을 보냅니다.
    const response = await axios.post(apiUrl, {
      headers: {
        Authorization: token,
      },
    });

    // 요청이 성공하면 데이터를 출력합니다.
    console.log('성공:', response.data);

    const images = Array.isArray(response.data)
      ? response.data.map((item: { imgId: number; imgUrl: string; savedAt: string }) => ({
          imgId: item.imgId,
          imgUrl: item.imgUrl,
          savedAt: item.savedAt,
        }))
      : []; // 데이터가 배열이 아니라면 빈 배열을 반환합니다.

    return images; // image 객체를 반환
  } catch (error) {
    // 요청이 실패하면 에러를 출력합니다.
    console.error('실패:', (error as AxiosError).message);
    return []; // 에러 발생 시 빈 배열을 반환합니다.
  }
}
