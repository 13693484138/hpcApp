import { request } from "@/utils/request";
const afterSaleServe = "/aftersale";
const order = "/order"
const afterSaleDetail = {
    // 通过商品Id查询商品详情
    getProductById: (data) => {
        return request({
            url: order + '/api/app/ver1_0/order/getProductById',
            method: 'post',
            data
        })
    },
    //app创建订单售后单
    appCreate: (data) => {
        return request({
            url: order + '/api/app/ver1_0/aftersale/appCreate',
            method: 'post',
            data
        })
    },
    //获取退款原因
    getAfterSaleReason: (data) => {
        return request({
            url: order + '/api/app/ver1_0/aftersale/getAfterSaleReason',
            method: 'post',
            data
        })
    },
    //查询售后详情
    getAfterSaleById: (data) => {
        return request({
            url: order + '/api/app/ver1_0/aftersale/getAfterSaleById',
            method: 'post',
            data
        })
    },
    //填写物流单号
    insertExpressNo: (data) => {
        return request({
            url: order + '/api/app/ver1_0/aftersale/insertExpressNo',
            method: 'post',
            data
        })
    },
    //取消售后
    cancelAfterSaleById: (data) => {
        return request({
            url: order + '/api/app/ver1_0/aftersale/cancelAfterSaleById',
            method: 'post',
            data
        })
    },
    //订单级别的售后详情查询
    getAfterSaleByOrderId: (data) => {
        return request({
            url: order + '/api/app/ver1_0/aftersale/getAfterSaleByOrderId',
            method: 'post',
            data
        })
    },
    // 售后列表查询
    getAfterPageList: (data) => {
        return request({
            url: order + '/api/app/ver1_0/aftersale/queryPage',
            method: 'post',
            data
        })
    },
    //售后列表详情查询
    getAfterSaleDetail: (data) => {
        return request({
            url: order + '/api/app/ver1_0/aftersale/getAfterSaleDetail',
            method: 'post',
            data
        })
    }

}
export default afterSaleDetail