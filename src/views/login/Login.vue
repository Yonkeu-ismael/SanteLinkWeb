<template>
  <div class="login">
    <div class="section">
      <!-- Flèche de retour mobile -->
      <div class="mobile-back-button" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="header-navigation">
                <div class="logo-section">
          <img src="/images/SanteLink.svg" alt="SanteLink Logo" class="logo-instance" />
        </div>
      </div>

      <div class="container">
        <div class="content">
          <div class="frame">
            <div class="frame">
              <div class="div">
                <div class="text-wrapper">{{ t('welcomeBack') }}</div>
                <p class="p">{{ t('pleaseEnterFormToLogin') }}</p>
              </div>

              <div class="div-2">
                <div class="div">
                  <div class="text">{{ t('emailOrUsername') }}</div>
                  <div class="input-form">
                    <input 
                      v-model="form.emailOrUsername" 
                      type="text" 
                      class="text-2" 
                      :placeholder="t('enterYourEmailOrUsername')"
                    />
                  </div>
                </div>

                <div class="password">
                  <div class="div">
                    <div class="text">{{ t('password') }}</div>
                    <div class="input-form">
                      <input 
                        v-model="form.password" 
                        :type="showPassword ? 'text' : 'password'" 
                        class="text-2" 
                        :placeholder="t('enterYourPassword')"
                      />
                      <button class="icon-btn" @click="togglePassword">
                        <svg class="icon-instance-node" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <!-- <div class="text-wrapper-2" @click="handleForgotPassword">{{ t('forgot') }}</div> -->
                  <div class="text-wrapper-2" @click="">{{ t('forgot') }}</div>
                </div>
              </div>
            </div>

            <div class="div-2">
              <button class="button" @click="handleLogin" :disabled="loading">
                <span class="button-2">{{ loading ? t('signingIn') : t('signIn') }}</span>
              </button>

              <div class="divider"></div>

              <div class="button-group">
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
              </div>
            </div>
          </div>

          <p class="don-t-have-an">
            <span class="span">{{ t('noAccount') }} </span>
            <span class="text-wrapper-3" @click="goToWelcome">{{ t('register') }}</span>
          </p>
        </div>
      </div>

      <footer class="footer">
        <div class="text-3">© SanteLink 2025</div>
      </footer>
    </div>

    <div class="section-2">
      <div class="name-and-text">
        <div class="name">{{ t('welcome') }}</div>
      </div>

      <!-- <div class="navigation-buttons">
        <button class="nav-arrow left-arrow" @click="previousSlide">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="nav-arrow right-arrow" @click="nextSlide">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div> -->
      <p class="quote">
        {{ t('welcomeQuote') }}
        <br />
        {{ t('letsGetStarted') }}
      </p>
    </div>

    <!-- Composant de réinitialisation de mot de passe -->
    <!-- <ResetPasswordForm
      ref="resetPasswordRef"
      :loading="loading"
      @send-otp="handleSendOtp"
      @reset-password="handleResetPassword"
      @close="handleCloseReset"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { t as T } from '@/i18n'
import ResetPasswordForm from './components/ResetPasswordForm.vue'
import { googleAuthService } from '@/services/googleAuthService'

const t = (key: Parameters<typeof T>[0]) => T(key)

const store = useStore()
const router = useRouter()
const loading = ref(false)
const showPassword = ref(false)
const currentSlide = ref(0)
const resetPasswordRef = ref()

