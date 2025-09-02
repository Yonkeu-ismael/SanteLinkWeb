<template>
  <div class="oauth-callback">
    <div class="loading-container">
      <div class="spinner"></div>
      <p class="loading-text">{{ t('processingAuthentication') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { t as T } from '@/i18n'

const t = (key: Parameters<typeof T>[0]) => T(key)

const router = useRouter()
const route = useRoute()
const store = useStore()

onMounted(async () => {
  try {
    // Cette page n'est plus utilisée avec Google Identity Services
    // Rediriger vers le dashboard ou la page d'accueil
    ElMessage.info(t('googleLoginSuccess'))
    router.push('/dashboard')
    
  } catch (error: any) {
    console.error('Erreur lors du callback OAuth:', error)
    ElMessage.error(t('googleLoginError'))
    
    // Rediriger vers la page de connexion en cas d'erreur
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }
})
</script>

<style scoped>
.oauth-callback {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--bg-color);
}

.loading-container {
  text-align: center;
  padding: 2rem;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #0a4a6f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-text {
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
