import { request } from '@/utils/request'
const reachHomeServe = '/wishorder'
const memberServe = '/member'
const orderServe = '/order'
const reachHome = {
  // 根据地址id获取详细信息
  getAddressInfo: (data) => {
    return request({
      url: memberServe + '/v1/userMemberAddresses/queryById',
      method: 'post',
      data,
    })
  },
  // 查询身份卡列表
  listIdentityCard: (data) => {
    return request({
      url: reachHomeServe + '/api/app/ver1_0/identityCard/getIdentityCardList',
      method: 'post',
      data,
    })
  },
  // 获取用户默认身份卡
  getDefaultIdentityCard: (data) => {
    return request({
      url:
        reachHomeServe + '/api/app/ver1_0/identityCard/getDefaultIdentityCard',
      method: 'post',
      data,
    })
  },
  // 设置用户默认身份卡
  setDefaultIdentityCard: (data) => {
    return request({
      url: reachHomeServe + '/api/app/ver1_0/identityCard/setDefaultCard',
      method: 'post',
      data,
    })
  },
  // 创建身份卡
  saveIdentityBaseInfo: (data) => {
    return request({
      url: reachHomeServe + '/api/app/ver1_0/identityCard/addIdentityCard',
      method: 'post',
      data,
    })
  },
  // 删除身份卡
  removeIdentityCard: (data) => {
    return request({
      url: reachHomeServe + '/api/app/ver1_0/identityCard/removeIdentityCard',
      method: 'post',
      data,
    })
  },
  // 编辑身份卡
  editIdentityCardDetail: (data) => {
    return request({
      url: reachHomeServe + '/api/app/ver1_0/identityCard/editIdentityCard',
      method: 'post',
      data,
    })
  },
  // 根据ID获取身份卡详情
  getIdentityCardDetail: (data) => {
    return request({
      url:
        reachHomeServe + '/api/app/ver1_0/identityCard/getIdentityCardDetail',
      method: 'post',
      data,
    })
  },
  // 创建心愿单
  createWishOrder: (data) => {
    return request({
      url: reachHomeServe + '/api/app/ver1_0/identityCard/createWishOrder',
      method: 'post',
      data,
    })
  },
  // 查询心愿单
  getWishOrderStatus: (data) => {
    return request({
      url: reachHomeServe + '/api/app/ver1_0/identityCard/getWishOrderStatus',
      method: 'post',
      data,
    })
  },
  // 查询心愿单
  getWishOrder: (data) => {
    return request({
      url: orderServe + '/api/app/ver1_0/order/queryWishOrderDetail',
      method: 'post',
      data,
    })
  },
  // 生成订单
  createOrder: (data) => {
    return request({
      url: orderServe + '/api/app/ver1_0/order/createOrder',
      method: 'post',
      data,
    })
  },
  // 订单支付
  wiXiPay: (data) => {
    return request({
      url: orderServe + '/api/app/ver1_0/order/payCreate',
      method: 'post',
      data,
    })
  },
  // 提交反馈原因
  addDislikeReason: (data) => {
    return request({
      url: reachHomeServe+'/api/app/ver1_0/wishOrder/addDislikeReason',
      method: 'post',
      data,
    })
  },
}
export default reachHome
