<template>
  <div class="product">
    <div v-if="isApp==null&&isAndroid==true"
         @click="openApp"
         class="open-app open" style="font-size:12px;height:30px;line-height:30px">打开APP</div>
    <div v-if="isApp==null&&isIOS9==true"
         @click="gotoSharePage"
         class="open-app open" style="font-size:12px;height:30px;line-height:30px">打开APP</div>
    <div v-if="isApp==null"
         class="download-app download"
         @click="downloadApp" style="font-size:12px;height:30px;line-height:30px">下载APP</div>
    <div v-if="isWx"
         class="download-app download" style="top:2.8rem;height:30px;line-height:30px">
        <wx-open-launch-weapp
          id="launch-btn"
          @error="launchAppError"
          @launch="launchAppLaunch"
          @ready="launchAppReady"
          username="gh_846bc6fe28be"	
          style="display:block;width:100%;height:100%;"
          :path="'pages/shopDetail/shopDetail.html?source=h5&id='+spuId">
          <script type="text/wxtag-template" style="font-size:37.5px">
              <style>.btn{text-align:center;width:100%;height:100%;color:#fff;line-height:30px}</style>                              
              <div class="btn"><span style="font-size:12px">打开小程序</span></div>
          </script>
        </wx-open-launch-weapp>
    </div>
    <!--   -->
    <div v-if="!!isApp&&newVersion==true"
         class="header"
         :style="{background:headerBg,paddingTop:statusBarHeight}">
      <van-nav-bar>
        <template #left>
          <div class="icon flex center"
               @click="openPreviousPage">
            <img :src="common.backImg"
                 alt="返回" />
          </div>
        </template>
        <template #title>
          <div class="page-title  text-warp"
               :class="{'page-title-right':msgShow==true}"
               v-show="navIsShow==true">{{title}}</div>
        </template>
        <template #right>
          <div class="icon flex center msg"
               @click="goMsg"
               v-if="msgShow==true">
            <img :src="common.msgImg"
                 alt="消息" />
            <div v-if="isShowMsg==true"
                 class="dot"></div>
          </div>
          <div class="icon flex center"
               @click="showShore">
            <img :src="common.shareImg"
                 alt="分享" />
          </div>
        </template>
      </van-nav-bar>
      <div class="flex nav"
           v-show="navIsShow==true">
        <div class="flex center"
             :class="{'nav-active':titleActive==index}"
             v-for="(item,index) in titles"
             :key="item+index"
             @click="titleIndex(index)">{{item.text}}</div>
      </div>
    </div>
    <div class="swiper">
      <van-swipe class="swiper"
                 @change="onChange"
                 :touchable="isStock==false&&isStatus==false">
        <van-swipe-item v-for="(item,index) in bannerList"
                        :key="item+index"
                        @touchstart="touchstart"
                        @touchend="touchend"
                        @touchmove="touchmove">
          <van-image :show-loading="false"
                     fit="cover"
                     :src="item"
                     class="swipe-img" />
        </van-swipe-item>
        <div class="custom-indicator flex center"
             slot="indicator">{{current + 1}}/{{bannerList.length}}</div>
        <span class="sell-out"
              v-if="isStock==true">
          <img :src="common.isStockImg" />
        </span>
        <span class="sold-out"
              v-if="isStatus==true">
          <img :src="common.isStatusImg" />
        </span>
      </van-swipe>
    </div>
    <!-- 基础信息 -->
    <div class="detail-info">
      <p class="detail-info-top flex">
        <span>¥</span>
        <strong>{{info.salePrice}}</strong>
        <span v-if="info.memberPrice!=''"
              class="member-price"><b>¥</b>{{info.memberPrice}}</span>
        <img v-if="info.memberPrice!=''"
             class="member-icon"
             :src="common.memberIconImg" />
      </p>
      <p class="original-price" v-if="info.originalPrice > 0">
        <span><b>¥</b>{{info.originalPrice}}</span>
      </p>
      <h2 class="detail-info-title"
          v-longpress="copyBrandName">{{info.title}}</h2>
      <!--  荟员 -->
      <div class="member"
           @click="openMember"
           v-if="isMember==0">
        <img :src="common.memberImg"
             alt="会员" />
      </div>
      <div class="info-icon flex between">
        <div class="info-icon-item"
             v-for="(item) in infoList"
             :key="item.text">
          <div>
            <img :src="item.icon" />
          </div>
          <p>{{item.text}}</p>
        </div>
      </div>
    </div>
    <!-- 选择sku -->
    <div class="select-sku flex between"
         @click="addCart">
      <span>选择</span>
      <div class="right flex between text-warp">
        <span :class="{marginTop:isAndroid}">{{isSelectedText?skuData.selectedText:"请选择“规格”"}}</span>
        <img class="navigation-brand"
             src="../../images/productDetail/jiantou.png"
             alt="箭头" />
      </div>
    </div>
    <!-- 品牌信息/订阅 -->
    <div class="brand-info"
         v-if="brandinfo.isShow==true">
      <div class="cart flex">
        <div class="left">
          <img :src="brandinfo.logoImage" />
        </div>
        <div class="right">
          <h2 class="text-warp">{{brandinfo.activeName}}</h2>
          <p class="content text-warp">{{brandinfo.content}}</p>
          <div class="bottom flex">
            <!-- <img class="time-end"
                 :src="common.timeEndImg"
                 alt="距结束" /> -->
            <van-count-down :time="brandinfo.brandEndTime">
              <template v-slot="timeData">
                <span class="block flex center">{{ timeData.days }}</span>
                <span class="colon flex center">天</span>
                <span class="block flex center">{{ timeData.hours }}</span>
                <span class="colon flex center">时</span>
                <span class="block flex center">{{ timeData.minutes }}</span>
                <span class="colon flex center">分</span>
                <span class="block flex center">{{ timeData.seconds }}</span>
                <span class="colon flex center">秒</span>
              </template>
            </van-count-down>
          </div>
          <div class="go-brand flex center"
               @click="navigationBrand">
            <span>进入专场</span>
            <img class="navigation-brand"
                 src="../../images/productDetail/jiantou.png"
                 alt="箭头" />
          </div>
        </div>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="pro-detail">
      <div class="common-header">
        <img :src="common.xianImg" />
        <h2>商品详情</h2>
        <img :src="common.xianImg" />
      </div>
      <div class="pro-imgs">
        <img v-for="(item,index) in detailImgs"
             :key="item+index"
             v-lazy="item"
             @touchstart="touchstart"
             @touchend="touchend"
             @touchmove="touchmove" />
      </div>
    </div>
    <!-- 购买须知/价格说明/其他说明模块 -->
    <div class="notice notice-desc"
         v-if="isOpenNotes==true">
      <div class="common-header">
        <img :src="common.xianImg" />
        <h2>购买须知</h2>
        <img :src="common.xianImg" />
      </div>
      <div class="notice-info">
        <dl v-for="(item) in prodata.purchaseDesc1"
            :key="item.title">
          <dt>
            <h2>{{item.title}}</h2>
          </dt>
          <dd v-if="item.value.indexOf('4008215076')>-1">
            <p>
              <span>
                {{item.value.slice(1,item.value.length-10)}}
                <a :href="'tel:'+item.value.slice(item.value.length-10,item.value.length)"
                   style="color:#409EFF;">{{item.value.slice(item.value.length-10)}}</a>
              </span>
            </p>
          </dd>
          <dd v-if="item.value.indexOf('4008215076') == -1">
            <p>{{item.value}}</p>
          </dd>
        </dl>
      </div>
    </div>
    <div class="notice price-desc"
         v-if="isOpenPrice==true">
      <div class="common-header">
        <img :src="common.xianImg" />
        <h2>价格说明</h2>
        <img :src="common.xianImg" />
      </div>
      <div class="notice-info price-description">
        <dl v-for="(item) in prodata.purchaseDesc2"
            :key="item.title">
          <dt>
            <h2>{{item.title}}</h2>
          </dt>
          <dd>
            <p>{{item.value}}</p>
          </dd>
        </dl>
      </div>
    </div>
    <!-- 货架精选 -->
    <recommend-list></recommend-list>
    <!-- footer   -->
    <div class="footer flex"
         v-if="!!isApp">
      <div class="left">
        <div class="kefu footer-item"
             @click="kefuClcik">
          <div>
            <img src="../../images/productDetail/kefu.png"
                 alt="客服"
                 class="kefu-img" />
          </div>
          <p>客服</p>
        </div>
        <div class="gouwuche footer-item"
             @click="cartList">
          <div>
            <img src="../../images/productDetail/shopping-cart.png"
                 alt="购物车"
                 class="gouwuche-img" />
          </div>
          <p>购物车</p>
          <span class="num flex center"
                v-show="cartNum!=0">{{cartNum}}</span>
        </div>
      </div>
      <div class="btn-group">
        <div class="join-cart flex center"
             :class="{'disabled':this.isStock===true ||this.isStatus===true }"
             @click="addCart">
          <span>加入购物车</span>
        </div>
        <!-- <div class="buy"
             :class="{'disabled':this.isStock===true ||this.isStatus===true}"
        @click="buy">立即购买</div>-->
      </div>
    </div>
    <div class="footer footer1" v-if="isWx">
      <wx-open-launch-weapp
          id="launch-btn"
          @error="launchAppError"
          @launch="launchAppLaunch"
          @ready="launchAppReady"
          username="gh_846bc6fe28be"	
          style="display:block; width:100%;height:100%;"
          :path="'pages/shopDetail/shopDetail.html?source=h5&id='+spuId">
          <script type="text/wxtag-template">
              <style>.btn{ text-align:center;width:100%;height:60px;border-radius:30px;background-color:rgba(255,224,2,1);color:#000;text-align:center;line-height:60px; }</style>                              
              <div class="btn">加入购物车</div>
          </script>
      </wx-open-launch-weapp>
    </div>
    <div class="footer-void"></div>
    <van-sku v-model="skuShow"
             style="height:auto"
             class="pro-sku"
             :sku="skuData.sku"
             :close-on-click-overlay="true"
             :quota="skuData.quota"
             :preview-on-click-image="false"
             :initial-sku="skuData.initialSku"
             @buy-clicked="onBuyClicked"
             @sku-selected="skuSelected">
      <!-- 自定义 sku-header-price -->
      <template #sku-header>
        <div class="header-top flex">
          <div class="left">
            <img :src="skuData.selectedItem.image+common.skuOss"
                 alt="商品图" />
          </div>
          <div class="right">
            <h2 class="price">
              <span>¥{{skuData.selectedItem.salePrice}}</span>
            </h2>
            <div class="stock">
              剩余
              <span>{{skuData.selectedItem.stock}}</span>
              {{skuData.selectedItem.specUnit}}
            </div>
            <div class="text text-warp">{{skuData.selectedText}}</div>
          </div>
        </div>
      </template>
      <template #sku-stepper>
        <div class="step-group flex between">
          <h2>数量</h2>
          <div class="step flex between">
            <div class="left icon"
                 @click="delNum">
              <img :src="common.jianImg"
                   alt="减" />
            </div>
            <div class="num flex center">{{skuData.stepNum}}</div>
            <div class="right icon"
                 @click="addNum">
              <img :src="common.addImg"
                   alt="加" />
            </div>
          </div>
        </div>
      </template>
      <template #sku-messages>
        <span></span>
      </template>
      <!-- 自定义 sku actions -->
      <template #sku-actions="props">
        <div class="addCart"
             @click="props.skuEventBus.$emit('sku:buy')"><span :class="{marginTop:isAndroid}">确认</span></div>
      </template>
    </van-sku>
    <p class="footer-text">--仓主，没有更多了--</p>
    <toTop />
  </div>
</template>
<script>
import {
  getUrlParameter,
  isInApp,
  isInteger,
  getAppInfo,
  mul,
  compareVersion
} from "@/utils/index.js";
import {
  downloadApp,
  detectVersion,
  openApp,
  gotoSharePage,
  sharePage,
  VersionDiff,
} from "@/utils/native.js";
import { appid , pageUrl, appUrl } from "@/utils/config.js";
import toTop from "@/components/toTop/toTop.vue";
import recommendList from "@/components/recommendList/index.vue";
var wx = require("weixin-js-sdk");
const prodata = {
  purchaseDesc1: [
    {
      title: "温馨提示",
      value: "支持七天无理由退货（贴身衣物及特殊商品除外）",
    },
    {
      title: "说明",
      value:
        "按照下单顺序发货，默认中通快递。退换货请先联系客服索要地址及其他信息，非质量问题退换将由买家承担运费。产品咨询售后需求请添加企业微信（见首页公告）或电话：4008215076",
    },
  ],
  purchaseDesc2: [
    {
      title: "划线价格",
      value:
        "商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，品牌专柜价、商品吊牌价等可能会与您购物时展示的不一致，仅供参考。",
    },
    {
      title: "销售价",
      value:
        "商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。",
    },
    {
      title: "折扣",
      value:
        "如无特殊说明，折扣在划线价（如品牌专柜价、商品吊牌价、厂商指导价、厂商建议零售价）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系客服进行咨询。",
    },
    {
      title: "促销信息",
      value:
        "详情页（含主图）以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。如有异常，您可在购买前联系客服进行咨询。",
    },
  ],
};
export default {
  name: "productDetail",
  components: {
    toTop,
    recommendList,
  },
  props: {},
  data () {
    return {
      spuId:'',
      isWx:false,
      isShowMsg: false, //是否有未读消息
      newVersion: true,
      infoList: [
        {
          text: "100%正品",
          icon: require("../../images/productDetail/info-zhengp.png"),
        },
        {
          text: "38元免邮",
          icon: require("../../images/productDetail/info-baoyou.png"),
        },
        {
          text: "退货无忧",
          icon: require("../../images/productDetail/info-7.png"),
        },
        {
          text: "荟员9折",
          icon: require("../../images/productDetail/info-j.png"),
        },
      ],
      // 顶部滚动跟随
      title: "商品详情",
      titles: [],
      titleActive: 0,
      scrollArr: [],
      navIsShow: false, // 顶部点击锚点dom
      isSelectedText: false, // 同步sku提示
      headerBg: "rgba(255, 255, 255, 0)",
      skuShow: false,
      skuData: {
        sku: {
          tree: [],
          list: [],
        },
        quota: 0,
        initialSku: {
          picture: "",
        },
        selectedItem: {
          image: "",
          price: "",
          stock_num: 0,
        },
        stepNum: 1,
        selectedText: `请选择 ${this.specColourName} ${this.specSizeName}`,
      },
      common: {
        backImg: require("@/images/productDetail/back.png"),
        shareImg: require("@/images/productDetail/share.gif"),
        msgImg: require("@/images/productDetail/msg.png"),
        // memberImg: require("@/images/productDetail/member.gif"),
        memberImg: require("@/images/productDetail/member2.png"),
        memberIconImg: require("@/images/productDetail/member-icon.png"),
        xianImg: require("@/images/productDetail/xian.png"),
        timeEndImg: require("@/images/productDetail/jujies.png"),
        defaultImg: require("@/images/productDetail/bg.png"),
        jianImg: require("@/images/productDetail/jian.png"),
        addImg: require("@/images/productDetail/add.png"),
        isStockImg: require("@/images/productDetail/sj.png"),
        isStatusImg: require("@/images/productDetail/xj.png"),
        proOss: "?x-oss-process=image/resize,m_lfit,h_360,w_360",
        skuOss: "?x-oss-process=image/resize,m_lfit,h_160,w_160",
        text: "请前往app!",
      },
      isAndroid: !!detectVersion().isAndroid,
      isIOS9: !!detectVersion().isIOS9,
      isApp: isInApp(),
      loginType:
        getAppInfo() != null ? (getAppInfo().sign ? true : false) : false,
      statusBarHeight:
        getAppInfo() != null
          ? getAppInfo().statusBarHeight
            ? `${getAppInfo().statusBarHeight}px`
            : 0
          : 0,
      isMember:
        getAppInfo() != null ? (getAppInfo().isPayMember == 1 ? 1 : 0) : 0,
      prodata: prodata,
      // 轮播
      bannerList: [],
      current: 0,
      // 是否上架 已售罄
      isStock: false,
      isStatus: false,
      // 基础信息
      info: {
        salePrice: "",
        originalPrice: "",
        title: "",
      },
      // sku信息
      limitNum: 0, //限购数量
      sku: {
        dataNew: [],
        currentSkuList: [],
        allSpecsList: [],
        skuData: null,
      },
      // 是否展示单独sku颜色/尺码
      isColor: false,
      specColourName: '', //颜色尺码名字
      specSizeName: '',
      isSize: false,
      // 品牌信息
      brandinfo: {
        isShow: true,
        activityId: "",
        brandEndTime: null,
        logoImage: "",
        activeName: "",
        content: "",
      },
      // 商品详情
      detailImgs: [],
      // 购买须知 价格说明是否展示
      isOpenNotes: true,
      isOpenPrice: true,
      // 购物车数量
      cartNum: 0,
      // 结束时间
      lastSendTime: 0
    };
  },
  computed: {
    msgShow () {//是否为有消息版本App状态
      if (this.isApp) {
        const version = getAppInfo().version;
        return compareVersion(version, '1.6.8') > -1;
      }
      return false
    }
  },
  created () {
    this.spuId = this.$route.query.id || getUrlParameter("id") || "1333329554754166785";
    this.oldVersionDiff();
    if (this.isApp && this.loginType) {
      // this.userInfoAll = JSON.parse(window.hpcapi.systemInfo()).userInfo;
      // this.userInfoNick = JSON.parse(window.hpcapi.systemInfo()).userInfo.nickName;
      const version = getAppInfo().version;
      if (compareVersion(version, '1.6.8') > -1) {
        this.getMsg();
      }
    }
    
  },
  mounted () {
    this._initData();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed () {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {},
  methods: {
    isWxClient(){//在微信内部 - 判断
        return new Promise((resolve,reject)=>{
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
              resolve()
            }
        })
    },
    wechatSignature(){//签名注册
        this.$api.userMembers.getWechatSignature({
          appid: appid,
          signatureURL: window.location.href,
        }).then((res) => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appid, // 必填，公众号的唯一标识
                timestamp: res.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.noncestr, // 必填，生成签名的随机串
                signature: res.signature, // 必填，签名
                jsApiList: [
                    "checkJsApi",
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "onMenuShareQQ",
                    "onMenuShareWeibo",
                ], // 必填，需要使用的JS接口列表
                openTagList:[
                    "wx-open-launch-weapp",
                ]
            });
            this.wxsharePage();
        });
    },
    wxsharePage(){//h5分享配置 + app打开小程序配置
      wx.ready(function () {
          let shareData = {
              linkUrl:window.location.href,
              title:this.info.title,
              desc:"线上也能逛了,有多便宜自己看!",
              shareImage: this.bannerList[0]
          };
          wx.onMenuShareAppMessage({//分享给朋友
              title:shareData.title,
              desc:shareData.desc,
              link:shareData.linkUrl,
              imgUrl:shareData.shareImage,
              success: function (res) {
              },
              cancel: function (res) {
              },
              fail: function (res) {
              }
          });
          wx.onMenuShareTimeline({//分享给朋友圈
              title: shareData.title,
              desc: shareData.desc,
              link: shareData.linkUrl,
              imgUrl: shareData.shareImage,
              success: function (res) {
              },
              cancel: function (res) {
              },
              fail: function (res) {
              }
          });
          wx.onMenuShareQQ({// 分享到QQ
              title: shareData.title,
              desc: shareData.desc,
              link: shareData.linkUrl,
              imgUrl: shareData.shareImage,
              success: function (res) {
              },
              cancel: function (res) {
              },
              fail: function (res) {
              }
          });
          wx.onMenuShareQZone({// 分享到QQ空间
              title: shareData.title,
              desc: shareData.desc,
              link: shareData.linkUrl,
              imgUrl: shareData.shareImage,
              success: function (res) {
              },
              cancel: function (res) {
              },
              fail: function (res) {
              }
          });
          wx.onMenuShareWeibo({// 分享到QQ微博
              title: shareData.title,
              desc: shareData.desc,
              link: shareData.linkUrl,
              imgUrl: shareData.shareImage,
              success: function (res) {
              },
              cancel: function (res) {
              },
              fail: function (res) {
              }
          });
      });
      wx.error(function (res) {
          alert(res)
      });
    },
    launchAppError(){
        console.log(111)
    },
    launchAppLaunch(){
        console.log(222)
    },
    launchAppReady(){
        console.log(333)
    },
    getMsg () {
      this.$api.productDetail.isMsg({
        tag: true
      }).then(res => {
        this.isShowMsg = res.flag;
      })
    },
    goMsg () {
      if (this.isApp) {
        window.hpcapi.openRouter('hpcang://messageList');
      }
    },
    // 新老版本兼容
    oldVersionDiff () {
      if (this.isApp) {
        const version = getAppInfo().version;
        if (VersionDiff(version)) {
        } else {
          this.newVersion = false;
          const id = getUrlParameter("id") || this.$route.query.id;
          const url = `${appUrl}productDetail?id=${id}`;
          gotoSharePage(url);
          if (this.loginType) {
            this.$api.userMembers.getMemberByToken({}).then(
              (res) => {
                if (res.isPayMember) {
                  this.isMember = 1;
                } else {
                  this.isMember = 0;
                }
              },
              (e) => {
                this.isMember = 0;
              }
            );
          } else {
            this.isMember = 0;
          }
        }
      } else {
        this.isMember = 0;
      }
      if (this.isMember === 0) {
        let timer = setTimeout(() => {
          this.common.memberImg = require("@/images/productDetail/member.gif");
          clearTimeout(timer)
        }, 2500)
      }
    },
    throttle (fn) {
      let canRun = true; // 通过闭包保存一个标记
      return function () {
        if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
        canRun = false; // 立即设置为false
        setTimeout(() => {
          // 将外部传入的函数的执行放在setTimeout中
          fn.apply(this, arguments);
          // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
          canRun = true;
        }, 500);
      };
    },
    getScroll () {
      // 获取所有锚点元素
      const brand = this.$el.querySelector(".brand-info");
      const details = this.$el.querySelector(".pro-detail");
      const noticeDesc = this.$el.querySelector(".notice-desc");
      const priceDesc = this.$el.querySelector(".price-desc");
      this.titles = [
        {
          text: "品牌信息",
          isShow: !!brand,
        },
        {
          text: "商品详情",
          isShow: true,
        },
        {
          text: "购买须知",
          isShow: !!noticeDesc,
        },
        {
          text: "价格说明",
          isShow: !!priceDesc,
        },
      ].filter((item) => item.isShow == true);
      // 所有锚点元素的 offsetTop
      let scrollArr = [];
      !!brand && scrollArr.push(brand.offsetTop - 160);
      scrollArr.push(details.offsetTop - 140);
      !!noticeDesc && scrollArr.push(noticeDesc.offsetTop - 180);
      !!priceDesc && scrollArr.push(priceDesc.offsetTop - 180);
      this.scrollArr = scrollArr;
      return scrollArr;
    },
    handleScroll (el) {
      let scrollArr = this.getScroll();
      const length = 380; //渐变总距离
      // 获取当前文档流的 scrollTop
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let num = Number((scrollTop / (length / 100) / 100).toFixed(2));
      // 透明渐变
      if (scrollTop > length) {
        if (num != 1) {
          this.headerBg = "rgba(255, 255, 255,1)";
          this.navIsShow = true;
        }
      } else {
        if (scrollTop < 50) {
          this.headerBg = `rgba(255, 255, 255, 0)`;
          if (this.navIsShow) {
            this.navIsShow = false;
          }
        } else {
          if (scrollTop > 300) {
            if (!this.navIsShow) {
              this.navIsShow = true;
            }
          }
          this.headerBg = "rgba(255, 255, 255," + num + ")";
        }
      }
      // 定义当前点亮的导航下标
      let navIndex = 0;
      for (let n = 0; n < scrollArr.length; n++) {
        // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是 n 了
        if (scrollTop >= scrollArr[n]) {
          navIndex = n;
        }
      }
      // 把下标赋值给 vue 的 data
      this.titleActive = navIndex;
    },
    titleIndex (index) {
      this.titleActive = index;
      let scrollArr = this.getScroll();
      const targetOffsetTop = scrollArr[index];
      // 获取当前 offsetTop
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      document.body.scrollTop = scrollArr[index];
      document.documentElement.scrollTop = scrollArr[index];
      // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
      // const STEP = 50
      // // 定义往上滑函数
      // // 判断是往下滑还是往上滑
      // if (scrollTop > targetOffsetTop) {
      //   // 往上滑
      //   smoothUp()
      // } else {
      //   // 往下滑
      //   smoothDown()
      // }
      // // 定义往下滑函数
      // function smoothDown () {
      //   // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
      //   if (scrollTop < targetOffsetTop) {
      //     // 如果和目标相差距离大于等于 STEP 就跳 STEP
      //     // 否则直接跳到目标点，目标是为了防止跳过了。
      //     if (targetOffsetTop - scrollTop >= STEP) {
      //       scrollTop += STEP
      //     } else {
      //       scrollTop = targetOffsetTop
      //     }
      //     document.body.scrollTop = scrollTop
      //     document.documentElement.scrollTop = scrollTop
      //     // 屏幕在绘制下一帧时会回调传给 requestAnimationFrame 的函数
      //     // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
      //     requestAnimationFrame(smoothDown)
      //   }
      // }
      // function smoothUp () {
      //   if (scrollTop > targetOffsetTop) {
      //     if (scrollTop - targetOffsetTop >= STEP) {
      //       scrollTop -= STEP
      //     } else {
      //       scrollTop = targetOffsetTop
      //     }
      //     document.body.scrollTop = scrollTop
      //     document.documentElement.scrollTop = scrollTop
      //     requestAnimationFrame(smoothUp)
      //   }
      // }
    },

    _initData (id) {
      this._getProductDetailRequest(id).then(() => {
        this.getScroll();
        //-- 微信环境 签名 打开小程序
        this.isWxClient().then(()=>{//微信环境
          this.isWx = true;
          this.wechatSignature();
        })
      });
      this._getActiveInfo();
      this._getCartNum();
    },
    //长按复制
    copyBrandName () {
      let text = this.info.title;
      if (this.isApp) {
        window.hpcapi.clipboard(text);
      }
    },
    // 轮播
    onChange (index) {
      this.current = index;
    },
    // 倒计时结束
    timeEnd () {
      // this.brandinfo.isShow = false;
    },
    openApp () {
      const id = getUrlParameter('id');
      const url = `${appUrl}productDetail?id=${id}`
      openApp(url)
    },
    gotoSharePage () {
      const id = getUrlParameter('id');
      const url = `${appUrl}productDetail?id=${id}`
      gotoSharePage(url)
    },
    downloadApp () {
      downloadApp();
    },
    showShore () {
      const id = getUrlParameter('id');
      const url = `${appUrl}productDetail?id=${id}`;
      const path = '/pages/shopDetail/shopDetail?id='+id+'&source=app';
      sharePage({
        linkUrl: url,
        title: document.title,
        showShare: false,
        showAlert: true,
        path:path,
        shareImage:this.bannerList[0]
      });
      // sharePage({
      //   linkUrl: url,
      //   title: document.title,
      //   showShare: false,
      //   showAlert: true
      // });
    },
    //app内返回
    openPreviousPage () {
      if (this.isApp) {
        window.hpcapi.openPreviousPage();
      }
    },
    //跳转品牌
    navigationBrand () {
      if (this.isApp) {
        window.hpcapi.openRouter(
          "hpcang://activity?id=" + this.brandinfo.activityId
        );
      } else {
        this.$toast('请前往APP内打开!')
      }
    },
    // 跳转商品详情
    commidityDetail (id) {
      if (this.isApp) {
        window.hpcapi.openRouter(`${appUrl}productDetail?id=${id}`)
      } else {
        window.location.href = `${appUrl}productDetail?id=${id}`;
      }
    },
    // 跳转会员
    openMember () {
      if (this.isApp) {
        window.hpcapi.openRouter(appUrl);
      } else {
        window.location.href = appUrl;
      }
    },
    //客服
    kefuClcik () {
      if (this.isApp) {
        const version = getAppInfo().version;
        if (version >= "1.6.5") {
          window.hpcapi.openCustomerService(
            JSON.stringify({
              productSkuImage: this.bannerList[0],
              linkUrl: "/productDetail?id=" + getUrlParameter("id") || this.$route.query.id,
              type: "0",
              title: this.info.title,
              salePrice: this.info.salePrice == '' ? '' : `¥${this.info.salePrice}`,
              originalPrice: this.info.originalPrice == '' ? '' : `¥${this.info.originalPrice}`,
              memberPrice: this.info.memberPrice == '' ? '' : `¥${this.info.memberPrice}`,
            })
          );
        } else {
          window.hpcapi.openRouter("https://kefu.appurls.cn/api/mobileweb/home?channel_id=4005&channel_key=4005dwpc&wechatapp_id=68349&key=73604ana");
        }
        return;
      } else {
        this.$toast('请前往APP内打开!')
      }
    },
    // 购物车
    cartList () {
      this.navigationLogin();
      if (this.loginType) {
        window.hpcapi.openRouter("hpcang://shopCart");
        return;
      }
    },
    // 加入购物车
    addCart () {
      if (!this.isStock && !this.isStatus) {
        this.navigationLogin();
        if (this.loginType) {
          this.skuShow = true;
          if (!this.isSelectedText) {
            this.isSelectedText = true;
          }
        }
      }
      if (this.isApp == null) {
        this.$toast('请前往APP内打开!')
      }
    },
    navigationLogin () {
      if (!this.loginType && this.isApp) {
        //跳转原生登录方法
        window.hpcapi.openLogin();
      }
    },
    // 获取商品详情请求
    async _getProductDetailRequest (id) {
      // let requestData = {
      //   spuId:"1333329554754166785" || getUrlParameter("id") || this.$route.query.id,
      // };
      let requestData = {
        spuId:this.$route.query.id || getUrlParameter("id") || "1333329554754166785"
      };
      this.$api.productDetail
        .getProductDetail(requestData)
        .then((res) => {
          this.title = res.title;
          if (this.isApp) {
            window.hpcapi.setPageTitle(res.title);
          }
          document.title = res.title;
          // 轮播
          this.bannerList = JSON.parse(res.titleImage);
          // 是否上架 已售罄
          this.isStock = res.stock == 0 && res.status == 0;
          this.isStatus = res.status != 0;
          // sku
          this.limitNum = res.limitNum ? res.limitNum : 0;
          this.initSku(res.skuList, res);
          // 基础信息
          this.info = {
            salePrice:
              res.salePrice == undefined
                ? ""
                : isInteger(res.salePrice)
                  ? res.salePrice + ".0"
                  : res.salePrice,
            originalPrice:
              res.originalPrice == undefined
                ? ""
                : isInteger(res.originalPrice)
                  ? res.originalPrice + ".0"
                  : res.originalPrice,
            title: res.title == undefined ? "" : res.title,
            memberPrice:
              res.memberPrice == undefined
                ? ""
                : isInteger(res.memberPrice)
                  ? res.memberPrice + ".0"
                  : res.memberPrice,
          };
          // 商品详情
          this.detailImgs = JSON.parse(res.content);
          // 购买须知等是否展示
          if (res.isOpenNotes != undefined) {
            this.isOpenNotes = res.isOpenNotes == 1 ? true : false;
          }
          if (res.isOpenPrice != undefined) {
            this.isOpenPrice = res.isOpenPrice == 1 ? true : false;
          }
        })
        .catch((error) => {
          console.log("失败拉------", error);
        });
    },
    // 加入购物车
    onBuyClicked (data) {
      let currentTime = new Date().getTime();
      if ((currentTime - this.lastSendTime) < 1000) {
        return false;
      }
      this.lastSendTime = currentTime;
      let num = this.skuData.stepNum;
      let productSkuId = this.skuData.selectedItem.skuId;
      if (this.isColor && this.isSize) {
        productSkuId = data.selectedSkuComb.skuId;
      }
      let requestData = {
        productSkuId,
        purchaseQuantity: num,
      };
      this.$api.productDetail.addCart(requestData).then((res) => {
        // 重新获取购物车数量
        this._getCartNum().then(() => {
          this.$toast("加入购物车成功!");
          this.skuShow = false;
          this.skuData.stepNum = 1;
          window.hpcapi.updateShopCartNum();
        });
      });
    },
    skuSelected ({ skuValue, selectedSku, selectedSkuComb }) {
      if (selectedSku["valueId"] == "" && selectedSku["valueId2"] == "") {
        this.skuData.selectedText = `请选择 ${this.specColourName} ${this.specSizeName}`;
      } else if (selectedSku["valueId"] == "") {
        this.skuData.selectedText = `请选择  ${this.specColourName}`;
      } else if (selectedSku["valueId2"] == "") {
        this.skuData.selectedText = `请选择 ${this.specSizeName}`;
      }
      if (selectedSkuComb) {
        this.skuData.goods_info = selectedSkuComb;
        this.skuData.selectedItem = selectedSkuComb;
        this.skuData.stepNum = 1;
        if (selectedSku["valueId"] != "" && selectedSku["valueId2"] != "") {
          let color = selectedSkuComb.specColour == '-' ? '' : selectedSkuComb.specColour;
          let size = selectedSkuComb.specSize == '-' ? '' : selectedSkuComb.specSize;
          this.skuData.selectedText = `已选择 ${color} ${size}`;
        }
      }
    },
    //获取购物车数量
    async _getCartNum (fn) {
      if (this.loginType) {
        this.$api.productDetail.cartNum({}).then((res) => {
          let list = res.effectiveList;
          let num = list.length;
          this.cartNum = num;
          if (num > 99) {
            this.cartNum = 99;
          }
          if (num == 0) {
            this.cartNum = 0;
          }
        });
      }
    },
    // 获取品牌信息
    _getActiveInfo () {
      let requestData = {
        productSpuId: getUrlParameter("id") || this.$route.query.id,
      };
      this.$api.productDetail
        .activityDetail(requestData)
        .then((res) => {
          if (res != null) {
            let data = res.filter(function (item) {
              return item.activeType == 100;
            })[0]
              ? res.filter(function (item) {
                return item.activeType == 100;
              })[0]
              : [];
            if (data) {
              if (data.length == 0) {
                this.brandinfo.isShow = false;
                return;
              }
              if (Number(data.endTimeStr) - new Date().getTime() <= 0) {
                this.brandinfo.isShow = false;
                return;
              }
              this.brandinfo = {
                isShow: true,
                activityId: data.id,
                brandEndTime: Number(data.endTimeStr) - new Date().getTime(),
                logoImage: data.logoImage ? data.logoImage : common.defaultImg,
                activeName: data.activeName ? data.activeName : "",
                content: data.content ? data.content : "",
              };
            }
          } else {
            this.brandinfo.isShow = false;
          }
        })
        .catch((error) => {
          console.log("失败拉------", error);
        });
    },
    // 长按保存图片
    touchstart (e) {
      this.time = setTimeout(() => {
        const imgUrl = e.target.src;
        //此处是调用的APP得方法来保存图片，正常的H5项目是无法保存图片，除非我们项目创建时是移动APP项目
        if (this.isApp != null) {
          window.hpcapi.showMessage(
            JSON.stringify({
              type: "alert",
              message: imgUrl,
            })
          );
        }
      }, 2000);
    },
    touchend () {
      clearTimeout(this.time);
    },
    touchmove () {
      clearTimeout(this.time);
    },
    // sku加减
    addNum () {
      if (this.skuData.selectedText.indexOf("请选择") <= -1) {
        let stock = Number(this.skuData.selectedItem.stock);
        let buyNumMax = Number(this.limitNum);
        let num = this.skuData.stepNum;
        if (buyNumMax && num >= buyNumMax) {
          let tipText =
            stock > buyNumMax ? "该商品限购" + buyNumMax + "件" : "已超出库存上限啦";
          this.$toast(tipText);
          return;
        }
        if (num >= stock) {
          this.$toast("已超出库存上限啦!");
          return;
        }
        if (num > 0) {
          this.skuData.stepNum++;
        }
      } else {
        this.$toast(this.skuData.selectedText);
      }
    },
    delNum () {
      if (this.skuData.selectedText.indexOf("请选择") <= -1) {
        var num = this.skuData.stepNum;
        if (num <= 1) {
          this.$toast("该商品1件起售!");
          return;
        }
        if (num > 1) {
          this.skuData.stepNum--;
        }
      } else {
        this.$toast(this.skuData.selectedText);
      }
    },
    // sku生成
    initSku (data, res) {
      this._getCurrentSkuList(data);
      this._getAllSpecsList(data);
      this.sku.dataNew.map((item) => {
        item.stock_num = item.stock;
        item.price = Number(item.salePrice) * 100;
      });
      let initData = this.sku.dataNew.find((item) => item.stock > 0);
      this.skuData = {
        sku: {
          tree: this.sku.allSpecsList,
          list: this.sku.dataNew,
        },
        quota: res.limitNum,
        initialSku: {
          valueId: initData && initData.valueId,
          valueId2: initData && initData.valueId2,
        },
        selectedItem: {
          image: "",
          salePrice: res.salePrice,
          stock: res.stock,
        },
        stepNum: 1,
        selectedText: (this.isColor && this.isSize) ? '' : `请选择 ${this.specColourName} ${this.specSizeName}`,
      };
      if (this.isColor && this.isSize) {
        this.skuData.selectedItem.image = initData.image;
        this.skuData.selectedItem.salePrice = initData.salePrice;
        this.skuData.selectedItem.stock = initData.stock;
      }
    },
    _getCurrentSkuList (data) {
      var arrNew = JSON.parse(JSON.stringify(data));
      var valueId = 11,
        valueId2 = 999;
      this.isColor = arrNew.every(item => (item.specColour == '-' || item.specColour == ''));
      this.isSize = arrNew.every(item => (item.specSize == '-' || item.specSize == ''));
      this.specColourName = (arrNew[0].specColourName && arrNew[0].specColourName != '-') ? arrNew[0].specColourName : '颜色';
      this.specSizeName = (arrNew[0].specSizeName && arrNew[0].specSizeName != '-') ? arrNew[0].specSizeName : '尺码';
      this.sku.currentSkuList = [];

      arrNew.map((item) => {
        if (!this.isColor) {
          item.valueId = valueId;
          valueId++;
        }
        if (!this.isSize) {
          item.valueId2 = valueId2;
          valueId2++;
        }
      });
      arrNew = this.valueIdSort(arrNew, this.isColor, this.isSize);

      arrNew.forEach((item) => {
        this.sku.currentSkuList.push(this.getArrItem(item));
      });

      this.sku.dataNew = arrNew; //处理后的数据
      return this.currentSkuList;
    },
    getArrItem (item) {
      let arr = [];
      if (!this.isColor) {
        arr.push({
          k: this.specColourName,
          k_s: "valueId",
          name: item.specColour,
          id: item.valueId,
        })
      }
      if (!this.isSize) {
        arr.push({
          k: this.specSizeName,
          k_s: "valueId2",
          name: item.specSize,
          id: item.valueId2,
        })
      };
      return arr;
    },
    valueIdSort (arr, isColor, isSize) {
      if (!isColor) {
        for (var i = 0; i < arr.length - 1; i++) {
          for (var j = 0; j < arr.length; j++) {
            if (arr[j].specColour != arr[i].specColour) {
              continue;
            }
            arr[j].valueId = arr[i].valueId;
          }
        }
      }
      var newArr = this.valueIdSort2(arr, isColor, isSize);
      return newArr;
    },
    valueIdSort2 (arr, isColor, isSize) {
      var newArr = JSON.parse(JSON.stringify(arr));
      if (!isSize) {
        for (var i = 0; i < newArr.length - 1; i++) {
          for (var j = 0; j < newArr.length; j++) {
            if (newArr[j].specSize != newArr[i].specSize) {
              continue;
            }
            newArr[j].valueId2 = newArr[i].valueId2;
          }
        }
      }

      return newArr;
    },
    _transMatrix (data) {
      let transResult = {};
      this.sku.currentSkuList.forEach((specs) => {
        specs.forEach((item) => {
          if (!transResult[item["k_s"]]) {
            transResult[item["k_s"]] = {
              k_s: item["k_s"],
              k: item["k"],
              v: {
                [item["id"]]: {
                  id: item["id"],
                  name: item["name"],
                },
              },
            };
          } else if (!transResult[item["k_s"]].v[item["id"]]) {
            transResult[item["k_s"]].v[item["id"]] = {
              id: item["id"],
              name: item["name"],
            };
          }
        });
      });
      return transResult;
    },
    _getAllSpecsList (data) {
      const transResult = this._transMatrix(data);
      this.sku.allSpecsList = Object.keys(transResult).map((key) => {
        let obj = JSON.parse(JSON.stringify(transResult[key]));
        obj.v = Object.keys(obj.v).map((vk) => obj.v[vk]);
        return obj;
      });
      return this.sku.allSpecsList;
    },
  },
};
</script>
<style scoped  lang="scss">
.product {
  height: auto;
  box-sizing: border-box;
  background: #f9f9f9;
  font-size: 12px;
  color: #333;
  margin: 0;
  padding: 0;
  position: relative;
  padding-bottom: 120px;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .flex {
    display: flex;
  }
  .center {
    align-items: center;
    justify-content: center;
  }
  .between {
    align-items: center;
    justify-content: space-between;
  }
  .text-warp {
    overflow: hidden; /*内容超出后隐藏*/
    text-overflow: ellipsis; /* 超出内容显示为省略号*/
    white-space: nowrap; /*文本不进行换行*/
  }
  .marginTop {
    margin-top: 5px;
  }
  .open-app,
  .download-app {
    position: fixed;
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
    width: 1.6rem;
    height: 0.7rem;
    right: 0;
    font-size: 0.3rem;
    text-align: center;
    line-height: 0.7rem;
    background-color: red;
    z-index: 9999;
    color: #fff;
  }
  .download {
    top: 1.2rem;
  }
  .open {
    top: 2rem;
  }
  .header {
    background: rgba(255, 255, 255, 0);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    z-index: 99;
    .page-title {
      font-size: 34px;
      font-weight: 500;
      color: rgba(48, 46, 64, 1);
    }
    .page-title-right {
      margin-right: 60px;
    }
    .icon {
      width: 64px;
      height: 64px;
      background: #fff;
      border-radius: 50%;
    }
    .msg {
      position: relative;
      margin-right: 40px;
      .dot {
        position: absolute;
        right: 8px;
        top: 8px;
        width: 16px;
        height: 16px;
        background: #ff3b30;
        border-radius: 50%;
      }
    }
    .nav {
      height: 88px;
      font-size: 28px;
      color: #9c9ca4;
      div {
        flex: 1;
        position: relative;
      }
      .nav-active {
        color: #302e40;
        font-size: 32px;
        font-weight: 500;
      }
      .nav-active::after {
        position: absolute;
        box-sizing: border-box;
        width: 108px;
        // height: 8px;
        content: ' ';
        pointer-events: none;
        left: 50%;
        bottom: 0%;
        border: 0 solid #ffe002;
        border-bottom-width: 8px;
        transform: translateX(-50%);
      }
    }
  }
  // 轮播 下架 已售罄
  .swiper {
    width: 100%;
    height: 10rem;
    position: relative;
    .custom-indicator {
      width: 70px;
      height: 33px;
      background: rgba(0, 0, 0, 1);
      border-radius: 17px;
      opacity: 0.23;
      position: absolute;
      bottom: 32px;
      right: 32px;
      font-size: 22px;
      color: #ffffff;
    }
    .swipe-img {
      width: 100%;
      height: 100%;
    }
    .sell-out,
    .sold-out {
      z-index: 99;
      position: absolute;
      left: 0;
      top: 0;
      width: 10rem;
      height: 10rem;
      background: rgba(0, 0, 0, 0.3);
    }
    .sell-out img,
    .sold-out img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 164px;
      height: 164px;
    }
  }
  // 基础信息
  .detail-info {
    padding: 40px 24px 16px 24px;
    background: rgba(255, 255, 255, 1);
    .detail-info-top {
      height: 48px;
      margin-bottom: 5px;
      align-items: baseline;
      font-size: 24px;
      color: #2a252c;
      span:first-child {
        color: #ff3b30;
        font-weight: bold;
        font-size: 26px;
      }
      strong {
        color: #ff3b30;
        font-size: 48px;
        margin-right: 16px;
      }
      .member-price {
        font-weight: bold;
        font-size: 28px;
        b {
          font-size: 26px;
        }
      }
      .member-icon {
        margin-left: 6px;
        width: 60px;
        height: 24px;
        transform: translateY(0.0226rem);
      }
    }
    .original-price {
      height: 46px;
      font-size: 28px;
      color: rgba(178, 178, 178, 1);
      text-decoration: line-through;
      b {
        font-size: 26px;
      }
    }
    .detail-info-title {
      max-height: 96px;
      font-size: 34px;
      font-weight: bold;
      line-height: 48px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    // 荟员
    .member {
      margin-top: 24px;
      height: 96px;
      border-radius: 16px;
      overflow: hidden;
    }
    .info-icon {
      height: 60px;
      margin-top: 16px;
      .info-icon-item {
        position: relative;
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        div,
        img {
          width: auto;
          height: 36px;
          vertical-align: middle;
        }
        p {
          vertical-align: middle;
          margin-left: 9px;
          font-size: 24px;
          margin-top: 3px;
          line-height: 24px;
          color: #666;
        }
      }
      .info-icon-item::after {
        position: absolute;
        box-sizing: border-box;
        width: 2px;
        height: 32px;
        content: ' ';
        pointer-events: none;
        top: 50%;
        right: 0%;
        background: #f7f7f7;
        transform: translateY(-50%);
      }
      .info-icon-item:nth-child(4)::after {
        position: absolute;
        box-sizing: border-box;
        width: 2px;
        height: 32px;
        content: ' ';
        pointer-events: none;
        top: 50%;
        right: 0%;
        background: #f7f7f7;
        opacity: 0;
        transform: translateY(-50%);
      }
    }
  }
  // sku选择
  .select-sku {
    margin-top: 16px;
    padding: 0 24px;
    width: 750px;
    height: 120px;
    background: rgba(255, 255, 255, 1);
    color: #7a7a84;
    font-size: 28px;
    span {
      font-size: 32px;
      font-weight: 500;
      color: rgba(48, 46, 64, 1);
    }
    .right {
      span {
        height: 28px;
        font-size: 28px;
        font-weight: 400;
        color: rgba(122, 122, 132, 1);
      }
      img {
        width: 12px;
        height: 24px;
        margin-left: 16px;
      }
    }
  }
  // 品牌信息
  .brand-info {
    padding: 28px 24px 27px 24px;
    margin-top: 16px;
    background: #fff;
    box-sizing: border-box;
    height: 191px;
    .cart {
      .left {
        width: 136px;
        height: 136px;
        border-radius: 8px;
        margin-right: 16px;
        overflow: hidden;
        border: 0.0133rem solid rgba(222, 222, 224, 1);
      }
      .right {
        position: relative;
        flex: 1;
        .content {
          width: 380px;
        }
        h2 {
          height: 45px;
          font-size: 32px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 45px;
        }
        p {
          margin-top: 5px;
          height: 33px;
          font-size: 24px;
          color: rgba(156, 156, 164, 1);
          line-height: 33px;
        }
        .bottom {
          margin-top: 15px;
          height: 36px;
          width: 232px;
          box-sizing: border-box;
          position: relative;
          .van-count-down {
            display: flex;
            color: #333333;
            font-size: initial;
            line-height: initial;
            .block {
              padding-top: 0.0226rem;
              text-align: center;
              width: 40px;
              height: 36px;
              background: rgba(51, 51, 51, 1);
              border-radius: 4px;
              font-size: 24px;
              color: #fff;
            }
            .colon {
              padding-bottom: 0.0226rem;
              height: 36px;
              font-size: 24px;
              font-weight: 600;
              margin: 0 6px;
            }
          }
        }
        .go-brand {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          color: #7a7a84;
          font-size: 24px;
          span {
            font-size: 24px;
          }
          img {
            width: 12px;
            height: 24px;
            margin-left: 16px;
          }
        }
      }
    }
  }
  // 详情 须知 公共头部
  .common-header {
    height: 82px;
    font-size: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 44px;
      height: 6px;
    }
    h2 {
      color: #333;
      margin: 0 16px;
    }
  }
  // 须知等公共文字说明
  .notice {
    box-sizing: border-box;
  }
  .notice-info {
    padding: 32px 24px;
    background-color: #fff;
    dl {
      margin-bottom: 40px;
      dt {
        margin-bottom: 18px;
        h2 {
          height: 40px;
          font-size: 28px;
          color: rgba(48, 46, 64, 1);
          line-height: 40px;
        }
      }
      dd p {
        font-size: 28px;
        color: rgba(72, 72, 88, 1);
        line-height: 40px;
      }
    }
    dl:last-child {
      margin-bottom: 0;
    }
  }
  // 商品详情
  .pro-detail {
    .pro-imgs {
      background: #fff;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  // 底部
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 120px;
    background-color: #fff;
    z-index: 99;
    border-top: 0.02667rem solid #f0f0f0;
    padding-right: 24px;
    font-size: 0.27rem;
    justify-content: space-between;
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
    .footer-item {
      width: 145px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      div {
        width: 48px;
        height: 48px;
        margin-bottom: 2px;
      }
      p {
        height: 30px;
        font-size: 22px;
        line-height: 30px;
      }
    }
    .left {
      width: 290px;
      height: 100%;
      display: flex;
      .gouwuche {
        position: relative;
        .num {
          width: 34px;
          height: 34px;
          color: #fff;
          position: absolute;
          font-size: 0.27rem;
          border-radius: 50%;
          top: 6px;
          right: 18px;
          transform: scale(0.8);
          background-color: #e93323;
        }
      }
    }
    .btn-group {
      width: 400px;
      height: 120px;
      color: #fff;
      position: relative;
      .join-cart {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-52%);
        width: 400px;
        height: 96px;
        font-size: initial;
        background: rgba(255, 224, 2, 1);
        border-radius: 55px;
        color: rgba(48, 46, 64, 1);
        font-weight: 500;
        span {
          font-size: 56px;
          transform: scale(0.5);
        }
      }
      .join-cart.disabled {
        background: #ccc;
        color: #e5e5e5;
      }
    }
  }
  .footer.footer1{
    padding-left: 24px;
    padding-top: 20px;
  }
  // 底部提示
  .footer-text {
    text-align: center;
    color: #969799;
    height: 1.06667rem;
    line-height: 1.06667rem;
    font-size: 0.37333rem;
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
  .footer-void {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: constant(safe-area-inset-bottom);
    height: env(safe-area-inset-bottom);
    background-color: #fff;
  }
}
</style>

