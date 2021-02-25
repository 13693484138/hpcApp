<template>
  <div id="brand-details">
    <div v-if="isApp==null"
         class="download-app download"
         @click="downloadApp">下载APP</div>
    <!-- header -->
    <div class="header">
      <!-- 背景图 -->
      <div class="bg-blur">
        <div class="card-content">
          <div class="content-top">
            <dl id="J_content_top">
              <dt>
                <img class="imgurl"
                     :src="info.logoImage">
              </dt>
              <dd>
                <h2 class="text-wrap">{{info.brandName}}</h2>
                <div class="tags">
                  <span class="tag-item text-wrap"
                        v-for="(v,i) of info.tag"
                        :key="v+i">{{v}}</span>
                </div>
              </dd>
            </dl>
          </div>
          <div class="content-center"
               id="J_countdown_time">
            <span class="left">距离结束:</span>
            <van-count-down :time="brandEndTime">
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
          <div class="content-text">{{info.content}}
          </div>

        </div>
      </div>
      <div class="top-img">
        <img class="imgurl"
             :src="info.mainImage">
      </div>
    </div>
    <!-- 下部分 -->
    <div class="main">
      <div class="pro-list">
        <div class="recommend-commditys">
          <div class="recommend-commdity-item white-bg"
               v-for="(item,index) in goodsList"
               :key="index"
               @click="commidityDetail(item.productSpuId)">
            <van-image class="recommend-commidity-image"
                       :lazy-load="index>9"
                       :src="item.mainPic" />
            <van-image class="recommend-commidity-sq"
                       v-if="item.stockNum==0"
                       :src="stockImg" />
            <div class="recommend-commidity-desc two-line">{{item.productName}}</div>
            <div class="recommend-commidity-price-container">
              <div class="recommend-origin-money flex"><span>¥</span>{{item.salePrice}} <span class="recommend-sale-money">¥{{item.originalPrice}}</span> </div>
              <div class="member-price  flex center"
                   v-if="item.memberPrice == undefined ? false :true"><span>¥{{item.memberPrice}}</span><img class='recommend-cart-icon'
                     :src='memberIconImg' /> </div>

            </div>
          </div>
        </div>
      </div>
      <p class="footer-text">--仓主，没有更多了--</p>
    </div>
  </div>
</template>

<script>
import { getUrlParameter, isInApp } from "@/utils/index.js";
import { appUrl } from '@/utils/config.js'
export default {
  data () {
    return {
      id: null, //品牌id
      brandEndTime: null,
      info: {},
      goodsList: [],
      stockImg: require("@/images/productDetail/sj.png"),
      memberIconImg: require('@/images/productDetail/member-icon.png'),
      isApp: isInApp(),
    };
  },
  created () {
    this.id = getUrlParameter("id") || this.$route.query.id;
    this.init();
  },
  mounted () {

  },
  watch: {

  },
  methods: {
    commidityDetail (id) {
      if (this.isApp) {
        window.hpcapi.openRouter(`${appUrl}productDetail?id=${id}`)
      } else {
        window.location.href = `${appUrl}productDetail?id=${id}`;
      }
    },
    init () {
      this.brandInfo();
      this.brandList();
    },
    brandInfo () {
      this.$api.barndDetail.BrandInfo({ ids: [this.id], }).then(res => {
        this.setInfo(res[0]);
      })
    },
    setInfo (res) {
      window.document.title = res.title;
      this.brandEndTime = Number(res.endTimeStr) - Number(res.currentTimeStr);
      this.info = {
        mainImage: res.mainImage,
        tag: res.tag.split(','),
        content: res.content,
        logoImage: res.logoImage,
        brandName: res.brandName
      }
    },
    brandList () {
      this.$api.barndDetail.BrandList({
        activeId: this.id,
        orderBy: 1,
        ascBy: 1,
        pageNo: 1,
        pageSize: 200,
      }).then(res => {
        this.goodsList = res.list;
      })
    },
    downloadApp () {
      window.location.href = 'https://h5.hpcang.com/app.html';
    },
  },
  components: {

  },
};
</script>

