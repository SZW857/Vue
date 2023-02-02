
<template>
  <el-table
      :data="tableData"
      style="width: 100%"
  >
    <el-table-column label="编号" prop="helpNum"  align="center"/>
    <el-table-column label="志愿者名称" prop="userId"  align="center"/>
    <el-table-column label="开始时间" prop="startDate"  align="center"/>
    <el-table-column label="结束时间" prop="finishDate"  align="center"/>


<!--    <el-table-column label="邮箱地址" prop="email" align="center"/>-->


    <el-table-column align="center" label="操作">


      <template #default="scope">
        <el-button

            size="small"
            @click="jump(scope.row)"
        >详情</el-button
        >
        <el-button
            type="success"
            size="small"
            @click="verifyPass(scope.$index, scope.row)"
        >通过审核</el-button
        >
        <el-button
            type="danger"
            size="small"
            @click="notify(scope.$index, scope.row)"
        >告知问题</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogFormVisible"
             title="社区公益服务系统审核通知"
             width="600"
             :show-close="false"
  >
    <el-form
        :model="notifyPerson"
        status-icon
        ref="notifyPerson"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="发送至" >
        <el-input
            type="text"
            v-model="notifyPerson.email"
            autocomplete="off"
            readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="审核结果" prop="content" >
        <el-input
            :autosize="{ minRows: 6, maxRows: 7 }"
            type="textarea"
            placeholder="Please input"
            v-model="notifyPerson.content"
            autocomplete="off"
        ></el-input>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('notifyPerson')">提交</el-button>
        <el-button @click="resetForm('notifyPerson')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {ElMessage} from 'element-plus'
import {getRequest,postRequest} from '@/Api_Axios/config.js'
import {ref,reactive} from "vue";
import router from "@/router";
export default {
  mounted() {
    let X = window.localStorage.getItem("AdminToken");

    if (X!=null){
      let token=JSON.parse(X).data
      let _this = this
      _this.passedPerson.token = JSON.parse(X).data
      _this.passedPerson.contact = JSON.parse(X).adminName
      _this.passedPerson.adminId = JSON.parse(X).id
      getRequest('/admin/getAllVolunteerHelpInfo',{token:token}).then((res)=>{
        this.tableData=res.data.data
      })
    }else {
      ElMessage.error("数据加载失败,服务器崩溃~")
    }
  },
  data() {
    return {
      dialogFormVisible:ref(false),
      formLabelWidth :'140px',
      status:ref(false),
      tableData: reactive([
        {
          email: '2016-05-02',
          userId: '铁蛋',
          telephone:'15515151555',
          address: '上海市普陀区金沙江路 1518 弄',

        },
      ]),

      passedPerson:{
        contact: "",
        content: '',
        email: '',
        finishDate: "",
        helpNum: "",
        imageUrl: "",
        peopleNum: "",
        remaining: "",
        startDate: "",
        telephone: "",
        title: "",
        type: "",
        userId: "",
        token:'',
        adminId:'',

      },
      notifyPerson:{
        email:'',
        content:'',
        helpNum:'',
        token:'',
        falseCode:"xxx"
      },

    }
  },
  methods: {
    jump(row){
      let id=row.helpNum
      router.push({
        path: `/helpInformationDetail/${id}`
      })
    },
    verifyPass(index,row) {
      const _this=this
      this.$confirm('是否确定通过 '+'"'+row.userId+'"'+' 用户的注册申请?','审核提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning',
      }).then(()=>{
        //发送数据
        this.passedPerson.content = row.content
        this.passedPerson.email = row.email
        this.passedPerson.finishDate = row.finishDate
        this.passedPerson.helpNum = row.helpNum

        this.passedPerson.imageUrl = row.imageUrl
        this.passedPerson.peopleNum = row.peopleNum
        this.passedPerson.remaining = row.remaining
        this.passedPerson.startDate = row.startDate
        this.passedPerson.remaining = row.remaining

        this.passedPerson.telephone = row.telephone
        this.passedPerson.title = row.title
        this.passedPerson.type = row.type
        this.passedPerson.userId = row.userId
        // this.passedPerson.idCard = JSON.parse(window.localStorage.getItem("AdminToken")).ID

        console.log(_this.passedPerson)
        postRequest('/admin/passAllVolunteerHelpInfo',_this.passedPerson).then((res)=>{
          if (res.data.status==='success'){
            setTimeout(()=>{
              window.location.reload()
            },1300)
            ElMessage.success(res.data.data)
          }else {
            ElMessage.error('服务器崩溃~')
          }
        })
      }).catch(()=>{
        ElMessage.info('已取消操作')

      })
    },
    notify(index, row){
      this.dialogFormVisible=true
      this.notifyPerson.email=row.email
      this.notifyPerson.helpNum=row.helpNum
    },

    //发送短信
    submitForm() {
      let TMP= JSON.parse(window.localStorage.getItem('AdminToken'));
      this.notifyPerson.token = TMP.data
      console.log(this.para)
      postRequest("/sendEmail",this.notifyPerson).then((res)=>{
        if (res.data.status==='success'){
          postRequest('/help/delHelpInfoDetail',this.notifyPerson).then((resp)=>{
            console.log(resp.data);
          })
          alert('已发送至该用户邮箱');
          this.dialogFormVisible=false
          setTimeout(()=>{
            window.location.reload()
          },1000)
          router.replace('/verifyHelpInformation')
        }else {
          alert('发送失败')
          console.log(res.data)
          this.dialogFormVisible=false
          console.log(TMP)
          router.replace('/verifyHelpInformation')
        }
      })
    },
    resetForm() {
      this.dialogFormVisible=false
      router.replace('/verifyHelpInformation')
    },
  },
}
</script>
