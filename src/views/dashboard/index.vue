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
            <el-button 
              v-if="!userInfo && !loadingUserInfo" 
              type="primary" 
              size="small" 
              @click="loadUserInfo"
              :loading="loadingUserInfo"
            >
              {{ t('refresh') }}
            </el-button>
          </div>
        </template>
        <div class="user-details" v-if="userInfo">
          <p><strong>{{ t('firstName') }}:</strong> {{ userInfo.firstName || t('notProvided') }}</p>
          <p><strong>{{ t('lastName') }}:</strong> {{ userInfo.lastName || t('notProvided') }}</p>
          <p><strong>{{ t('email') }}:</strong> {{ userInfo.email || t('notProvided') }}</p>
          <p><strong>{{ t('phoneNumber') }}:</strong> {{ userInfo.phoneNumber || t('notProvided') }}</p>
          <p><strong>{{ t('age') }}:</strong> {{ userInfo.age || t('notProvided') }}</p>
        </div>
        <div v-else-if="loadingUserInfo" class="loading-state">
          <el-icon class="is-loading"><Loading /></el-icon>
          <p>{{ t('loadingUserInfo') }}</p>
        </div>
        <div v-else class="error-state">
          <el-icon><Warning /></el-icon>
          <p>{{ t('userInfoError') }}</p>
          <el-button type="primary" size="small" @click="loadUserInfo">
            {{ t('retry') }}
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Loading, Warning } from '@element-plus/icons-vue'
import { t as T } from '@/i18n'

const t = (key: Parameters<typeof T>[0]) => T(key)

const store = useStore()
const router = useRouter()
const loadingUserInfo = ref(false)

// Getters pour les informations utilisateur
const userInfo = computed(() => store.getters['user/userInfo'])
const userName = computed(() => store.getters['user/userName'])
const isAuthenticated = computed(() => store.getters['user/isAuthenticated'])

const onLogout = async () => {
  try {
    await store.dispatch('user/logout')
    ElMessage.success(t('logoutSuccess'))
    router.replace('/login')
  } catch (error) {
    console.error('Logout error:', error)
    ElMessage.error(t('logoutError'))
  }
}

const loadUserInfo = async () => {
  if (!isAuthenticated.value) {
    ElMessage.error(t('notAuthenticated'))
    router.replace('/login')
    return
  }
  
  loadingUserInfo.value = true
  try {
    await store.dispatch('user/fetchUserInfo')
    ElMessage.success(t('userInfoLoaded'))
  } catch (error) {
    console.error('Failed to fetch user info:', error)
    ElMessage.error(t('userInfoError'))
  } finally {
    loadingUserInfo.value = false
  }
}

// Récupérer les informations utilisateur au chargement
onMounted(async () => {
  if (isAuthenticated.value && !userInfo.value) {
    await loadUserInfo()
  }
})
</script>
<style scoped>
.dash {
  padding: 20px;
  min-height: 100vh;
  background: var(--bg-color);
}

.header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
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
  border-radius: 12px;
}

.card-header {
  font-weight: 600;
  color: var(--text-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-details p {
  margin: 0.5rem 0;
  color: var(--text-color);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.user-details strong {
  color: var(--label-color);
  min-width: 120px;
  display: inline-block;
}

.loading-state, .error-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-color);
}

.loading-state .el-icon, .error-state .el-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  display: block;
}

.loading-state p, .error-state p {
  margin: 1rem 0;
  font-size: 1rem;
}

.error-state .el-button {
  margin-top: 1rem;
}

/* Responsive pour mobile */
@media (max-width: 768px) {
  .dash {
    padding: 15px;
  }
  
  .header {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    gap: 1rem;
  }
  
  .user-info {
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .welcome-text {
    font-size: 1rem;
  }
  
  .dashboard-content {
    max-width: 100%;
  }
  
  .user-details p {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .user-details strong {
    min-width: auto;
    font-size: 0.9rem;
  }
}

/* Responsive pour très petits écrans */
@media (max-width: 480px) {
  .dash {
    padding: 10px;
  }
  
  .header h2 {
    font-size: 1.5rem;
  }
  
  .welcome-text {
    font-size: 0.9rem;
  }
  
  .user-details p {
    font-size: 0.9rem;
  }
}
</style>


