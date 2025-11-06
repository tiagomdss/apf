<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 relative">
    <!-- Overlay de loading -->
    <div v-if="!isReady" class="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div class="flex flex-col items-center gap-4">
        <div class="h-10 w-10 rounded-full border-4 border-gray-300 dark:border-gray-700 border-t-blue-500 dark:border-t-blue-400 animate-spin"></div>
        <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Carregando…</span>
      </div>
    </div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Dark mode será gerenciado via composable
const isReady = ref(false)

onBeforeMount(() => {
  if (process.client) document.documentElement.classList.add('overflow-hidden')
})

onMounted(() => {
  // Libera a UI imediatamente após montar
  isReady.value = true
  if (process.client) document.documentElement.classList.remove('overflow-hidden')
})
</script>

