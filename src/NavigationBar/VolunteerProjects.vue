<template>

  <div class="section">
    <div class="category">
      <el-backtop :bottom="60" :right="10" >
          <el-icon><Top/></el-icon>
      </el-backtop>
      <h2 style="top: 120px">服务类别:</h2>
      <div class="category_content">
      <el-radio-group v-model="radio1">
        <el-radio-button label="全部" />
        <el-radio-button label="社区服务"  />
        <el-radio-button label="支教助学" />
        <el-radio-button label="卫生健康" />
        <el-radio-button label="科技科普" />
        <el-radio-button label="文化艺术" />
        <el-radio-button label="环境卫生整治" />
        <el-radio-button label="平安综治" />
        <el-radio-button label="文明风尚" />
        <el-radio-button label="交通引导" />
        <el-radio-button label="禁毒宣传" />
        <el-radio-button label="关爱特殊群体" />
        <el-radio-button label="体育健身" />
        <el-radio-button label="疫情防控" />

      </el-radio-group>
      </div><br>

      <h2 style="top: 205px">报名范围:</h2>
      <div class="category_content">
        <el-radio-group v-model="radio2">
          <el-radio-button label="全部"/>
          <el-radio-button label="公开招募"/>
          <el-radio-button label="退役人员志愿招募"/>
        </el-radio-group>
      </div><br>

      <h2 style="top: 255px">项目状态:</h2>
      <div class="category_content">
        <el-radio-group v-model="radio4">
          <el-radio-button label="全部" />
          <el-radio-button label="待发布"  />
          <el-radio-button label="进行中" />
          <el-radio-button label="已完结" />
        </el-radio-group>
      </div><br>

      <h2 style="top: 305px">服务对象:</h2>
      <div class="category_content">
        <el-radio-group v-model="radio5">
          <el-radio-button label="全部" />
          <el-radio-button label="儿童"  />
          <el-radio-button label="妇女" />
          <el-radio-button label="老年人" />
          <el-radio-button label="残障人士" />
          <el-radio-button label="优抚对象" />
          <el-radio-button label="贫困家庭" />
          <el-radio-button label="特殊群体" />
          <el-radio-button label="病患者" />
          <el-radio-button label="农村居民" />
          <el-radio-button label="城镇居民" />
          <el-radio-button label="社会公众" />
          <el-radio-button label="其他" />
        </el-radio-group>
      </div><br>

      <h2 style="top: 390px">项目人数:</h2>
      <div class="category_content">
        <el-radio-group v-model="radio3">
          <el-radio-button label="全部" />
          <el-radio-button label="1~10"  />
          <el-radio-button label="10~20" />
          <el-radio-button label="20~30" />
          <el-radio-button label="30~40" />
          <el-radio-button label="40~50" />
          <el-radio-button label="50以上" />
        </el-radio-group>
      </div><br>


        <div style="background-color: #f7d0ef;height: 32px">
              <el-form :model="form" label-width="600px" >

                <div style="position: absolute;">
                  <span class="demonstration">项目起止日期&nbsp;</span>
                  <el-date-picker
                      v-model="value1"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </div>
                  <el-form-item label="活动名称" >
                    <el-input v-model="form.name" style="width: 200px"></el-input>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="">重置</el-button>
                  </el-form-item>
              </el-form>
          </div>
        </div>
      <div style="height: 800px;background-color: #42b983"><router-view/></div>

  </div>
</template>
<script  setup scoped>
 import { ref } from 'vue'
 import { reactive } from 'vue'
 const radio1 = ref('全部')
 const radio2 = ref('全部')
 const radio3 = ref('全部')
 const radio4 = ref('全部')
 const radio5 = ref('全部')

 const form = reactive({
   name: '',
   date1: '',
   date2: '',



 })

 const onSubmit = () => {
   console.log('submit!')
 }
</script>    //单选框脚本
<script>
export default {
  data() {
    return {
      shortcuts: [
        {
          text: '最近一周',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          },
        },
        {
          text: '最近一个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          },
        },
        {
          text: '最近三个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          },
        },
      ],
      value1: [
        new Date(2000, 10, 10, 10, 10),
        new Date(2000, 10, 11, 10, 10),
      ],
      value2: '',
    }
  },
}
</script> //时间选择器的脚本

<style src="@/static/css/VolunteerProjects.css" scoped/>

