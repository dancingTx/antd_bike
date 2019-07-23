import AxiosInstance from '../utils/ajax'

export const tableList = (page) => AxiosInstance.get('/table/list',{
    params: {
        page
    }
})