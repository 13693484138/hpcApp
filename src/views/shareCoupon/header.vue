<template>
  <div class="header">
    <div class="left">
      <img :src="logo">
      <strong class="title">荟品仓</strong>
      <p>品牌特卖，荟选好物</p>
    </div>
    <div class="right" @click="download">
      <span>下载APP</span>
    </div>
  </div>
</template>

<script>
import { pageUrl} from "@/utils/config.js";
export default {
  name: 'Header',
  data () {
    return {
      logo: require('@/images/shareCoupon/logo.png'),
    };
  },
  created () {

  },
  mounted () {

  },
  watch: {

  },
  methods: {
    download(){
      window.location.href = pageUrl.downloadPage;
    }
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  width: 100%;
  height: 96px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  box-shadow:0px 12px 24px 0px rgba(122,122,132,0.16);
  .left {
    display: flex;
    height: 64px;
    flex: 1;
    font-size: initial;
    img {
      width: 64px;
      display: block;
    }
    strong {
      position: relative;
      margin: 17px 17px 0 17px;
      font-size: 32px;
      letter-spacing: 1px;
      height: 32px;
    }
    .title::after {
      position: absolute;
      right: -10px;
      top: 50%;
      content: " ";
      transform: translateY(-50%);
      width: 1px;
      height: 24px;
      background: #DEDEE0;
    }
    p {
      margin-top: 17px;
      font-size: 32px;
      color: rgba(122, 122, 132, 1);
      letter-spacing: 1px;
    }
  }
  .right {
    width: 158px;
    height: 56px;
    background: rgba(255, 224, 2, 1);
    border-radius: 28px;
    font-size: initial;
    line-height: 56px;
    text-align: center;
    span {
      font-size: 24px;
      font-weight: 500;
      letter-spacing: 1px;
    }
  }
}
</style>
