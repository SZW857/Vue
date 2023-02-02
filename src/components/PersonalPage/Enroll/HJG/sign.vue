<template>
  <div style="  background-image: linear-gradient(to right , #be8c78, #519a51);">
    <el-row justify="start"><el-link href="/EnrollResult" :underline="false" style="font-size: 16px" type="primary"><el-icon><DArrowLeft /></el-icon>返回个人页</el-link></el-row>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="志愿者名称" prop="contact" style="width: 500px" >
        <el-input v-model="ruleForm.userId" readonly></el-input>
      </el-form-item>
      <el-form-item label="合照凭证图片" prop="pic"  >
        <div id="upload">
          <el-upload
              class="avatar-uploader"
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
            <img v-if="ruleForm.voucher" :src="ruleForm.voucher" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <el-row justify="start">
            <el-col style="text-align: left;background-color: #f6d587;height: 30px"><marquee>温馨提示:照片大小不超2M,PNG,JPEG类型</marquee></el-col>
            <el-button  size="small"  id="uploadButton" type="primary" @click="uploadImage">上传图片</el-button>
          </el-row>
        </div>

      </el-form-item>
      <div>
      </div>
      <el-form-item label="活动心得" prop="content">
        <el-input type="textarea"
                  v-model="ruleForm.content"
                  :autosize="{ minRows: 10, maxRows: 12}"
                  style="width: 700px;"
                  :maxlength="1000"
                  show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 720px" @click="submitForm('ruleForm')">提交签到</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import {postRequest} from "@/Api_Axios/config";
import router from "@/router";
export default {
  mounted() {
    let item = window.localStorage.getItem("VolunteerToken");
    if (item!==null){
      this.params.userId = JSON.parse(item).extra
      this.params.token =  JSON.parse(item).data
      this.ruleForm.userId = this.params.userId
    }
  },
  data() {
    return {
      file:[],
      ruleForm: {
        userId:'',
        voucher: '',
        content:'',
        token:'',
      },
      params:{
        userId:'',
        voucher: '',
        content:'',
        serialNum:'',
        token:'',
      },
      rules: {
        content: [{ required: true, message: '请填写活动内容', trigger: 'blur' }]},
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.params.content=_this.ruleForm.content
          _this.params.voucher = _this.ruleForm.voucher
          _this.params.serialNum = this.$route.params.id
          console.log("提交之前准备的参数"+this.params)
          postRequest('/enroll/signIn',_this.params).then((res)=>{
            console.log(res.data)
            if (res.data.status==="success"){
                ElMessage.success("提交成功,等待管理员审核!")
              setTimeout(function (){
                window.location.reload()
              },3000)
            }else {
              alert("提交失败")
            }
            // }else if (res.data.status==="success"){

            //   setTimeout(()=>{
            //     router.replace("/EnrollResult")
            //   },2000)
            // } else {
            //   // setTimeout(()=>{
            //   //   window.location.reload();
            //   // },1000)
            //   alert('提交失败');
            // if(res.data.msg==="TOKEN过期"){
            //   ElMessage.error("提交失败，令牌过期,3s后将返回首页")
            //   window.localStorage.removeItem("VolunteerToken")
            //   setTimeout(()=>{
            //     router.replace("/")
            //   },3000)
            // }else if(res.data.msg==="无效签名"){
            //   ElMessage.error("发布失败，无效令牌签名,3s后将返回首页")
            //   window.localStorage.removeItem("VolunteerToken")
            //   setTimeout(()=>{
            //     router.replace("/")
            //   },3000)
            // }else if (res.data.msg==="TOKEN异常"){
            //   ElMessage.error("发布失败，令牌异常,3s后将返回首页")
            //   window.localStorage.removeItem("VolunteerToken")
            //   setTimeout(()=>{
            //     router.replace("/")
            //   },3000)

            // }
          })
        } else {
          alert('请先通过表单校验!!');
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.voucher = res
      // console.log(res)
      // console.log(file)
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
        ElMessage.warning("请先点击十字框,确认后点我上传")
        if (this.file.length>1){
          ElMessage.warning("暂时支持上传一张")
        }
      }else {
      // /*  console.log(_this.file.raw)*/
        let formData = new FormData();
        formData.append("avatar", _this.file.raw)
        formData.append("token",_this.params.token)
        axios.post('http://127.0.0.1:8083/admin/uploadImage',formData).then((res)=>{
          if (res.data.code===200){
            ElMessage.success("上传成功")
            this.ruleForm.voucher=res.data.data
          }else if (res.data.state==='false'){
            ElMessage.error("令牌过期，上传失败，请重新登录")
            window.localStorage.removeItem("VolunteerToken")
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

