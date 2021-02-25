import { Toast } from 'vant'
import wx from './jssdkUtils'
import memberServe from '@/api/userMembers'
import { apiUrl, appUrl, productDetailsUrl } from './config'
// var wx = require("weixin-js-sdk");
//调用原生或一些微信方法方法
export function openApp(pageUrl) {
    var _detectVersion2 = detectVersionPr(),
        isAndroid = _detectVersion2.isAndroid,
        isIOS = _detectVersion2.isIOS,
        isIOS9 = _detectVersion2.isIOS9,
        isWeiXin = _detectVersion2.isWeiXin
    var baseUrl = 'hpcang://h5.hpcang.com?url='
    if (isWeiXin) {
        Toast('请在浏览器中打开')
        return
    } else if (isIOS) {
        var ifr = document.createElement('iframe')
        ifr.setAttribute('src', pageUrl)
        ifr.setAttribute('style', 'display:none')
        document.body.appendChild(ifr)
    } else if (isAndroid || isIOS9) {
        if (isAndroid) {
            var isSixPlus = isHighVersionAndroid()
            if (isSixPlus) {
                location.href = baseUrl + pageUrl
                setTimeout(function() {
                    gotoSharePage(pageUrl)
                }, 250)
            } else {
                var timeout,
                    t = 4000,
                    hasApp = true
                var openScript = setTimeout(function() {
                    if (!hasApp) {
                        gotoSharePage(pageUrl)
                    }

                    document.body.removeChild(ifr)
                }, 5000)
                var t1 = Date.now()
                var ifr = document.createElement('iframe')
                ifr.setAttribute('src', baseUrl + pageUrl)
                ifr.setAttribute('style', 'display:none')
                document.body.appendChild(ifr)
                timeout = setTimeout(function() {
                    var t2 = Date.now()

                    if (t2 - t1 < t + 100) {
                        hasApp = false
                    }
                }, t)
            }
        } else if (isIOS9) {
            location.href = pageUrl
        }
    }
}

function isHighVersionAndroid() {
    var version = getAndroidVersion()

    if (version > 6) {
        return true
    } else {
        return false
    }
}

