<template>
  <div class="member">
    <div class="member-banner">
      <div class="member-banner-care">
        <div class="care-content">
          <div class="care-content-top" ref="lightBtn">
            <div class="care-content-top-head">
              <img class="hym-bg" v-if="user.headImgUrl" :src="user.headImgUrl" alt />
              <img class="hym-bg" v-if="!user.headImgUrl" src="../../assets/img/default-img.png" />
              <span>{{user.nickName}}</span>
            </div>
            <div class="care-content-top-bottom" @click="userPay">立即续费</div>
          </div>

          <div class="care-content-bottom">
            <div class="instructions">累计已省</div>
            <div class="care-content-bottom-text">
              <div class="span-content">
                <span class="icon-span">￥</span>
                <span class="fist-span">{{user.discountMoney|shuDate}}</span>
              </div>
              <span class="last-span">{{user.expireTime|formatDate}}到期</span>
            </div>
          </div>
        </div>

        <div class="care-bar">
          <div class="care-bar-text">让我们为您提供更好的服务</div>
          <div class="care-bar-bottom" @click="urlDetail('memberSign')">
            <span>规则说明</span>
            <img src="@/assets/img/test-icon.png" alt />
          </div>
        </div>
      </div>
      <div class="member-banner-img">
        <img src="@/assets/img/member-title.png" alt />
      </div>
      <div class="member-banner-content">
        <div class="member-banner-buttom">
          <div class="member-banner-buttom-item" @click="urlDetail('memberInterest',0,1)">
            <img src="@/assets/img/qcjz-buttom.png" alt />
          </div>
          <div class="member-banner-buttom-item" @click="urlDetail('memberInterest',1,1)">
            <img src="@/assets/img/djfw-buttom.png" alt />
          </div>
          <div class="member-banner-buttom-item" @click="urlDetail('memberInterest',2,1)">
            <img src="@/assets/img/zssp-buttom.png" alt />
          </div>
          <div class="member-banner-buttom-item" @click="urlDetail('memberInterest',3,1)">
            <img src="@/assets/img/tbdz-buttom.png" alt />
          </div>
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
        <img src="@/assets/img/djfw-title.png" class="img-up" alt />
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
          <img src="@/assets/img/ljxf-bottom.png" alt @click="userPay" />
        </div>
      </div>
    </transition>
    <div class="m-bottom"></div>
    <!-- 开通成功弹出框 -->
    <van-overlay :show="openMemberPop" @click="openMemberPop = false">
      <div class="loginPop">
        <div class="loginPop-head" @click.stop>
          <img src="@/assets/img/car-head.png" alt />
        </div>
        <div class="loginPop-content" @click.stop>
          <div class="loginPop-content-title">续费成功</div>
          <div class="loginPop-content-text">线下门店出示荟品仓小程序</div>
          <div class="loginPop-content-text">荟品仓线下门店可同享9折</div>
          <div class="loginPop-content-bt">
            <van-button
              type="default"
              color="rgba(254,229,200,1)"
              class="bt-no"
              @click="openMemberPop = false"
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
  </div>
