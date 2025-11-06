export const useTheme = () => {
  const isDark = useState('theme-dark', () => true)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateDOM()
    if (process.client) {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }
  }

  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      // Padrão: escuro. Só usa claro se salvo explicitamente como 'light'.
      isDark.value = savedTheme ? (savedTheme === 'dark') : true
      updateDOM()
    }
  }

  const updateDOM = () => {
    if (process.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  return {
    isDark,
    toggleTheme,
    initTheme
  }
}
