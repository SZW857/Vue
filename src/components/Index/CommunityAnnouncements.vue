<template>
  <div class="container">
    <div class="new_title"></div>
    <div class="new_item">荣誉榜</div>
    <div class="new-list">
      <a herf="" class="new-list" > <div class="img-box"><img src="@/static/picture/icon-banner-bottom-1.png"/><p class="ml">聚焦乡村和城镇流动儿童阅读品质提升，好公益平台主题媒体沙龙在北京举行</p> </div> </a>
      <a herf="" class="new-list1"> <div class="img-box"><img src="@/static/picture/icon-banner-bottom-2.png"/><p class="ml">聚焦乡村和城镇流动儿童阅读品质提升，好公益平台主题媒体沙龙在北京举行</p> </div> </a>
      <a herf="" class="new-list1"> <div class="img-box"><img src="@/static/picture/icon-banner-bottom-3.png"/><p class="ml">聚焦乡村和城镇流动儿童阅读品质提升，好公益平台主题媒体沙龙在北京举行</p> </div> </a>
      <a herf="" class="new-list1"> <div class="img-box"><img src="@/static/picture/icon-banner-bottom-3.png"/><p class="ml">聚焦乡村和城镇流动儿童阅读品质提升，好公益平台主题媒体沙龙在北京举行</p> </div> </a>
    </div>
  </div>
  <div class="container">
    <div class="new_item">积分商品</div>
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
</style>


<script>
export default {
  name: "CommunityAnnouncements"
}
</script>
