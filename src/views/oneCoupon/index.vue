<template>
  <div class="one-coupon"
       ref='oneCoupon'>
    <Loading :isShowLoading="config.show" />
    <Header />
    <img class="bg"
         :src="bg">

    <div class="text">
      <!-- <img :src="zt"> -->
    </div>
    <div class="action">
      <img :src="actionBg" />
      <p>{{config.redPacketPlan}}</p>
      <div class="top">
        <span>￥</span>
        <strong>{{config.redPacketMoney}}</strong>
      </div>
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field class="phone"
                 v-model="tel"
                 type="tel"
                 placeholder="输入手机号码"
                 :maxlength='11' />
      <div class="btn"
           @click="showCode">
        <span>立即领取</span>
      </div>
    </div>
    <rule-text :list="ruleText" />
    <van-popup class="code-group"
               :style="{top:codeTop}"
               v-model="isShow"
               :close-on-click-overlay="false">
      <img class="close"
           @click="closeFn"
           :src='close' />
      <div class="text-group">
        <p>已发送6位验证码至</p>
        <p>+86 {{telText}}</p>
      </div>
      <van-password-input :value="code"
                          :mask="false"
                          :length="6"
                          :focused="showKeyboard"
                          :error-info="errorInfo"
                          @focus="showKeyboard = true" />
      <div class="new-code"
           :class="{active:isNewCode==true}"
           @click="getSendSMS">
        <span>重新获取{{countText}}</span>
      </div>
    </van-popup>
    <!-- 数字键盘 -->
    <van-number-keyboard ref="keyboard"
                         :show="showKeyboard"
                         @input="onInput"
                         @delete="onDelete"
                         @blur="showKeyboard = false"
                         :z-index='3001' />
  </div>
</template>

