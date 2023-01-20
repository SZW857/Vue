<template>

</template>

<script>
import { ElMessageBox } from 'element-plus'
import { onMounted } from "vue";
import router from '@/router'
export default {
  setup(){
    onMounted(()=>{
      open()
    })
  }
}
const open = () => {
  ElMessageBox.alert('你已经退出登录', '登陆提示信息', {
    type:'success',
    confirmButtonText: 'OK',
  })
  setTimeout(()=>{
    window.location.reload()
  },1000)
  router.push("/")
}
</script>
