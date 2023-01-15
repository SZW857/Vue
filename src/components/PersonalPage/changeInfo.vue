<template>
  <div style="margin-top:50px;margin-left: 270px">
  <el-form ref="form"
           :model="form"
           label-width="80px"
           style="width: 700px">
    <h3 >个人信息展示</h3>
    <el-form-item label="年龄">
      <el-input
          v-model="form.age"
          type="number"
          placeholder="只能输入数字，保密起见不限制是否填写真实年龄"
      ></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="form.telephone"  readonly="true" placeholder="慎重!!!，误填非绑定手机号，可能导致密码无法找回"></el-input>
    </el-form-item>

    <el-form-item label="邮箱">
      <el-input v-model="form.email"></el-input><el-link type="warning" :underline="false">绑定邮箱</el-link>
    </el-form-item>
    <el-form-item label="家庭住址">
      <el-input
          v-model="form.address"
          :maxlength="30"
          placeholder="最多三十个字符"
      ></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="form.sex" placeholder="请选择性别">
        <el-option label="男" value="M"></el-option>
        <el-option label="女" value="F"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import {getRequest} from '@/Api_Axios/config.js'
export default {
  data() {
    return {
      result:'',
      form: {
        address: '',
        sex: '',
        telephone: '',
        age:0,
        email: '',
      },
      personalInfo:{
        token:'',
        userId:''
      }
    }
  },
    mounted(){
      let _this=this
      let tmp=window.localStorage.getItem('VolunteerToken');
      _this.personalInfo.token=JSON.parse(tmp).data;
      _this.personalInfo.userId=JSON.parse(tmp).extra;
      getRequest('/user/selectPersonInfo',_this.personalInfo).then((res)=>{
        let _that = this
        _that.form.address = JSON.stringify(res.data)
        console.log(typeof _that.form.address);
      })
    },
  methods:{

  }
}

</script>
<style scoped>

</style>