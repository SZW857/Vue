<template>
<el-form-item label="活动报名截至日期" required >
<div class="demo-date-picker">
  <el-date-picker
      v-model="value3"
      type="datetime"
      placeholder="Select date and time"
      :default-time="defaultTime"
      format="YYYY-MM-DD HH:mm:00"
      value-format="YYYY-MM-DD HH:mm:00"
  />
</div>
</el-form-item>
</template>
<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
const value3 = ref('')
onMounted(()=>{
  console.log(value3.value)
})
</script>