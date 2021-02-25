<template>
  <div class="addressDetail">
    <div class="addressDetail-title">商家已同意退货申请，请尽早退货。</div>
    <div class="addressDetail-warp">
      <div class="addressDetail-warp-icon">
        <img src="../../../images/afterSale/dizhi.png" alt />
      </div>
      <div class="addressDetail-warp-list">
        <ul>
          <li class="mt0">售后地址</li>
          <li>
            <span>收货人：{{ receiveName }}</span>
            <span class="text-phone">{{ receivePhone }}</span>
          </li>
          <li class="text">
            <span class="text-dz">{{ receiveAddress }}</span>
            <span class="text-copy" @click="copy(receiveAddress)">复制</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="l-tip" v-if="tip!=''">
      <div class="l-tip-content">
        备注：{{tip}}
      </div>
    </div>
    <div class="addressDetail-bottom">
      <ul>
        <li class="mt0">
          <span>·</span>
          <span class="bottom-text"
            >未与商家协商一致，请勿使用到付或平邮，以免商家拒签货物。</span
          >
        </li>
        <li>
          <span>·</span>
          <span class="bottom-text"
            >请填写真实退货物流信息，逾期未填写，退货申请将关闭</span
          >
        </li>
      </ul>
      <div class="bottom-bt">
        <van-button
          v-if="0"
          round
          type="info"
          color="rgba(223, 223, 223, 1)"
          plain
          @click="undo"
        >
          <span>撤销申请</span>
        </van-button>
        <van-button
          round
          type="info"
          color="rgba(223, 223, 223, 1)"
          plain
          @click="
            serviceUrl('makeCourier', orderProductId, afterSaleId, orderId)
          "
        >
          <span>填写运单号</span>
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { copy } from "@/utils/index.js";
import { isInApp } from "@/utils/native.js";

export default {
  props: {
    receivePhone: String,
    receiveName: String,
    receiveAddress: String,
    orderId: String,
    afterSaleId: String,
    orderProductId: String,
    tip:String
  },
  mounted() {},
  methods: {
    copy(id) {
      if (copy(id)) {
        this.$toast("复制成功");
      }
    },
    undoServe() {
      let requestData = {
        afterSaleId: this.afterSaleId,
      };
      this.$api.afterSaleDetail.cancelAfterSaleById(requestData).then((res) => {
        this.serviceUrl("orderDetail", this.orderId);
      });
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
    serviceUrl(url, id, asId, oid) {
      if (0) {
        window.hpcapi.openRouter(
          `${appUrl}${url}?id=${id}&afterSaleId=${asId}&orderMasterId=${oid}`
        );
        //this.$router.push(url);
      } else {
        this.$router.push({
          path: url,
          query: {
            id: id,
            afterSaleId: asId,
            orderMasterId: oid,
          },
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.addressDetail {
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  margin: 0 24px;
  .l-tip {
    width: 100%;
    background: #fdf5bc;
    border-radius: 16px;
    padding: 20px;
    .l-tip-content {
      border-radius: 16px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 37px;
    }
  }
  .van-button--normal {
    padding: 0 16px;
  }
  .addressDetail-title {
    height: 82px;

    font-size: 30px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 82px;
    border-bottom: 1px solid #ebedf0;
  }
  .addressDetail-warp {
    display: flex;
    margin-top: 30px;
    padding-bottom: 30px;
    .addressDetail-warp-icon {
      img {
        width: 50px;
        height: 73px;
      }
    }

    .addressDetail-warp-list {
      margin-left: 20px;
      font-size: 30px;
      color: rgba(51, 51, 51, 1);
      ul {
        li {
          line-height: 42px;
          margin-top: 16px;
          .text-phone {
            font-size: 26px;
            font-family: PingFangSC-Light, PingFang SC;
            font-weight: 300;
            color: rgba(102, 102, 102, 1);
            letter-spacing: 1px;
            margin-left: 16px;
          }
        }
        .mt0 {
          margin-top: 0px;
        }
        .text {
          .text-dz {
            // float: left;
          }
          .text-copy {
            float: right;
            white-space: nowrap;
            color: rgba(100, 144, 254, 1);
          }
        }
      }
    }
  }
  .addressDetail-bottom {
    ul {
      font-size: 26px;
      font-family: PingFangSC-Light, PingFang SC;
      font-weight: 300;
      color: rgba(102, 102, 102, 1);
      line-height: 37px;
      letter-spacing: 1px;
      margin-top: 30px;
      border-bottom: 1px solid #ebedf0;
      padding-bottom: 30px;
      li {
        margin-top: 10px;
        .bottom-text {
          margin-left: 5px;
        }
      }
    }
    .bottom-bt {
      margin-top: 30px;
      margin-bottom: 30px;
      text-align: right;
      span {
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(48, 46, 64, 1);
      }
    }
  }
}
</style>