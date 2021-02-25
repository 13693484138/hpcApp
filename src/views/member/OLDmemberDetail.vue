<template>
  <div class="member">
    <div class="member-banner">
      <div class="member-banner-img">
        <img src="@/assets/img/title-img.png" alt />
      </div>
      <div class="member-banner-content">
        <div class="member-banner-buttom">
          <div class="member-banner-buttom-item">
            <img src="@/assets/img/qcjz-buttom.png" @click="urlDetail('memberInterest',0,0)" alt />
          </div>
          <div class="member-banner-buttom-item">
            <img src="@/assets/img/djfw-buttom.png" @click="urlDetail('memberInterest',1,0)" alt />
          </div>
          <div class="member-banner-buttom-item">
            <img src="@/assets/img/zssp-buttom.png" @click="urlDetail('memberInterest',2,0)" alt />
          </div>
          <div class="member-banner-buttom-item">
            <img src="@/assets/img/tbdz-buttom.png" @click="urlDetail('memberInterest',3,0)" alt />
          </div>
        </div>
        <div class="member-banner-pay">
          <img src="@/assets/img/pay-buttom.png" alt ref="lightBtn" @click="userPay" />
        </div>
        <div class="care-bar-bottom" @click="urlDetail('memberSign')">
          <span>规则说明</span>
          <img src="@/assets/img/test-icon.png" alt />
        </div>
      </div>
    </div>

    <div class="member-list">
      <div class="member-list-title">
        <img src="@/assets/img/qcjz-title.png" alt />
      </div>
      <!-- <div class="member-list-content">
        <div
          class="member-list-item"
          v-for="(item,index) in imgList"
          :key="index"
          @click="goodsUrl(item.hrefID)"
        >
          <div class="member-list-item-img">
            <img :src="item.url" alt v-lazy="item.url" />
            <img src="@/assets/img/zhe-icon.png" alt />
          </div>
          <div class="member-list-item-text">{{item.name}}</div>
          <div class="member-list-item-gods">
            <span>¥</span>
            {{item.mony}}
          </div>
        </div>
      </div>-->
      <memberGoodsList />
    </div>

    <div class="member-type">
      <div class="member-type-title">
        <img src="@/assets/img/djfw-title.png" alt class="img-up" />
      </div>
      <div class="member-type-warp" @click="homeServe">
        <div class="member-type-warp-text f-l">
          <span>荟品仓专业搭配顾问团 为你量身推荐专属衣品</span>
          <span class="jk-span">全年12次·免费送到家</span>
          <div class="warp-text-bottom-jk">
            <span>即刻预约</span>
          </div>
        </div>
        <div class="member-type-warp-img f-r">
          <img src="@/assets/img/djfw-text.png" alt />
        </div>
      </div>
    </div>

    <div class="member-type">
      <div class="member-type-title">
        <img src="@/assets/img/tbdz-title.png" alt />
      </div>
      <div class="member-type-warp" @click="test">
        <div class="member-type-warp-text f-l">
          <span class="text-tow-text">
            轻松一点，开启定制衬衣之旅
            <br />这一件，免费送你
          </span>
          <div class="warp-text-bottom">
            <span>即将开启</span>
          </div>
        </div>
        <div class="member-type-warp-dzimg f-r">
          <img src="@/assets/img/dz-text.png" alt />
        </div>
      </div>
      <div class="user-agreement" @click="urlDetail('memberInstructions')">开通即视为同意《荟品仓会员-用户协议》</div>
    </div>

    <transition name="fade">
      <div class="member-bottom" v-show="isFixed">
        <div class="member-banner-pay">
          <img src="@/assets/img/pay-buttom.png" alt @click="userPay" />
        </div>
      </div>
    </transition>
    <div class="m-bottom"></div>

    <!-- 开通会员弹出框 -->
    <van-overlay :show="loginShow" @click="loginShow=false">
      <div class="loginPop">
        <div class="loginPop-head" @click.stop>
          <img src="@/assets/img/car-head.png" alt />
        </div>
        <div class="loginPop-content" @click.stop>
          <div class="loginPop-content-phone">
            <van-field v-model="phoneNumber" type="tel" size="large" placeholder="请输入电话号码" />
          </div>
          <div class="loginPop-content-sms">
            <van-field
              v-model="vCode"
              type="digit"
              size="large"
              center
              clearable
              placeholder="请输入短信验证码"
            >
              <template #button>
                <van-button
                  color="rgba(242,193,127,1)"
                  :disabled="!phoneNumber"
                  @click="getSendSMS"
                >
                  <span class="text-bottom" v-show="vCodeShow">发送验证码</span>
                  <span class="text-bottom" v-show="!vCodeShow">{{count}}</span>
                </van-button>
              </template>
            </van-field>
          </div>
          <div class="logingPop-buttom">
            <van-button
              block
              color="rgba(242,193,127,1)"
              :disabled="!vCode||!phoneNumber"
              @click="smsLogin"
            >
              <span class="text-bottom">确认</span>
            </van-button>
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- 开通成功弹出框 -->
    <van-overlay :show="openMemberPop" @click="cloesMember">
      <div class="loginPop">
        <div class="loginPop-head" @click.stop>
          <img src="@/assets/img/car-head.png" alt />
        </div>
        <div class="loginPop-content" @click.stop>
          <div class="loginPop-content-title">开通成功</div>
          <div class="loginPop-content-text">线下门店出示荟品仓小程序</div>
          <div class="loginPop-content-text">荟品仓线下门店可同享9折</div>
          <div class="loginPop-content-bt">
            <van-button
              type="default"
              color="rgba(247,189,111,1)"
              class="bt-no"
              @click="cloesMember"
              block
            >
              <span>确定</span>
            </van-button>
            <!-- <van-button type="default" color="rgba(242,193,127,1)" @click="share" class="bt-ok">
              <span>分享</span>
            </van-button>-->
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- 绑定失败 -->
    <van-overlay :show="bindFailurePop" @click="bindFailurePop = false">
      <div class="loginPop">
        <div class="loginPop-head" @click.stop>
          <img src="@/assets/img/car-head.png" alt />
        </div>
        <div class="loginPop-content" @click.stop>
          <div class="loginPop-content-title">换绑失败</div>
          <div class="loginPop-content-text">该手机号：13888888888已绑定至其他微信号，</div>
          <div class="loginPop-content-text">请使用该手机号登录荟品仓APP，换绑微信。</div>
          <div class="loginPop-content-ok">
            <van-button type="default" color="rgba(242,193,127,1)" block>
              <span>确认</span>
            </van-button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import memberGoodsList from "@/views/member/components/memberGoodsList.vue";
