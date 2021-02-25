/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from "axios";
import store from "@/store";
import { Toast } from "vant";
import { apiUrl } from "./config.js";
import { wxAuth } from "./native.js";
// import { from } from "core-js/fn/array";
// const baseUrl = apiUrl;

// 创建axios实例
var instance = axios.create({
    timeout: 10000,
    baseURL: apiUrl,
    // 设置post请求头
    headers: {
        post: {
            "Content-Type": "application/json;charset=utf-8",
        },
    },
    // 在传递给 then/catch 前，修改响应数据
    transformResponse: [
        function(data) {
            if (typeof data === "string" && data.startsWith("{")) {
                data = JSON.parse(data);
            }
            return data;
        },
    ],
});
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
// instance.interceptors.request.use(
//   config => {
//      let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODI4NTc5MjUsInVzZXJJZCI6IjY2MjM1NzgwNjUzOTYwMzk2OCJ9.Ex4OoY_104k8WC8QmXAJ7_tP9046oV1mQlRlydJbeRA'
//     let token = store.state.login.token
//     token && (config.headers.Authorization = token) && (config.headers.loginType = 'Consumer')
//     return config
//   },
//   error => Promise.error(error)
// )
// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    (res) => {
        // store.commit('updateLoading', false)
        // console.log('res', res)
        // let res = res.data
        console.log("res", res);
        const respone = res.data;

        if (respone.code != 0) {
            // 失败
            console.log("respone.code", respone.code);
            if (respone.code == 405) {
                // 重新登录
            }
            if (respone.code == "") {
                //code未定
                //强更新
            }
            if (respone.code == 20000050 || respone.code == 20000048) {}
            //强制授权
            if (respone.code == 500005) {
                wxAuth();
            }
            if (respone.code == 500004) {
                // window.hpcapi.openLogin();
            }
            if (respone.code == 20000048) {
                //window.hpcapi.openLogin();
            }
            if (respone.code == 20000094) {
                // window.hpcapi.openLogin();
            }
            if (respone.code == 5001) {
                // sucFun && sucFun(res)
                return Promise.resolve(res); // 成功
                // return
            }
            if (respone.code == 5002 || respone.code == 5003) {
                //签到次数无 分享失败
                // sucFun && sucFun(res)
                return Promise.resolve(res); // 成功
                // return
            }
            if (respone.code == 2000010) {
                //要绑定手机号
                return Promise.resolve(res); // 成功
            }
            if (respone.msg && respone.code != 500005) {
                // window.component.toast.showToast(respone.msg)
                Toast.fail(respone.msg);
            }
            return Promise.reject();
        } else {
            // 成功
            console.log("respone.code", respone.code);
            return Promise.resolve(respone.result); // 成功
        }
    },
    // 请求失败
    (error) => {
        if (error) {
            Toast.fail("请求失败！！");
            console.log(error);
            return Promise.reject(error);
        }
    }
);
instance.interceptors.request.use((config) => {
    //console.log('aaa');测试
    // store.commit('updateLoading', true)
    //请求发起之前，显示loadding
    return config;
})
export function request(params) {
    console.log("请求封装--", params);

    let Type;
    if (!params.method) {
        Type = "GET"; // 默认get请求
    } else {
        Type = params.method;
    }
    if (!params.data) {
        params.data = {};
    }
    params.data["hp_version"] = "1.6.5"; // 版本号
    params.data["channel_code"] = 1000; //渠道
    params.data["decrypt_enable"] = true; //是否加密
    const source = !!store.state.user.isAppend ? store.state.user.isAppend : 'h5'; //来源
    const token = store.state.user.appToken;
    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTczNjg2MDcsInVzZXJJZCI6IjEyNjQxNjE4NzkwNTIyMjY1NjEiLCJpYXQiOjE1OTQ3NzY2MDd9.5mBt47JEeA52GahaG0_U_tEiuDXNV31bI93Yj2lfbhk';
    params.data["source"] = source;
    // params.data["hp_token"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDAzOTg5OTEsInVzZXJJZCI6IjQ1NTkwMTQ3MjU3MzU0NjQ5NiIsImlhdCI6MTU5NzgwNjk5MX0.uuzM0v0re3deZX6eXsBHmw4oEyPeu3oX8Xr44yVWlCY";
    // params.data["hp_token"] = token;
    //params.data["hp_token"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDI4Mzc3NjAsInVzZXJJZCI6IjQ2NjEzMDQxMjIyMjE3NzI4MCIsImlhdCI6MTYwMDI0NTc2MH0.Iu8y9mQ8iOWLN_Dbl3vUzrYRoJBAEcqETmKmw8Obobk";
    //params.data["hp_token"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTc4OTMwMDIsInVzZXJJZCI6IjQ0NTM5MDU5MTA3MTUzNTEwNCIsImlhdCI6MTU5NTMwMTAwMn0.QnbX8eb5e_4xc59LxdhFGb12DNarnUxRb1nijlbR6Wg";
    // params.data["hp_token"] = "IfUSAAKqOMX6QoYvkPh5Z4Uk";
    if (token) {
        params.data["hp_token"] = token; //token
    }
    return new Promise((resolve, reject) => {
        instance({
                method: Type,
                url: params.url,
                data: params.data,
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}