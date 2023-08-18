// 4명의 참가자 중 한 명이라도 나가면 게임 종료
// 게임 종료를 안내하는 모달창

import { useContext, useEffect } from 'react';
import { ErrorContext } from 'stores/error';
import axios from 'apis/index';

export default function WithAxios({ children }: { children: any }) {
  const { message, setError } = useContext(ErrorContext);

  useEffect(() => {
    axios.interceptors.response.use(
      (res) => {
        if (res.status === 401) {
          return res;
        } else if (res.status >= 400) {
          setError(res.data);
          throw Error;
        } else if (res?.data?.message) {
          setError(res.data);
          throw Error;
        }
        return res;
      },
      (err) => {
        return err;
      }
    );
  }, [message]);
  return children;
}