<style scoped lang="scss">
#brand-details {
  background: #f2f2f2;
  position: relative;
  color: #333;
  z-index: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  .download-app {
    position: fixed;
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
    width: 1.6rem;
    height: 0.7rem;
    top: 1.2rem;
    right: 0;
    font-size: 0.3rem;
    text-align: center;
    line-height: 0.7rem;
    background-color: red;
    z-index: 9999;
    color: #fff;
  }
  img {
    object-fit: cover;
  }
  .imgurl {
    width: 100%;
    height: 100%;
  }
  .item-img__wrapper {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .text-wrap {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .header {
    width: 100%;
    padding-top: 426px;
    position: relative;
    .bg-blur {
      padding: 152px 24px 0;
      width: 100%;
      height: 426px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      background: rgba(0, 0, 0, 0.5);
      .content-top dl {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
        dt {
          width: 120px;
          height: 120px;
          border-radius: 8px;
          margin-right: 16px;
          overflow: hidden;
        }
        dd {
          flex: 1;
          text-align: left;
          padding-top: 10px;

          h2 {
            height: 45px;
            font-size: 32px;
            color: #ffffff;
            line-height: 45px;
            letter-spacing: 1px;
            margin-bottom: 22px;
          }
          .tags {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 34px;
            overflow: hidden;
            .tag-item {
              height: 34px;
              font-size: 24px;
              color: #ffffff;
              line-height: 34px;
              letter-spacing: 1px;
            }
          }
        }
      }
      .content-center {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #ffffff;
        margin-bottom: 20px;
        .left {
          font-size: 24px;
          margin-right: 16px;
        }
        .van-count-down {
          display: flex;
          align-items: center;
          .block {
            color: #333;
            text-align: center;
            width: 40px;
            height: 36px;
            background: #ffffff;
            border-radius: 4px;
            font-size: 24px;
          }
          .colon {
            height: 36px;
            font-size: 24px;
            margin: 0 6px;
            color: #ffffff;
          }
        }
      }
      .content-text {
        font-size: 24px;
        color: #ffffff;
        line-height: 32px;
        letter-spacing: 1px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .top-img {
      position: absolute;
      width: 100%;
      height: 5.70667rem;
      top: 0;
      left: 0;
      z-index: 0;
      img {
        filter: blur(0.12rem);
        overflow: hidden;
      }
      overflow: hidden;
    }
  }
  .main {
    padding: 24px;
    .recommend-commditys {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .recommend-commdity-item {
        background: #fff;
        position: relative;
        width: 342px;
        height: 542px;
        border-radius: 12px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin-bottom: 18px;
        overflow: hidden;
        .recommend-commidity-image {
          width: 342px;
          height: 342px;
          margin-bottom: 12px;
        }
        .recommend-commidity-sq {
          position: absolute;
          left: 50%;
          width: 109px;
          height: 109px;
          top: 171px;
          transform: translate(-50%, -50%);
        }

        .recommend-commidity-desc {
          padding: 0 20px;
          height: 74px;
          font-size: 26px;
          color: rgba(51, 51, 51, 1);
          line-height: 38px;
          overflow: hidden;
        }

        .recommend-commidity-price-container {
          padding: 0 20px;
          .recommend-origin-money {
            margin-top: 20px;
            height: 30px;
            font-size: 30px;
            font-weight: 600;
            color: rgba(255, 59, 48, 1);
            line-height: 30px;
            align-items: baseline;
            span {
              font-size: 24px;
              height: 24px;
            }
            .recommend-sale-money {
              display: inline-block;
              text-decoration: line-through;
              height: 24px;
              margin-left: 9px;
              font-size: 24px;
              font-weight: 400;
              color: rgba(154, 154, 154, 1);
            }
          }
          .member-price {
            margin-top: 6px;
            height: 32px;
            span {
              margin-top: 4px;
              font-size: 24px;
              font-weight: 600;
              color: rgba(43, 37, 45, 1);
            }
            .recommend-cart-icon {
              margin-left: 6px;
              width: 60px;
              height: 24px;
            }
          }
        }
      }
    }
  }
  .footer-text {
    text-align: center;
    color: #969799;
    height: 0.53rem;
    line-height: 0.53rem;
    font-size: 0.38rem;
    margin-bottom: 0.45rem;
  }
}
</style>
