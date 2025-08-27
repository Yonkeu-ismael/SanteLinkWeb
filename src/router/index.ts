import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/login/Login.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/login', name: 'Login', component: Login, meta: { public: true } },
  { path: '/', name: 'Home', component: () => import('@/views/dashboard/index.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


