<template>
  <div v-loading="isOpen"
       element-loading-text="拼命加载中..."
       element-loading-background="rgba(191, 191, 191, 0.5)"
  >
    <el-table
        :data="tableData"
        style="width: 100%" border
    >
      <el-table-column label="活动编号" prop="serialNum" />
      <el-table-column label="开始时间" prop="startDate" sortable sort-by="descending"/>
      <el-table-column label="结束时间" prop="finishDate" sortable sort-by="descending"/>
      <el-table-column label="用户名你" prop="userId"/>
      <el-table-column label="合照凭证" prop="voucher" align="center">
        <template #default="scope">
          <el-image  style="width: 140px; height: 130px" :src="scope.row.voucher" alt="" :fit="fill" ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="签到状态" prop="telephone"/>
      <el-table-column align="center" label="操作">
        <template #default="scope" >
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">通过</el-button>
          <el-button size="small" type="success" @click="jump(scope.row)">回函</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row justify="space-around"> <el-pagination  @current-change="pageNum" large background layout="prev, pager, next" :page-size="pageSize" :total="totalNum" class="mt-4"/></el-row>
  </div>
  <router-view></router-view>
</template>
<script>
import {getRequest, postRequest} from "@/Api_Axios/config";
import {ElMessage} from "element-plus";
import {reactive} from "vue";
import {String_Timestamp_To_Date,dateFormat} from '@/static/js/dateFormat.js'
import router from "@/router";

export default {
  mounted() {
    let tmp = window.localStorage.getItem("AdminToken")
    if (tmp!==null){
      const token = JSON.parse(tmp).data
    getRequest('/admin/getSignInVolunteer/1/'+this.pageSize,{token:token}).then((res)=>{//从第一页开始，每页五个
      console.log(res.data)
      let _this = this
      if (res.data!==null){
        setTimeout(function (){
          this.isOpen=false
        },1000)
        this.tableData = res.data.data
        this.totalNum = res.data.total
      }else {
        setTimeout(function (){
          router.replace("/")
          _this.isOpen=false
        },1000)
        ElMessage.error("服务器请求失败")
      }
    })
    }
  },
  data(){
    return{
      isOpen: false,
      pageSize:5,
      currentPage:1,
      totalNum: 5,
      tableData:reactive([]),

      params:{
        serialNum:0,
        token:'',
        userId:'',
        startDate:'',
        finishDate:''
      }
    }
  },

  methods:{
    pageNum(x){
      getRequest('/project/getProjectInformation/'+x+'/'+this.pageSize,).then((res)=> {//从第一页开始，每页五个

        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].startDate=dateFormat(res.data.data[i].startDate)
          res.data.data[i].finishDate=dateFormat(res.data.data[i].finishDate)}
        // console.log(res.data)
        this.tableData=res.data.data
        console.log("***************点解返回的结果************************")
        // console.log(this.tableData)
      })
    },
    handleEdit(index,row){
      const _this=this
      this.$confirm('是否确定通过 '+'"'+row.userId+'"'+' 用户的签到?','审核提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning',
      }).then(()=>{
        alert(215154)
        //发送数据
        _this.params.userId = row.userId
        _this.params.serialNum = row.serialNum
        console.log(_this.params)
        postRequest('/admin/passVolunteersSignIn',_this.params).then((res)=>{
          if (res.data.status==='success'){
            setTimeout(()=>{
              window.location.reload()
            },2500)
            console.log(res.data);
            ElMessage.success(res.data.data)
          }else {
            ElMessage.error('服务器崩溃~')
          }
        })
      }).catch(()=>{
        ElMessage.info('已取消操作')
      })

      // this.isLogin(row)

      // console.log(index, row)
      // this.Timestamp_To_Date()
    },
    jump(row){
      let id=row.serialNum
      router.push({
        path: `/ProjectInformation/${id}`
      })
    },
    fuck(){
      let _this = this
      _this.fliter = _this.tableDataAll.filter(data => !_this.search || data.title.toLowerCase().includes(_this.search.toLowerCase()));
      this.tableData=_this.fliter
      // console.log(this.tableData)
    },
    isLogin(row){
      let tmp = window.localStorage.getItem('VolunteerToken')
      let _this = this
      if (tmp!=null){
        _this.params.userId= JSON.parse(tmp).extra;
        _this.params.token = JSON.parse(tmp).data;
        _this.params.serialNum = row.serialNum

        let a = String_Timestamp_To_Date(row.startDate)
        let b = String_Timestamp_To_Date(row.finishDate)

        _this.params.startDate = a
        _this.params.finishDate = b
        // alert(_this.params.serialNum)
        // 是否过了时间?
        if (this.isExpired(row)==='able'){ //报名时间范围内
          getRequest('/enroll/isAlreadyEnroll',_this.params).then(function (res){
            if (res.data!==1){//判断是否存在重复报名?
              //冲突检测
              console.log(_this.params)
              getRequest('/enroll/checkConflict',_this.params).then(function (resp){
                console.log(resp.data)
                if (resp.data.status!=='success'){
                  alert("时间冲突,报名失败")
                }else {
                  postRequest('/enroll/attend',_this.params).then(function (response){
                    console.log(response.data)
                    if (response.data.code===1){
                      alert(response.data)
                      console.log(response.data)
                    }else{
                      alert(response.data.data)
                      console.log(response.data)
                    }
                  })
                }
              })
            }else {
              alert("你已经报过名了")
              return false;
            }
          })
        }else if (this.isExpired(row)==='notStarted') {
          alert('活动暂时没有开始请等待')
          return false;
        }else {
          alert("已经过截止时间了")
          return false;
        }
      }else{
        alert('你好志愿者,请先登录')
        router.replace('/login')
        return false;
      }
    },
    Date_To_Timestamp(startDate){
      let number = Date.parse(new Date(startDate));
      // console.log(number)
      return number;
    },

    Now_To_Timestamp(){
      return new Date().getTime();
    },
    isExpired(row){
      let available=this.Date_To_Timestamp(row.startDate)    //超出活动报名时间
      if (this.Now_To_Timestamp() > available+this.duration){
        return 'pass';
      }else if (this.Now_To_Timestamp()< available){        //未到活动开始时间
        return 'notStarted';
      }else {
        return 'able';                                      //活动开始时间范围内
      }
    },
  }
}
</script>

