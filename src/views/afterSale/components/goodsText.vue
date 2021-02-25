<template>
  <div class="goodsText">
    <ul>
      <li>退款原因：{{refundReason}}</li>
      <li>退款金额：¥{{refundAmount}}</li>
      <li>申请时间：{{createTime|formatDate}}</li>
      <li>售后编号：{{afterSaleId}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    refundReason: String,
    refundAmount: String,
    createTime: String,
    afterSaleId: String,
  },
  filters: {
    formatDate(time) {
      if (time) {
        return time.replace(/-/g, ".");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.goodsText {
  margin: 0 24px;
  border-bottom: 1px solid #ebedf0;
  border-top: 1px solid #ebedf0;
  ul {
    margin: 20px 0 30px 0;
    li {
      font-size: 26px;
      font-family: PingFangSC-Light, PingFang SC;
      font-weight: 300;
      color: rgba(102, 102, 102, 1);
      line-height: 37px;
      margin-top: 10px;
    }
  }
}
</style>