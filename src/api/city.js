import AxiosInstance from '../utils/ajax'

export const cityList = (page)=>AxiosInstance.get('/open_city',{
    params:{
        page
    }
})
export const openCity = (data)=>AxiosInstance.get('/city/open',{
    params:{
        ...data
    }
})