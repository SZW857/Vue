<template>
<div>
  <el-backtop :bottom="60"><el-icon><ArrowUpBold /></el-icon></el-backtop>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="排名" width="180" />
      <el-table-column prop="name" label="用户名" width="180" />
      <el-table-column prop="address" label="签到次数" />
    </el-table>


</div>
</template>


<script lang="ts" setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
<style scoped>

</style>