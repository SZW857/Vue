<template>
  <div style="  background-image: linear-gradient(to right , #56dae5, #bcfcc2);">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <span style="position: absolute">
      <el-form-item label="联系邮箱" label-width="120" prop="email" style="width: 500px;">
        <el-input v-model="ruleForm.email" readonly ></el-input>
      </el-form-item>
      </span>
      <el-form-item label="标题" prop="title" style="width: 600px" required>
        <el-input v-model="ruleForm.title " maxlength="50" show-word-limit></el-input>
      </el-form-item>
      <span style="position: absolute">
         <el-form-item label-width="120" label="发起人联系电话" prop="telephone" style="width: 500px">
        <el-input v-model="ruleForm.telephone" readonly></el-input>
      </el-form-item>
      </span>
      <el-form-item label="联系人" prop="contact" style="width: 500px">
        <el-input v-model="ruleForm.contact " readonly></el-input>
      </el-form-item>
      <el-form-item label="宣传海报" prop="pic" >
        <div id="upload">
          <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:8083/user/measure"
              :show-file-list="true"
              :auto-upload="false"
              name="avatar"
              accept=".jpg,.jpeg,.png"
              list-type="picture"
              limit="1"
              @change="storage"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <el-row justify="start">  <el-button  size="small"  id="uploadButton" type="primary" @click="uploadImage">上传图片</el-button></el-row>
        </div>

      </el-form-item>
      <div>
        <span>
    <el-form-item label="招募人数" prop="peopleNum" STYLE="width: 500pX;">
      <el-input
          v-model="ruleForm.peopleNum"
          :max="20"
          :maxlength="2"
          type="number"
      ></el-input>
    </el-form-item>
      </span>
      </div>
      <el-form-item label="活动类型" prop="type" >
        <el-select v-model="ruleForm.type" placeholder="请选择活动类型">
          <el-option label="志愿防疫" value="志愿防疫"></el-option>
          <el-option label="敬老助残" value="敬老助残"></el-option>
          <el-option label="文明实践" value="文明实践"></el-option>
          <el-option label="青少年服务" value="青少年服务"></el-option>
          <el-option label="扶贫帮困" value="扶贫帮困"></el-option>
          <el-option label="便民服务" value="便民服务"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" prop="date" required style="width: 500">
        <el-col :span="5">
          <el-date-picker
              style="width: 380px"
              v-model="ruleForm.date"
              type="datetimerange"
              placeholder="请选择开始结束时间"
              :default-time="defaultTime"
              format="YYYY-MM-DD HH:mm:00"
              value-format="YYYY-MM-DD HH:mm:00"
              range-separator="到"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="活动内容" prop="content">
        <el-input type="textarea"
                  v-model="ruleForm.content"
                  :autosize="{ minRows: 10, maxRows: 12}"
                  style="width: 700px;"
                  :maxlength="1000"
                  show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import {postRequest} from "@/Api_Axios/config";
