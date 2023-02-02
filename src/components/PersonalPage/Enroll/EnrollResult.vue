<template>
  <el-table :data="tableData">
    <el-table-column  prop="serialNum" label="项目编号"  />
    <el-table-column prop="voucher" label="宣传海报" >
      <template #default="scope">
        <el-image  style="width: 140px; height: 130px" :src="scope.row.imageUrl" alt="" :fit="fill" ></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="contact" label="负责人"  />
    <el-table-column prop="telephone" label="联系人电话"  />
    <el-table-column prop="email" label="负责人邮箱"  />
    <el-table-column label="操作" >
      <template #default="scope">
        <el-button
            link
            type="primary"
            size="small"
            @click="optOut(scope.$index, scope.row)"
        >
          退选
        </el-button>
        <el-button link type="primary" size="small" @click="signIn(scope.row)">签到</el-button>
        <el-button link type="primary" size="small" @click.prevent="preview(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
<router-view></router-view>
</template>

<script>
import { ref} from 'vue'
import {getRequest, postRequest} from "@/Api_Axios/config";
import router from "@/router";
import {ElMessage} from "element-plus";
export default {
  mounted() {
    let item = window.localStorage.getItem("VolunteerToken");
    if (item!==null){
      let tmp = JSON.parse(item)
      this.params.token=tmp.data
      this.params.userId=tmp.extra
    }
    let _this=this
    getRequest('/user/getEnrollResult',_this.params).then(function (res){
      console.log(res.data);
      _this.tableData=res.data
    })
  },
  data(){
    return{
      tableData : ref([
        {
          serialNum: '',
          email: '',
          telephone: '',
          contact: '',
          imageUrl: '',

        },
      ]),
      params : {
        userId:'',
        serialNum:'',
        token:''
      },
    }
  },
  methods:{
    optOut(index,row) {
      const _this=this
      this.$confirm('是否确定退选编号为: '+'"'+row.serialNum+'"'+' 这个活动?','审核提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning',
      }).then(()=>{
        //发送数据
        _this.params.serialNum = row.serialNum
        console.log(_this.params)
        postRequest('/user/deleteOpt',_this.params).then((res)=>{
          console.log(res.data)
          if (res.data.status==='success'){
            ElMessage.success("退选成功")
            setTimeout(()=>{
              window.location.reload()
            },1300)
          }else {
            ElMessage.error('服务器崩溃~')
          }
        })
      }).catch(()=>{
        ElMessage.info('已取消操作')
      })
    },
    preview(row){
      let id=row.serialNum
      router.push({
        path: `/ProjectInformation/${id}`
      })
    },
    signIn(row){
      let id=row.serialNum
      router.push({
        path: `/signIn/${id}`
      })
    }
  },
}
</script>
