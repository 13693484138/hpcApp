import { setTimeout } from 'core-js'
import axios from 'axios';
export const compareVersion = (v1, v2) => {
    // 都为空，相等，返回0
    if (!v1 && !v2) {
        return 0;
    }

    // v1为空，v2不为空，返回-1
    if (!v1 && v2) {
        return -1;
    }

    // v2为空，v1不为空，返回1
    if (v1 && !v2) {
        return 1;
    }

    let v1Arr = v1.split('.')
    let v2Arr = v2.split('.')
    // 取字段最少的，进行循环比较
    let smallCount = v1Arr.length > v2Arr.length ? v2Arr.length : v1Arr.length

    for (let i = 0; i < smallCount; i++) {
        let value1 = v1Arr[i]
        let value2 = v2Arr[i]
        if (value1 > value2) {
            // v1版本字段大于v2版本字段，返回1
            return 1;
        } else if (value1 < value2) {
            // v2版本字段大于v1版本字段，返回-1
            return -1;
        }
        // 版本相等，继续循环。
    }

    // 版本可比较字段相等，则字段多的版本高于字段少的版本。
    if (v1Arr.length > v2Arr.length) {
        return 1
    } else if (v1Arr.length < v2Arr.length) {
        return -1
    } else {
        return 0
    }
    return 0;
};
/**
 * 常用工具
 * @author maybe
 */

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
        if (!name) return
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        window.localStorage.setItem(name, content)
    }
    /**
     * 获取localStorage
     */
export const getStore = (name) => {
        if (!name) return
        return window.localStorage.getItem(name)
    }
    /**
     * 删除localStorage
     */
export const removeStore = (name) => {
        if (!name) return
        window.localStorage.removeItem(name)
    }
    /**
     * 延迟加载方法
     * @param {*} fn
     * @param {*} time
     */
export const submitTimeOut = (fn, time = 1000) => {
    setTimeout(function() {
        fn();
    }, time);
};
/**
 * 创建script
 * @param url
 * @returns {Promise}
 */
export const createScript = (url) => {
    let promise = new Promise((resolve) => {
        let scriptElement = document.createElement('script')
        scriptElement.src = url
        document.body.appendChild(scriptElement)
        resolve('ok')
    })
    return promise
}

/**
 * 移除script标签
 * @param scriptElement script dom
 */
export const removeScript = (scriptElement) => {
    document.body.removeChild(scriptElement)
}

/**
 * 深拷贝
 * @param {*} obj
 */
export const deepClone = (obj) => {
        var result = Array.isArray(obj) ? [] : {}
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object') {
                    result[key] = deepClone(obj[key]) //递归复制
                } else {
                    result[key] = obj[key]
                }
            }
        }
        return result
    }
    /**
     * 函数节流
     * @param {*} fn
     * @param {*} interval
     */
export const throttle = (fn, interval = 300) => {
        let canRun = true;
        return function() {
            if (!canRun) return;
            canRun = false;
            setTimeout(() => {
                fn.apply(this, arguments)
                canRun = true
            }, interval)
        }
    }
    /**
     * @desc  函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
     * @param  func 需要执行的函数
     * @param  wait 延迟执行时间（毫秒）
     * @param  immediate---true 表立即执行，false 表非立即执行
     **/
export const debounce = (func, wait, immediate) => {
        let timer;
        return function() {
            let context = this;
            let args = arguments;

            if (timer) clearTimeout(timer)
            if (immediate) {
                var callNow = !timer
                timer = setTimeout(() => {
                    timer = null
                }, wait)
                if (callNow) func.apply(context, args)
            } else {
                timer = setTimeout(function() {
                    func.apply(context, args);
                }, wait);
            }
        }
    }
    /**
     * 数字转整数 如 100000 转为10万
     * @param {需要转化的数} num
     * @param {需要保留的小数位数} point
     */
export const tranNumber = (num, point) => {
    let numStr = num.toString()
        // 十万以内直接返回
    if (numStr.length < 6) {
        return numStr
    }
    //大于8位数是亿
    else if (numStr.length > 8) {
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
    }
    //大于6位数是十万 (以10W分割 10W以下全部显示)
    else if (numStr.length > 5) {
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
    }
}

