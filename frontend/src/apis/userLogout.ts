import { AxiosError } from 'axios';
import axios from '.';

const apiUrl = `/logout`;

export async function userLogoutApi() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const requestBody = {
      accessToken: accessToken,
    };

    const response = await axios.post(apiUrl, requestBody);

    console.log('성공:', response.data);
  } catch (error) {
    console.error('실패:', (error as AxiosError).message);
  }
}
