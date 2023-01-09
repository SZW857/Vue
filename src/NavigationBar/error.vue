<template>
  <el-dialog
      title="登录信息提示"
      v-model="dialogVisible"
      width="35%"
  >
    <span>你已经退出登录</span>
    <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialogVisible1">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true,
    }
  },
  methods: {
    dialogVisible1(){
      this.dialogVisible=false
      this.$router.replace("/login")
    }
  },
}
</script>