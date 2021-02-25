<template>
  <div class="reach-home-index">
    <div class="address">
      <img v-if="addressIsShow==true"
           class="logo"
           :src="imgs.logoImg"
           @click.stop="selectAddress">
      <h2 class="head flex between">收货地址<div class="flex between"
             @click.stop="selectAddress"><span>更换地址</span><img :src="imgs.bianjiImg"></div>
      </h2>
      <div class="address-crad"
           v-if="addressIsShow==true"
           @click.stop="selectAddress">
        <h2>{{addressInfo.receiverName}} {{addressInfo.receiverPhone}}</h2>
        <div class="address-text flex "><img :src="imgs.zjImg"><span class="text-warp">{{addressInfo.provinceName}} {{addressInfo.cityName}} {{addressInfo.countyName}} {{addressInfo.receiverAddress}}</span></div>
      </div>
      <div v-if="addressIsShow==false"
           @click.stop="selectAddress"
           class="address2 flex center">
        <img :src="imgs.dizhiImg" />
        <span>新增地址</span>
      </div>
    </div>
    <div class="id">
      <img v-if="idIsShow==true"
           class="logo"
           :src="imgs.logoImg"
           @click.stop="toIdList">
      <h2 class="head  flex between">为谁搭配<div class="flex between"
             @click.stop="toIdList"><span>更换身份卡</span><img :src="imgs.bianjiImg"></div>
      </h2>
      <div class="id-card"
           @click.stop="toIdList"
           v-if="idIsShow==true">
        <div class="header flex">
          <img :src="getImg(idInfo.role)">{{idInfo.role}}
        </div>
        <div class="body">
          <div class="info-list flex">
            <div class="info-item">
              <span>身高</span>
              <strong>{{idInfo.height}}</strong>
            </div>
            <div class="info-item">
              <span>体重</span>
              <strong>{{idInfo.weight}}</strong>
            </div>
            <div class="info-item">
              <span>鞋码</span>
              <strong>{{idInfo.shoeSize}}</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="id-card2 flex center"
           @click.stop="toIdList"
           v-if="idIsShow==false">
        <img :src="imgs.shenfenkaImg" />
        <span>新增身份卡</span>
      </div>
    </div>
    <div class="next-action flex center"
         @click="nextAction">
      <span>
        提交
      </span>
    </div>
  </div>
</template>

