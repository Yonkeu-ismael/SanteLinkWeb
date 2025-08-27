import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/permission'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import i18nPlugin from '@/i18n'

const app = createApp(App)
app.use(ElementPlus)
app.use(i18nPlugin)
app.use(store)
app.use(router)
app.mount('#app')

// Thème: appliquer le thème persistant
const savedTheme = localStorage.getItem('theme') || 'light'
document.documentElement.setAttribute('data-theme', savedTheme)


