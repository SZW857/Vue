<template>
  <el-backtop :bottom="60" :right="10" ><el-icon><Top/></el-icon></el-backtop>
  <el-card class="el-card-d" shadow="always">
    <div class="infinite-list-wrapper" style="overflow:auto;">
      <h3 style="text-align: start">当前评论的人数:&emsp;{{peopleNum}}人</h3>
      <el-timeline
          infinite-scroll-disabled="disabled">
        <div v-if="allMessages.length>0">
          <el-timeline-item style="text-align: left" v-for="(item,index) in allMessages"  :key="index" :timestamp='item.createTime' placement="top">
            <el-card class="el-card-m" style="height:auto">
              <h4 style="margin-top: -10px" v-if="item.memberName!==null">
                {{item.memberName}}&nbsp;:
                <el-row justify="end">
                  <el-link v-if="isMyself===item.memberName"  :underline="false" type="primary" @click="delRemark(item.remarkNum)">
                    删除</el-link>
                </el-row>
              </h4>
              <h4 style="margin-top: -10px" v-else>
                {{item.adminName}}(管理员)&nbsp;:
                <el-row justify="end">
                  <el-link v-if="isMyself===item.adminName"  :underline="false" type="primary" @click="delRemark(item.remarkNum)">
                    删除</el-link>
                </el-row>
              </h4>
              <div @click="aaa(item)">&nbsp;&emsp;{{item.content}}</div><br/>

              <div class="demo-collapse">
                <el-collapse accordion>
                  <el-collapse-item title="点击查看回复内容" @click="Specific(item.remarkNum)">

                    <div v-for="item1 in allChildrenMessage">
                      <H4>
                        <el-row justify="start" v-if="item1.userId!==null">{{item1.speaker}}@{{item1.userId}}:</el-row>
                        <el-row justify="start" v-else>{{item1.speaker}}@{{item.adminName}}:</el-row>
                      </H4>
                      <el-row justify="end">
                        <el-link v-if="item1.speaker===isMyself"  :underline="false" type="primary" @click="delRemarkChildren(item1.replyNum,item.remarkNum)">
                          删除
                        </el-link>
                        <!--                        <el-link v-else-if="isMyself===item.adminName"  :underline="false" type="primary" @click="delRemarkChildren(item.adminName)">-->
                        <!--                          删除-->
                        <!--                        </el-link>-->
                      </el-row>
                      <div >
                        &nbsp;&emsp;
                        {{item1.content}}
                      </div>
                      <el-divider/>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-card>
          </el-timeline-item>

          <!--          <el-card class="el-card-m" v-if="allMessages.length>0">-->
          <!--            <div style="color:#c41111;">{{speaker+'@'+item.memberName+':'}}</div>-->
          <!--            <div>{{content}}</div>-->
          <!--          </el-card>-->


          <el-dialog title="回复评论" v-model="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rule" ref="ruleForm">
              <el-form-item :label="ruleForm.speaker +'@'+ commenter +':'" :label-width="formLabelWidth" prop="content">
                <el-input v-model="ruleForm.content"
                          show-word-limit
                          type="textarea"
                          :autosize="{ minRows: 5, maxRows: 6}"
                          :maxlength="200"
                          placeholder="输入回复内容:">
                </el-input>
              </el-form-item>
            </el-form>
            <template #footer>
                  <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="reply('ruleForm')">确 定</el-button>
                  </span>
            </template>
          </el-dialog>
        </div>
        <div v-else>
          <el-timeline-item placement="top">
            <el-card class="el-card-m" style="height:120px">
              <h4>坏叔叔：</h4>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 说点什么...😁</p>
            </el-card>
          </el-timeline-item>
        </div>
      </el-timeline>
    </div>
    <el-affix position="bottom" :offset="120">
      <div class="el-card-messages" >
        <el-input type="textarea"
                  :rows="5"
                  placeholder="输入留言"
                  maxlength="200"
                  v-model="content"
                  :maxlength="210"
                  show-word-limit
                  style="background-color: #66eK  a19"
        ></el-input>
        <el-button type="info" round class="submit-message" @click="submitMessage">留言</el-button>
      </div>
    </el-affix>
  </el-card>
