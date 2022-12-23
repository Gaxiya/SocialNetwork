import axios from "axios";
export const API_URL= `http://localhost:5000`
export const USER_KEY = 'chat_app_user'
const $api = axios.create({
    withCredentials:true,
    baseURL:API_URL,
    headers:{'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true'}
})
$api.interceptors.request.use((config)=>{
    config.headers.Authorization=`Bearer ${localStorage.getItem('token')}`
    return config
})
export default $api


// 'Access-Control-Allow-Origin': '*',
// 'Access-Control-Allow-Headers': '*',
// 'Access-Control-Allow-Credentials': 'true'
