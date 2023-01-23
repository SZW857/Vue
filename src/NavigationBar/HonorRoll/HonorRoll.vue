<template>
  <div>
    <el-row justify="center">荣誉榜</el-row>
  </div>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'signNum', order: 'ascending'}"
    >

      <el-table-column prop="userId" label="姓名/排名"  width="180" align="center"/>

      <el-table-column prop="sex" label="性别"  align="center"/>

      <el-table-column prop="age" label="年龄" width="380" align="center"/>

      <el-table-column prop="email" label="邮箱" width="180" align="center"/>

      <el-table-column prop="signNum" label="贡献次数"  align="center"/>

    </el-table>

    <span> <marquee behavior="alternate" scrollamount="12">感谢以上十位同志对社区做出的杰出贡献，同时鼓励各位志愿者们贡献自己的一份力,争取榜上有名！！！</marquee></span>
  </div>
</template>

<script>
import {onMounted} from "vue";
import {getRequest} from "@/Api_Axios/config";
// onMounted(()=>{

// })

export default {
  mounted() {
    let _this=this
    getRequest("/rankVolunteers").then((res)=>{
      if (res.data!==null){
        this.tableData=res.data
        console.log(res.data);
      }
    })
  },
  data() {
    return {
      total:[1,2,3,4,5,6,7,8,9,10],
      tableData: [

      ],
    }
  },
  methods: {
    formatter(row, column) {
      return row.address
    },
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