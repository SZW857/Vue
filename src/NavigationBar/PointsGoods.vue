<template>
  <el-container class="layout-container-demo" style="height: 700px">
    <el-aside width="200px">
      <h3 class="mb-2">菜单栏</h3>
      <el-menu
          active-text-color="#3E82FF"
          background-color="#E1E6F0"
          class="el-menu-vertical-demo"
          mode="vertical"
          router
      >
        <el-sub-menu index="/gh">
          <template #title>
            <el-icon><message /></el-icon>个人信息
          </template>
          <el-menu-item-group>
            <el-menu-item index="/cPasswd_p">修改密码</el-menu-item>
            <el-menu-item index="/cInfo_p">修改个人资料</el-menu-item>
          </el-menu-item-group>

        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu /></el-icon>活动报名
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">活动报名结果</el-menu-item>
            <el-menu-item index="2-2">退选活动结果</el-menu-item>
            <el-menu-item index="2-3">活动报名日志</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="">
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

import { Menu as IconMenu, Message } from '@element-plus/icons-vue'

import type { FormInstance, FormRules } from 'element-plus'
const parsams=JSON.parse(localStorage.getItem("usernames")||'{}')



const ruleForm = {
  name: '',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
  num: '',

}



const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}



const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))


const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}


</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
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