/**
 * 获取路由参数
 * @param {需要获得的参数名} name
 */
export const getUrlParameter = (name) => {
        let pageUrl = window.location.href
        pageUrl = pageUrl.replace('?', '&')
        const searchParams = new URLSearchParams(pageUrl)
        const val = searchParams.getAll(name)[0]
        return val
    }
    /**
     * 是否为整数
     * @param {是否为整数} num
     */
export const isInteger = (num) => {
        return Number(num) % 1 === 0
    }
    /**
     * app信息
     */
export const getAppInfo = () => {
        var systemInfo = null
        if (window.hpcapi != undefined) {
            systemInfo = JSON.parse(window.hpcapi.systemInfo())
        }
        return systemInfo
    }
    /**
     * 计算--乘
     */
export const mul = (a, b) => {
    var c = 0,
        d = a.toString(),
        e = b.toString()
    try {
        c += d.split('.')[1].length
    } catch (f) {}
    try {
        c += e.split('.')[1].length
    } catch (f) {}
    return (
        (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
    )
}

function mulF(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString()
    try {
        c += d.split('.')[1].length
    } catch (f) {}
    try {
        c += e.split('.')[1].length
    } catch (f) {}
    return (
        (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
    )
}
//减法
export const sub = (a, b) => {
        var c, d, e
        try {
            c = a.toString().split('.')[1].length
        } catch (f) {
            c = 0
        }
        try {
            d = b.toString().split('.')[1].length
        } catch (f) {
            d = 0
        }
        return (e = Math.pow(10, Math.max(c, d))), (mulF(a, e) - mulF(b, e)) / e
    }
    //加法
export const add = (a, b) => {
        var c, d, e
        try {
            c = a.toString().split('.')[1].length
        } catch (f) {
            c = 0
        }
        try {
            d = b.toString().split('.')[1].length
        } catch (f) {
            d = 0
        }
        return (e = Math.pow(10, Math.max(c, d))), (mulF(a, e) + mulF(b, e)) / e
    }
    /**
     * 判断某个原生DOM元素是否不在屏幕可见区内
     * @param {*} el 原生DOM元素
     */
export const isElementNotInViewport = (el) => {

        let rect = el == undefined ? "" : el.getBoundingClientRect();
        return (
            rect.top >= (window.innerHeight || document.documentElement.clientHeight) ||
            rect.bottom <= 0
        )
    }
    /**
     * 判断是不是在app中
     */
export const isInApp = () => {
        var isApp = null
        if (window.hpcapi != undefined) {
            var systemInfo = JSON.parse(window.hpcapi.systemInfo())
            var appId = systemInfo.appID
            isApp = appId ? true : false
        }
        return isApp
    }
    // 阿里云上传图片/压缩
export const uploadOne = (file, path, success) => {
        function add0(m) {
            return m < 10 ? '0' + m : m
        }

        function imgNameRome() {
            var time = new Date()
            var y = time.getFullYear()
            var m = time.getMonth() + 1
            var d = time.getDate()
            var h = time.getHours()
            var mm = time.getMinutes()
            var s = time.getSeconds()

            var imgName = y + '/' + add0(m) + '/'
            return imgName
        }

        function imgName() {
            var time = new Date()
            var y = time.getFullYear()
            var m = time.getMonth() + 1
            var d = time.getDate()
            var h = time.getHours()
            var mm = time.getMinutes()
            var s = time.getSeconds()

            var imgName = y + add0(m) + add0(d) + add0(h) + add0(mm) + add0(s)
            return imgName
        }

        function RndNum(n) {
            var rnd = ''
            for (var i = 0; i < n; i++) {
                rnd += Math.floor(Math.random() * 10)
            }
            return rnd
        }
        /**
         * 三个参数
         * file：一个是文件(类型是图片格式)，
         * w：一个是文件压缩的后宽度，宽度越小，字节越小
         * objDiv：一个是容器或者回调函数
         */
        function photoCompress(file, w, objDiv) {
            var ready = new FileReader()
                /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,
                如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
            ready.readAsDataURL(file)
            ready.onload = function() {
                var re = this.result
                canvasDataURL(re, w, objDiv)
            }
        }
        /**
         * 按比例压缩图片
         */
        function canvasDataURL(path, obj, callback) {
            var img = new Image()
            img.src = path
            img.onload = function() {
                var that = this
                    // 默认按比例压缩
                var w = that.width,
                    h = that.height,
                    scale = w / h
                w = obj.width || w
                h = obj.height || w / scale
                var quality = 0.7 // 默认图片质量为0.7
                    //生成canvas
                var canvas = document.createElement('canvas')
                var ctx = canvas.getContext('2d')
                    // 创建属性节点
                var anw = document.createAttribute('width')
                anw.nodeValue = w
                var anh = document.createAttribute('height')
                anh.nodeValue = h
                canvas.setAttributeNode(anw)
                canvas.setAttributeNode(anh)
                ctx.drawImage(that, 0, 0, w, h)
                    // 图像质量
                if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                    quality = obj.quality
                }
                // quality值越小，所绘制出的图像越模糊
                var base64 = canvas.toDataURL('image/jpeg', quality)
                    // 回调函数返回base64的值
                callback(base64)
            }
        }
        /**
         * 将以base64的图片url数据转换为Blob 用url方式表示的base64图片数据
         */
        function convertBase64UrlToBlob(urlData) {
            var arr = urlData.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new Blob([u8arr], { type: mime })
        }

        function getSign() {
            return new Promise((resolve, reject) => {
                axios.post(`https://api.hpcang.com/file/v1/oss/postPolicy`, {
                    "bucket": "hpc-oss",
                    "sourceObject": "shop",
                    "contentSize": "100"
                }).then(res => {
                    let data = res.data;
                    if (data.success) {
                        resolve(data.data);
                    } else {
                        reject(data.errorMessage)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        }

        function requestData(data, filter) {
            let request = new FormData();
            request.append("key", storeAs);
            request.append("OSSAccessKeyId", filter.accessId);
            request.append("policy", filter.policy);
            request.append("signature", filter.signature);
            request.append("success_action_status", '200');
            request.append('file', data)
            axios({
                url: `${filter.host}`,
                method: "POST",
                data: request,
                header: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(res => {
                if (res.status == 200) {
                    let avatarImgUrl = 'https://img.hpcang.com/' + storeAs;
                    console.log(avatarImgUrl);
                    success && success(avatarImgUrl)
                }
            });
        }
        var suffix = file.name.substr(file.name.indexOf('.'))
        var storeAs =
            'shop/' + path + '/' + imgNameRome() + imgName() + RndNum(6) + suffix // 命名空间
            // 图片小于1m原图上传
        if (file.size / 1024 <= 1024) {
            // 阿里云Oss
            getSign().then(filter => {
                requestData(file, filter)
            })
        } else {
            //压缩文件
            photoCompress(file, { quality: 0.7 }, function(base64Codes) {
                var blob = convertBase64UrlToBlob(base64Codes) //转为Blob类型
                getSign().then(filter => {
                    requestData(blob, filter)
                })
            })
        }
    }
    /**
     * 复制文本id 为复制得值
     * 原理为动态生成一个隐藏INPUT标签
     */
export function copy(id) {
    let url = id;
    let oInput = document.createElement("input");
    oInput.id = "yscope";
    oInput.value = url;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand("copy");
    oInput.style = "display:none";
    oInput.remove();
    return true;
}
/**
 * 日期格式转转时间戳
 * 一般用于倒计时
 */
export function getTimestamp(time) {
    if (time != "") {
        var date = new Date(time.replace(/-/g, '/'));
        return date.getTime();
    }
    return "";
}
/**
 * 判断数据是否为Null或者undefined或者为空字符串
 */
export function CheckIsNullOrEmpty(value) {
    //正则表达式用于判斷字符串是否全部由空格或换行符组成
    var reg = /^\s*$/
    return (value != null && value != undefined && !reg.test(value))
}