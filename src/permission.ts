import router from '@/router'
import store from '@/store'

const whiteList = ['/login']

router.beforeEach(async (to, _from, next) => {
  const hasToken = !!(store.state as any).user?.token
  if (hasToken) {
    if (to.path === '/login') return next('/')
    if (!(store.state as any).user?.userInfo) {
      try { await (store as any).dispatch('user/getUserInfo') } catch {}
    }
    return next()
  }
  if (whiteList.includes(to.path)) return next()
  next(`/login?redirect=${to.fullPath}`)
})


