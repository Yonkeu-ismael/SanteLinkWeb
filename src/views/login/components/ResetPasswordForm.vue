<template>
  <div class="reset-password-container">
    <!-- Dialog de sélection de méthode de réinitialisation -->
    <el-dialog
      v-model="showResetMethodDialog"
      :title="t('forgot')"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
      class="reset-dialog"
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
      class="reset-dialog"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent>
        <!-- Champ email ou téléphone selon la méthode -->
        <el-form-item v-if="resetMethod === 'email'" prop="email" :label="t('email')" name="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item v-else prop="phoneNumber" :label="t('phoneNumber')" name="phoneNumber">
          <el-input v-model="form.phoneNumber" />
        </el-form-item>
        
        <!-- Bouton d'envoi OTP -->
        <el-form-item>
          <el-button @click="sendOtp" :loading="loading" class="otp-btn" style="width: 100% !important">
            {{ t('sendOtp') }}
          </el-button>
        </el-form-item>
        
        <!-- Champ code OTP -->
        <el-form-item prop="otpCode" :label="t('otpCode')" name="otpCode">
          <el-input v-model="form.otpCode" placeholder="123456" maxlength="6" />
        </el-form-item>
        
        <!-- Nouveau mot de passe -->
        <el-form-item prop="newPassword" :label="t('newPassword')">
          <el-input v-model="form.newPassword" name="newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item prop="confirmNewPassword" :label="t('confirmPassword')">
          <el-input v-model="form.confirmNewPassword" name="confirmNewPassword" type="password" show-password />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button 
            @click="closeResetDialog" 
            class="cancel-btn"
          >
            {{ t('cancel') }}
          </el-button>
          <el-button 
            type="primary" 
            :loading="loading" 
            @click="resetPassword"
            class="reset-btn"
          >
            {{ t('resetButton') }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { t as T } from '@/i18n'

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
  'send-otp': [method: 'email' | 'phone', value: string]
  'reset-password': [form: {
    method: 'email' | 'phone'
    email?: string
    phoneNumber?: string
    otpCode: string
    newPassword: string
  }]
  'close': []
}>()

// Reactive data
const formRef = ref<any>(null)
const showResetMethodDialog = ref(false)
const showResetPassword = ref(false)
const resetMethod = ref<'email' | 'phone'>('email')

const form = ref({
  email: '',
  phoneNumber: '',
  otpCode: '',
  newPassword: '',
  confirmNewPassword: ''
})

