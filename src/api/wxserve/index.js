import { request } from '@/utils/request'
const wxApi = {
    // 获取js微信签名
    getWxsignature: (data) => {
        return request({
            url:'/thirdauth/wx/v1/wxauth/getWechatSignature',
            method: 'post',
            data
        })
    },
}
export default wxApi