<template>

</template>

<script setup>

let _this=this
this.$alert('登录信息失败!',"提示",{
      confirmButtonText:'确定'
}).then((res)=>{
  localStorage.removeItem('usernames')
  _this.$router.replace({path:'/login'})
})
</script>

<style scoped>

</style>