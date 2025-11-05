<template>
  <nav class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo e Título -->
        <NuxtLink to="/" class="flex items-center space-x-3 hover:scale-105 transition-transform">
          <div class="text-4xl">📊</div>
          <span class="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
            APF
          </span>
        </NuxtLink>

        <!-- Menu Desktop + Dark Mode Toggle -->
        <div class="hidden lg:flex items-center space-x-2">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all"
            active-class="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-bold"
          >
            {{ item.label }}
          </NuxtLink>
          <button 
            @click="toggleTheme"
            class="ml-4 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all hover:scale-110"
            aria-label="Toggle theme"
          >
            <span class="text-2xl">{{ isDark ? '🌙' : '☀️' }}</span>
          </button>
        </div>

        <!-- Botões Mobile -->
        <div class="lg:hidden flex items-center gap-2">
          <button 
            @click="toggleTheme"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            aria-label="Toggle theme"
          >
            <span class="text-xl">{{ isDark ? '🌙' : '☀️' }}</span>
          </button>
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <span class="text-2xl">{{ mobileMenuOpen ? '✕' : '☰' }}</span>
          </button>
        </div>
      </div>

      <!-- Menu Mobile -->
      <Transition name="slide-down">
        <div v-if="mobileMenuOpen" class="lg:hidden pb-4 space-y-1">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all"
            active-class="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-bold"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { isDark, toggleTheme } = useTheme()
const mobileMenuOpen = ref(false)

const menuItems = [
  { label: 'Início', path: '/' },
  { label: 'Como Funciona', path: '/como-funciona' },
  { label: 'Calculadora', path: '/calculadora' },
  { label: 'Analisador', path: '/analisador' },
  { label: 'Sprint', path: '/sprint' },
  { label: 'Fases', path: '/fases' },
  { label: 'Portfólio', path: '/portfolio' },
  { label: 'Simulado', path: '/simulado' },
  { label: 'Comparação', path: '/comparacao' },
  { label: 'Referências', path: '/referencias' }
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