import { isElementNotInViewport } from "@/utils";
import { isInApp, detectVersion, sharePage} from "@/utils/native.js";
import { validPhone } from "@/utils/validate.js";
import { getUnionId, getOpenId } from "@/utils/auth.js";
import { productDetailsUrl,appUrl,memberPrice} from "@/utils/config.js";
export default {
  name: "memberDetail",
  data() {
    return {
      loginShow: false, //登录弹出框显示与隐藏
      isFixed: false,
      openMemberPop: false,
      phoneNumber: "", //登录注册电话号码
      vCode: "", //短信验证码
      vCodeShow: true, //短信倒数显示
      timer: null, //时间器
      count: "60", //计算器
      registerFrom: "", //来源
      bindFailurePop: false,
      loading: true,
    };
  },
  props: {
    user: Object,
  },
  components: {
    //  HeadNav: headNav,
    memberGoodsList: memberGoodsList,
  },
  created() {
    this.memberInit();
  },
  mounted() {
    this.loading = false;
    //监控dom节点变化，并设置防抖
    this.$nextTick(() => {
      let timer;
      window.addEventListener("scroll", () => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          this.handleScroll();
        }, 200);
      });
      this.handleScroll();
    });
  },
  methods: {
    /**
     * 跳转指定路由
     * url：路由地址
     * index:选项卡传参
     */
    urlDetail(url, index,is) {
      if (isInApp()) {
        if (index >= 0) {
          let isBindMobilePhone =this.user.isBindMobilePhone;
          let uid=this.user.uid;
          window.hpcapi.openRouter(
            `${appUrl}${url}?index=${index}&isBindMobilePhone=${isBindMobilePhone}&isPayMember=${is}&id=${uid}`
          );
          // this.$router.push({
          //   path: url,
          //   query: {
          //     index: index,
          //     isBindMobilePhone: this.user.isBindMobilePhone,
          //     isPayMember: this.user.isPayMember,
          //   },
          // });
          return;
        }
        window.hpcapi.openRouter(`${appUrl}${url}`);
        //this.$router.push(url);
      } else {
        if (index >= 0) {
          this.$router.push({
            path: url,
            query: {
              index: index,
              isBindMobilePhone:this.user.isBindMobilePhone
                ? this.user.isBindMobilePhone
                : 0,
              isPayMember: is,
              id:this.user.uid
            },
          });
          return;
        }
        this.$router.push(url);
      }
    },
    /**
     * 到家服务跳转
     * 只有APP中才会跳转到家页面
     * 非APP跳转APP下载地址
     */
    homeServe() {
      if (isInApp()) {
        window.hpcapi.openRouter(appUrl+"makeHome");
      } else {
        this.goodsUrl();
      }
    },
    //微信端跳下载页面
    goodsUrl(id) {
      if (isInApp()) {
        window.hpcapi.openRouter(productDetailsUrl + id);
      } else {
        if (detectVersion().isAndroid) {
          this.$api.userMembers.getAppVersion().then((res) => {
            window.location.href = res.url;
            // window.location.href=res.
          });
        } else if (detectVersion().isIOS9) {
          window.location.href =
            "https://apps.apple.com/cn/app/%E8%8D%9F%E5%93%81%E4%BB%93-%E8%B5%B0%E8%BF%9B%E5%93%81%E7%89%8C%E4%BB%93%E5%BA%93%E6%B7%98%E5%A5%BD%E8%B4%A7/id1464120909";
        }
      }
    },
    /**
     * 用户初始化
     */
    // userInit() {
    //   if (this.user.isBind) {
    //     //  openWXPay({});
    //   } else {
    //     this.loginShow;
    //   }
    // },
    //页面初始化
    memberInit() {
      if (isInApp() && this.$store.state.user.appToken != "") {
        let that = this;
        var hp = this.$store.state.user.appToken;
        this.$api.userMembers
          .getMemberByToken({
            hp_token: hp,
          })
          .then((res) => {
            that.user = res;
            that.$store.commit("setUserId", res.uid);
          });
      } else if (detectVersion().isWeiXin) {
        let thant = this;
        this.$api.userMembers
          .getMemberByUnionId({
            unionId: getUnionId(),
            openId: getOpenId(),
          })
          .then((res) => {
            thant.user = res;
            thant.$store.commit("setUserId", res.uid);
          });
      } else {
      }
    },
    /**
     * 发送短信验证码
     */
    getSendSMS() {
      if (validPhone(this.phoneNumber)) {
        if (this.vCodeShow) {
          this.getCode();
          this.$api.userMembers
            .getMeberSendSMS({
              mobile: this.phoneNumber,
            })
            .then((res) => {
              console.log(res);
            });
        }
      } else {
        this.$toast.fail("手机号码有误，请重填");
      }
    },
    /**
     * 短信验证码倒数60S
     */
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.vCodeShow = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.vCodeShow = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    /**
     * 手机短信登录
     */
    smsLogin() {
      var that = this;
      this.loginShow = false;
      var openId = getOpenId();
      this.$api.userMembers
        .bindMobile({
          mobile: that.phoneNumber,
          verificationCode: that.vCode,
          openId: openId,
          // hp_version: "1.01"
        })
        .then((res) => {
          this.loginShow = false;
          this.user = res;
          this.$store.commit("setAppToken", res.token);
          this.$store.commit("setUserId", res.uid);
        });
    },
    /**
     * APP内部的订单支付
     */
    appPay(data) {
      this.$api.orderDetail
        .getOrderPayment({
          productName: "九折年卡",
          tradeAmount: memberPrice,
          userId: this.user.uid,
          userName: data.userName,
          channelType: 0,
          orderId: data.id,
           orderType:"20",
          // source: this.$store.state.isAppend
          //source: 20
        })
        .then((res) => {
          var requestData = JSON.stringify({
            channelType: 0,
            map: res.map,
          });
          this.loginShow = false;
          window.hpcapi.openMemberWXPay(requestData);
          //   if (openWXPay(res.map)) {
          //     this.$router.push({ path: "/userDetail" });
          //   } else {
          //   }
        });

      // this.$api.orderDetail
      //   .getOrderPayment({
      //     productName: "九折年卡",
      //     tradeAmount: 0.01,
      //     userId: "1123123213",
      //     userName: "是31313123",
      //     channelType: 0,
      //     orderId: "12312312312",
      //     source: "20"
      //   })
      //   .then(res => {
      //     window.hpcapi.openMemberWXPay(res);
      //     //   if (openWXPay(res.map)) {
      //     //     this.$router.push({ path: "/userDetail" });
      //     //   } else {
      //     //   }
      //   });
    },
    /**
     * 立即续费方法
     * loginShow代表弹出框是否加载
     * isBind判断用户有没有绑定手机号
     */
    userPay() {
      if (isInApp()) {
        var hp = this.$store.state.user.appToken;
        if (hp == "") {
          window.hpcapi.openLogin();
          return;
        }

        let inviterId =
          this.$store.state.user.InviterId == undefined
            ? ""
            : this.$store.state.user.InviterId;
        this.$api.userMembers
          .purchaseCard({
            uid: this.user.uid,
            inviterId: inviterId,
          })
          .then((res) => {
            if (isInApp()) {
              this.appPay(res);
            } else {
              this.pay(res);
            }
          });
      } else {
        if (detectVersion().isWeiXin) {
          if (this.user == null || !this.user.isBindMobilePhone) {
            this.loginShow = true;
          } else {
            var InviterId = this.$store.state.user.InviterId;
            this.$api.userMembers
              .purchaseCard({
                uid: this.user.uid,
                inviterId: InviterId,
              })
              .then((res) => {
                if (isInApp()) {
                  this.appPay(res);
                } else {
                  this.pay(res);
                }
              });
            //openWXPay();
          }
        } else {
          this.$toast("请在微信打开!");
        }
      }
    },
    /**
     * 订单预支付
     */
    pay(data) {
      this.$api.orderDetail
        .getOrderPayment({
          productName: "九折年卡",
          tradeAmount: memberPrice,
          userId: this.user.uid,
          userName: data.userName,
          channelType: 2,
          orderId: data.id,
          openid: getOpenId(),
           orderType:"20",
          //  openid: "oqFfi0_jGp1Xxumil5RapKasxe14",
          // source: 90
        })
        .then((res) => {
          this.openWXPay(res.map);
          //   if (openWXPay(res.map)) {
          //     this.$router.push({ path: "/userDetail" });
          //   } else {
          //   }
        });
    },
    /**
     * 监听滚动事件
     * 当banner的立即开通向下滑动消失出现
     */
    handleScroll() {
      if (isElementNotInViewport(this.$refs.lightBtn)) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    /**
     * 节流函数
     * 监控滚动跳会存在抖动函数
     * 所以设置对应防抖函数
     */
    debounce(fn, wait) {
      let timer = null;
      return function () {
        let args = arguments,
          that = this;
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(that, args);
        }, wait);
      };
    },
    /**
     *
     */
    test() {
      this.$toast("敬请期待!");
    },
    /**
     * 开通会员
     */
    cloesMember() {
      this.openMemberPop = false;
      this.$emit("memberInit");
      // this.$router.push({ path: "/" });
    },
    /**
     * 分享
     */
    share() {
      //bindFailurePop=true;
      //  openMemberPop=false;
      this.$router.push({ path: "/accountConflict" });
      sharePage();
    },
    /*
     *支付
     */
    openWXPay(data) {
      if (isInApp()) {
        return window.hpcapi.openWXPay(JSON.stringify(data));
      } else if (detectVersion().isWeiXin) {
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: data.appId, //公众号名称，由商户传入
            timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
            nonceStr: data.nonceStr, //随机串
            package: data.package,
            signType: "MD5", //微信签名方式：
            paySign: data.paySign, //微信签名
          },
          (res) => {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              this.openMemberPop = true;
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            }
          }
        );
      } else {
      }
    },
  },
};
</script>
<style scoped lang="scss">
.member {
  .van-button {
    border-radius: 0px;
  }
  .img-up {
    width: 444px;
  }
  .user-agreement {
    font-size: 16px;
    font-weight: 400;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #999999;
    text-align: center;
    margin: 15px auto;
    cursor: pointer;
  }
  .care-bar-bottom {
    color: #decdb2;
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    display: flex;
    width: 638px;
    margin: 0 auto;
    align-items: center;
    justify-content: flex-end;
    margin-top: 6px;
    img {
      width: 24px;
      height: 24px;
      margin-left: 10px;
      display: block;
    }
    span{
      display: block;
    }
  }
  .van-skeleton {
    background-color: #fff;
    padding-top: 40px;
  }
  width: 100%;
  .text-bottom {
    font-size: 32px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;

    color: rgba(51, 51, 51, 1);
  }
  .loginPop {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    &-head {
      margin: 0 auto;
      width: 690px;
      height: 103px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-content {
      width: 690px;
      height: 414px;
      margin: 0 auto;
      background: #fff;
      border-radius: 0px 0px 16px 16px;
      &-title {
        font-size: 34px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        margin-top: 69px;
      }
      &-text {
        font-size: 28px;

        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 20px;
        text-align: center;
      }
      &-bt {
        text-align: center;
        margin-top: 69px;
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        button {
          border-radius: 44px;
        }
        .bt-no {
          width: 600px;
          height: 88px;
          margin-right: 9px;
          margin: 0 auto;
          span {
            font-size: 32px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
          }
        }
        .bt-ok {
          width: 310px;
          height: 88px;
          margin-left: 9px;

          span {
            font-size: 32px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
          }
        }
      }
      &-ok {
        margin: 0 26px;
        margin-top: 70px;
        span {
          font-size: 32px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
        }
      }
      .logingPop-buttom {
        margin: 0 auto;
        width: 638px;
        height: 88px;
        border-radius: 44px;
        overflow: hidden;
      }
      .loginPop-content-sms,
      .loginPop-content-phone {
        border: 1px solid rgba(223, 223, 223, 1);
        margin: 40px 26px 30px 26px;
        border-radius: 44px;
        overflow: hidden;
        .van-cell {
          font-size: 34px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          .van-button {
            width: 240px;
          }
        }
      }
      .loginPop-content-sms {
        .van-cell {
          padding: 0 0 0 32px;
        }
      }
    }
  }
  background-color: #f5f5f5;
  &-banner {
    background-image: url("../../assets/img/head-img.png");
    background-size: cover;
    width: 100%;
    &-img {
      padding-top: 40px;
      img {
        height: 166px;
        width: 100%;
      }
    }
    &-content {
      height: 352px;
      .member-banner-buttom {
        display: flex;
        justify-content: center;
        .member-banner-buttom-item {
          margin: 40px 21px 0 21px;
          font-size: 0;
          img {
            width: 114px;
            height: 134px;
          }
        }
      }
      .member-banner-pay {
        text-align: center;
        margin-top: 30px;
        img {
          width: 85%;
          height: 88px;
        }
      }
    }
  }
  &-list {
    height: 444px;
    background-color: #fff;
    &-title {
      text-align: center;
      img {
        width: 344px;
      }
    }

    &-content {
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      .member-list-item {
        width: 198px;
        margin: 0 10px;
        &-img {
          width: 186px;
          height: 173px;
          position: relative;
          text-align: center;
          img {
            width: 100%;
            height: 100%;
          }
          img:last-child {
            width: 104px;
            height: 32px;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
        &-text {
          font-size: 24px;
          font-weight: 400;
          width: 100%;
          height: 66px;
          color: rgba(51, 51, 51, 1);
          line-height: 33px;
          margin-top: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        &-gods {
          height: 30px;
          font-size: 30px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 30px;
          span {
            font-size: 24px;
          }
        }
      }
    }
    &-content::-webkit-scrollbar {
      display: none; // 重点
    }
  }
  &-type {
    width: 100%;
    height: 470px;
    background-color: #fff;
    margin-top: 16px;
    &-title {
      text-align: center;
      img {
        width: 360px;
      }
    }
    &-warp {
      width: 92%;
      height: 288px;
      margin: 0 auto;
      border-radius: 16px;
      border: 1px solid rgba(223, 223, 223, 1);
      &-text {
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 45px;
        width: 346px;
        font-size: 32px;
        margin-top: 30px;
        margin-left: 32px;
        .text-tow-text {
          width: 520px;
          display: block;
        }
        font-family: PingFangSC-Semibold, PingFang SC;
        .warp-text-bottom-jk {
          width: 199px;
          height: 60px;
          background: rgba(242, 193, 127, 1);

          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 60px;
          text-align: center;
          font-size: initial;
          span {
            font-size: 26px;
          }
          margin-top: 16px;
          border-radius: 30px;
        }
        .warp-text-bottom {
          width: 199px;
          height: 60px;
          background: rgba(242, 193, 127, 1);

          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 60px;
          text-align: center;
          margin-top: 70px;
          border-radius: 30px;
          font-size: initial;
          span {
            font-size: 26px;
          }
        }
        .jk-span {
          color: #999999;
          margin-top: 16px;
          display: inline-block;
        }
      }
      &-img {
        img {
          width: 282px;
          height: 258px;
          margin-top: 29px;
        }
      }
      &-dzimg {
        img {
          width: 281px;
          height: 202px;
          margin-top: 86px;
        }
      }
    }
  }
  .m-bottom {
    height: 140px;
    width: 100%;
  }
  &-bottom {
    width: 100%;
    height: 140px;
    background: rgba(25, 25, 29, 1);
    position: fixed;
    bottom: 0;
    overflow: scroll;
    .member-banner-pay {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 140px;
      img {
        width: 85%;
        height: 88px;
        display: block;
      }
    }
  }
}
</style>