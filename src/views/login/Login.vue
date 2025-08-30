<template>
  <div class="container">
    <div class="login-form">
      <el-row :gutter="20" justify="center">
        <el-col :span="24">
          <div class="logo-wrapper">
            <div class="vue-logo" aria-hidden="true">
              <svg viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
                <path d="M130.88 0L98.16 56.67 65.44 0H0l98.16 170.02L196.32 0h-65.44z" fill="#41b883"/>
                <path d="M130.88 0L98.16 56.67 65.44 0H39.26l58.9 102.06L157.06 0h-26.18z" fill="#35495e"/>
              </svg>
            </div>
            <h3 class="title">SanteLink</h3>
            <el-switch
              v-model="isDark"
              active-text="Sombre"
              inactive-text="Clair"
              inline-prompt
              @change="toggleTheme"
            />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" justify="center">
        <el-col :span="24">
          <el-card class="login-card">
            <template v-if="!showRegister">
              <h4 style="text-align: center" class="mb-2 connextion-title title">{{ t('title') }}</h4>
              <el-form ref="formRef" :model="loginForm" :rules="rules" label-position="top" @submit.prevent>
                <el-form-item prop="email" :label="t('email')" name="email">
                  <el-input v-model="loginForm.email" />
                </el-form-item>
                <el-form-item prop="password" :label="t('password')">
                  <el-input v-model="loginForm.password" name="password" type="password" show-password />
                </el-form-item>
                <div class="forgot-inline">
                  <a class="appActionLink forgot-link" @click="forgotPassword">{{ t('forgot') }}</a>
                </div>
                <el-form-item class="my-3">
                  <el-button :loading="loading" @click="logIn" class="main-login-btn" style="width: 100% !important">
                    {{ t('login') }}
                  </el-button>
                </el-form-item>
                <div class="social-buttons">
                  <button type="button" class="social-btn google-btn" @click="signInWithGoogle">
                    <span class="social-icon" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.6 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.5 6.1 28.9 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
                        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.4 18.9 14 24 14c3 0 5.7 1.1 7.8 3l5.7-5.7C33.5 6.1 28.9 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
                        <path fill="#4CAF50" d="M24 44c5.3 0 10.2-2 13.8-5.2l-6.4-5.2C29.4 36 26.9 37 24 37c-5.3 0-9.8-3.4-11.4-8.1l-6.6 5.1C8.2 39.7 15.5 44 24 44z"/>
                        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.9-3.1 5.2-5.8 6.6l.1.1 6.4 5.2c-.5.5 8-4.7 8-15.9 0-1.2-.1-2.3-.4-3.5z"/>
                      </svg>
                    </span>
                    <span class="social-text">Sign in with Google</span>
                  </button>
                  <button type="button" class="social-btn apple-btn" @click="signInWithApple">
                    <span class="social-icon" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 448 512" fill="#fff">
                        <path d="M350.6 129.5c-17.6 20.8-46.2 36.9-73.6 34.7-3.6-26.2 10.4-54.3 26.6-71.3 18.7-20.5 51.1-35.9 77.4-36.9 3.3 26.9-9.1 54.5-30.4 73.5zM400 336.3c-5.9 13-8.7 19-16.2 31-10.5 17-25.3 38.3-43.6 38.4-16.4.1-20.6-10.9-43.1-10.8-22.5.1-27 10.9-43.4 10.8-18.3-.1-32.3-19.6-42.8-36.6-29.4-46.5-51.8-131.7-21.6-189.2 15-28.4 41.7-46.4 71.1-46.6 16.6-.2 32.4 11.3 43.1 11.3 10.6 0 29.7-13.9 50.2-11.8 8.6.4 32.7 3.5 48.1 26.6-1.3.8-28.8 16.8-28.8 49.9.1 39.9 32.8 53.2 33 53.3-.2.5-5.1 17.7-12.5 33.7z"/>
                      </svg>
                    </span>
                    <span class="social-text" style="color:#fff;">Sign in with Apple</span>
                  </button>
                </div>
                <el-form-item>
                  <div class="form-actions actions-row">
                    <div>
                      <span class="muted">{{ t('noAccount') }} </span>
                      <a class="register-link" @click="showRegister = true">{{ t('register') }}</a>
                    </div>
                  </div>
                  <div class="form-actions language-row">
                    <el-select v-model="lang" class="lang-select" size="small" @change="onLangChange" style="width: 120px;">
                      <el-option label="Français" value="fr" />
                      <el-option label="English" value="en" />
                    </el-select>
                  </div>
                </el-form-item>
              </el-form>
            </template>
            <template v-else>
              <h4 style="text-align: center" class="mb-2 connextion-title title">{{ t('registerTitle') }}</h4>
              <el-form ref="formRefRegister" :model="registerForm" :rules="rulesRegister" label-position="top" @submit.prevent>
                <el-form-item prop="firstName" :label="t('firstName')">
                  <el-input v-model="registerForm.firstName" />
                </el-form-item>
                <el-form-item prop="lastName" :label="t('lastName')">
                  <el-input v-model="registerForm.lastName" />
                </el-form-item>
                <el-form-item prop="email" :label="t('email')" name="email">
                  <el-input v-model="registerForm.email" />
                </el-form-item>
                <el-form-item prop="phoneNumber" :label="t('phoneNumber')">
                  <el-input v-model="registerForm.phoneNumber" />
                </el-form-item>
                <el-form-item prop="password" :label="t('password')">
                  <el-input v-model="registerForm.password" name="password" type="password" show-password />
                </el-form-item>
                <el-form-item prop="confirmPassword" :label="t('confirmPassword')">
                  <el-input v-model="registerForm.confirmPassword" name="confirmPassword" type="password" show-password />
                </el-form-item>
                <el-form-item prop="age" :label="t('age')">
                  <el-input v-model.number="registerForm.age" type="number" min="0" />
                </el-form-item>
                <el-form-item class="my-3">
                  <el-button :loading="loading" @click="register" class="appMainButton" style="width: 100% !important">
                    {{ t('register') }}
                  </el-button>
                </el-form-item>
                <el-form-item>
                  <div class="form-actions">
                    <div class="left-actions">
                      <a class="appActionLink" @click="showRegister = false">{{ t('login') }}</a>
                    </div>
                    <el-select v-model="lang" class="lang-select" size="small" @change="onLangChange" style="width: 120px;">
                      <el-option label="Français" value="fr" />
                      <el-option label="English" value="en" />
                    </el-select>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <!-- Dialog de sélection de méthode de réinitialisation -->
    <el-dialog
      v-model="showResetMethodDialog"
      :title="t('forgot')"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
    >
      <div class="reset-method-dialog">
        <p class="reset-method-text">{{ t('selectResetMethod') }}</p>
        <div class="reset-method-buttons">
          <el-button 
            type="primary" 
            size="large" 
            class="reset-method-btn email-btn"
            @click="selectResetMethod('email')"
          >
            <i class="el-icon-message"></i>
            {{ t('resetByEmail') }}
          </el-button>
          <el-button 
            type="primary" 
            size="large" 
            class="reset-method-btn phone-btn"
            @click="selectResetMethod('phone')"
          >
            <i class="el-icon-phone"></i>
            {{ t('resetByPhone') }}
          </el-button>
        </div>
      </div>
    </el-dialog>
    
    <!-- Dialog de réinitialisation de mot de passe -->
    <el-dialog
      v-model="showResetPassword"
      :title="resetMethod === 'email' ? t('resetByEmail') : t('resetByPhone')"
      width="450px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="formRef" :model="resetPasswordForm" :rules="resetPasswordRules" label-position="top" @submit.prevent>
        <!-- Champ email ou téléphone selon la méthode -->
        <el-form-item v-if="resetMethod === 'email'" prop="email" :label="t('email')" name="email">
          <el-input v-model="resetPasswordForm.email" />
        </el-form-item>
        <el-form-item v-else prop="phoneNumber" :label="t('phoneNumber')" name="phoneNumber">
          <el-input v-model="resetPasswordForm.phoneNumber" />
        </el-form-item>
        
        <!-- Bouton d'envoi OTP -->
        <el-form-item>
          <el-button @click="sendOtp" :loading="loading" class="otp-btn" style="width: 100% !important">
            {{ t('sendOtp') }}
          </el-button>
        </el-form-item>
        
        <!-- Champ code OTP -->
        <el-form-item prop="otpCode" :label="t('otpCode')" name="otpCode">
          <el-input v-model="resetPasswordForm.otpCode" placeholder="123456" maxlength="6" />
        </el-form-item>
        
                        <!-- Nouveau mot de passe -->
                <el-form-item prop="newPassword" :label="t('newPassword')">
                  <el-input v-model="resetPasswordForm.newPassword" name="newPassword" type="password" show-password />
                </el-form-item>
        <el-form-item prop="confirmNewPassword" :label="t('confirmPassword')">
          <el-input v-model="resetPasswordForm.confirmNewPassword" name="confirmNewPassword" type="password" show-password />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showResetPassword = false">{{ t('cancel') }}</el-button>
          <el-button type="primary" :loading="loading" @click="resetPassword">
            {{ t('resetButton') }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
  
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { t as T, setLang, currentLang } from '@/i18n'

const store = useStore()
const router = useRouter()
const loading = ref(false)
const isDark = ref((localStorage.getItem('theme') || 'light') === 'dark')
const lang = ref<'fr' | 'en'>(currentLang.value)
const showRegister = ref(false)

const loginForm = ref({
  email: '',
  password: ''
})

const formRef = ref<any>(null)
const formRefRegister = ref<any>(null)
const t = (key: Parameters<typeof T>[0]) => T(key)

// Fonction pour traduire les messages d'erreur de l'API
const translateErrorMessage = (message: string) => {
  const lowerMessage = message.toLowerCase()
  
  // Messages d'erreur courants
  if (lowerMessage.includes('bad credentials') || lowerMessage.includes('mauvais identifiants')) {
    return t('badCreds')
  }
  if (lowerMessage.includes('user not found') || lowerMessage.includes('utilisateur non trouvé')) {
    return t('emailIncorrect')
  }
  if (lowerMessage.includes('invalid password') || lowerMessage.includes('mot de passe invalide')) {
    return t('passwordIncorrect')
  }
  if (lowerMessage.includes('email already exists') || lowerMessage.includes('email existe déjà')) {
    return t('emailExists')
  }
  if (lowerMessage.includes('phone already exists') || lowerMessage.includes('téléphone existe déjà')) {
    return t('phoneExists')
  }
  if (lowerMessage.includes('invalid otp') || lowerMessage.includes('otp invalide')) {
    return t('otpIncorrect')
  }
  if (lowerMessage.includes('expired') || lowerMessage.includes('expiré')) {
    return t('otpExpired')
  }
  if (lowerMessage.includes('wrong data provided')) {
    return t('wrongDataProvided')
  }
  if (lowerMessage.includes('logtimestamp') || lowerMessage.includes('ne doit pas être nul')) {
    return t('serverError')
  }
  if (lowerMessage.includes('nullpointerexception') || lowerMessage.includes('authenticationlog')) {
    return t('serverError')
  }
  
  // Si aucun message spécifique n'est trouvé, retourner le message original
  return message
}
const rules = {
  email: [
    { required: true, message: computed(() => t('emailRequired')).value, trigger: 'blur' },
    { type: 'email', message: computed(() => t('emailInvalid')).value, trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: computed(() => t('passwordRequired')).value, trigger: 'blur' },
    { min: 6, message: computed(() => t('passwordMin')).value, trigger: 'blur' }
  ]
}

const onLangChange = () => {
  setLang(lang.value)
}

onMounted(() => {
  document.documentElement.setAttribute('lang', lang.value)
})

const logIn = async () => {
  const form = formRef.value
  if (!form) return
  try {
    loading.value = true
    const valid = await form.validate()
    if (!valid) { loading.value = false; return }
    
    // Validation des champs
    if (!loginForm.value.email.trim()) {
      ElMessage.error(t('emailRequired'))
      return
    }
    if (!loginForm.value.password.trim()) {
      ElMessage.error(t('passwordRequired'))
      return
    }
    
    const payload = {
      email: loginForm.value.email.trim(),
      password: loginForm.value.password
    }
    
    // Debug: afficher les données de connexion
    console.log('Login payload:', payload)
    console.log('Email length:', payload.email.length)
    console.log('Password length:', payload.password.length)
    console.log('Email format valid:', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
    
    const ok = await store.dispatch('user/login', payload)
    
    // Debug: afficher le résultat de la connexion
    console.log('Login result:', ok)
    
    if (ok) {
      setLang(lang.value)
      ElMessage.success(t('welcome'))
      router.push({ path: '/' })
    } else {
      ElMessage.error(t('badCreds'))
    }
  } catch (e: any) {
    console.error('Login error:', e)
    console.error('Login error response:', e?.response)
    console.error('Login error data:', e?.response?.data)
    console.error('Login error status:', e?.response?.status)
    
    // Gestion des erreurs spécifiques
    let errorMessage = e?.response?.data?.message || e?.message || t('error')
    
    // Gestion des erreurs 500 (problèmes serveur)
    if (e?.response?.status === 500) {
      errorMessage = t('serverError')
    } else {
      // Gestion des erreurs de validation (objets avec plusieurs champs)
      if (e?.response?.data && typeof e.response.data === 'object') {
        const errorData = e.response.data
        // Chercher le premier message d'erreur dans l'objet
        const firstError = Object.values(errorData).find(value => typeof value === 'string')
        if (firstError) {
          errorMessage = firstError as string
        }
      }
    }
    
    console.error('Translated error message:', translateErrorMessage(errorMessage))
    ElMessage.error(translateErrorMessage(errorMessage))
  } finally {
    loading.value = false
  }
}

const showResetPassword = ref(false)
const showResetMethodDialog = ref(false)
const resetMethod = ref<'email' | 'phone'>('email')
const resetPasswordForm = ref({
  email: '',
  phoneNumber: '',
  otpCode: '',
  newPassword: '',
  confirmNewPassword: ''
})

const resetPasswordRules = {
  email: [
    { required: true, message: computed(() => t('emailRequired')).value, trigger: 'blur' },
    { type: 'email', message: computed(() => t('emailInvalid')).value, trigger: ['blur', 'change'] }
  ],
  phoneNumber: [
    { required: true, message: computed(() => t('phoneRequired')).value, trigger: 'blur' }
  ],
  otpCode: [
    { required: true, message: computed(() => t('otpRequired')).value, trigger: 'blur' },
    { min: 4, max: 6, message: computed(() => t('otpInvalid')).value, trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: computed(() => t('passwordRequired')).value, trigger: 'blur' },
    { min: 6, message: computed(() => t('passwordMin')).value, trigger: 'blur' }
  ],
  confirmNewPassword: [
    { required: true, message: computed(() => t('confirmPasswordRequired')).value, trigger: 'blur' },
    {
      validator: (_: any, value: string, callback: Function) => {
        if (value !== resetPasswordForm.value.newPassword) {
          callback(new Error(t('passwordsNotMatch')))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }
  ]
}

const forgotPassword = () => {
  showResetMethodDialog.value = true
}

const selectResetMethod = (method: 'email' | 'phone') => {
  resetMethod.value = method
  showResetMethodDialog.value = false
  showResetPassword.value = true
}

const sendOtp = async () => {
  try {
    loading.value = true
    let response
    
    // Validation des champs avant envoi
    if (resetMethod.value === 'email') {
      if (!resetPasswordForm.value.email.trim()) {
        ElMessage.error(t('emailRequired'))
        return
      }
      response = await store.dispatch('user/sendOtpEmail', { email: resetPasswordForm.value.email.trim() })
    } else {
      if (!resetPasswordForm.value.phoneNumber.trim()) {
        ElMessage.error(t('phoneRequired'))
        return
      }
      response = await store.dispatch('user/sendOtpPhone', { phoneNumber: resetPasswordForm.value.phoneNumber.trim() })
    }
    
    // Debug: afficher la réponse de l'API
    console.log('Send OTP response:', response)
    
    // Gestion des réponses selon la méthode
    if (resetMethod.value === 'email') {
      if (response && !response.message && !response.error) {
        ElMessage.success(t('otpSent'))
      } else if (response?.message) {
        ElMessage.warning(translateErrorMessage(response.message))
      } else {
        ElMessage.error(t('otpSendError'))
      }
    } else {
      // Pour le téléphone, l'endpoint GET peut retourner différentes réponses
      if (response && !response.error) {
        ElMessage.success(t('otpSent'))
      } else if (response?.message) {
        ElMessage.warning(translateErrorMessage(response.message))
      } else {
        ElMessage.error(t('otpSendError'))
      }
    }
  } catch (e: any) {
    console.error('Send OTP error:', e)
    const errorMessage = e?.response?.data?.message || e?.message || t('otpSendError')
    
    // Gestion spécifique pour les erreurs de téléphone
    if (resetMethod.value === 'phone') {
      if (e?.response?.status === 404) {
        ElMessage.error(t('phoneNotFound'))
      } else if (e?.response?.status === 400) {
        ElMessage.error(translateErrorMessage(errorMessage))
      } else {
        ElMessage.error(translateErrorMessage(errorMessage))
      }
    } else {
      ElMessage.error(translateErrorMessage(errorMessage))
    }
  } finally {
    loading.value = false
  }
}

const resetPassword = async () => {
  const form = formRef.value
  if (!form) return
  try {
    loading.value = true
    const valid = await form.validate()
    if (!valid) { loading.value = false; return }
    
    // D'abord vérifier le code OTP
    const otpPayload = resetMethod.value === 'email' 
      ? {
          email: resetPasswordForm.value.email,
          otpCode: resetPasswordForm.value.otpCode
        }
      : {
          phoneNumber: resetPasswordForm.value.phoneNumber,
          otpCode: resetPasswordForm.value.otpCode
        }
    
    // Vérifier l'OTP selon la méthode
    const otpResponse = resetMethod.value === 'email' 
      ? await store.dispatch('user/verifyEmailOtp', otpPayload)
      : await store.dispatch('user/verifyOtp', otpPayload)
    
    console.log('OTP verification response:', otpResponse)
    console.log('OTP response has message:', !!otpResponse?.message)
    console.log('OTP response has error:', !!otpResponse?.error)
    
    // Vérifier si l'OTP est valide (pas d'erreur et pas de message d'erreur)
    if (otpResponse && !otpResponse.error && (!otpResponse.message || otpResponse.message.includes('successfully'))) {
      // OTP valide, maintenant réinitialiser le mot de passe selon la méthode
      const resetPayload = resetMethod.value === 'email' 
        ? {
            email: resetPasswordForm.value.email.trim(),
            otpCode: resetPasswordForm.value.otpCode.trim(),
            newPassword: resetPasswordForm.value.newPassword
          }
        : {
            phoneNumber: resetPasswordForm.value.phoneNumber.trim(),
            otpCode: resetPasswordForm.value.otpCode.trim(),
            newPassword: resetPasswordForm.value.newPassword
          }
      
      // Vérifier que toutes les valeurs requises sont présentes
      if (resetMethod.value === 'email') {
        if (!resetPayload.email || !resetPayload.otpCode || !resetPayload.newPassword) {
          ElMessage.error(t('missingRequiredFields'))
          return
        }
      } else {
        if (!resetPayload.phoneNumber || !resetPayload.otpCode || !resetPayload.newPassword) {
          ElMessage.error(t('missingRequiredFields'))
          return
        }
      }
      
      console.log('OTP valid, proceeding with password reset. Payload:', resetPayload)
      console.log('Reset method:', resetMethod.value)
      console.log('Form values:', {
        email: resetPasswordForm.value.email,
        phoneNumber: resetPasswordForm.value.phoneNumber,
        otpCode: resetPasswordForm.value.otpCode,
        newPassword: resetPasswordForm.value.newPassword
      })
      
      // Afficher un message indiquant que la réinitialisation est en cours
      ElMessage.info(t('resettingPassword'))
      
      // Utiliser le bon endpoint selon la méthode
      const response = resetMethod.value === 'email' 
        ? await store.dispatch('user/resetPasswordByEmail', resetPayload)
        : await store.dispatch('user/resetPassword', resetPayload)
      
      // Debug: afficher la réponse de l'API
      console.log('Reset password response:', response)
      
      // Si la réponse existe et n'a pas de message d'erreur, c'est un succès
      if (response && !response.message && !response.error) {
        ElMessage.success(t('passwordResetSuccess'))
        
        // Sauvegarder l'email avant de vider le formulaire
        const emailToFill = resetMethod.value === 'email' ? resetPasswordForm.value.email : ''
        
        showResetPassword.value = false
        resetPasswordForm.value = { email: '', phoneNumber: '', otpCode: '', newPassword: '', confirmNewPassword: '' }
        
        // Redirection vers le formulaire de connexion après 2 secondes
        setTimeout(() => {
          showResetMethodDialog.value = false
          // Pré-remplir l'email dans le formulaire de connexion
          loginForm.value.email = emailToFill
        }, 2000)
      } else if (response?.message) {
        ElMessage.warning(translateErrorMessage(response.message))
      } else {
        ElMessage.error(t('passwordResetError'))
      }
            } else if (otpResponse?.message) {
          // Gestion spécifique pour l'expiration OTP
          if (otpResponse.message.includes('expired') || otpResponse.isValid === false) {
            ElMessage.error(t('otpExpired'))
            // Vider le champ OTP pour permettre un nouveau code
            resetPasswordForm.value.otpCode = ''
            // Afficher un message pour inviter à renvoyer le code
            ElMessage.info(t('requestNewOtp'))
          } else {
            ElMessage.error(translateErrorMessage(otpResponse.message))
          }
    } else {
      ElMessage.error(t('otpIncorrect'))
    }
  } catch (e: any) {
    const errorMessage = e?.response?.data?.message || e?.message || t('passwordResetError')
    ElMessage.error(translateErrorMessage(errorMessage))
  } finally {
    loading.value = false
  }
}

const toggleTheme = () => {
  const theme = isDark.value ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
  document.documentElement.setAttribute('data-theme', theme)
}

const signInWithGoogle = () => {
  ElMessage.info(t('googleSignInComing'))
}

const signInWithApple = () => {
  ElMessage.info(t('appleSignInComing'))
}

const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  age: undefined as number | undefined
})

const rulesRegister = {
  firstName: [
    { required: true, message: computed(() => t('firstNameRequired')).value, trigger: 'blur' }
  ],
  lastName: [
    { required: true, message: computed(() => t('lastNameRequired')).value, trigger: 'blur' }
  ],
  email: [
    { required: true, message: computed(() => t('emailRequired')).value, trigger: 'blur' },
    { type: 'email', message: computed(() => t('emailInvalid')).value, trigger: ['blur', 'change'] }
  ],
  phoneNumber: [
    { required: true, message: computed(() => t('phoneRequired')).value, trigger: 'blur' }
  ],
  password: [
    { required: true, message: computed(() => t('passwordRequired')).value, trigger: 'blur' },
    { min: 6, message: computed(() => t('passwordMin')).value, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: computed(() => t('confirmPasswordRequired')).value, trigger: 'blur' },
    {
      validator: (_: any, value: string, callback: Function) => {
        if (value !== registerForm.value.password) {
          callback(new Error(t('passwordsNotMatch')))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    }
  ],
  age: [
    { required: true, message: computed(() => t('ageRequired')).value, trigger: 'blur' },
    {
      validator: (_: any, value: number, callback: Function) => {
        if (!Number.isFinite(value) || value <= 0) return callback(new Error(t('ageInvalid')))
        callback()
      },
      trigger: ['blur', 'change']
    }
  ]
}

const register = async () => {
  const form = formRefRegister.value
  if (!form) return
  try {
    loading.value = true
    const valid = await form.validate()
    if (!valid) { loading.value = false; return }
    const ok = await store.dispatch('user/register', {
      firstName: registerForm.value.firstName,
      lastName: registerForm.value.lastName,
      email: registerForm.value.email,
      phoneNumber: registerForm.value.phoneNumber,
      password: registerForm.value.password,
      age: registerForm.value.age
    })
    if (ok) {
      setLang(lang.value)
      ElMessage.success(t('welcome'))
      router.push({ path: '/' })
    }
  } catch (e: any) {
    console.error('Register error:', e)
    // Gestion des erreurs spécifiques pour l'enregistrement
    const errorMessage = e?.response?.data?.message || e?.message || t('error')
    ElMessage.error(translateErrorMessage(errorMessage))
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--bg-color);
}
.login-form {
  width: 25rem;
}
.login-card {
  min-height: 22rem;
  border-radius: 30px;
  padding: 0 10%;
  background-color: var(--card-bg);
}
.social-buttons { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
.social-btn { width: 100%; height: 44px; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 10px; border: 1px solid #e5e7eb; background: #fff; cursor: pointer; }
.social-btn .social-text { font-weight: 600; color: #1f2937; }
.google-btn { background: #fff; }
.google-btn:hover { background: #f8fafc; }
.apple-btn { background: #111827; border-color: #111827; }
.apple-btn:hover { background: #0b1220; }
.apple-btn .social-text { color: #fff; }
.logo-wrapper {
  margin-bottom: 2rem;
  text-align: center;
}
.vue-logo {
  display: inline-block;
  margin-bottom: 0.5rem;
}
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 12px;
  margin-top: 8px;
  border-top: 1px solid rgba(0,0,0,0.06);
}
.actions-row { justify-content: space-between; }
.language-row { justify-content: flex-end; border-top: none; padding-top: 6px; margin-top: 4px; }
.left-actions {
  display: flex;
  gap: 12px;
}
.left-actions .divider { color: rgba(0,0,0,0.25); }
.appActionLink {
  color: var(--label-color);
  text-decoration: none;
  font-size: 12px;
}
.appActionLink:hover { text-decoration: underline; }
.forgot-link { color: $primary-color; font-weight: 600; }
.forgot-link:hover { text-decoration: underline; }
.muted { color: rgba(0,0,0,0.55); font-size: 12px; margin-right: 6px; }
.register-link { color: $primary-color; font-weight: 600; cursor: pointer; font-size: 12px; }
.register-link:hover { text-decoration: underline; }
.forgot-inline { display: flex; justify-content: flex-end; margin-top: -6px; margin-bottom: 16px; }
.reset-method-selector { text-align: center; }
.reset-method-group { width: 100%; }
.reset-method-group .el-radio-button { width: 50%; }
.otp-btn {
  background-color: #67c23a !important;
  border-color: #67c23a !important;
  color: #fff !important;
  height: 40px;
  border-radius: 6px;
  font-weight: 500;
}
.otp-btn:hover,
.otp-btn:focus,
.otp-btn:active,
.otp-btn.is-active,
.otp-btn.is-hover {
  background-color: #85ce61 !important;
  border-color: #85ce61 !important;
  color: #fff !important;
}
.reset-method-dialog {
  text-align: center;
  padding: 20px 0;
}
.reset-method-text {
  margin-bottom: 30px;
  font-size: 16px;
  color: var(--text-color);
}
.reset-method-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.reset-method-btn {
  height: 50px;
  font-size: 16px;
  border-radius: 8px;
}
.reset-method-btn i {
  margin-right: 10px;
}
.email-btn {
  background-color: #409eff !important;
  border-color: #409eff !important;
}
.email-btn:hover {
  background-color: #66b1ff !important;
  border-color: #66b1ff !important;
}
.phone-btn {
  background-color: #67c23a !important;
  border-color: #67c23a !important;
}
.phone-btn:hover {
  background-color: #85ce61 !important;
  border-color: #85ce61 !important;
}
.dialog-footer {
  text-align: right;
}
.lang-select .el-input__inner {
  text-align: center;
}
.title {
  margin: 0;
}
.connextion-title {
  color: var(--label-color) !important;
  font-weight: bold;
}
.el-form-item__label {
  color: var(--label-color) !important;
}
.main-login-btn {
  background-color: #1A5276 !important;
  border-color: #1A5276 !important;
  color: #fff !important;
  height: 44px;
  border-radius: 8px;
  font-weight: 600;
}
.main-login-btn:hover,
.main-login-btn:focus,
.main-login-btn:active,
.main-login-btn.is-active,
.main-login-btn.is-hover {
  background-color: #1A5276 !important;
  border-color: #1A5276 !important;
  color: #fff !important;
}
</style>