function getAndroidVersion() {
    var ua = navigator.userAgent.toLowerCase()
    var version = null

    if (ua.indexOf('android') > 0) {
        var reg = /android [\d._]+/gi
        var v_info = ua.match(reg)
        version = (v_info + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.') //得到版本号4.2.2

        version = parseInt(version.split('.')[0]) // 得到版本号第一位
    }

    return version
}
export function gotoSharePage(pageUrl) {
    if (detectVersionPr().isWeiXin) {
        Toast('请在Safari中打开');
        return
    }
    if (pageUrl) {
        window.location.href = pageUrl
        return
    }
}

//原生版本差异性控制 vs为当前版本  #写法有待优化true为APP判断false为接口判断
export function VersionDiff(vs) {
    var oldVersion = '1.6.1'
    var newVesion = vs.split('.')
    oldVersion = oldVersion.split('.')
    if (newVesion[0] > oldVersion[0]) {
        return true
    } else if (newVesion[0] < oldVersion[0]) {
        return false
    } else {
        if (newVesion[1] > oldVersion[1]) {
            return true
        } else if (newVesion[1] < oldVersion[1]) {
            return false
        } else {
            if (newVesion[2] > oldVersion[2]) {
                return true
            } else if (newVesion[2] < oldVersion[2]) {
                return false
            } else {
                return true
            }
        }
    }
}
//静止微信上下滑动
export function wxNoScroll(is) {
    document.body.addEventListener(
        'touchmove',
        function(e) {
            e.preventDefault()
        }, { passive: is },
    )
}
//

//跳转商品详情和下载APP地址
//微信端跳下载页面
export function goodsUrl(id) {
    if (isInAppPr()) {
        window.hpcapi.openRouter(productDetailsUrl + id)
    } else {
        if (detectVersionPr().isAndroid) {
            memberServe.getAppVersion().then((res) => {
                window.location.href = res.url
                    // window.location.href=res.
            })
        } else if (detectVersionPr().isIOS9) {
            window.location.href =
                'https://apps.apple.com/cn/app/%E8%8D%9F%E5%93%81%E4%BB%93-%E8%B5%B0%E8%BF%9B%E5%93%81%E7%89%8C%E4%BB%93%E5%BA%93%E6%B7%98%E5%A5%BD%E8%B4%A7/id1464120909'
        }
    }
}
// 下载
export function downloadApp() {
    if (detectVersionPr().isAndroid) {
        if (detectVersionPr().isWeiXin) {
            Toast('请在浏览器中打开')
        } else {
            memberServe.getAppVersion().then((res) => {
                window.location.href = res.url
            })
        }
    } else if (detectVersionPr().isIOS9) {
        window.location.href =
            'https://apps.apple.com/cn/app/%E8%8D%9F%E5%93%81%E4%BB%93-%E8%B5%B0%E8%BF%9B%E5%93%81%E7%89%8C%E4%BB%93%E5%BA%93%E6%B7%98%E5%A5%BD%E8%B4%A7/id1464120909'
    }
}
//取URL的参数name为实参
export function getUrlParams(name) {
    // 不传name返回所有值，否则返回对应值
    var url = window.location.search
    if (url.indexOf('?') == 1) {
        return false
    }
    url = url.substr(1)
    url = url.split('&')
    var name = name || ''
    var nameres
        // 获取全部参数及其值
    for (var i = 0; i < url.length; i++) {
        var info = url[i].split('=')
        var obj = {}
        obj[info[0]] = decodeURI(info[1])
        url[i] = obj
    }
    // 如果传入一个参数名称，就匹配其值
    if (name) {
        for (var i = 0; i < url.length; i++) {
            for (const key in url[i]) {
                if (key == name) {
                    nameres = url[i][key]
                }
            }
        }
    } else {
        nameres = url
    }
    // 返回结果
    return nameres
}
//微信授权
export function wxAuth(urlPage) {
    let APPID = 'wxbad3cf328b48f2e4'
    let url = apiUrl + '/thirdauth/wx/v1/wxauth/callBack'
    url = encodeURI(url)
    let STATE = urlPage ? urlPage : appUrl;
    //   window.location.href="https://api-dev.hpcang.com/thridauth/wx/v1/wxauth/wxWebAuth"
    window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        APPID +
        '&redirect_uri=' +
        url +
        '&response_type=code&scope=snsapi_userinfo&state=' +
        STATE +
        '#wechat_redirect'
}
//微信授权
export function wxAuth2(urlPage, APPID, isAlert = true) {
    let url = apiUrl + '/thirdauth/wx/v1/extensionauth/callBack?appid=' + APPID;
    url = encodeURI(url);
    let type = isAlert ? 'snsapi_userinfo' : 'snsapi_base';
    // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
    //   APPID +
    //   '&redirect_uri=' +
    //   url +
    //   '&response_type=code&scope='+type+'&state=' +
    //   urlPage
    //   '#wechat_redirect'
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${url}&response_type=code&scope=${type}&state=${urlPage}#wechat_redirect`;
}

//判断是不是在app内部
export function isInApp() {
    var isApp = null
    if (window.hpcapi != undefined) {
        var systemInfo = JSON.parse(window.hpcapi.systemInfo())
        var appId = systemInfo.appID
        isApp = appId ? true : false
    }
    return isApp
}

function isInAppPr() {
    var isApp = null
    if (window.hpcapi != undefined) {
        var systemInfo = JSON.parse(window.hpcapi.systemInfo())
        var appId = systemInfo.appID
        isApp = appId ? true : false
    }
    return isApp
}
//判断设备
export function detectVersion() {
    var isAndroid,
        isIOS,
        isIOS9,
        version,
        isWeiXin,
        u = navigator.userAgent,
        ua = u.toLowerCase()
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        //android终端或者uc浏览器//Android系统
        isAndroid = true
    }
    if (ua.indexOf('like mac os x') > 0) {
        //ios
        var regStr_saf = /os [\d._]*/gi
        var verinfo = ua.match(regStr_saf)
        version = (verinfo + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.')
        isIOS = true
    }
    var version_str = version + ''

    if (version_str != 'undefined' && version_str.length > 0) {
        version = parseInt(version)

        if (version >= 8) {
            // ios9以上
            isIOS9 = true
        } else {
            isIOS = true
        }
    }

    if (u.indexOf('MicroMessenger') > -1) {
        isWeiXin = true
    }

    return {
        isAndroid: isAndroid,
        isIOS9: isIOS9,
        isWeiXin: isWeiXin,
    }
}

function detectVersionPr() {
    var isAndroid,
        isIOS,
        isIOS9,
        version,
        isWeiXin,
        u = navigator.userAgent,
        ua = u.toLowerCase()
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        //android终端或者uc浏览器//Android系统
        isAndroid = true
    }
    if (ua.indexOf('like mac os x') > 0) {
        //ios
        var regStr_saf = /os [\d._]*/gi
        var verinfo = ua.match(regStr_saf)
        version = (verinfo + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.')
        isIOS = true
    }
    var version_str = version + ''

    if (version_str != 'undefined' && version_str.length > 0) {
        version = parseInt(version)

        if (version >= 8) {
            // ios9以上
            isIOS9 = true
        } else {
            isIOS = true
        }
    }

    if (u.indexOf('MicroMessenger') > -1) {
        isWeiXin = true
    }

    return {
        isAndroid: isAndroid,
        isIOS: isIOS,
        isIOS9: isIOS9,
        isWeiXin: isWeiXin,
    }
}
/**
 * 微信授权登录
 *
 */
export function wxLogin() {
    if (detectVersion().isWeiXin) {}
}

/**
 * 支付功能
 * isInApp:判断是否是在APP内部
 * isWeiXin:判断是否在微信内部
 * 若既不是微信中也不是app中也需要做处理
 */
export function openWXPay(data) {
    if (isInAppPr()) {
        return window.hpcapi.openWXPay(JSON.stringify(data))
    } else if (detectVersion().isWeiXin) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                appId: data.appId, //公众号名称，由商户传入
                timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
                nonceStr: data.nonceStr, //随机串
                package: data.package,
                signType: 'MD5', //微信签名方式：
                paySign: data.paySign, //微信签名
            },
            function(res) {
                if (res.err_msg == 'get_brand_wcpay_request:ok') {
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                }
            },
        )
    } else {}
}
/**
 * 分享
 * options: 分享卡片内的数据，必传字段
 * linkUrl: 分享出去的地址，非必传，默认值为当前地址
 * showAlert: 分享弹框是否跳出，非必传，默认值为false
 * isInApp:判断是否是在APP内部
 * isWeiXin:判断是否在微信内部
 */
