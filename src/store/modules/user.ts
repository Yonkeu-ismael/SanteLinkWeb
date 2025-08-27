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
      const data = await api.post('/auth/login', payload)
      commit('SET_TOKEN', data.token)
      return true
    },
    async getUserInfo({ commit }) {
      const me = await api.get('/users/me')
      commit('SET_USER_INFO', me)
    },
    async logout({ commit }) { commit('CLEAR_TOKEN') }
  }
}
export default user


