<template>
  <div class="goodsDetail">
    <div class="goodsDetail-title">
      <div class="title-icon"></div>
      <div class="title-text">退款信息</div>
    </div>
    <!-- <goodsMessage
      :productName="productName"
      :productSkuImage="productSkuImage"
      :specColor="specColor"
      :specSize="specSize"
    />-->
    <component
      :is="currentComponent"
      :productName="productName"
      :productSkuImage="productSkuImage"
      :specColor="specColor"
      :specSize="specSize"
      :list="list"
    ></component>
    <goodsText
      :refundReason="refundReason"
      :refundAmount="refundAmount"
      :createTime="createTime"
      :afterSaleId="afterSaleId"
    />
  </div>
</template>
<script>
// import goodsMessage from "./goodsMessage";
import goodsText from "./goodsText";
export default {
  data() {
    return {
      currentComponent: "",
    };
  },
  components: {
    goodsMessage(resolve) {
      require(["./goodsMessage"], resolve);
    },
    goodsMessageLsit(resolve) {
      require(["./goodsMessageList"], resolve);
    },
    goodsText,
  },
  props: {
    refundReason: String,
    refundAmount: String,
    createTime: String,
    afterSaleId: String,
    productName: String,
    productSkuImage: String,
    specColor: String,
    specSize: String,
    list: Array,
    type:String
  },
  mounted() {
    if (this.type=="0") {
      this.currentComponent = "goodsMessage";
    } else {
      this.currentComponent = "goodsMessageLsit";
    }
  },
};
</script>
<style lang="scss" scoped>
.goodsDetail {
  width: 100%;

  background: rgba(255, 255, 255, 1);
  border-radius: 12px 12px 0 0;
  margin-top: 16px;
  overflow: hidden;
  .goodsDetail-title {
    margin: 20px 24px;
    display: flex;
    justify-content: flex-start;
    .title-icon {
      width: 8px;
      height: 32px;
      background: rgba(255, 228, 86, 1);
    }
    .title-text {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(48, 46, 64, 1);
      margin-left: 16px;
    }
  }
}
</style>