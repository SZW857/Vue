<template>
  <el-container class="layout-container-demo" style="height: 700px">
    <el-aside width="200px">
      <h3 class="mb-2">菜单栏</h3>
      <el-menu
          active-text-color="#3E82FF"
          background-color="#E1E6F0"
          class="el-menu-vertical-demo"
          mode="vertical"
          :router="true"
      >
        <el-sub-menu index="0">
          <template #title>
            <el-icon><user/></el-icon>志愿者信息
          </template>
          <el-menu-item-group >
            <el-menu-item index="/cInfo_p">个人资料</el-menu-item>
            <el-menu-item index="/cPasswd_p">修改密码</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu /></el-icon>活动报名
          </template>
          <el-menu-item-group>
            <el-menu-item index="/EnrollResult">活动报名结果</el-menu-item>

          </el-menu-item-group>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><icon-menu /></el-icon>寻求帮助
          </template>
          <el-menu-item-group>
            <el-menu-item index="/searchHelp">发布活动信息</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div style="color: #d23243">
        <h3>站内消息</h3>
        </div>
      </el-header>
      <el-main style="background-color: #77b093">
        <div>
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import router from '../../router'
import {inject, onMounted,} from "vue";
onMounted(() => {
    router.replace('/cInfo_p')
})
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-8);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  background-color: #E1E6F0;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;

}
.toolbar{
  font-size: 16px;
}
</style>
