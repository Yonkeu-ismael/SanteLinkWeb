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
app.use(store)
app.use(router)
app.use(i18nPlugin)
app.mount('#app')

// Thème: appliquer le thème (par défaut suivre le système si aucune préférence)
const applyTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme)
}

const savedTheme = localStorage.getItem('theme')
if (savedTheme) {
  applyTheme(savedTheme)
} else if (window.matchMedia) {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  applyTheme(media.matches ? 'dark' : 'light')
  const handler = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light')
  }
  media.addEventListener ? media.addEventListener('change', handler) : media.addListener(handler)
}
