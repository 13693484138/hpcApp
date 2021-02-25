<template>
  <div class="detailBanner" :class="{'bgType':bgType}">
    <div class="banner-warp">
      <div class="d-l" v-if="orderType!=3">
        <div class="warp-icon" v-if="icon" :class="[icon?iconClass:'']"></div>
        <span class="lt">{{title}}</span>
        <span class="lt" v-if="isMoney">￥{{money}}</span>
      </div>
      <div class="md-list" v-if="orderType==3">
        <div class="md-list-img">
          <img src="../images/orderDetail/md.png" alt />
          <span class="md-list-title">门店现场结算订单</span>
        </div>
        <div class="md-label">感谢您的支持，满意的话帮我们推荐下吧</div>
      </div>
      <!-- <span class="banner-label" v-if="!isMoney">{{label}}</span>-->
      <div class="banner-label d-l lt" v-if="isMoney">
        <span>请尽快完成支付，还剩</span>
        <van-count-down :time="time">
          <template v-slot="timeData">
            <span class="block jc lt">{{ timeData.minutes }}</span>
            <span class="colon lt">分</span>
            <span class="block jc lt">{{ timeData.seconds }}</span>
            <span class="colon lt">秒</span>
          </template>
        </van-count-down>

        <span>将自动取消</span>
      </div>
      <span class="banner-label lt" v-if="endTime">{{endTime|formatDate}}</span>
      <div class="banner-label d-l" v-if="isTime">
        <span>还剩</span>
        <van-count-down :time="time" format="DD 天 HH 时 mm 分" @finish="timeRload" />
      </div>
    </div>
    <div class="banner-img">
      <img v-if="imgTypeIndex==1" src="../images/afterSale/chenggong.png" alt />
      <img v-if="imgTypeIndex==0" src="../images/afterSale/shibai.png" alt />
      <img v-if="imgTypeIndex==2" class="img-qth" src="../images/afterSale/xiangzi.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  name: "detailBanner",
  data() {
    return {
      iconClass: "",
      type: "",
      isMoney: false,
      //time: "", //是否展示价格
    };
  },
  props: {
    bgType: Boolean, //背景图目前支持灰色和黄色两种背景图
    imgTypeIndex: Number, //内容图标目前只在售后模块开启
    label: String, //小标题
    title: String, //标签
    icon: Boolean, //icon为true开启图标
    typeName: String, //指定当前类型目前只在订单详情开启
    money: String, //价格目前只在订单详情开启
    time: String, //倒计时
    isTime: Boolean,
    endTime: String,
    orderType: String,
  },
  created() {},
  filters: {
    formatDate(time) {
      if (time) {
        return time.replace(/-/g, ".");
      }
    },
  },
  mounted() {
    switch (this._props.typeName) {
      case "待付款":
        this.iconClass = "dfk";
        this.isMoney = true;
        break;
      case "待发货":
        this.iconClass = "dfh";
        break;
      case "待收货":
        this.iconClass = "dsh";
        break;
      case "已完成":
        this.iconClass = "ywv";
        break;
      case "交易取消":
        this.iconClass = "jyqx";

        break;
      case "已退款":
        this.iconClass = "ytk";
        break;
      case "发货中":
        this.iconClass = "fhz";
    }
  },
  methods: {
    timeRload() {
      this.$emit("timeRload");
    },
  },
};
</script>
<style lang="scss" scoped>
.md-list-img img {
  height: 44px;
  width: 44px;
}
.md-list-img{
  display: flex;
  align-items: center;
}
.md-list{
  font-size: 0;
}
.md-list-title {
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  margin-left: 3px;
}
.md-label {
  font-size: 24px !important;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  margin-top: 11px;
}
.dfk {
  background-position: -177px 0;
}
.dfh {
  background-position: -132px 0;
}
.dsh {
  background-position: -44px 0;
}
.ywv {
  background-position: -222px 0;
}
.jyqx {
  background-position: 0 0;
}
.jyqx {
  background-position: 0 0;
}
.ytk {
  background-position: -132px 0;
}
.fhz {
  background-position: -267px 0;
}
.lt {
  margin-left: 10px;
}
.detailBanner {
  width: 100%;
  height: 163px;
  background-image: url("../images/afterSale/beijing.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .banner-warp {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-left: 40px;
    height: 100%;
    .van-count-down {
      margin-left: 0 !important;
    }
    div {
      font-size: 40px;

      .warp-icon {
        width: 44px;
        height: 44px;
        display: inline-block;
        background-image: url("../images/orderDetail/orderIcon.png");
        background-size: 312px 44px;
        // background-repeat: no-repeat;
        // background-size: cover;
      }
      .jc {
        font-weight: 550;
      }
    }
    .banner-label {
      font-size: 24px;

      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-top: 10px;
      .van-count-down {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-left: 8px;
      }
    }
  }
  .banner-img {
    img {
      width: 100px;
      height: 100px;
      margin-right: 86px;
    }
    .img-qth {
      width: 151px;
      height: 100px;
    }
  }
}
.bgType {
  background-image: url("../images/afterSale/beijingan.png");
}
</style>