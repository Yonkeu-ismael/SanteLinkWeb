import { ref } from 'vue'

// Initialiser le thème depuis localStorage ou les préférences système
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    return savedTheme === 'dark'
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Variable réactive pour le thème
export const isDark = ref(getInitialTheme())

// Appliquer le thème initial
export const applyTheme = (theme: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

// Fonction pour basculer le thème
export const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  applyTheme(theme)
}

// Initialiser le thème au chargement
applyTheme(isDark.value ? 'dark' : 'light')

// Écouter les changements de préférences système
if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    // Ne changer que si aucun thème n'est sauvegardé
    if (!localStorage.getItem('theme')) {
      isDark.value = e.matches
      applyTheme(isDark.value ? 'dark' : 'light')
    }
  })
}
