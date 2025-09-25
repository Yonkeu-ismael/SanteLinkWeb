const TOKEN_KEY = 'AUTH_TOKEN'
const USER_INFO_KEY = 'USER_INFO'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t)
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem(USER_INFO_KEY)
    return userInfo ? JSON.parse(userInfo) : null
  } catch (error) {
    console.error('Erreur lors de la récupération des informations utilisateur:', error)
    return null
  }
}

export const setUserInfo = (userInfo: any) => {
  try {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des informations utilisateur:', error)
  }
}

export const removeUserInfo = () => {
  localStorage.removeItem(USER_INFO_KEY)
}