const form = ref({
  emailOrUsername: '',
  password: ''
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const goToWelcome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}

const handleLogin = async () => {
  if (!form.value.emailOrUsername || !form.value.password) {
    ElMessage.error(t('missingRequiredFields'))
    return
  }

  try {
    loading.value = true
    await store.dispatch('user/login', form.value)
    ElMessage.success(t('welcome'))
    router.push('/dashboard')
  } catch (error: any) {
    console.error('Login error:', error)
    const message = translateErrorMessage(error?.response?.data?.message || error?.message || 'Erreur de connexion')
    ElMessage.error(message)
  } finally {
    loading.value = false
  }
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

const handleForgotPassword = () => {
  resetPasswordRef.value?.openResetDialog()
}

const handleSendOtp = async (method: 'email' | 'phone', value: string) => {
  try {
    loading.value = true
    await store.dispatch('user/sendOtp', { method, value })
    ElMessage.success(t('otpSent'))
  } catch (error: any) {
    console.error('Send OTP error:', error)
    const message = translateErrorMessage(error?.response?.data?.message || error?.message || 'Erreur d\'envoi OTP')
    ElMessage.error(message)
  } finally {
    loading.value = false
  }
}

const handleResetPassword = async (form: {
  method: 'email' | 'phone'
  email?: string
  phoneNumber?: string
  otpCode: string
  newPassword: string
}) => {
  try {
    loading.value = true
    await store.dispatch('user/resetPassword', form)
    ElMessage.success(t('passwordResetSuccess'))
    handleCloseReset()
  } catch (error: any) {
    console.error('Reset password error:', error)
    const message = translateErrorMessage(error?.response?.data?.message || error?.message || 'Erreur de réinitialisation')
    ElMessage.error(message)
  } finally {
    loading.value = false
  }
}

const handleCloseReset = () => {
  // Fermer les dialogs de réinitialisation
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value > 0 ? currentSlide.value - 1 : 2
}

const nextSlide = () => {
  currentSlide.value = currentSlide.value < 2 ? currentSlide.value + 1 : 0
}

// Fonction pour traduire les messages d'erreur de l'API
const translateErrorMessage = (message: string) => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('bad credentials') || lowerMessage.includes('mauvais identifiants')) {
    return t('badCreds')
  }
  if (lowerMessage.includes('user not found') || lowerMessage.includes('utilisateur non trouvé')) {
    return t('emailIncorrect')
  }
  if (lowerMessage.includes('invalid password') || lowerMessage.includes('mot de passe invalide')) {
    return t('passwordIncorrect')
  }
  
  return message
}

onMounted(() => {
  document.documentElement.setAttribute('lang', 'fr')
})
</script>

<style scoped>

.login {
  align-items: center;
  background-color: var(--bg-color);
  display: flex;
  height: 100vh;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.login .section {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 640px;
  background: var(--card-bg);
}

.login .header-navigation {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  height: 96px;
  padding: 32px;
  position: relative;
  width: 100%;
}

@media (max-width: 768px) {
  .login .header-navigation {
    height: 60px;
    padding: 16px 20px;
  }
}

/* Bouton de retour mobile */
.login .mobile-back-button {
  display: none;
  position: absolute;
  top: 12px;
  left: 20px;
  z-index: 100;
  width: auto;
  height: auto;
  background: transparent;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 8px;
}

.login .mobile-back-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}

.login .mobile-back-button svg {
  width: 24px;
  height: 24px;
  color: var(--text-color);
}

.login .logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login .logo-instance {
  width: 141.15px;
}

.login .container {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  padding: 0px 32px;
  position: relative;
  width: 100%;
  flex: 1;
  justify-content: center;
}

.login .content {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 32px;
  position: relative;
  width: 360px;
}

@media (max-width: 768px) {
  .login .content {
    gap: 20px;
    width: 100%;
    max-width: 320px;
  }
}

.login .frame {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 32px;
  position: relative;
  width: 100%;
}

@media (max-width: 768px) {
  .login .frame {
    gap: 20px;
  }
}

.login .div {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 8px;
  position: relative;
  width: 100%;
}

@media (max-width: 768px) {
  .login .div {
    gap: 6px;
  }
}

.login .text-wrapper {
  align-self: stretch;
  color: #0a4a6f;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-top: -1px;
  position: relative;
}

.login .p {
  align-self: stretch;
  color: #3f3f46;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  position: relative;
}

.login .div-2 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
}

.login .text {
  align-self: stretch;
  color: #0a4a6f;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-top: -1px;
  position: relative;
}

.login .input-form {
  align-items: center;
  align-self: stretch;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  display: flex;
  flex: 0 0 auto;
  gap: 12px;
  padding: 12px;
  position: relative;
  width: 100%;
}

.login .text-2 {
  color: #6b7280;
  flex: 1;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-top: -1px;
  position: relative;
  border: none;
  outline: none;
  background: transparent;
}

.login .text-2::placeholder {
  color: #6b7280;
}

.login .password {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 4px;
  position: relative;
  width: 100%;
}

.login .icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login .icon-instance-node {
  height: 24px;
  position: relative;
  width: 24px;
  color: #6b7280;
}

.login .text-wrapper-2 {
  align-self: stretch;
  color: #3f3f46;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  text-align: right;
  cursor: pointer;
}

.login .text-wrapper-2:hover {
  color: #0a4a6f;
}