export function sharePage(options, isLocation) {
    //  var url = linkUrl || window.location.href;
    //  var showAlert = showAlert || false;
    return new Promise((resolve, reject) => {
        const opt = {
            title: options.title,
            linkUrl: options.linkUrl, // 分享出去带 userId 的url
            showShare: true, // 是否展示分享按钮
            showAlert: options.showAlert // 是否调用原生分享弹框
        }
        if (options.description) {
            opt.desc = options.description
        }
        if (options.shareImage) {
            opt.shareImage = options.shareImage
        }
        if (options.path) {
            opt.path = options.path
        }
        if (options.showAlert) {
            opt.showAlert = options.showAlert
        }
        if (isInAppPr()) {
            window.hpcapi.showShareData(JSON.stringify(opt))
        } else if (detectVersionPr().isWeiXin) {
            wx.ready(function() {
                if (isLocation) {
                    wx.checkJsApi({
                        jsApiList: ['getLocation'],
                        success: function(res) {
                            // alert(JSON.stringify(res));
                            // alert(JSON.stringify(res.checkResult.getLocation));
                            if (res.checkResult.getLocation == false) {
                                console.log('版本太低,无法获取');
                                return
                            }
                        },
                    })
                    wx.getLocation({
                        type: 'gcj02',
                        success: function(res) {
                            resolve(res);
                            // var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
                            // var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
                            // var speed = res.speed // 速度，以米/每秒计
                            // var accuracy = res.accuracy // 位置精度
                        },
                        cancel: function(res) {
                            reject(res)
                            console.log('拒绝授权');
                        },
                    })
                } else {
                    resolve();
                }
                //分享给朋友
                wx.onMenuShareAppMessage({
                        title: options.title,
                        desc: options.description,
                        link: options.linkUrl,
                        imgUrl: options.shareImage,
                        success: function(res) {
                            // alert('已分享');
                        },
                        cancel: function(res) {
                            // alert('已取消');
                        },
                        fail: function(res) {
                            // alert(JSON.stringify(res));
                        },
                    })
                    //分享给朋友圈
                wx.onMenuShareTimeline({
                        title: options.title,
                        desc: options.description,
                        link: options.linkUrl,
                        imgUrl: options.shareImage,
                        success: function(res) {
                            // alert('已分享');
                            //   var service = 'candy'
                            //   var event = 'saveUserOperation'
                            //   var objPam = { typeCode: 4 }
                            //   var type = 'post'
                            //   ajaxFun(
                            //     service,
                            //     event,
                            //     objPam,
                            //     type,
                            //     function (dat) {
                            //       if (dat.code == 0) {
                            //         console.log('已分享')
                            //       }
                            //     },
                            //     function (xhr, status, error) {},
                            //     function (xhr, status, error) {}
                            //   )
                        },
                        cancel: function(res) {
                            // alert('已取消');
                            //
                        },
                        fail: function(res) {
                            // alert(JSON.stringify(res));
                        },
                    })
                    // 分享到QQ
                wx.onMenuShareQQ({
                        title: options.title,
                        desc: options.description,
                        link: options.linkUrl,
                        imgUrl: options.shareImage,
                        success: function(res) {
                            // alert('已分享');
                        },
                        cancel: function(res) {
                            // alert('已取消');
                        },
                        fail: function(res) {
                            // alert(JSON.stringify(res));
                        },
                    })
                    // 分享到QQ空间
                wx.onMenuShareQZone({
                        title: options.title,
                        desc: options.description,
                        link: options.linkUrl,
                        imgUrl: options.shareImage,
                        success: function(res) {
                            //
                            // ');
                        },
                        cancel: function(res) {
                            // alert('已取消');
                        },
                        fail: function(res) {
                            // alert(JSON.stringify(res));
                        },
                    })
                    // 分享到QQ微博
                wx.onMenuShareWeibo({
                    title: options.title,
                    desc: options.description,
                    link: options.linkUrl,
                    imgUrl: options.shareImage,
                    success: function(res) {
                        // alert('已分享');
                    },
                    cancel: function(res) {
                        // alert('已取消');
                    },
                    fail: function(res) {
                        // alert(JSON.stringify(res));
                    },
                })
            })
        }
    })
}