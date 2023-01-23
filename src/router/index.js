import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../NavigationBar/Index/HomeView.vue'


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
      component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/Login/Login.vue')
    },
    {
      path: "/register",
      name: "register",
      component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/Register/Register.vue')
    },
    {
      path: "/guide",
      name: "guide",
      component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/Advocacy/用户手册.vue'),
    },
    {
      path: '/forgetPwd_p',
      name:'forgetPwd_p',
      component: ()=> import(/* webpackChunkName: "forgetPwd" */ '@/components/PersonalForgetPwd/ForgotPwdTemplate.vue')
    },
    {
      path: '/forgetPwd_a',
      name:'forgetPwd_a',
      component: ()=> import(/* webpackChunkName: "forgetPwd" */ '@/components/AdminForgetPwd/ForgotPwdTemplateAdmin.vue')
    },
    {
      path: "/video",
      name: "video",
      component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/Advocacy/propaganda.vue')
    },
    {
      path: "/Volunteering",
      name: "Volunteering",
      component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/Volunteering/Volunteering.vue')
    },
    {
      path: "/freeze",
      name: "freeze",
      component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/test.vue')
    },
    {
      path: "/news",
      name: "news",
      component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/News/CommunityNews.vue'),
    },
    {
      path: "/PersonalPage",
      name: 'PersonalPage',
      component: ()=> import(/* webpackChunkName: "about" */ '@/components/PersonalPage/PersonalPage.vue'),
      children: [
        {
          path: '/cPasswd_p',
          name:'cPasswd_p',
          component: () => import(/* webpackChunkName: "about" */ '@/components/PersonalPage/PersonalInformation/changePasswd.vue'),
        },
        {
          path: '/cInfo_p',
          name:'cInfo_p',
          component: () => import(/* webpackChunkName: "about" */ '@/components/PersonalPage/PersonalInformation/changeInfo.vue'),
          children: [
            {
              path:"/cTelephone",
              name:'/cTelephone',
              component: () => import(/* webpackChunkName: "about" */ '@/components/PersonalPage/PersonalInformation/changTelephone/cTelephone.vue'),
            },
            {
              path:"/cEmail",
              name:'/cEmail',
              component: () => import(/* webpackChunkName: "about" */ "@/components/PersonalPage/PersonalInformation/changeEmail/cEmail.vue"),
            }
          ]
        },
      ]
    },
    {
      path: "/Login_A",
      name: 'Login_A',
      component: ()=> import(/* webpackChunkName: "about" */ '@/NavigationBar/AdminEntrance/loginA.vue'),
    },
    {
      path: '/AdminPage',
      name: 'AdminPage',
      component: ()=> import(/* webpackChunkName: "about" */ '@/components/AdminPage/AdminPage.vue'),
      children:[
        {
              path: '/cPasswd_a',//*
              name:'cPasswd_a',
              component: ()=> import(/* webpackChunkName: "about" */ '@/components/AdminPage/AdminInformation/changePasswd.vue'),
        },
        {
              path: '/cInfo_a',//*
              name:'cInfo_a',
              component: ()=> import(/* webpackChunkName: "about" */ '@/components/AdminPage/AdminInformation/changInfo.vue'),
              children: [
                {
                  path:"/cTelephone_a",
                  name:'/cTelephone',
                  component: () => import(/* webpackChunkName: "about" */ '@/components/AdminPage/AdminInformation/changTelephone/cTelephone.vue'),
                },
                {
                  path:"/cEmail_a",
                  name:'/cEmail',
                  component: () => import(/* webpackChunkName: "about" */ "@/components/AdminPage/AdminInformation/changeEmail/cEmail.vue"),
                }
              ]
            },
            {
              path: '/PublishNews',//*
              name: 'PublishNews',
              component: ()=> import(/* webpackChunkName: "about" */ '@/components/AdminPage/CommunityInfomation/PublishNews.vue'),
            },
            {
              path: '/RegisterVerify',//*
              name: 'RegisterVerify',
              component: ()=> import(/* webpackChunkName: "about" */ '@/components/AdminPage/ActivitySituation/RegisterVerify.vue'),
            },
          ]
        },
    {
      path: "/honorRoll",
      name: 'honorRoll',
      component: ()=> import(/* webpackChunkName: "about" */ '@/NavigationBar/HonorRoll/HonorRoll.vue')
    },
    {
      path: "/loginOut",
      name: 'loginOut',
      component: ()=> import(/* webpackChunkName: "about" */ '@/NavigationBar/Login/LoginOut.vue')
    },
  ]
})


// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
    //不进行权限控制
  if (to.path==='/'||to.path==='/login'||to.path==='/register'||
      to.path==="/freeze"||to.path==='/forgetPwd_p'||to.path==='/loginOut'||
      to.path==='/guide'||to.path==='/Volunteering'||to.path==='/news'||
      to.path==='/admin'||to.path==='/PublishNews'||to.path==='/RegisterVerify'||
      to.path==='/honorRoll'||
      //管理员部分
      to.path==='/login_A'||to.path==='/forgetPwd_a'){
    return next()
  }else {
    //进行拦截
    if (to.path==='/PersonalPage'||to.path==="/cPasswd_p"||to.path==="/cInfo_p"||
        to.path==='/cTelephone'||to.path==='/cEmail'){
      if(localStorage.getItem('VolunteerToken') === null) {
        next('/login')
      }else {
        next()
      }
      //管理员部分
    }else if (to.path==='/AdminPage'||to.path==='/PublishNews'||to.path==='/RegisterVerify'||
              to.path==='/RegisterVerify'||to.path==='/cPasswd_a'||to.path==='/cInfo_a'||
              to.path==='/cEmail_a'||to.path==='/cTelephone_a'){
      if(localStorage.getItem('AdminToken') === null) {
        next('/login_A')
      }else {
        next()
      }
    }else {
      alert("访问权限不够或访问路径不存在！！将返回首页")
      next('/')
    }
  }
})



export default router;
