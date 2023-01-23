<template>
  <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
      status-icon
      size="large"
  >
    <el-form-item label="标题" prop="title" >
      <el-input v-model="ruleForm.title"
                show-word-limit="30"
                style="width: 700px;"
                :maxlength="30"/>
    </el-form-item>

    <el-form-item label="照片">
      <el-upload
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          accept="image/*"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>

    <el-form-item label="发布类型" prop="type">
      <el-select v-model="ruleForm.type" placeholder="请选择">
        <el-option label="志愿防疫" value="志愿防疫" />
        <el-option label="扶贫帮困" value="扶贫帮困" />
        <el-option label="便民服务" value="便民服务" />
        <el-option label="敬老助残" value="敬老助残" />
        <el-option label="公共卫生" value="公共卫生" />
        <el-option label="青少年服务" value="青少年服务" />
      </el-select>
    </el-form-item>

    <el-form-item label="发布内容" prop="content">
      <el-input
          v-model="ruleForm.content"
          type="textarea"
          :autosize="{ minRows: 11, maxRows: 12}"
          style="width: 700px;"
          :maxlength="1000"
          show-word-limit
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">发布</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>

</template>

<script lang="ts" setup>
import {ElMessage} from "element-plus";
import type { UploadProps, UploadUserFile } from 'element-plus'
import {onMounted, reactive, ref} from 'vue'
import { postRequest } from '../../../Api_Axios/config.js'
import type { FormInstance, FormRules } from 'element-plus'
import router from '../../../router'


const defaultTime = ref(new Date());

const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')

const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  // console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}


const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  title: '请填写标题',
  type: '',
  content: '',
  adminId: ref(''),
  token: ''
})
const validateTitle = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('还没有输入!!!'))
  } else if (ruleForm.title.length<5) {
    callback(new Error("不能少于5个字!!!"))
  } else {
    callback()
  }
}

const validateContent = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('还没有输入!!!'))
  } else if (ruleForm.content.length<3) {
    callback(new Error("不能少于300字!!!"))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  title: [{ required: true,validator:validateTitle, trigger: 'blur' },],
  picture: [{ required: false, message: 'Please select at least one activity type', trigger: 'change',},],
  type: [{ required: true, message: '请至少选一个发布的类型', trigger: 'change',},],
  date: [{type: 'date', required: true, message: 'Please pick a date', trigger: 'change',},],
  content: [{ required: true,validator:validateContent,  trigger: 'blur' },],
})


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if(valid) {
        let tmp= window.localStorage.getItem("AdminToken");
        if (tmp!==null){
          ruleForm.token=JSON.parse(tmp).data
          ruleForm.adminId=JSON.parse(tmp).id
          console.log(tmp)
          postRequest('/news/publishNews',ruleForm).then((res)=>{
            if (res.data.status==='success'){
              alert("发布成功");
              setTimeout(()=>{
                window.location.reload()
              },100)
            }else {
              //token过期
              console.log(res.data)
              let msg=res.data.msg
              if (msg==='TOKEN异常'){
                ElMessage.error("发布失败,TOKEN异常,请重新登录!!")
                window.localStorage.removeItem("AdminToken");
                setTimeout(()=>{
                  window.location.reload()
                  router.replace('/login_A')
                },1000)
              }else if (msg==="TOKEN过期"){
                window.localStorage.removeItem("AdminToken");
                ElMessage.error("发布失败,TOKEN过期,请重新登录!!")
                setTimeout(()=>{
                  window.location.reload()
                },1000)
                router.replace('/login_A')
                return false;
              }else {
                ElMessage.error("发布失败,服务器崩溃~")
              }
            }
          })
        }else {
          //无token
          alert("登录状态异常,请重新登录!!!")
          setTimeout(()=>{
            window.location.reload()
          },1000)
          router.replace('/')
        }
    }else {
      ElMessage.error("发布失败,请先完善发布信息!!")
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>




