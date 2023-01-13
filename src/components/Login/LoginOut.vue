<template>

</template>

<script>
import { ElMessageBox } from 'element-plus'
import { onMounted } from "vue";
import router from '@/router/index.js'
export default {
  setup(){
    onMounted(()=>{
      open()
    })
  }
}
const open = () => {
  ElMessageBox.alert('你已退出登录', '登陆提示信息', {
    type:'error',
    confirmButtonText: 'OK',
  })
  router.replace("/login")
}
</script>
