<template>
  <el-dialog v-model="dialogFormVisible"
             title="更换邮箱地址"
             width="600"
             :show-close="false"
  >
    <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item label="更换的QQ邮箱" prop="email" >
        <el-input
            type="text"
            v-model="ruleForm.email"
            autocomplete="off"
            :readonly="readable"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="feedbackCode">
        <el-input
            type="text"
            v-model="ruleForm.feedbackCode"
            autocomplete="off"
        ></el-input>
        <!-- 倒计时按钮 -->
        <el-button :disabled="canClick" @click="sendMsg('ruleForm')">{{content}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>

import router from "@/router";
import { ref } from 'vue'
import {getRequest,postRequest} from "@/Api_Axios/config";
import {Base64} from "js-base64";

export default {
  data(){
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入QQ邮箱'))
      }else if (this.email_blur(value)){
        let email=value
        getRequest("/user/emailCheck",{email}).then((res)=>{
          if (res.data.status==="fail"){
            this.para.email=value
            callback()
          }else {
            callback(new Error("该QQ邮箱已经注册"))
          }
        })
      } else {
        callback(new Error('请输入正确的QQ邮箱'))
      }
    }

    //反馈的验证码校验
    const feedbackCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入反馈的验证码'))
      } else if (this.valueCode===(value)) {
        console.log(this.para.email)
        this.readable=true
        callback()
      } else {
        callback(new Error('验证码不正确'))
      }
    }
    return{
      dialogFormVisible:ref(true),
      formLabelWidth :'140px',
      ruleForm: {
        email: '',
        feedbackCode: '',
      },
      readable:false,
      para:{
        email:"",
        falseCode:"",
        token:'',
        userId:''
      },
      content: '发送短信',
      totalTime: 5,
      canClick: false,
      valueCode: 1,
      rules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        feedbackCode: [{ validator: feedbackCode, trigger: 'blur' }],
      },
    }
  },
  methods:{
    //发送短信
    sendMsg(formName) {
      let _this=this
      // form为表单名字并ref="form"; prop 换成你想监听的prop字段
      this.$refs[formName].validateField('email', (errMsg) => {
        if (!errMsg) {
          alert('请通过QQ邮箱格式验证!')
          return false;
        }else{
          const code=Math.random().toFixed(6).slice(-6) // 随机生成六位数验证码
          this.valueCode=code
          alert(this.valueCode)
          _this.para.falseCode=Base64.encode(code)
          getRequest("/sendEmail", {falseCode:Base64.encode(code),email:_this.para.email})
          if (this.canClick) return
          this.canClick = true
          this.content = this.totalTime + 's后重新发送'
          let clock = window.setInterval(() => {
            this.totalTime--
            this.content = this.totalTime + 's后重新发送'
            if (this.totalTime < 0) {
              this.valueCode=null
              window.clearInterval(clock)
              this.content = '重新发送短信'
              this.totalTime = 10
              this.canClick = false
            }
          }, 1000)
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let TMP= JSON.parse(window.localStorage.getItem('VolunteerToken'));
          this.para.token = TMP.data
          this.para.userId = TMP.extra
          // console.log( this.para.userId)
          // console.log(this.para.token)
          // console.log(TMP)
          console.log(this.para)
          postRequest("/user/changEmail",this.para).then((res)=>{
            if (res.data.status==='success'){
              alert('绑定成功');
              this.dialogFormVisible=false
              setTimeout(()=>{
                window.location.reload()
              },500)
              router.replace('/cInfo_p')
            }else {
              alert('绑定失败')
              console.log(res.data)
              this.dialogFormVisible=false
              console.log(TMP)
              router.replace('/cInfo_p')
            }
          })
        } else {
          alert('提交失败!!')
          return false
        }
      })
    },
    resetForm() {
      this.dialogFormVisible=false
      router.replace('/cInfo_p')
    },
  }
}

</script>
<style scoped>

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
