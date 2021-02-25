<template>
  <div class="article">
    <van-overlay class="loading"
                 :show="show">
      <div class="wrapper"
           @click.stop>
        <div class="block">
          <van-loading class="loading-img"
                       vertical>加载中...</van-loading>
        </div>
      </div>
    </van-overlay>

    <van-skeleton :row="30"
                  :loading="loading"> </van-skeleton>
    <!-- <iframe frameborder="0"
            style="background-color: #ffffff;min-height:100vh;width: 100%;"
            :srcdoc="content"></iframe> -->
    <div class="content"
         v-html="content"></div>
  </div>
</template>

<script>
let wx = require("weixin-js-sdk");
wx.hideOptionMenu();
import { getUrlParameter } from "@/utils/index.js";
import { appUrl } from "@/utils/config.js";
import { setUnionId, getUnionId, setOpenId, getOpenId } from "@/utils/auth";
import { sharePage, detectVersion, wxAuth2 } from "@/utils/native.js";
export default {
  props: {},
  data () {
    var self = this;
    return {
      authorizedHeadname: 0, //授权
      authorizedLocation: 0, //地理位置(中间页未用到)
      show: true,
      id: "",
      loading: true,
      openid: null,
      content: "",
      longitude: null, //纬度
      latitude: null, //经度
      newUserFlag: 0,
      fromUserId: null,
      user: null,
      shareConfig: {
        linkUrl: "",
        showShare: true,
        showAlert: false,
        title: "荟品仓推文~",
        description: "快来和我一起在荟品仓挑选商品~ 超多福利等着你哦~",
        shareImage: appUrl + "share.png",
      },
    };
  },
  computed: {},
  created () {
    let userData = this.$route.query;
    // if (!!userData.appId) {
    //   localStorage.setItem('appid', userData.appId);
    // }
    if (!!userData.fromOpenId) {
      sessionStorage.setItem("fromOpenId", userData.fromOpenId);
    }
    if (!!userData.fromUserId) {
      sessionStorage.setItem("fromUserId", userData.fromUserId);
    }
    this.id = getUrlParameter("articleId") || this.$route.query.articleId;
    // this.appid = !!this.$route.query.appId ? this.$route.query.appId : localStorage.getItem('appid');
    this.fromOpenId = !!this.$route.query.fromOpenId
      ? this.$route.query.fromOpenId
      : sessionStorage.getItem("fromOpenId");
    this.fromUserId = !!this.$route.query.fromUserId
      ? this.$route.query.fromUserId
      : sessionStorage.getItem("fromUserId");
    this.init().then(() => {

    });
  },
  methods: {
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
    async init () {
      //首先获取来源
      this.getSource();
      const res = await this.$api.article.getArticle({ id: this.id });
      if (!!res && res != null) {
        this.loading = false;
        this.authorizedHeadname = res.authorizedHeadname;
        this.authorizedLocation = res.authorizedLocation;
        this.appid = res.appId;
        this.content = res.content;
        document.title = res.title;
        this.shareConfig.title = res.mainTitle;
        this.shareConfig.description = res.subTitle;
        this.shareConfig.shareImage = res.shareUrl;
        if (
          getUrlParameter("openid") != undefined ||
          !!this.$route.query.openid
        ) {
          this.openid = getUrlParameter("openid") || this.$route.query.openid;
          this.shareConfig.linkUrl = `${appUrl}article?articleId=${this.id}&fromOpenId=${this.openid}`;
          this.loading = false;
          let UnId = getUrlParameter("unionId") || this.$route.query.unionId;
          if (UnId == "null") {
            history.pushState(
              null,
              null,
              `${appUrl}article?articleId=${this.id}&openid=${this.openid}`
            );
          }
          let OpId = getUrlParameter("openid") || this.$route.query.openid;
          if (UnId != undefined && UnId != null && UnId != "null") {
            setUnionId(UnId);
            setOpenId(OpId);
            this.isUserType().then(() => {
              this.getWechatSignature(OpId);
            });
            return
          } else {
            setOpenId(OpId);
            this.getWechatSignature(null);
            return
          }
        } else {
          let appid = localStorage.getItem("oldAppid");
          if (getOpenId() && appid != null && appid == this.appid) {
            this.openid = getOpenId();
            this.shareConfig.linkUrl = `${appUrl}article?articleId=${this.id
              }&fromOpenId=${getOpenId()}`;
            this.loading = false;
            if (getUnionId() && getUnionId() != null && getUnionId() != 'null') {
              this.isUserType().then(() => {
                this.getWechatSignature(getUnionId());
              });
            } else {
              this.getWechatSignature(null);
            }
          } else {
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
              let url = `${appUrl}article?articleId=${this.id}`;
              if (res.authorizedHeadname == 1) {
                wxAuth2(url, this.appid, false); //进行静默微信授权
              } else {
                wxAuth2(url, this.appid); //进行非静默微信授权
              }
            }
          }
        }
        localStorage.setItem("oldAppid", this.appid);
      } else {
        this.$toast("未获取到推文内容!");
      }
    },
    getWechatSignature (unionId = null) {
      var url = window.location.href;
      this.$api.userMembers
        .getWechatSignature({
          appid: this.appid,
          signatureURL: url,
        })
        .then((res) => {
          wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: this.appid, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.noncestr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名
            jsApiList: [
              "checkJsApi",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeibo",
              "getLocation",
            ], // 必填，需要使用的JS接口列表
          });

          this.show = false;
          let type = this.authorizedLocation == 0 ? true : false;
          sharePage(this.shareConfig, type)
            .then((res) => {
              if (res) {
                this.longitude = res.longitude;
                this.latitude = res.latitude;
              }
              wx.showOptionMenu();
              this.pushData(unionId);

            })
            .catch((e) => {
              this.pushData(unionId);
              wx.showOptionMenu();
            });
        })
        .catch((e) => {
          this.show = false;
          this.pushData(unionId);
        });
    },
    // 阅读信息收集
    pushData (unionId) {
      let requestData = {
        appId: this.appid,
        articleId: this.id,
        userId: this.user == null || this.user == true ? null : this.user.uid, //当前
        fromUserId: this.fromUserId, //来自
        positionLongitude: this.longitude,
        positionLatitude: this.latitude,
        fromWechatOpenId: this.fromOpenId,
        wechatOpenId: this.openid,
        phoneNumber:
          this.user == null || this.user == true ? null : this.user.mobilePhone,
        newUserFlag: this.newUserFlag,
        unionId: unionId,
      };
      this.$api.article.articleCollect(requestData);
    },
    async isUserType () {
      let unionId = getUnionId();
      let openId = getOpenId();
      let that = this;
      this.$api.userMembers
        .getMemberByUnionId({
          unionId: unionId,
          openId: openId,
        })
        .then((res) => {
          that.user = res;
          if (that.user == null || that.user == true) {
            this.newUserFlag = 0;
          } else {
            this.newUserFlag = 1;
            this.shareConfig.linkUrl = `${appUrl}article?articleId=${this.id
              }&fromOpenId=${getOpenId()}&fromUserId=${res.uid}`;
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/css/article.css";
.article {
  width: 100%;
  overflow: hidden;
  height: auto;
  padding: 40px 28px 24px;
  padding: calc(40px + constant(safe-area-inset-top))
    calc(28px + constant(safe-area-inset-right)) 24px
    calc(28px + constant(safe-area-inset-left));
  padding: calc(40px + env(safe-area-inset-top))
    calc(28px + env(safe-area-inset-right)) 24px
    calc(28px + env(safe-area-inset-left));
  // background-color: #fafafa;
  .content {
    width: 100%;
    overflow: hidden;
  }
  .loading {
    .van-loading--vertical,
    .van-loading__spinner {
      width: 100px;
      height: 100px;
      margin: 0;
    }
    .van-loading__text {
      white-space: nowrap;
      text-align: center;
    }
    .van-loading {
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
    }
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .block {
      width: 240px;
      height: 240px;
      border-radius: 8px;
      background-color: #fff;
    }
  }
}
</style>
