<template>
    <div id="register_container">
       <div id="register_body">
         <h1 style="text-align: center">志愿者注册</h1>
         <h2 style="text-align: left; height: 32px"><img src="@/static/picture/waringBar.png" />&ensp;用户信息:</h2>
  <el-form
      :model="ruleForm"
      :rules="rules"
      label-position="top"
      status-icon
      ref="ruleForm"
      class="demo-ruleForm"
      style="text-align: left;
             margin-left: 80px"
  >
    <el-form-item label="用户名" prop="userId">
      <el-input
        :maxlength="8"
        :minlength="2"
        type="text"
        autocomplete="off"
        v-model="ruleForm.userId"
        prefix-icon="User"
        placeholder="请输入用户名"
    ></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="pass">
      <el-input
        type="password"
        autocomplete="off"
        v-model="ruleForm.pass"
        prefix-icon="lock"
        placeholder="请输入密码"
    ></el-input>
    </el-form-item>

    <el-form-item label="确认密码" prop="passwd">
      <el-input
        type="password"
        autocomplete="off"
        v-model="ruleForm.passwd"
        prefix-icon="lock"
        placeholder="请输入确认密码"
    ></el-input>
    </el-form-item>

    <el-form-item label="手机号码" prop="telephone">
      <el-input
          :maxlength="11"
          type="text"
          autocomplete="off"
          v-model="ruleForm.telephone"
          prefix-icon="iphone"
          placeholder="请输入手机号码"
      ></el-input>
    </el-form-item>

    <el-form-item label="QQ邮箱" prop="email">
      <el-input
          :maxlength="18"
          type="text"
          v-model="ruleForm.email"
          autocomplete="off"
          prefix-icon="Message"
          class="el-input"
          placeholder="请输入你的邮箱地址"
      ></el-input>
    </el-form-item>

    <el-form-item label="身份证号" prop="idCard">
      <el-input
          :maxlength="18"
          type="text"
          v-model="ruleForm.idCard"
          autocomplete="off"
          prefix-icon="Memo"
          class="el-input"
          placeholder="请输入你的身份证号"
      ></el-input>
    </el-form-item>

    <el-form-item label="家庭地址" prop="address">
      <el-input
          :maxlength="30"
          type="text"
          autocomplete="off"
          v-model="ruleForm.address"
          prefix-icon="house"
          placeholder="请输入您的地址"
      ></el-input>
    </el-form-item>

    <el-form-item label="性别" prop="sex">
      <el-select
          v-model="ruleForm.sex"
          placeholder="性别"
      >
        <el-option label="男" value="M" />
        <el-option label="女" value="F" />
      </el-select>
    </el-form-item>

    <el-form-item label="请选择你的管理员" prop="idCardAdmin" >
      <el-select
          v-model="ruleForm.idCardAdmin"
          placeholder="请选择你的管理员"
      >
        <el-option :label="item.admin_name" v-for="(item) in adminALLInfo" :value="item.id_card"/>
      </el-select>
    </el-form-item>

    <el-form-item label="年龄" prop="age">
      <el-input-number
          :max="100"
          v-model.number="ruleForm.age"
          placeholder="请输入你的年龄"
          style="width: 220px;"
      ></el-input-number>
    </el-form-item>

  </el-form>
         <div style="width: 800px" >
         <h2 style="text-align: left; height: 32px"><img src="@/static/picture/waringBar.png"/>&ensp;志愿者誓词:</h2>
         <p style="font-weight: bolder;text-indent: 2em" >&nbsp;在此我宣誓，自愿成为一名光荣的社区志愿者，为使我们的明天变得更美好、社区更加和谐、环境更舒适，我要团结身边的人，投身其间。面对需求，我要行动。</p>
         <p style="font-weight: bolder;text-indent: 2em">&nbsp;&nbsp;我承诺，我将竭尽所能，参加公益活动，帮助困难人群,救助受苦受难的人民群众，真诚关怀有需要的人士，为他们带来温暖，肩起负新时代青年的伟任。</p>
         </div>
           <el-form-item class="btns">
           <el-button type="primary" @click="submitForm('ruleForm')" >注册</el-button>
           <el-button @click="resetForm('ruleForm')">重置</el-button>
         </el-form-item>
       </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { postRequest,getRequest } from '@/Api_Axios/config.js'
