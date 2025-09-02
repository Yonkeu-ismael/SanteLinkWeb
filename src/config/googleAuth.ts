// Configuration Google Identity Services
export const GOOGLE_AUTH_CONFIG = {
  // Client ID Google OAuth (à configurer dans Google Cloud Console)
  // Client ID Google OAuth (configuré dans Google Cloud Console)
  CLIENT_ID: '690991186870-og7ng80atf4v2rgfjmvdibtjb94r71pi.apps.googleusercontent.com',
  
  // Scopes d'autorisation (pour Google Identity Services)
  SCOPES: [
    'openid',
    'profile',
    'email'
  ],
  
  // URL de l'API Google (pour récupérer les infos utilisateur si nécessaire)
  USER_INFO_URL: 'https://www.googleapis.com/oauth2/v2/userinfo'
}

// Vérifier si on est sur mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window as any).Capacitor?.isNative
}

// Obtenir la configuration appropriée
export const getOAuthConfig = () => {
  return GOOGLE_AUTH_CONFIG
}

// Instructions de configuration :
// 1. Remplacez le CLIENT_ID ci-dessus par votre vrai Client ID Google
// 2. Obtenez-le sur https://console.cloud.google.com/apis/credentials
// 3. Ajoutez http://localhost:5001 aux origines JavaScript autorisées
