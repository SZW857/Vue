<template xmlns:el-row="http://www.w3.org/1999/xhtml">
  <div class="detail">
    <el-row style="text-align: start">
      <el-link type="primary" :underline="false"
               :href="path"
               style="font-size: 20px" >
        <el-icon size="large"><DArrowLeft  />
      </el-icon>返回</el-link></el-row>
    <el-form :model="ruleForm"  label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title" style="width: 730px" class="item">
        <el-input v-model="ruleForm.title " readonly></el-input>
      </el-form-item>
      <el-form-item label="发起人" prop="userId" style="width: 500px" class="item">
        <el-input v-model="ruleForm.userId " readonly></el-input>
      </el-form-item>

      <el-form-item label="发起人邮箱" label-width="100" prop="email" style="width: 500px;" class="item">
        <el-input v-model="ruleForm.email" readonly ></el-input>
      </el-form-item>

      <span style="position: absolute">
         <el-form-item label-width="110" label="发起人联系电话" prop="telephone" style="width: 500px;margin-left: 50px" class="item">
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
      <el-form-item label="剩余名额" prop="remaining" STYLE="width: 500px;margin-left: 50px" class="item">
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


            <el-date-picker
                style="width: 200px;position: absolute;margin-left: 0px"
                v-model="ruleForm.startDate"
                type="datetime"
                placeholder="请选择开始结束时间"
                :default-time="defaultTime"
                readonly
            />
            <el-date-picker
                style="width: 200px;margin-left: 200px;"
                v-model="ruleForm.finishDate"
                type="datetime"
                placeholder="请选择开始22结束时间"
                :default-time="defaultTime"
                readonly
            />


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
    let tmp = window.localStorage.getItem('AdminToken')
    if (tmp===null){
      this.path='/'
      ElMessage.warning("令牌失效")
      setTimeout(function (){
        location.reload();
      },1500)
    }else {
      this.params.token = JSON.parse(tmp).data
      this.path='/verifyHelpInformation'
    }

    this.params.helpNum = this.$route.params.id
 // alert(this.params.helpNum)
    getRequest('/help/getHelpInfoDetail',this.params).then((res)=>{
      console.log(res.data.data)
      this.ruleForm = res.data.data[0]
      // this.ruleForm.startDate=res.data.startDate
      // this.ruleForm.finishDate=res.data.finishDate
    })
  },
  data() {
    return {
      path:'',
      file:[],
      token:'',
      ruleForm: {
        imageUrl: '',
        contact: '',
        email: '',
        remaining:null,
        telephone:'',
        peopleNum: null,
        type: '',
        title:'',
        date:[
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10),
        ],
        content:'',
        startDate:'',
        finishDate:''
      },
      params:{
        token: "",
        helpNum: ""
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.ruleForm.imageUrl = res.data.data.imageUrl
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

