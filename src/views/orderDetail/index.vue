<template>
  <div class="order-detail-container">
    <!-- 头部 -->
    <detailBanner
      v-if="orderData.statusCN != ''"
      :title="orderData.statusCN"
      :label="orderData.closeReason"
      :bgType="orderData.status == 50 || status == 70 ? true : false"
      :icon="true"
      :money="orderData.payAmount"
      :typeName="orderData.statusCN"
      :time="time"
      :key="nowTime"
      :orderType="orderData.orderType"
    />
    <div class="userinfo-container white-bg" v-show="orderData.orderType != 3">
      <img
        class="addr-icon"
        src="./../../images/orderDetail/addressIcon.png"
        alt
      />
      <div class="info-container">
        <div class="consignee-info">
          <span>{{ orderData.consigneeName }}</span>
          <span>{{ orderData.consigneePhone }}</span>
        </div>
        <div class="consignee-addr">
          {{ orderData.provinceName }} {{ orderData.cityName }}
          {{ orderData.areaName }} {{ orderData.address }}
        </div>
      </div>
    </div>
    <!-- <img class="slice" src="./../../images/orderDetail/line.png"  alt="" /> -->
    <!-- 商品信息 -->
    <div class="commodity-container white-bg">
      <div class="logo-container">
        <img class="logo" lazy-load src="./../../images/orderDetail/logo.png" />
        <div class="des">一家专门做品牌特卖的仓库</div>
      </div>
      <div class="commdity-items-container">
        <div
          v-for="item in orderData.orderProducts"
          :key="index"
          @click="commidityDetail(item.productSpuId)"
          class="commdity-content"
        >
          <div class="commdity-item">
            <van-image
              class="commidity-image"
              lazy-load
              :src="item.productSkuImage"
            />
            <div class="commidity-detail">
              <div class="commidity-detail-top">
                <div class="commidity-name one-line">
                  {{ item.productSpuTitle }}
                </div>
                <div class="commidity-price">
                  <span>￥{{ item.productSkuSalePrice }}</span>
                  <del class="commidity-price"
                    >￥{{ item.productSkuOriginalPrice }}</del
                  >
                </div>
              </div>
              <div class="commidity-detail-middle">
                <div class="commidity-size one-line">
                  {{ item.productSkuSpecColour }} {{ item.productSkuSpecSize }}
                </div>
                <div class="commidity-num">
                  <span>
                    <img src="./../../images/orderDetail/xxx.png" alt />
                  </span>
                  {{ item.quantity }}
                </div>
              </div>
              <div class="commidity-detail-bottom">
                <div
                  class="change-btn"
                  v-if="!item.returnNoreason && orderData.orderType != 3"
                >
                  7天无理由退货
                </div>
                <div class="commidity-type" v-show="orderData.orderType != 3">
                  {{ item.statusCN }}
                </div>

                <!-- <div class="logistics-btn" @click.stop="viewLogistics(item.id)">查看物流</div> -->
              </div>
            </div>
          </div>
          <div class="logistics-list">
            <van-button
              plain
              @click.stop
              color="#E5E5E5"
              round
              type="info"
              v-if="
                (item.isHave == 0 || item.isHave == null) &&
                (orderData.status == 40 ||
                  orderData.status == 25 ||
                  orderData.status == 30) &&
                orderData.orderType == 1
              "
              @click="
                applyAs(
                  item.id,
                  item.realTotalAmount,
                  orderData.id,
                  orderData.status
                )
              "
            >
              <span class="logistics-btn">{{
                orderData.status == 25 || orderData.status == 30
                  ? "申请退款"
                  : "申请售后"
              }}</span>
            </van-button>
            <van-button
              plain
              @click.stop
              color="#E5E5E5"
              round
              type="info"
              v-if="
                item.isHave == 1 &&
                (orderData.status == 40 ||
                  orderData.status == 25 ||
                  orderData.status == 30) &&
                orderData.orderType == 1
              "
              @click="QueryAs(item.id, item.realTotalAmount, orderData.id)"
            >
              <span class="logistics-btn">查看售后</span>
            </van-button>
            <van-button
              plain
              @click.stop
              color="#E5E5E5"
              round
              type="info"
              v-if="orderData.orderType == 1 || orderData.status == 50"
              @click="_getLogisticsRequest(item.id)"
            >
              <span class="logistics-btn">查看物流</span>
            </van-button>
            <!-- <van-button
              plain
              @click.stop
              color="#E5E5E5"
              round
              type="info"
             
              @click="openOrderBarcode()"
            >
              <span class="logistics-btn">查看条码</span>
            </van-button>-->
          </div>
        </div>
        <!-- 荟员 -->
        <div class="member">
          <div class="member-content" v-if="orderData.purchaseMember">
            <div class="member-content-img">
              <img src="./../../images/orderDetail/member.png" alt />
              <span>超级荟员</span>
            </div>
            <div class="member-content-money">
              ￥{{ orderData.purchaseMemberPrice }}
            </div>
          </div>
        </div>
      </div>

      <!-- 金额信息 -->
      <div class="money-container white-bg">
        <div class="total-money nomal-money">
          <span>商品总价</span>
          <span>￥{{ orderData.saleTotalAmount }}</span>
        </div>
        <div class="express-money nomal-money" v-if="orderData.purchaseMember">
          <span>超级荟员</span>
          <span>￥{{ orderData.purchaseMemberPrice }}</span>
        </div>
        <div class="express-money nomal-money">
          <span>运费（快递）</span>
          <span>￥{{ orderData.freightAmount }}</span>
        </div>
        <div class="express-money nomal-money">
          <span>荟员折扣</span>
          <span>-￥{{ orderData.discountAmount }}</span>
        </div>
        <div class="subsidy-money nomal-money">
          <span>平台优惠</span>
          <span>-￥{{ orderData.couponAmount }}</span>
        </div>
        <div class="actual-money">
          <span class="actual-money-text">实付款：</span>
          <span class="actual-money-num">￥{{ orderData.payAmount }}</span>
        </div>
      </div>
      <div class="callService" @click="call">
        <img src="./../../images/orderDetail/cellmassg.png" alt />
        <span>联系客服</span>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="order-container white-bg">
      <!-- <div class="order-head">订单信息</div> -->
      <div class="order-detail">
        <div class="order-detail-des">订单备注</div>
        <div class="order-detail-content">
          {{ orderData.orderRemarks ? orderData.orderRemarks : "暂无" }}
        </div>
      </div>
      <div class="order-detail d-l">
        <div class="order-detail-des">订单编号</div>
        <div class="order-detail-content">
          {{ orderData.id }}
          <van-button
            round
            type="info"
            size="mini"
            color="rgba(238,238,238,1)"
            @click="copy(orderData.id)"
          >
            <span class="cope-order-id">复制</span>
          </van-button>
        </div>
      </div>
      <div class="order-detail">
        <div class="order-detail-des">交易编号</div>
        <div class="order-detail-content">
          {{ orderData.payId ? orderData.payId : "暂无" }}
        </div>
      </div>
      <div class="order-detail">
        <div class="order-detail-des">创建时间</div>
        <div class="order-detail-content">
          {{ orderData.createTime | formatDate }}
        </div>
        <!--<div class="order-detail-content">{{orderData.createTime}}</div>-->
      </div>
      <div class="order-detail delivery-time">
        <div class="order-detail-des">发货时间</div>
        <div class="order-detail-content">
          {{ orderData.deliverTime | formatDate }}
        </div>
        <!--<div class="order-detail-content">{{orderData.deliverTime}}</div>-->
      </div>
      <div class="order-detail">
        <div class="order-detail-des">付款时间</div>
        <div class="order-detail-content">
          {{ orderData.payTime | formatDate }}
        </div>
        <!--<div class="order-detail-content">{{orderData.payTime}}</div>-->
      </div>
      <!-- <div class="contact-seller-container">
        <div class="contact-seller" @click="contactBuyer">
          <img class="contact-icon" src="./../../images/orderDetail/customerService.png" alt />
          <div class="contact-des">联系卖家</div>
        </div>
      </div>-->
    </div>
    <div
      class="order-bar"
      v-if="
        orderData.status == 50 ||
        orderData.status == 10 ||
        orderData.status == 30 ||
        orderData.status == 20 ||
        orderData.status == 40 ||
        orderData.status == 70
      "
    >
      <van-button
        v-if="orderData.status == 50"
        plain
        color="#E5E5E5"
        round
        type="info"
        @click="agaiNOrder"
      >
        <span class="order-bar-bt">重新下单</span>
      </van-button>
      <van-button
        plain
        @click.stop
        color="#E5E5E5"
        round
        type="info"
        v-if="
          (orderData.isHave == 0 || orderData.isHave == null) &&
          orderData.status == 20 &&
          orderData.orderType == 1
        "
        @click="applyAsOrder('1', orderData.payAmount, orderData.id)"
      >
        <span class="order-bar-bt">申请退款</span>
      </van-button>
      <van-button
        plain
        @click.stop
        color="#E5E5E5"
        round
        type="info"
        v-if="
          orderData.isHave == 1 &&
          orderData.status == 20 &&
          orderData.orderType == 1
        "
        @click="QueryAsOrder('1', orderData.payAmount, orderData.id)"
      >
        <span class="order-bar-bt">查看售后</span>
      </van-button>
      <van-button
        plain
        color="#E5E5E5"
        round
        type="info"
        @click="CancelOrder"
        v-if="orderData.status == 10"
      >
        <span class="order-bar-bt">取消订单</span>
      </van-button>
      <!-- <van-button
        plain
        color="#E5E5E5"
        round
        @click.stop
        type="info"
        v-if="
          (orderData.status == 30 ||
            orderData.status == 40 ||
            orderData.status == 70) &&
          isVersion &&
          orderData.orderType != 3
        "
        @click="queryOrderLogistics(orderData.id)"
      >
        <span class="order-bar-bt">查看物流</span>
      </van-button> -->
      <van-button
        plain
        color="#E5E5E5"
        round
        @click.stop
        type="info"
        v-if="orderData.status == 30"
        @click="confirmGoods(orderData.id)"
      >
        <span class="order-bar-bt">确认收货</span>
      </van-button>
      <van-button
        plain
        color="#E5E5E5"
        v-if="orderData.orderType == 3"
        round
        @click.stop
        type="info"
        @click="openOrderBarcode()"
      >
        <span class="order-bar-bt">查看条码</span>
      </van-button>

      <van-button
        plain
        color="#E5E5E5"
        round
        type="info"
        v-if="orderData.status == 10"
        @click="payOrder"
      >
        <template>
          <!-- <span class="order-bar-bt">查看物流</span> -->
          <van-count-down
            millisecond
            :time="time"
            @finish="_getOrderDetailRequest"
            format="mm:ss"
          >
            <template v-slot="timeData">
              <span class="bt-red">付款</span>
              <span class="bt-red">{{ timeData.minutes }}</span>
              <span class="bt-red">:</span>
              <span class="bt-red">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </template>
      </van-button>
      <!-- <div class="order-bar-bt bt-red">付款29:59</div> -->
    </div>
    <van-popup
      v-model="cancelOrderPop"
      round
      closeable
      position="bottom"
      :style="{ height: 'auto' }"
    >
      <div class="cance-pop">
        <van-radio-group v-model="canceRadio">
          <div class="cance-title">请选择订单取消的原因</div>
          <van-cell-group :border="false">
            <van-cell
              :border="false"
              :title="item"
              clickable
              @click="canceRadio = item"
              v-for="(item, index) in orderData.cancelReasonList"
              :key="index"
            >
              <template #right-icon>
                <van-radio :name="item" checked-color="#FEE002" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <div class="cance-bt">
          <van-button
            plain
            color="rgba(178,178,178,1)"
            round
            @click.stop
            type="info"
            @click="cancelOrderPop = false"
          >
            <span class="order-bar-bt">暂不取消</span>
          </van-button>
          <van-button
            color="rgba(254,224,2,1)"
            round
            @click.stop
            type="info"
            @click="CancelOrderConfirm()"
          >
            <span class="order-bar-bt">确定取消</span>
          </van-button>
        </div>
      </div>
    </van-popup>
    <!-- 货架精选 -->
    <recommend-list></recommend-list>
  </div>
