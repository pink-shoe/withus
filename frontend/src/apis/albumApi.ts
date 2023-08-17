import { AxiosResponse, AxiosError } from 'axios';
import axios from '.';

// 사진 조회
const apiUrl = '/albums'; // 변동될 수 있음

// 토큰 주면 images[] 배열 줄거임.
export async function getAlbumListApi(
  page: number,
  size: number
): Promise<{
  content: { imgId: number; imgUrl: string; savedAt: string }[];
  totalPages: number;
}> {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        page: page,
        size: size,
      },
    });

    console.log('앨범 조회 성공:', response.data);

    return {
      content: response.data.content,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error('실패:', (error as AxiosError).message);
    return {
      content: [],
      totalPages: 0,
    };
  }
}

export async function deleteAlbumApi(imgId: string) {
  try {
    // 특정 주소와 토큰을 변수로 설정합니다.
    const response = await axios.delete(apiUrl + `/${imgId}`);
    console.log(`사진 삭제 성공: ${imgId}`, response.data);
  } catch (error) {
    console.error('실패:', (error as AxiosError).message);
  }
}
