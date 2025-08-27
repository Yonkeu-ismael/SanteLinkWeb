const TOKEN_KEY = 'AUTH_TOKEN'
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t)
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)


