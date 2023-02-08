<template>
  <div class="container">
    <div class="new_title"></div>
    <div class="new_item">荣誉榜
      <el-row justify="end" class="getMore"><el-link href="/honorRoll">查看更多>>></el-link></el-row>
    </div>
    <div class="new-list">
      <el-col :span="8">
        <a href="/honorRoll"><img src="@/static/picture/NO1.png"/></a>
        <div>{{this.NO1}}</div>
      </el-col>
      <el-col :span="8">
        <a href="/honorRoll"><img src="@/static/picture/NO2.png"/> </a>
        <div>{{this.NO2}}</div>
      </el-col>
      <el-col :span="8">
        <a href="/honorRoll"><img src="@/static/picture/NO3.png"/> </a>
        <div>{{this.NO3}}</div>
      </el-col>
    </div>
  </div>
  <div class="container">
    <div class="new_item">注册人数</div>
    <div style="background-color: #ffffff;margin-top: 90px;font-size: 45px;">当前已经有:<span style="color:#d92727;">{{ this.allUsersNum }}<el-icon><plus/></el-icon></span>人报名了</div>
  </div>
</template>


<style scoped>

.container{
  width: 1200px;
  height:270px ;
  margin-left: 120px;
  background-color: #fdfcfd;

}
.new_item{
  color: #b81c25;
  font-size: 30px;
  font-weight: bold;
  width: 1200px;
  height: 64px;
  background-color: #f3f0f0;
  text-align: left;
}


.new-list {
  font-size: 16px;
  color: #666;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.new-list1{
  margin-left: 100px;
}
.getMore:hover image{
  font-size: 15px;
  color: #545c64;
  position: relative;


}
.el-image:hover {
  transform: scale(1.25);
}
.el-image{
  width: 30%;
  height: 30%;
  object-fit:cover;
  transition:all .5s;
}
</style>


<script>
import {getRequest} from "@/Api_Axios/config";
import {ElMessage} from "element-plus";
export default {
  mounted() {
    let _this = this
    getRequest("/index/getAllUsers").then(function (res){
      console.log(res.data)
      if (res.data.length>0){
        _this.allUsersNum = res.data.length
      }
    })
    getRequest("/rankVolunteers").then((res)=>{
      if (res.data!==null){
        console.log(res.data);
        this.NO1 = res.data[0].userId
        this.NO2 = res.data[1].userId
        this.NO3 = res.data[2].userId
      }
    })

  },

  data(){
    return{
      allUsersNum:null,
      NO1:'',
      NO2:'',
      NO3:''
    }
  }
}
</script>
