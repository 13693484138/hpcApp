<template>
  <div>
    <van-skeleton avatar :row="3" :loading="loading">
      <component
        :is="currentComponent"
        :user="this.user"
        @memberInit="isUserType"
      ></component>
    </van-skeleton>
    <van-skeleton :row="3" :loading="loading"></van-skeleton>
    <van-skeleton :row="3" :loading="loading"></van-skeleton>
    <van-skeleton :row="6" :loading="loading"></van-skeleton>
    <van-skeleton :row="6" :loading="loading"></van-skeleton>
  </div>
</template>
<script>
import {
  getUserInfo,
  setUnionId,
  getUnionId,
  setOpenId,
  getOpenId,
  getOpenId2,
  setStore,
  getStore,
} from "@/utils/auth";
var wx = require("weixin-js-sdk");
import {
  isInApp,
  sharePage,
  getUrlParams,
  detectVersion,
} from "@/utils/native.js";
import { appid, signatureURL, appUrl } from "@/utils/config.js";
import { wxAuth, VersionDiff } from "@/utils/native.js";
export default {
  data() {
    return {
      currentComponent: "",
      user: {},
      loading: true,
      text: "",
      shareConfig: {
        linkUrl: "",
        showShare: true,
        showAlert: false,
        title: "我是荟品仓的超级荟员,折上再享9折,超划算~",
        description: "快来和我一起成为荟品仓的超级荟员吧~ 超多福利等着你哦~",
        shareImage: appUrl + "share.png",
      },
    };
  },
  components: {
    openMemberDetail(resolve) {
      require(["../member/memberDetail"], resolve);
    },
    openUserDetail(resolve) {
      require(["../member/userDetail"], resolve);
    },
  },
  created() {
    // this.isUserType();
  },
  mounted() {
    this.userInit();
    // if (isInApp()) {
    //   //APP调后台接口判断是不是会员
    //   this.isAppuserType();
    // } else {
    //   //微信APP调后台接口判断是不是会员
    //   this.isUserType();
    // }
  },
  methods: {
    //判断是不是会员
    isUserType() {
      let unionId = getUnionId();
      let openId = getOpenId();
      // alert(unionId);
      //let unionId = "opGnB58SRZZ0fr5JjV-05YNJqZuQ";
      let that = this;
      this.$api.userMembers
        .getMemberByUnionId({
          unionId: unionId,
          openId: openId,
        })
        .then(
          (res) => {
            that.user = res;
            if (that.user == null) {
              that.loading = false;
              that.currentComponent = "openMemberDetail";
            } else {
              that.user = res;
              that.$store.commit("setAppToken", res.token);
              that.getWechatSignature();
              if (that.user.isPayMember) {
                that.loading = false;
                that.currentComponent = "openUserDetail";
                //  that.loading=false;
                //   this.$router.push({ path: "userDetail" });
              } else {
                that.loading = false;
                that.currentComponent = "openMemberDetail";
                //  that.loading=false;
                // this.$router.push({ path: "memberDetail" });
              }
            }
          },
          (e) => {
            that.loading = false;
            that.currentComponent = "openMemberDetail";
            //  that.loading=false;
          }
        );
    },
    //兼容旧版
    isoldAppuserType(userID) {
      this.shareConfig.linkUrl = appUrl + "?inviterId=" + userID;
      sharePage(this.shareConfig);
      var that = this;
      var hp = this.$store.state.user.appToken;
      this.$api.userMembers
        .getMemberByToken({
          hp_token: hp,
        })
        .then(
          (res) => {
            that.user = res;
            if (that.user.isPayMember) {
              that.loading = false;
              that.currentComponent = "openUserDetail";
              //  that.loading=false;
              //   this.$router.push({ path: "userDetail" });
            } else {
              that.loading = false;
              that.currentComponent = "openMemberDetail";
              //  that.loading=false;
              //   this.$router.push({ path: "memberDetail" });
            }
          },
          (e) => {
            that.loading = false;
            that.currentComponent = "openMemberDetail";
            // that.loading=false;
          }
        );
    },
    //
    isAppuserType(isPayMember, userID) {
      this.user.uid = userID;
      this.user.isPayMember = isPayMember;
      this.shareConfig.linkUrl = appUrl + "?inviterId=" + userID;
      this.shareConfig.path='/pages/merber/superMerber/index?isApp='+isPayMember+'&source=app';
      sharePage(this.shareConfig);
      if (isPayMember) {
        this.loading = false;
        this.currentComponent = "openUserDetail";
      } else {
        this.loading = false;
        this.currentComponent = "openMemberDetail";
      }
    },
    //获取来源
    getSource() {
      if (detectVersion().isIOS9) {
        this.$store.commit("setisApp", 20);
      } else if (detectVersion().isAndroid) {
        this.$store.commit("setisApp", 10);
      } else {
        this.$store.commit("setisApp", 90);
      }
    },
    //初始化
    userInit() {
      //首先获取来源
      this.getSource();
      if (isInApp()) {
        let system = JSON.parse(window.hpcapi.systemInfo());
        if (system.sign == "" || system.sign == null) {
          this.shareConfig.linkUrl = appUrl;
          sharePage(this.shareConfig);
          this.loading = false; //骨架屏不显示
          this.currentComponent = "openMemberDetail";
          return;
        }
        this.$store.commit("setAppToken", system.sign); //储存TOKEN
        VersionDiff(system.version)
          ? this.isAppuserType(system.isPayMember, system.userID)
          : this.isoldAppuserType(system.userID);
      } else {
        if (getUrlParams("store") != undefined) {
          setStore(getUrlParams("store"));
        }
        if (getUrlParams("unionId") != undefined) {
          setUnionId(getUrlParams("unionId"));
          setOpenId(getUrlParams("openid"));
          if (getUrlParams("inviterId") != undefined) {
            this.$store.commit("setInviterId", getUrlParams("inviterId"));
          }
          this.isUserType();
        } else {
          if (getUrlParams("inviterId") != undefined) {
            this.$store.commit("setInviterId", getUrlParams("inviterId"));
          }
          //alert(this.$store.state.user.InviterId);
          let ua = window.navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
            wxAuth(); //进行微信授权
          } else {
            //不在微信内部&&不在微信内部
            this.currentComponent = "openMemberDetail";
          }
        }
      }
    },
    //微信分享初始化
    getWechatSignature() {
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
          var that = this;
          that.shareConfig.linkUrl =
            appUrl + "?inviterId=" + that.user.uid + "";
          sharePage(that.shareConfig);
          // wx.ready(function() {
          //   //分享给朋友
          //   wx.onMenuShareAppMessage({
          //     title: that.shareConfig.title,
          //     desc: that.shareConfig.description,
          //     link: that.shareConfig.linkUrl,
          //     imgUrl: that.shareConfig.shareImage,
          //     success: function(res) {
          //       // alert('已分享');
          //     },
          //     cancel: function(res) {
          //       // alert('已取消');
          //     },
          //     fail: function(res) {
          //       // alert(JSON.stringify(res));
          //     }
          //   });
          //   //分享给朋友圈
          //   wx.onMenuShareTimeline({
          //     title: that.shareConfig.title,
          //     desc: that.shareConfig.description,
          //     link: that.shareConfig.linkUrl,
          //     imgUrl: that.shareConfig.shareImage,
          //     success: function(res) {
          //       // alert('已分享');
          //       //   var service = 'candy'
          //       //   var event = 'saveUserOperation'
          //       //   var objPam = { typeCode: 4 }
          //       //   var type = 'post'
          //       //   ajaxFun(
          //       //     service,
          //       //     event,
          //       //     objPam,
          //       //     type,
          //       //     function (dat) {
          //       //       if (dat.code == 0) {
          //       //         console.log('已分享')
          //       //       }
          //       //     },
          //       //     function (xhr, status, error) {},
          //       //     function (xhr, status, error) {}
          //       //   )
          //     },
          //     cancel: function(res) {
          //       // alert('已取消');
          //       //
          //     },
          //     fail: function(res) {
          //       // alert(JSON.stringify(res));
          //     }
          //   });
          //   // 分享到QQ
          //   wx.onMenuShareQQ({
          //     title: that.shareConfig.title,
          //     desc: that.shareConfig.description,
          //     link: that.shareConfig.linkUrl,
          //     imgUrl: that.shareConfig.shareImage,
          //     success: function(res) {
          //       // alert('已分享');
          //     },
          //     cancel: function(res) {
          //       // alert('已取消');
          //     },
          //     fail: function(res) {
          //       // alert(JSON.stringify(res));
          //     }
          //   });
          //   // 分享到QQ空间
          //   wx.onMenuShareQZone({
          //     title: that.shareConfig.title,
          //     desc: that.shareConfig.description,
          //     link: that.shareConfig.linkUrl,
          //     imgUrl: that.shareConfig.shareImage,
          //     success: function(res) {
          //       //
          //       // ');
          //     },
          //     cancel: function(res) {
          //       // alert('已取消');
          //     },
          //     fail: function(res) {
          //       // alert(JSON.stringify(res));
          //     }
          //   });
          //   // 分享到QQ微博
          //   wx.onMenuShareWeibo({
          //     title: that.shareConfig.title,
          //     desc: that.shareConfig.description,
          //     link: that.shareConfig.linkUrl,
          //     imgUrl: that.shareConfig.shareImage,
          //     success: function(res) {
          //       // alert('已分享');
          //     },
          //     cancel: function(res) {
          //       // alert('已取消');
          //     },
          //     fail: function(res) {
          //       // alert(JSON.stringify(res));
          //     }
          //   });
          // });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.van-skeleton {
  padding-top: 40px;
}
</style>