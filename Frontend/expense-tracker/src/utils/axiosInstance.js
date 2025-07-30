import axios from "axios";

// ✅ Use environment variable only
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem('token');
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        console.error('You do not have permission to access this resource.');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
