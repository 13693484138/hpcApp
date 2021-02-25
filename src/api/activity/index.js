import { request } from '@/utils/request'
const activityServe = '/marketing'
const activity = {
    // 获取货架精选list
    getRecommendList: (data) => {
        return request({
            url: activityServe + '/api/app/ver1_0/active/getProductByActiveType',
            method: 'post',
            data
        })
    },
}
export default activity
