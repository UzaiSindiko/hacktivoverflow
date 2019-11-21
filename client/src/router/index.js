import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Overflow from '../views/Overflow.vue'
import CreateQueston from '../views/CreateQuestion.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter(to, from, next){
      if(localStorage.getItem('token')) next()
      else next('/login')
    }
  },
  {
    path: '/myaccount',
    name: 'myaccount',
    component: () => import(/* webpackChunkName: "myaccount" */ '../views/MyAccount.vue'),
    beforeEnter(to, from, next){
      if(localStorage.getItem('token')) next()
      else next('/login')
    },
    children:[
      {
      path: 'myquestion',
      name: 'myquestion',
      component: () => import(/* webpackChunkName: "myquestion" */ '../components/MyQuestion.vue'),
      },
      {
        path: 'myanswer',
        name: 'myanswer',
        component: () => import(/* webpackChunkName: "myanswer" */ '../components/MyAnswer.vue'),
      }
    ]
  },
  {
    path: '/overflow',
    name: 'overflow',
    component: Overflow,
    beforeEnter(to, from, next){
      if(localStorage.getItem('token')) next()
      else next('/login')
    }
  },
  {
    path: '/createquestion',
    name: 'createquestion',
    component: CreateQueston,
    beforeEnter(to, from, next){
      if(localStorage.getItem('token')) next()
      else next('/login')
    }
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import(/* webpackChunkName: "tags" */ '../views/Tags.vue'),
    beforeEnter(to, from, next){
      if(localStorage.getItem('token')) next()
      else next('/login')
    },
  },
  {
    path: '/:id/tag',
    name: 'tag',
    component: () => import(/* webpackChunkName: "tag" */ '../views/TagDetail.vue'),
    beforeEnter(to, from, next){
      if(localStorage.getItem('token')) next()
      else next('/login')
    },
  },
  {
    path: '/:id/qna',
    name: 'qna',
    component: () => import(/* webpackChunkName: "qnada" */ '../views/QandA.vue'),
    beforeEnter(to, from, next){
      if(localStorage.getItem('token')) next()
      else next('/login')
    }
  },
  {
    path: '/:id/editq',
    name: 'editq',
    component: () => import(/* webpackChunkName: "editq" */ '../views/EditQuestion.vue'),
    beforeEnter(to, from, next){
      if(localStorage.getItem('token')) next()
      else next('/login')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter(to, from, next){
      if(!localStorage.getItem('token')) next()
      else next('/')
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
