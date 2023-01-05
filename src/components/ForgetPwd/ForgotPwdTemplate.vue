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
          <el-form-item label="请输入绑定的手机号:" prop="telephoneNumber">
            <el-input
                :maxlength="11"
                type="number"
                v-model="ruleForm.telephoneNumber"
                autocomplete="off"
                prefix-icon="Memo"
                class="telephoneNumAndCode"
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
    <router-view></router-view>
  </div>
</template>

<script>


import { ElMessage } from 'element-plus'
import SIdentify from '@/components/identify'
import { postRequest } from '@/api/config.js'
import {CaptchaEncryption} from '@/static/js/CaptchaEncryption.js'
export default {

  name:'ForgotPwdTemplate',
  components: {SIdentify},
  data() {
    var validateVerifycode = (rule, value, callback) => {
      const newVal = this.identifyCode.toUpperCase()
      const identifyStr = this.identifyCode.toLowerCase()
      if (value === '')  {
        return callback(new Error('验证码不能为空'))
      }else if (value === identifyStr) {
        callback()
      }else if (value === newVal){
        callback()
      }else {
        console.log('validateVerifycode:', value)
        callback(new Error('验证码不正确!'))
      }
    }
    var telephoneNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      }else if (this.teleRuleCheck(value)){
        callback()
      } else {
        callback("手机格式不正确");
      }
    }
    var idCard = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号码'))
      } else if (this.idCardRuleCheck(value)) {
        this.IdCard=value
        callback()
      } else {
        callback(new Error('身份证格式不对'))
      }
    }
    //修改密码校验
    var validatePass = (rule, value, callback) => {
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    //反馈的验证码校验
    var feedbackCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入反馈的验证码'))
      } else if (this.codeValue===(value)) {
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
        telephoneNumber: '',
        idCard: '',
        verifycode: '',
        pass:'',
        confirmPass: '',
        feedbackCode:''
      },
      content: '发送短信',
      totalTime: 5,
      canClick: false,
      codeValue: 1,
      IdCard:'',
      sendTele:'',

      rules: {
        telephoneNumber: [{ required:true,validator: telephoneNumber, trigger: 'blur' }],
        idCard: [{ required:true,validator: idCard, trigger: 'blur' }],
        pass: [{ required:true,validator: validatePass, trigger: 'blur' }],
        confirmPass: [{ required:true,validator: validatePass2, trigger: 'blur' }],
        verifycode: [{required: true, validator: validateVerifycode,trigger: 'blur' }],
        feedbackCode:[{required:true,validator:feedbackCode,trigger:'blur'}]
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

    sendMsg(formName) {
      // form为表单名字并ref="form"; prop 换成你想监听的prop字段
      this.$refs[formName].validateField('telephoneNumber', (errMsg) => {
        if (!errMsg) {
          alert('请通过手机格式验证!')
        }else{
          var code=Math.random().toFixed(6).slice(-6) // 随机生成六位数验证码
          this.codeValue=code
          alert(this.codeValue)
          var falseCode=CaptchaEncryption(code)
          var telephoneNum=this.ruleForm.telephoneNumber
          var readyData=JSON.stringify({
            tele:telephoneNum,
            code:falseCode
          });
           postRequest(telephoneNum,falseCode)

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


    encryptByDES(message, key){
      var keyHex = CryptoJS.enc.Utf8.parse(key);
      var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.ciphertext.toString();
    }
    ,
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
            this.$router.replace('/finish')
          }
        } else {
          alert('请输入正确的密码')

        }
      })
    },
    //规则如下：先得到每位数，然后每位数都加上5，再对10求余，最后将所有数字反转，得到一串新数。
    CaptchaEncryption(){

      var num = 123456;// 输入的数字
      // 1、把整数里面的每一位放到数组里
      var str = num.toString();// 转化为字符串
      var intArray = new int[str.length()];// 新建一个数组用来保存num每一位的数字
      for (var i = 0; i < str.length(); i++) {
        // 遍历str将每一位数字添加如intArray
        var ch = str.charAt(i);
        intArray[i] = Integer.parseInt(ch.toString());
      }
      // 2、加密
      // 每位数都加上5
      for (var i = 0; i < intArray.length; i++) {
        intArray[i] = intArray[i] + 5;
      }
      // 再对10求余
      for (var i = 0; i < intArray.length; i++) {
        intArray[i] = intArray[i] % 10;
      }
      // 将所有数字反转
      for (var i = 0, j = intArray.length - 1; i < j; i++, j--) {
        var temp = intArray[i];
        intArray[i] = intArray[j];
        intArray[j] = temp;
      }
      // 3.把数组里面的每个数字进行拼接，变成加密之后的结果
      var number = 0;
      for (var i = 0; i < intArray.length; i++) {
        number = number * 10 + intArray[i];
      }
      alert(number)
    }
    ,
    //手机号格式校验
    teleRuleCheck(stringber) {
      var pattern = /^1[34578]\d{9}$/;
      if (pattern.test(stringber)) {
        return true;
      }else {
        console.log('check mobile phone ' + stringber + ' failed.');
        return false;
      }

    },
    //身份证规则校验
    idCardRuleCheck(string) {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
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
</script>




<style scoped>

/deep/  .telephoneNumAndCode input::-webkit-outer-spin-button,
/deep/  .telephoneNumAndCode input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
/deep/  .telephoneNumAndCode input[type="number"]{
  -moz-appearance: textfield;
}

/deep/  .telephoneNumAndCode inpit{
  border: none
}









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
</style>