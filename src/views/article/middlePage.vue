<template>
  <div class="middle-page">
    <van-skeleton :row="30"
                  :loading="loading">
    </van-skeleton>
    <div class="content"
         v-html="content"></div>
  </div>
</template>

<script>
var wx = require("weixin-js-sdk");
import { getUrlParameter } from "@/utils/index.js";
import { appUrl } from "@/utils/config.js";
import '@/utils/helper.js';
import {
  sharePage,
  detectVersion,
  wxAuth2,
} from "@/utils/native.js";
import {
  setUnionId,
  getUnionId,
  setOpenId,
  getOpenId,
} from "@/utils/auth";
export default {
  data () {
    return {
      authorizedHeadname: 0, //授权
      authorizedLocation: 1, //地理位置(中间页未用到)
      userid: '',
      id: '',
      appid: '',
      loading: true,
      content: '',
      longitude: null, //经度
      latitude: null, //纬度
    };
  },
  computed: {

  },
  created () {
    this.userid = getUrlParameter('userid') || this.$route.query.userid;
    this.init();
  },
  mounted () {

  },
  watch: {

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
    //初始化
    init () {
      //首先获取来源
      this.getSource();
      this.$api.article.queryTransPage({ uid: this.userid }).then(res => {
        if (!!res && res != null) {
          this.content = res.content;
          this.appid = res.publicAccountId;
          this.authorizedHeadname = res.authorizedHeadname;
          this.authorizedLocation = res.authorizedLocation;
          document.title = res.title;
          if (getUrlParameter("openid") != undefined) {
            this.loading = false;
            if (getUrlParameter("unionId") != undefined && getUrlParameter("unionId") != null) {
              setUnionId(getUrlParameter("unionId"));
              setOpenId(getUrlParameter("openid"));
              this.getWechatSignature(getUrlParameter("openid"), res.publicAccountId, getUrlParameter("unionId"));
            } else {
              setOpenId(getUrlParameter("openid"));
              this.getWechatSignature(getUrlParameter("openid"), res.publicAccountId, null);
            }
          } else {
            let appid = localStorage.getItem('publicAccountId');
            if ((getOpenId() && appid != null && appid == res.publicAccountId)) {
              this.loading = false;
              if (getUnionId() && getUnionId() != null) {
                this.getWechatSignature(getOpenId(), res.publicAccountId, getUnionId());
              } else {
                this.getWechatSignature(getOpenId(), res.publicAccountId, null);
              }
            } else {
              let ua = window.navigator.userAgent.toLowerCase();
              if (ua.match(/MicroMessenger/i) == "micromessenger") {
                if (this.authorizedHeadname == 1) {
                  wxAuth2(`${appUrl}middlePage?userid=${this.userid}`, res.publicAccountId, false); //进行微信授权
                } else {
                  wxAuth2(`${appUrl}middlePage?userid=${this.userid}`, res.publicAccountId); //进行微信授权
                }
              }
            }
          }
          localStorage.setItem('publicAccountId', res.publicAccountId);
        } else {
          this.$toast('未获取到页面内容!')
        }
      })
    },
    getWechatSignature (id, appid, unionId) {
      var url = window.location.href;
      this.$api.userMembers.getWechatSignature({
        appid: this.appid,
        signatureURL: url,
      }).then((res) => {
        wx.config({
          // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: this.appid, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.noncestr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: [
            "checkJsApi",
            'getLocation'
          ], // 必填，需要使用的JS接口列表
        });
        let type = this.authorizedLocation == 0 ? true : false;
        let that = this;
        wx.ready(function () {
          if (type) {
            wx.checkJsApi({
              jsApiList: ['getLocation'],
              success: function (res) {
                if (res.checkResult.getLocation == false) {
                  console.log('版本太低,无法获取');
                  return
                }
              },
            })
            wx.getLocation({
              type: 'gcj02',
              success: function (res) {
                if (res) {
                  that.longitude = res.longitude;
                  that.latitude = res.latitude;
                }
                that.pushData(id, appid, unionId)
              },
              cancel: function (res) {
                that.pushData(id, appid, unionId)
              },
            })
          } else {
            that.pushData(id, appid, unionId)
          }
        })
      }).catch(e => {
        this.pushData(id, appid, unionId)
      })
    },
    pushData (id, appid, unionId) {
      let requesrData = {
        promoterId: this.userid,
        wechatOpenId: id,
        appId: appid,
        unionId: unionId,
        createTime: new Date().$Format('yyyy-MM-dd hh:mm:ss'),
        positionLongitude: this.longitude,
        positionLatitud: this.latitude,
      }
      this.$api.article.linkUser(requesrData)
    }
  },
  components: {

  },
};
</script>

<style scoped lang="scss">
@import "../../assets/css/article.css";
.middle-page {
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
}
</style>
