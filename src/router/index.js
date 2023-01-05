import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../NavigationBar/HomeView.vue'
import defaultProps from "ant-design-vue/lib/vc-slick/default-props";
import axios from "axios";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/Login.vue')
  },
  {
    path: "/register",
    name: "register",
    component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/Register.vue')
  },
  {
    path: "/guide",
    name: "guide",
    component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/UsageGuide.vue'),
  },

  {
    path: '/forgetPwd',
    name:'forgetPwd',
    component: ()=> import(/* webpackChunkName: "forgetPwd" */ '@/components/ForgetPwd/ForgotPwdTemplate.vue'),
    children: [
      {
        path:'/finish',
        name:'finish',
        component: ()=> import(/* webpackChunkName: "forgetPwd" */ '@/components/ForgetPwd/Finish.vue'),
      },
    ]
  },
  {
    path: "/video",
    name: "video",
    component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/PlantfromIntroduct.vue')
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/VolunteerProjects.vue')
  },
  {
    path: "/freeze",
    name: "freeze",
    component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/test.vue')
  },
  {
    path: "/news",
    name: "news",
    component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/CommunityNews.vue'),

  },
  {
    path: "/goods",
    name: 'goods',
    component: ()=> import(/* webpackChunkName: "about" */ '@/NavigationBar/PointsGoods.vue'),
    children: [
      {
        path: '/cPasswd_p',
        name:'cPasswd_p',
        component: () => import(/* webpackChunkName: "about" */ '@/components/personalPage/changePasswd.vue'),
      },
      {
        path: '/cInfo_p',
        name:'cInfo_p',
        component: () => import(/* webpackChunkName: "about" */ '@/components/personalPage/changeInfo.vue'),
      }]
  },
  {
    path: "/admin",
    name: 'admin',
    component: ()=> import(/* webpackChunkName: "about" */ '@/NavigationBar/Admin.vue'),
    children: [
        {
          path: '/cPasswd_a',
          name:'cPasswd_a',
          component: ()=> import(/* webpackChunkName: "about" */ '@/components/adminPage/changePasswd.vue'),
        },
      {
        path: '/cInfo_a',
        name:'cInfo_a',
        component: ()=> import(/* webpackChunkName: "about" */ '@/components/adminPage/changInfo.vue'),
      }
    ]
  },
  {
    path: "/honor",
    name: 'honor',
    component: ()=> import(/* webpackChunkName: "about" */ '@/NavigationBar/HonorRoll.vue')
  },
  {
    path: "/error",
    name: 'error',
    component: ()=> import(/* webpackChunkName: "about" */ '@/NavigationBar/error.vue')
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  if (to.path.startsWith('/login')){
    window.localStorage.removeItem('usernames')
    next()
  }else {
    let admin=JSON.parse(window.localStorage.getItem("usernames"))
    if (!admin){
      next({path:'/login'})
    }else {
      axios({
        url:'http://127.0.0.1:8083/hello',
        method:'get',
        headers:{
          token:admin.token
        }
      }).then((resp)=>{
        if (!resp.data){
          console.log('校验失败')
          next({path:"/error"})
        }
      })
      next()
    }
  }
})

export default router
