<template>
  <div class="selectService">
    <goodsMessage :oid="orderProductId" />
    <div class="select-list">
      <van-cell-group>
        <van-cell
          @click="serviceUrl('arefund',5)"
          :icon="icon1"
          center
          title="我要退款（无需退货）"
          label="没收到货"
          size="large"
          is-link
        ></van-cell>
        <van-cell
          @click="serviceUrl('arefund',2)"
          :icon="icon2"
          center
          title="我要退货退款"
          label="已收到货，需要退还收到的货物"
          size="large"
          is-link
        ></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import goodsMessage from "./components/goodsMessage";
import { getUrlParameter } from "@/utils/index.js";
import { appUrl } from "@/utils/config.js";
import { isInApp } from "@/utils/native.js";
export default {
  name: "selectService",
  data() {
    return {
      icon1: require("../../images/afterSale/tuikuan.png"),
      icon2: require("../../images/afterSale/tuihuo.png"),
      orderProductId: "",
      orderMasterId:"",
      discountPrice:""
    };
  },
  created() {
    this.orderProductId = getUrlParameter("orderProductId");
    this.discountPrice=getUrlParameter("discountPrice");
    this.orderMasterId=getUrlParameter("orderMasterId");
    window.hpcapi.backAction(true);
  },
  mounted() {},
  methods: {
    serviceUrl(url, type) {
      if (0) {
        let orderProductId = this.orderProductId;
        let discountPrice=this.discountPrice;
        let orderMasterId=this.orderMasterId;
        window.hpcapi.openRouter(`${appUrl}${url}?orderProductId=${orderProductId}&type=${type}&discountPrice=${discountPrice}&orderMasterId=${orderMasterId}`);
        //this.$router.push(url);
      } else {
        this.$router.push({
          path: url,
          query: {
            orderProductId: this.orderProductId,
            type: type,
            discountPrice:this.discountPrice,
            orderMasterId:this.orderMasterId
          },
        });
      }
    },
  },
  components: {
    goodsMessage: goodsMessage,
  },
};
</script>
<style scoped lang="scss">
.selectService {
  background-color: #f5f5f5;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  padding: 16px 24px;
   overflow-x: hidden;
  .select-list {
    width: 100%;
    height: auto;
    margin-top: 16px;
    border-radius: 12px;
    overflow: hidden;
    .van-icon__image {
      width: 50px;
      height: 50px;
      margin-right: 20px;
    }
    .van-cell--large {
      padding-top: 40px;
      padding-bottom: 40px;
    }
    .van-cell__right-icon {
      font-size: 48px;
    }
  }
}
</style>