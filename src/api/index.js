import orderDetail from "./order/orderDetail";
import activity from "./activity/index";
import wxApi from "./wxserve/index";
import userMembers from "./userMembers/index";
import productDetail from "./product/productDetail";
import reachHome from "./reachHome/index";
import shareCoupon from "./shareCoupon/index";
import oneCoupon from "./oneCoupon/index";
import afterSaleDetail from "./afterSale/index";
import article from "./article/index";
import barndDetail from "./barndDetail/index";
import yearReport from "./yearReport/index";
const modules = {
  orderDetail,
  activity,
  wxApi,
  userMembers,
  productDetail,
  reachHome,
  shareCoupon,
  oneCoupon,
  afterSaleDetail,
  article,
  barndDetail,
  yearReport
};
// 在modules 中写模块 在模块中写方法
export default modules;
