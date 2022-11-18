<template>
<div>
  <el-backtop :bottom="60" :right="10" ><el-icon><Top/></el-icon></el-backtop>
 <CarouselChart/>
 <BoxContainer/>
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
import CarouselChart from '@/components/Index/CarouselChart.vue'
import BoxContainer from '@/components/Index/BoxContainer.vue'
export default {
  components: {
    CarouselChart,
    BoxContainer,
  }
}
</script>