</template>

<script>
import {ElMessage} from "element-plus";
import {getRequest, postRequest} from "@/Api_Axios/config";
import {dateFormat} from "@/static/js/dateFormat";

export default {
  mounted() {
    let tmp = window.localStorage.getItem("VolunteerToken");
    let tmp1 = window.localStorage.getItem("AdminToken");
    let _this = this
    if (tmp!==null){
      _this.isMyself = JSON.parse(tmp).extra
      _this.ruleForm.speaker = JSON.parse(tmp).extra
      _this.params.token = JSON.parse(tmp).data
      _this.ruleForm.token = JSON.parse(tmp).data
      _this.params.userId = JSON.parse(tmp).extra
    }else if (tmp1!==null){
      _this.isMyself = JSON.parse(tmp1).adminName
      _this.ruleForm.speaker = JSON.parse(tmp1).adminName
      _this.params.token = JSON.parse(tmp1).data
      _this.ruleForm.token = JSON.parse(tmp1).data
      _this.params.adminName = JSON.parse(tmp1).adminName
    }
    //加载父级评论
    getRequest('/remark/getParentContent').then(function (res){
      _this.peopleNum = res.data.length
      // console.log(res.data);
      _this.allMessages = res.data
      for (let i = 0; i < res.data.length; i++) {
        _this.allMessages[i].memberName = res.data[i].userId
        _this.allMessages[i].adminName = res.data[i].adminName
        _this.allMessages[i].createTime = dateFormat(res.data[i].createTime)
      }
      _this.allMessages.reverse()
    })
    //加载子级评论
    // getRequest('/reply/getChildrenContent').then(function (res){
    //   _this.allChildrenMessage = res.data
    // //  console.log(res.data)
    //   for (let i = 0; i < res.data.length; i++) {
    //     _this.allChildrenMessage[i].memberName = res.data[i].userId
    //     _this.allChildrenMessage[i].adminName = res.data[i].adminName
    //     _this.allChildrenMessage[i].createTime = dateFormat(res.data[i].createTime)
    //   }
    //   _this.allChildrenMessage.reverse()
    // })
  },
  data() {
    return {
      params:{
        content: '',
        userId: "",
        adminName: '',
        token: "",
      },
      content: '',
      peopleNum:'',
      dialogFormVisible: false,
      commenter: '',
      isMyself:'',
      ruleForm: {
        content: '',
        remarkNum:null,
        speaker: '',
        adminName: '',
        userId: '',
        token:''
      },
      rule:{
        content:[{ required:true ,message:'内容不能为空!!!',trigger: 'change'}]
      },
      formLabelWidth: '120px',
      allMessages:[
        {createTime:'2021-10-06 12:25',memberName:'szw',adminName:'',content:"王八蛋s暑假始的" +
              "结合实际时代精神的绝就开杀机会就会是大傻逼大傻逼说过的话是的hi是干啥的吧hi是是书店还" +
              "是都是高档货说过的话是给但还是的故事和第三个烧烤火锅但是客户给别的客户是上的不过说不定还是吧"},
      ],
      allChildrenMessage:[],
    };
  },
  methods: {
    submitMessage() {
      if (this.isMyself===''){
        this.$message('请先登录~😉');
        return false;
      }else if (this.content === '' || this.content.replace(/(^\s*)|(\s*$)/g, "") === "") {
        this.$message('写点啥提交也行呀😉');
        return false;
      }else {
        //准备参数
        let _this = this
        _this.params.content = this.content
        //  这里往下写调用后端的代码；
        postRequest('/remark/allPeople',_this.params).then(function (res){
          if (res.data.status==="success"){
            ElMessage.success("评论成功")
            getRequest('/remark/getParentContent').then(function (res){
              _this.peopleNum = res.data.length
              // console.log(res.data);
              _this.allMessages = res.data
              for (let i = 0; i < res.data.length; i++) {
                _this.allMessages[i].memberName = res.data[i].userId
                _this.allMessages[i].adminName = res.data[i].adminName
                _this.allMessages[i].createTime = dateFormat(res.data[i].createTime)
              }
              _this.allMessages.reverse()
            })
            // console.log(res)
          }else {
            ElMessage.error("令牌过期,即将返回首页")
          }
        })
        this.content = ''//再次初始化输入框的内容
      }
    },
    delRemark(Names){
      let _this = this
      let token = this.ruleForm.token
      let remarkNum = Names
      postRequest("/remark/delParentComments",{token:token,remarkNum:remarkNum}).then(function (res){

        if (res.data.status==='success'){
          //删除父子评论
          // console.log(res.data)
          ElMessage.success(res.data.data)
          getRequest('/remark/getParentContent').then(function (res){
            _this.peopleNum = res.data.length
            // console.log(res.data);
            _this.allMessages = res.data
            for (let i = 0; i < res.data.length; i++) {
              _this.allMessages[i].memberName = res.data[i].userId
              _this.allMessages[i].adminName = res.data[i].adminName
              _this.allMessages[i].createTime = dateFormat(res.data[i].createTime)
            }
            _this.allMessages.reverse()
          })
        }else {
          ElMessage.warning(res.data.data)
        }
      })
    },
    delRemarkChildren(NAMES,remarkNum){
      //准备数据
      let _this = this
      let token = this.ruleForm.token
      let replyNum = NAMES
      postRequest('/reply/delChildrenContent',{token:token,replyNum: replyNum}).then(function (res){
        if (res.data.status === 'success') {
          ElMessage.success('删除子评论成功')
          // setTimeout(function (){
          //  window.location.reload();
          // },2000)
          _this.Specific(remarkNum)
        }
      })

    },
    aaa(item){
      let item1 = window.localStorage.getItem("VolunteerToken");
      let item2 = window.localStorage.getItem('AdminToken');
      if (item1!==null||item2!==null){
        this.user = item.memberName
        this.dialogFormVisible=true
        this.ruleForm.content = '请输入评论内容'
        if (item.memberName!==null){
          this.ruleForm.adminName=null
          this.commenter = item.memberName
          this.ruleForm.userId = item.memberName
          this.ruleForm.remarkNum = item.remarkNum
        }else {
          this.ruleForm.userId=null
          this.commenter = item.adminName
          this.ruleForm.adminName = item.adminName
          this.ruleForm.remarkNum = item.remarkNum
        }
      }else {
        ElMessage.warning("请先登录,登录后方可评论!!!")
      }







    },
    reply(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this = this
          // console.log(this.ruleForm)
          this.dialogFormVisible = false
          postRequest("/reply/replyContent",_this.ruleForm).then(function (res){
            if(res.data.status ==='success'){
              ElMessage.success("回复评论成功")
              _this.Specific(_this.ruleForm.remarkNum)
            }else {
              ElMessage.warning("回复评论失败")
            }
          })
        } else {
          this.dialogFormVisible = false
          console.log('error submit!!')
          return false
        }
      })
    },
    Specific(x){
      let remarkNum = x
      let _this = this
      getRequest('/reply/getSpecificContent',{remarkNum:remarkNum}).then(function (res){
        _this.allChildrenMessage = res.data
        console.log(res.data);
      })
    }

  },

}
</script>

<style scoped>
.infinite-list-wrapper{
  width: 100%;

}
.submit-message{
  width: 100%;
  background: rgb(235, 245, 247);
  color: cadetblue;
  letter-spacing:20px;
}
</style>