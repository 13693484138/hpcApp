<template>
  <div class="callService">
    <van-button
      round
      type="info"
      class="rload-button"
      plain
      v-if="isButton"
      color="rgba(178,178,178,1)"
      @click="againTo"
    >
      <span>重新申请</span>
    </van-button>
    <van-button round type="info" color="rgba(255, 228, 86, 1)" @click="call">
      <span>联系客服</span>
    </van-button>
  </div>
</template>
<script>
import { isInApp } from "@/utils/native.js";
export default {
  props: {
    isButton: Boolean,
    orderProductId: String,
    orderMasterId: String,
    discountPrice: String,
    productSkuImage: String,
    statusName: String,
    afterStatus: String,
    type: String, //1是整单，0是商品单
    orderStatusCN:String
  },
  methods: {
    call() {
      if (this.$store.state.user.version >= "1.6.5") {
        window.hpcapi.openCustomerService(
          JSON.stringify({
            id: "订单号：" + this.orderMasterId,
            productSkuImage: this.productSkuImage,
            payAmount: "¥" + this.discountPrice,
            statusCN: this.orderStatusCN,
            linkUrl: "/orderDetail?id=" + this.orderMasterId,
            type: "1",
          })
        );
      } else {
        window.hpcapi.openCustomerService();
      }
    },
    againTo() {
      if (this.type == "1") {
        this.applyAsOreder("1", this.discountPrice, this.orderMasterId);
      } else {
        this.applyAs(
          this.orderProductId,
          this.discountPrice,
          this.orderMasterId
        );
      }
    },
    //跳转售后类型
    applyAs(pid, discountPrice, oid) {
      
      if (this.afterStatus == "25") {
        if (0) {
          window.hpcapi.openRouter(
            `${appUrl}arefund?orderProductId=${pid}&discountPrice=${discountPrice}&orderMasterId=${oid}&type=5`
          );
          //this.$router.push(url);
        } else {
          this.$router.push({
            path: "arefund",
            query: {
              orderProductId: pid,
              discountPrice: discountPrice,
              orderMasterId: oid,
              type: 5,
            },
          });
        }
      } else {
        if (0) {
          window.hpcapi.openRouter(
            `${appUrl}selectService?orderProductId=${pid}&discountPrice=${discountPrice}&orderMasterId=${oid}`
          );
          //this.$router.push(url);
        } else {
          this.$router.push({
            path: "selectService",
            query: {
              orderProductId: pid,
              discountPrice: discountPrice,
              orderMasterId: oid,
            },
          });
        }
      }
    },
    applyAsOreder(pid, discountPrice, oid) {
      if (0) {
        window.hpcapi.openRouter(
          `${appUrl}arefund?orderProductId=${pid}&discountPrice=${discountPrice}&orderMasterId=${oid}`
        );
        //this.$router.push(url);
      } else {
        this.$router.push({
          path: "arefund",
          query: {
            orderProductId: pid,
            discountPrice: discountPrice,
            orderMasterId: oid,
          },
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.callService {
  height: 140px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 24px;
  border-radius: 0 0 12px 12px;
  .van-button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rload-button {
    margin-right: 10px;
  }
  span {
    display: inline-block;
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(48, 46, 64, 1);
  }
}
</style>