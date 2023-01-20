<template>
  <h3 >个人信息展示</h3>
  <div style="margin-top:50px;margin-left: 280px;" >
  <el-form ref="form"
           :model="form"
           :rules="rules"
           label-width="120px"
           size="large"
           >
    <el-form-item label="签到次数">
      <el-input v-model="form.signNum" readonly ></el-input>
    </el-form-item>

    <el-form-item label="审核状态">
      <el-switch
          v-model="form.verify"
          class="ml-2"
          inline-prompt
          style="--el-switch-on-color: #0056f5; --el-switch-off-color: #ff4949"
          active-text="审核通过"
          inactive-text="审核中ing..."
          :active-value="1"
          :inactive-value="0"
          disabled
      ></el-switch>
    </el-form-item>

    <el-form-item label="年龄" prop="age">
      <el-input
          v-model="form.age"
          type="number"
          placeholder="只能输入数字，保密起见不限制是否填写真实年龄"
      ></el-input>
    </el-form-item>
    <el-form-item label="手机号"  prop="telephone">
      <el-input v-model="form.telephone" readonly placeholder="慎重!!!，误填非绑定手机号，可能导致密码无法找回"/>
      <el-button type="info" icon="Edit" circle @click="changeTelephone"/>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input
          v-model="form.email"
          readonly
      />
      <el-button type="info" icon="message" circle @click="changeEmail" />
    </el-form-item>


    <el-form-item label="家庭住址" prop="address">
      <el-input
          v-model="form.address"
          :maxlength="30"
          placeholder="最多三十个字符"
      ></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="form.sex" placeholder="请选择性别">
        <el-option label="男" value="M"></el-option>
        <el-option label="女" value="F"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button style="width: 500px;" type="primary"  @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
  </div>
  <router-view></router-view>

</template>

<script>
import { getRequest,postRequest} from '@/Api_Axios/config.js'
import { reactive, ref } from 'vue'
import router from "../../router";
import {ElMessage} from "element-plus";
export default {

  data() {
    let checkAge = (rule, value, callback) => {
      if (value==='') {
         callback(new Error('年龄不能为空'))
      }else {
          if (value < 0 || value > 100) {
            callback(new Error('年满必须在0~100岁之间'))
          } else {
            callback()
          }
      }
    }
    let checkAddress =(rule, value ,callback)=>{
      if (value===''){
        callback(new Error("地址不能为空"))
      }else {
        if (this.addressCheck(value)){
          callback()
        }else {
          callback(new Error('正确地址格式:陕西省XXXXXXXX'))
        }
      }
    }

    return {
      dialogFormVisible:ref(false),
      formLabelWidth:'140px',
      form: reactive({
        address: '',
        sex: '',
        telephone: '',
        signNum:0,
        verify:0,
        age:0,
        email: '',
      }),
      //抽取部分属性,用于保存的表
      ruleForm:reactive({
        address: '',
        sex: '',
        signNum:0,
        verify:0,
        age:0,
        userId:'',
        token:''
      }),
     cTelephone:reactive({
        telephoneNew: '',
        verifyCode: '',
      }),
      cEmail:reactive({
        emailNew: '',
        verifyCode: '',
      }),
      personalInfo:{
        token:'',
        userId:''
      },
      rules:{
        age: [{ required:true,validator: checkAge, trigger: 'blur' }],
        address: [{required:true,validator:checkAddress,trigger:'blur'}],
        sex: [{required:true,trigger:'change'}]
      }
    }
  },
  //初始化加载页面
    mounted(){
      let _this=this
      let tmp=window.localStorage.getItem('VolunteerToken');
      if (tmp!==null){
        _this.personalInfo.token=JSON.parse(tmp).data;
        _this.personalInfo.userId=JSON.parse(tmp).extra;
        getRequest('/user/selectPersonInfo',_this.personalInfo).then((res)=>{
          let a=res.data
          this.form.age=a[0].age
          this.form.telephone=a[0].telephone
          this.form.email=a[0].email
          this.form.address=a[0].address
          this.form.sex=a[0].sex
          this.form.verify=a[0].verify_status
          this.form.signNum=a[0].sign_num
          console.log(res.data)
        })
      }else {
        alert("服务器请求失败，请先登录!!!")
        router.replace('/')
      }

    },
  methods:{
    onSubmit(){
      this.ruleForm.age=this.form.age
      this.ruleForm.sex=this.form.sex
      this.ruleForm.address=this.form.address
      this.ruleForm.token=JSON.parse(window.localStorage.getItem('VolunteerToken')).data
      this.ruleForm.userId=JSON.parse(window.localStorage.getItem('VolunteerToken')).extra
      // console.log(this.ruleForm.address)
      // console.log(this.ruleForm.sex)
      // console.log(this.ruleForm.age)
      postRequest('/user/saveInformation',this.ruleForm).then((res)=>{
        if (res.data.status==='success'){
          ElMessage.success("保存成功")
        }else {
          ElMessage.error("保存失败,服务器崩溃~")
        }
      })
    },
    changeTelephone(){
     router.push('/cTelephone')
    },
    changeEmail(){
      router.push('/cEmail')
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

}

</script>



<style scoped>
h3{
text-align: center;
}
.dialog-footer button {
  margin-right: 10px;
}
</style>