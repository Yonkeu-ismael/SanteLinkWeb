// Configuration API pour différents environnements
interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
  retryAttempts: number;
  retryDelay: number;
}

// Détection de l'environnement
const isMobile = () => {
  // Détection Capacitor/Cordova
  return typeof (window as any).Capacitor !== 'undefined' || 
         typeof (window as any).cordova !== 'undefined' ||
         /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

// Configuration par défaut
const defaultConfig: ApiConfig = {
  baseURL: 'https://api.santelink.dev.rancher.nebulageekinfra.com',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  retryAttempts: 3,
  retryDelay: 1000
};

// Configuration pour mobile
const mobileConfig: ApiConfig = {
  baseURL: 'https://api.santelink.dev.rancher.nebulageekinfra.com',
  timeout: 30000, // Timeout plus long pour mobile
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'SanteLink-Mobile/1.0',
    'X-Platform': 'mobile',
    'X-App-Version': '1.0.0'
  },
  retryAttempts: 5, // Plus de tentatives pour mobile
  retryDelay: 2000
};

// Configuration pour développement
const devConfig: ApiConfig = {
  baseURL: 'https://api.santelink.dev.rancher.nebulageekinfra.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  retryAttempts: 2,
  retryDelay: 500
};

// Fonction pour obtenir la configuration appropriée
export const getApiConfig = (): ApiConfig => {
  if (isMobile()) {
    console.log('🔧 Configuration API: Mobile détecté');
    return mobileConfig;
  }
  
  if (isDevelopment()) {
    console.log('🔧 Configuration API: Mode développement');
    return devConfig;
  }
  
  console.log('🔧 Configuration API: Mode production');
  return defaultConfig;
};

// Export de la configuration actuelle
export const apiConfig = getApiConfig();

// Fonction pour obtenir l'URL de base
export const getBaseURL = (): string => {
  return apiConfig.baseURL;
};

// Fonction pour obtenir les headers par défaut
export const getDefaultHeaders = (): Record<string, string> => {
  return apiConfig.headers;
};

// Fonction pour obtenir le timeout
export const getTimeout = (): number => {
  return apiConfig.timeout;
};

// Fonction pour obtenir les paramètres de retry
export const getRetryConfig = () => {
  return {
    attempts: apiConfig.retryAttempts,
    delay: apiConfig.retryDelay
  };
};

// Fonction utilitaire pour faire des appels API avec retry
export const apiCallWithRetry = async (url: string, options: RequestInit = {}) => {
  const config = getApiConfig();
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= config.retryAttempts; attempt++) {
    try {
      console.log(`🔧 Tentative API ${attempt}/${config.retryAttempts}: ${url}`);
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...config.headers,
          ...options.headers
        }
      });
      
      // Si on reçoit une réponse (même avec erreur), l'API est accessible
      if (response.status >= 200 && response.status < 600) {
        console.log(`✅ API call réussi (Status: ${response.status})`);
        return response;
      } else {
        throw new Error(`API répond avec statut: ${response.status}`);
      }
      
    } catch (error) {
      lastError = error as Error;
      console.log(`❌ Tentative ${attempt} échouée:`, error);
      
      if (attempt < config.retryAttempts) {
        console.log(`⏳ Attente ${config.retryDelay}ms avant nouvelle tentative...`);
        await new Promise(resolve => setTimeout(resolve, config.retryDelay));
      }
    }
  }
  
  throw new Error(`Toutes les tentatives ont échoué. Dernière erreur: ${lastError?.message}`);
};
