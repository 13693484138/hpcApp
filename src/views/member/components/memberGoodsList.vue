<template>
  <div class="member-list-content">
    <div
      class="member-list-item"
      v-for="(item,index) in imgList"
      :key="index"
      @click.stop="goodsUrl(item.productSpuId)"
    >
      <div class="member-list-item-img">
        <img :src="item.mainPic" alt v-lazy="item.mainPic" />
        <img src="@/assets/img/zhe-icon.png" alt />
      </div>
      <div class="member-list-item-text">{{item.productName}}</div>
      <div class="member-list-item-gods">
        <span>¥</span>
        {{item.memberPrice}}
      </div>
    </div>
  </div>
</template>
<script>
import { isInApp, detectVersion } from "@/utils/native.js";
import { productDetailsUrl, appUrl } from "@/utils/config.js";
export default {
  data() {
    return {
      imgList: [],
    };
  },
  created() {
    this.memberGoodsInit();
  },
  mounted() {},
  methods: {
    memberGoodsInit() {
      this.$api.userMembers
        .getActiveCode({
          activeCode: "202007272020-限时秒杀",
          // hp_version: "1.01"
        })
        .then((res) => {
          this.imgList = res;
        });
    },
    goodsUrl(id) {
      if (isInApp()) {
        window.hpcapi.openRouter(`${appUrl}productDetail?id=${id}`);
      } else {
        if (detectVersion().isAndroid) {
          this.$api.userMembers.getAppVersion().then((res) => {
            window.location.href = `${appUrl}productDetail?id=${id}`;
            // window.location.href=res.
          });
        } else if (detectVersion().isIOS9) {
          window.location.href =
            "https://apps.apple.com/cn/app/%E8%8D%9F%E5%93%81%E4%BB%93-%E8%B5%B0%E8%BF%9B%E5%93%81%E7%89%8C%E4%BB%93%E5%BA%93%E6%B7%98%E5%A5%BD%E8%B4%A7/id1464120909";
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.member-list-content {
  display: flex;
  overflow-x: auto;
  height: 355px;
  overflow-y: hidden;
  .member-list-item:first-child {
    margin-left: 30px;
  }
  .member-list-item {
    margin-top: 20px;
    width: 198px;
    height: 328px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    margin-left: 20px;
    &-img {
      width: 198px;
      height: 186px;
      position: relative;
      text-align: center;
       border-radius: 4px 4px 0 0;
      img {
        width: 100%;
        height: 100%;
      }
      img:last-child {
        width: 104px;
        height: 32px;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
    &-text {
      width: 198px;
      font-size: 22px;
      font-family: PingFangSC-Light, PingFang SC;
      font-weight: 300;
      color: rgba(51, 51, 51, 1);
      margin-top: 31px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &-gods {
      margin-top: 16px;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      margin-left: 12px;
      color: rgba(51, 51, 51, 1);
      span {
        font-size: 20px;
      }
    }
  }
}
.member-list-content::-webkit-scrollbar {
  display: none; // 重点
}
</style>