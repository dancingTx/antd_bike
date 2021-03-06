import axios from 'axios'
import { message } from 'antd'
const AxiosInstance = axios.create({
    baseURL: 'https://www.easy-mock.com/mock/5d35b7423b58df20401cf219/mockapi',
    timeout: 5000,
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
    const { data, status } = response
    const { code, msg } = data
    switch (code) {
        case 401:
            message.warning(msg);
            break;
        default:
            break;   
    }
    if(status === 200) {
        return data
    }
    
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
export default AxiosInstance