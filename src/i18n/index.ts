import { ref, computed, App } from 'vue'

export type Lang = 'fr' | 'en'

const defaultLang = (localStorage.getItem('lang') as Lang) || 'fr'
const langRef = ref<Lang>(defaultLang)

const messages = {
  fr: {
    dashboardTitle: 'Tableau de bord',
    logout: 'Se déconnecter',
    title: 'Se connecter',
    registerTitle: 'Créer un compte',
    username: 'Nom d\'utilisateur',
    emailOrUsername: 'Email ou Nom d\'utilisateur',
    email: 'Adresse E-mail',
    password: 'Mot de passe',
    firstName: 'Prénom',
    lastName: 'Nom',
    phoneNumber: 'Téléphone',
    age: 'Âge',
    confirmPassword: 'Confirmer le mot de passe',
    login: 'Connexion',
    register: 'S\'inscrire',
    noAccount: "Vous n'avez pas de compte ?",
    forgot: 'Mot de passe oublié ?',
    welcome: 'Bienvenue sur SanteLink',
    badCreds: 'Erreur de connexion, identifiants incorrects',
    error: 'Erreur de connexion, veuillez réessayer',
    emailRequired: 'Adresse e-mail requise',
    emailInvalid: 'Format e-mail invalide',
    passwordRequired: 'Mot de passe requis',
    passwordMin: 'Minimum 6 caractères',
    firstNameRequired: 'Prénom requis',
    lastNameRequired: 'Nom requis',
    phoneRequired: 'Téléphone requis',
    ageRequired: 'Âge requis',
    ageInvalid: 'Âge invalide',
    confirmPasswordRequired: 'Confirmation du mot de passe requise',
    passwordsNotMatch: 'Les mots de passe ne correspondent pas',
    SignGoogle: 'Se connecter avec Google',
    SignApple: 'Se connecter avec Apple'
  },
  en: {
    dashboardTitle: 'Dashboard',
    logout: 'Logout',
    title: 'Sign in',
    registerTitle: 'Create account',
    username: 'Username',
    emailOrUsername: 'Email or Username',
    email: 'Email address',
    password: 'Password',
    firstName: 'First name',
    lastName: 'Last name',
    phoneNumber: 'Phone number',
    age: 'Age',
    confirmPassword: 'Confirm password',
    login: 'Login',
    register: 'Register',
    noAccount: "Don't have an account?",
    forgot: 'Forgot password?',
    welcome: 'Welcome to SanteLink',
    badCreds: 'Login failed, wrong credentials',
    error: 'Login error, please try again',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email format',
    passwordRequired: 'Password is required',
    passwordMin: 'Minimum 6 characters',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    phoneRequired: 'Phone number is required',
    ageRequired: 'Age is required',
    ageInvalid: 'Invalid age',
    confirmPasswordRequired: 'Password confirmation required',
    passwordsNotMatch: 'Passwords do not match',
    SignGoogle: 'Sign in with Google',
    SignApple: 'Sign in with Apple'
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


