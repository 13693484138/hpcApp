<template>
  <div class="user-coupon">
    <img class="bg"
         :src="bg2">
    <!-- 运营位 -->
    <!-- <van-swipe class="my-swipe">
      <van-swipe-item v-for="(v,i) in imgList"
                      @click="selectImg(i)"
                      :key="i"><img :src="v.url" /></van-swipe-item>
    </van-swipe> -->
    <!-- 新人券 -->
    <div class="new-coupon"
         v-if="newCouponList!==undefined&&newCouponList.length>0">
      <h2 class="title">新人专享券</h2>
      <div class="coupon-list">
        <div class="coupon-item flex"
             v-for="v in newCouponList"
             :key="v.cuid">
          <img class="coupon-bg"
               :src="coupon">
          <div class="left">
            <div class="top">
              <span>￥</span>
              <strong>{{v.reduceValue}}</strong>
            </div>
            <p>满{{v.fullValue}}可用</p>
          </div>
          <div class="right">
            <div class="btn"
                 @click="download"><span>立即使用</span></div>
            <h2 class="text-warp">{{v.couponName}}</h2>
            <p class="text-warp">使用规则</p>
            <span class="date">有效期 {{v.startTime.slice(0,10)}} - {{v.endTime.slice(0,10)}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 普通券 -->
    <div class="coupon">
      <h2 class="title">获得优惠券</h2>
      <div class="coupon-list">
        <div class="coupon-item flex"
             v-for="v in couponList"
             :key="v.cuid">
          <img class="coupon-bg"
               :src="coupon">
          <div class="left">
            <div class="top">
              <span>￥</span>
              <strong>{{v.reduceValue}}</strong>
            </div>
            <p>满{{v.fullValue}}可用</p>
          </div>
          <div class="right">
            <div class="btn"
                 @click="download"><span>立即使用</span></div>
            <h2 class="text-warp">{{v.couponName}}</h2>
            <p class="text-warp">使用规则</p>
            <span class="date">有效期 {{v.startTime.slice(0,10)}} - {{v.endTime.slice(0,10)}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 领取用户 -->
    <!-- <div class="friends">
      <h2 class="title no-bottom">看看大家手气</h2>
      <div class="friends-list">
        <div class="friends-item flex">
          <div class="left flex">
            <img class="avatar"
                 src="">
            <div class="desc flex">
              <h2 class="text-warp">Todd Barnes</h2>
              <p class="text-warp">2020.03.01</p>
            </div>
          </div>
          <div class="right">
            <span>￥</span><b>90</b>
          </div>
        </div>
        <div class="friends-item flex">
          <div class="left flex">
            <img class="avatar"
                 src="">
            <div class="desc flex">
              <h2 class="text-warp">Todd Barnes</h2>
              <p class="text-warp">2020.03.01</p>
            </div>
          </div>
          <div class="right">
            <span>￥</span><b>90</b>
          </div>
        </div>
        <div class="friends-item flex">
          <div class="left flex">
            <img class="avatar"
                 src="">
            <div class="desc flex">
              <h2 class="text-warp">Todd Barnes</h2>
              <p class="text-warp">2020.03.01</p>
            </div>
          </div>
          <div class="right">
            <span>￥</span><b>90</b>
          </div>
        </div>
      </div>
    </div> -->
    <van-popup class="coupon-tip"
               v-model="isShow"
               :close-on-click-overlay="false">
      <img class="close"
           @click="isShow=false"
           :src='close' />
      <img class="quan-bg"
           :src="couponBg">
      <div class="header">
        <h2 class="tip-title flex"><img :src="duihao" />成功领取{{countPrict}}元购物津贴</h2>
        <p class="tip-dest">已存入您的补贴包</p>
      </div>
      <div class="main">
        <div class="coupon-list">
          <div class="coupon-item flex"
               v-for="v in couponAllList"
               :key="v.cuid">
            <img class="coupon-bg"
                 :src="coupon">
            <div class="left">
              <div class="top">
                <span>￥</span>
                <strong>{{v.reduceValue}}</strong>
              </div>
              <p>满{{v.fullValue}}可用</p>
            </div>
            <div class="right">
              <div class="btn"
                   @click="download"><span>立即使用</span></div>
              <h2 class="text-warp">{{v.couponName}}</h2>
              <p class="text-warp">使用规则</p>
              <span class="date">有效期 {{v.startTime.slice(0,10)}} - {{v.endTime.slice(0,10)}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer flex">
        <div class="download flex center"
             @click="download">下载APP</div>
        <div class="share  flex center"
             @click="shareCoupon">分享快乐</div>
      </div>
    </van-popup>
    <div class="coupon-share"
         v-if="isShare"
         @click="isShare=false">
      <img class="fenxiang"
           :src='fenxiang' />
      <div class="text">
        <p>点此分享好友</p>
      </div>
    </div>
    <Header />
    <rule-text :text="ruleText" />
  </div>
</template>

<script>
var wx = require("weixin-js-sdk");
import Header from './header.vue';
import { add } from "@/utils/index.js";
import ruleText from './ruleText.vue';
import { pageUrl, appUrl,appid } from "@/utils/config.js";
import { sharePage } from "@/utils/native.js";
export default {
  name: 'userCoupon',
  data () {
    return {
      countPrict: 0,
      ruleText: '',//规则文案
      query: null,// 是否新人信息
      bg2: require('@/images/shareCoupon/bj2.png'),
      coupon: require('@/images/shareCoupon/coupon.png'),
      close: require('@/images/shareCoupon/close.png'),
      duihao: require('@/images/shareCoupon/duihao.png'),
      fenxiang: require('@/images/shareCoupon/fenxiang.png'),
      couponBg: require('@/images/shareCoupon/quan-bg.png'),
      isShow: false,//弹框是否展示
      isShare: false,//分享蒙层
      newCouponList: [],//新人券
      couponList: [],// 优惠券
      couponAllList: [],//新人券+优惠券 全部
      shareConfig: {//分享信息
        linkUrl: `${appUrl}shareCoupon`,
        showShare: true,
        showAlert: false,
        title: "",
        description: "",
        shareImage: '',
      },
      imgList: []
    };
  },
  computed: {

  },
  mounted () {
    this.query = this.$route.query;
    if (window.sessionStorage.getItem('token')) {
      this.$store.commit("setAppToken", window.sessionStorage.getItem('token'));
    }
    this.getCoupon();
    this.init();
  },
  watch: {

  },
  methods: {
    init () {
      this.getShareConfig();
      this.sharePictureQuery();
    },
    //微信分享初始化
    getWechatSignature () {
      var url = window.location.href;
      this.$api.userMembers
        .getWechatSignature({
          appid: appid,
          signatureURL: url,
        })
        .then((res) => {
          wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
          });
          sharePage(this.shareConfig);
        });
    },
    getShareConfig () {
      this.$api.shareCoupon.selectLinked({}).then((res) => {
        this.shareConfig.title = res.mainTitle;
        this.shareConfig.description = res.subTitle;
        this.shareConfig.shareImage = res.shareUrl + '?x-oss-process=image/resize,m_lfit,h_160,w_160';
        if (!!res.explainInfo) {
          this.ruleText = res.explainInfo;
        }
        this.getWechatSignature();
      });
    },
    getCoupon () {
      this.countPrict = 0;
      this.$api.shareCoupon.getCoupon(this.query).then((res) => {
        if (!!res) {
          this.couponAllList = res;
          res.forEach(v => {
            this.countPrict = add(this.countPrict, Number(v.reduceValue));
          })
        }
        this.couponData().then(() => { this.isShow = true; });
      }).catch((err) => {
        this.couponData();
      })
    },
    async sharePictureQuery () {
      this.$api.shareCoupon.sharePictureQuery({}).then(res => {
        if (res != undefined) {
          this.imgList.push(res);
        }
      })
    },
    selectImg (i) {
      // if (!!this.imgList[i].skipUrl) {
      //   window.location.href = this.imgList[i].skipUrl;
      // }
    },
    async couponData () {
      this.$api.shareCoupon.queryMine({
        couponUseStatus: 0,
        pageNum: 1,
        pageSize: 100
      }).then((res) => {
        this.newCouponList = res.data.filter(v => v.newUserFlag === 1);
        this.couponList = res.data.filter(v => v.newUserFlag !== 1);
      });
    },
    download () {
      window.location.href = pageUrl.downloadPage;
    },
    shareCoupon () {
      this.isShow = false;
      this.isShare = true;
    }
  },
  components: {
    Header,
    ruleText
  },
};
</script>

<style scoped lang="scss">
.user-coupon {
  img {
    width: 100%;
    display: block;
  }
  .flex {
    display: flex;
  }
  .center {
    justify-content: center;
    align-items: center;
  }
  .between {
    justify-content: space-between;
    align-items: center;
  }
  .align-items {
    align-items: center;
  }
  .text-warp {
    overflow: hidden; /*内容超出后隐藏*/
    text-overflow: ellipsis; /* 超出内容显示为省略号*/
    white-space: nowrap; /*文本不进行换行*/
  }
  position: relative;
  // min-height: 100vh;
  overflow-y: auto;
  // padding: 0 32px;
  padding-top: 96px;
  background: #fff4d5;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
  }
  .title {
    height: 44px;
    font-size: 32px;
    font-weight: 600;
    color: rgba(38, 38, 40, 1);
    line-height: 44px;
    margin-bottom: 24px;
    padding-left: 46px;
    position: relative;
  }
  .title.no-bottom {
    margin-bottom: 0;
  }
  .title::before {
    position: absolute;
    width: 8px;
    height: 24px;
    content: " ";
    pointer-events: none;
    left: 24px;
    top: 50%;
    background: #ffe456;
    transform: translateY(-50%);
  }
  .my-swipe {
    width: 686px;
    height: 214px;
    margin: 0 auto;
    border-radius: 16px;
    margin-top: 24px;
  }
  .coupon-list {
    .coupon-item {
      position: relative;
      width: 670px;
      height: 220px;
      padding: 12px 24px 36px 24px;
      margin-bottom: -24px;
      .coupon-bg {
        position: absolute;
        z-index: 0;
        left: 0;
        top: 0;
      }
      .left {
        width: 170px;
        height: 172px;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .top {
          display: flex;
          // width: 75px;
          height: 67px;
          font-size: initial;
          letter-spacing: 1px;
          display: flex;
          align-items: baseline;
          padding-top: 14px;
          span {
            font-size: 24px;
            font-weight: 600;
            color: rgba(31, 31, 31, 1);
          }
          strong {
            font-size: 48px;
            font-weight: 600;
            color: rgba(31, 31, 31, 1);
          }
        }
        p {
          height: 26px;
          font-size: 18px;
          color: #666666;
          line-height: 26px;
          letter-spacing: 1px;
          text-align: center;
        }
      }
      .right {
        width: 452px;
        height: 172px;
        z-index: 2;
        padding-top: 24px;
        padding-left: 20px;
        position: relative;
        .btn {
          position: absolute;
          z-index: 2;
          width: 132px;
          height: 56px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100px;
          border: 0.0226rem solid rgba(255, 224, 2, 1);
          right: 16px;
          top: 58px;
          font-size: initial;
          span {
            font-size: 20px;
            font-weight: 500;
            line-height: initial;
            color: rgba(51, 51, 51, 1);
          }
        }
        h2 {
          width: 280px;
          height: 45px;
          font-size: 32px;
          color: rgba(51, 51, 51, 1);
          line-height: 45px;
          letter-spacing: 1px;
          margin-bottom: 22px;
        }
        p {
          width: 280px;
          height: 25px;
          font-size: 18px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 25px;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }
        .date {
          display: block;
          height: 25px;
          font-size: 18px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 25px;
          letter-spacing: 1px;
        }
      }
    }
    // .coupon-item:last-child {
    //   margin-bottom: 0;
    // }
  }
  .new-coupon {
    position: relative;
    z-index: 1;
    width: 686px;
    background: rgba(255, 255, 255, 1);
    border-radius: 24px;
    box-sizing: border-box;
    padding: 40px 8px;
    padding-bottom: 4px;
    margin-top: 24px;
    margin-left: 32px;
  }
  .coupon {
    position: relative;
    z-index: 1;
    width: 686px;
    background: rgba(255, 255, 255, 1);
    border-radius: 24px;
    box-sizing: border-box;
    padding: 40px 8px;
    padding-bottom: 4px;
    margin-top: 32px;
    margin-left: 32px;
  }
  // .friends {
  //   position: relative;
  //   z-index: 1;
  //   width: 686px;
  //   background: rgba(255, 255, 255, 1);
  //   border-radius: 24px;
  //   box-sizing: border-box;
  //   padding: 40px 32px;
  //   margin-top: 32px;
  //   .friends-list {
  //     .friends-item {
  //       position: relative;
  //       width: 622px;
  //       height: 184px;
  //       padding: 36px 0;
  //       .left {
  //         flex: 1;
  //         .avatar {
  //           width: 112px;
  //           height: 112px;
  //           border-radius: 50%;
  //           border: none;
  //           overflow: hidden;
  //           margin-right: 16px;
  //         }
  //         .desc {
  //           margin: 10px 0;
  //           flex-direction: column;
  //           justify-content: space-between;
  //           h2 {
  //             height: 48px;
  //             font-size: 34px;
  //             color: rgba(48, 46, 64, 1);
  //             line-height: 48px;
  //           }
  //           p {
  //             height: 40px;
  //             font-size: 28px;
  //             color: rgba(96, 96, 96, 1);
  //             line-height: 40px;
  //           }
  //         }
  //       }
  //       .right {
  //         margin: 28px 0;
  //         height: 56px;
  //         font-size: initial;
  //         line-height: 56px;
  //         span {
  //           line-height: initial;
  //           font-size: 36px;
  //           font-weight: bold;
  //           color: rgba(255, 59, 48, 1);
  //         }
  //         b {
  //           line-height: initial;
  //           font-size: 40px;
  //           font-weight: bold;
  //           color: rgba(255, 59, 48, 1);
  //         }
  //       }
  //     }
  //     .friends-item::after {
  //       position: absolute;
  //       content: " ";
  //       left: 0;
  //       bottom: 0;
  //       width: 100%;
  //       height: 1px;
  //       background: #c7c7cb;
  //       transform: scaleY(0.5);
  //     }
  //   }
  // }
  .coupon-tip {
    width: 686px;
    padding-bottom: 70px;
    background: transparent;
    border-radius: 16px;
    padding-top: 64px;
    overflow: hidden;
    .close {
      position: absolute;
      left: 24px;
      top: 24px;
      width: 48px;
      height: 48px;
    }
    .quan-bg {
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      // height: 100%;
    }
    .header {
      position: relative;
      height: 150px;
      .tip-title {
        margin-left: 103px;
        height: 56px;
        font-size: 40px;
        color: rgba(0, 0, 0, 1);
        line-height: 56px;
        margin-bottom: 10px;
        img {
          width: 56px;
          height: 56px;
          margin-right: 12px;
        }
      }
      .tip-dest {
        text-align: center;
        height: 42px;
        font-size: 28px;
        color: rgba(136, 136, 136, 1);
        line-height: 42px;
      }
    }
    .main {
      padding: 38px 8px;
      max-height: 444px;
      overflow: auto;
    }
    .main::-webkit-scrollbar {
      /*隐藏滚轮*/
      display: none;
    }
    .footer {
      justify-content: space-between;
      margin-top: 18px;
      height: 110px;
      padding: 0 32px;
      .download {
        width: 280px;
        height: 110px;
        border-radius: 55px;
        border: 4px solid rgba(255, 228, 86, 1);
        line-height: initial;
        font-size: 32px;
        font-weight: bold;
        color: rgba(48, 46, 64, 1);
      }
      .share {
        width: 280px;
        height: 110px;
        background: rgba(255, 228, 86, 1);
        border-radius: 55px;
        line-height: initial;
        font-size: 32px;
        font-weight: bold;
        color: rgba(48, 46, 64, 1);
      }
    }
  }
  .coupon-share {
    background: rgba(0, 0, 0, 0.7);
    width: 750px;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    .fenxiang {
      position: absolute;
      width: 100%;
    }
    .text {
      margin-top: 86px;
      text-align: center;
      font-size: 28px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
    }
  }
}
.user-coupon::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>
