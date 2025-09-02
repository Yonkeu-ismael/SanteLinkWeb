// Configuration pour le mode développement
export const DEV_CONFIG = {
  // Activer le mode de test (simulation d'API) - Désactivé par défaut
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === 'true',
  
  // Délai de simulation pour les appels API (en ms)
  MOCK_API_DELAY: 1000,
  
  // Numéros de téléphone de test
  TEST_PHONE_NUMBERS: [
    '1234567890',
    '0987654321',
    '5551234567'
  ],
  
  // Codes OTP de test
  TEST_OTP_CODES: [
    '123456',
    '654321',
    '000000'
  ]
}

// Fonction pour simuler un délai
export const mockDelay = (ms: number = DEV_CONFIG.MOCK_API_DELAY): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Fonction pour simuler une réponse API réussie
export const mockSuccessResponse = (data: any = {}) => {
  return {
    success: true,
    message: 'Opération réussie',
    data
  }
}

// Fonction pour simuler une réponse API d'erreur
export const mockErrorResponse = (message: string = 'Erreur simulée') => {
  return {
    success: false,
    message
  }
}

// Fonction pour vérifier si on est en mode test
export const isMockMode = (): boolean => {
  return DEV_CONFIG.ENABLE_MOCK_API
}
