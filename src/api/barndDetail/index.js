import { request } from '@/utils/request'
const activityServe = '/marketing'
const barndDetail = {
   // 品牌头部信息
  BrandInfo: (data) => {
    return request({
      url: activityServe + '/api/app/ver1_0/active/queryActivesByIds',
      method: 'post',
      data,
    })
  },
  // 品牌商品信息
  BrandList: (data) => {
    return request({
      url: activityServe + '/api/app/ver1_0/active/queryPageById', 
      method: 'post',
      data,
    })
  },
}
export default barndDetail
