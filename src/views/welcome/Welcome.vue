<template>
  <div class="getting-started">
    <!-- Section image (en haut sur mobile) -->
    <div class="section-2">
      <div class="name-and-text">
        <div class="name">{{ t('welcome') }}</div>
      </div>

      <p class="quote">
        {{ t('welcomeQuote') }}
        <br />
        {{ t('letsGetStarted') }}
      </p>
    </div>

    <!-- Section contenu (en bas sur mobile) -->
    <div class="section">
      <div class="header-navigation">
        <div class="logo-section">
          <img src="/images/SanteLink.svg" alt="SanteLink Logo" class="logo" />
        </div>
        
        <!-- Boutons de langue et thème -->
        <div class="header-controls">
          <!-- Sélecteur de langue -->
          <div class="language-selector">
            <select 
              class="lang-select" 
              :value="currentLang"
              @change="(event) => setLanguage((event.target as HTMLSelectElement).value as 'fr' | 'en')"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
          </div>
          
          <!-- Bouton de thème -->
          <button class="theme-btn" @click="toggleTheme">
            <span v-if="isDark">☀️</span>
            <span v-else>🌙</span>
          </button>
        </div>
      </div>

      <div class="container">
        <div class="content">
          <div class="div">
            <h1 class="mobile-title">{{ t('welcome') }}</h1>
            <h1 class="main-title">{{ t('appName') }}</h1>
            <p class="p">{{ t('beginJourney') }}</p>
          </div>

          <div class="div">
            <button class="button" @click="goToSignUp">
              <span class="button-text">{{ t('continueWithPhone') }}</span>
            </button>

            <button class="button-social google-btn" @click="handleGoogleLogin">
              <svg class="social-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>{{ t('continueWithGoogle') }}</span>
            </button>

            <button class="button-social apple-btn" @click="handleAppleLogin">
              <svg class="social-icon" viewBox="0 0 24 24">
                <path fill="#FFFFFF" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>{{ t('continueWithApple') }}</span>
            </button>



            <p class="already-have-an">
              <span class="span">{{ t('alreadyHaveAccount') }} </span>
              <span class="text-wrapper-2" @click="goToLogin">{{ t('signIn') }}</span>
            </p>
          </div>

          <p class="by-signing-up-or">
            <span class="text-wrapper-3">
              {{ t('bySigningUpText') }}<br />
            </span>
            <span class="text-wrapper-4">{{ t('termsOfService') }}</span>
            <span class="text-wrapper-3"> {{ t('and') }} </span>
            <span class="text-wrapper-4">{{ t('privacyPolicy') }}</span>
          </p>
        </div>
      </div>

      <footer class="footer">
        <div class="text">© SanteLink 2025</div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { t as T, setLang, currentLang } from '@/i18n'
import { ElMessage } from 'element-plus'
import { isDark, toggleTheme } from '@/utils/theme'
import { googleAuthService } from '@/services/googleAuthService'


const t = (key: Parameters<typeof T>[0]) => T(key)

const router = useRouter()


// Fonctions pour la langue et le thème
const setLanguage = (lang: 'fr' | 'en') => {
  setLang(lang)
}

const goToLogin = () => {
  router.push('/login')
}

const goToSignUp = () => {
  console.log('Navigating to /signup')
  router.push('/signup')
}

const handleGoogleLogin = async () => {
  try {
    ElMessage.info(t('connectingToGoogle'))
    
    // Détecter si on est sur mobile
    if ((window as any).Capacitor?.isNative) {
      await googleAuthService.authenticateMobile()
    } else {
      await googleAuthService.authenticate()
    }
    
    ElMessage.success(t('googleLoginSuccess'))
    router.push('/dashboard')
    
  } catch (error: any) {
    console.error('Erreur lors de l\'authentification Google:', error)
    
    if (error.message.includes('popup')) {
      ElMessage.error(t('popupBlocked'))
    } else if (error.message.includes('Timeout')) {
      ElMessage.error(t('authenticationTimeout'))
    } else {
      ElMessage.error(t('googleLoginError'))
    }
  }
}

const handleAppleLogin = () => {
  ElMessage.info(t('appleLoginNotImplemented'))
}




</script>

