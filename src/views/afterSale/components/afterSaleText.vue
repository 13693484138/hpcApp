<template>
  <div class="afterSaleText">
    <!-- 申请中 -->
    <div v-if="asType==0">
      <div class="afterSaleText-top">您成功发起退款申请，请耐心等待商家处理</div>
      <div class="afterSaleText-bottom">
        <van-button type="primary" plain round color="rgba(223, 223, 223, 1)" @click="undo">
          <span>撤销申请</span>
        </van-button>
      </div>
    </div>
    <!-- 退款成功 -->
    <div v-if="asType==3">
    
        <van-cell title="退款总金额" :value="refundAmount" center value-class="custom-red" />
        <van-cell :value="refundAmount" center value-class="custom-bloc">
          <template #title>
            <span class="custom-title">原路退款</span>
            <span class="custom-title-label" @click="tostText">退款未到账原因</span>
          </template>
        </van-cell>
    
    </div>
    <!-- 退款失败 -->
    <div v-if="asType==5">
      <van-cell-group>
        <van-cell>
          <template #title>
            <span class="custom-title">失败原因：</span>
            <span class="custom-title-label">{{cancelReason}}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <!-- 已取消 -->
    <div v-if="asType==4">
      <van-cell-group>
         <van-cell>
        <template #title>
          <span class="custom-title">取消原因：</span>
          <span class="custom-title-label">{{cancelReason}}</span>
        </template>
         </van-cell>
      </van-cell-group>
    </div>
    <!-- 待付款 -->
    <div v-if="asType==12">
      <div class="afterSaleText-dfk">
        <span>·</span>
        <span>荟品仓签收成功后，财务打款，系统将自动退款。</span>
      </div>
    </div>
    <!-- 请退货 -->
    <div v-if="asType==1">
      <addressDetail
        :receivePhone="receivePhone"
        :receiveName="receiveName"
        :receiveAddress="receiveAddress"
        :orderId="oid"
        :afterSaleId="id"
        :orderProductId="orderProductId"
        :tip="tip"
      />
    </div>
    <!-- 待退款 -->
    <div v-if="asType==2">
      <div class="afterSaleText-dtk">
        <span>·</span>
        <span>运营审核通过，财务审核中。</span>
      </div>
      <div class="afterSaleText-dtk"></div>
      <div class="afterSaleText-dtk">
        <span>·</span>
        <span>财务审核通过后，系统将自动退款。</span>
      </div>
    </div>
    <!-- 状态完 -->
  </div>
</template>
<script>
import { Dialog } from "vant";
import addressDetail from "./addressDetail";
import { isInApp } from "@/utils/native.js";
import { appUrl } from "@/utils/config.js";
export default {
  props: {
    asType: Number,
    id: String,
    oid: String,
    receivePhone: String,
    receiveName: String,
    receiveAddress: String,
    orderProductId: String,
    cancelReason: String,
    refundAmount: String,
    tip:String,
  },
  components: {
    addressDetail,
  },
  methods: {
    undoServe() {
      let requestData = {
        afterSaleId: this.id,
      };
      this.$api.afterSaleDetail.cancelAfterSaleById(requestData).then((res) => {
        this.serviceUrl("orderDetail", this.oid);
      }).catch(()=>{
       this.$toast("撤销申请失败")
      });
    },
    tostText() {
      this.$toast(
        "钱款已经原路退回,可能会有15个工作日的延迟,如未到账,你可以查询付款方的账单进行核查"
      );
    },
    undo() {
      Dialog.confirm({
        title: "提示",
        message: "确定撤销申请？",
      })
        .then(() => {
          this.undoServe();
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    serviceUrl(url, id) {
      if (0) {
        window.hpcapi.openRouter(`${appUrl}${url}?id=${id}`);
        //this.$router.push(url);
      } else {
        this.$router.push({
          path: url,
          query: {
            id: id,
          },
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.afterSaleText {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  border-radius: 12px;
  margin-top: 14px;
  .afterSaleText-dfk {
    padding-left: 24px;
    height: 77px;
    background: rgba(255, 255, 255, 1);
    font-size: 26px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(102, 102, 102, 1);
    line-height: 77px;
    overflow: hidden;
    span:last-child {
      margin-left: 4px;
    }
  }
  .afterSaleText-dtk {
    padding-left: 24px;
    background: rgba(255, 255, 255, 1);
    font-size: 26px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(102, 102, 102, 1);
    overflow: hidden;
    width: 648px;
    line-height: 42px;
    span:last-child {
      margin-left: 4px;
    }
  }
  .afterSaleText-dtk:last-child {
    margin-bottom: 20px;
  }
  .afterSaleText-dtk:first-child {
    margin-top: 20px;
  }
  .van-cell {
    padding-top: 40px;
    padding-bottom: 40px;
    font-size: 30px;
    .van-cell__title{
      display: flex;
      align-items: center;
    }
    .custom-title-label {
      color: rgba(153, 153, 153, 1);
      font-size: 26px;
      margin-left: 10px;
    }
    .custom-red {
      color: rgba(255, 59, 48, 1);
    }
    .custom-bloc {
      color: rgba(51, 51, 51, 1);
    }
  }
  &-top {
    //width: 100%;
    font-size: 30px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    height: 82px;
    margin: 0 24px;
    border-bottom: 1px solid #ebedf0;
    line-height: 82px;
  }
  &-bottom {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 120px;
    padding-right: 24px;
    span {
      color: rgba(48, 46, 64, 1);
    }
  }
}
</style>