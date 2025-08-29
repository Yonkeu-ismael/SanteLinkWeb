import axios from 'axios'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'

const baseURL = (import.meta as any).env?.VITE_APP_API_BASE || 'https://api.benss.dev.rancher.nebulageekinfra.com'
const api = axios.create({ baseURL, timeout: 20000 })

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) (config.headers as any) = { ...(config.headers || {}), Authorization: `Bearer ${token}` }
  return config
})

let isRefreshing = false
let pendingQueue: Array<(token: string | null) => void> = []

api.interceptors.response.use(
  (res) => res.data,
  async (err) => {
    const originalRequest = err?.config
    const status = err?.response?.status
    // Si non autorisé, essayer de rafraîchir le token
    if (status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true
      const oldToken = getToken()
      // Si un rafraîchissement est déjà en cours, attendre
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push((newToken) => {
            if (!newToken) return reject(err)
            originalRequest.headers = { ...(originalRequest.headers || {}), Authorization: `Bearer ${newToken}` }
            resolve(api(originalRequest))
          })
        })
      }

      isRefreshing = true
      try {
        // Appel direct via axios de base pour éviter l'intercepteur
        const resp = await axios.post(
          baseURL + '/api/v1/auth/refreshToken',
          { token: oldToken },
          { headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, timeout: 15000 }
        )
        const data = resp?.data || {}
        const newToken: string | undefined = data.accessToken || data.token
        if (newToken) {
          setToken(newToken)
          // rejouer la requête originale
          originalRequest.headers = { ...(originalRequest.headers || {}), Authorization: `Bearer ${newToken}` }
          // vider la queue
          pendingQueue.forEach((cb) => cb(newToken))
          pendingQueue = []
          return api(originalRequest)
        }
      } catch (_) {
        // échec du refresh: purge et redirection
      } finally {
        isRefreshing = false
      }

      pendingQueue.forEach((cb) => cb(null))
      pendingQueue = []
      removeToken()
      router.replace({ path: '/login', query: { redirect: (router.currentRoute as any).value.fullPath } })
    }
    return Promise.reject(err)
  }
)

export default api


