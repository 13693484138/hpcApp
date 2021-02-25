import { request } from '@/utils/request'
const articleServe = '/wechatmarketing'
const article = {
  // 获取推文
  getArticle: (data) => {
    return request({
      url: articleServe + '/v1/app/marketing/article/query',
      method: 'post',
      data,
    })
  },
  // // 获取中间页
  // queryTransPage: (data) => {
  //   return request({
  //     url: articleServe + '/v1/marketing/app/transPage/queryTransPage',
  //     method: 'post',
  //     data,
  //   })
  // },
  // 获取中间页
  queryTransPage: (data) => {
    return request({
      url: articleServe + '/v1/marketing/app/transPage/queryTransPageByUid',
      method: 'post',
      data,
    })
  },
  // 阅读量收集
  articleCollect: (data) => {
    return request({
      url: articleServe + '/v1/article/collect',
      method: 'post',
      data,
    })
  },
  // 推广员和用户绑定
  linkUser: (data) => {
    return request({
      url: articleServe + '/v1/promoter/linkUser',
      method: 'post',
      data,
    })
  },
  // 转发收集
  repostCollect: (data) => {
    return request({
      url: articleServe + '/v1/article/repost/collect',
      method: 'post',
      data,
    })
  },
}
export default article
