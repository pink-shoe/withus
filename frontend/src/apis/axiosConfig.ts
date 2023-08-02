import axios from 'axios';

// header에 Bearer 토큰 넣는 기본 설정
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axios;
