<!--<template>-->
<!--  <div style="height: 700px">-->
<!--    <el-form-->
<!--        :model="ruleForm"-->
<!--        ref="ruleForm"-->
<!--        label-width="100px"-->
<!--        class="demo-dynamic"-->
<!--    >-->
<!--      <el-form-item prop="email" label="邮箱" style="width: 500px">-->
<!--        <el-input-->
<!--            v-model="ruleForm.email"-->
<!--            type="email"-->
<!--            class="el-input"-->
<!--        ></el-input>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    var emailCheck = (rule, value, callback) => {-->
<!--      if (value === '') {-->
<!--        callback(new Error('请输入邮箱'))-->
<!--      } else if (this.email_blur(value)) {-->
<!--        callback(new Error('两次输入密码不一致!'))-->
<!--      } else {-->
<!--        callback()-->
<!--      }-->
<!--    }-->
<!--    return {-->
<!--      ruleForm: {-->
<!--        email:''-->
<!--      },-->
<!--      rules: {-->
<!--        email: [{ required:true,validator: emailCheck, trigger: 'blur' }],-->
<!--      },-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    email_blur(string) {-->
<!--      var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;-->
<!--      if (verify.test(string)) {-->
<!--        return true;-->
<!--      } else {-->
<!--        return false;-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->


