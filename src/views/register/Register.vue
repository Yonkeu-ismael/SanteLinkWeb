<template>
  <div class="register-complete">
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
          <div class="frame">
            <div class="div">
              <div class="text-wrapper">{{ t('register') }}</div>
              <p class="p">{{ t('pleaseEnterFormToContinue') }}</p>
            </div>

            <div class="frame-2">
              <div class="div">
                <div class="text">{{ t('firstName') }}</div>
                <div class="input-form">
                  <input v-model="form.firstName" type="text" class="text-2" :placeholder="t('firstName')" />
                </div>
              </div>

              <div class="div">
                <div class="text">{{ t('lastName') }}</div>
                <div class="input-form">
                  <input v-model="form.lastName" type="text" class="text-2" :placeholder="t('lastName')" />
                </div>
              </div>

              <div class="div">
                <div class="text">{{ t('email') }}</div>
                <div class="input-form">
                  <input v-model="form.email" type="email" class="text-2" :placeholder="t('enterYourEmail')" />
                </div>
              </div>

              <div class="div">
                <div class="text">{{ t('phoneNumber') }}</div>
                <div class="input-form">
                  <input v-model="form.phoneNumber" type="tel" class="text-2" :placeholder="t('phonePlaceholder')" />
                </div>
              </div>

              <div class="password">
                <div class="div">
                  <div class="text">{{ t('password') }}</div>
                  <div class="input-form">
                    <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="text-2" :placeholder="t('enterYourPassword')" @input="checkPasswordStrength" />
                    <button class="icon-btn" @click="togglePassword">
                      <svg class="icon-instance-node" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="indicator">
                  <div class="text-3" :class="passwordStrengthClass">{{ passwordStrengthText }}</div>
                  <div class="pagination">
                    <div v-for="i in 3" :key="i" :class="['page', i <= passwordStrengthLevel ? 'page-active' : 'page-inactive']" />
                  </div>
                </div>
              </div>

              <div class="div">
                <div class="text">{{ t('confirmPassword') }}</div>
                <div class="input-form" :class="{ 'error': passwordMismatch && form.confirmPassword }">
                  <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" class="text-2" :placeholder="t('confirmYourPassword')" @input="checkPasswordMatch" />
                  <button class="icon-btn" @click="toggleConfirmPassword">
                    <svg class="icon-instance-node" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </button>
                </div>
                <div v-if="passwordMismatch && form.confirmPassword" class="error-message">
                  {{ t('passwordsNotMatch') }}
                </div>
                <div v-else-if="passwordMatch && form.confirmPassword" class="success-message">
                  {{ t('passwordsMatch') }}
                </div>
              </div>
            </div>
          </div>

          <div class="button-group">
            <button class="button" @click="handleRegister" :disabled="!isFormValid || loading">
              <button class="button-2">
                <span v-if="loading">{{ t('signingUp') }}</span>
                <span v-else>{{ t('signUp') }}</span>
              </button>
            </button>
          </div>
        </div>
      </div>

      <footer class="footer">
        <div class="text-4">© SanteLink 2025</div>
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

      <p class="quote">{{ t('testimonialQuote') }}</p>

      <div class="name-and-text">
        <div class="name">{{ t('welcome') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { t as T } from '@/i18n'
import { ElMessage } from 'element-plus'

const t = (key: Parameters<typeof T>[0]) => T(key)

const router = useRouter()
const route = useRoute()

// Variables réactives
const currentSlide = ref(0)
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Variables pour la force du mot de passe
const passwordStrengthLevel = ref(0)
const passwordStrengthText = ref('')
const passwordStrengthClass = ref('')

// Variables pour la vérification des mots de passe
const passwordMatch = ref(false)
const passwordMismatch = ref(false)

// Fonction pour vérifier si les mots de passe correspondent
const checkPasswordMatch = () => {
  if (form.value.confirmPassword) {
    if (form.value.password === form.value.confirmPassword) {
      passwordMatch.value = true
      passwordMismatch.value = false
    } else {
      passwordMatch.value = false
      passwordMismatch.value = true
    }
  } else {
    passwordMatch.value = false
    passwordMismatch.value = false
  }
}

// Formulaire
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: ''
})

