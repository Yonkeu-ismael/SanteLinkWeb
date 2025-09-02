<template>
  <div class="register-form-container">
    <h4 style="text-align: center" class="mb-2 connextion-title title">{{ t('registerTitle') }}</h4>
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent>
      <el-form-item prop="firstName" :label="t('firstName')">
        <el-input v-model="form.firstName" />
      </el-form-item>
      <el-form-item prop="lastName" :label="t('lastName')">
        <el-input v-model="form.lastName" />
      </el-form-item>
      <el-form-item prop="email" :label="t('email')" name="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item prop="phoneNumber" :label="t('phoneNumber')">
        <el-input v-model="form.phoneNumber" />
      </el-form-item>
      <el-form-item prop="age" :label="t('age')">
        <el-input-number v-model="form.age" :min="1" :max="120" style="width: 100%" />
      </el-form-item>
      <el-form-item prop="password" :label="t('password')">
        <el-input v-model="form.password" name="password" type="password" show-password />
      </el-form-item>
      <el-form-item prop="confirmPassword" :label="t('confirmPassword')">
        <el-input v-model="form.confirmPassword" name="confirmPassword" type="password" show-password />
      </el-form-item>
      <el-form-item class="my-3">
        <el-button :loading="loading" @click="handleRegister" class="main-register-btn" style="width: 100% !important">
          {{ t('register') }}
        </el-button>
      </el-form-item>
      <el-form-item>
        <div class="form-actions actions-row">
          <div>
            <span class="muted">{{ t('haveAccount') }} </span>
            <a class="login-link" @click="$emit('show-login')">{{ t('login') }}</a>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { t as T, setLang, currentLang } from '@/i18n'

const t = (key: Parameters<typeof T>[0]) => T(key)

// Props
interface Props {
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

// Emits
const emit = defineEmits<{
  register: [form: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    age: number
    password: string
  }]
  'show-login': []
}>()

// Reactive data
const formRef = ref<any>(null)
const lang = ref<'fr' | 'en'>(currentLang.value)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  age: 18,
  password: '',
  confirmPassword: ''
})

// Validation rules
const rules = {
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
  age: [
    { required: true, message: computed(() => t('ageRequired')).value, trigger: 'blur' },
    { type: 'number', min: 1, max: 120, message: computed(() => t('ageInvalid')).value, trigger: 'blur' }
  ],
  password: [
    { required: true, message: computed(() => t('passwordRequired')).value, trigger: 'blur' },
    { min: 6, message: computed(() => t('passwordMin')).value, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: computed(() => t('confirmPasswordRequired')).value, trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value !== form.value.password) {
          callback(new Error(t('passwordsNotMatch')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// Methods
const onLangChange = () => {
  setLang(lang.value)
}

const handleRegister = async () => {
  const formEl = formRef.value
  if (!formEl) return
  
  try {
    const valid = await formEl.validate()
    if (!valid) return
    
    // Nettoyer les espaces
    const cleanForm = {
      firstName: form.value.firstName.trim(),
      lastName: form.value.lastName.trim(),
      email: form.value.email.trim(),
      phoneNumber: form.value.phoneNumber.trim(),
      age: form.value.age,
      password: form.value.password
    }
    
    emit('register', cleanForm)
  } catch (error) {
    console.error('Validation error:', error)
  }
}
</script>

<style scoped>
.register-form-container {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 12px;
  margin-top: 8px;
  border-top: 1px solid rgba(0,0,0,0.06);
  flex-wrap: wrap;
  gap: 8px;
}

.actions-row { 
  justify-content: space-between; 
}

.language-row { 
  justify-content: flex-end; 
  border-top: none; 
  padding-top: 6px; 
  margin-top: 4px; 
}

.muted { 
  color: rgba(0,0,0,0.55); 
  font-size: 12px; 
  margin-right: 6px; 
}

.login-link { 
  color: #2E7D32; 
  font-weight: 600; 
  cursor: pointer; 
  font-size: 12px; 
}

.login-link:hover { 
  text-decoration: underline; 
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

.main-register-btn {
  background-color: #2E7D32 !important;
  border-color: #2E7D32 !important;
  color: #fff !important;
  height: 44px;
  border-radius: 8px;
  font-weight: 600;
}

.main-register-btn:hover,
.main-register-btn:focus,
.main-register-btn:active,
.main-register-btn.is-active,
.main-register-btn.is-hover {
  background-color: #1B5E20 !important;
  border-color: #1B5E20 !important;
  color: #fff !important;
}

/* Responsive pour mobile */
@media (max-width: 768px) {
  .register-form-container {
    padding: 0 10px;
  }
  
  .connextion-title {
    font-size: 18px !important;
    margin-bottom: 20px !important;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
    padding-top: 20px;
  }
  
  .actions-row {
    justify-content: center;
    text-align: center;
  }
  
  .language-row {
    justify-content: center;
  }
  
  .main-register-btn {
    height: 50px !important;
    font-size: 16px;
    border-radius: 10px;
  }
  
  .muted, .login-link {
    font-size: 14px;
  }
  
  .lang-select {
    width: 140px !important;
  }
  
  /* Améliorer l'espacement des champs */
  :deep(.el-form-item) {
    margin-bottom: 18px;
  }
  
  :deep(.el-input__inner) {
    height: 48px;
    font-size: 16px;
  }
  
  :deep(.el-input-number) {
    width: 100%;
  }
}

/* Responsive pour très petits écrans */
@media (max-width: 480px) {
  .register-form-container {
    padding: 0 5px;
  }
  
  .connextion-title {
    font-size: 16px !important;
    margin-bottom: 15px !important;
  }
  
  .form-actions {
    gap: 12px;
    padding-top: 15px;
  }
  
  .main-register-btn {
    height: 48px !important;
    font-size: 16px;
    border-radius: 8px;
  }
  
  .muted, .login-link {
    font-size: 13px;
  }
  
  .lang-select {
    width: 120px !important;
  }
  
  /* Améliorer l'espacement des champs */
  :deep(.el-form-item) {
    margin-bottom: 15px;
  }
  
  :deep(.el-input__inner) {
    height: 45px;
    font-size: 16px;
  }
}

/* Responsive pour très très petits écrans */
@media (max-width: 360px) {
  .register-form-container {
    padding: 0 2px;
  }
  
  .connextion-title {
    font-size: 15px !important;
  }
  
  .main-register-btn {
    height: 45px !important;
    font-size: 15px;
  }
  
  .muted, .login-link {
    font-size: 12px;
  }
  
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
  
  :deep(.el-input__inner) {
    height: 42px;
    font-size: 15px;
  }
}
</style>
