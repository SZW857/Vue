<template>
  <el-container>
    <el-main class="login_body">
     <div
         class="main_form"
         v-loading="loading"
         element-loading-text="拼命加载中..."
     >
       <div id="login_content">
      <span style="margin-top: 20px;"> <h1>请登录</h1></span>
      <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
      >
        <el-form-item  prop="userId" >
          <el-input

              :maxlength="11"
              style="width: 350px"
              placeholder="请输入用户名"
              type="text"
              v-model="ruleForm.userId"
              autocomplete="off"
              prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item  prop="passwd">
          <el-input
              :maxlength="12"
              prefix-icon="Lock"
              placeholder="密码"
              style="width: 350px"
              show-password
              type="password"
              v-model="ruleForm.passwd"
              autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item id="btn">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form><br>
       <span >
         &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
         <el-link href="/forgetPwd">忘记密码？</el-link>
       </span>
       </div>
    </div>
    </el-main>

  </el-container>

</template>

<script>
import {getRequest, postRequest,getRest} from "@/api/config";
import axios from "axios";
export default {
  name: "app",
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户信息"));
      } else {
        if (this.ruleForm.userId !== "") {
          let userId=this.ruleForm.userId
          getRequest("/usernamecheck/"+userId).then((res)=>{
            if (res.data.status==="fail"){
              callback(new Error("请先通过注册"))
            }else {
              callback()
            }
          })
          this.ruleForm.userId=value
        }
      }
    };
    var validatePasswd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback()
      }
    };
    return {
      loading: false,
       ruleForm: {
         userId: "",
         passwd: "",
      },
      rules: {
        userId: [{ validator: validateUserName, trigger: "blur" }],
        passwd: [{ validator: validatePasswd, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      let _this=this
      this.$refs[formName].validate((valid) => {
        let timeout=1500
        if (valid) {
          this.loading = true
          getRest('/login',_this.ruleForm).then((res)=>{
            //将token存入localstorge中
            if (res.data.status==="success"){
              console.log(res.data)
              // window.localStorage.setItem("volunteer",JSON.stringify(res.data))
              // console.log(res.data)
            }else {
              alert(22222)
            }
          })
          setTimeout(() => {
            // getRequest("/login",{params:_this.ruleForm}).then((res)=>{
            //
            //
            //     })
            this.loading = false;

          }, timeout);

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

}
</script>



<style src="@/static/css/Login.css" scoped/>