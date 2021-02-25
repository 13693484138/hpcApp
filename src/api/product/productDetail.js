import { request } from '@/utils/request'
const productServe = '/product'
const cartServe = '/cart'
const activityServe = '/marketing';
const messageServe = 'message';
const productDetail = {
  // 获取商品详情
  getProductDetail: (data) => {
    return request({
      url: productServe + '/api/app/ver1_0/product/queryProduct',
      method: 'post',
      data,
    })
  },
  //  获取活动详情
  activityDetail: (data) => {
    return request({
      url:
        activityServe +
        '/api/app/ver1_0/active/getActiveByProductSpuId',
      method: 'post',
      data,
    })
  },
  //  获取看了又看
  activiType: (data) => {
    return request({
      url:
        activityServe +
        '/api/app/ver1_0/active/getProductByActiveType',
      method: 'post',
      data,
    })
  },
  //  获取购物车数量
  cartNum: (data) => {
    return request({
      url:
        cartServe +
        '/api/app/ver1_0/cart/appQuery',
      method: 'post',
      data,
    })
  },
  //  加入购物车
  addCart: (data) => {
    return request({
      url:
        cartServe +
        '/api/app/ver1_0/cart/create',
      method: 'post',
      data,
    })
  },
  //订阅
  isFollow: (data) => {
    return request({
      url:
        activityServe +
        '/api/app/ver1_0/active/user/follow',
      method: 'post',
      data,
    })
  },
  //查看是否有未读消息
  isMsg: (data) => {
    return request({
      url:
      messageServe +
        '/api/app/ver1_0/message/getUnreadMessage',
      method: 'post',
      data,
    })
  },
}
export default productDetail