</template>

<script>
import detailBanner from "@/components/detailBanner";
import { mapMutations } from "vuex";
import { getUrlParameter, copy, getTimestamp } from "@/utils/index.js";
import { pageUrl, appUrl } from "@/utils/config.js";
import recommendList from "@/components/recommendList/index.vue";
import { isInApp } from "@/utils/native.js";

export default {
  name: "orderDetail",
  components: {
    recommendList,
    detailBanner,
  },
  props: {},
  data() {
    return {
      bannerIcon: "",
      time: "",
      cancelOrderPop: false,
      canceRadio: "",
      isVersion: false,
      nowTime: "", //重现渲染子组件时间戳
      orderData: {
        address: "",
        afterSaleStatus: 0,
        areaName: "",
        cityName: "",
        consigneeName: "",
        consigneePhone: "",
        couponAmount: 0,
        createTime: "",
        orderType: 1,
        deliverTime: "",
        deliverType: 1,
        freightAmount: 0,
        id: "",
        cancelReasonList: [],
        orderProducts: [],
        orderType: 1,
        bannerIcon: "",
        originalTotalAmount: 0,
        payAmount: 0,
        payId: "",
        payTime: "",
        provinceName: "",
        saleTotalAmount: 0,
        status: 25,
        statusCN: "",
        discountAmount: 0,
        purchaseMember: 1,
      },
      version: "",
    };
  },
  computed: {},
  filters: {
    formatDate(time) {
      if (time) {
        return time.replace(/-/g, ".");
      } else {
        return "暂无";
      }
    },
  },
  created() {
    const systemInfo = JSON.parse(window.hpcapi.systemInfo());
    const token = systemInfo.sign;
    this.version = systemInfo.version;
    this.setToken(token);
    this.setSystemInfo(systemInfo);
  },
  mounted() {
    if (this.version >= "1.6.5") {
      this.isVersion = true;
    }
    this._getOrderDetailRequest();
  },
  destroyed() {},
  watch: {},
  methods: {
    //订单级别查看物流
    queryOrderLogistics(id) {
      // window.hpcapi.checkDetachLogistics(id + "");
      if (isInApp()) {
        window.hpcapi.openRouter(`${appUrl}logistics?id=${id}`);
        //this.$router.push(url);
      } else {
        this.$router.push({
          path: "logistics",
          query: {
            id: id,
          },
        });
      }
    },
    //查看条码
    openOrderBarcode() {
      window.hpcapi.openOrderBarcode(
        JSON.stringify({
          id: this.orderData.id,
          describe: "订单号：" + this.orderData.id,
        })
      );
    },
    // 确认收货
    confirmGoods(id) {
      this.$dialog
        .confirm({
          title: "确认收货",
          message: "确认全部商品已收到货？",
        })
        .then(() => {
          this.confirmGoodsHttp(id);
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    //确认收货接口
    confirmGoodsHttp(id) {
      let requestData = {
        orderId: id,
      };
      this.$api.orderDetail
        .completed(requestData)
        .then((res) => {
          this.$toast("确认收货成功");
          this._getOrderDetailRequest();
        })
        .catch(() => {
          this.$toast("确认收货失败");
        });
    },
    //联系客服
    call() {
      if (this.$store.state.user.version >= "1.6.5") {
        window.hpcapi.openCustomerService(
          JSON.stringify({
            id: "订单号：" + this.orderData.id,
            productSkuImage: this.orderData.orderProducts[0].productSkuImage,
            payAmount: "¥" + this.orderData.payAmount,
            statusCN: this.orderData.statusCN,
            linkUrl: "/orderDetail?id=" + this.orderData.id,
            type: "1",
          })
        );
      } else {
        window.hpcapi.openCustomerService();
      }
    },
    // 订单售后状态查询
    orderAsQuery(pid, discountPrice, oid) {
      let requestData = {
        orderMasterId: oid,
        productId: pid,
      };
      this.$api.afterSaleDetail
        .getAfterSaleById(requestData)
        .then((res) => {
          this.asSales(res);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    QueryAsOrder(pid, discountPrice, oid) {
      if (isInApp()) {
        window.hpcapi.openRouter(
          `${appUrl}afterSaleDetail?orderProductId=${pid}&discountPrice=${discountPrice}&orderMasterId=${oid}`
        );
        //this.$router.push(url);
      } else {
        this.$router.push({
          path: "afterSaleDetail",
          query: {
            orderProductId: pid,
            discountPrice: discountPrice,
            orderMasterId: oid,
          },
        });
      }
    },
    //跳转售后类型
    applyAs(pid, discountPrice, oid, status) {
      if (status == 25) {
        if (isInApp()) {
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
        if (isInApp()) {
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
    //整单退
    applyAsOrder(pid, discountPrice, oid) {
      if (isInApp()) {
        window.hpcapi.openRouter(
          `${appUrl}arefund?orderProductId=${pid}&discountPrice=${discountPrice}&orderMasterId=${oid}&type=0`
        );
        //this.$router.push(url);
      } else {
        this.$router.push({
          path: "arefund",
          query: {
            orderProductId: pid,
            discountPrice: discountPrice,
            orderMasterId: oid,
            type: 0,
          },
        });
      }
    },
    QueryAs(pid, discountPrice, oid) {
      if (isInApp()) {
        window.hpcapi.openRouter(
          `${appUrl}afterSaleDetail?orderProductId=${pid}&discountPrice=${discountPrice}&orderMasterId=${oid}`
        );
        //this.$router.push(url);
      } else {
        this.$router.push({
          path: "afterSaleDetail",
          query: {
            orderProductId: pid,
            discountPrice: discountPrice,
            orderMasterId: oid,
          },
        });
      }
    },
    iconType(type) {
      switch (type) {
        case 10:
          this.bannerIcon = "";
          break;
      }
    },
    //复制
    copy(id) {
      if (copy(id)) {
        this.$toast("复制成功");
      }
    },
    //重新下单
    agaiNOrder() {
      let rid = getUrlParameter("id");
      let money = this.orderData.payAmount;
      window.hpcapi.openBuyNow(
        JSON.stringify({
          payAmount: money,
          type: 3,
          reOrderId: rid,
        })
      );
    },
    //支付订单
    payOrder() {
      let requestData = {
        orderId: getUrlParameter("id"),
      };
      this.$api.orderDetail
        .getOrderPaymentlist(requestData)
        .then((res) => {
          window.hpcapi.openWXPay(JSON.stringify(res));
        })
        .catch(() => {
          this.$toast("调起微信支付失败");
        });
    },
    //取消订单
    CancelOrder() {
      this.cancelOrderPop = true;
      // this.$dialog
      //   .confirm({
      //     title: "确认取消订单",
      //     message: "确认立即取消当前订单？",
      //   })
      //   .then(() => {

      //     // on confirm
      //   })
      //   .catch(() => {
      //     // on cancel
      //   });
    },
    CancelOrderConfirm() {
      if (this.canceRadio == "") {
        this.$toast("请选择原因");
        return;
      }
      let requestData = {
        orderId: getUrlParameter("id"),
        reason: this.canceRadio,
      };
      this.$api.orderDetail
        .getCancelOrder(requestData)
        .then((res) => {
          this.cancelOrderPop = false;
          this.$toast("取消订单成功");
          this._getOrderDetailRequest();
        })
        .catch((error) => {
          console.log("失败拉------", error);
        });
    },
    // 查看物流
    viewLogistics(e) {
      this._getLogisticsRequest(e);
    },
    // 查看商品详情
    commidityDetail(id) {
      if (this.orderData.orderType == 1) {
        const url = appUrl + "productDetail?id=" + id;
        window.hpcapi.openRouter(url);
      }
    },
    // 联系卖家
    contactBuyer() {
      window.hpcapi.openCustomerService();
    },
    // 获取订单详情请求
    _getOrderDetailRequest() {
      let requestData = {
        orderId: getUrlParameter("id"),
      };
      this.$api.orderDetail
        .getOrderDetail(requestData)
        .then((res) => {
          console.log("成功拉------", res);
          this.orderData = res;
          this.nowTime = new Date().getTime(); //获取当前时间戳
          this.time = 1800000 - (this.nowTime - getTimestamp(res.createTime));

          console.log(this.time);
        })
        .catch((error) => {
          console.log("失败拉------", error);
        });
    },
    // 单个物流请求
    _getLogisticsRequest(id) {
      let requestData = {
        orderProductId: id,
      };
      console.log();
      this.$api.orderDetail
         .queryNewExpressCodeByOrderProductId(requestData)
        .then((res) => {
          if (res.list.length>0) {
            // 返回数据不为空
            // if (
            //   res.id == null ||
            //   res.mailNo == null ||
            //   res.expressCompanyCode == null
            // ) {
            //   this.$toast("暂无物流信息！");
            // } else {
              window.hpcapi.openRouter(`${appUrl}logistics?id=${id}`);
            // }
          } else {
            // 返回数据为空
            this.$toast("暂无物流信息！");
          }
        })
        .catch((error) => {
          console.log("失败拉------", error);
        });
    },
    // 弹出物流弹框
    _showLogisticsPopup(res) {
      var param = {
        id: res.id, // 订单id
        expressCompanyCode: res.expressCompanyCode, // 运单公司
        mailNo: res.mailNo, // 运单号
      };
      window.hpcapi.showLogistics(JSON.stringify(param));
    },
    ...mapMutations({
      setToken(commit, token) {
        commit("setAppToken", token);
      },
      setSystemInfo(commit, token) {
        commit("setSystemInfo", token);
      },
    }),
  }, // method
};
</script>

<style scoped lang="scss">
.white-bg {
  background: #fff;
}
.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.order-detail-container {
  width: 10rem;
  background: #f2f2f2;
  overflow: hidden;
  .callService {
    height: 104px;
    line-height: 104px;
    text-align: center;
    border-top: 1px solid #eeeeee;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    letter-spacing: 1px;
    font-size: initial;
    img {
      width: 36px;
      height: 36px;
      margin-right: 6px;
      vertical-align: middle;
    }
    span {
      font-size: 32px;
    }
  }
  .cance-pop {
    .cance-title {
      font-size: 32px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(31, 31, 31, 1);
      line-height: 45px;
      letter-spacing: 2px;
      text-align: center;
      margin: 40px 0;
    }
    .order-bar-bt {
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 42px;
      letter-spacing: 2px;
    }
    .cance-bt {
      display: flex;
      justify-content: center;
      margin-top: 60px;
      margin-bottom: 40px;
      button {
        width: 330px;
        height: 94px;
        margin: 0 11px;
      }
    }
  }
  .member {
    border-bottom: 1px solid #eeeeee;
    .member-content {
      padding-bottom: 42px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: PingFangSC-Semibold, PingFang SC;
      margin: 0 24px;
      &-img {
        display: flex;
        align-items: center;
        img {
          width: 32px;
          height: 32px;
        }
        span {
          font-size: 28px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          margin-left: 10px;
        }
      }
      &-money {
        font-size: 32px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        letter-spacing: 1px;
      }
    }
  }

  .order-bar {
    height: 120px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    .van-button--normal {
      padding: 0 15px;
    }
    button {
      height: 72px;
      line-height: 72px;
      width: 182px;
      margin-right: 24px;
      .order-bar-bt {
        font-size: 28px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        //   width: 182px;
        //   height: 72px;
        //   border-radius: 40px;
        //   border: 1px solid rgba(178, 178, 178, 1);
        //   line-height: 72px;
        //   text-align: center;
        //   margin-right: 24px;
      }
      .bt-red {
        color: #ff3b30;
        // border: 1px solid rgba(255, 59, 48, 1);
      }
    }
  }
  /* 头部信息 */
  .head-container {
    width: 100%;
    height: 160px;
    padding-left: 0.69rem;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .status {
      font-size: 0.48rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 0.21rem;
    }

    .reason {
      font-size: 0.32rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(242, 242, 242, 1);
    }
  }

  /* 用户信息 */
  .userinfo-container {
    width: 10rem;
    /*height: 1.91rem;*/
    height: 149px;
    margin-top: 24px;
    display: flex;
    border-radius: 20px;
    .addr-icon {
      width: 70px;
      height: 70px;
      margin-top: 0.55rem;
      margin-left: 24px;
    }

    .info-container {
      margin-left: 10px;
      margin-top: 0.41rem;
      margin-bottom: 0.41rem;

      .consignee-info {
        font-size: 0.35rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 0.27rem;
        span:first-child {
          font-size: 30px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 550;
          color: rgba(51, 51, 51, 1);
          letter-spacing: 1px;
        }
        span:last-child {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          margin-left: 20px;
          letter-spacing: 1px;
        }
      }
      .consignee-addr {
        font-size: 0.32rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 0.45rem;
      }
    }
  }

  .slice {
    display: block;
    width: 10rem;
    height: 0.12rem;
  }

  .commodity-container {
    margin: 0.32rem 0 0.32rem 0;
    border-radius: 0.2rem;
    border-bottom: 0.1rem solid #f2f2f2;
    border-radius: 20px;

    .logistics-list {
      text-align: right;

      margin: 0 24px;
      button {
        width: 182px;
        height: 72px;
        line-height: 72px;

        .logistics-btn {
          font-size: 28px;
          color: rgba(51, 51, 51, 1);
          line-height: 40px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
        }
      }
      button {
        margin-right: 20px;
      }
      button:last-child {
        margin-right: 0;
      }
    }

    .logo-container {
      display: flex;
      align-items: center;
      width: 9.36rem;
      height: 1.29rem;
      margin-left: 0.33rem;
      //   border-bottom: 0.014rem solid #f2f2f2;

      .logo {
        width: 44px;
        height: 44px;
        margin-right: 0.2rem;
      }

      .des {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 550;
        color: rgba(51, 51, 51, 1);
      }
    }

    .commdity-items-container {
      margin-top: 0.32rem;
      border: 1px solid #fff;

      .commdity-content {
        margin-bottom: 40px;
        .commdity-item {
          width: 9.96rem;
          display: flex;
          margin-bottom: 0.4rem;

          .commidity-image {
            width: 182px;
            height: 182px;
            margin-left: 0.35rem;
            margin-right: 0.27rem;
          }
          .commidity-detail {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .commidity-detail-top {
              margin-bottom: 6px;
              width: 6.5rem;
              .commidity-name {
                width: 345px;
                height: 80px;
                line-height: 40px;
                float: left;
                font-size: 0.35rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
              .commidity-price {
                font-size: 0.4rem;
                float: right;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                display: flex;
                flex-direction: column;
                color: #333333;
                align-items: flex-end;
                del {
                  font-size: 26px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: rgba(178, 178, 178, 1);
                  margin-top: 14px;
                }
                span {
                  font-size: 32px;
                  font-family: PingFangSC-Semibold, PingFang SC;
                  font-weight: 600;
                  color: rgba(51, 51, 51, 1);
                  letter-spacing: 1px;
                }
              }
            }

            .commidity-detail-middle {
              display: flex;
              justify-content: space-between;
              margin-bottom: 18px;
              width: 6.5rem;
              .commidity-num {
                font-size: 26px;
                font-family: Alibaba PuHuiTi;
                font-weight: 550;
                color: rgba(102, 102, 102, 1);
                align-items: center;
                span {
                  font-size: 12px;
                  img {
                    width: 18px;
                    height: 18px;
                  }
                }
              }
              .commidity-size {
                width: 3.77rem;
                /*height:0.32rem;*/
                font-size: 0.35rem;
                font-family: PingFangSC-Regular, PingFang SC;

                font-size: 26px;

                font-weight: 300;
                color: rgba(102, 102, 102, 1);
              }
            }

            .commidity-detail-bottom {
              width: 100%;
              /*border: 1px solid red;*/
              display: flex;
              justify-content: space-between;
              align-items: center;

              .commidity-type {
                font-size: 26px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(255, 59, 48, 1);
                line-height: 37px;
                letter-spacing: 1px;
              }
              .change-btn {
                width: 165px;
                text-align: left;
                padding-left: 8px;
                height: 41px;
                display: flex;
                align-items: center;
                // line-height: 0.55rem;
                //background: rgba(255, 224, 2, 1);
                background: url("./../../images/orderDetail/7tian.png");

                background-size: cover;
                // border-radius: 0.1rem;
                font-size: 20px;
                line-height: 41px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
            }
          }
        }
      }
    }

    .money-container {
      width: 9.96rem;
      padding: 0.52rem 0.35rem;
      box-sizing: border-box;

      .nomal-money {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 0.4rem;
        font-size: 0.35rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }

      .subsidy-money {
        padding-bottom: 0.4rem;
        //border-bottom: 1px solid #f2f2f2;
      }

      .actual-money {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;

        .actual-money-text {
          font-size: 0.35rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          //margin-right: 6px;
        }

        .actual-money-num {
          font-size: 0.53rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 59, 48, 1);
        }
      }
    }
  }

  .order-container {
    margin: 0.32rem 0 0.55rem 0;
    /*border-radius: 0.2rem 0.2rem 0 0;*/
    border-radius: 0.2rem;
    padding: 0rem 0.32rem 0.52rem 0.32rem;
    border-bottom: 0.1rem solid #f2f2f2;
    font-size: 0.35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);

    .order-head {
      /*with:9.36rem;*/
      height: 1.41rem;
      line-height: 1.41rem;
      font-size: 0.4rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      border-bottom: 0.01rem solid #f2f2f2;
    }

    .order-detail {
      width: 100%;
      padding-top: 0.52rem;
      display: flex;
      justify-content: space-between;
      .order-detail-content {
        letter-spacing: 1px;
        button {
          width: 70px;
          height: 42px;
          font-size: 16px;
          line-height: 42px;
          margin-left: 20px;
        }
      }
      .cope-order-id {
        font-size: 20px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        // line-height: 28px;
        letter-spacing: 1px;
      }
    }

    .contact-seller-container {
      width: 100%;
      height: 1.07rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 0.51rem;
      border-top: 1px solid #f2f2f2;
    }

    .contact-seller {
      display: flex;
      align-items: center;

      .contact-icon {
        width: 0.47rem;
        height: 0.44rem;
        margin-right: 0.32rem;
      }
    }
  }
}
</style>
