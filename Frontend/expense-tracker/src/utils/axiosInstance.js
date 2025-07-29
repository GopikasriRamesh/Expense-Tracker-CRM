import axios from "axios";
import { BASE_URL } from "./apiPaths";

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
    // You can add any request modifications here, like adding auth tokens
    const accesstoken = localStorage.getItem('token'); // Example: get token from local storage
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // You can handle the response here if needed
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response){
        if(error.response.status === 401) {

            window.location.href = '/login'; // Example redirect
        }else if(error.response.status === 403) {
            console.error('You do not have permission to access this resource.');
        }
    return Promise.reject(error);
    }
  }
);
export default axiosInstance;