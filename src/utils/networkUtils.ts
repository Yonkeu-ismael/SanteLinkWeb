// Utilitaires pour la gestion réseau sur mobile
import { ElMessage } from 'element-plus'

// Détection de l'environnement mobile
export const isMobile = () => {
  return typeof (window as any).Capacitor !== 'undefined' || 
         typeof (window as any).cordova !== 'undefined' ||
         /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Détection de la connectivité réseau
export const checkNetworkStatus = async (): Promise<boolean> => {
  try {
    // Vérifier la connectivité réseau
    const response = await fetch('https://www.google.com/favicon.ico', {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache'
    });
    return true;
  } catch (error) {
    console.warn('Erreur de connectivité réseau:', error);
    return false;
  }
};

// Gestion des erreurs réseau avec messages adaptés
export const handleNetworkError = (error: any, context: string = '') => {
  console.error(`Erreur réseau ${context}:`, error);
  
  const isMobileEnv = isMobile();
  const hasNetwork = checkNetworkStatus();
  
  let message = '';
  
  if (error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
    message = isMobileEnv 
      ? 'Erreur de connexion réseau. Vérifiez votre connexion internet.'
      : 'Erreur de connexion au serveur. Vérifiez votre connexion internet.';
  } else if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    message = isMobileEnv
      ? 'Connexion lente. Veuillez réessayer.'
      : 'Délai d\'attente dépassé. Veuillez réessayer.';
  } else if (error.response?.status === 0) {
    message = 'Impossible de joindre le serveur. Vérifiez votre connexion.';
  } else {
    message = error.response?.data?.message || error.message || 'Une erreur inattendue s\'est produite.';
  }
  
  ElMessage.error(message);
  return message;
};

// Retry automatique pour les requêtes importantes
export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Attendre avant de réessayer
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
      
      console.log(`Tentative ${attempt + 1}/${maxRetries}...`);
    }
  }
  
  throw lastError;
};

// Optimisation des requêtes pour mobile
export const optimizeForMobile = (config: any) => {
  if (isMobile()) {
    return {
      ...config,
      timeout: Math.max(config.timeout || 20000, 30000), // Timeout plus long sur mobile
      headers: {
        ...config.headers,
        'User-Agent': 'SanteLink-Mobile/1.0',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    };
  }
  return config;
};
