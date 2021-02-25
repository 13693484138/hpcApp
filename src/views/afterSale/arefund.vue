<template>
  <div class="arefund">
    <div class="goodsMessage" v-if="orderProductId!='1'">
      <div class="goods-img">
        <img
          :src="productObj.productSkuImage==''?'../../../images/pic.png':productObj.productSkuImage"
          alt
        />
      </div>
      <div class="goods-text">
        <div class="goods-name">{{productObj.productName}}</div>
        <div class="goods-type">{{productObj.specColor}}{{productObj.specSize}}</div>
      </div>
    </div>
    <!-- <goodsMessage v-if="orderProductId" :oid="orderProductId" /> 模态框会有问题不能使用-->
    <div class="select-list">
      <van-cell
        v-if="orderProductId!='1'"
        @click="showPop(0)"
        :icon="icon1"
        center
        title="货物状态"
        size="large"
        is-link
        :value="cargoType==''?'请选择':cargoType"
        :value-class="cargoType==''?'':'value-selected'"
      ></van-cell>
      <van-cell
        @click="showPop(1)"
        :icon="icon2"
        center
        title="退款原因"
        size="large"
        :value="causeType==''?'请选择':causeType"
        :value-class="causeType==''?'':'value-selected'"
        is-link
      ></van-cell>

      <div class="select-list-text">
        <div class="text-money">
          <span>退款金额：</span>
          <span>¥{{discountPrice}}</span>
        </div>
        <div class="text-title">不可修改，最多 ¥{{discountPrice}}，含发货邮费 ¥0.00</div>
        <div class="text-remark">
          <van-field v-model="remark" label="退款说明：" placeholder="必填" label-width="auto" />
          <!-- <span>退款说明：</span>
          <span>必填</span>-->
        </div>
      </div>
    </div>
    <uploaderImg ref="uploader" />
    <div class="make-bt">
      <van-button round type="info" color="rgba(254,224,2,1)" @click="saveAsOrder">
        <span>提交</span>
      </van-button>
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import goodsMessage from "./components/goodsMessage";
import uploaderImg from "./components/uploaderImg";
import { getUrlParameter } from "@/utils/index.js";
import { isInApp } from "@/utils/native.js";
export default {
  name: "arefund",
  data() {
    return {
      orderProductId: "", //传入商品ID
      orderMasterId: "", //订单ID
      cargoType: "", //货物状态：收到货与没收到货
      causeType: "", //原因类
      causeList: [],
      orderStatus: 40,
      productObj: {},
      nowTime: "",
      cellType: "", //选择的单元格
      type: "", //此类型为退货类型;2 是退货退款;5 是仅退款
      showPicker: false, //POP
      columns: ["已收到货", "未收到货"],
      remark: "", //退款说明
      discountPrice: "", //价格
    };
  },
  components: {
    goodsMessage: goodsMessage,
    uploaderImg: uploaderImg,
  },
  created() {
    // this.orderProductId = "1282963362807222274";
    // this.orderMasterId = "1282963362735919105";
    // this.type = "2";
    // this.discountPrice = "17";
  },
  mounted() {
    this.nowTime = new Date().getTime(); //获取当前时间戳
    this.orderProductId = getUrlParameter("orderProductId");
    this.orderMasterId = getUrlParameter("orderMasterId");
    this.type = getUrlParameter("type");
    this.discountPrice = getUrlParameter("discountPrice");
    if (this.orderProductId == "1") {
      this.orderProductId = 1;
      this.orderStatus = 20;
      this.type = "0";
      this.cargoType = "0";
    } else {
      this.orderStatus = 40;
      this.serviceInit();
    }
    this.causeInit();
    window.hpcapi.backAction(true);
  },
  methods: {
    //商品请求
    serviceInit() {
      this.$api.afterSaleDetail
        .getProductById({
          id: this.orderProductId,
        })
        .then((res) => {
          this.productObj = res;
        })
        .catch(() => {
          this.$toast("商品信息获取失败");
        });
    },
    //校验表单
    validateSingle() {
      if (this.cargoType == "") {
        this.$toast("请选择货物状态");
        return false;
      } else if (this.causeType == "") {
        this.$toast("请选择退款原因");
        return false;
      } else if (this.remark == "") {
        this.$toast("请填写退款说明");
        return false;
      } else {
        return true;
      }
    },
    showPop(type) {
      this.cellType = type;
      this.showPicker = true;
      if (type) {
        this.columns = this.causeList;
      } else {
        this.columns = ["已收到货", "未收到货"];
      }
    },
    causeInit() {
      this.$api.afterSaleDetail
        .getAfterSaleReason({
          orderStatus: this.orderStatus,
          afterType: this.type,
        })
        .then((res) => {
          this.causeList = res;
        });
    },
    onConfirm(value) {
      if (!this.cellType) {
        this.cargoType = value;
      } else {
        this.causeType = value;
      }
      this.showPicker = false;
    },
    //As为售后:创建售后单
    saveAsOrder() {
      if (this.validateSingle()) {
        let type = this.cargoType == "已收到货" ? "1" : "0";
        this.$api.afterSaleDetail
          .appCreate({
            afterType: this.type,
            refundQuantity: 1,
            refundAmount: this.discountPrice,
            refundReason: this.causeType,
            remark: this.remark,
            orderMasterId: this.orderMasterId,
            orderProductId: this.orderProductId,
            evidenceImage: this.$refs.uploader.imgList.join(","),
            isAccecpt: type,
          })
          .then((res) => {
            window.hpcapi.webReload();
            this.serviceUrl(
              "afterSaleDetail",
              this.orderMasterId,
              this.orderProductId
            );
          })
      }
      return;
    },
    serviceUrl(url, oid, pid) {
      if (0) {
        window.hpcapi.openRouter(
          `${appUrl}${url}?orderMasterId=${oid}&orderProductId=${pid}`
        );
        //this.$router.push(url);
      } else {
        this.$router.push({
          path: url,
          query: {
            orderMasterId: oid,
            orderProductId: pid,
          },
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.value-selected {
  color: rgba(51, 51, 51, 1);
}
.arefund {
  background-color: #f5f5f5;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  padding: 16px 24px;
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
  .select-list {
    width: 100%;
    height: auto;
    margin-top: 16px;
    border-radius: 12px;
    overflow: hidden;
    background-color: #ffffff;
    .van-cell__right-icon {
      font-size: 48px;
    }
    .van-cell--large {
      padding-top: 40px;
      padding-bottom: 40px;
    }
    .van-cell--large .van-cell__title {
      font-size: 30px;
    }
    &-text {
      margin-left: 30px;
      .text-money {
        span:first-child {
          font-size: 30px;
          color: #333333;
        }
        span:last-child {
          font-size: 30px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ff3b30;
        }
      }
      .text-title {
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-top: 20px;
      }
      .text-remark {
        margin-top: 20px;
        vertical-align: middle;
        display: flex;
        align-items: flex-start;
        margin-bottom: 40px;
        font-size: 30px;
        .van-cell {
          padding-left: 0;
          padding-top: 0;
          padding-bottom: 0;
          font-size: 30px;
          color: #333333;
        }
        // span:first-child {

        //
        // }
        // span:last-child {
        //   font-size: 26px;
        //   font-family: PingFangSC-Regular, PingFang SC;
        //   font-weight: 400;
        //   color: #999999;
        // }
      }
    }
  }
  .make-bt {
    text-align: center;
    .van-button {
      width: 550px;
      height: 96px;
      margin: 0 auto;
      margin-top: 30px;
      span {
        font-size: 36px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
  }
}
</style>