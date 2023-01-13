import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../NavigationBar/HomeView.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes :[
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
      component: ()=> import(/* webpackChunkName: "forgetPwd" */ '@/components/ForgetPwd/ForgotPwdTemplate.vue')
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
          path: '/cPasswd_a',//*
          name:'cPasswd_a',
          component: ()=> import(/* webpackChunkName: "about" */ '@/components/adminPage/changePasswd.vue'),
        },
        {
          path: '/cInfo_a',//*
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
      path: "/loginOut",
      name: 'error',
      component: ()=> import(/* webpackChunkName: "about" */ '@/NavigationBar/LoginOut.vue')
    },
    {
      path: "/personal",//拦截
      name: 'personal',
      component: ()=> import(/* webpackChunkName: "about" */ '@/components/personalPage/personal.vue')
    }
  ]
})


// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
    //判断当前路由是否需要进行权限控制
  if (to.path==='/login'||to.path==='/'||to.path==='/register'||to.path==='/guide'||to.path==='/forgetPwd'||to.path===''){
    return next()
  }else {
    if(localStorage.getItem('VolunteerToken') === null) {
      alert("访问出错!!!")
      next({path:'/'})
    }
  }
})


export default router;
