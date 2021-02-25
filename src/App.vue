<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
import { mapMutations } from "vuex";
import { getAppInfo, isInApp } from "@/utils/index.js";
export default {
  created () {
    const token =
      getAppInfo() != null ? (getAppInfo().sign ? getAppInfo().sign : "") : "";
    this.setToken(token);
    if (isInApp()) {
      const systemInfo = JSON.parse(window.hpcapi.systemInfo());
      let version = systemInfo.version;
      this.$store.commit("setVersion", version);
    }
  },
  mounted(){
    const script = document.createElement('script')  
    script.src = 'https://s4.cnzz.com/z_stat.php?id=1279555056&web_id=1279555056'  
    script.language = 'JavaScript'  
    document.body.appendChild(script)  
  },
  watch: {  
    '$route' () {  
      if (window._czc) {  
        let location = window.location  
        let contentUrl = location.pathname + location.hash  
        let refererUrl = '/'  
        window._czc.push(['_trackPageview', contentUrl, refererUrl])  
      }  
    }  
  },
  methods: {
    ...mapMutations({
      setToken (commit, token) {
        commit("setAppToken", token);
      },
    }),
  },
  // computed: mapState({
  //   showLoading: (state) => state.showLoading
  // })
  // computed: mapState({
  //     // 箭头函数可使代码更简练
  //     showLoading: state => state.user.showLoading,

  //     // 传字符串参数 'count' 等同于 `state => state.count`
  //    // countAlias: 'showLoading',

  //     // 为了能够使用 `this` 获取局部状态，必须使用常规函数

  //   })
};
</script>

<style lang="scss">
@font-face{
  font-family:"Regular";
  src:url('./font/DottedSongtiSquareRegular.ttf')
}
.fontRegular{
  font-family: "Regular";
}
.uploaderImg .van-uploader__preview-image {
  width: 180px !important;
  height: 180px !important;
}
.van-cell:not(:last-child)::after {
  left: 24px;
  right: 24px;
  transform: scaleY(1);
}
.van-radio__icon--checked .van-icon {
  color: #222222 !important;
}
.ys-title-text {
  font-size: 30px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 42px;
  letter-spacing: 1px;
}
.uploaderImg .van-uploader__preview {
  margin-right: 57px !important;
}
.uploaderImg .van-uploader__preview:nth-child(3) {
  margin-right: 0 !important;
}
.van-loading__circular circle {
  stroke-width: 5px;
}
.arefund .van-field__label {
  margin-right: 0;
}
.van-loading {
  width: 40px;
  height: 40px;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
}
.load_cover {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
}
.sales-wrapper .van-tab span {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #9c9ca4;
}
.sales-wrapper .van-tabs__nav .van-tab:first-child {
  flex-basis: auto !important;
  padding: 0;
}
.sales-wrapper .van-tabs__nav {
  padding-left: 24px;
  padding-right: 24px;
}
.sales-wrapper .van-tabs__content {
  overflow-y: auto;
  // position: absolute;
  // left: 0;
  // top:0;
  // right: 0;
  // bottom: 0;
}
.sales-wrapper .van-tabs__nav .van-tab:nth-child(5) {
  flex-basis: auto !important;
  padding: 0;
}
.sales-wrapper .van-tabs__nav .van-tab {
  flex-basis: 20% !important;
}
.sales-wrapper .van-tabs__nav {
  justify-content: space-between;
}
.sales-wrapper .van-tab--active span {
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #302e40;
  font-size: 32px;
}

.sales-wrapper .van-loading__spinner {
  display: block;
}
.sales-wrapper .van-pull-refresh__head {
  top: 0;
}
.sales-wrapper .van-tabs__content {
  //min-height: 94vh;
  overflow: hidden;
}
.sales-wrapper .van-pull-refresh__track {
  min-height: 90vh;
  //overflow-y:hidden;
}
.sales-wrapper .van-tab__pane {
  overflow: hidden;
}
</style>