import router from "@/router";
export default {
  data() {
    var checkName = (rule,value,callback) =>{
      if (value===""){
        callback(new Error("请输入用户名"))
      }else if (this.usernameCheck(value)){
        let userId=value
        getRequest("/user/NameCheck/",{userId}).then((res)=>{
          if (res.data.status==="fail"){
            this.ruleForm.userId=value
            callback()
          }else {
            callback(new Error("该用户名已经存在"))
          }
        })
      }else {
        callback(new Error('用户名只能由2~8个中文、字母和数字下划线组成,不能包含特殊字符'))
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (this.passCheck(value)){
        this.$refs.ruleForm.validateField("passwd");
        callback();
      } else {
        callback(new Error("密码格式不对;应由8~20位的数字、字母、特殊字符组成"))
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        this.ruleForm.passwd=value
        callback();
      }
    };

    let telephoneNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      }else if (this.teleRuleCheck(value)){
        let telephoneNum=value
        getRequest("/user/telephoneCheck",{telephoneNum}).then((res)=>{
          if (res.data.status==="fail"){
            this.ruleForm.telephone=value
            callback()
          }else {
            callback(new Error("该手机号码已经注册"))
          }
        })
      } else {
        callback(new Error('请输入正确手机号'))
      }
    };

    let email = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱地址'))
      } else if (this.email_blur(value)) {
        let email=value
        getRequest("/user/emailCheck",{email}).then((res)=>{
          if (res.data.status==="fail"){
            this.ruleForm.email=value
            callback()
          }else {
            callback(new Error("该手机邮箱已经注册"))
          }
        })
      } else {
        callback(new Error('请输入正确邮箱地址'))
      }
    };

    let idCard = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号码'))
      } else if (this.idCardRuleCheck(value)) {
        this.ruleForm.idCard=value
        let idCard=value;
        getRequest("/user/idCardCheck",{idCard}).then((res)=>{
          if (res.data.status==="success"){
            callback(new Error("该身份证号已经注册"))
          }else {
            this.IdCard=value
            callback()
          }
        })
      } else {
        callback(new Error('身份证格式不对'))
      }
    };

    let address = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入你的地址'))
      } else if (this.addressCheck(value)) {
        this.ruleForm.address=value
        callback()
      } else {
        callback(new Error('正确地址格式:陕西省XXXXXXXX'))
      }
    };

    let checkAge = (rule, value, callback) => {
      if (value=== '') {
        return callback(new Error('年龄不能为空'))
      }else if (value<1){
        callback(new Error('请输入正整数'))
      }else {
        this.ruleForm.age=value
        callback();
      }
    };

    return {
      adminALLInfo:{
        idCard:'',
        adminName:''
      },
      ruleForm: {
        userId: "",
        age: 0,
        idCard: '',
        passwd: "",
        telephone:'',
        address:"",
        sex:"",
        email:'',
        idCardAdmin:'',
      },
      rules: {
        telephone: [{ required:true,validator: telephoneNumber, trigger: 'blur' }],
        userId: [{required: true, validator:checkName,trigger: 'blur'}, { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },],
        pass: [{ required: true, validator: validatePass, trigger: "blur" },],
        passwd: [{ required: true, validator: validatePass2, trigger: "blur" },],
        age: [{ validator: checkAge, trigger: 'blur' }],
        idCard: [{ required:true,validator: idCard, trigger: 'blur' }],
        address: [{ required:true,validator: address, trigger: 'blur' }],
        email:[{required:true,validator:email,trigger:'blur'}],
        idCardAdmin:[{required:true,message:'请选择一个管理员'}]
      },
    };
  },
  mounted() {
    let _this=this
    getRequest('/admin/selectAdminInfo').then((res)=>{
      if (res.data!==null){
        _this.adminALLInfo = res.data

      }

      console.log(res.data)
    })
  },
  methods: {
    submitForm(formName) {
      const _this=this
      this.$refs[formName].validate((valid) => {
        if (valid) {
         postRequest("/user/register", _this.ruleForm).then((res)=>{
           console.log(res.data)
         })
          this.$message({
            type: "success",
            message: "注册成功,等待管理员审核...",
          });
         router.replace('/login')
        } else {

          ElMessage({
            message: '完善信息方可提交!!!',
            grouping:true,
            type: 'error',
          })
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //校验手机号
    teleRuleCheck(stringber) {
      var pattern = /^1[34578]\d{9}$/;
      if (pattern.test(stringber)) {
        return true;
      }else {

        return false;
      }
    },

    //校验密码强度
    passCheck(pass) {
      let partten = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;
      if (partten.test(pass)){
        return true;
      }else {
        return false;
      }
    },

    //检测用户名合法度
    usernameCheck(string){
      let userNamePattern = /^[\u4e00-\u9fa5a-zA-Z0-9_-]{2,8}$/;
      if (userNamePattern.test(string)){
        return true
      }else {
        return false
      }
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

    //校验身份证号
    idCardRuleCheck(string) {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(reg.test(string) === false) {
        return  false;
      }else {
        return true;
      }
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
};
</script>
<style src="@/static/css/Register.css"  scoped/>


