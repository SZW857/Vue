<template>
  <div class="index_container" :style="{'width': `${searchWidth}px`}">
    <div class="header">
      <div id="header_img">
        <img src="@/static/picture/5151.png">
      </div>
      <div id="header_nav" >
        <div>
          <router-link to="/login">登录</router-link>|
          <router-link to="/register">注册</router-link>
        </div>
      </div>
    </div>

    <div style="font-size: 150%">
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545C64"
          text-color="#fff"
          active-text-color="#fff"
          router
      >
        <el-menu-item index="/" style="margin-left: 650px">首页</el-menu-item>
        <el-menu-item index="/projects" >志愿活动</el-menu-item>
        <el-menu-item index="/honor" >荣誉榜</el-menu-item>
        <el-menu-item index="/goods">测试页</el-menu-item>
        <el-menu-item index="/video">社区公益推广</el-menu-item>
        <el-menu-item index="/news">社区要闻</el-menu-item>
        <el-menu-item index="/freeze">不动</el-menu-item>
        <el-menu-item index="/admin">后台管理入口</el-menu-item>
      </el-menu>
    </div>


    <router-view></router-view>

    <div class="el_footer" :style="{'width': `${searchWidth}px`}" >
      <div id="el_footer_nav1">
        <h2>网站导航</h2>
        <router-link to="/">首页</router-link>|
        <router-link to="/guide">公益产品最新消息</router-link>|
        <router-link to="/Login">产品招募资源中心</router-link>|
        <router-link to="/register">关于我们</router-link>|
        <router-link to="">English</router-link>
      </div>
      <div id="el_footer_nav2">
        <h2>联系我们</h2>
        电话：029-83463902 转 123456<br/>
        电邮：751225241@qq.com<br/>
        地址：西红市土豆区红薯街万事诸顺中心A座1234<br/>
      </div>

      <div id="el_footer_bottom" :style="{'width': `${searchWidth}px`}">
        ©好公益平台 版权所有&emsp;&emsp;粤—北京理工大学珠海学院 技术支持：计算机学院所有老师
      </div>
    </div>
  </div>
</template>
<style src="@/static/css/App.css" scoped/>
<script>
import { ref } from 'vue'
export default {
  data() {
    return {
      activeIndex:ref('2'),
      searchWidth: 0
    }
  },
  mounted() {
    this.searchWidth = window.innerWidth; // 组件初始化的时候不会触发onresize事件，这里强制执行一次
    window.onresize = () => {
      if (!this.timer) { // 使用节流机制，降低函数被触发的频率
        this.timer = true;
        let that = this; // 匿名函数的执行环境具有全局性，为防止this丢失这里用that变量保存一下
        setTimeout(function () {
          that.searchWidth = window.innerWidth;
          that.timer = false;
        }, 400)
      }
    }
  }
}
</script>
