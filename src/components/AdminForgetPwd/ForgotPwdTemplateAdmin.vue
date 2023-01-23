<template>
  <div class="container">
    <span class="StepBar">
      <el-steps :space="400" :active="active" finish-status="success" align-center>
        <el-step title="管理员身份验证" />
        <el-step title="管理员手机验证" />
        <el-step title="新密码" />
        <el-step title="完成" />
      </el-steps>
    </span>
    <div style="height: 500px;background-color: #ffffff;margin-top: 40px" v-if="active===1" >
      <h1>管理员身份证号校验</h1>
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
        ><el-form-item label="管理员身份证号:" prop="idCard">
          <el-input
              :maxlength="18"
              type="text"
              v-model="ruleForm.idCard"
              autocomplete="off"
              prefix-icon="Memo"
              class="el-input"

          ></el-input>
        </el-form-item>
          <el-form-item label="验证码" prop="VerifyCode">
            <el-input
                v-model="ruleForm.VerifyCode"
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
    <div style="height: 600px;background-color: #ffffff;margin-top: 40px" v-if="active===2">

      <h1>请确认您的身份证号:{{IdCard}}</h1>
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
          <el-form-item label="请输入绑定的QQ邮箱:" prop="email">
            <el-input
                type="text"
                v-model="ruleForm.email"
                autocomplete="off"
                prefix-icon="message"
            ></el-input>
            <!-- 倒计时按钮 -->
            <el-button @click="sendMsg('ruleForm')" type="primary" :disabled="canClick"  style="position: absolute;margin-left: 520px;" >{{content}}</el-button>
          </el-form-item>
          <el-form-item label="请输入反馈验证码:" prop="feedbackCode">
            <el-input
                :maxlength="6"
                type="number"
                v-model="ruleForm.feedbackCode"
                autocomplete="off"
                prefix-icon="Memo"
                class="telephoneNumAndCode"
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
                :minlength="8"
                :maxlength="20"
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
    <template v-if="active===4">
      <div class="finish_container">
        <div class="box">
          <div class="content1">
            <div><img src="@/static/picture/greenRight.png"/><h1>密码修改完成</h1></div>
          </div>
        </div>
      </div>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox} from 'element-plus'
import SIdentify from '@/components/VerifyCode/identify'
import {getRequest, postRequest } from '@/Api_Axios/config.js'

