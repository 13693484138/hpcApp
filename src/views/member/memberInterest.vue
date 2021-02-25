<template>
  <div class="interest">
    <!-- 头部标签 -->
    <div class="interest-text">
      <span
        class="tabIndex"
        v-for="(item, index) in titleList"
        :key="index"
        :class="{ titleActive: titleIndex == index }"
        @click="titleClick(index)"
        >{{ item.name }}</span
      >
    </div>
    <!-- 轮播区域 -->
    <div class="interest-content">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div
              class="interest-item"
              :style="{ height: fullHeight - 100 + 'px' }"
            >
              <div class="interest-item-top">
                <div class="top-bg">
                  <div class="top-rid">
                    <img src="../../assets/img/jiuzhe.png" alt />
                  </div>
                </div>
                <div class="top-text">全场9折</div>
              </div>
              <div class="interest-item-center">
                <ul>
                  <li><span>·</span>荟品仓app全场商品9折</li>
                  <li><span>·</span>门店消费全场商品9折</li>
                  <li><span>·</span>可同享满减活动</li>
                </ul>
              </div>
              <div class="bottom-warp">
                <div class="interest-item-bottom mt">
                  <div class="bottom-title p-r">
                    <span></span>
                    <span>权益说明</span>
                    <span class="title-english">Description</span>
                  </div>
                  <ul>
                    <li>
                      1.线上荟品仓app、线下门店消费可同享全场商品9折福利。
                    </li>
                    <li>2.9折折上折，享受9折后，可再享优惠券满减活动。</li>
                  </ul>
                </div>
                <div class="interest-item-bottom">
                  <div class="bottom-title p-r">
                    <span></span>
                    <span>使用指南</span>
                    <span class="title-english">User guide</span>
                  </div>
                  <ul>
                    <li>
                      1.线上荟品仓app，购物车支付结账，可立即享受全场商品9折价（专属商品除外）权益。
                    </li>
                    <li>
                      2.线下荟品仓门店结账时，出示荟品仓会员码，可享受全场商品9折价（专属商品除外）权益。
                    </li>
                    <li>3.全场9折后，还可再享受优惠券满减活动。</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="interest-item-bt" @click="showPayPop">
              <van-button round type="info" color="#F5C592" block>
                <span>{{ btText }}</span>
              </van-button>
            </div>
          </div>

          <div class="swiper-slide">
            <div
              class="interest-item"
              :style="{ height: fullHeight - 100 + 'px' }"
            >
              <div class="interest-item-top">
                <div class="top-bg">
                  <div class="top-rid">
                    <img
                      class="top-rid-dj"
                      src="../../assets/img/daojia.png"
                      alt
                    />
                  </div>
                </div>
                <div class="top-text">荟品到家</div>
              </div>
              <div class="interest-item-center">
                <ul>
                  <li><span>·</span>智能化算法匹配穿衣风格</li>
                  <li><span>·</span>全家穿搭，一站式配齐</li>
                  <li><span>·</span>送货上门，免费穿搭</li>
                </ul>
              </div>
              <div class="bottom-warp">
                <div class="interest-item-bottom mt">
                  <div class="bottom-title p-r">
                    <span></span>
                    <span>权益说明</span>
                    <span class="title-english">Description</span>
                  </div>
                  <ul>
                    <li>1.超级荟员可享受12次到家服务权益。</li>
                    <li>2.专属搭配师上门指导搭配。</li>
                    <li>3.最快一小时送达。</li>
                    <li>4.退货无忧，上门取回。</li>
                  </ul>
                </div>
                <div class="interest-item-bottom">
                  <div class="bottom-title p-r">
                    <span></span>
                    <span>使用指南</span>
                    <span class="title-english">User guide</span>
                  </div>
                  <ul>
                    <li>1.我的会员页进入到家页面，提交心愿单</li>
                    <li>2.荟品仓专业搭配师根据详细信息挑选穿搭</li>
                    <li>3.配送员接单，等待收货</li>
                    <li>4.荟员挑选心仪衣物下单，未被选中商品取货员上门取回</li>
                    <li>5.到家服务结束，可在我的订单查看到家服务订单</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="interest-item-bt" @click="showPayPop">
              <van-button round type="info" color="#F5C592" block>
                <span>{{ btText }}</span>
              </van-button>
            </div>
          </div>

          <div class="swiper-slide">
            <div
              class="interest-item"
              :style="{ height: fullHeight - 100 + 'px' }"
            >
              <div class="interest-item-top">
                <div class="top-bg">
                  <div class="top-rid">
                    <img
                      class="top-rid-zs"
                      src="../../assets/img/zhuanshu.png"
                      alt
                    />
                  </div>
                </div>
                <div class="top-text">专属商品</div>
              </div>
              <div class="interest-item-center">
                <ul>
                  <li><span>·</span>超级荟员会员专属</li>
                  <li><span>·</span>超奢品牌低价购</li>
                </ul>
              </div>
              <div class="bottom-warp">
                <div class="interest-item-bottom mt75">
                  <div class="bottom-title p-r">
                    <span></span>
                    <span>权益说明</span>
                    <span class="title-english">Description</span>
                  </div>
                  <ul>
                    <li>1.超奢品牌低价购，定期更新超级荟员专属商品。</li>
                    <li>2.荟员专属，只能超级荟员能买。</li>
                  </ul>
                </div>
                <div class="interest-item-bottom">
                  <div class="bottom-title p-r">
                    <span></span>
                    <span>使用指南</span>
                    <span class="title-english">User guide</span>
                  </div>
                  <ul>
                    <li>
                      1.专属商品还在筹备中，客官不要急～～美好的事物都是需要等待。
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="interest-item-bt" @click="showPayPop">
              <van-button round type="info" color="#F5C592" block>
                <span>{{ btText }}</span>
              </van-button>
            </div>
          </div>
          <!--  -->
          <div class="swiper-slide">
            <div
              class="interest-item"
              :style="{ height: fullHeight - 100 + 'px' }"
            >
              <div class="interest-item-top">
                <div class="top-bg">
                  <div class="top-rid">
                    <img
                      class="top-rid-dz"
                      src="../../assets/img/dingzhi.png"
                      alt
                    />
                  </div>
                </div>
                <div class="top-text">特别定制</div>
              </div>
              <div class="interest-item-center">
                <ul>
                  <li><span>·</span>量身定制一件高级衬衫</li>
                  <li><span>·</span>免费送衣上门</li>
                </ul>
              </div>
              <div class="bottom-warp">
                <div class="interest-item-bottom mt75">
                  <div class="bottom-title p-r">
                    <span></span>
                    <span>权益说明</span>
                    <span class="title-english">Description</span>
                  </div>
                  <ul>
                    <li>1.超级荟员可免费定制一件高级衬衫。</li>
                    <li>2.9折折上折，享受9折后，可再享优惠券满减活动。</li>
                  </ul>
                </div>
                <div class="interest-item-bottom">
                  <div class="bottom-title p-r">
                    <span></span>
                    <span>使用指南</span>
                    <span class="title-english">User guide</span>
                  </div>
                  <ul>
                    <li>
                      1.特别定制还在筹备中，客官不要急～～美好的事物都是需要等待。
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 按钮 -->
            </div>
            <div class="interest-item-bt" @click="showPayPop">
              <van-button round type="info" color="#F5C592" block>
                <span>{{ btText }}</span>
              </van-button>
            </div>
          </div>
        </div>
        <div class="swiper-scrollbar">
          <div class="swiper-scrollbar-drag">
            <div class="ys-swiper"></div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
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
  </div>

  <!-- <van-swipe class="my-swipe"  indicator-color="white">
        <van-swipe-item>
          
        </van-swipe-item>

        <van-swipe-item>
          <div class="interest-item">
            <div class="interest-item-top">
              <div class="top-bg">
                <div class="top-rid">
                  <img src="../../assets/img/jiuzhe.png" alt />
                </div>
              </div>
              <div class="top-text">全场9折</div>
            </div>
            <div class="interest-item-center"></div>
            <div class="interest-item-bottom"></div>
          </div>
        </van-swipe-item>

        <van-swipe-item>
          <div class="interest-item">
            <div class="interest-item-top">
              <div class="top-bg">
                <div class="top-rid">
                  <img src="../../assets/img/jiuzhe.png" alt />
                </div>
              </div>
              <div class="top-text">全场9折</div>
            </div>
            <div class="interest-item-center"></div>
            <div class="interest-item-bottom"></div>
          </div>
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/4</div>
        </template>
  </van-swipe>-->
  <!-- </div> -->
  <!-- </div> -->
