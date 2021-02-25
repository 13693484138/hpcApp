import { request } from "@/utils/request";
const member = "/member-wx";
const memberServe = {
    // 会员注册登录获取短信验证码
    getMeberSendSMS: (data) => {
        return request({
            url: member + "/v1/userMembers/sendSMS",
            method: "post",
            data,
        });
    },
    //会员登录or注册
    bindMobile: (data) => {
        return request({
            url: member + "/v1/userMembers/bindMobile",
            method: "post",
            data,
        });
    },
    //查询会员信息
    getMemberByUnionId: (data) => {
        return request({
            url: member + "/v1/userMembers/getMemberByUnionId",
            method: "post",
            data,
        });
    },
    //购买付费年卡
    // purchaseCard: (data) => {
    //   return request({
    //     url: member + "/v1/userMemberCardPurchases/purchaseCardToPay",
    //     method: "post",
    //     data,
    //   });
    // },
    // 购买付费年卡
    purchaseCardToPay: (data) => {
        return request({
            url: member + "/v1/userMemberCardPurchases/purchaseCardToPay",
            method: "post",
            data,
        });
    },
    //APP通过TOKEN查询会员
    getMemberByToken: (data) => {
        return request({
            url: member + "/v1/userMembers/getMemberByToken",
            method: "post",
            data,
        });
    },
    //微信分享
    getWechatSignature: (data) => {
        return request({
            url: "/thirdauth/wx/v1/wxauth/getWechatSignature",
            method: "post",
            data,
        });
    },
    //获取安卓下载地址
    getAppVersion: (data) => {
        return request({
            url: "/user/api/app/ver1_0/appVersion/getAppVersion",
            method: "post",
            data,
        });
    },
    //活动id查询活动
    getActiveCode: (data) => {
        return request({
            url: "/marketing/api/app/ver1_0/activePlus/queryProductsByActiveCode",
            method: "post",
            data
        })
    },
    //调起支付列表
    getChannel: (data) => {
        return request({
            url: "/pay/api/app/ver1_0/channel/getChannel",
            method: "post",
            data
        })
    },
    //调起支付宝支付
    purchaseCardToAliPay: (data) => {
        return request({
            url: member + "/v1/userMemberCardPurchases/purchaseCardToAliPay",
            method: "post",
            data
        })
    }
};

export default memberServe;