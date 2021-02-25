<template>
  <div class="feed-wrap">
    <div class="header">
      <img class="imgH"
           :src="bg"
           alt="banner">
    </div>
    <div class="main">
      <div class="top">
        <h2 class="title">共{{proList.length}}件商品待退回</h2>
        <p class="desc">为了更好的服务，请提交商品退回原因，将有专人联系进行取回</p>
      </div>
      <div class="reason flex">
        <i></i>
        <span>不喜欢的原因</span>
      </div>
      <div class="feed-list">
        <div class="feed-item"
             v-for="(item,i) in proList"
             :key="item.id">
          <div class="pro flex">
            <div class="left">
              <img class="imgH"
                   :src="defPro"
                   alt="默认商品">
            </div>
            <div class="right">
              <h2>{{item.productName.length >10 ? item.productName.slice(0,10)+'...':item.productName}}</h2>
              <div class="bottom"><b>数量:1</b><b><span>{{item.size?item.size:'均码'}}</span></b></div>
              <div class="price"><b>￥{{item.commodityPrice}}</b></div>
            </div>
          </div>
          <div class="cause flex between">
            <div v-for="(v,idx) in causeList"
                 @click="causeSelect(i,idx)"
                 :key="idx"
                 class="cause-item flex fcenter"
                 :class="{active:item.active==idx}">{{v}}</div>
          </div>
        </div>
      </div>
      <div class="flex fcenter nextBtn-group">
        <div class="nextBtn flex fcenter"
             @click="save">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import { appUrl } from "@/utils/config.js";
export default {
  name: 'feeback',
  data () {
    return {
      bg: require('@/images/reachHome/banner.png'),
      defPro: require('@/images/reachHome/def-pro.png'),
      proList: [],
      causeList: ['款式不喜欢', '价格过高', '舒适度不够'],
      wishOrderId: ''
    };
  },
  computed: {

  },
  created () {
    this.init();
  },
  methods: {
    async init () {
      this.$api.reachHome.getWishOrderStatus({}).then(res => {
        if (res != null) {
          if (res.unPurchaseProductContent) {
            res.unPurchaseProductContent.map((item, i) => {
              item.active = 0;
              item.reason = '款式不喜欢';
            });
          }
          this.proList = res.unPurchaseProductContent ? res.unPurchaseProductContent : [];
          this.wishOrderId = res.wishOrderId;
        }
      })
    },
    causeSelect (i, idx) {
      this.proList[i].active = idx;
      this.proList[i].reason = this.causeList[idx];
    },
    addDislike (data) {
      this.$api.reachHome.addDislikeReason(data).then(res => {
        this.$toast('反馈成功!');
        window.hpcapi.backAction(true);
        this.$router.push({ path: '/progress' });
      })
    },
    save () {
      let arr = [];
      this.proList.forEach(function (v, i) {
        let item = {
          skuId: v.skuId,
          id: v.id,
          reason: v.reason,
        }
        arr.push(item);
      })
      let requestData = {
        dislike: arr,
        wishOrderId: this.wishOrderId
      }
      this.addDislike(requestData);
    }
  }
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
.imgH {
  height: 100%;
  object-fit: cover;
}
.column {
  display: flex;
  flex-direction: column;
}
.between {
  justify-content: space-between;
  align-items: center;
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
  position: relative;
  background: #f8f8f8;
  padding-bottom: 142px;
  position: relative;
}
.feed-wrap {
  position: relative;
  background: #f8f8f8;
}
.header {
  width: 100%;
  height: 375px;
}
.main .top {
  height: 208px;
  background: #fff;
  padding: 0 0.48rem;
  padding-top: 32px;
}
.main .title {
  font-size: 40px;
  color: #333333;
  height: 56px;
  line-height: 56px;
  margin-bottom: 8px;
}
.main .desc {
  font-size: 28px;
  opacity: 0.8;
  color: #333333;
  height: 40px;
  line-height: 40px;
}
.reason {
  padding-left: 32px;
  height: 85px;
  align-items: center;
}
.reason i {
  width: 6px;
  height: 28px;
  background: #ffe631;
}
.reason span {
  font-size: 32px;
  font-weight: bold;
  margin-left: 0.08rem;
}
/* ĺĺitem */
.feed-list {
  background: #fff;
  padding: 24px 48px;
  border-radius: 30px;
  margin-bottom: 24px;
}
.feed-item {
  margin-bottom: 40px;
}
.feed-item .pro .left {
  width: 178px;
  height: 178px;
  border-radius: 16px;
  overflow: hidden;
  margin-right: 32px;
}
.feed-item .pro .right {
  flex: 1;
}
.feed-item .pro .right h2 {
  height: 55px;
  font-size: 32px;
  line-height: 55px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.feed-item .pro .right .bottom {
  height: 34px;
  color: #848484;
  font-size: 24px;
  margin-top: 12px;
}
.feed-item .pro .right .bottom b {
  font-weight: normal;
  margin-right: 30px;
}
.feed-item .pro .right .price {
  margin-top: 10px;
  height: 46px;
  line-height: 46px;
  font-size: 32px;
  color: #ff2f51;
}
.cause {
  padding-top: 20px;
}
.cause-item {
  width: 206px;
  height: 96px;
  font-size: 28px;
  background: #f9f9f9;
  border-radius: 48px;
}
.cause-item.active {
  background: rgba(255, 230, 49, 0.2);
  border: 0.0226rem solid #f5a243;
  border-radius: 48px;
}
.feed-mark {
  height: 212px;
}
.feed-mark .remark {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: rgba(241, 240, 240, 1);
  border: none;
  outline-style: none;
  padding: 24px;
  font-size: 28px;
}

.nextBtn-group {
  width: 100%;
  height: 142px;
  padding: 0 24px;
  padding-bottom: 30px;
  background: #fff;
  z-index: 99;
  position: fixed;
  left: 0;
  bottom: 0;
}
.nextBtn-group .nextBtn {
  width: 100%;
  height: 112px;
  background: #ffe631;
  border-radius: 60px;
  letter-spacing: 4px;
  font-size: 36px;
}
</style>
