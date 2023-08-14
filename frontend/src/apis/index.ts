import Axios from 'axios';
// axios 기본 세팅
const axios = Axios.create({
  baseURL: `${import.meta.env.VITE_API}/api`,
  validateStatus: (status) => status < 500,
});

axios.interceptors.request.use(
  (config) => {
    const jwtToken = sessionStorage.getItem('token');
    console.log(jwtToken);
    config.headers['Authorization'] = jwtToken ? `Bearer ${jwtToken}` : '';
    return config;
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
