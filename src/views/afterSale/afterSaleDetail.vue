<template>
  <div class="afterSaleDetail">
    <detailBanner
      :title="typeName"
      :typeName="typeName"
      :key="nowTime"
      :imgTypeIndex="imgTypeIndex"
      :orderId="asDetail.id"
      :time="time"
      :isTime="isTime"
      :bgType="bgType"
      :endTime="endTime"
      @timeRload="asDetailInit"
    />
    <div class="afterSale-warp">
      <afterSaleText
        :asType="asDetail.statusName"
        :id="asDetail.afterSaleId"
        :oid="asDetail.orderMasterId"
        :receivePhone="asDetail.receivePhone"
        :receiveName="asDetail.receiveName"
        :receiveAddress="asDetail.receiveAddress"
        :orderProductId="asDetail.orderProductId"
        :cancelReason="asDetail.cancelReason"
        :refundAmount="asDetail.refundAmount"
        :tip="asDetail.tip"
      />
      <goodsDetail
        :refundReason="asDetail.refundReason"
        :refundAmount="asDetail.refundAmount"
        :createTime="asDetail.createTime"
        :afterSaleId="asDetail.afterSaleId"
        :productName="asDetail.productName"
        :productSkuImage="asDetail.productSkuImage"
        :specColor="asDetail.specColor"
        :specSize="asDetail.specSize"
        :type="type"
        :list="list"
        :key="nowTime"
      />
      <callService
        :isButton="isButton"
        :orderMasterId="asDetail.orderMasterId"
        :orderProductId="asDetail.orderProductId"
        :discountPrice="asDetail.refundAmount"
        :productSkuImage="asDetail.productSkuImage"
        :statusName="asDetail.statusName"
        :type="type"
        :orderStatusCN="asDetail.orderStatusCN"
        :key="nowTime"
        :afterStatus="asDetail.orderProductStatus"
      />
    </div>
  </div>
