<template>
    <div style="background-color: #258686;bottom: 400px;">
      <div style="background-color: #ffffff;">
        <el-row :gutter="1">
          <el-col :span="8"><div class="grid-content"><img src="@/static/picture/icon-banner-bottom-1.png"/><p style="margin-left: 80px;">促进针对真实社会需求的公益产品的规模化</p></div></el-col>
          <el-col :span="8"><div class="grid-content"><img src="@/static/picture/icon-banner-bottom-2.png"/><p style="margin-left: 80px;">加快志愿服务事业满足当今发展形式要求</p></div></el-col>
          <el-col :span="8"><div class="grid-content"><img src="@/static/picture/icon-banner-bottom-1.png"/><p style="margin-left: 80px;">实现志愿者服务自动化、系统化、信息化的管理模式</p></div></el-col>
        </el-row>
      </div>
    </div>
  <div class="container">
    <div class="new_title"></div>
    <div class="new_item">社区要闻</div>
    <div class="new-list">
      <a herf="" class="new-list" > <div class="img-box"><img src="@/static/picture/icon-banner-bottom-1.png"/><p class="ml">聚焦乡村和城镇流动儿童阅读品质提升，好公益平台主题媒体沙龙在北京举行</p> </div> </a>
      <a herf="" class="new-list1"> <div class="img-box"><img src="@/static/picture/icon-banner-bottom-2.png"/><p class="ml">聚焦乡村和城镇流动儿童阅读品质提升，好公益平台主题媒体沙龙在北京举行</p> </div> </a>
      <a herf="" class="new-list1"> <div class="img-box"><img src="@/static/picture/icon-banner-bottom-3.png"/><p class="ml">聚焦乡村和城镇流动儿童阅读品质提升，好公益平台主题媒体沙龙在北京举行</p> </div> </a>
      <a herf="" class="new-list1"> <div class="img-box"><img src="@/static/picture/icon-banner-bottom-3.png"/><p class="ml">聚焦乡村和城镇流动儿童阅读品质提升，好公益平台主题媒体沙龙在北京举行</p> </div> </a>
    </div>
  </div>
  <div class="container">
    <div class="new_item">招募信息</div>
  </div>
</template>
<script>
export default {
  name: "BoxContainer"
}
</script>

<style scoped>
el-row {
 width: 1200px;
  margin-left: 400px;

}

el-col {
  border-radius: 4px;
  margin-left: 100px;

}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-left: 120px;
  background-color: #fcfcfc;
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
  height:270px ;
  margin-left: 120px;
  background-color: #8720a4;

}
.new_item{
  color: #b81c25;
  font-size: 30px;
  font-weight: bold;
  width: 1200px;
  height: 64px;
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
.new-list1{
  margin-left: 100px;
}
</style>