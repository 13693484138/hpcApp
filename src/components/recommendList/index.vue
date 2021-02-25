<template>
  <div class="recommend-list-container"
       v-if="isShow==true">
    <div class="recommend-head">
      <img class="recommend-decrate"
           lazy-load
           :src="xianImg" />
      <h2 class="recommend-title">{{recommendData.activeName}}</h2>
      <img class="recommend-decrate"
           lazy-load
           :src="xianImg" />
    </div>
    <div class="recommend-commditys">
      <div class="recommend-commdity-item white-bg"
           v-for="(item,index) in recommendData.activeSpuResps"
           :key="index"
           @click="commidityDetail(item.productSpuId)">
        <van-image class="recommend-commidity-image"
                   lazy-load
                   :src="item.mainPic" />
        <van-image class="recommend-commidity-sq"
                    v-if="item.stockNum==0"
                   :src="stockImg" />
        <div class="recommend-commidity-desc two-line">{{item.productName}}</div>
        <div class="recommend-commidity-price-container">
          <div class="recommend-origin-money flex"><span>¥</span>{{item.salePrice}} <span class="recommend-sale-money">¥{{item.originalPrice}}</span> </div>
          <div class="member-price  flex center"
               v-if="item.memberPrice == undefined ? false :true"><span>¥{{item.memberPrice}}</span><img class='recommend-cart-icon'
                 :src='memberIconImg' /> </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isInApp } from '@/utils/index.js'
import { appUrl } from '@/utils/config.js'
export default {
  name: 'recommendList',
  props: {},
  data () {
    return {
      isShow: false,
      stockImg:require("@/images/productDetail/sj.png"),
      memberIconImg: require('@/images/productDetail/member-icon.png'),
      xianImg: require('@/images/productDetail/xian.png'),
      isApp: isInApp(),
      recommendData: {
        activeSpuResps: [],
        activeName: ""
      }
    }
  },
  computed: {},
  created () {
    this._getRecommendRequest()
  },
  mounted () {

  },
  destroyed () {
  },
  watch: {},
  methods: {
    commidityDetail (id) {
      if (this.isApp) {
        window.hpcapi.openRouter(`${appUrl}productDetail?id=${id}`)
      } else {
        window.location.href = `${appUrl}productDetail?id=${id}`;
      }
    },
    _getRecommendRequest () {
      let request = {
        activeType: 400
      }
      this.$api.activity.getRecommendList(request)
        .then(res => {
          if (res == null) {
            this.isShow = false;
            return
          }
          if (res[0].activeSpuResps == null) {
            this.isShow = false;
            return
          }
          this.isShow = true;
          console.log('成功拉货架精选------', res)
          this.recommendData.activeName = res[0].activeName;
          this.recommendData.activeSpuResps = res[0].activeSpuResps;
          console.log('this.activeName----', this.activeName)
          console.log('this.activeSpuResps----', this.recommendData.activeSpuResps)
          // this.orderData = res
        })
        .catch(error => {
          console.log('失败拉------', error)
        })
    }
  }// method
}

</script>

<style scoped lang="scss">
.white-bg {
  background: #ffffff;
}
.two-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.flex {
  display: flex;
}
.center {
  align-items: center;
}
.bottom {
  align-items: flex-end;
}
.recommend-list-container {
  width: 10rem;
  padding: 0 0.35rem 0 0.32rem;
  .recommend-head {
    height: 82px;
    font-size: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    .recommend-decrate {
      width: 44px;
      height: 6px;
    }
    .recommend-title {
      color: #333;
      margin: 0 16px;
    }
  }

  .recommend-commditys {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .recommend-commdity-item {
      position: relative;
      width: 342px;
      height: 542px;
      border-radius: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      margin-bottom: 18px;
      overflow: hidden;
      .recommend-commidity-image {
        width: 342px;
        height: 342px;
        margin-bottom: 12px;
      }
      .recommend-commidity-sq{
        position:absolute;
        left: 50%;
        width: 109px;
        height: 109px;
        top: 171px;
        transform: translate(-50%,-50%);
      }

      .recommend-commidity-desc {
        padding: 0 20px;
        height: 74px;
        font-size: 26px;
        color: rgba(51, 51, 51, 1);
        line-height: 38px;
        overflow: hidden;
      }

      .recommend-commidity-price-container {
        padding: 0 20px;
        .recommend-origin-money {
          margin-top: 20px;
          height: 30px;
          font-size: 30px;
          font-weight: 600;
          color: rgba(255, 59, 48, 1);
          line-height: 30px;
          align-items: baseline;
          span {
            font-size: 24px;
            height: 24px;
          }
          .recommend-sale-money {
            display: inline-block;
            text-decoration: line-through;
            height: 24px;
            margin-left: 9px;
            font-size: 24px;
            font-weight: 400;
            color: rgba(154, 154, 154, 1);
          }
        }
        .member-price {
          margin-top: 6px;
          height: 32px;
          span {
            margin-top: 4px;
            font-size: 24px;
            font-weight: 600;
            color: rgba(43, 37, 45, 1);
          }
          .recommend-cart-icon {
            margin-left: 6px;
            width: 60px;
            height: 24px;
          }
        }
      }
    }
  }
}
</style>
