<template>
  <div class="index_container" >
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
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545C64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
      >
        <el-menu-item index="/" style="margin-left: 650px">首页</el-menu-item>
        <el-sub-menu index="2">
          <template #title>我的家</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/projects" >公益项目</el-menu-item>
        <el-menu-item index="/goods" >公益商品</el-menu-item>
        <el-menu-item index="/Login">测试页</el-menu-item>
        <el-sub-menu  index="10">
          <template #title>平台简介</template>
          <el-menu-item index="/video">动画</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
            <el-menu-item index="2-4-2">item two</el-menu-item>
            <el-menu-item index="2-4-3">item three</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </div>


    <router-view></router-view>

    <div class="el_footer">
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
        电话：029-83463902 转 123<br/>
        电邮：751225241@qq.com<br/>
        地址：西红市土豆区红薯街万事诸顺中心A座1234<br/>
      </div>

      <div id="el_footer_bottom">
        ©好公益平台 版权所有&emsp;&emsp;粤—北京理工大学珠海学院 技术支持：计算机学院所有老师
      </div>
    </div>
  </div>
</template>
<style src="@/static/css/App.css" scoped/>
<script lang="ts" setup>
import { ref } from 'vue'
const activeIndex = ref('1')

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