.login .button {
  all: unset;
  align-items: center;
  align-self: stretch;
  background-color: #0a4a6f;
  border: 1px solid #0a4a6f;
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

.login .button:hover {
  background-color: #083d5c;
  transform: translateY(-1px);
}

.login .button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.login .button-2 {
  all: unset;
  box-sizing: border-box;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.login .divider {
  height: 1px;
  background-color: #e5e7eb;
  position: relative;
  width: 100%;
  margin: 16px 0;
}

.login .button-group {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
}

.login .button-social {
  align-self: stretch;
  background: #ffffff;
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
  color: #374151;
}

.login .button-social:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
  transform: translateY(-1px);
}

.login .google-btn {
  background-color: #ffffff;
}

.login .apple-btn {
  background-color: #1f2937;
  color: #ffffff;
  border-color: #1f2937;
}

.login .apple-btn:hover {
  background-color: #111827;
}

.login .social-icon {
  width: 20px;
  height: 20px;
  display: block;
  flex-shrink: 0;
}

.login .don-t-have-an {
  color: transparent;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.20px;
  line-height: 20px;
  position: relative;
  text-align: center;
  width: 100%;
}

.login .span {
  color: #3f3f46;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
}

.login .text-wrapper-3 {
  color: #0a4a6f;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
}

.login .text-wrapper-3:hover {
  color: #083d5c;
}

.login .footer {
  align-items: flex-end;
  align-self: stretch;
  background-color: transparent;
  display: flex;
  height: 96px;
  padding: 32px;
  position: relative;
  width: 100%;
}

@media (max-width: 768px) {
  .login .footer {
    height: 60px;
    padding: 16px 20px;
  }
}

.login .text-3 {
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.login .section-2 {
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

.login .navigation-buttons {
  position: absolute;
  bottom: 56px;
  right: 56px;
  display: flex;
  gap: 16px;
  z-index: 10;
}

.login .nav-arrow {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.login .nav-arrow:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
}

.login .nav-arrow svg {
  width: 24px;
  height: 24px;
}

.login .quote {
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

.login .name-and-text {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 12px;
  left: 56px;
  position: absolute;
  top: 141px;
  width: 688px;
}

.login .name {
  align-self: stretch;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 48px;
  font-weight: 400;
  margin-top: -1px;
  position: relative;
}



/* Responsive pour mobile et tablette */
@media (max-width: 1024px) {
  .login {
    flex-direction: column;
  }
  
  .login .section {
    width: 100%;
    min-height: 75vh;
    padding: 24px 20px;
    order: 2;
    display: flex;
    flex-direction: column;
  }
  
  /* Permettre le scroll sur les très petits écrans */
  @media (max-width: 480px) {
    .login .section {
      min-height: auto;
      height: auto;
      overflow-y: auto;
    }
  }
  
  .login .section-2 {
    display: none;
  }
  
  /* Afficher le bouton de retour en mode mobile */
  .login .mobile-back-button {
    display: flex;
  }
  
  .login .content {
    align-items: flex-start;
    text-align: left;
    gap: 24px;
    width: 100%;
    max-width: 400px;
  }
  
  .login .p {
    text-align: left;
  }
  
  .login .name-and-text {
    display: none;
  }
  
  .login .navigation-buttons {
    position: absolute;
    bottom: 20px;
    right: 20px;
    gap: 12px;
  }

  .login .nav-arrow {
    width: 40px;
    height: 40px;
  }

  .login .nav-arrow svg {
    width: 20px;
    height: 20px;
  }
  
  .login .quote {
    display: none;
  }
}

@media (max-width: 768px) {
  .login .content {
    width: 100%;
    max-width: 320px;
  }
  
  .login .header-navigation {
    padding: 16px 20px;
    height: auto;
    margin-bottom: 20px;
  }
  
  .login .container {
    padding: 0 20px;
    justify-content: flex-start;
    gap: 20px;
  }
  
  .login .footer {
    display: none;
  }
  
  .login .section-2 {
    padding: 20px;
    min-height: 200px;
    order: 1;
  }
  
  .login .name {
    font-size: 28px;
  }
  
  .login .quote {
    font-size: 20px;
  }
  
  .login .logo-instance {
    display: none;
  }
}

@media (max-width: 480px) {
  .login .content {
    gap: 16px;
    width: 100%;
    max-width: 280px;
  }
  
  .login .div {
    gap: 12px;
    width: 100%;
  }
  
  .login .frame {
    gap: 16px;
  }
  
  .login .text-wrapper {
    font-size: 20px;
    line-height: 28px;
  }
  
  .login .p {
    font-size: 13px;
    line-height: 18px;
  }
  
  .login .header-navigation {
    padding: 12px 16px;
    margin-bottom: 16px;
  }
  
  .login .container {
    padding: 0 16px;
    gap: 16px;
  }
  
  .login .footer {
    display: none;
  }
  .login .section-2 {
    min-height: 180px;
    padding: 16px;
  }

}
</style>
