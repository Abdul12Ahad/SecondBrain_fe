import axios from 'axios';

const api = axios.create({
  baseURL: 'https://secondbrain-be-bl9z.onrender.com',
  withCredentials: true,
});

export default api;
