import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '@components/common/Spinner';

//인증이 필요한 요청이 있을때 사용하는 코드

function KakaoRequest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const url = '뭔지 잘 모르겠는데 아무튼 주소 혹시 못보고 넘어갈까봐 길게 씀';

  useEffect(() => {
    async function fetchData() {
      try {
        // 주소에 데이터 보내기
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setError('API 요청 실패');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // API 요청이 성공하면 받아온 데이터를 표시하도록 구성
  return (
    <div>
      <h2>API Response:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default KakaoRequest;
