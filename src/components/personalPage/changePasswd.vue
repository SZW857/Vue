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
import {ElMessage} from "element-plus";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        confirmPass: '',
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
          ElMessage({
            message: '提交成功',
            grouping:true,
            type: 'success',
          })
        } else {
          ElMessage({
            message: '提交失败',
            grouping:true,
            type: 'error',
          })
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
  background: linear-gradient(to bottom, rgb(129, 138, 125), #479cb7);
  /*background: linear-gradient(to bottom, rgb(146, 208, 140),lightblue);*/
}

</style>