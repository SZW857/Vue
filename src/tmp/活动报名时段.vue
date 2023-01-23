<template>
  <div class="demo-date-picker">
    <el-date-picker
        v-model="value1"
        type="datetimerange"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        :default-time="defaultTime1"
        format="YYYY-MM-DD HH:mm:00"
        value-format="YYYY-MM-DD HH:mm:00"
    />
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
const defaultTime1 = new Date(2000, 1, 1, 8, 0, 0) // '12:00:00'
const value1 = ref('')

</script>