<template>
  <div>
    <el-row justify="center">荣誉榜</el-row>
  </div>
  <div v-loading="isOpen"
       element-loading-background="rgba(191, 191, 191, 0.5)"
       :element-loading-spinner="Loading"
       element-loading-text="拼命加载中...">

    <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'signNum', order: 'descending'}"

    >
      <el-table-column :index="indexMethod" type="index" label="排名"  width="180" align="center"/>

      <el-table-column prop="userId" label="姓名"  width="180" align="center"/>

      <el-table-column prop="sex" label="性别"  align="center"/>

      <el-table-column prop="age" label="年龄" width="380" align="center"/>

      <el-table-column prop="email" label="邮箱" width="180" align="center"/>

      <el-table-column prop="signNum" label="贡献次数"  align="center"/>

    </el-table>

    <span> <marquee behavior="alternate" scrollamount="12">感谢以上十位同志对社区做出的杰出贡献，同时鼓励各位志愿者们贡献自己的一份力,争取榜上有名！！！</marquee></span>
  </div>
</template>

<script>

import {getRequest} from "@/Api_Axios/config";
import {ref} from "vue";
import {ElMessage} from "element-plus";


export default {

  mounted() {
    let _this=this
    getRequest("/rankVolunteers").then((res)=>{
      if (res.data!==null){
        this.tableData=res.data
        if (this.tableData!=null){
          setTimeout(()=>{
            _this.isOpen=false;
          },1500)
        }else {
          ElMessage.error("服务器掉线了")
          setTimeout(()=>{
            _this.isOpen=false;
          },2000)
        }
        console.log(res.data);
      }
    })
  },
  data() {
    return {
      isOpen:ref(true),
      tableData: [
      ],
    }
  },
  methods: {
    formatter(row, column) {
      return row.address
    },
    indexMethod(index) {
      return index +1;
    }
  },
}
</script>
<style scoped>
.el-row{
  color: #d23243;
  font-size: 30px;
  font-weight: bold;
}
span{
  color: red;
}

</style>