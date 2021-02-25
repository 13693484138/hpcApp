<template>
  <div class="newMemcer">
    <div class="newMemcer-bg"></div>
    <div class="newMemcer-warp">
      <div class="nemMemcer-card">
        <div class="zwf"></div>
        <div class="member-banner-zs">
          <img src="./../../images/member/zs.gif" alt />
        </div>
        <div class="member-banner-gzsm" @click="urlDetail('memberSign')">
          <img src="./../../images/member/ystitle.png" alt />
        </div>
        <div class="nemMemcer-text">超级荟员 全场9折</div>
        <div class="nemMemcer-laber">即刻开通，立享4重福利</div>
      </div>
      <div class="nemMemcer-bang"></div>
      <div class="newMwmcer-m"></div>
      <div class="newMwmcer-c">
        <div
          class="newMwmcer-c-item"
          @click="urlDetail('memberInterest', 0, 0)"
          alt
        >
          <div class="img-zssp"></div>
          <span>专属商品</span>
        </div>
        <div
          class="newMwmcer-c-item"
          @click="urlDetail('memberInterest', 1, 0)"
          alt
        >
          <div class="img-qcjz"></div>
          <span>全场9折</span>
        </div>
        <div
          class="newMwmcer-c-item"
          @click="urlDetail('memberInterest', 2, 0)"
          alt
        >
          <div class="img-hpdj"></div>
          <span>荟品到家</span>
        </div>
        <div
          class="newMwmcer-c-item"
          @click="urlDetail('memberInterest', 3, 0)"
          alt
        >
          <div class="img-tebdz"></div>
          <span>特别定制</span>
        </div>
      </div>
      <div class="newMwmcer-button" ref="lightBtn" @click="showPayPop">
        <div class="newMwmcer-text">
          超值荟员
          <span>¥199</span>/年
          <del>原价:¥299</del>
        </div>
        <div class="newMwmcer-label">四大权益 荟员专享</div>
        <img class="bg" src="./../../images/member/but.png" alt />
        <img class="newMwmcer-go" src="./../../images/member/hy-go.png" alt />
      </div>
    </div>
    <div class="nemMemcer-list">
      <div class="nemMemcer-list-top">
        <span class="nemMemcer-list-top-icon"></span>
        <sapn class="nemMemcer-list-top-text">荟员专属</sapn>
      </div>
      <div class="nemMemcer-list-content">
        <memberGoodsList />
      </div>
    </div>
    <div class="nemMemcer-list" @click="homeServe">
      <div class="nemMemcer-list-top">
        <span class="nemMemcer-list-top-icon"></span>
        <sapn class="nemMemcer-list-top-text">12次荟品到家</sapn>
      </div>
      <div class="nemMemcer-list-content">
        <div class="nemMemcer-list-content-item">
          <div class="item-text">
            荟品仓专业搭配顾问团
            <br />为你量身推荐专属衣品
          </div>
          <div class="item-text mt5"></div>
          <div class="item-label">全年12次·免费送到家</div>
          <div class="item-bt">
            <span>即刻预约</span>
          </div>
        </div>
      </div>
    </div>
    <div class="nemMemcer-list" @click="test">
      <div class="nemMemcer-list-top">
        <span class="nemMemcer-list-top-icon"></span>
        <sapn class="nemMemcer-list-top-text">特别定制</sapn>
      </div>
      <div class="nemMemcer-list-content">
        <div class="nemMemcer-list-content-item-c">
          <div class="item-text">
            轻松开启定制衬衣之旅
            <br />这一件，免费送你
            <div class="item-bt">
              <span>立即定制</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-agreement" @click="urlDetail('memberInstructions')">
      开通即视为同意《荟品仓会员-用户协议》
    </div>
    <transition name="fade">
      <div class="member-bottom" v-show="isFixed">
        <div class="member-banner-pay">
          <img src="./../../images/member/anniu.png" alt @click="showPayPop" />
        </div>
      </div>
    </transition>
    <div class="m-bottom"></div>

    <!-- 开通会员弹出框 -->
    <van-overlay :show="loginShow" @click="loginShow = false">
      <div class="loginPop">
        <div class="loginPop-head" @click.stop>
          <img src="@/assets/img/car-head.png" alt />
        </div>
        <div class="loginPop-content" @click.stop>
          <div class="loginPop-content-phone">
            <van-field
              v-model="phoneNumber"
              type="tel"
              size="large"
              placeholder="请输入电话号码"
            />
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
                  <span class="text-bottom" v-show="!vCodeShow">{{
                    count
                  }}</span>
                </van-button>
              </template>
            </van-field>
          </div>
          <div class="logingPop-buttom">
            <van-button
              block
              color="rgba(242,193,127,1)"
              :disabled="!vCode || !phoneNumber"
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
          <div class="loginPop-content-text">
            该手机号：13888888888已绑定至其他微信号，
          </div>
          <div class="loginPop-content-text">
            请使用该手机号登录荟品仓APP，换绑微信。
          </div>
          <div class="loginPop-content-ok">
            <van-button type="default" color="rgba(242,193,127,1)" block>
              <span>确认</span>
            </van-button>
          </div>
        </div>
      </div>
    </van-overlay>
    <div class="memberPop">
      <van-popup
        v-model="showPop"
        closeable
        position="bottom"
        close-icon-position="top-left"
        :style="{ height: '11.74rem', overflow: 'hidden' }"
      >
        <div class="content">
          <div class="money-text">付款详情</div>
          <div class="money"><span>¥</span>199</div>
          <van-radio-group v-model="radio">
            <van-cell-group>
              <van-cell
                v-for="item in payList"
                :key="item.id"
                :title="item.channelTypeDesc"
                clickable
                @click="radio = item.channelType"
                :border="false"
              >
                <template #title>
                  <img
                    class="img-icon"
                    v-if="item.channelType == 0"
                    src="@/images/member/weixin.png"
                  />
                  <img
                    class="img-icon"
                    v-if="item.channelType == 10"
                    src="@/images/member/zhifubao.png"
                  />
                  <span class="custom-title">{{ item.channelTypeDesc }}</span>
                </template>
                <template #right-icon>
                  <van-radio :name="item.channelType" checked-color="#FEE002">
                  </van-radio>
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
          <div class="button-co"></div>
          <van-button
            type="primary"
            block
            round
            color="#FFE456"
            @click="userPay"
            ><span class="botton-bt">立即付款</span></van-button
          >
        </div>
      </van-popup>
    </div>
    <!-- <memberPop :isPop="showPop" /> -->
  </div>
