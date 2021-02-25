<template>
  <div class="uploaderImg">
    <div class="uploader-text">上传凭证</div>
    <div class="uploader-warp">
      <van-uploader
        v-model="fileList"
        :before-read="beforeRead"
        :after-read="(file)=>{return afterRead(file,'reverseSide')}"
        :before-delete="deleteImg"
        :max-count="3"
      >
        <div class="uploader-content">
          <div class="uploader-buttom">
            <img src="../../../images/afterSale/shangchuan.png" alt />
            <span>上传凭证</span>
            <span>（最多3张）</span>
          </div>
        </div>
      </van-uploader>
    </div>
  </div>
</template>
<script>
import { uploadOne } from "@/utils/index.js";
export default {
  data() {
    return {
      fileList: [],
      imgList:[],
    };
  },
  methods: {
    // 此时可以自行将文件上传至服务器
    afterRead(file, type) {
      uploadOne(file.file, "arriveHome/figure", (url) => {
       this.imgList.push(url);
      });
    },
    deleteImg(file,detail) {
      this.imgList.splice(detail.index,1)
      return true;
    },
    beforeRead(file) {
      if (!/(jpg|JPG|jpeg|JPEG|png|PNG)$/.test(file.type)) {
        this.$toast("不符合的图片格式!");
        return false;
      }
      return true;
    },
  },
};
</script>
<style scoped lang="scss">
// .van-uploader__preview-delete {
//     position: absolute;
//     top: -8px !important;
//     right: -8px !important;
//     width: 30px !important;
//     height: 30px !important;
//    // background-image:url("../../../images/afterSale/close.png") !important;
//     border-radius: 50% !important;
//     text-align: center;
//     line-height: 14px;
//     text-align: center;
//     .van-uploader__preview-delete-icon{
//        position: absolute;
//        left:0;
//        top:0;
//     }
//   }

.uploaderImg {
  width: 100%;
  height: 332px;
  background-color: #ffffff;
  border-radius: 12px;
  margin-top: 16px;

  .uploader-text {
    height: 112px;
    font-size: 30px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 112px;
    margin: 0 24px;
  }
  .uploader-warp {
    margin: 0 24px;
    .uploader-content {
      display: flex;
      justify-content: flex-start;
      .uploader-buttom {
        width: 178px;
        height: 178px;
        border: 1px dashed #979797;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 60px;
          height: 48px;
        }

        span {
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 25px;
          margin-top: 10px;
        }
      }
    }
    .uploader-img-list {
      display: flex;
      justify-content: flex-start;
      .uploader-img-item {
        width: 180px;
        height: 180px;
        margin-left: 57px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>