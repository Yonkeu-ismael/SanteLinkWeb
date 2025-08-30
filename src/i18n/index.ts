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
    passwordResetSuccess: 'Votre mot de passe a été réinitialisé avec succès',
    passwordResetError: 'Erreur lors de la réinitialisation du mot de passe',
    otpRequired: 'Code OTP requis',
    otpInvalid: 'Code OTP invalide (4-6 chiffres)',
    otpIncorrect: 'Code OTP incorrect',
    otpSent: 'Code OTP envoyé avec succès',
    otpSendError: 'Erreur lors de l\'envoi du code OTP',
    sendOtp: 'Envoyer le code OTP',
    resetByEmail: 'Réinitialiser par email',
    resetByPhone: 'Réinitialiser par téléphone',
    otpCode: 'Code OTP',
    selectResetMethod: 'Choisissez votre méthode de réinitialisation',
    cancel: 'Annuler',
    resetPassword: 'Réinitialiser le mot de passe',
    newPassword: 'Nouveau mot de passe',
    resetButton: 'Réinitialiser',
    emailIncorrect: 'Email incorrect',
    passwordIncorrect: 'Mot de passe incorrect',
    emailExists: 'Cet email existe déjà',
    phoneExists: 'Ce numéro de téléphone existe déjà',
    googleSignInComing: 'Connexion Google à venir',
    appleSignInComing: 'Connexion Apple à venir',
    resettingPassword: 'Réinitialisation du mot de passe en cours...',
    missingRequiredFields: 'Tous les champs requis doivent être remplis',
    otpExpired: 'Le code OTP a expiré. Veuillez demander un nouveau code.',
    phoneNotFound: 'Ce numéro de téléphone n\'existe pas dans notre base de données.',
    requestNewOtp: 'Veuillez cliquer sur "Envoyer le code OTP" pour obtenir un nouveau code.',
    wrongDataProvided: 'Données incorrectes fournies.',
    userInfo: 'Informations utilisateur',
    notProvided: 'Non renseigné',
    loadingUserInfo: 'Chargement des informations utilisateur...',
    serverError: 'Erreur serveur. Veuillez réessayer plus tard.'
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
    passwordResetSuccess: 'Your password has been reset successfully',
    passwordResetError: 'Error resetting password',
    otpRequired: 'OTP code required',
    otpInvalid: 'Invalid OTP code (4-6 digits)',
    otpIncorrect: 'Incorrect OTP code',
    otpSent: 'OTP code sent successfully',
    otpSendError: 'Error sending OTP code',
    sendOtp: 'Send OTP code',
    resetByEmail: 'Reset by email',
    resetByPhone: 'Reset by phone',
    otpCode: 'OTP Code',
    selectResetMethod: 'Choose your reset method',
    cancel: 'Cancel',
    resetPassword: 'Reset password',
    newPassword: 'New password',
    resetButton: 'Reset',
    emailIncorrect: 'Incorrect email',
    passwordIncorrect: 'Incorrect password',
    emailExists: 'This email already exists',
    phoneExists: 'This phone number already exists',
    googleSignInComing: 'Google Sign-In coming soon',
    appleSignInComing: 'Apple Sign-In coming soon',
    resettingPassword: 'Resetting password...',
    missingRequiredFields: 'All required fields must be filled',
    otpExpired: 'The OTP code has expired. Please request a new code.',
    phoneNotFound: 'This phone number does not exist in our database.',
    requestNewOtp: 'Please click "Send OTP" to get a new code.',
    wrongDataProvided: 'Wrong data provided.',
    userInfo: 'User Information',
    notProvided: 'Not provided',
    loadingUserInfo: 'Loading user information...',
    serverError: 'Server error. Please try again later.'
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