<style  lang="scss">
.product .van-nav-bar__left {
  left: 0;
  padding-left: 24px;
}
.product .van-nav-bar__right {
  right: 0;
  padding-right: 24px;
}
.product .header {
  .van-nav-bar {
    height: 88px;
    line-height: 88px;
    background: none;
  }
  .van-hairline--bottom::after {
    border-bottom: none;
  }
}
.product .pro-sku {
  .van-sku-body {
    flex: none;
    -webkit-flex: none;
  }
  .van-icon {
    position: absolute;
    font: 36px/1 'vant-icon';
  }
  .header-top {
    height: 136px;
    margin-left: 24px;
    margin-top: 40px;
    margin-bottom: 24px;
    .left {
      width: 136px;
      height: 136px;
      border-radius: 4px;
      overflow: hidden;
      margin-right: 16px;
    }
    .right {
      .price {
        height: 56px;
        font-size: 40px;
        color: rgba(255, 59, 48, 1);
        line-height: 56px;
      }
      .stock {
        height: 34px;
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
        line-height: 34px;
        margin-top: 4px;
        margin-bottom: 14px;
        span {
          color: rgba(255, 59, 48, 1);
          font-weight: bold;
        }
      }
      .text {
        height: 34px;
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
        line-height: 34px;
      }
    }
  }
  .van-sku-row__title {
    font-weight: bold;
    padding-bottom: 16px;
  }
  .step-group {
    margin-left: 24px;
    height: 126px;
    .step {
      margin-right: 24px;
      .icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
      }
      .num {
        width: 118px;
        font-size: 40px;
        font-weight: 500;
      }
    }
  }
  .addCart {
    width: 702px;
    height: 110px;
    line-height: 110px;
    text-align: center;
    font-weight: bold;
    color: #302e40;
    background: rgba(255, 224, 2, 1);
    border-radius: 55px;
    margin: 0 0 40px 24px;
    font-size: initial;
    span {
      font-size: 28px;
    }
  }
  .van-sku-group-container {
    margin-left: 24px;
    padding-bottom: 0;
  }
  .van-hairline--bottom::after {
    border-bottom: none;
    opacity: 1;
  }
  .van-sku-row__item {
    overflow: visible;
    width: 222px;
    height: 72px;
    background: rgba(242, 242, 242, 1);
    border-radius: 48px;
    margin-right: 18px;
    margin-bottom: 18px;
    font-weight: 500;
    box-sizing: border-box;
    color: #333333;
  }
  .van-sku-row__item:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 48px;
    background: none;
    opacity: 0;
    content: '';
  }
  .van-sku-row__item-name {
    overflow: hidden; /*内容超出后隐藏*/
    text-overflow: ellipsis; /* 超出内容显示为省略号*/
    white-space: nowrap; /*文本不进行换行*/
    z-index: 999;
  }
  .van-sku-row__item--active {
    color: #333333;
    background: #fffdf2;
    border: 0.0267rem solid #ffe456;
    border-radius: 48px;
  }
  .van-sku-row__item--active::before {
    background: none;
    opacity: 0;
  }
  .van-sku-row__item--disabled {
    color: #dedee0;
    background: #f9f9f9;
  }
  .van-sku-row {
    margin: 0 0 30px 0;
    .van-sku-row__item:nth-child(3n + 1) {
      margin-right: 0;
    }
  }
  .van-sku-row:last-child {
    margin-bottom: 0;
  }
}
.product .pro-sku.van-sku-container {
  min-height: 30%;
}
</style>