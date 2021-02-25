<template>
  <div class="container column">
    <div class="reach-wrap">
      <div class="reach-top">
        <div class="bg">
          <img :src="imgs.bg"
               style="width: 100%;"
               alt="">
        </div>
        <div class="title flex">
          <span class="o1"></span>
          <span class="o2"></span>
          <span class="o3">参与流程</span>
          <span class="o2"></span>
          <span class="o1"></span>
        </div>
      </div>
      <div class="main-content">
        <div class="progress flex">
          <div class="point ponit-1 flex">
            <div class="dom column">
              <img :src="imgs.p1"
                   alt="">
              <div class="txt">预约报名</div>
            </div>
          </div>
          <div class="point ponit-2 flex">
            <div class="arrow">
              <img :src="imgs.arrow">
            </div>
            <div class="dom column">
              <img :src="imgs.p2"
                   alt="">
              <div class="txt">火速审核</div>
            </div>
          </div>
          <div class="point ponit-3 flex active">
            <div class="arrow">
              <img :src="imgs.arrow">
            </div>
            <div class="dom column">
              <img :src="imgs.p3"
                   alt="">
              <div class="txt">精心搭配</div>
            </div>
            <div class="meng"
                 v-if="!(status!=3&&status>1||status==0)"></div>
          </div>
          <div class="point ponit-4 flex active">
            <div class="arrow">
              <img :src="imgs.arrow">
            </div>
            <div class="dom column">
              <img :src="imgs.p4"
                   alt="">
              <div class="txt">专程配送</div>
            </div>
            <div class="meng"
                 v-if="!(status>4||status==0)"></div>
          </div>
          <div class="point ponit-5 flex active">
            <div class="arrow">
              <img :src="imgs.arrow">
            </div>
            <div class="dom column">
              <img :src="imgs.p5"
                   alt="">
              <div class="txt">挑选心仪</div>
            </div>
            <div class="meng"
                 v-if="!(status>5||status==0)"></div>
          </div>
        </div>
        <div class="progress-content">
          <div v-if="status==1"
               class="main-wrap">
            <h2>审核中</h2>
            <h3>{{detailInfo.initContent.title}}</h3>
            <p>{{detailInfo.initContent.content}}</p>
          </div>
          <div v-if="status==3"
               class="main-wrap">
            <h2>审核未通过</h2>
            <p>{{detailInfo.remark?detailInfo.remark:''}}</p>
            <div class="go-reach-home">
              <img :src="imgs.goReachHomeImg"
                   @click="goReachHome">
            </div>
          </div>
          <div v-if="status==2"
               class="main-wrap main-wrap-load main-match">
            <h2>搭配中</h2>
            <ul>
              <li class="flex"
                  :class="{active:(timestamp>=new Date(v.time.replace(/-/g,'/')).getTime())}"
                  v-for="(v) in detailInfo.matchContent"
                  :key="v.time">
                <div class="time  column"
                     :class="{active:(timestamp>=new Date(v.time.replace(/-/g,'/')).getTime())}">
                  <span>{{v.time.slice(5,10)}}</span>
                  <span>{{v.time.slice(11,16)}}</span>
                </div>
                <i></i>
                <div class="desc">{{v.content}}</div>
                <span class="o"></span>
              </li>
            </ul>
          </div>
          <div v-if="status==5"
               class="main-wrap main-wrap-load main-load">
            <h2>配送中</h2>
            <ul>
              <li class="flex"
                  :class="{active:(timestamp>=new Date(v.time.replace(/-/g,'/')).getTime())}"
                  v-for="(v) in detailInfo.deliveryContent"
                  :key="v.time">
                <div class="time  column"
                     :class="{active:(timestamp>=new Date(v.time.replace(/-/g,'/')).getTime())}">
                  <span>{{v.time.slice(5,10)}}</span>
                  <span>{{v.time.slice(11,16)}}</span>
                </div>
                <i></i>
                <div class="desc">{{v.content}}</div>
                <span class="o"></span>
              </li>
            </ul>
          </div>
          <div v-if="status==6"
               class="main-wrap main-wrap-3">
            <h2>挑选心仪</h2>
            <h3>专属穿搭已到家,赶紧来挑选</h3>
            <p>专属穿搭已到家,请选择商品下单</p>
          </div>
          <div v-if="status==7"
               class="main-wrap main-wrap-4">
            <h2>挑选完成</h2>
            <h3>心仪商品挑选完毕</h3>
            <p>未购买商品，将有人员联系上门取回</p>
            <div @click="feeback"
                 class="feeback"
                 v-show="(detailInfo.unPurchaseProductContent.length > 0 && detailInfo.commentStatus == 0&&status!=8)">
              <img :src="imgs.feeback" />
            </div>
            <!-- <div class="again">
              <img :src="imgs.again">
            </div> -->
          </div>
          <div v-if="status==8"
               class="main-wrap main-wrap-4">
            <h2>挑选完成</h2>
            <h3>心仪商品挑选完毕</h3>
          </div>
        </div>
      </div>
      <div class="prolist"
           v-if="status==6">
        <div class="bg"></div>
        <ul>
          <li class="flex"
              @click="proClick(i)"
              :class="{active:v.active==true}"
              v-for="(v,i) in detailInfo.productContent"
              :key="v.id">
            <div class="select flex fcenter">
              <span class="o"
                    v-show="v.active==false"></span>
              <img :src="imgs.select"
                   v-show="v.active==true">
            </div>
            <div class="main flex">
              <img :src="imgs.defPro">
              <div class="pros column">
                <p class="ellipsis">{{v.productName}}</p>
                <div class="flex attr">
                  <span>尺码：{{v.size?v.size:'均码'}}</span>
                </div>
                <div class="price">￥{{v.commodityPrice}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="foot"
         v-if="status==6">
      <div class="fot1">
        <span>剩余</span>
        <van-count-down style="color:red;display:inline-block;"
                        :time="endTime"
                        class="time"
                        format="HH:mm:ss" />
        <span>未下单商品将有人员联系上门回收</span>
      </div>
      <div class="fot2 flex">
        <span class="count">合计:￥{{count}}</span>
        <div class="buy"
             @click="buy">下单购买</div>
      </div>
    </div>
    <div class="mask flex fcenter"
         v-show="maskShow==true">
      <div class="alert">
        <p class="title">您还有订单未支付</p>
        <div class="go-pay flex fcenter"
             @click="goPay"><span>去支付</span></div>
      </div>
    </div>
  </div>

</template>

<script>
import { isInApp, getAppInfo, add, sub } from '@/utils/index.js'
import { appUrl } from '@/utils/config.js'
export default {
  name: 'progress',
  data () {
    return {
      isApp: isInApp(),
      imgs: {
        bg: require('@/images/reachHome/bg.png'),
        p1: require('@/images/reachHome/p1.png'),
        p2: require('@/images/reachHome/p2.png'),
        p3: require('@/images/reachHome/p3.png'),
        p4: require('@/images/reachHome/p4.png'),
        p5: require('@/images/reachHome/p5.png'),
        arrow: require('@/images/reachHome/arrow.png'),
        feeback: require('@/images/reachHome/feeback.png'),
        again: require('@/images/reachHome/again.png'),
        select: require('@/images/reachHome/select.png'),
        defPro: require('@/images/reachHome/def-pro.png'),
        feeback: require('@/images/reachHome/feeback.png'),
        goReachHomeImg: require('@/images/reachHome/go-reach-home.png'),
      },
      maskShow: false,
      status: 0,
      detailInfo: null,
      wishOrderId: null,
      orderId: null,
      timer: null,
      addressId: 0,
      count: 0,
      proSelectd: [],
      endTime: 0,
      timestamp: new Date().getTime()
    };
  },
  created () {
    this.init();
  },
  methods: {
    async init () {
      this.$api.reachHome.getWishOrderStatus({}).then(res => {
        this.wishOrderId = res.wishOrderId;
        this.addressId = res.addressId;
        if (res.status == 6) {
          this.endTime = (new Date(res.deliveryTime.replace(/-/g, '/')).getTime() + 24 * 60 * 60 * 1000) - new Date().getTime();
          res.productContent.map(item => item.active = false);
          this.getWishOrder();
        }
        this.status = res.status;
        this.detailInfo = res;
      })
    },
    goReachHome () {
      if (this.isApp) {
        window.hpcapi.openRouter(`${appUrl}reachHomeIndex`)
      } else {
        this.$router.push({ path: '/reachHomeIndex' })
      }
    },
    proClick (i) {
      this.detailInfo.productContent[i].active = !this.detailInfo.productContent[i].active;
      if (this.detailInfo.productContent[i].active == true) {
        this.proSelectd.push(this.detailInfo.productContent[i]);
        this.count = add(this.count, this.detailInfo.productContent[i].commodityPrice)
      } else {
        this.proSelectd.splice(i, 1);
        this.count = sub(this.count, this.detailInfo.productContent[i].commodityPrice)
      }
    },
    getWishOrder () {
      this.$api.reachHome.getWishOrder({ wishOrderId: this.wishOrderId }).then(res => {
        if (!!res) {
          // 存在使用id储存
          this.orderId = res.id;
          this.maskShow = true;
        }
      })
    },
    buy () {
      if (this.proSelectd.length == 0) {
        this.$toast('请选择商品!');
        return
      }
      this.$api.reachHome.getWishOrder({ wishOrderId: this.wishOrderId }).then(res => {
        if (!!res) {
          // 存在使用id储存
          this.orderId = res.id;
          this.maskShow = true;
        } else {
          this.newOrder();
        }
      })
    },
    // 生成订单id后掉起支付
    newOrder () {
      let cartItems = [];
      this.proSelectd.forEach(function (v, i) {
        let obj = {};
        obj.cartId = '';
        obj.quantity = 1;
        obj.skuId = v.skuId;
        cartItems.push(obj);
      });
      this.$api.reachHome.createOrder({
        addressId: this.addressId,//收货地址
        cartItems: cartItems,
        deliverType: 1, //送货上门默认1
        payAmount: this.count, //总金额
        orderType: 2,  //默认2 心愿单
        type: 2, //默认2 立即购买
        wishOrderId: this.wishOrderId//'心愿单id'
      }).then(res => {
        // 生成订单 返回orderid
        this.orderId = res.orderId;
        this.wiXiPay();
      })
    },
    wiXiPay () {
      this.$api.reachHome.wiXiPay({ orderId: this.orderId }).then(res => {
        let requestData = JSON.stringify({
          channelType: 0,
          map: res.map
        })
        window.hpcapi.openWXPay(requestData)
      })
    },
    goPay () {
      this.wiXiPay();
    },
    feeback () {
      window.hpcapi.openRouter(`${appUrl}feeback`);
    }
  },
  components: {

  },
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}
input {
  outline: none;
}
img {
  display: block;
  width: 100%;
}
.column {
  display: flex;
  flex-direction: column;
}
.fcenter {
  justify-content: center;
  align-items: center;
}
.pcenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
html,
body {
  height: 100%;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.container {
  height: 100%;
}
.reach-wrap {
  flex: 1;
  overflow: hidden;
  overflow-y: scroll;
}
.reach-top {
  width: 100%;
  height: 770px;
  position: relative;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
  }
}
.reach-top .title {
  position: absolute;
  width: 306px;
  height: 68px;
  background-color: #602a8e;
  border-radius: 33px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 34px;
  justify-content: center;
  align-items: center;
}
.reach-top .title .o1 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: white;
  margin: 0 4px;
}
.reach-top .title .o2 {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: white;
}
.reach-top .title .o3 {
  font-size: 32px;
  color: white;
  margin: 0 8px;
  margin-bottom: 2px;
}
.main-content {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.main-content .progress {
  justify-content: center;
  align-items: center;
  height: 200px;
  margin-top: 50px;
  .arrow {
    padding-left: 10px;
    padding-right: 5px;
    img {
      width: 32px;
      height: 28px;
      margin-top: 40px;
    }
  }
}
.main-content .progress .point .meng {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
}
.main-content .progress .point {
  position: relative;
}
.main-content .progress .point .dom {
  align-items: center;
}
.main-content .progress .point .dom .txt {
  margin-top: 10px;
  font-size: 22px;
  color: #602a8e;
}
.main-content .progress .point .dom img {
  width: 100px;
}
.progress-content {
  padding: 0 24px 40px;
  .main-wrap {
    ul {
      margin-top: 20px;
    }
  }
}
.main-wrap {
  background-color: #ffe631;
  position: relative;
  padding: 36px 40px;
  border-radius: 6px;
}

.main-wrap h2 {
  font-size: 40px;
}
.main-wrap h3 {
  font-size: 30px;
  color: #333333;
  letter-spacing: 1px;
  margin-top: 30px;
}
.main-wrap p {
  font-size: 28px;
  color: #555;
  margin-top: 15px;
}
/* 心仪完成 */
.main-wrap-4 {
  width: 702px;
  height: 373px;
}
.main-wrap-4 .again {
  position: absolute;
  right: 35px;
  bottom: 35px;
}
.main-wrap-4 .again img {
  width: 184px;
}

.main-wrap-4 .feeback {
  position: absolute;
  right: 35px;
  bottom: 35px;
}
.main-wrap-4 .feeback img {
  width: 184px;
}
.main-wrap:nth-child(1),
.main-wrap:nth-child(2) {
  position: relative;
  padding: 40px;
  border-radius: 20px;
  h2 {
    height: 56px;
    line-height: 56px;
    margin-bottom: 26px;
  }
  h3 {
    font-size: 32px;
    line-height: 45px;
    height: 45px;
    letter-spacing: 1px;
    margin-bottom: 14px;
  }
  p {
    font-size: 28px;
    font-weight: 400;
    color: #333333;
    line-height: 40px;
  }
  .go-reach-home {
    height: 100px;
    position: relative;
    img {
      width: 187px;
      height: 78px;
      position: absolute;
      right: -3px;
      bottom: -6px;
    }
  }
}
/* main-wrap-load */
.main-wrap-load ul li {
  align-items: center;
  padding: 20px 0;
  position: relative;
}
.main-wrap-load ul li.active .o {
  background-color: #602a8e;
}
.main-wrap-load ul li.active .desc {
  color: #333;
}
.main-wrap-load ul li .time {
  width: 100px;
  font-size: 24px;
  color: #333333;
}
.main-wrap-load ul li .time span {
  color: #ffe631;
}
.main-wrap-load ul li .time.active span {
  color: #333;
}
.main-wrap-load ul li .desc {
  align-items: center;
  width: 500px;
  padding-left: 50px;
  font-size: 28px;
  color: #666;
}
.main-wrap-load ul li i {
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: #602a8e;
  left: 100px;
}
.main-wrap-load ul li:first-child i {
  height: 50%;
  top: 50%;
}
.main-wrap-load ul li:last-child i {
  height: 50%;
  bottom: 50%;
}
.main-wrap-load ul li .o {
  width: 28px;
  height: 28px;
  border: 1px solid #602a8e;
  background-color: #ffe631;
  border-radius: 50%;
  position: absolute;
  left: 86px;
}
/* 商品 */
.prolist .bg {
  height: 10px;
  background-color: #f5f5f5;
}
.prolist li {
  height: 227px;
  align-items: center;
}
.prolist li .select {
  height: 100%;
  width: 100px;
}
.prolist li .select img {
  width: 50px;
  height: 50px;
}
.prolist li .select .o {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid #888;
}
.prolist li .main {
  width: 630px;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
}
.prolist li .main img {
  width: 178px;
  height: 178px;
}
.prolist li .main .pros {
  height: 100%;
  width: 430px;
  padding-top: 42px;
  padding-bottom: 42px;
  justify-content: space-between;
}
.prolist li .main .pros p {
  font-size: 32px;
  color: #333333;
}
.prolist li .main .pros .attr {
  font-size: 24px;
  color: #848484;
}
.prolist li .main .pros .price {
  font-size: 32px;
  color: #ff2f51;
}

/* -- */
.foot .fot1 {
  background-color: #fff7c1;
  height: 84px;
  line-height: 84px;
  font-size: 26px;
  color: #333333;
  padding-left: 50px;
}
.foot .fot2 {
  height: 120px;
  align-items: center;
  padding: 0 50px;
  justify-content: space-between;
}
.foot .fot2 .count {
  font-size: 30px;
}
.foot .fot2 .buy {
  font-size: 30px;
  width: 196px;
  height: 80px;
  border-radius: 40px;
  line-height: 80px;
  background-color: #ffe631;
  text-align: center;
}
/* -- */
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
}
.mask .alert {
  width: 630px;
  height: 348px;
  background: #ffffff;
  border-radius: 24px;
}
.mask .alert .title {
  height: 48px;
  margin-top: 100px;
  margin-bottom: 92px;
  font-size: 34px;
  text-align: center;
  font-weight: bold;
}
.mask .alert .go-pay {
  width: 400px;
  height: 68px;
  background: #ffe631;
  border-radius: 32px;
  font-size: initial;
  margin: 0 auto;
  span {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 2px;
  }
}
</style>
