// 当前所处的环境
// let environment = {
//   dev: false, // dev环境
//   qa: false, // qa环境
//   online: false, // 正式环境
// }
// // environment.dev = true // dev环境
// // environment.qa = true // qa环境
// environment.online = true // 正式环境

const apiUrl = process.env.VUE_APP_API_PREFIX; //目前环境地址
const environment = process.env.NODE_ENV; //环境名称
const appUrl = process.env.VUE_APP_URL;
const reportUrl = process.env.VUE_REPORT_URL;
const appid = "wxbad3cf328b48f2e4"; //微信appid
const signatureURL = "https://h5.hpcang.com/app-h5/";
const pageBaseUrl = process.env.VUE_APP_PAGE_PREFIX; // 目前环境下页面地址域名
const publicPath = process.env.VUE_APP_PATH;
const memberPrice = process.env.VUE_APP_MEMBER_PRICE;
const productDetailsUrl =
  "https://h5.hpcang.com/new/pages/productDetails/productDetails.html?id=";
const pageUrl = {
  commidityDetail: pageBaseUrl + "/pages/productDetails/productDetails.html",
  downloadPage: 'https://h5.hpcang.com/app.html ',
};

export {
  apiUrl,
  environment,
  pageUrl,
  appid,
  signatureURL,
  appUrl,
  publicPath,
  productDetailsUrl,
  memberPrice
};
