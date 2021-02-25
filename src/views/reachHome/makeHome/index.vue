<template>
  <div class="makeHome">
    <img :src="bgImg">
    <div class="bottom"></div>
    <div class="baoming btn"
         @click="btnClick">
      <img class="baoming-bg"
           :src="baomingBg">
      <div class="loading flex center"
           v-if="status==1"><img :src="loadingImg"><span>加载中</span></div>
      <span v-if="status==2">立即报名</span>
      <span v-if="status==3">查看进度</span>
      <span v-if="status==4">刷新重试</span>
    </div>
  </div>
</template>

<script>
import { isInApp, getAppInfo } from '@/utils/index.js'
import { appUrl } from '@/utils/config.js'
export default {
  name: 'makeHome',
  data () {
    return {
      isApp: isInApp(),
      loginType: getAppInfo() != null ? (getAppInfo().sign ? true : false) : false,
      status: 1,
      bgImg: require('@/images/reachHome/make-home-bg.png'),
      loadingImg: require('@/images/reachHome/loading.png'),
      baomingBg: require('@/images/reachHome/baoming.png'),
    };
  },
  created () {
    if (!this.loginType) {
      this.navigationLogin();
    }
    this.init();
  },
  methods: {
    init () {
      this.status = 1;
      this.$api.reachHome.getWishOrderStatus({}).then(res => {
        if (res.status == 0) {
          this.status = 2;
        } else {
          this.status = 3;
        }
      }, err => {
        this.status = 4;
      })
    },
    navigationLogin () {
      if (!this.loginType && this.isApp) {
        //跳转原生登录方法
        window.hpcapi.openLogin()
      } else {
        this.$toast('请前往APP打开!')
      }
    },
    btnClick () {
      if (this.status == 2) {
        window.hpcapi.openRouter(`${appUrl}reachHomeIndex`)
      } else if (this.status == 3) {
        window.hpcapi.openRouter(`${appUrl}progress`)
      } else if (this.status == 4) {
        this.init();
      }
    },
  }
};
</script>

<style scoped lang="scss">
.makeHome {
  position: relative;
  height: 100vh;
  overflow-y: auto;
  img {
    width: 100%;
    display: block;
  }
  .flex {
    display: flex;
  }
  .center {
    justify-content: center;
    align-items: center;
  }
  @keyframes rotate2 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .bgImg {
    width: 750px;
    height: auto;
  }
  .bottom {
    width: 750px;
    height: 215px;
    background: #ffe631;
  }
  .btn {
    width: 594px;
    height: 111px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 135px;
  }
  .baoming {
    padding-top: 38px;
    text-align: center;
    font-size: initial;
    transition: all 0.5s;
    .baoming-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .loading {
      font-size: initial;
      min-width: 160px;
      img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        display: inline-block;
        animation: rotate2 2.2s linear infinite;
      }
    }
    span {
      margin-top: 4px;
      font-size: 32px;
      font-weight: 600;
      color: rgba(255, 230, 49, 1);
      letter-spacing: 4px;
      display: inline-block;
    }
  }
  .baoming:active {
    transform: translateX(-50%) scale(1.05);
  }
}
.makeHome::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>
