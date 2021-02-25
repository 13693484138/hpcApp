<template>
    <div class="report" style="height:100%">
        <div class="mainIndex" v-if="!lookDetail">
            <img src="@/assets/img/report/bg1.png" style="width:100%" alt="" class="">
            <div class="" style="position:absolute;top:60%;transform:translateY(-50%)">
                <img src="@/assets/img/report/bg2.png" style="width:100%" alt="" class="">
                <img @click="getBill" src="@/assets/img/report/bg3.gif" style="width:100%" alt="" class="">
            </div>
        </div>
        <div class="mainContent"  v-if="lookDetail">
            <img src="@/assets/img/report/re2.png" alt="" style="width:100%;position:absolute;top:0;left:0;z-index:89">
            <div class="fontRegular scroll" style="overflow:hidden;overflow-y:scroll">
                <div class="imgbox" :class="{active:isScroll}" style="position:relative">
                    <img src="@/assets/img/report/re3.png" alt="" style="width:100%;">
                    <div class="center" style="position:absolute;top:0;bottom:0;">
                        <div class="tlogo pcenter">
                            <img src="@/assets/img/report/re1.png" alt="" class="">
                        </div>
                        <div class="border"></div>
                        <div class="userInfo pcenter" >
                            <div class="headImg"  v-if="userInfo && userInfo.headImgUrl">
                                <img alt="" :src="userInfo.headImgUrl" style="width:100%;height:100%;border-radius:50%">
                            </div>
                            <div class="nick">{{userInfo?userInfo.nickName:''}}</div>
                            <img src="@/assets/img/report/re4.png" alt="" v-if="userInfo && userInfo.isPayMember">
                        </div>
                        <!-- <div class="timer pcenter">
                            <span class="point">*</span>
                            <span>荟品仓4年了</span>
                            <span class="point">*</span>
                        </div> -->
                        <div class="border"></div>
                        <div class="desc">
                            <p style="text-align:center">2020年</p>
                            <p style="text-align:center">荟品仓拥有了<span>19</span>家</p>
                            <p style="text-align:center">超大型线下特卖仓</p>
                            <!-- <p>大概过去了：..... [<span>{{billInfo&&billInfo.diffDay?billInfo.diffDay:0}}</span>]天</p> -->
                        </div>
                        <div class="border"></div>
                        <div class="desc">
                            <p style="text-align:center">2020年2月</p>
                            <p style="text-align:center">荟品仓<span>APP</span>上线</p>
                            <p style="text-align:center">线上特卖同步开启</p>
                            <!-- <p style="padding-left:50px">..... [<span>{{billInfo&&billInfo.payAmount?billInfo.payAmount:0}}</span>]元</p> -->
                        </div>
                        <div class="border"></div>
                        <div class="desc">
                            <p style="text-align:center">2020,感谢有你!</p>
                            <!-- <p>超过：..... [<span>{{billInfo&&billInfo.precent?billInfo.precent:'0%'}}</span>]的会员</p> -->
                        </div>
                        <div class="border"></div>
                        <div class="cong" v-show="getBtnShow">
                            <span>送你一份</span>
                            <span style="color:#fd6924;font-weight:600;">年度购物金</span>
                            <!-- <span>领取资格</span> -->
                        </div>
                        <div class="pcenter" v-show="getBtnShow">
                            <img @click="getCoupon" class="getCoupon" src="@/assets/img/report/re5.png" style="height:42px" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <!-- alert -->
            <div class="coupon" v-if="couponShow">
                <div class="box" style="width:300px">
                    <img class="img" src="@/assets/img/report/c3.png" style="width:300px;height:453px" alt="">
                    <div class="couponList noselect" style="width:220px;height:210px;overflow:hidden;overflow-y:scroll;top:150px;">
                        <div style="height:62.5px" class="list row noselect" v-for="(list,index) in couponList" :key="index">
                            <div class="part1 column noselect" style="padding-top: 5px;padding-left:7px;width:140px">
                                <div class="span1" style="width:140px;">{{list.couponName}}</div>
                                <div class="span2" style="width: 132px;font-size:10px;" v-html="list.couponDesc"></div>
                                <!-- <span class="span2" style="font-size:12px;">*{{list.couponDesc}}</span> -->
                            </div>
                            <div class="part2 pcenter noselect">
                                <span style="font-size:16px;transform:translateY(4px)">￥</span>
                                <span style="font-size:35px">{{list.reduceValue}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="share" style="width:290px;top:390px">
                        <img src="@/assets/img/report/c2.png" style="width:290px" alt="">
                        <img @click="isApp?appShare():shareGuide=true" src="@/assets/img/report/c4.png" alt="" class="poscenter" style="width:200px;margin-top:20px">
                    </div>
                    <div class="hrefCoupon pcenter" style="position:relative">
                        <!-- <div class="couponBox noselect">
                            <img src="https://img.hpcang.com/mp_hpc/userCenter/wx.jpg" alt="" class="" style="">
                        </div>
                        <div class="noselect" style="font-size:12px;color:white;margin-top:10px;letter-spacing:2px;">识别查看购物金</div> -->
                        <div style="width:100%;height:100%">
                            <wx-open-launch-weapp
                                id="launch-btn"
                                @error="launchAppError"
                                @launch="launchAppLaunch"
                                @ready="launchAppReady"
                                username="gh_846bc6fe28be"	
                                path="pages/coupon/coupon.html">
                                <script type="text/wxtag-template">
                                    <style>.btn{ text-align:center;width:300px;} .btnImg{display:inline-block;width:230px;height:48px;margin-top:20px}</style>                              
                                    <div class="btn"><img class="btnImg" style="display:inline-block" src="https://img.hpcang.com/mp_hpc/userCenter/c1.png"/></div>
                                </script>
                            </wx-open-launch-weapp>
                        </div>
                    </div>
                    <div class="close" @click="couponShow = false"></div>
                </div>
            </div>
            <div class="coupon" v-if="shareGuide" style="z-index:100" @click="shareGuide = false">
                <img src="@/assets/img/report/share.png" style="width:100%" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import {
  setUnionId,
  getUnionId,
  setOpenId,
  getOpenId,
} from "@/utils/auth";
import {
  isInApp,
  wxAuth,
  getUrlParams,
} from "@/utils/native.js";
import { appid , reportUrl , appUrl } from "@/utils/config.js";
import { Toast } from 'vant';
var wx = require("weixin-js-sdk");
export default {
  name: 'yearReport',
  components: {
  },
  data(){
    return {
        flag:true,
        options:{},
        isApp:false,
        isScroll:false,
        getCouponSuccess:false,
        couponShow:false,
        shareShow:false,
        userInfo:null,
        billInfo:null,
        lookDetail:false,
        getBtnShow:false,
        shareGuide:false,
        couponList:[]
    }
  },
  mounted () {
    this.init();
  },
  methods:{
    init(){
        if(isInApp()){//APP
            this.isApp = true;
            this.getAppInfo();
            this.wechatSignature();
        }else{//微信
            this.wechatSignature()//签名注册
            this.isWxClient().then(()=>{//微信环境
                this.isNeedAuth().then(()=>{
                    this.getUserInfo()//判断用户
                })
            })
        }
    },
    getBill(){//领取购物金
        if(this.isApp){// 拿到用户信息、账单信息
            // this.lookDetail = true
        }else{//非APP 授权 -- 授权跳转-回来重新执行init\注册、拿用户信息、账单信息
            wxAuth(window.location.href)
        }
    },
    isWxClient(){//在微信内部 - 判断
        return new Promise((resolve,reject)=>{
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                resolve()
            } else {
                Toast('请在微信中打开！')
                reject()
            }
        })
    },
    isNeedAuth(){//是否需要授权
        return new Promise((resolve,reject)=>{
            if(getUrlParams("unionId") && getUrlParams("openid")){
                setUnionId(getUrlParams("unionId"));
                setOpenId(getUrlParams("openid"));
                resolve();
            }else{
                reject();
                // wxAuth(window.location.href) // 改为点击领取购物金 手动触发授权
            }
        })
    },
    getUserInfo(){//获取用户信息 通过openId\unionId 判断是否是会员 -- 授权获取用户信息
        return new Promise((resolve)=>{
            let unionId = getUnionId();
            let openId = getOpenId();
            this.$api.userMembers.getMemberByUnionId({
                unionId: unionId,
                openId: openId,
            }).then(res=>{
                if(res){//是会员
                    this.userInfo = res;
                    this.$store.commit("setAppToken", res.token);
                }
                this.lookDetail = true;
                this.animation();
                // this.getReportInfo();
                resolve();
            })
        })
    },
    getReportInfo(){//获取年度账单u
        console.log(this.userInfo.uid);
        return new Promise((resolve)=>{
            this.$api.yearReport.getInfo({userId:this.userInfo.uid}).then(data=>{
                console.log(data)
                if(data){
                    data.precent = '0%';
                    this.billInfo = data;
                    let precent = '0%';
                    let count = this.billInfo.payAmount;
                    if(count >= 1 && count <100){
                        precent = '20.3%';
                    }else if(count >= 100 && count <300){
                        precent = '43.9%';
                    }else if(count >= 300 && count <1000){
                        precent = '67.6%';
                    }else if(count >= 1000 && count <5000){
                        precent = '78.3%';
                    }else if(count >= 5000 && count <10000){
                        precent = '82.6%';
                    }else if(count >= 10000){
                        precent = '98.8%';
                    };
                    this.billInfo.precent = precent;
                }
                resolve()
            })
        })
    },
    getCouponList(){//获取优惠券
        return new Promise((resolve)=>{
            this.$api.yearReport.couponList({userId:this.userInfo.uid,promotionId:1}).then(data=>{
                if(data && data.length > 0){
                    this.couponList = data;
                }
                resolve();
            })
        })
    },
    getCoupon(){//点击领取优惠券
        if(!this.flag){return};
        this.flag = false;
        setTimeout(()=>{
            this.flag = true;
        },800)
        if(this.getCouponSuccess){
             if(this.couponList.length > 0){
                this.couponShow = true;
            }else{
                Toast('购物金已被领完！')
            }
        }else{
            this.getCouponList().then(data=>{
                this.getCouponSuccess = true;
                if(this.couponList.length > 0){
                    this.couponShow = true;
                }else{
                    Toast('购物金已被领完！')
                }
            })
        };
    },
    animation(){//滑动效果
        setTimeout(()=>{
            this.isScroll = true;
        },600);
        setTimeout(()=>{
            this.getBtnShow = true;
        },2600);
    },
    // == app 和 h5 都要用到
    wechatSignature(){//签名注册
        this.$api.userMembers.getWechatSignature({
            appid: appid,
            signatureURL: window.location.href,
        }).then((res) => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appid, // 必填，公众号的唯一标识
                timestamp: res.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.noncestr, // 必填，生成签名的随机串
                signature: res.signature, // 必填，签名
                jsApiList: [
                    "checkJsApi",
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "onMenuShareQQ",
                    "onMenuShareWeibo",
                ], // 必填，需要使用的JS接口列表
                openTagList:[
                    "wx-open-launch-weapp",
                    "wx-open-launch-app"
                ]
            });
            this.sharePage();
        });
    },
    sharePage(){//h5分享配置 + app打开小程序配置
        wx.ready(function () {
            let shareData = {
                // linkUrl:reportUrl,
                linkUrl:'https://h5.hpcang.com/app-h5-v2/yearReport/',
                title: "我领到了，看看你能领多少？",
                desc: "荟品仓¥30000000年度购物金正在发放中...",
                shareImage: 'https://img.hpcang.com/mp_hpc/userCenter/hb2.png',
            };
            wx.onMenuShareAppMessage({//分享给朋友
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.linkUrl,
                imgUrl: shareData.shareImage,
                success: function (res) {
                },
                cancel: function (res) {
                },
                fail: function (res) {
                }
            });
            wx.onMenuShareTimeline({//分享给朋友圈
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.linkUrl,
                imgUrl: shareData.shareImage,
                success: function (res) {
                },
                cancel: function (res) {
                },
                fail: function (res) {
                }
            });
            wx.onMenuShareQQ({// 分享到QQ
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.linkUrl,
                imgUrl: shareData.shareImage,
                success: function (res) {
                },
                cancel: function (res) {
                },
                fail: function (res) {
                }
            });
            wx.onMenuShareQZone({// 分享到QQ空间
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.linkUrl,
                imgUrl: shareData.shareImage,
                success: function (res) {
                },
                cancel: function (res) {
                },
                fail: function (res) {
                }
            });
            wx.onMenuShareWeibo({// 分享到QQ微博
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.linkUrl,
                imgUrl: shareData.shareImage,
                success: function (res) {
                },
                cancel: function (res) {
                },
                fail: function (res) {
                }
            });
        });
        wx.error(function (res) {
            alert(res)
        });
    },
    // ==
    getAppInfo(){//app - 获取用户信息
        this.userInfo = window.hpcapi.systemInfo();
    },
    appShare(){//app分享
        // const opt = {
        //     title: this.options.title,
        //     linkUrl: this.options.linkUrl, // 分享出去带 userId 的url
        //     showShare: true, // 是否展示分享按钮
        //     showAlert: false, // 是否调用原生分享弹框
        // };
        // window.hpcapi.showShareData(JSON.stringify(opt))
    },
    launchAppError(){
        console.log(111)
    },
    launchAppLaunch(){
        console.log(222)
    },
    launchAppReady(){
        console.log(333)
    }
  }
}
</script>
<style lang="scss" scoped>
   @keyframes mymove{
        0%{
        transform: scale(1);  /*开始为原始大小*/
        }
        25%{
            transform: scale(1.1); /*放大1.1倍*/
        }
        50%{
            transform: scale(1);
        }
        75%{
            transform: scale(1.1);
        }
    }
    @-webkit-keyframes mymove /*Safari and Chrome*/
    {
        0%{
        transform: scale(1);  /*开始为原始大小*/
        }
        25%{
            transform: scale(0.9); /*放大1.1倍*/
        }
        50%{
            transform: scale(1);
        }
        75%{
            transform: scale(0.9);
        }
    }
    .getCoupon{
        animation:mymove 2s infinite;
        -webkit-animation:mymove 2s infinite; /*Safari and Chrome*/
        animation-direction:alternate;/*轮流反向播放动画。*/
        animation-timing-function: ease-in-out; /*动画的速度曲线*/
        /* Safari 和 Chrome */
        -webkit-animation:mymove 2s infinite;
        -webkit-animation-direction:alternate;/*轮流反向播放动画。*/
        -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
    }
    
    .row{
        display: flex;
    }
    .rowCenter{
        display: flex;
        align-items: center;
    }
    .pcenter{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .poscenter{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .column{
        display: flex;
        flex-direction:column;
    }
    img{
        display: block;
    }
    .mainIndex,.mainContent{
        background: #ffca3b;
        position: fixed;
        top:0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .mainContent{
        .scroll{
            position:absolute;
            bottom: 0;
            left: 0;
            right:0;
            top:73px;
        }
        .imgbox{
            position:relative;
            top:-80%;
            transition: all 2s;
            .center{
                width:650px;
                left:50%;
                transform: translateX(-50%);
                padding:0 24px;
                .tlogo{
                    height:120px;
                    img{
                        height: 60px;
                        transform: translateY(-0px);
                    }
                }
                .border{
                    width: 100%;
                    height: 1px;
                    background-image:linear-gradient(to right,#bf9885 0%, #bf9885 50%, transparent 50%);
                    background-size:20px 1px;
                    background-repeat:repeat-x;
                }
                .userInfo{
                    height: 120px;
                    .headImg{
                        width:60px;
                        height:60px;
                        border-radius: 50%;
                        border: 1px solid #ffca3b;
                    }
                    .nick{
                        font-size: 38px;
                        color: #ffca3b;
                        margin: 0 20px;
                    }
                    img{
                        height: 40px;
                    }
                }
                .timer{
                    height: 70px;
                    width: 100%;
                    color: white;
                    font-size:38px;
                    background-color: #fd6924;
                    .point{
                        margin:0 8px;
                        // transform: translateY(5px);
                    }
                }
                .desc{
                    padding: 40px 20px;
                    color:#000;
                    p{
                        letter-spacing: 4px;
                        font-size: 34px;
                        line-height: 50px;
                        span{
                            color:#fd6924;
                            font-size: 38px;
                            font-weight:600;
                        }
                    }
                }
                .cong{
                    font-size:34px;
                    height:180px;
                    text-align:center;
                    line-height: 180px;
                    color: #000;
                    letter-spacing: 4px;
                }
            }
        }
        .imgbox.active{
            top:0
        }
        
    }
    // .openbtn{
    //     color: white;
    //     font-size: 32px;
    //     letter-spacing: 4px;
    //     background-color: transparent;
    //     border:none;
    //     width: 380px;
    //     height: 80px;
    //     position: absolute;
    //     top:32px;
    // }
    // coupon
    .coupon{
        z-index: 90;
        position: fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background-color: rgba(0,0,0,.8);
        .box{
            position: absolute;
            top:46%;
            left:50%;
            transform: translateX(-50%) translateY(-50%);
            height: 1050px;
            .couponList{
                position: absolute;
                left:50%;
                transform:translateX(-50%);
                .list{
                    width: 100%;
                    height:125px;
                    background: url("../../assets/img/report/c6.png") center no-repeat;
                    background-size: 100% 100%;
                    margin-bottom:20px;
                    >div{
                        height: 100%;
                    }
                    .part1{
                        justify-content: center;
                        .span1{
                            font-size: 38px;
                            color: red;
                            letter-spacing: 3px;
                            font-weight: 600;
                            text-align: center;
                        }
                        .span2{
                            color:#666;
                            height:36px;
                            line-height:36px;
                            margin-top:10px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .part2{
                        flex:1;
                        span{
                            color:red;
                            font-weight: 600;
                        }
                    }
                }
            }
            .share{
                position: absolute;
                left:50.6%;
                transform: translateX(-50%) translateY(-50%);
            }
        }
        .hrefCoupon{
            width:100%;
            height: 250px;
            position: relative;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            .couponBox{
                width:180px;
                height:180px;
                border:2px solid white;
                padding:4px;
                background-color:rgba(0,0,0,.2);
                border-radius:50%;
                img{
                    width:100%;
                    height:100%;
                    border-radius:50%;
                }
            }
            
        }
        .close{
            width: 90px;
            height: 80px;
            position: absolute;
            top:20px;
            right: 45px;
        }
    }
    .noselect{ 
       -webkit-touch-callout:none; 
       -webkit-user-select:none; 
       -moz-user-select:none; 
       -ms-user-select:none; 
       user-select:none; 
    }

</style>
