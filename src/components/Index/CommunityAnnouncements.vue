<template>
  <div class="container">
    <div class="new_title"></div>
    <div class="new_item">荣誉榜
      <span class="getMore"><el-link href="/honorRoll">查看更多>>></el-link></span>
    </div>
    <div class="new-list">
    <a href="/honorRoll"><el-image src="https://ts1.cn.mm.bing.net/th?id=OIP-C.O1CyeKs-ES3CZTfWbTjA2gHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2"
               /> </a>
    </div>
  </div>
  <div class="container">
    <div class="new_item">注册人数</div>
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
  margin-left: 1000px;

}
.el-image:hover {
  transform: scale(1.25);
}
.el-image{
  width: 50%;
  height: 50%;
  object-fit:cover;
  transition:all .5s;
}
</style>


<script>
export default {
  name: "CommunityAnnouncements"
}
</script>
