<template>
  <div style="margin-top:20px;text-align:center"></div>
</template>
<script>
import {
  getUserInfo,
  setUnionId,
  getUnionId,
  setOpenId,
  getOpenId
} from "@/utils/auth";
import { isInApp } from "@/utils/native.js";
export default {
  name: "author",
  data() {
    return {
      a: ""
    };
  },
  created() {
    // this.a = window.hpcapi.systemInfo();
    // var list = document.getElementById("list");
    // var a = window.hpcapi.systemInfo();
    // list.innerHTML(a);
    // if (isInApp()) {
    //   let system = JSON.parse(window.hpcapi.systemInfo());
    //   if (system.systemVersion == "iOS") {
    //     this.$store.commit("setisApp", 20);
    //   } else if (system.systemVersion == "Android") {
    //     this.$store.commit("setisApp", 10);
    //   }
    //   this.$store.commit("setAppToken", system.hp_token);
    //   // this.$router.push({ path: "/index" });
    // } else {
    //   if (this.$route.query.unionId != undefined) {
    //     setUnionId(this.$route.query.unionId);
    //     setOpenId(this.$route.query.openid);
    //   }
    //   if (this.$route.query.inviterId != undefined) {
    //     this.$store.commit("setInviterId", this.$route.query.inviterId);
    //   }
    //   let ua = window.navigator.userAgent.toLowerCase();
    //   if (ua.match(/MicroMessenger/i) == "micromessenger") {
    //     //及在微信内部且没有授权
    //     if (getUnionId() != undefined && getOpenId() != undefined) {
    //       this.$router.push({ path: "/index" });
    //     } else {
    //       let APPID = "wxbad3cf328b48f2e4";
    //       let url =
    //         "https://api-dev.hpcang.com/thridauth/wx/v1/wxauth/wxWebAuth";
    //       let STATE = "https://h5.hpcang.com/app-h5/";
    //       //   window.location.href="https://api-dev.hpcang.com/thridauth/wx/v1/wxauth/wxWebAuth"
    //       window.location.href =
    //         "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
    //         APPID +
    //         "&redirect_uri=http%3A%2F%2Fapi-dev.hpcang.com%2Fthirdauth%2Fwx%2Fv1%2Fwxauth%2FcallBack&response_type=code&scope=snsapi_userinfo&state=" +
    //         STATE +
    //         "#wechat_redirect";
    //     }
    //   } else {
    //     //不在微信内部&&不在微信内部
    //     this.$router.push({ path: "/index" });
    //   }
    // }
  },
  mounted() {
    if (isInApp()) {
      let system = JSON.parse(window.hpcapi.systemInfo());
      if (system.systemVersion == "iOS") {
        this.$store.commit("setisApp", 20);
      } else if (system.systemVersion == "Android") {
        this.$store.commit("setisApp", 10);
      }
      this.$store.commit("setAppToken", system.sign);
      this.a = this.$store.state.user.appToken;
      this.$router.push({ path: "/index" });
    } else {
      if (this.$route.query.unionId != undefined) {
        setUnionId(this.$route.query.unionId);
        setOpenId(this.$route.query.openid);
      }
      if (this.$route.query.inviterId != undefined) {
        this.$store.commit("setInviterId", this.$route.query.inviterId);
      }
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        //及在微信内部且没有授权
        if (getUnionId() != undefined && getOpenId() != undefined) {
          this.$router.push({ path: "/index" });
        } else {
          let APPID = "wxbad3cf328b48f2e4";
          let url =
            "https://api-dev.hpcang.com/thridauth/wx/v1/wxauth/wxWebAuth";
          let STATE = "https://h5.hpcang.com/app-h5/";
          //   window.location.href="https://api-dev.hpcang.com/thridauth/wx/v1/wxauth/wxWebAuth"
          window.location.href =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            APPID +
            "&redirect_uri=http%3A%2F%2Fapi-dev.hpcang.com%2Fthirdauth%2Fwx%2Fv1%2Fwxauth%2FcallBack&response_type=code&scope=snsapi_userinfo&state=" +
            STATE +
            "#wechat_redirect";
        }
      } else {
        //不在微信内部&&不在微信内部
        this.$router.push({ path: "/index" });
      }
    }
    // var list = document.getElementById("list");
    // this.a = window.hpcapi.systemInfo();
    // list.innerHTML(a);
    // this.$api.userMembers
    // .getMemberByToken({
    //   hp_token: this.$store.state.setAppToken
    // })
    // .then(res => {
    //   that.user = res;
    //   if (that.user.isPayMember) {
    //     that.currentComponent = "openUserDetail";
    //     //   this.$router.push({ path: "userDetail" });
    //   } else {
    //     that.currentComponent = "openMemberDetail";
    //     //   this.$router.push({ path: "memberDetail" });
    //   }
    // });
  },
  methods: {
    /**
     *
     */
  }
};
</script>
<style lang="scss" scoped>
</style>