import router from "@/router";
import {Base64} from "js-base64";
export default {
  name:'ForgotPwdTemplateAdmin',
  components: {SIdentify},
  data() {
    const VerifyCode = (rule, value, callback) => {
      const newVal = this.identifyCode.toUpperCase()
      const identifyStr = this.identifyCode.toLowerCase()
      if (value === '')  {
        return callback(new Error('验证码不能为空'))
      }else if (value === identifyStr) {
        callback()
      }else if (value === newVal){
        callback()
      }else {
        console.log('VerifyCode:', value)
        callback(new Error('验证码不正确!'))
      }
    }

    const email = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入QQ邮箱'))
      }else if (this.email_blur(value)){
        this.params.email=value
        callback()
      } else {
        callback("邮箱格式不正确");
      }
    }

    const idCard = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号码'))
      } else if (!this.idCardRuleCheck(value)) {
        callback(new Error('身份证格式不对'))
      }else {
        let idCard=value;
        getRequest("/admin/idCardCheck",{idCard}).then((res)=>{
          if (res.data.status==="fail"){
            callback(new Error("请先通过注册"))
          }else {
            this.IdCard=value
            callback()
          }
        })
      }
    }
    //修改密码校验
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
        console.log(value)
      }else{
        if (this.passwdCheck(value)) {
          this.$refs.ruleForm.validateField('confirmPass')
          callback()
        }else {
          callback(new Error("密码格式不对(数字+密码组合,8~20位)"))
        }
      }
    }

    //确认密码
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    //反馈的验证码校验
    const feedbackCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入反馈的验证码'))
      } else if (this.valueCode===(value)) {
        callback()
      } else {
        callback(new Error('验证码不正确'))
      }
    }

    return {
      active:1,
      identifyCodes: 'ABCDEFGHGKMNPQRSTUVWXY',
      identifyCode: '',
      ruleForm: {
        email: '',
        idCard: '',
        VerifyCode: '',
        pass:'',
        confirmPass: '',
        feedbackCode:''
      },
      params:{
        email:"",
        falseCode:""
      },
      content: '发送短信',
      totalTime: 5,
      canClick: false,
      valueCode: 1,
      IdCard:'',
      rules: {
        email: [{ required:true,validator: email, trigger: 'blur' }],
        idCard: [{ required:true,validator: idCard, trigger: 'blur' }],
        pass: [{ required:true,validator: validatePass, trigger: 'blur' }],
        confirmPass: [{ required:true,validator: validatePass2, trigger: 'blur' }],
        VerifyCode: [{required: true, validator: VerifyCode,trigger: 'blur' }],
        feedbackCode:[{required:true,validator:feedbackCode,trigger:'blur'}]
      },
    }

  },
  methods: {
    //提交表单的验证
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
    //发送短信
    sendMsg(formName) {
      let _this=this
      // form为表单名字并ref="form"; prop 换成你想监听的prop字段
      this.$refs[formName].validateField('email', (errMsg) => {
        if (!errMsg) {
          alert('请通过邮箱格式验证!')
        }else{
          const code=Math.random().toFixed(6).slice(-6) // 随机生成六位数验证码
          this.valueCode=code
          alert('realCode:'+this.valueCode)
          //1.准备数据
          _this.params.falseCode=Base64.encode(code)
          //2.发送验证码
          getRequest("/sendEmail", _this.params)
          if (this.canClick) return
          this.canClick = true
          this.content = this.totalTime + 's后重新发送'
          let clock = window.setInterval(() => {
            this.totalTime--
            this.content = this.totalTime + 's后重新发送'
            if (this.totalTime < 0) {
              window.clearInterval(clock)
              this.content = '重新发送短信'
              this.totalTime = 10
              this.canClick = false
            }
          }, 1000)
        }
      })
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    //上一步
    prev(){
      --this.active;
      if (this.active<0) this.active=0
    },
    //提交表单
    sub(formName){
      let _this=this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let confirmPass=_this.ruleForm.confirmPass
          let idCard=_this.ruleForm.idCard
          let falseCode=_this.params.falseCode
          alert(falseCode)
          postRequest('/admin/changPasswd_F', {idCard: idCard, passwd: confirmPass, falseCode: falseCode}).then((res)=>{
            if (res.data.status==='success'){
              _this.active++
              open()
            }else {
              ElMessage.error(res.data.data)
            }
          })
        } else {
          alert('请输入正确的密码')
        }
      })
    },
    //校验QQ邮箱
    email_blur(string) {
      var verify = /^[1-9][0-9]{4,10}@qq.com$/;
      if (verify.test(string)) {
        return true;
      } else {
        return false;
      }
    },
    //身份证规则校验
    idCardRuleCheck(string) {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(reg.test(string) === false) {
        return  false;
      }else {
        return true;
      }
    },
    //校验密码强度
    passwdCheck(num){
      let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;
      if (reg.test(num) === false){
        return false;
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
const open = () => {
  ElMessageBox.alert('恭喜重获密码!，即将返回首页', '修改密码提示信息', {
    type:'success',
    confirmButtonText: 'OK',
  })
  setTimeout(()=>{
    router.replace("/")
  },5000)

}

</script>




<style scoped>

.codeGeting{
  background: #cdcdcd;
  border-color: #cdcdcd;
}
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
.finish_container{
  margin-top: 180px;
  background-color: #ffffff;
  height: 600px;
  color: #3ccb83;
}
.box{
  background-color: #ffffff;
  width: 600px;
  height: 300px;
  margin-left: 300px;
  -webkit-box-shadow: #e5e2e2 0px 0px 10px;
  -moz-box-shadow: #e5e2e2 0px 0px 30px;
  box-shadow: #e5e2e2 0px 0px 30px;
}
.content1{
  height: 150px;
  position: absolute;
  background-color: #ffffff;
  margin: 80px 200px;
}
</style>