import router from "@/router";
import {checkDate} from "@/static/js/dateFormat";
export default {
  mounted() {
    let tmp = JSON.parse(window.localStorage.getItem("AdminToken"));
    if (tmp!==null){
      this.ruleForm.telephone = tmp.telephone
      this.ruleForm.email = tmp.email
      this.ruleForm.contact = tmp.adminName
      this.token = tmp.data
      this.params.adminId = tmp.id
    }
  },
  data() {
    let checkTimepicker = (rule, value, callback) => {
      if (value[0]===null||value[1]===null||value.length<=0) {
        return  callback(new Error('时间不能为空'))
      }else {
        let tmp = checkDate(value[0],value[1])
        if(tmp==='发布时长以2小时为单位'){
          alert(tmp)
          callback(new Error('发布时长以2小时为一个单位,当前选择时间周期太长'))
        }else if (tmp ==='今日可以安排的时间已过,应该在16:00以前'){
          alert(tmp)
          callback(new Error('今日可以安排的时间已过,应该在16:00以前'))
        }else if (tmp==='选择的发布不能小于当前时间'){
          alert(tmp)
          callback(Error('选择的发布不能小于当前时间'))
        } else {
          callback()
        }
      }
    }
    return {
      file:[],
      defaultTime:new Date(2023,1,20,8,0),
      token:'',
      ruleForm: {
        imageUrl: '',
        contact: '',
        email: '',
        telephone:'',
        peopleNum: null,
        type: '',
        title:'',
        date:['2023-01-01 08:00:00',"2023-01-02 08:00:00"],
        content:''
      },
      params:{
        imageUrl: '',
        contact: '',
        email: '',
        title:'',
        telephone:'',
        peopleNum: null,
        type: '',
        startDate:'',
        finishDate:'',
        content:'',
        remaining:'',
        token:'',
        adminId:''
      },
      rules: {
        email: [{ message: '你的联系邮箱', trigger: 'blur' }],
        telephone: [{ message: '你的手机号', trigger: 'blur' }],
        peopleNum: [{ required: true, trigger: 'blur',message:'请输入人数' }],
        type: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
        date: [{ required: true,validator: checkTimepicker, trigger: 'blur' }],
        content: [{ required: true, message: '请填写活动内容', trigger: 'blur' }]}
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.params.imageUrl = _this.ruleForm.imageUrl
          _this.params.contact= _this.ruleForm.contact
          _this.params.email=_this.ruleForm.email
          _this.params.title=_this.ruleForm.title
          _this.params.telephone=_this.ruleForm.telephone
          _this.params.peopleNum=_this.ruleForm.peopleNum
          _this.params.type = _this.ruleForm.type
          _this.params.startDate=_this.ruleForm.date[0]
          _this.params.finishDate=_this.ruleForm.date[1]
          _this.params.content=_this.ruleForm.content
          _this.params.token = _this.token
          _this.params.remaining = _this.ruleForm.peopleNum
          console.log(this.params)
          postRequest('/admin/publishActive',_this.params).then((res)=>{
            if(res.data.msg==="TOKEN过期"){
              ElMessage.error("发布失败，令牌过期,3s后将返回首页")
              window.localStorage.removeItem("AdminToken")
              setTimeout(()=>{
                router.replace("/")
              },3000)
            }else if(res.data.msg==="无效签名"){
              ElMessage.error("发布失败，无效令牌签名,3s后将返回首页")
              window.localStorage.removeItem("AdminToken")
              setTimeout(()=>{
                router.replace("/")
              },3000)
            }else if (res.data.msg==="TOKEN异常"){
              ElMessage.error("发布失败，令牌异常,3s后将返回首页")
              window.localStorage.removeItem("AdminToken")
              setTimeout(()=>{
                router.replace("/")
              },3000)
            }else {
              setTimeout(()=>{
                window.location.reload();
              },1000)
              alert('发布成功!');
            }
          })
        } else {
          alert('请先通过表单校验!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.imageUrl = res
      console.log(res)
      console.log(file)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      let types = ['image/jpeg', 'image/jpg', 'image/png'];
      const isImage = types.includes(file.type);
      if (!isImage) {
        ElMessage.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!')
      }
      return isImage && isLt2M
    },
    storage(file){
      this.file=file
    },
    uploadImage() {
      let _this = this
      if (JSON.stringify(this.file)==='[]'){
        ElMessage.warning("请先上传图片")
        if (this.file.length>1){
          ElMessage.warning("暂时支持上传一张")
        }
      }else {
        console.log(_this.file.raw)
        let formData = new FormData();
        formData.append("avatar", _this.file.raw)
        formData.append("token",_this.token)
        axios.post('http://127.0.0.1:8083/admin/uploadImage',formData).then((res)=>{
          if (res.data.code===200){
            ElMessage.success("上传成功")
            this.ruleForm.imageUrl=res.data.data
          }else if (res.data.state==='false'){
            ElMessage.error("令牌过期，上传失败，请重新登录")
            window.localStorage.removeItem("AdminToken")
            setTimeout(()=>{
              window.location.reload();
              router.replace("/")
            },3000)
          }
          console.log(res.data)
        })

      }
    }
  }
}
</script>



<style>
.avatar-uploader .el-upload {
  border: 1px dashed #87d241;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #cccccc;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
#uploadButton{
  width: 80px;
}
</style>

