<template>
  <el-button @click="send">kkk</el-button>
</template>
<script>
import { postRequest,getRequest } from '@/api/config.js'
import axios from "axios";
export default {
  data(){
    return{
      ruleForm:{
        userName:'admin',
        passWord:'123456'

      }
    }
  },
  methods:{
    send(){
      let _this=this
      axios.get('http://127.0.0.1:8083/hello',{params:_this.ruleForm}).then((res)=>{
          if (res.data){
            alert(11111)
            window.localStorage.setItem("usernames",JSON.stringify(res.data))
            console.log(res.data)
          }else {
            alert(22222)
          }
      })

      // getRequest("admin123456").then((response)=>{
      //   console.log(response)
      // })
    }
  }
}
</script>