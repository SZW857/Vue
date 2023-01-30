<template>
    <div class="infinite-list-wrapper" style="overflow: auto"
         v-loading="isOpen"
         element-loading-text="拼命加载中..."
         element-loading-background="rgba(191, 191, 191, 0.5)"
         :element-loading-svg="Loading"
    >
      <ul
          v-infinite-scroll="load"
          class="list"
          :infinite-scroll-disabled="disabled"
      >
          <el-collapse>
            <div>
            <div  v-for="(news,index) in info">
              <div id="newsTitle">{{news.title}}</div>
                <el-collapse-item :name="index" >
                    <div id="newsContent">
                      <el-divider content-position="left">【编号】:{{news.newsId}}&emsp;&emsp;内容:</el-divider>
                       {{news.content}}
                    </div>
                  <div id="newsFooter">
                    <el-divider content-position="center">结尾</el-divider>
                    <el-row justify="center">【类型】:{{news.type}}</el-row>
                    <el-row justify="center">【发布时间】:{{formatDate(news.createTime,'yyyy-MM-dd hh:mm:ss')}}</el-row>
                 </div>
                </el-collapse-item>
             </div>
            </div>
          </el-collapse>
      </ul>
      <p v-if="loading">Loading...</p>
      <p v-if="noMore">已经到底了~</p>
    </div>
</template>

<script setup >

import {computed, ref, onMounted, reactive} from 'vue'
import formatDate from '@/static/js/DateFormart.js'
import { getRequest} from "@/Api_Axios/config";

const count = ref(50)

const loading = ref(false)

const noMore = computed(() => count.value >= 20)

const disabled = computed(() => loading.value || noMore.value)

let isOpen = ref(true)

const load = () => {
  loading.value = true
  setTimeout(() => {
    count.value += 2
    loading.value = false
  }, 2000)
}
let info=ref('')
onMounted(()=>{
  getRequest("/admin/getNewsInfo").then((res)=>{
    info.value=res.data.reverse()//排序最新消息
    setTimeout(function (){
      isOpen.value=false
    },2000)
    console.log(res.data)
  })
})
</script>

<style>
#newsTitle{
  color: #0c0c0c;
  font-style: italic;
  font-weight: bold;
  font-size: 24px;
  text-align: left;
}
#newsContent{
  font-size: 17px;
  text-align: left;
  white-space:pre-line;
}
#newsFooter{
  position: relative;
  color: #2e85f6;
  font-size: 13px;
}
#newsTitle1{
  color: #497dbe;
  font-style: italic;
  font-weight: bold;

  text-align: left;
  position: relative;
  margin-top: 20px;
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