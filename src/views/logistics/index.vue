<template>
  <div class="logistics">
    <div class="logistics-head">
      <div class="logistics-head-left">
        <img :src="productObj.productSkuImage" alt="" />
      </div>
      <div class="logistics-head-right">
        <div class="title-top">
          <div class="title-top-left">{{ productObj.productName }}</div>
          <div class="title-top-right">
            <div class="title-top-right-money">
              ¥{{ productObj.productSkuSalePrice }}
            </div>
            <div class="title-top-right-num">
              <img src="../../images/logistics/xIcon.png" alt="" /><span>{{
                productObj.quantity
              }}</span>
            </div>
          </div>
        </div>
        <div class="title-icon" v-if="productObj.returnNoreason">
          7天无理由退货
        </div>
        <div class="title-text">条形码：{{ productObj.productSkuBarcode }}</div>
      </div>
    </div>
    <div class="logistics-kong" v-if="wuLiuObj.length == 0">
      <img src="../../images/logistics/kong-text.png" alt="" /><span
        >目前还没有相关的物流信息～</span
      >
    </div>
    <div class="logistics-list">
      <van-collapse
        v-model="activeName"
        accordion
        v-for="(item, index) in wuLiuObj"
        :key="index"
      >
        <van-collapse-item :name="index">
          <template #title>
            <div class="zhedie-top">
              <span>{{ item.logisticName }}</span>
              <span
                class="zhedie-top-code"
                @click="copy(item.mailNo)"
                @click.stop
                >{{ item.mailNo }}</span
              >
              <van-icon
                name="description"
                @click="copy(item.mailNo)"
                @click.stop
              />
            </div>
            <van-tag color="#fee000" text-color="#000000"
              >包含{{ item.productCount }}件商品</van-tag
            >
          </template>
          <van-steps direction="vertical">
            <van-step v-for="(list, index) in item.traces" :key="index">
              <h3 v-html="replaceval(list.acceptStation)"></h3>
              <p>{{ list.acceptTime }}</p>
            </van-step>
          </van-steps>
          <div class="zhanwu" v-show="item.traces.length <= 0">
            暂无物流信息
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<script>
import { copy } from "@/utils/index.js";
import { getUrlParameter } from "@/utils/index.js";
export default {
  data() {
    return {
      activeName: "",
      active: 1,
      wuLiuObj: [],
      productObj: {},
      wid: "",
    };
  },
  created() {},
  mounted() {
    this.wid = getUrlParameter("id");
    //初始化物流信息
    this.logisticsInit();
    //初始化订单商品信息
    this.productInit();
  },
  beforeCreate () {
   document.querySelector('body').setAttribute('style', 'background-color:#e5e9f1')
},
beforeDestroy() {
  document.querySelector('body').removeAttribute('style')
},
  computed: {},
  methods: {
    copy(id) {
      if (copy(id)) {
        this.$toast("复制成功");
      }
    },
    replaceval(text) {
      if (!text) {
        return false;
      }
      var reg = text.match(/\d{11}/g);
      var replaceString =
        `<a  href="tel:` + reg + `" style="color:#007AFF">${reg}</a>`;
      var val = text.replace(reg, replaceString);
      return val;
    },
    // copyPhoen(e) {
    //   if (e.target.nodeName === "SPAN") {
    //     this.copy(e.currentTarget.dataset.phone);
    //   } else {
    //     return;
    //   }
    // },
    logisticsInit() {
      this.$api.orderDetail
        .queryNewExpressCodeByOrderProductId({
          orderProductId: this.wid,
        })
        .then((res) => {
          this.wuLiuObj = res.list;
          if (this.wuLiuObj.length > 1) {
            this.activeName = "";
          } else if ((this.wuLiuObj.length = 1)) {
            this.activeName = 0;
          } else {
            this.activeName = "";
          }
          // console.log(res);
          // this.wuLiuObj
        });
    },
    productInit() {
      this.$api.afterSaleDetail
        .getProductById({
          id: this.wid,
        })
        .then((res) => {
          this.productObj = res;
        })
        .catch(() => {
          this.$toast("商品信息获取失败");
        });
    },
    copePhone(st) {},
  },
};
</script>
<style scoped lang="scss">
.copy-icon {
  width: 32px;
  height: 32px;
}
.logistics-kong {
  width: 700px;
  height: 114px;
  background: #ffffff;
  border-radius: 16px;
  font-size: 26px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 16px;
  img {
    width: 28px;
    height: 30px;
    margin-right: 5px;
  }
}
.van-collapse-item {
  width: 702px;
  //   height: 112px;
  background: #ffffff;
  border-radius: 16px;
  margin: 0 auto;
  margin-top: 16px;
  overflow: hidden;
}
.zhedie-top {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #050505;
  display: flex;
  align-items: center;
  .zhedie-top-code {
    margin: 0 6px;
  }
}
.zhedie-bottom {
  background: #fee000;
  border-radius: 4px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  height: 26px;
  overflow: hidden;
  color: #000000;
  width: 136px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  span {
    font-size: 12px;
    width: 100%;
    display: inline-block;
    transform: scale(0.8);
  }
}
.logistics {
  height: 100%;
  width: 100%;
  // position: fixed;
  margin: 0;
  padding: 0;
  padding-bottom: 20px;
  // overflow: hidden;
  // position: absolute;
  // left: 0;
  // right: 0;
  // top: 0;
  // bottom: 0;
  .logistics-head {
    display: flex;
    padding: 18px 16px;
    width: 702px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 16px;
    margin-top: 20px;
    .logistics-head-left {
      width: 184px;
      height: 184px;
      img {
        width: 184px;
        height: 184px;
      }
    }
    .logistics-head-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 18px;
      width: 100%;
      .title-top {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .title-top-left {
          letter-spacing: 0;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2; /*要显示的行数*/
          -webkit-box-orient: vertical;
          width: 354px;
          height: 88px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          color: #000000;
          line-height: 44px;
        }
        .title-top-right {
          margin-right: 22px;
          .title-top-right-money {
            font-size: 32px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #333333;
          }
          .title-top-right-num {
            text-align: right;
            span {
              font-size: 28px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #000000;
            }
            img {
              width: 14px;
              height: 16px;
            }
          }
        }
      }
      .title-icon {
        width: 192px;
        height: 40px;
        background: #fff6c0;
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 40px;
        vertical-align:middle;
        text-align: center;
      }
      .title-text {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}
</style>
<style lang="scss">
.logistics .van-cell {
  display: flex;
  align-items: center;
}
.logistics .van-step__icon--active,
.van-step__title--active {
  color: #ff0000;
}
.logistics .van-step__title--active {
  color: #222;
}
</style>
