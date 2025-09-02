import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/auth'
import Login from '@/views/login/Login.vue'
import Welcome from '@/views/welcome/Welcome.vue'
// import SignUp from '@/views/register/SignUp.vue'

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/', 
    name: 'Welcome', 
    component: Welcome, 
    meta: { public: true } 
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: Login, 
    meta: { public: true } 
  },
  { 
    path: '/register', 
    name: 'SignUp', 
    component: () => import('@/views/register/Register.vue'), 
    meta: { public: true } 
  },
  { 
    path: '/signup', 
    name: 'SignUpAlt', 
    component: () => import('@/views/register/SignUp.vue'), 
    meta: { public: true } 
  },
  { 
    path: '/register/verify', 
    name: 'VerifyOTP', 
    component: () => import('@/views/register/VerifyOTP.vue'), 
    meta: { public: true } 
  },
  { 
    path: '/register/complete', 
    name: 'Register', 
    component: () => import('@/views/register/Register.vue'), 
    meta: { public: true } 
  },

  { 
    path: '/auth/callback', 
    name: 'OAuthCallback', 
    component: () => import('@/views/auth/OAuthCallback.vue'), 
    meta: { public: true } 
  },

  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: () => import('@/views/dashboard/index.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard temporairement désactivé pour tester
// router.beforeEach((to, from, next) => {
//   console.log('Navigation guard - to:', to.path, 'from:', from.path, 'meta:', to.meta)
//   
//   // Temporairement désactiver la vérification d'authentification pour les routes publiques
//   if (to.meta.public) {
//     console.log('Public route - allowing access')
//     next()
//     return
//   }
//   
//   const isAuthenticated = !!getToken()
//   console.log('Is authenticated:', isAuthenticated)
//   
//   // Si la route nécessite une authentification
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     console.log('Redirecting to login - requires auth')
//     next('/login')
//     return
//   }
//   
//   // Si l'utilisateur est connecté et essaie d'accéder à login, rediriger vers dashboard
//   if (to.path === '/login' && isAuthenticated) {
//     console.log('Redirecting to dashboard - already authenticated')
//     next('/dashboard')
//     return
//   }
//   
//   console.log('Allowing navigation to:', to.path)
//   next()
// })

export default router


