import { request } from '@/utils/request'
const yearReport = {
    // 获取js微信签名
    couponList: (data) => {
        return request({
            url:'/marketing/api/app/v1/promotion/year/order/couponList',
            method: 'post',
            data
        })
    },
    getInfo: (data) => {
        return request({
            url:'/marketing/api/app/v1/promotion/year/order/info?userId='+data.userId,
            method: 'GET',
        })
    },
}
export default yearReport