import AxiosInstance from '../utils/ajax'

export const orderList = (page)=>AxiosInstance.get('/order/list',{
    params:{
        page
    }
})

export const orderFinish = () => AxiosInstance.post('/order/finish')