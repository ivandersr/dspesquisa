import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sds1-ivandersr.herokuapp.com/'
});

export default api;
