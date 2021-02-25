<template>
    <van-overlay class="loading"
                 :show="show">
      <div class="wrapper"
           @click.stop>
        <div class="block">
          <van-loading class="loading-img"
                       vertical>加载中...</van-loading>
        </div>
      </div>
    </van-overlay>
</template>

<script>
export default {
    props: {
      isShowLoading:Boolean,
      default:false
    },
    computed: {
      show:{
        get(){
          return this.isShowLoading
        },
        set(){
          this.$emit("update:isShowLoading",this.isShowLoading);
        }
      }
    },
};
</script>

<style scoped lang="scss">
  .loading {
    z-index: 9999;
    .van-loading--vertical,
    .van-loading__spinner {
      width: 100px;
      height: 100px;
      margin: 0;
    }
    .van-loading__text {
      white-space: nowrap;
      text-align: center;
    }
    .van-loading {
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
    }
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .block {
      width: 240px;
      height: 240px;
      border-radius: 8px;
      background-color: #fff;
    }
  }
</style>
