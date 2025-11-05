<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Analisador de Fases do Projeto</h1>
    <p class="mb-6 text-base md:text-lg text-gray-600 dark:text-gray-300">
      Entenda como o esforço de um projeto é distribuído por suas diferentes fases. Insira o tamanho total
      do projeto em Pontos de Função para visualizar uma estimativa de horas e custos para cada etapa do
      ciclo de vida, com base na distribuição de esforço do Roteiro de Métricas (ANEXO E).
    </p>

    <div class="grid lg:grid-cols-2 gap-8 mb-6">
      <!-- Parâmetros -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Parâmetros do Projeto</h3>
        <div class="space-y-4">
          <div>
            <label class="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Tamanho Total do Projeto (PF)</label>
            <input v-model.number="projectPF" type="number" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label class="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Produtividade (Horas/PF)</label>
            <input v-model.number="productivity" type="number" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label class="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Custo da Hora (R$)</label>
            <input v-model.number="hourCost" type="number" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>
      </div>

      <!-- Resumo -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">Resumo do Projeto</h3>
        <div class="text-center mt-8 space-y-4">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Esforço Total</p>
            <p class="text-3xl font-bold text-teal-600 dark:text-teal-400">{{ totalEffort.toFixed(1) }} Horas</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Custo Total Estimado</p>
            <p class="text-3xl font-bold text-green-600 dark:text-green-400">
              R$ {{ totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela de Fases -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Detalhamento por Fase</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="p-3 text-left text-gray-900 dark:text-white font-semibold">Fase do Projeto</th>
              <th class="p-3 text-left text-gray-900 dark:text-white font-semibold">% Esforço</th>
              <th class="p-3 text-left text-gray-900 dark:text-white font-semibold">Horas Estimadas</th>
              <th class="p-3 text-left text-gray-900 dark:text-white font-semibold">Custo Estimado</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="phase in phases"
              :key="phase.name"
              class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <td class="p-3 font-medium text-gray-900 dark:text-white">{{ phase.name }}</td>
              <td class="p-3 text-gray-600 dark:text-gray-300">{{ (phase.percent * 100).toFixed(0) }}%</td>
              <td class="p-3 text-gray-600 dark:text-gray-300">{{ phase.hours.toFixed(1) }} h</td>
              <td class="p-3 text-gray-600 dark:text-gray-300">R$ {{ phase.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Analisador de Fases - Dashboard APF',
  description: 'Visualize a distribuição de esforço e custo por fase do projeto'
})

const { phaseDistribution } = useAPF()

// Estado
const projectPF = ref(250)
const productivity = ref(13)
const hourCost = ref(150)

// Computed
const totalEffort = computed(() => projectPF.value * productivity.value)
const totalCost = computed(() => totalEffort.value * hourCost.value)

const phases = computed(() => {
  return phaseDistribution.map(phase => ({
    name: phase.name,
    percent: phase.percent,
    hours: totalEffort.value * phase.percent,
    cost: totalEffort.value * phase.percent * hourCost.value
  }))
})
</script>
