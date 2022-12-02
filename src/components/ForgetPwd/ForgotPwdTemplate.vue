<template>
  <div class="container">
    <div class="StepBar">
      <el-steps :space="400" :active="active" finish-status="success" align-center>
        <el-step title="填写账号" />
        <el-step title="身份验证" />
        <el-step title="新密码" />
        <el-step title="完成" />
      </el-steps>
    </div>
    <div style="height: 500px;background-color: #ffffff;margin-top: 40px" v-if="active===1">
        <h1>身份证号校验:</h1>
        <div>
        <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            label-position="top"
            class="demo-ruleForm"
            style="width: 500px;margin-left: 400px"
        ><el-form-item label="身份证号:" prop="idCard">
            <el-input
                :maxlength="18"
                type="text"
                v-model="ruleForm.idCard"
                autocomplete="off"
                prefix-icon="Memo"
                class="el-input"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verifycode">
            <el-input
                v-model="ruleForm.verifycode"
                placeholder="请输入验证码"
                type="text"
                style="width: 250px"
            ></el-input>
            <s-identify :identifyCode="identifyCode" style="width: 120px;height: 40px;position: absolute;margin-left:250px"/>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left: 200px;position: absolute" @click="refreshCode" link>看不清？点击刷新</el-button>
            <el-button @click="prev" v-if="active==2||active==3">上一步</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')"  v-if="active==1||active==2||active==3" >下一步</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="height: 600px;background-color: #c5b165;margin-top: 40px" v-if="active===2">
      <h1>请确认您的账号+{{身份证号}}}:</h1>
      <div>
        <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            label-position="top"
            class="demo-ruleForm"
            style="width: 500px;margin-left: 300px"
        >
          <el-form-item label="请输入绑定的邮箱:" prop="telephoneNumber">
            <el-input
                :maxlength="11"
                type="text"
                v-model="ruleForm.telephoneNumber"
                autocomplete="off"
                prefix-icon="Memo"
            ></el-input>
          </el-form-item>
          <el-form-item label="反馈回来的验证码:" prop="idCard">
            <el-input
                :maxlength="18"
                type="text"
                v-model="ruleForm.idCard"
                autocomplete="off"
                prefix-icon="Memo"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="prev" v-if="active==2||active==3">上一步</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')"  v-if="active==1||active==2||active==3" >下一步</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="height: 600px;background-color: #ffffff;margin-top: 40px" v-if="active===3">
      <h1>请输入你新的密码:</h1>
      <div>
        <el-form
           :model="ruleForm"
           status-icon
           :rules="rules"
           label-width="100px"
           ref="ruleForm"
           class="demo-ruleForm"
           style="width: 500px;margin-left: 300px"
        >
          <el-form-item label="密码" prop="pass">
            <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
                class="el-input"
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
            <el-button @click="prev" v-if="active==2||active==3">上一步</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')"  v-if="active==1||active==2" >下一步</el-button>
            <el-button @click="sub('ruleForm')" v-if="active==3" type="primary">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import SIdentify from '@/components/identify'
export default {
  name:'ForgotPwdTemplate',
  components: {SIdentify},
  data() {
    var validateVerifycode = (rule, value, callback) => {
      const newVal = value.toLowerCase()
      const identifyStr = this.identifyCode.toLowerCase()
      if (newVal === '')  {
        return callback(new Error('验证码不能为空'))
      }else if (value !== identifyStr) {
        console.log('validateVerifycode:', value)
        callback(new Error('验证码不正确!'))
      }else {
        callback()
      }
      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error('请输入数字值'))
      //   } else {
      //     if (value < 18) {
      //       callback(new Error('必须年满18岁'))
      //     } else {
      //       callback()
      //     }
      //   }
      // }, 1000)
    }
    // var telephoneNumber = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入手机号'))
    //   }else if (this.teleRuleCheck(value)){
    //     callback()
    //   } else {
    //     callback();
    //   }
    // }
    var idCard = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号码'))
      } else if (this.idCardRuleCheck(value)) {
        callback()
      } else {
        callback(new Error('身份证格式不对'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
        console.log(value)
      } else {
        if (this.ruleForm.confirmPass !== '') {
          this.$refs.ruleForm.validateField('confirmPass')
        }
        callback()
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
      active:1,
      identifyCodes: '3456789ABCDEFGHGKMNPQRSTUVWXY',
      identifyCode: '',
      ruleForm: {
        telephoneNumber: '',
        idCard: '',
        verifycode: '',
        pass:'',
        confirmPass: '',
      },
      rules: {
        // telephoneNumber: [{ validator: telephoneNumber, trigger: 'blur' }],
        idCard: [{ required:true,validator: idCard, trigger: 'blur' }],
        pass: [{ required:true,validator: validatePass, trigger: 'blur' }],
        confirmPass: [{ required:true,validator: validatePass2, trigger: 'blur' }],
        verifycode: [{required: true, validator: validateVerifycode,trigger: 'blur' }]
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.active++>3) this.active=0
        } else {
          ElMessage({
            message: '完善信息方可进入下一步',
            grouping:true,
            type: 'error',
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    prev(){
      --this.active;
      if (this.active<0) this.active=0
    },
    sub(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.active++;
          if (this.active=4){
            ElMessage({
              message: '恭喜你！已重获密码',
              type: 'success',
            })
            this.$router.replace('/ForgotPwd3')
          }
        } else {
          alert('请输入正确的密码')
          console.log('error submit!!')
        }
      })

    },
    teleRuleCheck(stringber) {
      var pattern = /^1[34578]\d{9}$/;
      if (pattern.test(stringber)) {
        return true;
      }
      console.log('check mobile phone ' + stringber + ' failed.');
      return false;
    },
    idCardRuleCheck(string) {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(reg.test(string) === false) {
           return  false;
        }else {
           return true;
      }
    },
    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ]
      }
    }
  },
  mounted() {
    // 验证码初始化
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
}
</script>

<style scoped>
.el-input{
  height: 43px;
}
.container{
  width: 1200px;
  margin-left: 150px;
  background-color: #ffffff;
}
.StepBar{
  background-color: #f1f1f1;
  height: 60px;
}
.content{
  height: 700px;
  background-color: #1c95a9;
}
</style>