<script>
import Header from '../shareCoupon/header.vue';
import ruleText from './ruleText.vue';
import Loading from '_c/loading/loading.vue';
import {
  getUserInfo,
  setUnionId,
  getUnionId,
  setOpenId,
  getOpenId,
} from "@/utils/auth";
var wx = require("weixin-js-sdk");
import { validPhone } from "@/utils/validate.js";
import { getUrlParameter, getAppInfo } from "@/utils/index.js";
import { appid, signatureURL, pageUrl, appUrl } from "@/utils/config.js";
import {
  sharePage,
  detectVersion,
  wxAuth,
} from "@/utils/native.js";
export default {
  name: 'shareCoupon',
  data () {
    return {
      id: null,
      config: {
        redPacketPlan: '',
        redPacketMoney: 0,
        show: true
      },
      ruleText: "",
      codeTop: '50%',
      bg: '',
      // bg: ''||require('@/images/shareCoupon/bj.png'),
      // zt: require('@/images/shareCoupon/zi.png'),
      actionBg: require('@/images/shareCoupon/hb.png'),
      close: require('@/images/shareCoupon/close.png'),
      tel: '',//手机号
      telText: '',//验证码手机号展示
      code: '',//验证码
      validate: '',//后端code
      timer: null, //时间器
      count: "60", //计算器
      countText: "", //计算器文字(count)
      isNewCode: true,// 是否重新发送
      isShow: false,//验证码弹框
      showKeyboard: false,// 数组键盘状态
      errorInfo: '',//错误提示,
      user: null,//用户信息
      userId: null,
      userType: 0, //新用户还是老用户  0 ：新用户    1：老用户
      shareConfig: {//分享信息
        linkUrl: ``,
        showShare: true,
        showAlert: false,
        title: "",
        description: "",
        shareImage: '',
      }
    };
  },
  computed: {
  },
  created () {
    this.id = this.$route.query.id || getUrlParameter("id");
    this.shareConfig.linkUrl = `${appUrl}oneCoupon?id=${this.id}`;
  },
  mounted () {
    this.userInit();
    this.getShareConfig();
  },
  watch: {
    'showKeyboard': function (val) {
      if (val) {
        this.codeTop = '30%'
      } else {
        this.codeTop = '50%'
      }
    }
  },
  methods: {
    getConfig () {
      this.$api.oneCoupon.getLoginData({ couponId: this.id }).then(res => {
        if (res) {
          this.config.redPacketPlan = res.redPacketPlan;
          this.config.redPacketMoney = res.redPacketMoney;
          this.bg = res.backgroudUrl;
          this.ruleText = res.explainInfo.split("\n");
          this.config.show = false;
        }
      })
    },
    getShareConfig () {
      this.$api.oneCoupon.getShare({ couponId: this.id }).then((res) => {
        if (res) {
          this.shareConfig.title = res.mainTitle;
          this.shareConfig.description = res.subTitle;
          this.shareConfig.shareImage = res.shareImgUrl;
        }
        this.getWechatSignature();
      });
    },
    closeFn () {
      this.code = '';
      this.isShow = false;
      clearInterval(this.timer);
      this.timer = null;
    },
    onInput (key) {
      this.code = (this.code + key).slice(0, 6);
      if (this.code.length == 6) {
        if (this.code != this.validate) {
          this.errorInfo = '验证码错误';
        } else {
          this.bindMobile().then(() => {
            this.$toast.loading({
              message: '加载中...',
              forbidClick: true,
            });
            let timer = setTimeout(() => {
              this.$toast.clear();
              this.$router.push({ path: '/userOneCoupon', query: { userType: this.userType, userId: this.userId, couponId: this.id } });
              clearTimeout(timer);
              timer = null;
              this.isShow = false;
            }, 1800)
          }).catch(() => {
            this.isShow = false;
          })
        }
      }
    },
    async bindMobile () {
      let openId = getOpenId();
      this.$api.userMembers.bindMobile({
        mobile: this.tel,
        verificationCode: this.code,
        openId: openId,
      }).then((res) => {
        this.loginShow = false;
        this.userId = res.uid;
        this.user = res;
        this.$store.commit("setAppToken", res.token);
        window.sessionStorage.setItem('HPC-TOKEN', res.token);
        this.$store.commit("setUserId", res.uid);
      });
    },
    onDelete () {
      this.errorInfo = '';
      this.code = this.code.slice(0, this.code.length - 1);
    },
    /**
    * 发送短信验证码
    */
    async getSendSMS () {
      if (validPhone(this.tel)) {
        if (this.isNewCode) {
          this.getCode();
          this.$api.userMembers
            .getMeberSendSMS({
              mobile: this.tel,
            })
            .then((res) => {
              this.validate = res.code;
            });
        }
      } else {
        this.$toast.fail("手机号码有误，请重填");
      }
    },
    showCode () {
      if (detectVersion().isWeiXin) {
        if (this.user == null || this.user.isBindMobilePhone == undefined || this.user.isBindMobilePhone == 0) {
          if (this.tel.length == 0) {
            this.$toast('请输入手机号!');
            return
          }
          if (!validPhone(this.tel)) {
            this.$toast('手机号格式错误!');
          } else {
            let arr = /^(\d{3})(\d{4})(\d{4})$/.exec(this.tel);
            this.telText = arr[1] + ' ' + arr[2] + ' ' + arr[3];
            this.isShow = true;
            this.getSendSMS();
          }
        } else {
          if (this.tel != this.user.mobilePhone) {
            this.$toast('手机号与APP绑定的不一致!');
            return
          } else {
            this.$router.push({ path: '/userOneCoupon', query: { userType: this.userType, userId: this.userId, couponId: this.id } });
          }
        }
      } else {
        window.location.href = pageUrl.downloadPage;
      }
    },
    async getCode () {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.countText = `(${TIME_COUNT})`;
        this.isNewCode = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            this.countText = `(${this.count})`;
          } else {
            this.isNewCode = true;
            this.countText = ``;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    //获取来源
    getSource () {
      if (detectVersion().isIOS9) {
        this.$store.commit("setisApp", 20);
      } else if (detectVersion().isAndroid) {
        this.$store.commit("setisApp", 10);
      } else {
        this.$store.commit("setisApp", 90);
      }
    },
    //初始化
    userInit () {
      // 页面配置
      this.getConfig();
      //首先获取来源
      this.getSource();
      if (getUrlParameter("openid") != undefined) {
        if (getUrlParameter("unionId") != undefined) {
          setUnionId(getUrlParameter("unionId"));
          this.isUserType();
        }
        setOpenId(getUrlParameter("openid"));
      } else {
        // if (!!getOpenId()) {
        //   if (!!getUnionId()) {
        //       this.isUserType();
        //   }
        // } else {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          wxAuth(`${appUrl}oneCoupon?id=${this.id}`); //进行微信授权
          // wxAuth(`http://localhost:8088/app-h5-dev-v2/oneCoupon?id=${this.id}`); //进行微信授权
          // }
        }
      }
    },
    //登录
    isUserType () {
      let unionId = getUnionId();
      let openId = getOpenId();
      let that = this;
      this.$api.userMembers
        .getMemberByUnionId({
          unionId: unionId,
          openId: openId,
        })
        .then(
          (res) => {
            if (res === true) {
              this.userType = 0;
              return
            }
            this.user = res;
            this.userType = 1;
            if (this.user != null) {
              this.user = res;
              this.userId = res.uid;
              if (res.isPayMember) {
                this.userType = 2;
              }
              this.tel = this.user.mobilePhone;
              this.$store.commit("setAppToken", res.token);
              window.sessionStorage.setItem('HPC-TOKEN', res.token);
              // this.getWechatSignature();
            }
          });
    },
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
  },
  components: {
    Header,
    ruleText,
    Loading
  },
};
</script>
<style  lang="scss">
.van-key {
  width: auto;
}
.van-password-input {
  width: 480px;
  height: 112px;
  margin: 0 auto;
}
.van-password-input__security {
  height: 112px;
}
.van-password-input__security li {
  background: transparent;
}
.van-password-input__security li::after {
  position: absolute;
  content: " ";
  pointer-events: none;
  top: auto;
  right: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 5px;
  background: #302e40;
}
.van-password-input__security::after {
  border-radius: none;
}
.van-hairline--left::after {
  border: none;
}
.van-password-input__error-info {
  margin-top: 8px;
}
.van-hairline--surround::after {
  border-width: 0;
}
.van-field__control {
  color: #666;
}
.van-field__control::-webkit-input-placeholder {
  color: #666666;
}
</style>
<style scoped lang="scss">
.one-coupon {
  img {
    width: 100%;
    display: block;
  }
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #fff;
  padding-top: 96px;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
  }
  .bg2 {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 0;
  }
  .text {
    position: relative;
    z-index: 1;
    margin: 34px 60px 32px 60px;
    width: 630px;
    height: 204px;
  }
  .action {
    width: 600px;
    height: 674px;
    margin: 0 75px;
    position: relative;
    z-index: 1;
    padding-top: 24px;
    img {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
    }
    p {
      height: 34px;
      font-size: 24px;
      font-weight: 400;
      color: rgba(255, 101, 75, 1);
      line-height: 34px;
      margin-left: 84px;
    }
    .top {
      height: 142px;
      display: flex;
      align-items: baseline;
      justify-content: center;
      // padding-left: 155px;
      span {
        font-size: 48px;
        font-weight: 500;
        color: rgba(255, 102, 75, 1);
      }
      strong {
        font-size: 142px;
        font-weight: 600;
        color: rgba(255, 102, 75, 1);
      }
    }
    .phone {
      width: 444px;
      height: 108px;
      background: rgba(255, 255, 255, 1);
      border-radius: 78px;
      padding: 34px 43px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 210px;
      line-height: 40px;
    }
    .btn {
      width: 444px;
      height: 108px;
      background: rgba(255, 224, 2, 1);
      border-radius: 78px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 70px;
      line-height: 108px;
      text-align: center;
      font-size: initial;
      span {
        line-height: initial;
        font-size: 32px;
        font-weight: 500;
        color: rgba(48, 46, 64, 1);
      }
    }
  }
  .code-group {
    position: fixed;
    width: 542px;
    height: 604px;
    background: rgba(255, 255, 255, 1);
    border-radius: 16px;
    padding-top: 122px;
    .close {
      position: absolute;
      left: 24px;
      top: 24px;
      width: 48px;
      height: 48px;
    }
    .text-group {
      width: 100%;
      text-align: center;
      height: 120px;
      font-size: initial;
      margin: 0 auto;
      margin-bottom: 26px;
      p {
        font-size: 34px;
        font-weight: 400;
        color: rgba(96, 96, 96, 1);
        line-height: 60px;
      }
    }
    .new-code {
      margin: 0 auto;
      margin-top: 46px;
      width: 280px;
      height: 76px;
      border-radius: 100px;
      border: 4px solid #c6c6c6;
      text-align: center;
      box-sizing: border-box;
      line-height: 76px;
      font-size: initial;
      span {
        font-size: 34px;
        font-weight: 400;
        color: #c6c6c6;
      }
    }
    .new-code.active {
      border: 4px solid #ff4473;
      span {
        color: #ff4473;
      }
    }
  }
}

.share-coupon::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>
