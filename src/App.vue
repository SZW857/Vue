<template>
  <div class="index_container" :style="{'width': `${searchWidth}px`}">
    <div class="header">
      <div id="header_img">
        <img src="@/static/picture/5151.png" alt="主页图">
      </div>
      <div id="header_nav" >
        <div style="color: #67da25">
               <div v-show="!show_V">
                 <span>志愿者:{{this.TOKENS.V_TOKEN_NAME}}&emsp; <el-button type="danger" v-show="true" @click="loginOut">安全退出</el-button></span>
               </div>
               <div v-show="!show_M">
                 <span>管理员:{{this.TOKENS.M_TOKEN_NAME}}&emsp; <el-button type="danger" v-show="true" @click="loginOut_A">安全退出</el-button></span>
               </div>
        </div>
        <div>
          <el-row>
            <el-col :span="24" v-show="show"><router-link to="/login" >登录</router-link>|<router-link to="/register">注册</router-link></el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div style="font-size: 150%">
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545C64"
          text-color="#fff"
          active-text-color="#fff"
          router
      >
        <el-menu-item index="/" style="margin-left: 650px">首页</el-menu-item>
        <el-menu-item index="/Volunteering" >志愿活动</el-menu-item>
        <el-menu-item index="/honorRoll" >荣誉榜</el-menu-item>
        <el-menu-item index="/video">社区公益推广</el-menu-item>
        <el-menu-item index="/news">社区告示</el-menu-item>
        <el-menu-item index="/freeze">不动</el-menu-item>
        <el-menu-item index="/PersonalPage">志愿者个人页</el-menu-item>
        <el-menu-item index="/AdminPage">后台管理入口</el-menu-item>
      </el-menu>
    </div>


    <router-view></router-view>

    <div class="el_footer" :style="{'width': `${searchWidth}px`}" >
      <div id="el_footer_nav1">
        <h2>网站导航</h2>
        <router-link to="/">首页</router-link>|
        <router-link to="/">公益产品最新消息</router-link>|
        <router-link to="/">产品招募资源中心</router-link>|
        <router-link to="/">关于我们</router-link>|
        <router-link to="/">English</router-link>
      </div>
      <div id="el_footer_nav2">
        <h2>联系我们</h2>
        电话：029-83463902 转 123456<br/>
        电邮：751225241@qq.com<br/>
        地址：陕西省无BUG市大佬区小弟街万事诸顺中心A座1234<br/>
      </div>
      <div id="el_footer_bottom" :style="{'width': `${searchWidth}px`}">
        ©好公益平台 版权所有&emsp;&emsp;粤—北京理工大学珠海学院 技术支持：度娘所有大佬
      </div>
    </div>
  </div>
</template>
<style src="@/static/css/App.css" scoped/>
<script>
import { ref,reactive} from "vue";
export default {
  provide(){
    return{
      reload:this.reload
    }
  },
  data() {
    return {
      isRouterAlive:true,
      searchWidth: 0,
      show:true,
      show_M:true,
      show_V:true,
      TOKENS:reactive({
        V_TOKEN_NAME: ref(''),
        M_TOKEN_NAME: ref('')
      })
    }
  },
  mounted() {
    this.searchWidth = window.innerWidth; // 组件初始化的时候不会触发onresize事件，这里强制执行一次
    window.onresize = () => {
      if (!this.timer) { // 使用节流机制，降低函数被触发的频率
        this.timer = true;
        let that = this; // 匿名函数的执行环境具有全局性，为防止this丢失这里用that变量保存一下
        setTimeout(function () {
          that.searchWidth = window.innerWidth;
          that.timer = false;
        }, 400)
      }
    }
    let _this=this
    let V_TOKEN=JSON.parse(window.localStorage.getItem("VolunteerToken"))
    let M_TOKEN=JSON.parse(window.localStorage.getItem("AdminToken"));
    // console.log(V_TOKEN)
    // console.log(M_TOKEN)
    if (V_TOKEN!==null || M_TOKEN!==null){
      if (V_TOKEN!==null){
        //志愿者登录
        // console.log('志愿者'+V_TOKEN)
        _this.show=false;
        _this.show_V=false;
        _this.show_M=true;
        this.TOKENS.V_TOKEN_NAME=V_TOKEN.extra;
      }else {
        //管理员登录
        // console.log('管理员'+M_TOKEN)
        _this.show=false;
        _this.show_V=true
        _this.show_M=false;
        this.TOKENS.M_TOKEN_NAME=M_TOKEN.adminName;
      }
    }else {
      //没有token
      console.log("未检索到TOKEN,页面初始化加载完毕。")
      _this.show=true
      _this.show_M=true
      _this.show_V=true
    }
  },
  methods:{
    loginOut(){
      window.localStorage.removeItem("VolunteerToken");
      window.location.replace("/loginOut")
    },
    loginOut_A(){
      window.localStorage.removeItem("AdminToken");
      window.location.replace("/loginOut")
    },
    reload(){
      this.isRouterAlive=false
      this.$nextTick(()=>{
        this.isRouterAlive=true
      })
    }
  }
}
</script>