</template>
<script>
import memberGoodsList from "@/views/member/components/memberGoodsList.vue";
import { isElementNotInViewport, getUrlParameter } from "@/utils";
import { isInApp, detectVersion, sharePage } from "@/utils/native.js";
import { validPhone } from "@/utils/validate.js";
import { getUnionId, getOpenId, getStore } from "@/utils/auth.js";
import { productDetailsUrl, appUrl, memberPrice } from "@/utils/config.js";
import memberPop from "@/views/member/components/memberPop.vue";
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
      showPop: false,
      radio: "",
      payList: [],
      weixinImgUrl: "./../../../images/member/weixin.png",
      zhifubaoImgUrl: "./../../../images/member/zhifubao.png",
    };
  },
  props: {
    user: Object,
  },
  components: {
    //  HeadNav: headNav,
    memberGoodsList: memberGoodsList,
    memberPop: memberPop,
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
    urlDetail(url, index, is) {
      if (isInApp()) {
        if (index >= 0) {
          let isBindMobilePhone = this.user.isBindMobilePhone;
          let uid = this.user.uid;
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
              isBindMobilePhone: this.user.isBindMobilePhone
                ? this.user.isBindMobilePhone
                : 0,
              isPayMember: is,
              id: this.user.uid,
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
        window.hpcapi.openRouter(appUrl + "makeHome");
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
          })
          .catch(() => {
            this.$toast("荟员数据获取失败");
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
          })
          .catch(() => {
            this.$toast("荟员数据获取失败");
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
            })
            .catch(() => {
              this.$toast("手机验证码发送失败");
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
        })
        .catch(() => {
          this.$toast("手机登录失败");
        });
    },
    /**
     * app支付接口
     */
    appPay(inviterId, memberPayChannel, channelType) {
      //先判断版本是否高于或等于1.6.5
      if (this.$store.state.user.version >= "1.6.5") {
        if (this.radio == 0) {
          //调起微信支付
          this.$api.userMembers
            .purchaseCardToPay({
              uid: this.user.uid,
              cardNO: "1111",
              memberPayChannel: memberPayChannel,
              inviterId: inviterId,
              channelType: channelType,
            })
            .then((res) => {
              var requestData = JSON.stringify({
                channelType: 0,
                map: res.map,
              });
              window.hpcapi.openMemberWXPay(requestData);
            })
            .catch(() => {
              // this.$toast("调起app支付失败");
            });
        } else if (this.radio == 10) {
          //调起支付宝支付
          this.$api.userMembers
            .purchaseCardToAliPay({
              uid: this.user.uid,
              cardNO: "1111",
              memberPayChannel: memberPayChannel,
              channelType: 10,
              inviterId: inviterId,
            })
            .then((res) => {
              this.showPop = false;
              var requestData = JSON.stringify({
                channelType: 10,
                map: res.map,
              });
              window.hpcapi.openUniversalPay(requestData);
            })
            .catch(() => {
              // this.$toast("调起微信支付失败");
            });
        } else {
          //其他的支付情况
          // this.$toast("暂时未开通此支付方式");
        }
      } else {
        this.$api.userMembers
          .purchaseCardToPay({
            uid: this.user.uid,
            cardNO: "1111",
            memberPayChannel: memberPayChannel,
            inviterId: inviterId,
            channelType: channelType,
          })
          .then((res) => {
            var requestData = JSON.stringify({
              channelType: 0,
              map: res.map,
            });
            window.hpcapi.openMemberWXPay(requestData);
          })
          .catch(() => {
            this.$toast("调起app支付失败");
          });
      }
    },

    /**
     * 调起支付POP
     */
    showPayPop() {
      if (isInApp()) {
        if (this.$store.state.user.version >= "1.6.5") {
          this.$api.userMembers.getChannel({}).then((res) => {
            this.payList = res.list;
            this.radio = res.list[0].id;
            // this.openWXPay(res.map);
          });
          this.showPop = true;
        } else {
          this.userPay();
        }
      } else if (detectVersion().isWeiXin) {
        this.userPay();
      } else {
        this.$toast("请您到荟品仓APP或者微信里购买!");
      }
    },
    /**
     * wx支付接口
     */
    wxPay(inviterId, memberPayChannel, channelType) {
      this.$api.userMembers
        .purchaseCardToPay({
          uid: this.user.uid,
          cardNO: "1111",
          memberPayChannel: memberPayChannel,
          channelType: channelType,
          inviterId: inviterId,
          openId: getOpenId(),
        })
        .then((res) => {
          this.openWXPay(res.map);
        })
        .catch(() => {
          this.$toast("调起微信支付失败");
        });
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
        var InviterId = this.$store.state.user.InviterId;
        var channel = getUrlParameter("channel");
        if (channel == "QR") {
          var Iid = getUrlParameter("inviterId");
          this.appPay(Iid, 20, 0);
        } else {
          this.appPay("", 30, 0);
        }
      } else {
        if (detectVersion().isWeiXin) {
          var store = getStore();
          var InviterId = this.$store.state.user.InviterId;
          if (this.user == null || !this.user.isBindMobilePhone) {
            this.loginShow = true;
          } else {
            if (InviterId) {
              this.wxPay(InviterId, 10, 2);
            } else if (store == '"70"') {
              this.wxPay("", 70, 2);
            } else if (store == '"80"') {
              this.wxPay("", 80, 2);
            } else {
              this.wxPay("", 40, 2);
            }
          }
        } else {
          this.$toast("请在微信打开!");
        }
      }
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
.memberPop {
  position: relative;
  z-index: 100001;
}
.money-text {
  font-size: 34px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0);
}
.money {
  font-size: 82px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  text-align: center;
  margin-top: 163px;
  margin-bottom: 31px;
  span {
    font-size: 42px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
}
.content {
  .van-button--block {
    width: 600px;
    margin: 0 auto;
    margin-top: 285px;
    overflow: hidden;
  }
  .van-cell__title {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  .botton-bt {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
  }
  .img-icon {
    width: 44px;
    height: 40px;
  }
  .van-cell__title {
    display: flex;
    align-items: center;
  }
  .custom-title {
    margin-left: 24px;
  }
  .van-cell--clickable {
    border-bottom: 1px solid #ebedf0;
  }
}
.newMemcer {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #ffffff;
  .van-overlay {
    z-index: 100000;
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
  .m-bottom {
    height: 140px;
    width: 100%;
  }
  .member-bottom {
    width: 100%;
    height: 140px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -2px 14px 0px rgba(244, 191, 150, 0.2);
    position: fixed;
    bottom: 0;
    overflow: scroll;
    z-index: 10000;
    .member-banner-pay {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 140px;
      img {
        width: 690px;
        height: 88px;
        display: block;
      }
    }
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
  .nemMemcer-list {
    width: 702px;
    height: 464px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(204, 204, 204, 0.3);
    border-radius: 14px;
    margin: 0 auto;
    margin-bottom: 20px;
    .nemMemcer-list-content-item {
      background: url("./../../images/member/beijing11.png");
      background-size: cover;
      width: 642px;
      height: 286px;
      margin: 0 auto;
      margin-top: 30px;
      overflow: hidden;
      padding: 0 30px;
      .item-text {
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 30px;
        line-height: 45px;
      }
      .item-label {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-top: 30px;
      }
      .item-bt {
        width: 199px;
        height: 60px;
        background: rgba(255, 243, 229, 1);
        border-radius: 30px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        font-size: initial;
        line-height: 60px;
        text-align: center;
        margin-top: 15px;
        span {
          font-size: 26px;
        }
      }
    }
    .nemMemcer-list-content-item-c {
      background: url("./../../images/member/beijing21.png");
      background-size: cover;
      width: 642px;
      height: 286px;
      margin: 0 auto;
      margin-top: 30px;
      overflow: hidden;
      padding: 0 30px;
      position: relative;
      .item-text {
        font-size: 32px;
        float: right;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 30px;
        text-align: left;
        line-height: 45px;
        margin-top: 64px;
        .item-bt {
          width: 199px;
          height: 60px;
          background: rgba(255, 243, 229, 1);
          border-radius: 30px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          font-size: initial;
          line-height: 60px;
          text-align: center;
          margin-top: 41px;
          span {
            font-size: 26px;
          }
        }
      }
    }
    .nemMemcer-list-top {
      display: flex;
      align-items: center;
      padding-top: 30px;
      .nemMemcer-list-top-icon {
        width: 6px;
        height: 34px;
        background: rgba(209, 162, 101, 1);
        border-radius: 3px;
        display: inline-block;
        margin-left: 30px;
      }
      .nemMemcer-list-top-text {
        font-size: 40px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 56px;
        margin-left: 10px;
      }
    }
  }
  .nemMemcer-list:first-child {
    margin-top: 0;
  }
  .nemMemcer-bang {
    width: 642px;
    height: 13px;
    background: rgba(207, 159, 97, 1);
    border-radius: 100px 100px 0px 100px;
    position: relative;
    margin: 0 auto;
    margin-top: -7px;
    transform: translateX(-10px);
    z-index: 100;
  }
  .newMwmcer-m {
    width: 682px;
    height: 286px;
    background: rgba(249, 249, 249, 1);
    border-radius: 14px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -26px;
  }
  .newMwmcer-button {
    text-align: center;
    position: relative;
    .newMwmcer-text {
      position: absolute;
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      top: 62px;
      left: 92px;

      span {
        font-size: 42px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }
      del {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(154, 154, 154, 1);
      }
    }
    .newMwmcer-label {
      position: absolute;
      top: 110px;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 33px;
      margin-left: 194px;
    }
    .bg {
      width: 672px;
      height: 200px;
      margin: 0 auto;
    }
    .newMwmcer-go {
      width: 100px;
      height: 100px;
      position: absolute;
      right: 80px;
      top: 48%;
      animation: myscale 0.5s linear infinite alternate;
    }
    @keyframes myscale {
      0% {
        transform: translateY(-50%) scale(0.8);
      }
      100% {
        transform: translateY(-50%) scale(1.05);
      }
    }
  }
  .newMwmcer-c {
    width: 702px;
    height: 261px;
    background: rgba(255, 255, 255, 1);
    border-radius: 14px;
    position: relative;
    z-index: 200;
    margin: 0 auto;
    display: flex;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    justify-content: space-around;
    .newMwmcer-c-item {
      margin-top: 61px;
      .img-zssp {
        background-image: url("./../../images/member/img-bg.png");
        background-repeat: no-repeat;
        height: 100px;
        width: 100px;
        background-position: -100px 0;
        background-size: 400px 100px;
        margin-bottom: 20px;
      }
      .img-qcjz {
        background-image: url("./../../images/member/img-bg.png");
        background-repeat: no-repeat;
        height: 100px;
        width: 100px;
        background-position: -300px 0;
        background-size: 400px 100px;
        margin-bottom: 20px;
      }
      .img-hpdj {
        background-image: url("./../../images/member/img-bg.png");
        background-repeat: no-repeat;
        height: 100px;
        width: 100px;
        background-position: -200px 0;
        background-size: 400px 100px;
        margin-bottom: 20px;
      }
      .img-tebdz {
        background-image: url("./../../images/member/img-bg.png");
        background-repeat: no-repeat;
        height: 100px;
        width: 100px;
        background-position: 0 0;
        background-size: 400px 100px;
        margin-bottom: 20px;
      }
      span {
        line-height: 40px;
      }
    }
  }
  .newMemcer-bg {
    width: 100%;
    height: 381px;
    background: rgba(255, 245, 231, 1);
    position: absolute;
    top: 0;
  }
  .newMemcer-warp {
    opacity: 1;
    .nemMemcer-card {
      z-index: 1000;
      position: relative;
      text-align: center;
      width: 614px;
      height: 256px;
      background: url("./../../images/member/hybg.jpg");
      background-size: cover;
      margin: 0 auto;
      margin-top: 40px;
      box-shadow: 0px 2px 6px 0px rgba(203, 167, 110, 1);
      border-radius: 16px 16px 0 0;
      .zwf {
        width: 100%;
        height: 68px;
      }
      .member-banner-zs {
        position: absolute;
        top: 10px;
        left: 0;
        img {
          width: 74px;
          height: 52px;
        }
      }
      .member-banner-gzsm {
        position: absolute;
        top: 10px;
        right: 0;
        img {
          width: 107px;
          height: 39px;
        }
      }
      .nemMemcer-text {
        font-size: 70px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(97, 82, 64, 1);
        line-height: 98px;
      }
      .nemMemcer-laber {
        font-size: 36px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(97, 82, 64, 1);
        line-height: 50px;
      }
    }
  }
}
</style>