</template>
<script>
import Swiper from "swiper";
import {
  isInApp,
  detectVersion,
  sharePage,
  getUrlParams,
} from "@/utils/native.js";
import { getUrlParameter } from "@/utils";
import { validPhone } from "@/utils/validate.js";
import { getUnionId, getOpenId,getStore } from "@/utils/auth.js";
import "@/assets/css/swiper.css";
export default {
  name: "memberInterrest",
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
      isPayMember: "",
      isBindMobilePhone: "",
      btText: "",
      user: {},
      uid: "",
      showPop: false,
      radio: "",
      payList: [],
      weixinImgUrl: "./../../../images/member/weixin.png",
      zhifubaoImgUrl: "./../../../images/member/zhifubao.png",
      titleList: [
        {
          name: "全场9折",
          id: 0,
        },
        {
          name: "荟品到家",
          id: 1,
        },
        {
          name: "专属商品",
          id: 2,
        },
        {
          name: "特别定制",
          id: 3,
        },
      ],
      titleIndex: 0,

      fullHeight: document.documentElement.clientHeight,
      mySwiper: {},
    };
  },
  mounted() {
    this.titleIndex = this.$route.query.index; //权益列表下标
    this.isBindMobilePhone = this.$route.query.isBindMobilePhone; //是否绑定手机
    this.isPayMember = this.$route.query.isPayMember; //用户昵称
    this.uid = this.$route.query.id;
    this.btText = this.isPayMember == "1" ? "立即续费" : "立即开通"; //按钮文本
    let that = this;
    /* eslint-disable */
    let mySwiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      initialSlide: this.titleIndex,
      coverflowEffect: {
        rotate: 0,
        stretch: 10,
        depth: 150,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        renderFraction: function (currentClass, totalClass) {
          return (
            '<span class="' +
            currentClass +
            '"></span>' +
            " / " +
            '<span class="' +
            totalClass +
            '"></span>'
          );
        },
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      on: {
        slideChange: function () {
          that.titleIndex = this.activeIndex; //切换结束时，告诉我现在是第几个slide
        },
      },
    });
    this.mySwiper = mySwiper;
  },
  methods: {
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
    /**
     * 订单预支付
     */
    // pay(data) {
    //   this.$api.orderDetail
    //     .getOrderPayment({
    //       productName: "九折年卡",
    //       tradeAmount: 199,
    //       userId: this.uid,
    //       userName: data.userName,
    //       channelType: 2,
    //       orderId: data.id,
    //       openid: getOpenId(),
    //       orderType: "20",
    //       //  openid: "oqFfi0_jGp1Xxumil5RapKasxe14",
    //       // source: 90
    //     })
    //     .then((res) => {
    //       this.openWXPay(res.map);
    //       //   if (openWXPay(res.map)) {
    //       //     this.$router.push({ path: "/userDetail" });
    //       //   } else {
    //       //   }
    //     });
    // },
    /**
     * APP内部的订单支付
     */
    // appPay(data) {
    //   this.$api.orderDetail
    //     .getOrderPayment({
    //       productName: "九折年卡",
    //       tradeAmount: 199,
    //       userId: this.uid,
    //       userName: data.userName,
    //       channelType: 0,
    //       orderId: data.id,
    //        orderType:"20",
    //       // source: this.$store.state.isAppend
    //       //source: 20
    //     })
    //     .then((res) => {
    //       var requestData = JSON.stringify({
    //         channelType: 0,
    //         map: res.map,
    //       });
    //       this.loginShow = false;
    //       window.hpcapi.openMemberWXPay(requestData);
    //       //   if (openWXPay(res.map)) {
    //       //     this.$router.push({ path: "/userDetail" });
    //       //   } else {
    //       //   }
    //     });

    //   // this.$api.orderDetail
    //   //   .getOrderPayment({
    //   //     productName: "九折年卡",
    //   //     tradeAmount: 0.01,
    //   //     userId: "1123123213",
    //   //     userName: "是31313123",
    //   //     channelType: 0,
    //   //     orderId: "12312312312",
    //   //     source: "20"
    //   //   })
    //   //   .then(res => {
    //   //     window.hpcapi.openMemberWXPay(res);
    //   //     //   if (openWXPay(res.map)) {
    //   //     //     this.$router.push({ path: "/userDetail" });
    //   //     //   } else {
    //   //     //   }
    //   //   });
    // },
    /**
     * 立即续费方法
     * loginShow代表弹出框是否加载
     * isBind判断用户有没有绑定手机号
     */
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
     * app支付接口
     */
    appPay(inviterId, memberPayChannel, channelType) {
      // this.$api.userMembers
      //   .purchaseCardToPay({
      //     uid: this.uid,
      //     cardNO: "1111",
      //     memberPayChannel: memberPayChannel,
      //     channelType: channelType,
      //   })
      //   .then((res) => {
      //     var requestData = JSON.stringify({
      //       channelType: 0,
      //       map: res.map,
      //     });
      //     window.hpcapi.openMemberWXPay(requestData);
      //   });
      //先判断版本是否高于或等于1.6.5
      if (this.$store.state.user.version >= "1.6.5") {
        if (this.radio == 0) {
          //调起微信支付
          this.$api.userMembers
            .purchaseCardToPay({
              uid: this.uid,
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
              uid: this.uid,
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
              // this.$toast("调起支付宝支付失败");
            });
        } else {
          //其他的支付情况
          //this.$toast("暂时未开通此支付方式");
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
     * wx支付接口
     */
    wxPay(inviterId, memberPayChannel, channelType) {
      this.$api.userMembers
        .purchaseCardToPay({
          uid: this.uid,
          cardNO: "1111",
          memberPayChannel: memberPayChannel,
          channelType: channelType,
          openId: getOpenId(),
        })
        .then((res) => {
          this.openWXPay(res.map);
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
        if (channel == "QR" && InviterId) {
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
    // userPay() {
    //   if (isInApp()) {
    //     //  this.$toast(this.uid);
    //     //   var hp = this.$store.state.user.appToken;
    //     if (this.uid == "" || this.uid == "undefined") {
    //       window.hpcapi.openLogin();
    //       return;
    //     }
    //     let inviterId =
    //       this.$store.state.user.InviterId == undefined
    //         ? ""
    //         : this.$store.state.user.InviterId;
    //     this.$api.userMembers
    //       .purchaseCard({
    //         uid: this.uid,
    //         inviterId: inviterId,
    //       })
    //       .then((res) => {
    //         if (isInApp()) {
    //           this.appPay(res);
    //         } else {
    //           this.pay(res);
    //         }
    //       });
    //   } else {
    //     if (detectVersion().isWeiXin) {
    //       if (
    //         this.$store.state.user.userId == null ||
    //         !this.isBindMobilePhone
    //       ) {
    //         this.loginShow = true;
    //       } else {
    //         var InviterId = this.$store.state.user.InviterId;
    //         var userId = this.$store.state.user.userId;

    //         this.$api.userMembers
    //           .purchaseCard({
    //             uid: userId,
    //             inviterId: InviterId,
    //           })
    //           .then((res) => {
    //             if (isInApp()) {
    //               this.appPay(res);
    //             } else {
    //               this.pay(res);
    //             }
    //           });
    //         //openWXPay();
    //       }
    //     } else {
    //       this.$toast("请在微信打开!");
    //     }
    //   }
    // },
    titleClick(index) {
      this.titleIndex = index;
      this.mySwiper.slideTo(index, 600, false);
    },
  },
};
</script>

<style  scoped lang="scss">
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
.swiper-scrollbar {
  background: none;
  width: 100%;
  margin: 0 auto;
  left: 0;
  font-size: 0;
  //  left:50%;
  //    transform: translateX(-50%);
}
.bottom-warp {
  overflow-x: hidden;
  overflow-y: auto;
  // height: 650px;
  height: calc(100% - 480px);
}
.ys-swiper {
  width: 36px;
  height: 6px !important;
  background: linear-gradient(
    90deg,
    rgba(235, 178, 136, 1) 0%,
    rgba(194, 125, 83, 1) 100%
  ) !important;
  border-radius: 3px !important;
}
.swiper-container {
  overflow: initial;
}
.swiper-container-horizontal > .swiper-scrollbar {
  top: -40px;
}

.interest {
  // background-image: url("../../assets/img/beijing.png");
  background: rgba(255, 248, 239, 1);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  &-text {
    margin-top: 21px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;
    .titleActive {
      font-size: 40px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      background: linear-gradient(
        135deg,
        rgba(246, 192, 150, 1) 0%,
        rgba(180, 106, 64, 1) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    span {
      font-size: 34px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(192, 122, 80, 1);
      width: 25%;
      display: block;
      text-align: center;
      -webkit-background-clip: text;
    }
  }
  &-content {
    margin-top: 50px;
    font-family: PingFangSC-Regular, PingFang SC;

    .custom-indicator {
      font-size: 30px;
      text-align: center;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-top: 20px;
    }
    .swiper-pagination {
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-bottom: 20px;
    }
    .interest-item {
      width: 622px;
      height: 1062px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 20px;
      position: relative;

      .interest-item-top {
        .top-text {
          color: #333333;
          font-size: 34px;

          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          text-align: center;
          margin-top: 63px;
        }
        .top-bg {
          width: 100%;
          background: url("../../assets/img/kapian.png") no-repeat;
          background-size: cover;
          z-index: 1000;
          position: relative;
          height: 110px;
          .top-rid {
            background-color: #373737;
            width: 94px;
            height: 94px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 50%;
            bottom: 0%;
            transform: translate(-50%, 40%);
            img {
              width: 63px;
              height: auto;
            }
            .top-rid-dj {
              width: 57px;
              height: auto;
            }
            .top-rid-zs {
              width: 48px;
              height: auto;
            }
            .top-rid-dz {
              width: 55px;
              height: auto;
            }
          }
        }
      }
      .interest-item-center {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(208, 159, 129, 1);
        line-height: 40px;
        margin: 20px 0 0 40px;
        span {
          margin-right: 5px;
        }
      }
      .mt {
        padding-top: 38px;
      }
      .mt75 {
        padding-top: 75px;
      }
      .interest-item-bottom {
        margin-top: 20px;
        ul {
          width: 514px;
          margin: 0 auto;
          margin-top: 24px;
          li {
            font-size: 24px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 40px;
          }
        }

        .bottom-title {
          .title-english {
            position: absolute;
            font-size: 40px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(246, 244, 245, 1);
            left: 50px;
            bottom: -18px;
          }
          span:first-child {
            width: 4px;
            display: inline-block;
            height: 24px;
            background: rgba(232, 190, 145, 1);
            border-radius: 2px;
            margin-left: 40px;
          }
          span:nth-child(2) {
            font-size: 34px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            margin-left: 10px;
            z-index: 1000;
            position: relative;
          }
        }
      }
    }
    .interest-item-bt {
      width: 434px;
      height: 89px;
      background: rgba(245, 197, 146, 1);
      box-shadow: 0px 2px 10px 0px rgba(245, 197, 146, 1);
      border-radius: 45px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 27px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      //  transform: translateZ(100px);
      //  transform:translateZ(100px)
      span {
        font-size: 34px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 48px;
        text-shadow: 0px 2px 10px rgba(245, 197, 146, 1);
      }
    }
  }
}
</style>