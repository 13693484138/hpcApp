// import Vue from 'vue'
import router from "./router";
import store from "./store";
import App from "./App.vue";
import "./utils/global";

// 导入vant css
// import "vant/lib/index.css";
// 路由权限拦截
// import './utils/permission'
// 初始化svg雪碧图
// import "./icons";
// 解决移动端点击300ms事件
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
      FastClick.attach(document.body);
  }, false);
}
// // 注册自定义全局组件
// import './utils/components'
import LongPress from './utils/longPress.js'
Vue.use(LongPress, {time: 1000})

import api from "./api";
Vue.prototype.$api = api;
// if (process.env.VUE_APP_MODE == "mock") {
//   // 开发模式启动mock
//   console.log("开发模式启动mock");
//   require("../mock");
// }
// 打印当前运行模式
console.log("当前运行模式为:", process.env);
//配置doucment.title



router.beforeEach((to,from,next)=>{
  if(to.meta.title){
      document.title=to.meta.title
  }
  next()
})
Vue.config.productionTip = false;

Vue.config.ignoredElements = ['wx-open-launch-weapp']

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
