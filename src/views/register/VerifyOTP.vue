<template>
  <div class="OTP">
    <!-- Notification d'erreur -->
    <div v-if="showError" class="error-notification" @click="hideError">
      <div class="error-content">
        <div class="error-icon">⚠️</div>
        <div class="error-message">{{ errorMessage }}</div>
        <div class="error-close">×</div>
      </div>
    </div>

    <!-- Notification de succès -->
    <div v-if="showSuccess" class="success-notification" @click="hideSuccess">
      <div class="success-content">
        <div class="success-icon">✅</div>
        <div class="success-message">{{ successMessage }}</div>
        <div class="success-close">×</div>
      </div>
    </div>

    <div class="section">
      <!-- Flèche de retour mobile -->
      <div class="mobile-back-button" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="header-navigation">
        <div class="logo-container">
          <img src="/images/SanteLink.svg" alt="SanteLink" class="logo" />
        </div>
      </div>

      <div class="container">
        <div class="content">
          <div class="onboard-text">
            <div class="text-wrapper">{{ t('sendOTPCode') }}</div>

            <p class="enter-the-digit">
              <span class="span">
                {{ t('enterThe6Digit') }}<br />
                {{ t('phoneNumberTo') }}
              </span>

              <span class="text-wrapper-2"> {{ phoneNumber }}</span>
            </p>
          </div>

          <div class="input">
            <!-- Input caché pour capturer les touches -->
            <input
              ref="hiddenInput"
              type="text"
              :value="otpCode.join('')"
              @input="handleInput"
              @focus="handleFocus"
              @blur="handleBlur"
              style="position: absolute; opacity: 0; pointer-events: none; width: 1px; height: 1px;"
              maxlength="6"
              inputmode="numeric"
              pattern="[0-9]*"
            />
            
            <div class="input-field">
              <div 
                v-for="(digit, index) in 6" 
                :key="index"
                :class="['div-wrapper', { 'cursor-wrapper': index === currentFocus }]"
                @click="focusInput(index)"
              >
                <div v-if="otpCode[index]" class="div">●</div>
                <div v-else-if="index === currentFocus" class="cursor"></div>
              </div>
            </div>

            <div class="timer">
              <svg class="timer-fill" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                <path d="M10 2v8l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div class="text-wrapper-3">{{ formatTime(timeLeft) }}</div>
            </div>
            
            <!-- Bouton Resend OTP -->
            <div class="resend-section">
              <button 
                v-if="timeLeft === 0" 
                @click="resendOTP" 
                :disabled="isResending"
                class="resend-button"
              >
                <span v-if="isResending">{{ t('sending') }}</span>
                <span v-else>{{ t('resendCode') }}</span>
              </button>
              <p v-else class="resend-text">
                {{ t('resendCodeIn') }} 
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <p class="bottom-links">
            <span class="text-wrapper-4">
              {{ t('bySigningUpText') }} <br />
            </span>

            <span class="text-wrapper-5">{{ t('termsOfService') }}</span>

            <span class="text-wrapper-4"> {{ t('and') }} </span>

            <span class="text-wrapper-5">{{ t('privacyPolicy') }}</span>
          </p>
        <div class="text">© SanteLink 2025</div>
      </footer>
    </div>

    <div class="section-2">
      <div class="navigation-buttons">
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
      </div>

      <p class="quote">
        {{ t('testimonialQuote') }}
      </p>

      <div class="name-and-text">
        <div class="name">{{ t('welcome') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { t as T } from '@/i18n'
import { verifyOTP, sendOTP } from '@/api/auth'

const t = (key: Parameters<typeof T>[0]) => T(key)

const router = useRouter()
const route = useRoute()



const phoneNumber = ref('')
const otpCode = ref(['', '', '', '', '', ''])
const currentFocus = ref(0)
const timeLeft = ref(59)
const isResending = ref(false)
const hiddenInput = ref<HTMLInputElement>()

// Variables pour les notifications
const showError = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

let timer: NodeJS.Timeout | null = null

onMounted(() => {
  // Récupérer le numéro de téléphone depuis les paramètres de route
  phoneNumber.value = route.query.phone as string || ''
  
  // Démarrer le timer
  startTimer()
  
  // Focus automatique sur l'input caché
  setTimeout(() => {
    if (hiddenInput.value) {
      hiddenInput.value.focus()
    }
  }, 100)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const startTimer = () => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      if (timer) clearInterval(timer)
    }
  }, 1000)
}

