import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/404.vue')
    }
  ]
})

export default router
