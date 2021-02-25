<template>
  <div class="makeCourier">
    <div class="goodsMessage">
      <div class="goods-img">
        <img
          :src="
            productObj.productSkuImage == ''
              ? '../../../images/pic.png'
              : productObj.productSkuImage
          "
          alt
        />
      </div>
      <div class="goods-text">
        <div class="goods-name">{{ productObj.productName }}</div>
        <div class="goods-type">
          {{ productObj.specColor }}{{ productObj.specSize }}
        </div>
      </div>
    </div>
    <van-cell-group>
      <van-cell
        title="物流公司："
        :value="dictTypeName == '' ? '请选择物流公司' : dictTypeName"
        is-link
        center
        @click="showPicker = true"
        :value-class="dictTypeName == '' ? '' : 'value-selected'"
      />
      <van-field
        v-model="digit"
        label="物流单号："
        placeholder="请填写物流单号"
        :formatter="formatter"
        label-width="auto"
        label-class="ys-title-text"
      />
      <!-- <van-cell center>
        <template #title>
          <span class="custom-title">物流单号：</span>
          <span class="custom-text">填写物流单号</span>
        </template>
      </van-cell>-->
    </van-cell-group>
    <div class="make-bt">
      <van-button @click="saveFrom" round type="info" color="rgba(254,224,2,1)">
        <span>提交</span>
      </van-button>
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        value-key="dictTypeName"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import goodsMessage from "./components/goodsMessage";
import { getUrlParameter } from "@/utils/index.js";
import { appUrl } from "@/utils/config.js";
export default {
  data() {
    return {
      showPicker: false,
      digit: "",
      productObj: {},
      columns: [
        {
          dictTypeCode: "SF",
          dictTypeName: "顺丰速运",
        },
        {
          dictTypeCode: "HTKY",
          dictTypeName: "百世快递",
        },
        {
          dictTypeCode: "ZTO",
          dictTypeName: "中通快递",
        },
        {
          dictTypeCode: "STO",
          dictTypeName: "申通快递",
        },
        {
          dictTypeCode: "YTO",
          dictTypeName: "圆通速递",
        },
        {
          dictTypeCode: "YD",
          dictTypeName: "韵达速递",
        },
        {
          dictTypeCode: "YZPY",
          dictTypeName: "邮政快递包裹",
        },
        {
          dictTypeCode: "EMS",
          dictTypeName: "EMS",
        },
        {
          dictTypeCode: "HHTT",
          dictTypeName: "天天快递",
        },
        {
          dictTypeCode: "JD",
          dictTypeName: "京东快递",
        },
        {
          dictTypeCode: "UC",
          dictTypeName: "优速快递",
        },
        {
          dictTypeCode: "DBL",
          dictTypeName: "德邦快递",
        },
        {
          dictTypeCode: "ZJS",
          dictTypeName: "宅急送",
        },
      ],
      dictTypeName: "",
      dictTypeCode: "",
      orderProductId: "",
      afterSaleId: "",
      orderMasterId: "",
    };
  },
  created() {},
  mounted() {
    this.orderProductId = getUrlParameter("id");
    this.afterSaleId = getUrlParameter("afterSaleId");
    this.orderMasterId = getUrlParameter("orderMasterId");
    this.serviceInit();
    window.hpcapi.backAction(true);
  },
  methods: {
    formatter(value) {
      return value.replace(/\p{Unified_Ideograph}/u, "");
    },
    isSh() {
      if (this.dictTypeName == "") {
        this.$toast("请选择物流公司");
        return false;
      } else if (this.digit == "") {
        this.$toast("请填写物流单号");
        return false;
      } else {
        return true;
      }
    },
    //商品请求
    serviceInit() {
      this.$api.afterSaleDetail
        .getProductById({
          id: this.orderProductId,
        })
        .then((res) => {
          this.productObj = res;
        });
    },
    onConfirm(value) {
      this.dictTypeName = value.dictTypeName;
      this.dictTypeCode = value.dictTypeCode;
      this.showPicker = false;
    },
    serviceUrl(url, orderProductId, orderMasterId) {
      if (0) {
        window.hpcapi.openRouter(
          `${appUrl}${url}?orderProductId=${orderProductId}&orderMasterId=${orderMasterId}`
        );
        //this.$router.push(url);
      } else {
        this.$router.push({
          path: url,
          query: {
            orderProductId: orderProductId,
            orderMasterId: orderMasterId,
          },
        });
      }
    },
    saveFrom() {
      if (this.isSh()) {
        let requestData = {
          afterSaleId: this.afterSaleId,
          expressNo: this.digit,
          expressCompanyCode: this.dictTypeCode,
          expressCompanyName: this.dictTypeName,
        };
        this.$api.afterSaleDetail
          .insertExpressNo(requestData)
          .then((res) => {
            this.serviceUrl(
              "afterSaleDetail",
              this.orderProductId,
              this.orderMasterId
            );
          })
          .catch(() => {
            this.$toast("物流单提交失败");
          });
      }
    },
  },
  components: {
    goodsMessage,
  },
};
</script>
<style scoped lang="scss">
.makeCourier {
  background: rgba(245, 245, 245, 1);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  padding: 16px 24px 38px 24px;
  overflow-x: hidden;
  .goodsMessage {
    width: 100%;
    height: 234px;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    font-family: PingFangSC-Light, PingFang SC;
    .goods-img {
      margin: 24px 24px 28px 24px;
      img {
        height: 182px;
        width: 182px;
      }
    }
    .goods-text {
      margin-top: 24px;
      width: 392px;
      .goods-name {
        font-size: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-weight: 300;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
      }
      .goods-type {
        margin-top: 6px;
        font-size: 26px;
        font-weight: 300;
        color: rgba(102, 102, 102, 1);
        line-height: 37px;
        letter-spacing: 1px;
      }
    }
  }
  .van-cell-group {
    margin-top: 16px;
    border-radius: 12px;
    overflow: hidden;
    font-family: PingFangSC-Regular, PingFang SC;
    .van-cell {
      padding: 30px 24px;

      .van-field__label {
        font-size: 30px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 42px;
        letter-spacing: 1px;
      }
      .van-cell__right-icon {
        font-size: 48px;
      }
      .custom-text {
        font-size: 26px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      .custom-title,
      .van-cell__value {
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 37px;
      }
      .value-selected {
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  .make-bt {
    text-align: center;
    .van-button {
      width: 550px;
      height: 96px;
      position: fixed;
      bottom: 38px;
      left: 50%;
      transform: translateX(-50%);
      span {
        font-size: 36px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
  }
}
</style>