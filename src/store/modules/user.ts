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
  getters: {
    isAuthenticated: (state) => !!state.token,
    userInfo: (state) => state.userInfo,
    userName: (state) => {
      if (state.userInfo) {
        return `${state.userInfo.firstName || ''} ${state.userInfo.lastName || ''}`.trim() || state.userInfo.email || 'Utilisateur'
      }
      return 'Utilisateur'
    },
    userEmail: (state) => state.userInfo?.email || '',
    userPhone: (state) => state.userInfo?.phoneNumber || '',
    userRoles: (state) => state.roles || []
  },
  actions: {
        async login({ commit }, payload) {
      // payload peut être { email, password } ou { phoneNumber, password }
      try {
        console.log('Login API call with payload:', payload)
        console.log('Login API URL:', 'https://api.santelink.dev.rancher.nebulageekinfra.com/api/v1/auth/authenticate')
        const data: any = await api.post('/api/v1/auth/authenticate', payload)
        console.log('Login API response:', data)
        // L'API retourne { accessToken, refreshToken, expiresIn }
        if (data.accessToken) {
          commit('SET_TOKEN', data.accessToken)
          
          // Essayer de récupérer les informations de l'utilisateur
          try {
            // Si l'API retourne des informations utilisateur dans la réponse de connexion
            if (data.user) {
              commit('SET_USER_INFO', data.user)
            } else if (data.phoneNumber) {
              // Si on a le numéro de téléphone dans la réponse, récupérer les infos complètes
              const userInfo = await api.get(`/api/v1/user/user-by-phone?phoneNumber=${data.phoneNumber}`)
              commit('SET_USER_INFO', userInfo)
            } else if (payload.phoneNumber) {
              // Si on a le numéro de téléphone dans le payload de connexion, l'utiliser
              const userInfo = await api.get(`/api/v1/user/user-by-phone?phoneNumber=${payload.phoneNumber}`)
              commit('SET_USER_INFO', userInfo)
            } else {
              // Si on n'a ni user ni phoneNumber, on ne peut pas récupérer les infos
              console.warn('No user info or phone number available')
            }
          } catch (userError) {
            console.warn('Could not fetch user info after login:', userError)
            // Ne pas échouer la connexion si on ne peut pas récupérer les infos utilisateur
          }
          
          return true
        }
        console.log('No accessToken in response, login failed')
        return false
      } catch (error) {
        console.error('Login API error:', error)
        console.error('Login API error response:', error?.response)
        console.error('Login API error data:', error?.response?.data)
        console.error('Login API error status:', error?.response?.status)
        console.error('Login API error message:', error?.message)
        throw error
      }
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
    async getUserInfo({ commit, state }) {
      try {
        // Si on a déjà les infos utilisateur avec le téléphone, utiliser directement
        if (state.userInfo?.phoneNumber) {
          const data = await api.get(`/api/v1/user/user-by-phone?phoneNumber=${state.userInfo.phoneNumber}`)
          commit('SET_USER_INFO', data)
          return data
        }
        // Sinon, on ne peut pas récupérer les infos sans téléphone
        throw new Error('Phone number not available')
      } catch (error) {
        console.error('Get user info error:', error)
        throw error
      }
    },
    async getUserByPhone({ commit }, phoneNumber) {
      try {
        console.log('Getting user by phone:', phoneNumber)
        const data: any = await api.get(`/api/v1/user/user-by-phone?phoneNumber=${phoneNumber}`)
        console.log('User by phone response:', data)
        commit('SET_USER_INFO', data)
        return data
      } catch (error) {
        console.error('Get user by phone error:', error)
        throw error
      }
    },
    async fetchUserInfo({ commit, state }) {
      try {
        // Si on a déjà les infos utilisateur avec le téléphone, utiliser directement
        if (state.userInfo?.phoneNumber) {
          const data = await api.get(`/api/v1/user/user-by-phone?phoneNumber=${state.userInfo.phoneNumber}`)
          commit('SET_USER_INFO', data)
          return data
        }
        
        // Si on n'a pas le téléphone, on ne peut pas récupérer les infos
        console.warn('No phone number available to fetch user info')
        throw new Error('Phone number not available')
      } catch (error) {
        console.error('Fetch user info error:', error)
        throw error
      }
    },
    async logout({ commit }) {
      // Déconnexion locale immédiate pour une meilleure UX
      commit('CLEAR_TOKEN')
      
      // Appel API en arrière-plan (non-bloquant)
      try { 
        const logoutPayload = {
          logTimestamp: 0 // Doit être à 0 selon l'API
        }
        console.log('Logout API call with payload:', logoutPayload)
        
        // Utiliser un timeout plus court pour éviter les attentes longues
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Logout timeout')), 5000)
        )
        
        await Promise.race([
          api.post('/api/v1/auth/logout', logoutPayload),
          timeoutPromise
        ])
        
        console.log('Logout API call completed successfully')
      } catch (error) {
        console.error('Logout API error:', error)
        console.error('Logout API error response:', error?.response)
        console.error('Logout API error data:', error?.response?.data)
        console.error('Logout API error status:', error?.response?.status)
        
        // Si c'est une erreur 500 ou un timeout, c'est un problème côté serveur
        if (error?.response?.status === 500 || error?.message === 'Logout timeout') {
          console.warn('Server error or timeout during logout, but local logout completed')
        }
        // La déconnexion locale est déjà effectuée, donc pas d'impact sur l'utilisateur
      }
    },
    async resetPassword({ commit }, payload) {
      try {
        console.log('Calling reset password API with payload:', payload)
        const data: any = await api.post('/api/v1/user/reset-password', payload)
        console.log('Reset password API response:', data)
        return data
      } catch (error) {
        console.error('Reset password API error:', error)
        throw error
      }
    },
    async resetPasswordByEmail({ commit }, payload) {
      try {
        console.log('Calling reset password by email API with payload:', payload)
        const data: any = await api.post('/api/v1/user/reset-password-by-email', payload)
        console.log('Reset password by email API response:', data)
        return data
      } catch (error) {
        console.error('Reset password by email API error:', error)
        throw error
      }
    },
    async sendOtpEmail({ commit }, payload) {
      const data: any = await api.post('/api/v1/auth/otp-code/send-otp-email', payload)
      return data
    },
    async sendOtpPhone({ commit }, payload) {
      try {
        console.log('Calling send OTP phone API with payload:', payload)
        // Utiliser l'endpoint POST avec le phoneNumber dans l'URL
        const data: any = await api.post(`/api/v1/user/reset-code/${payload.phoneNumber}`)
        console.log('Send OTP phone API response:', data)
        return data
      } catch (error) {
        console.error('Send OTP phone API error:', error)
        throw error
      }
    },
    async verifyOtp({ commit }, payload) {
      try {
        console.log('Calling verify OTP API with payload:', payload)
        const data: any = await api.post('/api/v1/auth/otp-code/verify-otp', payload)
        console.log('Verify OTP API response:', data)
        return data
      } catch (error) {
        console.error('Verify OTP API error:', error)
        throw error
      }
    },
    async verifyEmailOtp({ commit }, payload) {
      try {
        console.log('Calling verify email OTP API with payload:', payload)
        const data: any = await api.post('/api/v1/auth/otp-code/verify-email-otp', payload)
        console.log('Verify email OTP API response:', data)
        return data
      } catch (error) {
        console.error('Verify email OTP API error:', error)
        throw error
      }
    }
  }
}
export default user


