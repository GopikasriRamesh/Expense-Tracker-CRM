import axios from "axios";
import { BASE_URL } from "./apipaths";

const axiosInstance=axios.create({
    baseURL:BASE_URL,
    timeout:1000,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
    },
});

//Request interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken=localStroage.getItem("token");
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

//response Interpretor
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response){
            if(error.response.status==401){
                window.location.href="/login";
            }
            else if(error.response.status===500){
                console.error("server error.please try again later!!");
            }else if(error.code==="ECONNABORTED"){
                console.error("request timeout.Please try again!!");
            }
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;