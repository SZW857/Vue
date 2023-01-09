<template>
<div>
  <el-backtop :bottom="60">
    <el-icon><ArrowUpBold /></el-icon>
  </el-backtop>

  <el-table :data="tableData" stripe style="width: 100%;">
    <el-table-column prop="title" label="title" />
    <el-table-column prop="date" label="Date" width="180" />

  </el-table>

  <div><el-pagination background layout="prev, pager, next" :total="1000" /></div>


</div>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: '2016-05-03',

    title: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',

    title: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',

    title: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',

    title: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style scoped>

</style>