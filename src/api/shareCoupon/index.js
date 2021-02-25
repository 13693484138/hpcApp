import { request } from '@/utils/request'
const coupon = '/coupon'
const shareCoupon = {
  //分享链接查询接口
  selectLinked: (data) => {
    return request({
      url: coupon + "/api/app/ver1_0/coupon/selectLinked",
      method: "post",
      data,
    });
  },
  //领取优惠券接口 
  getCoupon: (data) => {
    return request({
      url: coupon + "/api/app/ver1_0/coupon/getCouponBonusInfo",
      method: "post",
      data,
    });
  },
  //获取用户优惠券
  queryMine: (data) => {
    return request({
      url: coupon + "/api/app/ver2_0/coupon/queryMine",
      method: "post",
      data,
    });
  },
  //获取运营位图片
  sharePictureQuery: (data) => {
    return request({
      url: coupon + "/api/app/ver1_0/coupon/sharePictureQuery",
      method: "post",
      data,
    });
  },
}
export default shareCoupon