<style scoped>
.getting-started {
  align-items: center;
  background-color: var(--bg-color);
  display: flex;
  height: 100vh;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.getting-started .section {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 640px;
  min-height: 100vh;
  background: var(--card-bg);
  order: 1;
}

.getting-started .header-navigation {
  align-items: center;
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  height: 96px;
  padding: 32px;
  position: relative;
  width: 100%;
}

.getting-started .logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.getting-started .logo {
  width: 173px;
  height: 24px;
}

/* Styles pour les contrôles du header */
.getting-started .header-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.getting-started .language-selector {
  display: flex;
  gap: 8px;
}

.getting-started .lang-select {
  background: var(--card-bg);
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  min-width: 60px;
  height: 36px;
  color: var(--text-color);
  outline: none;
}

.getting-started .lang-select:hover {
  background-color: var(--bg-color);
  border-color: #9ca3af;
}

.getting-started .lang-select:focus {
  border-color: #0a4a6f;
  box-shadow: 0 0 0 2px rgba(10, 74, 111, 0.1);
}

.getting-started .theme-btn {
  background: var(--card-bg);
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.getting-started .theme-btn:hover {
  background-color: var(--bg-color);
  border-color: #9ca3af;
}

  .getting-started .container {
    align-items: center;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    padding: 0px 32px;
    position: relative;
    width: 100%;
    flex: 1;
    justify-content: flex-start;
    /* Ajouter de l'espace en mode web */
    margin-top: 20px;
  }

.getting-started .content {
  align-items: flex-start;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 24px;
  position: relative;
  width: 360px;
  /* Centrer le contenu verticalement en mode web */
  margin-top: 20px;
}

.getting-started .div {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
}

.getting-started .text-wrapper {
  align-self: stretch;
  color: #0a4a6f;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-top: -1px;
  position: relative;
}

.getting-started .p {
  align-self: stretch;
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  text-align: left;
}

.getting-started .mobile-title {
  display: none;
  align-self: stretch;
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 38px;
  margin: 0 0 8px 0;
  position: relative;
  text-align: left;
}

.getting-started .main-title {
  align-self: stretch;
  color: #000000;
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  margin: 0 0 8px 0;
  position: relative;
  text-align: left;
}

.getting-started .button {
  all: unset;
  align-items: center;
  align-self: stretch;
  background-color: #0a4a6f;
  border-radius: 8px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  gap: 12px;
  justify-content: center;
  overflow: hidden;
  padding: 12px 24px;
  position: relative;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.getting-started .button:hover {
  background-color: #083d5c;
  transform: translateY(-1px);
}

.getting-started .button-text {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.getting-started .button-social {
  align-self: stretch;
  background: var(--card-bg);
  border: 1px solid #d1d5db;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.getting-started .button-social:hover {
  background-color: var(--bg-color);
  border-color: #9ca3af;
  transform: translateY(-1px);
}



.getting-started .google-btn {
  background-color: #ffffff;
}

.getting-started .apple-btn {
  background-color: #1f2937;
  color: #ffffff;
  border-color: #1f2937;
}

.getting-started .apple-btn:hover {
  background-color: #111827;
}



.getting-started .social-icon {
  width: 20px;
  height: 20px;
  display: block;
  flex-shrink: 0;
}

.getting-started .already-have-an {
  align-self: stretch;
  color: transparent;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  text-align: center;
  cursor: pointer;
}

.getting-started .span {
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.getting-started .text-wrapper-2 {
  color: #0a4a6f;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
}

.getting-started .text-wrapper-2:hover {
  color: #083d5c;
}

.getting-started .by-signing-up-or {
  align-self: stretch;
  color: transparent;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  position: relative;
  text-align: center;
}

.getting-started .text-wrapper-3 {
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
}

.getting-started .text-wrapper-4 {
  color: #0a4a6f;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
}

.getting-started .text-wrapper-4:hover {
  color: #083d5c;
}

.getting-started .footer {
  align-items: flex-end;
  align-self: stretch;
  background-color: transparent;
  display: flex;
  height: 96px;
  padding: 32px;
  position: relative;
  width: 100%;
}

.getting-started .text {
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.getting-started .section-2 {
  align-self: stretch;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.2) 100%
  ),
  url('/images/img1.jpg') center/cover;
  border-radius: 80px 0px 0px 80px;
  flex: 1;
  flex-grow: 1;
  position: relative;
  order: 2;
}

.getting-started .name-and-text {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 12px;
  left: 56px;
  position: absolute;
  top: 141px;
  width: 688px;
}

.getting-started .name {
  align-self: stretch;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 48px;
  font-weight: 400;
  margin-top: -1px;
  position: relative;
}



.getting-started .quote {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 500;
  left: 56px;
  letter-spacing: -0.02em;
  line-height: 1.4;
  position: absolute;
  top: 359px;
  width: 688px;
}

/* Responsive pour mobile et tablette */
@media (max-width: 1024px) {
  .getting-started {
    flex-direction: column;
  }
  
  .getting-started .section {
    width: 100%;
    min-height: 65vh;
    padding: 32px 24px;
    order: 2;
    display: flex;
    flex-direction: column;
  }
  
  .getting-started .footer {
    display: none;
  }
  
  .getting-started .section-2 {
    border-radius: 0;
    order: 1;
    min-height: 35vh;
    padding: 24px;
  }
  
  .getting-started .mobile-title {
    display: none;
  }
  
  /* Réduire l'espacement en mode mobile/tablette */
  .getting-started .container {
    margin-top: 0px;
  }
  
  .getting-started .content {
    align-items: flex-start;
    text-align: left;
    gap: 20px;
    width: 100%;
    max-width: 480px;
    margin-top: 20px;
  }
  
  .getting-started .p {
    text-align: left;
    font-size: 16px;
  }
  
  .getting-started .main-title {
    font-size: 28px;
    line-height: 36px;
    margin-bottom: 8px;
  }
  
  .getting-started .button {
    padding: 14px 28px;
  }
  
  .getting-started .button-social {
    padding: 14px 28px;
    font-size: 12px;
  }
  
  .getting-started .button-text {
    font-size: 12px;
  }
  
  .getting-started .header-navigation {
    padding: 24px 24px;
    height: auto;
    margin-bottom: 16px;
  }
  
  .getting-started .logo {
    width: 180px;
    height: 26px;
  }
  
  .getting-started .lang-select {
    min-width: 70px;
    height: 40px;
    font-size: 16px;
    padding: 8px 12px;
  }
  
  .getting-started .theme-radio .radio-custom {
    width: 40px;
    height: 40px;
    font-size: 16px;
    padding: 8px;
  }
  
  /* Masquer le texte sur l'image en mode mobile/tablette */
  .getting-started .name-and-text {
    display: none;
  }
  
  .getting-started .quote {
    display: none;
  }
  
  /* Masquer le titre principal en mode mobile/tablette */
  .getting-started .main-title {
    display: none;
  }
}

@media (max-width: 768px) {
  .getting-started .content {
    width: 100%;
    max-width: 320px;
  }
  
  .getting-started .header-navigation {
    padding: 1px 20px;
    height: auto;
    margin-bottom: 12px;
  }
  
  .getting-started .header-controls {
    gap: 12px;
  }
  
  .getting-started .lang-select {
    min-width: 50px;
    height: 32px;
    font-size: 14px;
    padding: 6px 8px;
  }
  
  .getting-started .theme-btn {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  .getting-started .container {
    padding: 0 20px;
    justify-content: flex-start;
    gap: 16px;
  }
  
  .getting-started .footer {
    padding: 16px 20px;
    height: auto;
    margin-top: 20px;
    display: none;
  }
  
  .getting-started .section-2 {
    padding: 20px;
    min-height: 200px;
    order: 1;
  }
  
  .getting-started .logo {
    width: 140px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .getting-started {
    overflow-y: auto;
    height: 100vh;
  }
  
  .getting-started .content {
    gap: 16px;
    width: 100%;
    max-width: 320px;
  }
  
  .getting-started .div {
    gap: 16px;
    width: 100%;
  }
  
  .getting-started .text-wrapper {
    font-size: 20px;
  }
  
  .getting-started .mobile-title {
    display: none;
  }
  

  
  .getting-started .logo {
    width: 120px;
    height: 18px;
  }
  
  .getting-started .header-controls {
    gap: 8px;
  }
  
  .getting-started .lang-select {
    min-width: 45px;
    height: 28px;
    font-size: 12px;
    padding: 4px 6px;
  }
  
  .getting-started .theme-btn {
    width: 28px;
    height: 28px;
    font-size: 12px;
    padding: 6px;
  }
  
  .getting-started .footer {
    display: none;
  }
  
  .getting-started .section-2 {
    min-height: 180px;
    padding: 16px;
  }
  
  .getting-started .container {
    padding: 0 16px;
    gap: 12px;
  }
  
  .getting-started .content {
    gap: 12px;
    max-width: 280px;
  }
  
  .getting-started .div {
    gap: 8px;
  }
  
  .getting-started .button {
    padding: 12px 24px;
  }
  
  .getting-started .button-social {
    padding: 12px 24px;
    font-size: 11px;
  }
  
  .getting-started .button-text {
    font-size: 11px;
  }
  

  

}
</style>
