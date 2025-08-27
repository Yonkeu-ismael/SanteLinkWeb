import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import router from '@/router'

const api = axios.create({ baseURL: import.meta.env.VITE_APP_API_BASE, timeout: 20000 })

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) (config.headers as any) = { ...(config.headers || {}), Authorization: `Bearer ${token}` }
  return config
})

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err?.response?.status === 401) {
      removeToken()
      router.replace({ path: '/login', query: { redirect: (router.currentRoute as any).value.fullPath } })
    }
    return Promise.reject(err)
  }
)

export default api


