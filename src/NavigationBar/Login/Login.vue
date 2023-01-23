<template>
  <el-container>
    <el-main class="login_body">
     <div
         class="main_form"
         v-loading="this.loading"
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
      </el-form>
         <p style="margin-left: 200px"><el-link href="/forgetPwd_p">忘记密码？</el-link></p>
       </div>
    </div>
    </el-main>

  </el-container>

</template>

<script>
import {getRequest} from "@/Api_Axios/config";
import router from '@/router'
import {ElMessage} from "element-plus";
import { ref } from 'vue'
export default {
  //
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户信息"));
      } else {
        if (this.ruleForm.userId !== "") {
          let userId=this.ruleForm.userId
          getRequest("/user/NameCheck/", {userId}).then((res)=>{
            if (res.data.status==="fail"){
              callback(new Error("请先通过注册"))
            }else {
              this.ruleForm.userId=value
              callback()
            }
          })
        }
      }
    };
    const validatePasswd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback()
      }
    }
    return {

      loading: ref(false),
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
      this.$refs[formName].validate((valid) => {
        let _this=this
        if (valid) {
          _this.loading=true
          setTimeout(()=>{
            window.localStorage.removeItem('AdminToken')
          getRequest('/user/login',_this.ruleForm).then((res)=>{
            if (res.data===null){
              _this.loading=false
            }else {
            //将token存入本地浏览器中
              if (res.data.status === "success") {
                console.log(res)
                setTimeout(() => {
                  _this.loading=false
                  this.flush()
                }, 800)
                localStorage.setItem("VolunteerToken", JSON.stringify(res.data))
                alert("登录成功")
                router.replace("/PersonalPage")
                console.log(res.data)
              } else if (res.data.status==='NoPassed'){
                ElMessage.error(res.data.data)
                _this.loading=false
              } else {
                ElMessage({
                  message: '密码不正确',
                  grouping: true,
                  type: 'error',
                })
                _this.loading=false
              }
          }
          })
        },2000)
        } else {
          ElMessage({
            message: '完善信息方可进入下一步',
            grouping:true,
            type: 'error',
          })
          router.push("/login")
        }
      });
    },
    flush(){
      window.location.reload();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
}

</script>

<style src="../../static/css/Login.css" scoped/>