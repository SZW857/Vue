<template>
    <div style="background-color: #f4f6f5;height:140px">
    <el-row :gutter="0">
      <el-col :span="6"><div class="grid-content"><img src="@/static/picture/icon-banner-bottom-1.png"/><p>促进针对真实社会需求的公益产品的规模化</p></div></el-col>
      <el-col :span="6"><div class="grid-content"><img src="@/static/picture/icon-banner-bottom-2.png"/><p>促进针对真实社会需求的公益产品的规模化</p></div></el-col>
      <el-col :span="6"><div class="grid-content"><img src="@/static/picture/icon-banner-bottom-3.png"/><p>促进针对真实社会需求的公益产品的规模化</p></div></el-col>
    </el-row>
    </div>
</template>



<script>
export default {
  name: "BoxContainer"
}
</script>

<style scoped>
el-row {
  margin-bottom: 10px;
  margin-left: 100px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  margin-left: 70px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-left: 120px;
  background-color: #f4f6f5;
}
p{
  width: 210px;
  height: 42px;
  text-align: center;
}
</style>