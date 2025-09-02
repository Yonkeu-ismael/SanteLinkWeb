import { getOAuthConfig } from '@/config/googleAuth'

export interface GoogleUser {
  id: string
  email: string
  name: string
  picture: string
  given_name: string
  family_name: string
}

export interface GoogleAuthResponse {
  access_token: string
  id_token: string
  token_type: string
  expires_in: number
  scope: string
}

class GoogleAuthService {
  private config = getOAuthConfig()
  private googleAuth: any = null
  private isInitialized = false

  constructor() {
    this.initializeGoogleAuth()
  }

  /**
   * Initialise l'API Google Identity Services
   */
  private async initializeGoogleAuth(): Promise<void> {
    try {
      // Charger le script Google Identity Services
      await this.loadGoogleScript()
      
      // Initialiser l'API
      if (window.google?.accounts?.oauth2) {
        this.googleAuth = window.google.accounts.oauth2
        this.isInitialized = true
      } else {
        throw new Error('Google Identity Services non disponible')
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de Google Auth:', error)
      this.isInitialized = false
    }
  }

  /**
   * Charge le script Google Identity Services
   */
  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Vérifier si le script est déjà chargé
      if (window.google?.accounts?.oauth2) {
        resolve()
        return
      }

      // Créer et charger le script
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Impossible de charger Google Identity Services'))
      
      document.head.appendChild(script)
    })
  }

  /**
   * Lance le processus d'authentification Google
   */
  async authenticate(): Promise<GoogleUser> {
    try {
      // Attendre l'initialisation
      if (!this.isInitialized) {
        await this.initializeGoogleAuth()
      }

      if (!this.googleAuth) {
        throw new Error('Google Auth non initialisé')
      }

      // Utiliser l'API moderne Google Identity Services
      return await this.authenticateWithGoogleIdentity()
      
    } catch (error) {
      console.error('Erreur lors de l\'authentification Google:', error)
      throw error
    }
  }

  /**
   * Authentification avec Google Identity Services
   */
  private authenticateWithGoogleIdentity(): Promise<GoogleUser> {
    return new Promise((resolve, reject) => {
      try {
        // Créer le bouton d'authentification Google
        const googleButton = document.createElement('div')
        googleButton.id = 'google-auth-button'
        googleButton.style.position = 'fixed'
        googleButton.style.top = '-1000px'
        googleButton.style.left = '-1000px'
        googleButton.style.zIndex = '-1000'
        
        document.body.appendChild(googleButton)

        // Initialiser le bouton Google
        window.google.accounts.id.initialize({
          client_id: this.config.CLIENT_ID,
          callback: async (response: any) => {
            try {
              // Nettoyer le bouton
              document.body.removeChild(googleButton)
              
              if (response.error) {
                reject(new Error(response.error))
                return
              }

              // Récupérer les informations utilisateur
              const userInfo = await this.getUserInfoFromCredential(response.credential)
              resolve(userInfo)
              
            } catch (error) {
              reject(error)
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true
        })

        // Rendre le bouton
        window.google.accounts.id.renderButton(googleButton, {
          theme: 'outline',
          size: 'large',
          type: 'standard'
        })

        // Déclencher l'authentification
        window.google.accounts.id.prompt()

      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Récupère les informations utilisateur depuis le credential JWT
   */
  private async getUserInfoFromCredential(credential: string): Promise<GoogleUser> {
    try {
      // Décoder le JWT pour obtenir les informations utilisateur
      const payload = JSON.parse(atob(credential.split('.')[1]))
      
      return {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        given_name: payload.given_name,
        family_name: payload.family_name
      }
    } catch (error) {
      console.error('Erreur lors du décodage du credential:', error)
      throw new Error('Impossible de décoder les informations utilisateur')
    }
  }

  /**
   * Authentification mobile avec Capacitor
   */
  async authenticateMobile(): Promise<GoogleUser> {
    try {
      // Vérifier si Capacitor est disponible
      if (typeof (window as any).Capacitor === 'undefined') {
        throw new Error('Capacitor non disponible')
      }

      // Utiliser l'API native si disponible
      if ((window as any).Capacitor.Plugins?.OAuth2) {
        const result = await (window as any).Capacitor.Plugins.OAuth2.authenticate({
          appId: this.config.CLIENT_ID,
          responseType: 'code',
          options: {
            scope: this.config.SCOPES.join(' '),
            redirectUri: this.config.REDIRECT_URI
          }
        })

        // Récupérer les infos utilisateur
        return await this.getUserInfo(result.access_token)
      } else {
        // Fallback vers l'authentification web
        return await this.authenticate()
      }
    } catch (error) {
      console.error('Erreur lors de l\'authentification mobile:', error)
      throw error
    }
  }

  /**
   * Récupère les informations de l'utilisateur via l'API Google
   */
  async getUserInfo(accessToken: string): Promise<GoogleUser> {
    try {
      const response = await fetch(this.config.USER_INFO_URL, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des infos utilisateur: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Erreur lors de la récupération des infos utilisateur:', error)
      throw error
    }
  }

  /**
   * Vérifie si l'utilisateur est connecté via Google
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('google_access_token')
    const expiry = localStorage.getItem('google_token_expiry')
    
    if (!token || !expiry) return false
    
    return Date.now() < parseInt(expiry)
  }

  /**
   * Déconnecte l'utilisateur Google
   */
  logout(): void {
    // Déconnecter via Google Identity Services
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect()
      window.google.accounts.id.revoke(localStorage.getItem('google_access_token') || '', () => {
        console.log('Utilisateur Google déconnecté')
      })
    }

    // Nettoyer le stockage local
    localStorage.removeItem('google_access_token')
    localStorage.removeItem('google_token_expiry')
    localStorage.removeItem('google_user_info')
  }
}

export const googleAuthService = new GoogleAuthService()
