import axios, { AxiosError } from 'axios';

const apiUrl = `/logout`;

export async function UserLogoutApi() {
  try {
    const token = localStorage.getItem('token');
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
      token: token,
    };
    const requestBody = {
      accessToken: accessToken,
    };

    const response = await axios.post(apiUrl, requestBody, { headers });

    console.log('성공:', response.data);
  } catch (error) {
    console.error('실패:', (error as AxiosError).message);
  }
}
