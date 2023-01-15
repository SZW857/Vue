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
  window.localStorage.removeItem('VolunteerToken');
  router.replace("/login")
}
</script>
