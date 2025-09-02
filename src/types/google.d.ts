// Types pour Google Identity Services
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: GoogleIdConfig) => void
          renderButton: (element: HTMLElement, options: GoogleButtonOptions) => void
          prompt: () => void
          disableAutoSelect: () => void
          revoke: (token: string, callback: () => void) => void
        }
        oauth2: any
      }
    }
  }
}

export interface GoogleIdConfig {
  client_id: string
  callback: (response: GoogleIdResponse) => void
  auto_select?: boolean
  cancel_on_tap_outside?: boolean
}

export interface GoogleIdResponse {
  credential: string
  select_by: string
  error?: string
}

export interface GoogleButtonOptions {
  theme?: 'outline' | 'filled_blue' | 'filled_black'
  size?: 'large' | 'medium' | 'small'
  type?: 'standard' | 'icon'
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
  shape?: 'rectangular' | 'rounded' | 'circle'
  logo_alignment?: 'left' | 'center'
  width?: number
  locale?: string
}

export interface GoogleUser {
  sub: string
  email: string
  email_verified: boolean
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: number
  exp: number
}

