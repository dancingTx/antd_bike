import axios from 'axios'
import { message } from 'antd'
const AxiosInstance = axios.create({
    baseURL: 'https://www.easy-mock.com/mock/5d35b7423b58df20401cf219/mockapi',
    timeout: 1000,
})

AxiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
// Add a response interceptor
AxiosInstance.interceptors.response.use(function (response) {
    // Do something with response data
    const { code, msg } = response.data
    switch (code) {
        case 401:
            message.warning(msg);
            break;
        default:
            break;   
    }
    return response;
    
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
export default AxiosInstance