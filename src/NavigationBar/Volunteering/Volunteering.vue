<!--<template>-->
<!--  <div v-loading="isOpen"-->
<!--       element-loading-text="拼命加载中..."-->
<!--       element-loading-background="rgba(191, 191, 191, 0.5)"-->
<!--  >-->
<!--    <el-table-->
<!--        :data="tableData"-->
<!--        style="width: 100%" border-->
<!--    >-->
<!--      <el-table-column label="活动编号" prop="serialNum" sortable sort-by="descending"/>-->
<!--      <el-table-column label="活动名称" prop="title"> </el-table-column>-->
<!--      <el-table-column label="宣传海报" prop="imageUrl" align="center">-->
<!--        <template #default="scope">-->
<!--          <el-image  style="width: 140px; height: 130px" :src="scope.row.imageUrl" alt="" :fit="fill" ></el-image>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="活动类型" prop="type"> </el-table-column>-->
<!--      <el-table-column label="活动开始时间" prop="startDate"> </el-table-column>-->
<!--      <el-table-column label="招募人数" prop="peopleNum"> </el-table-column>-->
<!--      <el-table-column label="联系人" prop="contact"> </el-table-column>-->
<!--      <el-table-column label="联系电话" prop="telephone"> </el-table-column>-->
<!--      <el-table-column align="right">-->
<!--        <template #header>-->
<!--          <el-input v-model="search" size="mini" placeholder="输入活动名称" @change="fuck " />-->
<!--        </template>-->
<!--        <template #default="scope">-->
<!--          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">参加</el-button>-->
<!--          <el-button size="small" type="success" @click="jump(scope.row)">详情</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--    <el-row justify="space-around"> <el-pagination  @current-change="pageNum" large background layout="prev, pager, next" :page-size="pageSize" :total="totalNum" class="mt-4"/></el-row>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import {getRequest} from "@/Api_Axios/config";-->
<!--import {ElMessage} from "element-plus";-->
<!--import {reactive} from "vue";-->
<!--import {dateFormat} from '@/static/js/dateFormat.js'-->
<!--import router from "@/router";-->
<!--export default {-->
<!--  mounted() {-->
<!--    getRequest('/project/getProjectInformation/1/'+this.pageSize).then((res)=>{//从第一页开始，每页五个-->
<!--      let _this = this-->
<!--      if (res.data!=null||res.data!==''){-->
<!--        setTimeout(function (){-->
<!--          this.isOpen=false-->
<!--        },2000)-->
<!--        for (let i = 0; i < res.data.data.length; i++) {-->
<!--          res.data.data[i].startDate=dateFormat(res.data.data[i].startDate)-->
<!--          res.data.data[i].finishDate=dateFormat(res.data.data[i].finishDate)}-->
<!--        this.tableData = res.data.data-->
<!--        this.totalNum = res.data.total-->
<!--        getRequest('/project/getProjectInformation/1/'+res.data.total).then((res)=>{-->
<!--          for (let i = 0; i < res.data.data.length; i++) {-->
<!--            res.data.data[i].startDate=dateFormat(res.data.data[i].startDate)-->
<!--            res.data.data[i].finishDate=dateFormat(res.data.data[i].finishDate)}-->
<!--          this.tableDataAll=res.data.data-->
<!--          setTimeout(function (){-->
<!--            _this.isOpen=false-->
<!--          },2000)-->
<!--        })-->
<!--      }else {-->
<!--        setTimeout(function (){-->

<!--          router.replace("/")-->
<!--          _this.isOpen=false-->
<!--        },2000)-->
<!--        ElMessage.error("服务器请求失败")-->
<!--      }-->
<!--    })-->
<!--  },-->
<!--  data(){-->
<!--    return{-->
<!--      isOpen: true,-->
<!--      pageSize:5,-->
<!--      currentPage:1,-->
<!--      totalNum: 5,-->
<!--      tableData:reactive([]),-->
<!--      tableDataAll:reactive([-->
<!--        {-->
<!--          serialNum: '2016-05-03',-->
<!--          title: '马冬梅',-->
<!--          imageUrl: 'https://pic3.zhimg.com/v2-c6ae9c3aff36b9b221258f6a90577902_r.jpg',-->
<!--          type: '扶贫助残',-->
<!--          startDate: '2023-1-16 12：56',-->
<!--          peopleNum: 30,-->
<!--          contact: '张三',-->
<!--          telephone: '15389085001',-->
<!--        },-->
<!--      ]),-->
<!--      search:'',-->
<!--      filter:[]-->
<!--    }-->
<!--  },-->
<!--  watch:{-->
<!--    search:function (v1){-->
<!--      if (v1!==''){-->
<!--        this.fuck(v1)-->
<!--      }else {-->
<!--        window.location.reload()-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods:{-->
<!--    pageNum(x){-->
<!--      getRequest('/project/getProjectInformation/'+x+'/'+this.pageSize).then((res)=> {//从第一页开始，每页五个-->
<!--        this.tableData=res.data.data-->
<!--        console.log("***************点解返回的结果************************")-->
<!--        console.log(this.tableData)-->
<!--      })-->
<!--    },-->
<!--    handleEdit(index,row){-->
<!--      console.log(index, row)-->
<!--    },-->
<!--    jump(row){-->
<!--      let id=row.serialNum-->
<!--      router.push({-->
<!--        path: `/ProjectInformation/${id}`-->
<!--      })-->
<!--    },-->
<!--    fuck(){-->
<!--      let _this = this-->
<!--      _this.fliter = _this.tableDataAll.filter(data => !_this.search || data.title.toLowerCase().includes(_this.search.toLowerCase()));-->
<!--      this.tableData=_this.fliter-->
<!--      console.log(this.tableData)-->
<!--    },-->

<!--  }-->
<!--}-->
<!--</script>-->



<template>
  志愿者活动页面
</template>