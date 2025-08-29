<template>
  <div class="dash">
    <div class="header">
      <h2>{{ t('dashboardTitle') }}</h2>
      <el-button type="danger" @click="onLogout">{{ t('logout') }}</el-button>
    </div>
    <div>
      {{ t('dashboardTitle') }}
    </div>
  </div>
  
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { t as T } from '@/i18n'

const t = (key: Parameters<typeof T>[0]) => T(key)

const store = useStore()
const router = useRouter()

const onLogout = async () => {
  await store.dispatch('user/logout')
  router.replace('/login')
}
</script>
<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; }
</style>


