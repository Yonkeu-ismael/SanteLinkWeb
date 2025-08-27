import { ref, computed, App } from 'vue'

export type Lang = 'fr' | 'en'

const defaultLang = (localStorage.getItem('lang') as Lang) || 'fr'
const langRef = ref<Lang>(defaultLang)

const messages = {
  fr: {
    title: 'Se connecter',
    email: 'Adresse E-mail',
    password: 'Mot de passe',
    login: 'Connexion',
    forgot: 'Mot de passe oublié ?',
    welcome: 'Bienvenue sur SantéLink',
    badCreds: 'Erreur de connexion, identifiants incorrects',
    error: 'Erreur de connexion, veuillez réessayer',
    emailRequired: 'Adresse e-mail requise',
    emailInvalid: 'Format e-mail invalide',
    passwordRequired: 'Mot de passe requis',
    passwordMin: 'Minimum 6 caractères'
  },
  en: {
    title: 'Sign in',
    email: 'Email address',
    password: 'Password',
    login: 'Login',
    forgot: 'Forgot password?',
    welcome: 'Welcome to SantéLink',
    badCreds: 'Login failed, wrong credentials',
    error: 'Login error, please try again',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email format',
    passwordRequired: 'Password is required',
    passwordMin: 'Minimum 6 characters'
  }
} as const

export const t = (key: keyof typeof messages['fr']) => {
  return messages[langRef.value][key]
}

export const currentLang = computed(() => langRef.value)

export const setLang = (lng: Lang) => {
  langRef.value = lng
  localStorage.setItem('lang', lng)
  document.documentElement.setAttribute('lang', lng)
}

export const i18nPlugin = {
  install(app: App) {
    // expose as global property
    app.config.globalProperties.$t = t
  }
}

// initialize document lang on import
document.documentElement.setAttribute('lang', defaultLang)

export default i18nPlugin


