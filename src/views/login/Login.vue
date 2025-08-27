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
            <h3 class="title">SantéLink</h3>
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
            <h4 style="text-align: center" class="mb-2 connextion-title title">{{ t('title') }}</h4>
            <el-form ref="formRef" :model="loginForm" :rules="rules" label-position="top" @submit.prevent>
              <el-form-item prop="username" :label="t('email')" name="username">
                <el-input v-model="loginForm.username" />
              </el-form-item>
              <el-form-item prop="password" :label="t('password')">
                <el-input v-model="loginForm.password" name="password" type="password" show-password />
              </el-form-item>
              <el-form-item class="my-3">
                <el-button :loading="loading" @click="logIn" class="appMainButton" style="width: 100% !important">
                  {{ t('login') }}
                </el-button>
              </el-form-item>
              <el-form-item>
                <div class="form-actions">
                  <a class="appActionLink" @click="forgotPassword">{{ t('forgot') }}</a>
                  <el-select v-model="lang" class="lang-select" size="small" @change="onLangChange" style="width: 120px;">
                    <el-option label="Français" value="fr" />
                    <el-option label="English" value="en" />
                  </el-select>
                </div>
              </el-form-item>
            </el-form>
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

const loginForm = ref({
  username: '',
  password: ''
})

const formRef = ref<any>(null)
const t = (key: Parameters<typeof T>[0]) => T(key)
const rules = {
  username: [
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
    const ok = await store.dispatch('user/login', { username: loginForm.value.username, password: loginForm.value.password })
    if (ok) {
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
