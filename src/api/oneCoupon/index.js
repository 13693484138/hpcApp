import { request } from '@/utils/request'
const coupon = '/coupon'
const oneCoupon = {
  //分享链接查询接口
  getShare: (data) => {
    return request({
      url: coupon + "/api/app/ver2_0/coupon/queryCouponShareSet",
      method: "post",
      data,
    });
  },
  //登录页配置
  getLoginData: (data) => {
    return request({
      url: coupon + "/api/app/ver2_0/single/querySingleRedPacketApp",
      method: "post",
      data,
    });
  },
  //领取页配置
  getReceive: (data) => {
    return request({
      url: coupon + "/api/app/ver2_0/single/querySingleCouponApp",
      method: "post",
      data,
    });
  },
  // 领取优惠券
  getCoupon: (data) => {
    return request({
      url: coupon + "/api/app/ver2_0/coupon/receiveCoupon",
      method: "post",
      data,
    });
  },
  // 领取优惠券列表
  getCouponList: (data) => {
    return request({
      url: coupon + "/api/app/ver2_0/coupon/queryCouponReceiveResult",
      method: "post",
      data,
    });
  },
}
export default oneCoupon
