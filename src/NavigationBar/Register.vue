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
    <el-form-item label="用户名" prop="name">
      <el-input
        :maxlength="10"
        type="text"
        autocomplete="off"
        v-model="ruleForm.name"
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

    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        type="password"
        autocomplete="off"
        v-model="ruleForm.checkPass"
        prefix-icon="lock"
        placeholder="请输入确认密码"
    ></el-input>
    </el-form-item>

    <el-form-item label="手机号码" prop="telephoneNumber">
      <el-input
          :maxlength="11"
          type="text"
          autocomplete="off"
          v-model="ruleForm.telephoneNumber"
          prefix-icon="iphone"
          placeholder="请输入手机号码"
      ></el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" prefix-icon="message" placeholder="请输入您的邮箱"></el-input>
      </el-form-item>

    <el-form-item label="性别" prop="checkPass">
      <el-input
          :maxlength="16"
          type="password"
          autocomplete="off"
          v-model="ruleForm.checkPass"
          prefix-icon="message"
          placeholder="请输入您的邮箱"
      ></el-input>
    </el-form-item>

    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm.age" prefix-icon="editPen" placeholder="请输入你的年龄"></el-input>
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
export default {
  data() {
    var checkName = (rule,value,callback) =>{
      if (value===""){
        callback(new Error("请输入用户名"))
      }else if (this.nameCheck(value)){
        callback()
      }else {
        callback(new Error('用户名只能2~5个中文、字母和数字,不能包含特殊字符'))
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (this.passCheck(value)){
        this.$refs.ruleForm.validateField("checkPass");
        callback();
      } else {
        callback(new Error("密码格式不对;应由6~10位的数字+字母；字母+特殊字符，特殊字符+数字"))
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    var telephoneNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      }else if (this.teleRuleCheck(value)){
        callback()
      } else {
        callback(new Error('请输入正确手机号'))
      }
    };

    var checkemail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (this.email_blur(value)) {
        alert('邮箱正确')
        callback()
      } else {

        callback(new Error('邮箱格式有误!'))
      }
    };

    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }

    var idCard = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号码'))
      } else if (this.idCardRuleCheck(value)) {
        callback()
      } else {
        callback(new Error('身份证格式不对'))
      }
    };

    return {
      activeName: "second",
      ruleForm: {
        name: "",
        pass: "",
        age: '',
        idCard: '',
        email: '',
        checkPass: "",
        telephoneNumber:'',
      },
      rules: {
        telephoneNumber: [
            { required:true,validator: telephoneNumber, trigger: 'blur' }
        ],
        name: [
          {required: true, validator:checkName,trigger: 'blur'},
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        pass: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        email: [{ validator: checkemail, trigger: 'blur' }],
        age: [{ validator: checkAge, trigger: 'blur' }],
        idCard: [{ required:true,validator: idCard, trigger: 'blur' }],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            type: "success",
            message: "注册成功",
          });
          // this.activeName: 'first',
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    teleRuleCheck(stringber) {
      var pattern = /^1[34578]\d{9}$/;
      if (pattern.test(stringber)) {
        return true;
      }else {
        console.log('check mobile phone ' + stringber + ' failed.');
        return false;
      }
    },
    nameCheck(String){
      var partten = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
      if (partten.test(String)){
        return true;
      }else {
        return false;
      }
    },
    passCheck(pass) {
      let partten = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,15}$/;
      if (partten.test(pass)){
        return true;
      }else {
        return false;
      }
    },
    email_blur(string) {
      var verify = /^[1-9][0-9]{4,10}@qq.com$/;
      if (verify.test(string)) {
        return true;
      } else {
        return false;
      }
    },
    idCardRuleCheck(string) {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(reg.test(string) === false) {
        return  false;
      }else {
        return true;
      }
    },
  },
};
</script>
<style src="@/static/css/Register.css"  scoped/>


