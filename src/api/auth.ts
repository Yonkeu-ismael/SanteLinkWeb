import { getApiConfig } from '@/config/api'
import { isMockMode, mockDelay, mockSuccessResponse, mockErrorResponse, DEV_CONFIG } from '@/config/dev'

// Interface pour la réponse OTP
interface OTPResponse {
  success: boolean
  message: string
  data?: any
}

// Interface pour la requête OTP
interface OTPRequest {
  phoneNumber: string
}

// Fonction utilitaire pour faire des appels API
const apiCall = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  const config = getApiConfig()
  const url = `${config.baseURL}${endpoint}`
  
  const defaultOptions: RequestInit = {
    headers: {
      ...config.headers,
      ...options.headers
    },
    ...options
  }

  console.log(`🌐 API Call: ${url}`, defaultOptions)
  
  return fetch(url, defaultOptions)
}

// Fonction pour envoyer un OTP
export const sendOTP = async (phoneNumber: string): Promise<OTPResponse> => {
  // Mode de test
  if (isMockMode()) {
    console.log('🧪 Mode test: Simulation de l\'envoi d\'OTP')
    await mockDelay()
    
    // Nettoyer le numéro de téléphone (enlever les espaces, tirets, etc.)
    const cleanPhoneNumber = phoneNumber.replace(/[\s\-\(\)]/g, '')
    
    // Simuler un succès pour les numéros de test (avec ou sans préfixe)
    const isValidTestNumber = DEV_CONFIG.TEST_PHONE_NUMBERS.some(testNumber => 
      cleanPhoneNumber === testNumber || 
      cleanPhoneNumber === `+1${testNumber}` ||
      cleanPhoneNumber === `1${testNumber}` ||
      cleanPhoneNumber.endsWith(testNumber)
    )
    
    if (isValidTestNumber) {
      return mockSuccessResponse({
        phoneNumber: cleanPhoneNumber,
        message: 'Code OTP envoyé par SMS'
      })
    } else {
      return mockErrorResponse(`Numéro de téléphone invalide: ${cleanPhoneNumber}`)
    }
  }

  // Mode production
  try {
    const response = await apiCall('/api/v1/auth/otp-code/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber })
    })

    console.log('📱 OTP Response:', response.status, response.statusText)

    if (response.ok) {
      const data = await response.json()
      return {
        success: true,
        message: 'OTP envoyé avec succès',
        data
      }
    } else {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        message: errorData.message || `Erreur ${response.status}: ${response.statusText}`
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'OTP:', error)
    return {
      success: false,
      message: 'Erreur de connexion. Veuillez réessayer.'
    }
  }
}

// Fonction pour vérifier un OTP
export const verifyOTP = async (phoneNumber: string, otpCode: string): Promise<OTPResponse> => {
  // Mode de test
  if (isMockMode()) {
    console.log('🧪 Mode test: Simulation de la vérification d\'OTP')
    await mockDelay()
    
    // Simuler un succès pour les codes de test
    if (DEV_CONFIG.TEST_OTP_CODES.includes(otpCode)) {
      return mockSuccessResponse({
        phoneNumber,
        otpCode,
        verified: true,
        message: 'Code OTP vérifié avec succès'
      })
    } else {
      return mockErrorResponse('Code OTP incorrect')
    }
  }

  // Mode production
  try {
    const response = await apiCall('/api/v1/auth/otp-code/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ 
        phoneNumber,
        otpCode 
      })
    })

    console.log('🔐 Verify OTP Response:', response.status, response.statusText)

    if (response.ok) {
      const data = await response.json()
      return {
        success: true,
        message: 'OTP vérifié avec succès',
        data
      }
    } else {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        message: errorData.message || `Erreur ${response.status}: ${response.statusText}`
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors de la vérification de l\'OTP:', error)
    return {
      success: false,
      message: 'Erreur de connexion. Veuillez réessayer.'
    }
  }
}

// Fonction pour la connexion
export const login = async (email: string, password: string): Promise<OTPResponse> => {
  try {
    const response = await apiCall('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })

    if (response.ok) {
      const data = await response.json()
      return {
        success: true,
        message: 'Connexion réussie',
        data
      }
    } else {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        message: errorData.message || 'Identifiants incorrects'
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors de la connexion:', error)
    return {
      success: false,
      message: 'Erreur de connexion. Veuillez réessayer.'
    }
  }
}

// Fonction pour l'inscription
export const register = async (userData: any): Promise<OTPResponse> => {
  try {
    const response = await apiCall('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })

    if (response.ok) {
      const data = await response.json()
      return {
        success: true,
        message: 'Inscription réussie',
        data
      }
    } else {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        message: errorData.message || 'Erreur lors de l\'inscription'
      }
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'inscription:', error)
    return {
      success: false,
      message: 'Erreur de connexion. Veuillez réessayer.'
    }
  }
}
