<template>
  <div class="container">
    <div class="body">
  <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width: 500px;margin-top: 80px"
  >
    <el-form-item label="密码" prop="pass">
      <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          :maxlength="16"
          :minlength="8"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPass">
      <el-input
          type="password"
          v-model="ruleForm.confirmPass"
          autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import {Base64} from "js-base64";
import {ElMessage} from "element-plus";
import {postRequest} from '@/Api_Axios/config.js'
export default {
  mounted() {
    let TMP=JSON.parse(window.localStorage.getItem("AdminToken"))
    this.params.token=TMP.data
    this.params.adminId=TMP.id

  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
        console.log(value)
      }else{
        if (this.passwdCheck(value)) {
          this.$refs.ruleForm.validateField('confirmPass')
          callback()
        }else if (value.length<8||value.length>16){
          callback(new Error("密码长度错误,应为(8~18)位"))
        }else {
          callback(new Error("密码格式不对(数字+密码组合)"))
        }
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        this.params.passwd=Base64.encode(value)
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        confirmPass: '',
      },
      params:{
        adminId:'',
        passwd:'',
        token:''
      },
      rules: {
        pass: [{ required:true,validator: validatePass, trigger: 'blur'}],
        confirmPass: [{ required:true,validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  methods: {
    //校验密码强度
    passwdCheck(num){
      let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
      if (reg.test(num) === false){
        return false;
      }else {
        return true;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //准备参数 密码 身份证
          postRequest('/admin/changPasswd',this.params).then((res)=>{
            if (res.data.status==='success'){
              alert("修改密码成功")
              window.localStorage.removeItem("AdminToken")
              router.replace('/loginOut')
            }else {
              setTimeout(()=>{
                window.location.reload()
              },1000)
              ElMessage.error(res.data.data)
            }
          })
        } else {
          ElMessage.error("请先完成新密码验证!!!")
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },

}
</script>
<style>
.container{
  height: 700px;
  background: linear-gradient(to bottom, rgb(18, 55, 80), #479cb7);
}
.body{
  margin-left: 300px;
  height: 300px;
  width: 550px;
  position: absolute;
  margin-top:50px ;
  background: linear-gradient(to bottom, rgb(146, 208, 140),lightblue);
}

</style>