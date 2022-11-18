<template>

    <el-carousel trigger="click" height="500px">
      <el-carousel-item v-for="item in Carousel1" :key="item.url">
        <el-image :src="item.url" width="100%" height="100%"/>
      </el-carousel-item>
    </el-carousel>


</template>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<script scoped>
  export default {
    data(){
      return{
        Carousel1:[
          {url:require("@/static/picture/01.jpeg")},
          {url:require("@/static/picture/3.png")},
          {url:require("@/static/picture/03.png")},
          {url:require("@/static/picture/04.jpg")},
          {url:require("@/static/picture/05.jpg")},
          {url:require("@/static/picture/1.jpg")},
        ]
      }
    }
  }
</script>