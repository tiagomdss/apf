<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar Superior -->
    <AppNavbar />

    <!-- Conteúdo Principal com Transição -->
    <main class="flex-1 relative">
      <div class="container mx-auto px-4 py-8">
        <slot />
      </div>
    </main>

    <!-- Rodapé -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Layout padrão com navbar superior e rodapé
</script>

