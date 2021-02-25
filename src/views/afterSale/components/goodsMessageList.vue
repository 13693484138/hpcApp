<template>
  <div>
    <div class="goodsMessage" :key="index" v-for="(item,index) in list">
      <div class="goods-img">
        <img :src="item.productSkuImage==''?'../../../images/pic.png':item.productSkuImage" alt />
      </div>
      <div class="goods-text">
        <div class="goods-name">{{item.productName}}</div>
        <div class="goods-type">{{item.specColor}}{{item.specSize}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUrlParameter } from "@/utils/index.js";
export default {
  data() {
    return {
      productName: "",
      specColor: "",
      specSize: "",
      productSkuImage: "",
      isShow: true,
      oid: "",
    };
  },
  props: {
   list:Array
  },
};
</script>
<style scoped lang="scss">
.goodsMessage {
  width: 100%;
  height: 234px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  font-family: PingFangSC-Light, PingFang SC;
  .goods-img {
    margin: 24px 24px 28px 24px;
    img {
      height: 182px;
      width: 182px;
    }
  }
  .goods-text {
    margin-top: 24px;
    width: 392px;
    .goods-name {
      font-size: 28px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      line-height: 40px;
    }
    .goods-type {
      margin-top: 6px;
      font-size: 26px;
      font-weight: 300;
      color: rgba(102, 102, 102, 1);
      line-height: 37px;
      letter-spacing: 1px;
    }
  }
}
</style>