import Axios from 'axios';
import { debouncedAlert } from '../utils/debounce';
import { useAtom } from 'jotai';
import { errorAtom } from 'stores/error';
// axios 기본 세팅
const axios = Axios.create({
  baseURL: `${import.meta.env.VITE_API}/api`,
  validateStatus: (status) => status < 500,
});

axios.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem('token');
    console.log(jwtToken);
    config.headers['Authorization'] = jwtToken ? `Bearer ${jwtToken}` : '';
    return config;
  },
  (err) => err
);
// 에러 발생시 debouncedAlert 띄우기
axios.interceptors.response.use(
  (res) => {
    if (res.status === 401) {
      return res;
    } else if (res.status >= 400) {
      const error = res.data as string;
      const { errorCode, message } = res.data;
      console.log('aaaaaaaaaaaaaaaaaaaaa', res.data, error);
      const [globalError, setGlobalError] = useAtom(errorAtom);
      console.log('aaaaaaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaa');
      // setGlobalError({ errorCode, message });
      // debouncedAlert(errorCode, message);
      setGlobalError(error);
      debouncedAlert(error);
      throw Error;
    } else if (res?.data?.errorCode) {
      const { errorCode, message } = res.data;
      console.log('aaaaaaaaaaaaaaaaaaaaa', errorCode, message);
      const [globalError, setGlobalError] = useAtom(errorAtom);
      setGlobalError(message);
      debouncedAlert(message);
      throw Error;
    }
    return res;
  },
  (err) => {
    console.log('error interceptor', err);
    const { errorCode, message } = err;
    const [globalError, setGlobalError] = useAtom(errorAtom);
    setGlobalError(message);
    debouncedAlert(message);
    return err;
  }
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
