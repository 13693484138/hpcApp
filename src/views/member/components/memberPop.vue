<template>
  <div class="memberPop">
    <van-popup
      v-model="isPop"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '11.74rem', overflow: 'hidden' }"
    >
      <div class="content">
        <div class="money-text">付款详情</div>
        <div class="money"><span>¥</span>199</div>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell
              v-for="item in payList"
              :key="item.id"
              :title="item.channelTypeDesc"
              clickable
              @click="radio = item.id"
              :border="false"
            >
              <template #title>
                <img
                  class="img-icon"
                  v-if="item.channelType == 0"
                  src="@/images/member/weixin.png"
                />
                <img
                  class="img-icon"
                  v-if="item.channelType == 10"
                  src="@/images/member/zhifubao.png"
                />
                <span class="custom-title">{{ item.channelTypeDesc }}</span>
              </template>
              <template #right-icon>
                <van-radio :name="item.id" checked-color="#FEE002"> </van-radio>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <div class="button-co"></div>
        <van-button type="primary" block round color="#FFE456" @click="save"
          ><span class="botton-bt">立即付款</span></van-button
        >
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    isPop: Boolean,
    radio: "",
    payList: [],
    weixinImgUrl: "./../../../images/member/weixin.png",
    zhifubaoImgUrl: "./../../../images/member/zhifubao.png",
  },
  created() {
    this.$api.userMembers.getChannel({}).then((res) => {
      this.payList = res.list;
      this.radio = res.list[0].id;
      // this.openWXPay(res.map);
    });
  },
  methods: {
    save() {
      window.hpcapi.openUniversalPay(
        JSON.stringify({
          channelType: 10,
          map: {
            orderString:
              "alipay_root_cert_sn=687b59193f3f462dd5336e5abf83c5d8_02941eef3187dddf3d3b83462e1dfcf6&alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_cert_sn=2b0086a594f389eee16869c58479fba6&app_id=2021001132664488&biz_content=%7B%22body%22%3A%22%E9%9B%85%E8%AF%97%E5%85%B0%E9%BB%9B%E7%89%B9%E6%B6%A6%E4%BF%AE%E6%8A%A4%E8%82%8C%E9%80%8F%E7%B2%BE%E5%8D%8E15ML%22%2C%22out_trade_no%22%3A%221310505226217562114%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22subject%22%3A%22%E9%9B%85%E8%AF%97%E5%85%B0%E9%BB%9B%E7%89%B9%E6%B6%A6%E4%BF%AE%E6%8A%A4%E8%82%8C%E9%80%8F%E7%B2%BE%E5%8D%8E15ML%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%220.02%22%7D&charset=UTF-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fapi-dev.hpcang.com%2Fpay%2Fapi%2Fapp%2Fver1_0%2Falipaynotify%2FappNotify&sign=aN4fJup4ScswLaHfbbWpXvSPNh6mZbNzUolx%2BCZQ48I4nInnzaLrEPqm7sJXDMqDGvy%2B%2Fh%2FOFB%2FE%2BUSD%2BBOP%2BPU4fpud%2F1M3eW0yZ1xSWzzvN8ifJv%2Bjn%2BPAvVd3GaIL9Y1wLLe9d%2BhZF%2BAiuucxYfDc0077mQXG0TWi%2BFtSvC%2BLSxlY1wieJKwwdyM%2BKrgjStNFDVKBhEqUARmJU7BnRs55YpUix9xqm72K43VG%2FXw2my%2FRq4uYs011fDrfaqvybaL%2FLADHg5HrUQoanUQH1KzPEJbAr%2FQkaVHm0gByH8ATd0WXgO2DKibQS85G15HU4TRF0ywaEdDpdvjjiBVudQ%3D%3D&sign_type=RSA2&timestamp=2020-09-28+17%3A02%3A49&version=1.0",
          },
        })
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.memberPop{
  position: relative;
  z-index: 100001;
}
.money-text {
  font-size: 34px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0);
}
.money {
  font-size: 82px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  text-align: center;
  margin-top: 163px;
  margin-bottom: 31px;
  span {
    font-size: 42px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
}
.content {
  .van-button--block {
    width: 600px;
    margin: 0 auto;
    margin-top: 285px;
    overflow: hidden;
  }
  .van-cell__title {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  .botton-bt {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
  }
  .img-icon {
    width: 44px;
    height: 40px;
  }
  .van-cell__title {
    display: flex;
    align-items: center;
  }
  .custom-title {
    margin-left: 24px;
  }
  .van-cell--clickable {
    border-bottom: 1px solid #ebedf0;
  }
}
</style>