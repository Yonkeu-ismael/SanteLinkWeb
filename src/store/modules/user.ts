import { Module } from 'vuex'
import api from '@/utils/axiosReq'
import { getToken, setToken, removeToken } from '@/utils/auth'

type UserState = { token: string | null; userInfo: any | null; roles: string[] }

const user: Module<UserState, any> = {
  namespaced: true,
  state: () => ({ token: getToken(), userInfo: null, roles: [] }),
  mutations: {
    SET_TOKEN(s, t: string) { s.token = t; setToken(t) },
    CLEAR_TOKEN(s) { s.token = null; removeToken() },
    SET_USER_INFO(s, u) { s.userInfo = u; s.roles = u?.roles || [] }
  },
  actions: {
    async login({ commit }, payload) {
      // payload peut être { email, password } ou { phoneNumber, password }
      const data: any = await api.post('/api/v1/auth/authenticate', payload)
      // L'API retourne { accessToken, refreshToken, expiresIn }
      if (data.accessToken) {
        commit('SET_TOKEN', data.accessToken)
        return true
      }
      return false
    },
    async register({ commit, dispatch }, payload) {
      const data: any = await api.post('/api/v1/auth/register', payload)
      // Si l'API renvoie déjà un token
      if (data?.accessToken) {
        commit('SET_TOKEN', data.accessToken)
        return true
      }
      // Sinon, on authentifie avec l'email et le mot de passe fournis
      if (payload?.email && payload?.password) {
        const ok = await (dispatch as any)('login', { email: payload.email, password: payload.password })
        return ok
      }
      return false
    },
    async getUserInfo({ commit }) {
      const me = await api.get('/users/me')
      commit('SET_USER_INFO', me)
    },
    async logout({ commit }) {
      try { await api.post('/api/v1/auth/logout', {}) } catch {}
      commit('CLEAR_TOKEN')
    }
  }
}
export default user


