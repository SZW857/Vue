
<template>
  <el-table
      :data="tableData.filter(data => !search || data.userId.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
  >
    <el-table-column label="志愿者名称" prop="userId"  align="center"/>
    <el-table-column label="手机号" prop="telephone"  align="center"/>
    <el-table-column label="身份证号" prop="idCard" align="center"/>
    <el-table-column label="邮箱地址" prop="email" align="center"/>
    <el-table-column label="审核状态"  align="center">
      <template #default="scope">
        <el-switch
            :v-model="status"
            class="ml-2"
            inline-prompt
            style="--el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949"
            :active-value="1"
            :inactive-value="0"
            active-text="审核通过"
            inactive-text="待审核"
            :disabled="true"
        />
      </template>
    </el-table-column>

    <el-table-column align="left">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>

      <template #default="scope">
        <el-button
            type="success"
            @click="verifyPass(scope.$index, scope.row)"
        >通过审核</el-button
        >
        <el-button
            type="info"
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
      this.passedPerson.token=token
      getRequest('/admin/getVolunteersInfo',{token:token}).then((res)=>{
        this.tableData=res.data
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
          verifyCode: 0,

        },
      ]),
      passedPerson:{
        userId:'',
        token:'',
      },
      notifyPerson:{
        email:'',
        content:'',

        token:'',
        falseCode:"xxx"
      },
      search: '',
    }
  },
  methods: {
    verifyPass(index,row) {
      const _this=this
      this.$confirm('是否确定通过 '+'"'+row.userId+'"'+' 用户的注册申请?','审核提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning',
      }).then(()=>{
        //发送数据
        _this.passedPerson.userId = row.userId
        console.log(_this.passedPerson)
        postRequest('/admin/passVerify',_this.passedPerson).then((res)=>{
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
    },
    //该参数为当前的value值
    changeStatus(callback) {
      console.log(callback);
    },
    //发送短信
    submitForm() {
         alert("232232")
          let TMP= JSON.parse(window.localStorage.getItem('AdminToken'));
          this.notifyPerson.token = TMP.data
          alert(this.notifyPerson.content)
          console.log(this.para)
          postRequest("/sendEmail",this.notifyPerson).then((res)=>{
            if (res.data.status==='success'){
              alert('已发送');
              this.dialogFormVisible=false
              setTimeout(()=>{
                window.location.reload()
              },500)
              router.replace('/RegisterVerify')
            }else {
              alert('发送失败')
              console.log(res.data)
              this.dialogFormVisible=false
              console.log(TMP)
              router.replace('/RegisterVerify')
            }
          })
    },
    resetForm() {
      this.dialogFormVisible=false
      router.replace('/RegisterVerify')
    },
  },
}
</script>
