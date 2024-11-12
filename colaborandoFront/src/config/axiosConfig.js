// axiosConfig.js
import axios from 'axios';

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/colaborando/*',
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': "GET, OPTIONS, POST, PUT"
  },
  mode: "no-cors",
});

export default axiosInstance;