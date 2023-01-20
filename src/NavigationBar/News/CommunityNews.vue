<template>
    <div class="infinite-list-wrapper" style="overflow: auto">
      <ul
          v-infinite-scroll="load"
          class="list"
          :infinite-scroll-disabled="disabled"
      >
          <el-collapse>
            <div  id="newsTitle" v-for="news in info" >
              {{news.title}}
              <el-collapse-item :name="index" >
                <div>
                  <div>{{news.content}}</div>
                  <el-row justify="space-between">【类型】:{{news.type}}</el-row>
                  <el-row justify="space-between">【发布时间】:{{formatDate(news.createTime,'yyyy-MM-dd hh:mm:ss')}}</el-row>
                </div>
              </el-collapse-item>
            </div>
          </el-collapse>
      </ul>
      <p v-if="loading">Loading...</p>
      <p v-if="noMore">已经到底了~</p>
    </div>
</template>

<script setup >

import {computed, ref, onMounted} from 'vue'
import formatDate from '@/static/js/DateFormart.js'
import { getRequest} from "@/Api_Axios/config";

const count = ref(50)

const loading = ref(false)

const noMore = computed(() => count.value >= 20)

const disabled = computed(() => loading.value || noMore.value)

const load = () => {
  loading.value = true
  setTimeout(() => {
    count.value += 2
    loading.value = false
  }, 2000)
}
let info=ref(11)
onMounted(()=>{
  getRequest("/admin/getNewsInfo").then((res)=>{
    info.value=res.data.reverse()
    console.log(res.data)
  })
})
</script>

<style>
#newsTitle{
  color: #0c0c0c;
  font-style: italic;
  font-weight: bold;
  font-size: 20px;
  text-align: left;
}
#newsTitle:hover{
  color: #d23243;
}
el-row{
color: #ffc126;
}
.infinite-list-wrapper {
  height: 500px;
  text-align: center;
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
</style>