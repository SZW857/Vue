<template>
    <div id="register_container">
       <div id="register_body">
         <h1 style="text-align: center">志愿者注册</h1>
         <h2 style="text-align: left; height: 32px"><img src="@/static/picture/waringBar.png" />&ensp;用户信息:</h2>
  <el-form
      :model="ruleForm"
      :rules="rules"
      status-icon
      ref="ruleForm"
      class="demo-ruleForm"
      style="text-align: left;
             margin-left: 80px"
  >

    <p><em style="color: #d23243">*</em>用户名:</p>
    <el-form-item label="" prop="name">
      <el-input
        type="text"
        autocomplete="off"
        v-model="ruleForm.name"
        prefix-icon="User"
        placeholder="请输入用户名"
    ></el-input>
    </el-form-item>

    <p><em style="color: #d23243">*</em>密码:</p>
    <el-form-item label="" prop="pass">
      <el-input
        type="password"
        autocomplete="off"
        v-model="ruleForm.pass"
        prefix-icon="lock"
        placeholder="请输入密码"
    ></el-input>
    </el-form-item>

    <p><em style="color: #d23243">*</em>确认密码:</p>
    <el-form-item label="" prop="checkPass">
      <el-input
        type="password"
        autocomplete="off"
        v-model="ruleForm.checkPass"
        prefix-icon="lock"
        placeholder="请输入确认密码"
    ></el-input>
    </el-form-item>

    <p><em style="color: #d23243">*</em>手机号码:</p>
    <el-form-item label="" prop="checkPass">
      <el-input
          type="password"
          autocomplete="off"
          v-model="ruleForm.checkPass"
          prefix-icon="iphone"
          placeholder="请输入手机号码"
      ></el-input>
    </el-form-item>

    <p><em style="color: #d23243">*</em> 邮箱:</p>
    <el-form-item label="" prop="checkPass">
      <el-input
          type="password"
          autocomplete="off"
          v-model="ruleForm.checkPass"
          prefix-icon="message"
          placeholder="请输入您的邮箱"
      ></el-input>
    </el-form-item>

    <p><em style="color: #d23243">*</em> 姓名:</p>
    <el-form-item label="" prop="checkPass">
      <el-input
          type="password"
          autocomplete="off"
          v-model="ruleForm.checkPass"
          prefix-icon="message"
          placeholder="请输入您的邮箱"
      ></el-input>
    </el-form-item>

    <p><em style="color: #d23243">*</em> 年龄:</p>
    <el-form-item label="" prop="checkPass">
      <el-input
          type="password"
          autocomplete="off"
          v-model="ruleForm.checkPass"
          prefix-icon="message"
          placeholder="请输入您的邮箱"
      ></el-input>
    </el-form-item>

    <p><em style="color: #d23243">*</em>身份证:</p>
    <el-form-item label="" prop="checkPass">
      <el-input
          type="password"
          autocomplete="off"
          v-model="ruleForm.checkPass"
          prefix-icon="CreditCard"
          placeholder="请输入您的身份证"
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
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

    return {
      activeName: "second",
      ruleForm: {
        name: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入您的名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
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
  },
};
</script>

<style src="@/static/css/Register.css" scoped/>


