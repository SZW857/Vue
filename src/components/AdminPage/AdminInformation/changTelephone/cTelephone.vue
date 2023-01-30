<template>
  <el-dialog v-model="dialogFormVisible"
             title="更换手机号"
             width="600"
             :show-close="false"
           >
    <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
    >
      <el-form-item label="更换的手机号" prop="telephone" >
        <el-input
            type="text"
            v-model="ruleForm.telephone"
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
import {ElMessage} from "element-plus";

export default {
  name:'NewTelephone',
  data(){
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      }else if (this.teleRuleCheck(value)){
        let telephone=value
        getRequest("/user/telephoneCheck",{telephone}).then((res)=>{
          if (res.data.status==="fail"){
            this.para.telephone=value
            callback()
          }else {
            callback(new Error("该手机号码已经注册"))
          }
        })
      } else {
        callback(new Error('请输入正确手机号'))
      }
    }


    //反馈的验证码校验
    const feedbackCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入反馈的验证码'))
      } else if (this.valueCode===(value)) {
        console.log(this.para.telephone)
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
        telephone: '',
        feedbackCode: '',
      },
      readable:false,
      para:{
        telephone:"",
        token:'',
        adminName:''
      },
      content: '发送短信',
      totalTime: 15,
      canClick: false,
      valueCode: 1,
      rules: {
        telephone: [{ validator: validatePass, trigger: 'blur' }],
        feedbackCode: [{ validator: feedbackCode, trigger: 'blur' }],
      },
    }
  },
  methods:{
    //发送短信
    sendMsg(formName) {
      let _this=this
      // form为表单名字并ref="form"; prop 换成你想监听的prop字段
      this.$refs[formName].validateField('telephone', (errMsg) => {
        if (!errMsg) {
          alert('请通过手机格式验证!')
        }else{
          const code=Math.random().toFixed(6).slice(-6) // 随机生成六位数验证码
          this.valueCode=code
          let falseCode=Base64.encode(code)
          let telephone=_this.para.telephone
          alert(this.valueCode)
          getRequest("/sendMessage", {falseCode:falseCode,telephone:telephone})
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

    //校验手机号
    teleRuleCheck(stringber) {
      let pattern = /^1[34578]\d{9}$/;
      if (pattern.test(stringber)) {
        return true;
      }else {
        return false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let TMP= window.localStorage.getItem('AdminToken');
          if (TMP!==null){
            let tmp = JSON.parse(TMP)
            this.para.token =  tmp.data
            this.para.adminName = tmp.adminName
            postRequest('/admin/changTelephoneNumber',this.para).then((res)=>{
              if (res.data.status==='success'){
                alert('绑定成功');
                this.dialogFormVisible=false
                setTimeout(()=>{
                  window.location.reload()
                },500)
                router.replace('/cInfo_a')
              }else {
                alert('绑定失败')
                console.log(res.data)
                this.dialogFormVisible=false
                router.replace('/cInfo_a')
              }
            })
          }else {
            window.localStorage.removeItem("AdminToken")
            ElMessage.error("令牌失效，3s将后返回首页")
            setTimeout(()=>{
              window.location.reload()
             router.replace('/')
            },3000)
          }
        } else {
          alert('提交失败!!')
          return false
        }
      })
    },
    resetForm() {
      this.dialogFormVisible=false
      router.replace('/cInfo_a')
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
