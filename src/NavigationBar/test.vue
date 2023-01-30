<template>
  <div v-loading="isOpen"
       element-loading-text="拼命加载中..."
       element-loading-background="rgba(191, 191, 191, 0.5)"
  >
    <el-table
        :data="tableData"
        style="width: 100%" border
    >
      <el-table-column label="活动编号" prop="serialNum" sortable sort-by="descending"/>
      <el-table-column label="活动名称" prop="title"> </el-table-column>
      <el-table-column label="宣传海报" prop="imageUrl" align="center">
        <template #default="scope">
          <el-image  style="width: 140px; height: 130px" :src="scope.row.imageUrl" alt="" :fit="fill" ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="活动类型" prop="type"> </el-table-column>
      <el-table-column label="活动开始时间" prop="startDate"> </el-table-column>
      <el-table-column label="招募人数" prop="peopleNum"> </el-table-column>
      <el-table-column label="联系人" prop="contact"> </el-table-column>
      <el-table-column label="联系电话" prop="telephone"> </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="输入活动名称" @change="fuck " />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">参加</el-button>
          <el-button size="small" type="success" @click="jump(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row justify="space-around"> <el-pagination  @current-change="pageNum" large background layout="prev, pager, next" :page-size="pageSize" :total="totalNum" class="mt-4"/></el-row>
  </div>
</template>
<script>
import {getRequest, postRequest} from "@/Api_Axios/config";
import {ElMessage} from "element-plus";
import {reactive} from "vue";
import {String_Timestamp_To_Date,dateFormat} from '@/static/js/dateFormat.js'
import router from "@/router";

export default {
  mounted() {
    getRequest('/project/getProjectInformation/1/'+this.pageSize).then((res)=>{//从第一页开始，每页五个
      let _this = this
      if (res.data!=null||res.data!==''){
        setTimeout(function (){
          this.isOpen=false
        },1000)
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].startDate=dateFormat(res.data.data[i].startDate)
          res.data.data[i].finishDate=dateFormat(res.data.data[i].finishDate)}
        // console.log(res.data)
        this.tableData = res.data.data
        this.totalNum = res.data.total
        getRequest('/project/getProjectInformation/1/'+res.data.total).then((res)=>{
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].startDate=dateFormat(res.data.data[i].startDate)
            res.data.data[i].finishDate=dateFormat(res.data.data[i].finishDate)}
          this.tableDataAll=res.data.data
          setTimeout(function (){
            _this.isOpen=false
          },1000)
        })
      }else {
        setTimeout(function (){

          router.replace("/")
          _this.isOpen=false
        },1000)
        ElMessage.error("服务器请求失败")
      }
    })
  },
  data(){
    return{
      isOpen: true,
      pageSize:5,
      currentPage:1,
      totalNum: 5,
      tableData:reactive([]),
      tableDataAll:reactive([
        {
          serialNum: '2016-05-03',
          title: '马冬梅',
          imageUrl: 'https://pic3.zhimg.com/v2-c6ae9c3aff36b9b221258f6a90577902_r.jpg',
          type: '扶贫助残',
          startDate: '2023-1-16 12：56',
          peopleNum: 30,
          contact: '张三',
          telephone: '15389085001',
        },
      ]),
      search:'',
      filter:[],
      duration:60*60*1000, //设置过期时间10分钟内放行报名
      params:{
        serialNum:0,
        token:'',
        userId:'',
        startDate:'',
        finishDate:''
      }
    }
  },
  watch:{
    search:function (v1){
      if (v1!==''){
        this.fuck(v1)
      }else {
        window.location.reload()
      }
    }
  },
  methods:{
    pageNum(x){
      getRequest('/project/getProjectInformation/'+x+'/'+this.pageSize).then((res)=> {//从第一页开始，每页五个

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
      this.isLogin(row)
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
    isAlreadyEnroll(){
      let status = null;
      getRequest('/project/isAlreadyEnroll',this.params).then(function (res){
        status = res.data.status;
        // console.log(res.data)
      })
      if (status===1){
        return 'enroll';//已经报过名了
      }else {
        return "ok"; //可以参加报名
      }
    },
  }
}
</script>

