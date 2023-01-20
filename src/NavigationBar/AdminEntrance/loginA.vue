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
            <el-form-item  prop="adminId" >
              <el-input
                  :maxlength="20"
                  style="width: 350px"
                  placeholder="用户名/email"
                  type="text"
                  v-model="ruleForm.adminId"
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
          <p style="margin-left: 200px"><el-link href="/forgetPwd_a">忘记密码？</el-link></p>
        </div>
      </div>
    </el-main>

  </el-container>
</template>

<script>
import {getRequest, postRequest,getRest} from "@/Api_Axios/config";
import router from '@/router'
import {ElMessage} from "element-plus";
import { ref } from 'vue'
export default {
  data() {
    let validateUserName = (rule, value, callback) => {
      //管理员信息验证框
      if (value === "") {
        callback(new Error("请输入管理员信息"));
      } else {
        if (this.ruleForm.adminId !== "") {
          if (this.emailCheck(value)){
            this.emailForm.email=value
            getRequest("/admin/EmailCheck",{email:value}).then((res)=>{
              if (res.data.status==="fail"){
                callback(new Error("该email未注册,请认真核查!!!"))
              }else {
                this.emailForm.email=value
                callback()
              }
            })
          }else {
          // let adminId=this.ruleForm.adminId
            getRequest("/admin/NameCheck/", {adminId:value}).then((res)=>{
            if (res.data.status==="fail"){
              callback(new Error("暂无该管理员,请认真核对!!!"))
            }else {
              this.ruleForm.adminId=value
              callback()
            }
          })
         }
        }
      }
    };
    //管理员密码验证框
    const validatePasswd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        this.emailForm.passwd=value
        this.ruleForm.passwd=value
        callback()
      }
    }
    return {
      loading: ref(false),
      ruleForm: {
        adminId: "",
        passwd: "",
      },
      emailForm:{
        email: '',
        passwd:'',
      },
      rules: {
        adminId: [{ validator: validateUserName, trigger: "blur" }],
        passwd: [{ validator: validatePasswd, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        let _this=this
        if (valid) {
          if (this.emailCheck(this.emailForm.email)){
          //Email提交
            _this.loading=true
            setTimeout(()=>{
              window.localStorage.removeItem('VolunteerToken')
              getRequest('/admin/loginEmail', _this.emailForm).then((res) => {
                //将token存入本地浏览器中
                if (res.data.status === "success") {
                  setTimeout(() => {
                    _this.loading = false
                    this.flush()
                  }, 800)
                  localStorage.setItem("AdminToken", JSON.stringify(res.data))
                  alert("登录成功")
                  router.replace("/AdminPage")
                  console.log(res.data)
                } else {
                  ElMessage({
                    message: '密码不正确',
                    grouping: true,
                    type: 'error',
                  })
                  _this.loading = false
                }
              })
            },2000)
          }else {
          //账号提交
            _this.loading=true
            setTimeout(()=>{
              window.localStorage.removeItem('VolunteerToken')
                getRequest('/admin/login', _this.ruleForm).then((res) => {
                  //将token存入本地浏览器中
                  if (res.data.status === "success") {
                    setTimeout(() => {
                      _this.loading = false
                      this.flush()
                    }, 800)
                    localStorage.setItem("AdminToken", JSON.stringify(res.data))
                    alert("登录成功")
                    router.replace("/AdminPage")
                    console.log(res.data)
                  } else {
                    ElMessage({
                      message: '密码不正确',
                      grouping: true,
                      type: 'error',
                    })
                    _this.loading = false
                  }
                })
            },2000)
          }

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
    //qq邮箱验证
    emailCheck(string) {
      let verify = /^[1-9][0-9]{4,10}@qq.com$/;
      if(verify.test(string)) {
        return true;
      } else {
        return false;
      }
    },
  },
}

</script>
<style src="@/static/css/loginA.css"/>

