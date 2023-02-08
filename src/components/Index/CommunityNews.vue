<template>
    <div style="background-color: #258686;bottom: 400px;">
      <div style="background-color: #ffffff;">
        <el-row :gutter="1">
          <el-col :span="8"><div class="grid-content"><img src="@/static/picture/icon-banner-bottom-1.png"/><p style="margin-left: 80px;">促进针对真实社区公益服务管理需求的公益产品的规模化</p></div></el-col>
          <el-col :span="8"><div class="grid-content"><img src="@/static/picture/icon-banner-bottom-2.png"/><p style="margin-left: 80px;">加快志愿服务事业满足当今发展形式要求</p></div></el-col>
          <el-col :span="8"><div class="grid-content"><img src="@/static/picture/icon-banner-bottom-1.png"/><p style="margin-left: 80px;">实现志愿者服务自动化、系统化、信息化的管理模式</p></div></el-col>
        </el-row>
      </div>
    </div>
  <div class="container">

    <div class="new_item">最新资讯<el-row justify="end" class="getMore"><el-link href="/news">查看更多>>></el-link></el-row>
    <div class="new-list">

      <el-collapse accordion style="width: 1490px;">
        <el-collapse-item v-for="news in recently">
          <template #title>
            <span id="newsTitle"> {{news.title}}</span>
            <p style="text-align: end;color: #d23243">News!</p>
          </template>
            <div id="Content">
              <el-divider content-position="left">【编号】:{{news.newsId}}&emsp;&emsp;内容:</el-divider>
              &emsp;&emsp;{{news.content}}
            </div>
          <div id="newsFooter">
            <el-divider content-position="center">结尾</el-divider>
            <el-row justify="center">【类型】:{{news.type}}</el-row>
            <el-row justify="center">【发布时间】:{{dateFormat(news.createTime,'yyyy-MM-dd hh:mm:ss')}}</el-row>
          </div>
        </el-collapse-item>

      </el-collapse>

    </div>
    </div>
  </div>

</template>
<script >
import {getRequest} from "@/Api_Axios/config";
import {dateFormat} from "@/static/js/dateFormat";
export default {
  mounted: function () {
    let _this = this
      getRequest("/admin/getNewsInfo").then((res)=>{
        _this.tmp = res.data.reverse()//排序最新消息
        for (let i = 0; i < 3; i++) {
          _this.recently[i] = _this.tmp[i]
        }
        console.log(_this.recently)
      })
  },
  setup(){
    return{
      dateFormat
    }
  },
  data(){
    return{
      recently:[],
      tmp:[],
      activeNames: ['1'],
    }
  },

}

</script>

<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-left: 120px;
  background-color: #ffffff;
  height: 154px;

}
p{
  width: 210px;
  height: 42px;
  text-align: center;
  margin-left: 13px;
}

.container{
  width: 1200px;
  height:auto ;
  margin-left: 120px;
  background-color: #ffffff;

}

.new_item{
  color: #b81c25;
  font-size: 30px;
  font-weight: bold;
  width: 1200px;
  height: autopx;
  background-color: #f8f7f7;
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


#newsTitle{
   color: #0c0c0c;
   font-style: italic;
   font-weight: bold;
   font-size: 19px;
   text-align: left;
 }
#Content{
  font-size: 16px;
  text-align: left;
}
#newsFooter{
  position: relative;
  color: #2e85f6;
  font-size: 13px;
}

#newsTitle:hover{
  color: #d23243;
}
el-row{
  color: #ffc126;
}

</style>