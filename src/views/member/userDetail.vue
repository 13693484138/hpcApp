<template>
  <div class="newMemcer">
    <div class="newMemcer-bg"></div>
    <div class="newMemcer-warp">
      <div class="nemMemcer-card">
        <div class="member-banner-care">
          <div class="care-content">
            <div class="care-content-top" ref="lightBtn">
              <div class="care-content-top-head">
                <img
                  class="hym-bg"
                  v-if="user.headImgUrl"
                  :src="user.headImgUrl"
                  alt
                />
                <img
                  class="hym-bg"
                  v-if="!user.headImgUrl"
                  src="../../assets/img/default-img.png"
                />
                <span>{{ user.nickName }}</span>
              </div>
              <div class="care-content-top-bottom" @click="showPayPop">
                立即续费
              </div>
            </div>

            <div class="care-content-bottom">
              <div class="instructions">累计已省</div>
              <div class="care-content-bottom-text">
                <div class="span-content">
                  <span class="icon-span">￥</span>
                  <span class="fist-span">{{
                    user.discountMoney | shuDate
                  }}</span>
                </div>
                <span class="last-span"
                  >{{ user.expireTime | formatDate }}到期</span
                >
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
      </div>
      <div class="list-tit">
        <img src="./../../images/member/list-ti.png" alt />
      </div>
      <div class="newMwmcer-c">
        <div
          class="newMwmcer-c-item"
          @click="urlDetail('memberInterest', 0, 1)"
          alt
        >
          <div class="img-zssp"></div>
          <span>专属商品</span>
        </div>
        <div
          class="newMwmcer-c-item"
          @click="urlDetail('memberInterest', 1, 1)"
          alt
        >
          <div class="img-qcjz"></div>
          <span>全场9折</span>
        </div>
        <div
          class="newMwmcer-c-item"
          @click="urlDetail('memberInterest', 2, 1)"
          alt
        >
          <div class="img-hpdj"></div>
          <span>荟品到家</span>
        </div>
        <div
          class="newMwmcer-c-item"
          @click="urlDetail('memberInterest', 3, 1)"
          alt
        >
          <div class="img-tebdz"></div>
          <span>特别定制</span>
        </div>
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
          <img
            src="./../../images/member/lijixufei.png"
            alt
            @click="showPayPop"
          />
        </div>
      </div>
    </transition>
    <div class="m-bottom"></div>
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
</template>
<script>
import memberGoodsList from "@/views/member/components/memberGoodsList.vue";
import { isElementNotInViewport, getUrlParameter } from "@/utils";
import { isInApp, detectVersion } from "@/utils/native.js";
import { getUnionId, getOpenId,getStore } from "@/utils/auth.js";
import { productDetailsUrl, appUrl, memberPrice } from "@/utils/config.js";
export default {
  name: "userDetail",
  data() {
    return {
      loginShow: false,
      loading: true,
      isFixed: false,
      openMemberPop: false,
      user: {}, //用户对象
      showPop: false,
      radio: "",
      payList: [],
      weixinImgUrl: "./../../../images/member/weixin.png",
      zhifubaoImgUrl: "./../../../images/member/zhifubao.png",
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
      } else {
        return "0.00";
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
        window.hpcapi.openRouter(appUrl + "makeHome");
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
      //     uid: this.user.uid,
      //     cardNO: "1111",
      //     memberPayChannel: memberPayChannel,
      //     inviterId: inviterId,
      //     channelType: channelType,
      //   })
      //   .then((res) => {
      //     var requestData = JSON.stringify({
      //       channelType: 0,
      //       map: res.map,
      //     });
      //     window.hpcapi.openMemberWXPay(requestData);
      //   }).catch(()=>{
      //     this.$toast("调起app支付失败");
      //   });
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
            // this.$toast("调起app支付失败");
          });
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
          })
          .catch(() => {
            this.$toast("荟员数据获取失败");
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
          })
          .catch(() => {
            this.$toast("荟员数据获取失败");
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
    margin-top: 60px;
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
    img {
      width: 672px;
      height: 200px;
      margin: 0 a;
    }
  }
  .newMwmcer-c {
    width: 702px;

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

    justify-content: space-around;
    .newMwmcer-c-item {
      margin-top: 30px;
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
    height: 264px;
    background: rgba(255, 245, 231, 1);
    position: absolute;
    top: 0;
  }
  .list-tit {
    img {
      width: 579px;
      height: 62px;
      display: block;
      margin: 0 auto;
      margin-top: 40px;
    }
  }
  .newMemcer-warp {
    opacity: 1;
    .nemMemcer-card {
      .member-banner-care {
        .care-content {
          width: 93.6%;
          margin: 0 auto;
          height: 320px;
          z-index: 1000;
          position: relative;
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
              background: rgba(254, 229, 200, 1);
              border-radius: 4px;
              margin-top: 37px;
              margin-right: 30px;
              font-size: 24px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              line-height: 66px;
              width: 180px;
              height: 66px;
              background: rgba(254, 229, 200, 1);
              border-radius: 33px;
              text-align: center;
              color: rgba(51, 51, 51, 1);
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
            span {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>