// Validation du formulaire
const isFormValid = computed(() => {
  return form.value.firstName.trim() && 
         form.value.lastName.trim() && 
         form.value.email.trim() && 
         form.value.phoneNumber.trim() && 
         form.value.password.trim() && 
         form.value.confirmPassword.trim() &&
         form.value.password === form.value.confirmPassword &&
         passwordStrengthLevel.value >= 2
})

// Fonctions pour les mots de passe
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const checkPasswordStrength = () => {
  const password = form.value.password
  let strength = 0
  let text = ''
  let className = ''

  if (password.length >= 8) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  passwordStrengthLevel.value = Math.min(strength, 3)

  switch (passwordStrengthLevel.value) {
    case 0:
    case 1:
      text = t('weak')
      className = 'weak'
      break
    case 2:
      text = t('medium')
      className = 'medium'
      break
    case 3:
      text = t('strong')
      className = 'strong'
      break
  }

  passwordStrengthText.value = text
  passwordStrengthClass.value = className
}

// Fonctions pour le carousel
const previousSlide = () => {
  currentSlide.value = currentSlide.value > 0 ? currentSlide.value - 1 : 2
}

const nextSlide = () => {
  currentSlide.value = currentSlide.value < 2 ? currentSlide.value + 1 : 0
}

// Validation des champs
const validateForm = () => {
  const errors: string[] = []

  // Validation firstName
  if (!form.value.firstName.trim()) {
    errors.push(t('firstNameRequired'))
  }

  // Validation lastName
  if (!form.value.lastName.trim()) {
    errors.push(t('lastNameRequired'))
  }

  // Validation email
  if (!form.value.email.trim()) {
    errors.push(t('emailRequired'))
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.push(t('emailInvalid'))
  }

  // Validation phoneNumber
  if (!form.value.phoneNumber.trim()) {
    errors.push(t('phoneRequired'))
  }

  // Validation password
  if (!form.value.password) {
    errors.push(t('passwordRequired'))
  } else if (form.value.password.length < 6) {
    errors.push(t('passwordMin'))
  }

  // Validation confirmPassword
  if (!form.value.confirmPassword) {
    errors.push(t('confirmPasswordRequired'))
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.push(t('passwordsNotMatch'))
  }

  return errors
}

// Fonction d'inscription
const handleRegister = async () => {
  const validationErrors = validateForm()
  
  if (validationErrors.length > 0) {
    ElMessage.error(validationErrors[0])
    return
  }

  if (passwordStrengthLevel.value < 2) {
    ElMessage.error(t('passwordTooWeak'))
    return
  }

  loading.value = true

  try {
    // Nettoyer les données
    const cleanForm = {
      firstName: form.value.firstName.trim(),
      lastName: form.value.lastName.trim(),
      email: form.value.email.trim(),
      phoneNumber: form.value.phoneNumber.trim(),
      password: form.value.password
    }

    // Simulation d'un appel API réussi (comme dans RegisterForm.vue)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    ElMessage.success(t('registrationSuccessful'))
    
    // Rediriger vers le dashboard après un délai
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'inscription:', error)
    ElMessage.error(t('registrationFailed'))
  } finally {
    loading.value = false
  }
}

// Initialisation
onMounted(() => {
  // Récupérer les données du téléphone depuis la route si nécessaire
  const phone = route.query.phone as string
  if (phone) {
    console.log('📱 Numéro de téléphone reçu:', phone)
  }
})

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.register-complete {
  align-items: center;
  background-color: var(--bg-color);
  display: flex;
  height: 100vh;
  position: relative;
  width: 100%;
}

.register-complete .section {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 640px;
  background: var(--card-bg);
}

.register-complete .header-navigation {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  height: 96px;
  padding: 32px;
  position: relative;
  width: 100%;
}

/* Bouton de retour mobile */
.register-complete .mobile-back-button {
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

.register-complete .mobile-back-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}

.register-complete .mobile-back-button svg {
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

.register-complete .container {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  padding: 0px 32px;
  position: relative;
  width: 100%;
}

.register-complete .content {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 32px;
  position: relative;
  width: 360px;
}

.register-complete .frame {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 32px;
  position: relative;
  width: 100%;
}

.register-complete .div {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 8px;
  position: relative;
  width: 100%;
}

.register-complete .text-wrapper {
  align-self: stretch;
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin-top: -1px;
  position: relative;
}

.register-complete .p {
  align-self: stretch;
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  position: relative;
}

.register-complete .frame-2 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
}

