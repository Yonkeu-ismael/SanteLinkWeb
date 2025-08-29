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
                <el-form-item prop="phoneOrEmail" :label="t('emailOrUsername')" name="phoneOrEmail">
                  <el-input v-model="loginForm.phoneOrEmail" />
                </el-form-item>
                <el-form-item prop="password" :label="t('password')">
                  <el-input v-model="loginForm.password" name="password" type="password" show-password />
                </el-form-item>
                <div class="forgot-inline">
                  <a class="appActionLink forgot-link" @click="forgotPassword">{{ t('forgot') }}</a>
                </div>
                <el-form-item class="my-3">
                  <el-button :loading="loading" @click="logIn" class="appMainButton" style="width: 100% !important">
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
                    <span class="social-text"> {{ t('SignGoogle') }}</span>
                  </button>
                  <button type="button" class="social-btn apple-btn" @click="signInWithApple">
                    <span class="social-icon" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 448 512" fill="#fff">
                        <path d="M350.6 129.5c-17.6 20.8-46.2 36.9-73.6 34.7-3.6-26.2 10.4-54.3 26.6-71.3 18.7-20.5 51.1-35.9 77.4-36.9 3.3 26.9-9.1 54.5-30.4 73.5zM400 336.3c-5.9 13-8.7 19-16.2 31-10.5 17-25.3 38.3-43.6 38.4-16.4.1-20.6-10.9-43.1-10.8-22.5.1-27 10.9-43.4 10.8-18.3-.1-32.3-19.6-42.8-36.6-29.4-46.5-51.8-131.7-21.6-189.2 15-28.4 41.7-46.4 71.1-46.6 16.6-.2 32.4 11.3 43.1 11.3 10.6 0 29.7-13.9 50.2-11.8 8.6.4 32.7 3.5 48.1 26.6-1.3.8-28.8 16.8-28.8 49.9.1 39.9 32.8 53.2 33 53.3-.2.5-5.1 17.7-12.5 33.7z"/>
                      </svg>
                    </span>
                    <span class="social-text" style="color:#fff;">{{ t('SignApple') }}</span>
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
  phoneOrEmail: '',
  password: ''
})

const formRef = ref<any>(null)
const formRefRegister = ref<any>(null)
const t = (key: Parameters<typeof T>[0]) => T(key)
const rules = {
  phoneOrEmail: [
    { required: true, message: computed(() => t('emailRequired')).value, trigger: 'blur' }
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
    const identifier = loginForm.value.phoneOrEmail.trim()
    const payload = identifier.includes('@') ? { email: identifier, password: loginForm.value.password } : { phoneNumber: identifier, password: loginForm.value.password }
    const ok = await store.dispatch('user/login', payload)
    if (ok) {
      setLang(lang.value)
      ElMessage.success(t('welcome'))
      router.push({ path: '/' })
    } else {
      ElMessage.error(t('badCreds'))
    }
  } catch (e) {
    ElMessage.error(t('error'))
  } finally {
    loading.value = false
  }
}

const forgotPassword = () => {
  ElMessage.info('Fonctionnalité à venir')
}

const toggleTheme = () => {
  const theme = isDark.value ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
  document.documentElement.setAttribute('data-theme', theme)
}

const signInWithGoogle = () => {
  ElMessage.info('Google Sign-In à venir')
}

const signInWithApple = () => {
  ElMessage.info('Apple Sign-In à venir')
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
  } catch (e) {
    ElMessage.error(t('error'))
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
.forgot-inline { display: flex; justify-content: flex-end; margin-top: -6px; }
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
.appMainButton {
  background-color: $primary-color !important;
  border-color: $primary-color !important;
  color: #fff !important;
}
.appMainButton:hover,
.appMainButton:focus,
.appMainButton:active,
.appMainButton.is-active,
.appMainButton.is-hover {
  background-color: $primary-color !important;
  border-color: $primary-color !important;
  color: #fff !important;
}
</style>
