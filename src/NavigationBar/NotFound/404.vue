<template>
  <div>
    <el-row justify="start">
      <el-button type="warning" round @click="backTo">返回首页</el-button>
      <el-button type="danger" round @click="reload">重新加载</el-button>
    </el-row>
    <img src="@/static/picture/404.png"/>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: "404",
  methods:{
    backTo(){
      router.replace('/')
    },
    reload(){
      location.reload()
    }
  }
}
</script>

<style scoped>
.el-row{
  position: absolute;
  margin-top: 650px;
  margin-left: 850px;
}

</style>