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
import router from '@/router/index.js'
import {ElMessage} from "element-plus";
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
        if (valid) {
          _this.loading = true;

          getRequest('/user/login',_this.ruleForm).then((res)=>{
            //将token存入localstorge中
            if (res.data.status==="success"){
              setTimeout(()=>{
                _this.loading = false;
                _this.$router.replace("/goods")
                setTimeout(()=>{
                  this.flush()
                },1500)
                ElMessage({
                  message: '登陆成功',
                  grouping:true,
                  type: 'success',
                })
              },1500);
              window.localStorage.setItem("VolunteerToken",JSON.stringify(res.data))
              console.log(res.data)
            }else {
              ElMessage({
                message: '密码不正确',
                grouping:true,
                type: 'error',
              })
              this.loading = false;
            }
          })

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



<style src="@/static/css/Login.css" scoped/>