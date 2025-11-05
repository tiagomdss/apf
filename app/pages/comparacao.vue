<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Métodos em Comparação</h1>
    <p class="mb-8 text-base md:text-lg text-gray-600 dark:text-gray-300">
      Comparação entre diferentes metodologias de medição de software: IFPUG, COSMIC e Pontos de História.
    </p>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-6">
      <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">IFPUG vs. COSMIC</h3>
      <p class="mb-4 text-gray-600 dark:text-gray-300">
        <strong>IFPUG</strong> é empírico e ideal para sistemas de negócio tradicionais. Sua avaliação de
        complexidade (baixa, média, alta) pode ser subjetiva. <strong>COSMIC</strong> é de "segunda geração",
        baseado em princípios de engenharia de software (movimentos de dados). Ele não tem avaliação de
        complexidade (cada movimento = 1 CFP), sendo mais simples e mais adequado para arquiteturas modernas
        como microsserviços e sistemas de tempo real.
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">APF vs. Pontos de História</h3>
      <p class="text-gray-600 dark:text-gray-300">
        Esta é a distinção mais crucial no desenvolvimento moderno. <strong>Análise de Pontos de Função (APF)</strong>
        mede o <strong>tamanho funcional</strong> (objetivo, padronizado, estratégico, ideal para contratos).
        <strong>Pontos de História (Story Points)</strong> medem o <strong>esforço relativo da equipe</strong>
        (subjetivo, local, tático, ideal para planejamento de sprint). Eles não são intercambiáveis; servem a
        propósitos diferentes e complementares. Organizações maduras usam APF para orçamentos e contratos, e
        SPs para a gestão do trabalho da equipe ágil.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Comparação de Métodos - Dashboard APF',
  description: 'Compare diferentes metodologias de medição de software'
})
</script>
