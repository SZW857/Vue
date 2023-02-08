<template>
<div>
  <el-backtop :bottom="60" :right="10" ><el-icon><Top/></el-icon></el-backtop>
 <CarouselChart/>
  <CommunityNews/>
 <CommunityAnnouncements/>

</div>
</template>

<style lang="less" scoped>
.el-menu-item {
  font-size: 16px;
  color: #ffffff;
  transition: none !important;
}
</style>
<script>
import CarouselChart from '@/components/Index/CarouselChart.vue' //轮播图
import CommunityNews from '@/components/Index/CommunityNews.vue' //社区要闻
import CommunityAnnouncements from '@/components/Index/CommunityAnnouncements.vue'
export default {
  components: {
    CarouselChart,
    CommunityNews,
    CommunityAnnouncements,
  }
}
</script>