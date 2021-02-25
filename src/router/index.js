// import Vue from 'vue'
import VueRouter from 'vue-router'

const orderDetail = () =>
    import ("../views/orderDetail/index.vue");
const productDetail = () =>
    import ('../views/productDetail/index.vue');
const brandDetail = () =>
    import ('../views/brandDetail/index.vue');
const agreement = () =>
    import ('../views/agreement/index.vue');
const memberDetail = () =>
    import ("../views/member/memberDetail.vue");
const headNav = () =>
    import ("_c/headNav.vue");
const author = () =>
    import ("../views/author/author.vue");
const userDetail = () =>
    import ("../views/member/userDetail.vue");
const accountConflict = () =>
    import ("../views/member/accountConflict.vue");
const userIndex = () =>
    import ("../views/member/index.vue");
const memberInterest = () =>
    import ("../views/member/memberInterest.vue");
const memberSign = () =>
    import ("../views/member/memberSign.vue");
const memberInstructions = () =>
    import ("../views/member/memberInstructions.vue");
const SelectService = () =>
    import ("../views/afterSale/selectService.vue");
const arefund = () =>
    import ("../views/afterSale/arefund.vue");
const afterSaleDetail = () =>
    import ("../views/afterSale/afterSaleDetail.vue");
const makeCourier = () =>
    import ("../views/afterSale/makeCourier.vue");
const salesPage = () =>
    import ('../views/afterSale/index.vue');
// 到家
const reachHomeIndex = () =>
    import ('../views/reachHome/index/index.vue')
const idList = () =>
    import ('../views/reachHome/idList/index.vue')
const idInfo = () =>
    import ('../views/reachHome/idInfo/index.vue')
const progress = () =>
    import ('../views/reachHome/progress/index.vue')
const makeHome = () =>
    import ('../views/reachHome/makeHome/index.vue')
const feeback = () =>
    import ('../views/reachHome/feeback/index.vue')
    // 分享领券
const shareCoupon = () =>
    import ('../views/shareCoupon/index.vue')
const userCoupon = () =>
    import ('../views/shareCoupon/userCoupon.vue')
    // 单张分享领券
const oneCoupon = () =>
    import ('../views/oneCoupon/index.vue')
const userOneCoupon = () =>
    import ('../views/oneCoupon/userCoupon.vue')
    // 微信公众号推文/中间页
    // const article = () =>
    //     import ( /* webpackChunkName: "article" */ '../views/article/article.vue')
    // const middlePage = () =>
    //     import ( /* webpackChunkName: "middlePage" */ '../views/article/middlePage.vue')

if (!window.VueRouter) Vue.use(VueRouter)

// Vue.use(VueRouter)
const routes = [{
        path: '/',
        component: userIndex,
        meta: {
            title: "超级荟员",
        },
    },
    {
        path: '/author',
        component: author,
    },
    {
        path: "/afterSaleDetail",
        name: "afterSaleDetail",
        component: afterSaleDetail,
        meta: {
            title: "售后详情",
        },
    },
    {
        path: "/makeCourier",
        name: "makeCourier",
        component: makeCourier,
        meta: {
            title: "填写退款物流",
        },
    },
    {
        path: "/SelectService",
        name: "SelectService",
        component: SelectService,
        meta: {
            title: "选择服务类型",
        },
    },
    {
        path: '/arefund',
        name: 'arefund',
        component: arefund,
        meta: {
            title: "申请退款"
        }
    },
    {
        path: "/memberInterest",
        name: "memberInterest",
        component: memberInterest,
        meta: {
            title: "荟员权益",
        }
    },
    {
        path: '/memberInstructions',
        name: 'memberInstructions',
        component: memberInstructions,
        meta: {
            title: '用户须知',
        },
    },
    {
        path: '/memberSign',
        name: 'memberSign',
        component: memberSign,
        meta: {
            title: '规则说明',
        },
    },
    {
        path: '/orderDetail',
        name: 'orderDetail',
        component: orderDetail,
        meta: {
            title: '订单详情',
        },
    },
    {
        path: '/brandDetails',
        name: 'brandDetail',
        component: brandDetail,
        meta: {
            title: '',
        },
    },
    {
        path: '/agreement',
        name: 'agreement',
        component: agreement,
        meta: {
            title: '用户协议和隐私协议',
        },
    },
    {
        path: '/productDetail',
        name: 'productDetail',
        component: productDetail,
        meta: {
            title: '',
        },
    },
    {
        path: '/reachHomeIndex',
        name: 'reachHomeIndex',
        component: reachHomeIndex,
        meta: {
            title: '荟品到家',
        },
    },
    {
        path: '/idList',
        name: 'idList',
        component: idList,
        meta: {
            title: '身份卡列表',
        },
    },
    {
        path: '/idInfo',
        name: 'idInfo',
        component: idInfo,
        meta: {
            title: '',
        },
    },
    {
        path: '/makeHome',
        name: 'makeHome',
        component: makeHome,
        meta: {
            title: '荟品到家',
        },
    },
    {
        path: '/progress',
        name: 'progress',
        component: progress,
        meta: {
            title: '直送到家',
        },
    }, {
        path: '/feeback',
        name: 'feeback',
        component: feeback,
        meta: {
            title: '直送到家',
        },
    },
    {
        path: '/shareCoupon',
        name: 'shareCoupon',
        component: shareCoupon,
        meta: {
            title: '购物金领取页',
        },
    }, {
        path: '/userCoupon',
        name: 'userCoupon',
        component: userCoupon,
        meta: {
            title: '购物金领取页',
        },
    },
    {
        path: '/oneCoupon',
        name: 'oneCoupon',
        component: oneCoupon,
        meta: {
            title: '购物金领取页',
        },
    }, {
        path: '/userOneCoupon',
        name: 'userOneCoupon',
        component: userOneCoupon,
        meta: {
            title: '购物金领取页',
        },
    },
    {
        path: '/memberDetail',
        name: 'memberDetail',
        component: memberDetail,
        meta: {
            title: '超级荟员',
        },
    },
    {
        path: '/userDetail',
        name: 'userDetail',
        component: userDetail,
        meta: {
            title: '超级荟员',
        },
    },
    {
        path: '/accountConflict',
        name: 'accountConflict',
        component: accountConflict,
        meta: {
            title: '帐号冲突',
        },
    },
    {
        path: '/index',
        component: userIndex,
        meta: {
            title: '超级荟员',
        },
    },
    {
        path: '/headNav',
        name: 'headNav',
        component: headNav,
    },
    {
        path: '/sales',
        name: 'sales',
        component: salesPage,
        meta: {
            title: '售后列表',
        },
    },
    {
        path: '/yearReport',
        name: 'yearReport',
        component: () =>
            import ('../views/yearReport/index.vue'),
        meta: {
            title: '年度购物金',
        },
    },
    {
        path: '/logistics',
        name: 'logistics',
        component: () =>
            import ('../views/logistics/index.vue'),
        meta: {
            title: '查看物流'
        }
    }
]

const router = new VueRouter({
    base: process.env.VUE_APP_PATH, // 基础路径
    mode: 'history',
    routes,
})
export default router