<script>
import { getUrlParameter, isInApp, getAppInfo } from '@/utils/index.js'
import { appUrl } from '@/utils/config.js'
export default {
  name: 'reachHomeIndex',
  data () {
    return {
      addressIsShow: false,
      idIsShow: false,
      isApp: isInApp(),
      loginType: getAppInfo() != null ? (getAppInfo().sign ? true : false) : false,
      userID: getAppInfo() != null ? (getAppInfo().userID ? getAppInfo().userID : '') : '',
      addressId: 0,
      imgs: {
        zjImg: require('@/images/reachHome/zj.png'),
        logoImg: require('@/images/reachHome/logo.png'),
        shenfenkaImg: require('@/images/reachHome/shenfenka.png'),
        dizhiImg: require('@/images/reachHome/dizhi.png'),
        bianjiImg: require('@/images/reachHome/bianji.png'),
      },
      idList: [
        {
          text: '自己',
          img: require('@/images/reachHome/zj.png'),
        },
        {
          text: '子女',
          img: require('@/images/reachHome/zinv.png'),
        },
        {
          text: '配偶',
          img: require('@/images/reachHome/peiou.png'),
        },
        {
          text: '父母',
          img: require('@/images/reachHome/fumu.png'),
        },
      ],
      addressInfo: {},
      idInfo: {}
    };
  },
  computed: {

  },
  created () {
    window.addressIdInfo = (id) => {
      this.navigationLogin();
      this.addressId = id;
      this.getArrdessInfo()
    }
    this.initData()

  },
  mounted () {
  },
  watch: {

  },
  methods: {
    getImg (val) {
      let data = this.idList.filter(item => item.text == val);
      if (!!data) {
        return data[0].img
      }
      return require('@/images/reachHome/zj.png')
    },
    navigationLogin () {
      if (!this.loginType && this.isApp) {
        //跳转原生登录方法
        window.hpcapi.openLogin()
      }
    },
    initData () {
      this.getArrdessInfo()
      this.getDefaultData()
    },
    selectAddress () {
      window.hpcapi.openRouter('hpcang://addressList?id=' + this.addressId);
    },
    getArrdessInfo () {
      this.$api.reachHome.getAddressInfo({ id: this.addressId == 0 ? '' : this.addressId, hp_udid: this.userID })
        .then(res => {
          if (res == null) {
            this.addressIsShow = false;
          } else {
            this.addressIsShow = true;
            this.addressInfo = res;
          }
        })
    },
    getDefaultData () {
      this.$api.reachHome.getDefaultIdentityCard({})
        .then(res => {
          // 获取默认信息
          console.log(res)
          if (JSON.stringify(res) == '{}') {
            this.idIsShow = false;
          } else {
            this.idIsShow = true;
            this.idInfo = res;
          }
        })
    },
    toIdList () {
      this.$router.push({ path: '/idList' });
    },
    nextAction () {
      if (this.addressInfo.id == undefined) {
        this.$toast('你还没有选择地址!');
        return
      }
      if (this.idInfo.id == undefined) {
        this.$toast('你还没有创建身份卡!');
        return
      }
      this.$api.reachHome.createWishOrder({
        identityId: this.idInfo.id,
        address: JSON.stringify(this.addressInfo)
      })
        .then(() => {
          //跳转进度页面
          if (this.isApp) {
            window.hpcapi.openRouter(`${appUrl}progress`)
          } else {
            this.$router.push({ path: '/progress' })
          }
        })
    }
  },
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}
.center {
  justify-content: center;
  align-items: center;
}
.between {
  justify-content: space-between;
  align-items: center;
}
.align-items {
  align-items: center;
}
.text-warp {
  overflow: hidden; /*内容超出后隐藏*/
  text-overflow: ellipsis; /* 超出内容显示为省略号*/
  white-space: nowrap; /*文本不进行换行*/
}
.reach-home-index {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  img {
    display: block;
    width: 100%;
  }
  height: 100%;
  background: #f5f5f5;
  padding: 0 32px;
  padding-top: 40px;
  .head {
    position: relative;
    padding-left: 20px;
    height: 48px;
    font-size: 34px;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 50px;
    div {
      font-size: initial;
      span {
        font-size: 20px;
        color: rgba(51, 51, 51, 1);
        font-weight: 400;
        margin-right: 12px;
      }
      img {
        width: 10px;
        height: 18px;
      }
    }
  }
  .head::before {
    position: absolute;
    width: 8px;
    height: 24px;
    content: " ";
    pointer-events: none;
    left: 0;
    top: 50%;
    background: #ffe631;
    transform: translateY(-50%);
  }
  .logo {
    position: absolute;
    right: 20px;
    bottom: 0;
    width: 183px;
    height: 176px;
  }
  .address {
    margin-bottom: 114px;
    position: relative;
    .address-crad {
      width: 686px;
      height: 183px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius: 16px;
      padding-left: 40px;
      padding-top: 40px;
      h2 {
        height: 44px;
        font-size: 32px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 14px;
      }
      .address-text {
        width: 520px;
        height: 46px;
        font-size: initial;
        color: rgba(153, 153, 153, 1);
        img {
          height: 46px;
          width: 46px;
          margin-right: 12px;
        }
        span {
          font-size: 26px;
          height: 46px;
          padding-top: 10px;
          box-sizing: border-box;
        }
      }
    }
  }
  .address2,
  .id-card2 {
    margin-bottom: 83px;
    width: 686px;
    height: 100px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    font-size: initial;
    img {
      width: 24px;
      height: 33px;
      margin-right: 20px;
    }
    span {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
  }
  .id-card2 {
    img {
      width: 38px;
      height: 28px;
    }
  }
  .id {
    position: relative;
    .head {
      margin-bottom: 40px;
    }
    .id-card {
      width: 686px;
      height: 255px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
      border-radius: 16px;
      padding-top: 35px;
      .header {
        height: 70px;
        font-size: 32px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 70px;
        margin-bottom: 35px;
        padding-left: 60px;
        img {
          width: 70px;
          height: 70px;
          margin-right: 15px;
        }
      }
      .body {
        .info-list {
          .info-item {
            flex: 1;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            span {
              display: block;
              height: 28px;
              font-size: 20px;
              color: rgba(153, 153, 153, 1);
              line-height: 28px;
              margin-bottom: 10px;
            }
            strong {
              height: 42px;
              font-size: 30px;
              color: rgba(51, 51, 51, 1);
              line-height: 42px;
            }
          }
        }
      }
    }
  }
  .next-action {
    width: 702px;
    height: 122px;
    background: #ffde04;
    border-radius: 54px;
    position: absolute;
    bottom: 69px;
    font-size: initial;
    left: 24px;
    span {
      font-size: 36px;
      font-weight: bold;
    }
  }
}
</style>
