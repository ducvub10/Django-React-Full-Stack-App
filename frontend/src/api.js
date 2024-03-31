import axios from 'axios';
import {ACCESS_TOKEN} from "./constants";

// **interceptor: intercept any request + add any correct headers so don't have to do it manually many times.**
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL //import env variable of localhost and set it to baseURL



})

api.interceptors.request.use(
    (config) =>{
        //look for token in local storage and add it to the header of the request if it exists.
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token){
            config.headers.Authorization = `Bearer ${token}` //embed token in the header
        }
        return config
    },
    (error) =>{
        return Promise.reject(error)
    }
)

export default api