<template>
  <el-container class="layout-container-demo" style="height: 700px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
            active-text-color="#3E82FF"
            background-color="#E1E6F0"
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            default-openeds='["1","2"]'
            router
        >
          <el-sub-menu index="1">
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
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-button type="primary" @click="bbb">前台首页</el-button>
          <el-button type="danger">安全退出</el-button>&emsp;
          欢迎登陆:
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
            ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>{{parsams.userName}}</span>
        </div>
      </el-header>
      <el-mains style="background-color: #77b093">
        <div>
          <router-view></router-view>
        </div>
      </el-mains>
    </el-container>
  </el-container>
</template>


<script lang="ts" setup>

import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { reactive,ref} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const parsams=JSON.parse(localStorage.getItem("usernames")||'{}')

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
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

})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入有效的姓名', trigger: 'blur' },
    { min: 2, max: 4, message: '姓名长度2~5个字符', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],

})
const bbb = () => {

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

const num = ref(1)
const handleChange = (value: number) => {

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
const tableData = ref(Array.from({ length: 20 }).fill(item))

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
