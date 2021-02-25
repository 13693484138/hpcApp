const path = require('path')
// 是否为生产环境
const isProduction = process.env.NODE_ENV === 'production'
const CompressionPlugin = require('compression-webpack-plugin') // gzip压缩
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 本地环境是否需要使用cdn
const devNeedCdn = true

// cdn链接
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    axios: 'axios',
  },
  css: [
    process.env.VUE_APP_URL + 'cdn/index.css'
  ],
  js: [
    process.env.VUE_APP_URL + 'cdn/vue.min.js',
    process.env.VUE_APP_URL + 'cdn/axios.min.js',
    process.env.VUE_APP_URL + 'cdn/vue-router.min.js',
    process.env.VUE_APP_URL + 'cdn/vuex.min.js',
    process.env.VUE_APP_URL + 'cdn/vant.min.js',
  ],
}
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath:process.env.VUE_APP_PATH,
  lintOnSave: false, // eslint检测 按需开启
  assetsDir: 'assets', //静态资源目录(js,css,img,fonts)这些文件都可以写里面
  // 打包时不生成.map文件
  productionSourceMap: false,
  filenameHashing: false,
  // 输出文件目录
  outputDir: 'dist',
  // webpack-dev-server 相关配置
  devServer: {
    // 设置主机地址
    host: '0.0.0.0',
    // 设置默认端口
    port: 8088,
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        // 开发环境
        target: 'http://192.168.4.111:8888/',
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点更改为目标URL(设置跨域)
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  chainWebpack(config) {
    // // 移除资源预加载(路由懒加载才能正常使用)
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // ============注入cdn start============
    config.plugin('html').tap((args) => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn
      return args
    })
    // ============压缩图片 start============
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      .end()
    // ============压缩图片 end============
    // 设置别名
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
    // 设置 svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
  configureWebpack: (config) => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || devNeedCdn) config.externals = cdn.externals
    // 生产环境相关配置
    // if (isProduction) {
    //   // 代码压缩
    //   config.plugins.push(
    //     new UglifyJsPlugin({
    //       uglifyOptions: {
    //         //生产环境自动删除console
    //         compress: {
    //           warnings: false, // 若打包错误，则注释这行
    //           drop_debugger: true,
    //           drop_console: true,
    //           pure_funcs: ['console.log'],
    //         },
    //       },
    //       sourceMap: false,
    //       parallel: true,
    //     }),
    //   )
    // }
    // gzip压缩
    config.plugins.push(
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.css/,
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false, // 删除原文件
      }),
    )
    // if (isProduction) {
    //   // 开启分离js
    //   config.optimization = {
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //       chunks: 'all',
    //       maxInitialRequests: Infinity,
    //       minSize: 20000,
    //       cacheGroups: {
    //         vendor: {
    //           test: /[\\/]node_modules[\\/]/,
    //           name (module) {
    //             // get the name. E.g. node_modules/packageName/not/this/part.js
    //             // or node_modules/packageName
    //             const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
    //             // npm package names are URL-safe, but some servers don't like @ symbols
    //             return `npm.${packageName.replace('@', '')}`
    //           }
    //         }
    //       }
    //     }
    //   };
    // }
    // 公共代码抽离
    // config.optimization = {
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         chunks: 'all',
    //         test: /node_modules/,
    //         name: 'vendor',
    //         minChunks: 1,
    //         maxInitialRequests: 5,
    //         minSize: 0,
    //         priority: 100,
    //       },
    //       common: {
    //         chunks: 'all',
    //         test: /[\\/]src[\\/]js[\\/]/,
    //         name: 'common',
    //         minChunks: 2,
    //         maxInitialRequests: 5,
    //         minSize: 0,
    //         priority: 60,
    //       },
    //       styles: {
    //         name: 'styles',
    //         test: /\.(sa|sc|c)ss$/,
    //         chunks: 'all',
    //         enforce: true,
    //       },
    //       runtimeChunk: {
    //         name: 'manifest',
    //       },
    //     },
    //   },
    // }
  },
  css: {
    loaderOptions: {
      sass: {
        // 配置scss 全局样式文件 支持全局变量
        prependData: `
       @import "@/assets/css/common.scss";
     `,
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 75, // 换算基数(设计稿宽度/10)
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            propBlackList: [], //黑名单
            exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            // selectorBlackList: [], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
          }),
        ],
      },
    },
  },
}
