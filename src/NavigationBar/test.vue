<template>
  <el-row class="tac">
    <el-col :span="12">
      <h5 class="mb-2">菜单栏</h5>

      <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          text-color="#fff"
      >

        <el-sub-menu index="person">
          <template #title>
            <el-icon><message /></el-icon>个人信息
          </template>

          <el-menu-item-group title="Group">
            <el-menu-item index="/cPasswd_p">修改密码</el-menu-item>
            <el-menu-item index="/cInfo_p">修改个人资料</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <el-menu-item index="2">
          <template #title>
            <el-icon><icon-menu /></el-icon>活动报名
          </template>
          <el-menu-item-group title="g2">
            <el-menu-item index="2-1">活动报名结果</el-menu-item>
            <el-menu-item index="2-2">退选活动结果</el-menu-item>
            <el-menu-item index="2-3">活动报名日志</el-menu-item>
          </el-menu-item-group>
        </el-menu-item>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { Menu as IconMenu,} from '@element-plus/icons-vue'



</script>
