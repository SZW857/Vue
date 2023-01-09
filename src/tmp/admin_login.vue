<template>
  <el-container>
    <el-main class="login_body">
      <div class="main_form" v-loading="loading">
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
            <el-form-item  prop="pass" >
              <el-input

                  :maxlength="11"
                  style="width: 350px"
                  placeholder="请输入用户名"
                  type="text"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                  prefix-icon="User"
              ></el-input>
            </el-form-item>
            <el-form-item  prop="checkPass">
              <el-input
                  :maxlength="12"
                  prefix-icon="Lock"
                  placeholder="密码"
                  style="width: 350px"
                  show-password
                  type="password"
                  v-model="ruleForm.checkPass"
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
import {User,Avatar} from '@element-plus/icons-vue'
export default {
  name: "app",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户信息"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      radio:3,
      ruleForm: {
        pass: "",
        checkPass: "",
        User,Avatar

      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
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


<style src="@/static/css/Admain.css" scoped/>