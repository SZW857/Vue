const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  lintOnSave: false ,  //加入此行 , false为关闭true为开启
  transpileDependencies: true,
  configureWebpack: {

  resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      }
    ]
   },
  },


    devServer: {
      proxy: 'http://127.0.0.1:8083',
      host: '127.0.0.1',
      port: 8080,
      open: true,// vue项目启动时自动打开浏览器
      // proxy: {
      //   '/api': { // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
      //     target: "http://127.0.0.1:8083", //目标地址，一般是指后台服务器地址
      //     changeOrigin: true, //是否跨域
      //     pathRewrite: { // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
      //       '^/api': ""
      //     }
      //   }
      // }
    }


})


