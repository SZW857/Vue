<template>
  <div class="finish_container">
    <div class="box">
      <div class="content">
        <div><img src="@/static/picture/greenRight.png"/><h1>密码修改完成</h1></div>
      </div>
    </div>
  </div>
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
  ElMessageBox.alert('恭喜重获密码!，即将返回首页', '修改密码提示信息', {
    type:'success',
    confirmButtonText: 'OK',
  })
  setTimeout(()=>{
    router.replace("/login")
  },3000)

}
</script>

<style scoped>
.finish_container{
  margin-top: 40px;
  background-color: #ffffff;
  height: 600px;
  color: #3ccb83;
}
.box{
  background-color: #ffffff;
  width: 600px;
  height: 300px;
  margin-left: 300px;
  -webkit-box-shadow: #e5e2e2 0px 0px 10px;
  -moz-box-shadow: #e5e2e2 0px 0px 30px;
  box-shadow: #e5e2e2 0px 0px 30px;
}
.content{
  height: 150px;
  position: absolute;
  background-color: #ffffff;
  margin: 80px 200px;
}
</style>
