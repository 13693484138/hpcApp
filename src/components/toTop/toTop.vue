
<template>
  <div class="scrollTop"
       v-if="showTop"
       @click="toTop">
    <img :src="toTopImg">
    <span>顶部</span>
  </div>
</template>
<script>
export default {
  name: 'scroll-top',
  data () {
    return {
      toTopImg: require('@/images/common/top.png'),
      scrollTop: 0,
      time: 0,
      dParams: 20,
      scrollState: 0
    }
  },
  computed: {
    showTop: function () {
      let value = this.scrollTop > 800 ? true : false;
      return value;
    },
  },
  mounted () {
    window.addEventListener('scroll', this.getScrollTop);
  },
  beforeDestroy () {
    // 组件销毁时，销毁监听事件
    window.removeEventListener('scroll', this.getScrollTop);
  },
  methods: {
    toTop (e) {
      if (!!this.scrollState) {
        return;
      }
      this.scrollState = 1;
      e.preventDefault(); // 该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）
      let distance = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
      let _this = this;
      this.time = setInterval(function () { _this.gotoTop((_this.scrollTop - _this.dParams)) }, 10);
    },
    gotoTop (distance) {
      this.dParams += 20;
      distance = distance > 0 ? distance : 0;
      document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = distance;
      if (this.scrollTop < 10) {
        clearInterval(this.time);
        this.dParams = 20;
        this.scrollState = 0;
      }
    },
    getScrollTop () {
      // pageXOffset 和 pageYOffset 属性返回文档在窗口左上角水平和垂直方向滚动的像素。
      // document.documentElement.scrollTop 当前页面的滚动条纵坐标位置， html 对应的是 html 标签
      // document.body.scrollTop  body 对应的是 body 标签。
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    }
  },

}
</script>
<style scoped lang="scss">
.scrollTop {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
  opacity: 0.8;
  position: fixed;
  right: 24px;
  bottom: 168px;
  cursor: pointer;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
  img {
    margin-top: 4px;
    width: 35px;
    height: 19px;
  }
  span {
    font-size: 16px;
    color: rgba(48, 46, 64, 1);
  }
}
</style>