// Validation rules
const rules = computed(() => ({
  email: resetMethod.value === 'email' ? [
    { required: true, message: t('emailRequired'), trigger: 'blur' },
    { type: 'email', message: t('emailInvalid'), trigger: ['blur', 'change'] }
  ] : [],
  phoneNumber: resetMethod.value === 'phone' ? [
    { required: true, message: t('phoneRequired'), trigger: 'blur' }
  ] : [],
  otpCode: [
    { required: true, message: t('otpRequired'), trigger: 'blur' },
    { min: 4, max: 6, message: t('otpInvalid'), trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: t('passwordRequired'), trigger: 'blur' },
    { min: 6, message: t('passwordMin'), trigger: 'blur' }
  ],
  confirmNewPassword: [
    { required: true, message: t('confirmPasswordRequired'), trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: Function) => {
        if (value !== form.value.newPassword) {
          callback(new Error(t('passwordsNotMatch')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}))

// Methods
const openResetDialog = () => {
  showResetMethodDialog.value = true
}

const selectResetMethod = (method: 'email' | 'phone') => {
  resetMethod.value = method
  showResetMethodDialog.value = false
  showResetPassword.value = true
  
  // Réinitialiser le formulaire
  form.value = {
    email: '',
    phoneNumber: '',
    otpCode: '',
    newPassword: '',
    confirmNewPassword: ''
  }
}

const sendOtp = async () => {
  const formEl = formRef.value
  if (!formEl) return
  
  try {
    // Valider seulement le champ email/phone
    const fieldToValidate = resetMethod.value === 'email' ? 'email' : 'phoneNumber'
    await formEl.validateField(fieldToValidate)
    
    const value = resetMethod.value === 'email' ? form.value.email.trim() : form.value.phoneNumber.trim()
    
    if (!value) {
      ElMessage.error(t('missingRequiredFields'))
      return
    }
    
    emit('send-otp', resetMethod.value, value)
  } catch (error) {
    console.error('Validation error:', error)
  }
}

const resetPassword = async () => {
  const formEl = formRef.value
  if (!formEl) return
  
  try {
    const valid = await formEl.validate()
    if (!valid) return
    
    const resetData = {
      method: resetMethod.value,
      otpCode: form.value.otpCode,
      newPassword: form.value.newPassword
    }
    
    if (resetMethod.value === 'email') {
      resetData.email = form.value.email.trim()
    } else {
      resetData.phoneNumber = form.value.phoneNumber.trim()
    }
    
    emit('reset-password', resetData)
  } catch (error) {
    console.error('Validation error:', error)
  }
}

const closeResetDialog = () => {
  showResetPassword.value = false
  showResetMethodDialog.value = false
  emit('close')
}

// Expose methods
defineExpose({
  openResetDialog
})
</script>

<style scoped>
.reset-password-container {
  width: 100%;
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
  transition: all 0.3s ease;
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
  padding-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.cancel-btn {
  min-width: 80px;
}

.reset-btn {
  min-width: 100px;
  background-color: #1A5276 !important;
  border-color: #1A5276 !important;
}

.reset-btn:hover {
  background-color: #154360 !important;
  border-color: #154360 !important;
}

.otp-btn {
  background-color: #67c23a !important;
  border-color: #67c23a !important;
  color: #fff !important;
  height: 40px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
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

/* Responsive pour les dialogs de réinitialisation */
@media (max-width: 768px) {
  .reset-method-dialog {
    padding: 20px 0;
  }
  
  .reset-method-text {
    margin-bottom: 25px;
    font-size: 15px;
    line-height: 1.4;
  }
  
  .reset-method-buttons {
    gap: 15px;
  }
  
  .reset-method-btn {
    height: 55px;
    font-size: 16px;
    border-radius: 10px;
  }
  
  .reset-method-btn i {
    margin-right: 12px;
    font-size: 18px;
  }
  
  .dialog-footer {
    text-align: center;
    padding-top: 20px;
    flex-direction: column;
    gap: 12px;
  }
  
  .dialog-footer .el-button {
    width: 100%;
    margin: 0;
    height: 50px;
    font-size: 16px;
    border-radius: 10px;
  }
  
  /* Ajuster la largeur des dialogs sur mobile */
  :deep(.reset-dialog) {
    width: 92% !important;
    max-width: 420px;
    margin: 15px auto !important;
    border-radius: 15px;
  }
  
  :deep(.reset-dialog .el-dialog__body) {
    padding: 25px;
  }
  
  :deep(.reset-dialog .el-dialog__header) {
    padding: 25px 25px 0;
  }
  
  :deep(.reset-dialog .el-dialog__footer) {
    padding: 0 25px 25px;
  }
  
  /* Améliorer l'espacement des formulaires dans les dialogs */
  :deep(.reset-dialog .el-form-item) {
    margin-bottom: 20px;
  }
  
  :deep(.reset-dialog .el-input__inner) {
    height: 48px;
    font-size: 16px;
    border-radius: 8px;
  }
  
  .otp-btn {
    height: 48px;
    font-size: 15px;
    border-radius: 8px;
  }
}

@media (max-width: 480px) {
  .reset-method-dialog {
    padding: 15px 0;
  }
  
  .reset-method-text {
    margin-bottom: 20px;
    font-size: 14px;
  }
  
  .reset-method-buttons {
    gap: 12px;
  }
  
  .reset-method-btn {
    height: 50px;
    font-size: 15px;
    border-radius: 8px;
  }
  
  .reset-method-btn i {
    margin-right: 10px;
    font-size: 16px;
  }
  
  /* Dialog encore plus compact sur très petits écrans */
  :deep(.reset-dialog) {
    width: 96% !important;
    margin: 10px auto !important;
    border-radius: 12px;
  }
  
  :deep(.reset-dialog .el-dialog__body) {
    padding: 20px;
  }
  
  :deep(.reset-dialog .el-dialog__header) {
    padding: 20px 20px 0;
  }
  
  :deep(.reset-dialog .el-dialog__footer) {
    padding: 0 20px 20px;
  }
  
  /* Améliorer l'espacement des formulaires dans les dialogs */
  :deep(.reset-dialog .el-form-item) {
    margin-bottom: 16px;
  }
  
  :deep(.reset-dialog .el-input__inner) {
    height: 45px;
    font-size: 16px;
    border-radius: 6px;
  }
  
  /* Boutons plus grands sur très petits écrans */
  :deep(.reset-dialog .el-button) {
    height: 45px;
    font-size: 15px;
    border-radius: 6px;
  }
  
  .dialog-footer {
    flex-direction: column;
    gap: 10px;
  }
  
  .dialog-footer .el-button {
    width: 100%;
    height: 45px;
    font-size: 15px;
  }
  
  .otp-btn {
    height: 45px;
    font-size: 15px;
    border-radius: 6px;
  }
}

/* Responsive pour très très petits écrans */
@media (max-width: 360px) {
  .reset-method-dialog {
    padding: 10px 0;
  }
  
  .reset-method-text {
    margin-bottom: 15px;
    font-size: 13px;
  }
  
  .reset-method-buttons {
    gap: 10px;
  }
  
  .reset-method-btn {
    height: 45px;
    font-size: 14px;
    border-radius: 6px;
  }
  
  .reset-method-btn i {
    margin-right: 8px;
    font-size: 14px;
  }
  
  :deep(.reset-dialog) {
    width: 98% !important;
    margin: 5px auto !important;
    border-radius: 10px;
  }
  
  :deep(.reset-dialog .el-dialog__body) {
    padding: 15px;
  }
  
  :deep(.reset-dialog .el-dialog__header) {
    padding: 15px 15px 0;
  }
  
  :deep(.reset-dialog .el-dialog__footer) {
    padding: 0 15px 15px;
  }
  
  :deep(.reset-dialog .el-form-item) {
    margin-bottom: 12px;
  }
  
  :deep(.reset-dialog .el-input__inner) {
    height: 42px;
    font-size: 15px;
    border-radius: 5px;
  }
  
  :deep(.reset-dialog .el-button) {
    height: 42px;
    font-size: 14px;
    border-radius: 5px;
  }
  
  .dialog-footer .el-button {
    height: 42px;
    font-size: 14px;
  }
  
  .otp-btn {
    height: 42px;
    font-size: 14px;
    border-radius: 5px;
  }
}
</style>
