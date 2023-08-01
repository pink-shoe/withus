import axios from 'axios';

// header에 token넣어주는 기본 설정
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;

export default axios;
