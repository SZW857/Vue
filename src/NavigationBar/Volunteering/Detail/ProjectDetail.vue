<template xmlns:el-row="http://www.w3.org/1999/xhtml">
  <div class="detail">
    <el-row style="text-align: start">
      <el-link type="primary" :underline="false"
               href="/Volunteering"
               style="font-size: 20px" >
        <el-icon size="large"><DArrowLeft  />
      </el-icon>返回</el-link></el-row>
    <el-form :model="ruleForm"  label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title" style="width: 730px" class="item">
        <el-input v-model="ruleForm.title " readonly></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact" style="width: 500px" class="item">
        <el-input v-model="ruleForm.contact " readonly></el-input>
      </el-form-item>

      <el-form-item label="联系人邮箱" label-width="100" prop="email" style="width: 500px;" class="item">
        <el-input v-model="ruleForm.email" readonly ></el-input>
      </el-form-item>

      <span style="position: absolute">
         <el-form-item label-width="110" label="发起人联系电话" prop="telephone" style="width: 500px" class="item">
        <el-input v-model="ruleForm.telephone" readonly></el-input>
      </el-form-item>
      </span>

      <el-form-item label="宣传海报" prop="pic" class="item">
        <div id="upload">
          <el-upload
              class="avatar-uploader"
              :auto-upload="false"
              accept=".jpg,.jpeg,.png"
              list-type="picture"
              limit="1"
              disabled
          >
            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"></el-icon>
          </el-upload>
        </div>
      </el-form-item>
      <span style="position: absolute">
      <el-form-item label="剩余名额" prop="remaining" STYLE="width: 500px;" class="item">
        <el-input v-model="ruleForm.remaining" readonly></el-input>
      </el-form-item>

      </span>
      <el-form-item label="招募人数" prop="peopleNum" STYLE="width: 500px;" class="item">
        <el-input v-model="ruleForm.peopleNum" readonly></el-input>
      </el-form-item>

      <el-form-item label="活动类型" prop="type" STYLE="width: 500px;" class="item">
        <el-input v-model="ruleForm.type" readonly></el-input>
      </el-form-item>
      <el-form-item label="活动时间" prop="date"  style="width: 500" :disabled="true" class="item">
        <div>
          <el-row>
            <el-date-picker
                style="width: 300px;position: absolute"
                v-model="ruleForm.startDate"
                type="datetime"
                placeholder="请选择开始结束时间"
                :default-time="defaultTime"
                readonly
            />
          到
          <el-date-picker
              style="width: 300px;margin-left: 300px"
              v-model="ruleForm.finishDate"
              type="datetime"
              placeholder="请选择开始22结束时间"
              :default-time="defaultTime"
              readonly
          />
          </el-row>
        </div>
        <el-row >

        </el-row>
      </el-form-item>
      <el-form-item label="活动内容" prop="content" class="item">
        <el-input type="textarea"
                  v-model="ruleForm.content"
                  :autosize="{ minRows: 10, maxRows: 12}"
                  style="width: 700px;"
                  :maxlength="1000"
                  show-word-limit
                  readonly
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {getRequest} from "@/Api_Axios/config";
import {ElMessage} from "element-plus";
import {dateFormat} from "@/static/js/dateFormat";
export default {
  mounted() {
    let serialNum = this.$route.params.id
    getRequest('/project/getDetailPage',{serialNum:serialNum}).then((res)=>{
      console.log(res.data)
      this.ruleForm = res.data
      this.ruleForm.startDate=dateFormat(res.data.startDate)
      this.ruleForm.finishDate=dateFormat(res.data.finishDate)
    })
  },
  data() {
    return {
      file:[],
      token:'',
      ruleForm: {
        peopleNumLeft:0,
        imageUrl: '',
        contact: '',
        email: '',
        remaining:null,
        telephone:'',
        peopleNum: null,
        type: '',
        title:'',
        date:[],
        content:'',
        startDate:'',
        finishDate:''
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.ruleForm.imageUrl = res
      console.log(res)
      console.log(file)
    },
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #87d241;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #cccccc;
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

.detail{
  background-image: linear-gradient(to right , #ee9696, #87ff7a);
}


.item /deep/ .el-form-item__label {
  color: #205177;
}
</style>