const resetTimer = () => {
  timeLeft.value = 59
  startTimer()
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Fonctions pour gérer les notifications
const showNotification = (type: 'error' | 'success', message: string) => {
  if (type === 'error') {
    errorMessage.value = message
    showError.value = true
    // Masquer automatiquement après 5 secondes
    setTimeout(() => {
      showError.value = false
    }, 5000)
  } else {
    successMessage.value = message
    showSuccess.value = true
    // Masquer automatiquement après 3 secondes
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  }
}

const hideError = () => {
  showError.value = false
}

const hideSuccess = () => {
  showSuccess.value = false
}

const focusInput = (index: number) => {
  currentFocus.value = index
  // Focus sur l'input caché
  if (hiddenInput.value) {
    hiddenInput.value.focus()
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '').slice(0, 6) // Garder seulement les chiffres, max 6
  
  // Mettre à jour le code OTP
  const newOtpCode = value.split('')
  otpCode.value = [...newOtpCode, ...Array(6 - newOtpCode.length).fill('')]
  
  // Mettre à jour le focus
  currentFocus.value = Math.min(value.length, 5)
  
  // Vérifier si le code est complet
  if (value.length === 6) {
    verifyOTPCode()
  }
}

const handleFocus = () => {
  // Quand l'input caché reçoit le focus, on met le focus sur le premier champ vide
  const firstEmptyIndex = otpCode.value.findIndex(digit => !digit)
  currentFocus.value = firstEmptyIndex >= 0 ? firstEmptyIndex : 0
}

const handleBlur = () => {
  // Optionnel : gérer la perte de focus
}

const verifyOTPCode = async () => {
  const code = otpCode.value.join('')
  if (code.length === 6) {
    try {
      // Appeler la fonction d'API pour vérifier l'OTP
      const result = await verifyOTP(phoneNumber.value, code)
      
      if (result.success) {
        console.log('✅ OTP vérifié avec succès:', result.message)
        showNotification('success', t('otpVerifiedSuccessfully'))
        // Rediriger vers la prochaine étape après un délai
        setTimeout(() => {
          router.push('/register')
        }, 1500)
      } else {
        console.error('❌ Échec de la vérification de l\'OTP:', result.message)
        // Traduire le message d'erreur
        let translatedMessage = result.message
        if (result.message.includes('expired')) {
          translatedMessage = t('codeExpired')
        } else if (result.message.includes('invalid')) {
          translatedMessage = t('invalidCode')
        }
        showNotification('error', translatedMessage)
        // Réinitialiser le code OTP
        otpCode.value = ['', '', '', '', '', '']
        currentFocus.value = 0
        if (hiddenInput.value) {
          hiddenInput.value.value = ''
        }
      }
    } catch (error) {
      console.error('❌ Erreur lors de la vérification de l\'OTP:', error)
      showNotification('error', t('connectionError'))
    }
  }
}

const resendOTP = async () => {
  if (phoneNumber.value.trim()) {
    console.log('🔄 Renvoi de l\'OTP pour:', phoneNumber.value)
    
    isResending.value = true
    
    try {
      const result = await sendOTP(phoneNumber.value)
      
      if (result.success) {
        console.log('✅ OTP renvoyé avec succès:', result.message)
        // Réinitialiser le timer
        resetTimer()
        // Réinitialiser le code OTP
        otpCode.value = ['', '', '', '', '', '']
        currentFocus.value = 0
        // Réinitialiser l'input caché
        if (hiddenInput.value) {
          hiddenInput.value.value = ''
        }
        // Afficher un message de succès
        showNotification('success', t('otpResentSuccessfully'))
      } else {
        console.error('❌ Échec du renvoi de l\'OTP:', result.message)
        showNotification('error', result.message)
      }
    } catch (error) {
      console.error('❌ Erreur lors du renvoi de l\'OTP:', error)
      showNotification('error', t('connectionError'))
    } finally {
      isResending.value = false
    }
  }
}

const previousSlide = () => {
  // Logique pour le slide précédent
}

const nextSlide = () => {
  // Logique pour le slide suivant
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.OTP {
  align-items: center;
  background-color: var(--bg-color);
  display: flex;
  height: 100vh;
  position: relative;
  width: 100%;
}

.OTP .section {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  position: relative;
  width: 640px;
  background: var(--card-bg);
}

.OTP .header-navigation {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  height: 96px;
  padding: 32px;
  position: relative;
  width: 100%;
}

/* Bouton de retour mobile */
.OTP .mobile-back-button {
  display: none;
  position: absolute;
  top: 20px;
  left: 5px;
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

.OTP .mobile-back-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}

.OTP .mobile-back-button svg {
  width: 24px;
  height: 24px;
  color: var(--text-color);
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 141.15px;
  height: auto;
}

.OTP .container {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  padding: 0px 32px;
  position: relative;
  width: 100%;
}

.OTP .content {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 32px;
  position: relative;
  width: 360px;
}

.OTP .onboard-text {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 8px;
  position: relative;
  width: 100%;
}

.OTP .text-wrapper {
  align-self: stretch;
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin-top: -1px;
  position: relative;
}

.OTP .enter-the-digit {
  align-self: stretch;
  color: var(--text-color);
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.2px;
  line-height: 24px;
  position: relative;
}

.OTP .span {
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.OTP .text-wrapper-2 {
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
}

.OTP .input {
  align-items: flex-end;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 24px;
  position: relative;
  width: 100%;
}

.OTP .input-field {
  align-items: flex-start;
  display: flex;
  flex: 0 0 auto;
  gap: 15px;
  position: relative;
  width: 341px;
}

.OTP .div-wrapper {
  align-items: center;
  background-color: var(--card-bg);
  border: 1px solid #0a4a6f;
  border-radius: 12px;
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
  height: 44px;
  justify-content: center;
  overflow: hidden;
  padding: 12px;
  position: relative;
  cursor: pointer;
}

.OTP .div {
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.2px;
  line-height: 24px;
  margin-bottom: -1px;
  margin-top: -3px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.OTP .cursor-wrapper {
  align-items: center;
  background-color: #f9fafb;
  border: 1px solid #0a4a6f;
  border-radius: 12px;
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
  height: 44px;
  justify-content: flex-end;
  overflow: hidden;
  padding: 12px;
  position: relative;
  cursor: pointer;
}

.OTP .cursor {
  align-self: stretch;
  height: 1px;
  background-color: #111827;
  position: relative;
  width: 100%;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.OTP .timer {
  align-items: flex-start;
  display: flex;
  flex: 0 0 auto;
  gap: 8px;
  position: relative;
  width: 342px;
}

.OTP .timer-fill {
  height: 20px;
  position: relative;
  width: 20px;
  color: #374151;
}

.OTP .text-wrapper-3 {
  color: #374151;
  flex: 1;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  margin-top: -1px;
  position: relative;
}

.OTP .resend-section {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  width: 100%;
}

.OTP .resend-button {
  all: unset;
  align-items: center;
  background-color: transparent;
  border: 1px solid #0a4a6f;
  border-radius: 8px;
  box-sizing: border-box;
  color: #0a4a6f;
  cursor: pointer;
  display: flex;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  justify-content: center;
  line-height: 20px;
  padding: 12px 24px;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap;
  width: fit-content;
}

.OTP .resend-button:hover:not(:disabled) {
  background-color: #0a4a6f;
  color: #ffffff;
}

.OTP .resend-button:disabled {
  background-color: #f3f4f6;
  border-color: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}

.OTP .resend-text {
  color: #6b7280;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin: 0;
  position: relative;
  text-align: center;
}

.OTP .footer {
  align-items: center;
  align-self: stretch;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px;
  position: relative;
  width: 100%;
}

.OTP .text {
  color: #6b7280;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.OTP .bottom-links {
  color: #6b7280;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-top: 16px;
  position: relative;
  text-align: center;
}

.OTP .text-wrapper-4 {
  color: #6b7280;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.OTP .text-wrapper-5 {
  color: #0a4a6f;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  cursor: pointer;
}

.OTP .text-wrapper-5:hover {
  text-decoration: underline;
}

.OTP .section-2 {
  align-self: stretch;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.2) 100%
  ),
  url('/images/img1.jpg') center/cover no-repeat;
  border-radius: 80px 0px 0px 80px;
  flex: 1;
  flex-grow: 1;
  position: relative;
}

.OTP .navigation-buttons {
  position: absolute;
  bottom: 56px;
  right: 56px;
  display: flex;
  gap: 16px;
  z-index: 10;
}

.OTP .nav-arrow {
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

.OTP .nav-arrow:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
}

.OTP .quote {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 36px;
  font-weight: 500;
  line-height: 44px;
  left: 56px;
  position: absolute;
  top: 359px;
  width: 688px;
  z-index: 10;
}

.OTP .name-and-text {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 12px;
  left: 56px;
  position: absolute;
  top: 141px;
  width: 688px;
  z-index: 10;
}

.OTP .name {
  align-self: stretch;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  margin-top: -1px;
  position: relative;
}

/* Styles pour les notifications */
.error-notification,
.success-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  min-width: 300px;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  animation: slideDown 0.3s ease-out;
}

.error-notification {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  border: 1px solid #ff4757;
}

.success-notification {
  background: linear-gradient(135deg, #51cf66, #40c057);
  border: 1px solid #51cf66;
}

.error-content,
.success-content {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  color: white;
  font-family: 'Inter', sans-serif;
}

.error-icon,
.success-icon {
  font-size: 20px;
  margin-right: 12px;
  flex-shrink: 0;
}

.error-message,
.success-message {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.error-close,
.success-close {
  font-size: 20px;
  font-weight: bold;
  margin-left: 12px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.error-close:hover,
.success-close:hover {
  opacity: 1;
}

@keyframes slideDown {
  from {
    transform: translateX(-50%) translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

/* Responsive styles */
@media (max-width: 1200px) {
  .OTP .section-2 {
    display: none;
  }
  
  .OTP .section {
    width: 100%;
    max-width: 100%;
  }
}

@media (max-width: 834px) {
  .OTP {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
  
  .OTP .section {
    width: 100%;
    min-height: 100vh; /* S'assurer que la section prend toute la hauteur */
    /* justify-content: space-between; */
  }

  .OTP .section-2 {
    display: none;
  }
  
  /* Afficher le bouton de retour en mode mobile */
  .OTP .mobile-back-button {
    display: flex;
  }
  
  /* Masquer le logo en mode mobile */
  .OTP .logo {
    display: none;
  }
  
  .OTP .content {
    width: 100%;
    max-width: 400px;
  }
  
  .OTP .header-navigation {
    height: 80px;
    padding: 20px;
  }
  
  .OTP .container {
    padding: 0 20px;
  }
  
  .OTP .footer {
    /* display: none; */ /* Retiré pour rendre le footer visible sur mobile */
    padding: 16px 0;
    justify-content: center;
    height: auto; /* Permettre au footer de s'adapter à son contenu */
  }

  .OTP .text {
    display: none; /* Masquer le copyright en mode mobile */
  }

  .OTP .bottom-links {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--card-bg);
    padding: 16px 32px;
    z-index: 1000;
    text-align: center;
    border-top: 1px solid #e5e7eb;
  }

  .OTP .input-field {
    width: 100%;
    max-width: 341px;
  }
}

@media (max-width: 480px) {
  .OTP .content {
    max-width: 320px;
  }
  
  .OTP .text-wrapper {
    font-size: 20px;
    line-height: 28px;
  }
  
  .OTP .input-field {
    gap: 10px;
  }
  
  .OTP .div-wrapper {
    height: 40px;
    padding: 8px;
  }
}
</style>