</template>
<script>
// import wx from "@/utils/jssdkUtils";
// import headNav from "_c/headNav.vue";
import memberGoodsList from "@/views/member/components/memberGoodsList.vue";
import { isElementNotInViewport } from "@/utils";
import { isInApp, detectVersion } from "@/utils/native.js";
import { getUnionId, getOpenId } from "@/utils/auth.js";
import { productDetailsUrl, appUrl,memberPrice } from "@/utils/config.js";
export default {
  name: "userDetail",
  data() {
    return {
      loginShow: false,
      loading: true,
      isFixed: false,
      openMemberPop: false,
      user: {}, //用户对象
    };
  },
  components: {
    memberGoodsList: memberGoodsList,
  },
  filters: {
    formatDate(time) {
      if (time) {
        return time.replace(/-/g, ".");
      }
    },
    shuDate(num) {
      if (num) {
        return num.toFixed(2);
      }
      else{
        return "0.00"
      }
    },
  },
  created() {},
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
    this.memberInit();
  },
  methods: {
    /**
     * 跳转用户协议
     */
    urlDetail(url, index, is) {
      if (isInApp()) {
        if (index >= 0) {
          window.hpcapi.openRouter(
            `${appUrl}${url}?index=${index}&isBindMobilePhone=${this.user.isBindMobilePhone}&isPayMember=${is}&id=${this.user.uid}`
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
              isBindMobilePhone: this.user.isBindMobilePhone,
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
        window.hpcapi.openRouter(appUrl+"makeHome");
      } else {
        this.goodsUrl();
      }
    },
    //版本获取
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
     * app内部支付
     */
    appPay(data) {
      this.$api.orderDetail
        .getOrderPayment({
          productName: "九折年卡",
          tradeAmount: memberPrice,
          userId: this.user.uid,
          userName: this.user.nickName,
          channelType: 0,
          orderId: data.id,
           orderType:"20",
          // openid: "oqFfi0_jGp1Xxumil5RapKasxe14",
          // source: this.$store.state.user.isAppend
        })
        .then((res) => {
          var requestData = JSON.stringify({
            channelType: 0,
            map: res.map,
          });
          window.hpcapi.openMemberWXPay(requestData);
          // window.hpcapi.openMemberWXPay(this.shareConfig);
          //   if (openWXPay(res.map)) {
          //     this.$router.push({ path: "/userDetail" });
          //   } else {
          //   }
        });
    },
    /**
     * 会员初始化
     */
    memberInit() {
      let that = this;
      if (isInApp()) {
        var hp = this.$store.state.user.appToken;
        this.$api.userMembers
          .getMemberByToken({
            hp_token: hp,
          })
          .then((res) => {
            that.user = res;
            that.$store.commit("setUserId", res.uid);
            if (that.user.isPayMember) {
              that.currentComponent = "openUserDetail";
              //   this.$router.push({ path: "userDetail" });
            } else {
              that.currentComponent = "openMemberDetail";
              //   this.$router.push({ path: "memberDetail" });
            }
          });
      } else {
        this.$api.userMembers
          .getMemberByUnionId({
            unionId: getUnionId(),
            openId: getOpenId(),
          })
          .then((res) => {
            that.user = res;
            that.$store.commit("setUserId", res.uid);
            that.$store.commit("setAppToken", res.token);
            console.log(res);
          });
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
     * 立即续费
     */
    userPay() {
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
      //openWXPay();
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
          userName: this.user.nickName,
          channelType: 2,
          orderId: data.id,
          openid: getOpenId(),
           orderType:"20",
          // openid: "oqFfi0_jGp1Xxumil5RapKasxe14",
          //source: 90
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
     *测一测
     */
    test() {
      this.$toast("敬请期待!");
    },
    /**
     * 测试授权
     */
    testAuthor() {
      this.$router.push({ path: "/author" });
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
              this.memberInit();
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
  .img-up {
    width: 444px;
  }
  background-color: #f5f5f5;
  .van-skeleton {
    background-color: #fff;
    padding-top: 40px;
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
      }
      .loginPop-content-sms,
      .loginPop-content-phone {
        border: 1px solid rgba(223, 223, 223, 1);
        margin: 40px 26px 30px 26px;
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
  &-banner {
    background-color: #19191d;
    width: 100%;
    text-align: center;
    border-top: 1px solid #19191d;
    &-care {
      .care-content {
        width: 93.6%;
        margin: 0 auto;
        height: 320px;

        margin-top: 29px;
        background-image: url("../../assets/img/member-car.png");
        background-size: cover;
        .care-content-top {
          display: flex;
          justify-content: space-between;

          &-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 32px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            margin-left: 30px;
            margin-top: 30px;
            color: rgba(0, 0, 0, 0.6);
            .hym-bg {
              width: 80px;
              height: 80px;
              border-radius: 50%;
            }
            span {
              margin-left: 10px;
            }
          }
          &-bottom {
            width: 180px;
            height: 66px;
            background: rgba(254, 229, 200, 1);
            border-radius: 4px;
            margin-top: 37px;
            margin-right: 30px;
            font-size: 24px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 66px;
          }
        }
        .care-content-bottom {
          text-align: left;
          .instructions {
            font-size: 26px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.4);
            margin-left: 30px;
            margin-top: 74px;
          }
          .care-content-bottom-text {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            .span-content {
              margin-top: 10px;
              .fist-span {
                margin-left: 5px;

                font-size: 80px;
                font-family: unset;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.6);
                margin-top: 20px;
              }
              .icon-span {
                font-size: 48px;
                margin-left: 24px;
                color: rgba(0, 0, 0, 0.6);
              }
            }
            .last-span {
              font-size: 24px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(0, 0, 0, 0.3);
              margin-right: 30px;
            }
          }
        }
      }
      .care-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 93.6%;
        margin: 0 auto;
        height: 48px;
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        background-image: linear-gradient(to right, #4b4b4f, #2c2c2c);
        border-radius: 0px 0px 12px 12px;
        color: rgba(222, 205, 178, 1);
        &-text {
          margin-left: 30px;
        }
        &-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            width: 24px;
            height: 24px;
            margin-left: 10px;
            margin-right: 32px;
            display: block;
          }
          span{
            display: block;
          }
        }
      }
    }
    &-img {
      img {
        margin-top: 14px;
        width: 579px;
      }
    }
    &-content {
      .member-banner-buttom {
        display: flex;
        justify-content: center;

        .member-banner-buttom-item {
          margin: 19px 21px 30px 21px;
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
      margin: 0 20px;
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
        font-family: PingFangSC-Semibold, PingFang SC;
        .text-tow-text {
          width: 520px;
          display: block;
        }
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