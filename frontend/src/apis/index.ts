import Axios from 'axios';
import { debouncedAlert } from '../utils/debounce';
// axios 기본 세팅
const axios = Axios.create({
  baseURL: `${import.meta.env.VITE_API}/api`,
  validateStatus: (status) => status < 500,
});

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    console.log(accessToken);
    config.headers['Authorization'] = accessToken ? `Bearer ${accessToken}` : '';
    return config;
  },
  (err) => err
);
// 에러 발생시 debouncedAlert 띄우기
axios.interceptors.response.use(
  (res) => {
    if (res?.data?.error) {
      const { error, message } = res.data;
      debouncedAlert(`${message} (${error})`);
      if (error.status === 401) return res;
      throw Error;
    }
    return res;
  },
  (err) => err
);

// query 인터페이스 정의
export interface query {
  [key: string]: any;
}
// 이전 함수의 결과 값을 인자로 하는 함수
export function secondArgsFetcher<T, TT>(func: (a: T) => TT) {
  return (url: any, args: T) => func(args);
}

export default axios;
