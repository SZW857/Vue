import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../NavigationBar/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      // {
      //   path:'/',
      //   name:'',
      //   component: ()=>import(/* webpackChunkName: "about"  */'@/')
      // }
    ]
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

  },
  {
    path: "/video",
    name: "video",
    component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/PlantfromIntroduct/Catoon.vue')
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/VolunteerProjects.vue')
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import(/* webpackChunkName: "about" */ '../NavigationBar/VolunteerProjects.vue')
  },
  {
    path: "/goods",
    name: 'goods',
    component: ()=> import(/* webpackChunkName: "about" */ '@/NavigationBar/PointsGoods.vue')
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
