<template>
  <el-button @click="send">kkk</el-button>
</template>
<script >
 import axios from 'axios'
import { postRequest,getRequest } from '@/api/config.js'
export default {

  methods:{
    send(){
      // axios.get('http://127.0.0.1:8083/hell1',{params:_this.ruleForm}).
      // then((res)=>{
      //     if (res.data){
      //
      //       window.localStorage.setItem("usernames",JSON.stringify(res.data))
      //       console.log(res.data)
      //     }else {
      //       alert(22222)
      //     }
      // })
      this.$router.push("/error")
      }

    }

  }

</script>



<!--<template>-->
<!--  <el-button text @click="open">Click to open the Message Box</el-button>-->
<!--</template>-->


<!--<script  setup>-->

<!--import { ElMessage, ElMessageBox } from 'element-plus'-->
<!--import { useRouter } from "vue-router"  // 引入userRouter-->
<!--import router from '@/router'-->
<!--// router.push('/pathName')-->

<!--function open() {-->
<!--  const router = useRouter()-->
<!--  let _this=this-->
<!--  ElMessageBox.alert(-->
<!--      '你好，请先登录',-->
<!--      '登录消息',-->
<!--      {-->
<!--        confirmButtonText: 'OK',-->
<!--        type: 'warning',-->
<!--      })-->
<!--      .then(() => {-->

<!--      })-->
<!--}-->
<!--</script>-->