</template>
<script>
import detailBanner from "@/components/detailBanner";
import afterSaleText from "./components/afterSaleText";
import goodsDetail from "./components/goodsDetail";
import callService from "./components/callService";
import { getUrlParameter, getTimestamp } from "@/utils/index.js";
import { isInApp } from "@/utils/native.js";
export default {
  name: "afterSaleDetail",
  data() {
    return {
      orderProductId: "", //商品ID
      orderMasterId: "", //订单ID
      afterSaleId: "", //售后ID
      nowTime: "",
      typeName: "",
      time: "",
      type: "",
      isTime: false, //时间是否显示
      isButton: false,
      bgType: false,
      endTime: "",
      list: [],
      asDetail: {
        afterSaleId: "",
        afterStatus: "",
        auditStatus: "",
        tip:"",
        createTime: "",
        receivePhone: "", //收件人手机号
        receiveName: "", //收件人姓名
        receiveAddress: "", //收件人地址
        id: "",
        isBack: "",
        orderProductId: "",
        orderProductStatus:"",
        productName: "",
        productSkuImage: "",
        refundAmount: "",
        refundQuantity: "",
        refundReason: "",
        specColor: "",
        specSize: "",
        statusName: "",
        list: [],
      },
    };
  },
  created() {},
  mounted() {
    this.orderProductId = getUrlParameter("orderProductId");
    this.orderMasterId = getUrlParameter("orderMasterId");
    this.afterSaleId = getUrlParameter("afterSaleId");
    if (this.orderProductId == "1" && this.afterSaleId == undefined) {
      this.type = "1";
      this.getAfterSaleByOrderIdInit();
    } else if (this.afterSaleId != undefined) {
      this.type = this.orderProductId == "1" ? this.orderProductId : "0";
      this.getAfterSaleDetail();
    } else {
      this.type = "0";
      this.asDetailInit();
    }
  },
  methods: {
    getAfterSaleDetail() {
      let requestData = {
        afterSaleId: this.afterSaleId,
      };
      this.$api.afterSaleDetail
        .getAfterSaleDetail(requestData)
        .then((res) => {
          this.asDetail = res;
          this.asDetail.productSkuImage = res.productList[0].productSkuImage;
          this.asDetail.orderProductId = res.productList[0].orderProductId;
          switch (this.asDetail.statusName) {
            case 0:
              this.typeName = "申请中";
              break;
            case 1:
              this.typeName = "请退货";
              this.imgTypeIndex = 2;
              let newDate = new Date().getTime();
              let odDate = getTimestamp(this.asDetail.dateAfter);
              this.time = odDate - newDate;
              this.isTime = true;
              break;
            case 2:
              this.typeName = "待退款";
              break;
            case 3:
              this.typeName = "退款成功";
              this.imgTypeIndex = 1;
              this.endTime = this.asDetail.endTime;
              break;
            case 4:
              this.typeName = "已取消";
              this.bgType = true;
              this.isButton = true;
              this.endTime = this.asDetail.endTime;
              break;
            case 5:
              this.typeName = "退款失败"; //文案
              this.imgTypeIndex = 0; //左边IOCN
              this.bgType = true; //背景
              this.isButton = true;
              this.endTime = this.asDetail.endTime; //结束时间
              break;
          }
          this.nowTime = new Date().getTime(); //获取当前时间戳
        })
        .catch(() => {
          // this.$toast("售后详情数据获取失败");
        });
    },
    getAfterSaleByOrderIdInit() {
      let requestData = {
        orderMasterId: this.orderMasterId,
      };
      this.$api.afterSaleDetail
        .getAfterSaleByOrderId(requestData)
        .then((res) => {
          this.asDetail = res;
          this.asDetail.productSkuImage = res.list[0].productSkuImage;
          this.list = res.list;
          switch (this.asDetail.statusName) {
            case 0:
              this.typeName = "申请中";
              break;
            case 1:
              this.typeName = "请退货";
              this.imgTypeIndex = 2;
              let newDate = new Date().getTime();
              let odDate = getTimestamp(this.asDetail.dateAfter);
              this.time = odDate - newDate;
              this.isTime = true;
              break;
            case 2:
              this.typeName = "待退款";
              break;
            case 3:
              this.typeName = "退款成功";
              this.imgTypeIndex = 1;
              this.endTime = this.asDetail.endTime;
              break;
            case 4:
              this.typeName = "已取消";
              this.bgType = true;
              this.isButton = true;
              this.endTime = this.asDetail.endTime;
              break;
            case 5:
              this.typeName = "退款失败"; //文案
              this.imgTypeIndex = 0; //左边IOCN
              this.bgType = true; //背景
              this.isButton = true;
              this.endTime = this.asDetail.endTime; //结束时间
              break;
          }
          this.nowTime = new Date().getTime(); //获取当前时间戳
        })
    },
    asDetailInit() {
      let requestData = {
        orderMasterId: this.orderMasterId,
        productId: this.orderProductId,
      };
      this.$api.afterSaleDetail
        .getAfterSaleById(requestData)
        .then((res) => {
          this.asDetail = res;
          switch (this.asDetail.statusName) {
            case 0:
              this.typeName = "申请中";
              break;
            case 1:
              this.typeName = "请退货";
              this.imgTypeIndex = 2;
              let newDate = new Date().getTime();
              let odDate = getTimestamp(this.asDetail.dateAfter);
              this.time = odDate - newDate;
              this.isTime = true;
              break;
            case 2:
              this.typeName = "待退款";
              break;
            case 3:
              this.typeName = "退款成功";
              this.imgTypeIndex = 1;
              this.endTime = this.asDetail.endTime;
              break;
            case 4:
              this.typeName = "已取消";
              this.bgType = true;
              this.isButton = true;
              this.endTime = this.asDetail.endTime;
              break;
            case 5:
              this.typeName = "退款失败"; //文案
              this.imgTypeIndex = 0; //左边IOCN
              this.bgType = true; //背景
              this.isButton = true;
              this.endTime = this.asDetail.endTime; //结束时间
              break;
          }
          this.nowTime = new Date().getTime(); //获取当前时间戳
        })
    },
  },
  components: {
    detailBanner,
    afterSaleText,
    goodsDetail,
    callService,
  },
};
</script>
<style scoped lang="scss">
.afterSaleDetail {
  background: rgba(245, 245, 245, 1);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding-bottom: 55px;
  overflow-x: auto;
  .afterSale-warp {
    padding: 16px 24px;
    .afterSale-warp-top {
      width: 100%;
      height: 203px;
      background: rgba(255, 255, 255, 1);
    }
    .afterSale-warp-bottom {
      width: 100%;
      height: 690px;
      background: rgba(255, 255, 255, 1);
      border-radius: 12px;
      margin-top: 16px;
    }
  }
}
</style>