<template>
  <div class="dash">
    <div class="header">
      <h2>{{ t('dashboardTitle') }}</h2>
      <div class="user-info">
        <span class="welcome-text">{{ t('welcome') }}, {{ userName }}!</span>
        <el-button type="danger" @click="onLogout">{{ t('logout') }}</el-button>
      </div>
    </div>
    <div class="dashboard-content">
      <el-card class="user-card">
        <template #header>
          <div class="card-header">
            <span>{{ t('userInfo') }}</span>
          </div>
        </template>
        <div class="user-details" v-if="userInfo">
          <p><strong>{{ t('firstName') }}:</strong> {{ userInfo.firstName || t('notProvided') }}</p>
          <p><strong>{{ t('lastName') }}:</strong> {{ userInfo.lastName || t('notProvided') }}</p>
          <p><strong>{{ t('email') }}:</strong> {{ userInfo.email || t('notProvided') }}</p>
          <p><strong>{{ t('phoneNumber') }}:</strong> {{ userInfo.phoneNumber || t('notProvided') }}</p>
          <p><strong>{{ t('age') }}:</strong> {{ userInfo.age || t('notProvided') }}</p>
        </div>
        <div v-else>
          <p>{{ t('loadingUserInfo') }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { t as T } from '@/i18n'

const t = (key: Parameters<typeof T>[0]) => T(key)

const store = useStore()
const router = useRouter()

// Getters pour les informations utilisateur
const userInfo = computed(() => store.getters['user/userInfo'])
const userName = computed(() => store.getters['user/userName'])
const isAuthenticated = computed(() => store.getters['user/isAuthenticated'])

const onLogout = async () => {
  await store.dispatch('user/logout')
  router.replace('/login')
}

// Récupérer les informations utilisateur au chargement
onMounted(async () => {
  if (isAuthenticated.value && !userInfo.value) {
    try {
      await store.dispatch('user/fetchUserInfo')
    } catch (error) {
      console.error('Failed to fetch user info:', error)
    }
  }
})
</script>
<style scoped>
.header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 2rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.welcome-text {
  font-size: 1.1rem;
  color: var(--text-color);
}

.dashboard-content {
  max-width: 800px;
  margin: 0 auto;
}

.user-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color, #e4e7ed);
}

.card-header {
  font-weight: 600;
  color: var(--text-color);
}

.user-details p {
  margin: 0.5rem 0;
  color: var(--text-color);
}

.user-details strong {
  color: var(--label-color);
  min-width: 120px;
  display: inline-block;
}
</style>


