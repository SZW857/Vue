<template>
  <el-container class="layout-container-demo" style="height: 700px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
            active-text-color="#3E82FF"
            background-color="#E1E6F0"
            class="el-menu-vertical-demo"
            :router="true"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><edit /></el-icon>个人信息
            </template>
            <el-menu-item-group>
              <el-menu-item index="/cInfo_a">修改个人资料</el-menu-item>
              <el-menu-item index="/cPasswd_a">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>留言板
            </template>
            <el-menu-item-group>

              <el-menu-item index="2-1">留言记录</el-menu-item>
              <el-menu-item index="2-2">编辑留言</el-menu-item>
            </el-menu-item-group>


          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><icon-menu /></el-icon>活动情况
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">志愿活动发布</el-menu-item>
              <el-menu-item index="2-2">志愿者签到统计</el-menu-item>
              <el-menu-item index="2-3">志愿者求助审核</el-menu-item>
              <el-menu-item index="/RegisterVerify">志愿者注册审核</el-menu-item>
            </el-menu-item-group>


          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><message /></el-icon>社区信息
            </template>
            <el-menu-item-group>
              <el-menu-item index="/PublishNews">社区告示发布</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <p  >欢迎来到社区公益服务系统</p>
      </el-header>

      <el-mains style="background-color: #77b093">
        <div>
          <router-view></router-view>
        </div>
      </el-mains>
    </el-container>
  </el-container>
</template>

<script  setup>
import {onMounted} from "vue";
import router from "@/router";
onMounted(()=>{
router.replace("/cInfo_a")
})
</script>



<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-8);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background-color: #E1E6F0
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
p{
color: #d23243;
text-align: center;
font-size: 22px;
font-weight: bold;
}

</style>