.register-complete .text {
  align-self: stretch;
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-top: -1px;
  position: relative;
}

.register-complete .input-form {
  align-items: center;
  align-self: stretch;
  background-color: var(--card-bg);
  border: 1px solid #d1d5db;
  border-radius: 12px;
  display: flex;
  flex: 0 0 auto;
  gap: 12px;
  padding: 12px;
  position: relative;
  width: 100%;
}

.register-complete .text-2 {
  color: var(--text-color);
  flex: 1;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-top: -1px;
  position: relative;
  border: none;
  outline: none;
  background: transparent;
}

.register-complete .text-2::placeholder {
  color: var(--text-color);
  opacity: 0.6;
}

.register-complete .password {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 8px;
  position: relative;
  width: 100%;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
}

.icon-instance-node {
  width: 24px;
  height: 24px;
}

.register-complete .indicator {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.register-complete .text-3 {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.register-complete .text-3.weak {
  color: #ef4444;
}

.register-complete .text-3.medium {
  color: #f59e0b;
}

.register-complete .text-3.strong {
  color: #10b981;
}

.register-complete .pagination {
  align-items: flex-start;
  display: flex;
  gap: 4px;
  height: 4px;
  position: relative;
  width: 151px;
}

.register-complete .page {
  align-self: stretch;
  border-radius: 90px;
  flex: 1;
  flex-grow: 1;
  position: relative;
}

.register-complete .page-active {
  background-color: #10b981;
}

.register-complete .page-inactive {
  background-color: #e5e7eb;
}

.register-complete .button-group {
  all: unset;
  align-items: flex-start;
  align-self: stretch;
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
}

.register-complete .button {
  all: unset;
  align-items: center;
  align-self: stretch;
  background-color: #409eff;
  border: 1px solid #409eff;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
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

.register-complete .button:hover:not(:disabled) {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.register-complete .button:disabled {
  background-color: #9ca3af;
  border-color: #9ca3af;
  cursor: not-allowed;
}

.register-complete .button-2 {
  all: unset;
  box-sizing: border-box;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.register-complete .footer {
  align-items: flex-end;
  align-self: stretch;
  background-color: transparent;
  display: flex;
  height: 96px;
  padding: 32px;
  position: relative;
  width: 100%;
}

.register-complete .text-4 {
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.register-complete .section-2 {
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
}

.register-complete .navigation-buttons {
  position: absolute;
  bottom: 56px;
  right: 56px;
  display: flex;
  gap: 16px;
  z-index: 10;
}

.register-complete .nav-arrow {
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

.register-complete .nav-arrow:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
}

.register-complete .nav-arrow svg {
  width: 24px;
  height: 24px;
}

.register-complete .quote {
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 500;
  left: 56px;
  line-height: 32px;
  position: absolute;
  top: 359px;
  width: 688px;
}

.register-complete .name-and-text {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 12px;
  left: 56px;
  position: absolute;
  top: 141px;
  width: 688px;
}

.register-complete .name {
  align-self: stretch;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  margin-top: -1px;
  position: relative;
}

/* Responsive */
@media (max-width: 1024px) {
  .register-complete {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }

  .register-complete .section {
    width: 100%;
    min-height: auto;
    height: auto;
    order: 2;
    justify-content: flex-start;
    gap: 0;
  }

  .register-complete .section-2 {
    display: none;
  }
  
  .register-complete .footer {
    margin-top: auto;
  }
  
  /* Afficher le bouton de retour en mode mobile */
  .register-complete .mobile-back-button {
    display: flex;
  }
  
  /* Masquer le logo en mode mobile */
  .register-complete .logo {
    display: none;
  }
  
  .register-complete .quote,
  .register-complete .name-and-text {
    display: none;
  }

  .register-complete .navigation-buttons {
    position: absolute;
    bottom: 20px;
    right: 20px;
    gap: 12px;
  }

  .register-complete .nav-arrow {
    width: 40px;
    height: 40px;
  }

  .register-complete .nav-arrow svg {
    width: 20px;
    height: 20px;
  }
}
</style>