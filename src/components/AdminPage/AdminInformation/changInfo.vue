<template>
  <h3 >个人信息展示</h3>
  <div style="margin-top:50px;margin-left: 280px;" >
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="120px"
             size="large"
    >
      <el-form-item label="手机号"  prop="telephone">
        <el-input v-model="form.telephone" readonly placeholder="慎重!!!，误填非绑定手机号，可能导致密码无法找回"/>
        <el-button type="info" icon="Edit" circle @click="changeTelephone"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
            v-model="form.email"
            readonly
        />
        <el-button type="info" icon="message" circle @click="changeEmail" />
      </el-form-item>
      <el-form-item>
<!--        <el-button style="width: 500px;" type="primary"  @click="onSubmit">保存</el-button>-->
      </el-form-item>
    </el-form>
  </div>
  <router-view></router-view>

</template>

<script>
import { getRequest,postRequest} from '../../../Api_Axios/config.js'
import { reactive, ref } from 'vue'
import router from "../../../router";
import {ElMessage} from "element-plus";
export default {

  data() {

    return {
      dialogFormVisible:ref(false),
      formLabelWidth:'140px',
      form: reactive({
        telephone: '',
        email: '',
        token:'',
        userId:''
      }),
      cTelephone:reactive({
        telephoneNew: '',
        verifyCode: '',
      }),
      cEmail:reactive({
        emailNew: '',
        verifyCode: '',
      }),
      adminInfo:{
        telephone: '',
        email: '',
        token:'',
        adminId:''
      },
    }
  },
  //初始化加载页面
  mounted(){
    let _this=this
    let tmp=window.localStorage.getItem('AdminToken');
    if (tmp!==null){
      _this.adminInfo.token=JSON.parse(tmp).data;
      _this.adminInfo.adminId=JSON.parse(tmp).extra;
      getRequest('/admin/selectOneAdminInfo',_this.adminInfo).then((res)=>{
        let a=res.data
        this.form.telephone=a[0].telephone
        this.form.email=a[0].email
        console.log(res.data)
      })
    }else {
      alert("服务器请求失败，请先登录!!!")
      router.replace('/')
    }
  },
  methods:{
    // onSubmit(){
    //   this.ruleForm.token=JSON.parse(window.localStorage.getItem('VolunteerToken')).data
    //   this.ruleForm.userId=JSON.parse(window.localStorage.getItem('VolunteerToken')).extra
    //   postRequest('/user/saveInformation',this.ruleForm).then((res)=>{
    //     if (res.data.status==='success'){
    //       ElMessage.success("保存成功")
    //     }else {
    //       ElMessage.error("保存失败,服务器崩溃~")
    //     }
    //   })
    // },
    changeTelephone(){
      router.push('/cTelephone_a')
    },
    changeEmail(){
      router.push('/cEmail_a')
    },
    //校验地址
    addressCheck(pass) {
      let userNamePattern = /^[\u4e00-\u9fa5]{3,30}[a-zA-Z\u4e00-\u9fa50-9]{0,30}$/;
      if (userNamePattern.test(pass)){
        return true;
      }else {
        return false;
      }
    }

  },

}

</script>



<style scoped>
h3{
  text-align: center;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 200px;
}
.el-input {
  width: 500px;
}
.dialog-footer button {
  margin-right: 10px;
}
</style>