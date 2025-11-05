<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar Superior -->
    <AppNavbar />

    <!-- Conteúdo Principal -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Rodapé -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Layout padrão com navbar superior e rodapé
</script>
