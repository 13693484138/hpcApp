import { request } from '@/utils/request'
const orderServe = '/order'
const pay = "/pay"
const logisticsServe = '/logistics'
const orderDetail = {
    // 获取订单详情
    getOrderDetail: (data) => {
        return request({
            url: orderServe + '/api/app/ver1_0/order/queryOrderDetail',
            method: 'post',
            data
        })
    },
    //商品级别获取物流信息
    getLogistics: (data) => {
        return request({
            url: logisticsServe + '/api/app/ver1_0/logisticsInfo/queryExpressCodeByOrderProductId',
            method: 'post',
            data
        })
    },
    //订单级别查看物流
    queryTranceByOrderId: () => {
        return request({
            url: 'logistics-app/api/app/ver1_0/logisticsInfo/queryTranceByOrderId',
            method: 'post',
            data
        })
    },
    //订单支付
    getOrderPaymentlist: (data) => {
        return request({
            url: orderServe + '/api/app/ver1_0/order/payCreate',
            method: 'post',
            data
        })
    },
    //订单支付
    getOrderPayment: (data) => {
        return request({
            url: pay + '/api/app/ver1_0/gateway/pay',
            method: 'post',
            data
        })
    },
    //取消订单
    getCancelOrder: (data) => {
        return request({
            url: orderServe + '/api/app/ver1_0/order/cancelOrder',
            method: 'post',
            data
        })
    },
    // 确认订单
    completed: (data) => {
        return request({
            url: orderServe + "/api/app/ver1_0/order/completed",
            method: 'post',
            data
        })
    },
    //查看物流
    queryNewExpressCodeByOrderProductId: (data) => {
        return request({
            url: "/newlogistics/api/app/ver1_0/logisticsInfo/queryNewExpressCodeByOrderProductId",
            method: "post",
            data
        })
    }
}
export default orderDetail