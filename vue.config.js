const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


module.exports = defineConfig({

  productionSourceMap:false,
  lintOnSave: false ,  //加入此行 , false为关闭true为开启
  transpileDependencies: true,
  configureWebpack: {

  resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],

            }
        ,
        exclude: /node_modules/,
      },
    ]
   },
  },
  devServer: {
    port:8080,
    proxy: {
      "/proxy": {
        target: "http://127.0.0.1:8083", //目标主机
        ws: false,//是否代理websockets
        changeOrigin: true ,  // 设置同源  默认false，是否需要改变原始主机头为目标URL
        // pathRewrite: {
        //   "^/proxy": ""
        // }
      }
    }
  }
})


