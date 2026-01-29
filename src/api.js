import axios from 'axios';

const api = axios.create({
  baseURL: 'http://sebrain.netlify.app/',
  withCredentials: true,
});

export default api;
