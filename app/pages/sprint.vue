<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Simulador de Planejamento de Sprint</h1>
    <p class="mb-6 text-base md:text-lg text-gray-600 dark:text-gray-300">
      Use esta ferramenta para planejar sprints: comece com uma análise rápida de viabilidade e depois
      detalhe o backlog item a item para obter uma distribuição precisa do esforço.
    </p>

    <!-- Análise Rápida -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-8">
      <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Análise Rápida de Viabilidade da Sprint</h3>
      <div class="grid lg:grid-cols-2 gap-8">
        <div class="space-y-4">
          <div>
            <label class="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Tamanho Total Estimado da Sprint (PF)</label>
            <input v-model.number="quickSprintPF" type="number" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label class="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Produtividade da Equipe (Horas/PF)</label>
            <input v-model.number="quickProductivity" type="number" step="0.5" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label class="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Duração da Sprint (Semanas)</label>
            <select v-model.number="sprintDuration" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option :value="1">1 Semana</option>
              <option :value="2">2 Semanas</option>
              <option :value="3">3 Semanas</option>
              <option :value="4">4 Semanas</option>
            </select>
          </div>
          <div>
            <label class="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Total de Membros na Equipe</label>
            <input v-model.number="teamMembers" type="number" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h4 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Análise da Viabilidade</h4>
          <div class="space-y-5">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Esforço Total Estimado</p>
              <p class="text-2xl font-bold text-teal-600 dark:text-teal-400">{{ quickEffort.toFixed(1) }} Horas</p>
            </div>
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Capacidade da Equipe na Sprint</p>
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ teamCapacity }} Horas</p>
            </div>
            <div :class="['p-4 rounded-md text-center font-semibold', viabilityClass]">
              {{ viabilityMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Construção do Backlog -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Construção do Backlog Detalhado</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Adicione itens individuais ao backlog para uma análise mais precisa do esforço.
      </p>
      
      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4 border border-blue-200 dark:border-blue-800">
        <p class="text-center text-blue-700 dark:text-blue-300">
          <Icon name="mdi:information" class="inline-block mr-2" />
          Funcionalidade em desenvolvimento - Em breve você poderá adicionar itens detalhados ao backlog
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Simulador de Sprint - Dashboard APF',
  description: 'Planeje e simule sprints com análise de viabilidade e distribuição de esforço'
})

// Estado
const quickSprintPF = ref(21)
const quickProductivity = ref(13)
const sprintDuration = ref(2)
const teamMembers = ref(4)

// Computed
const quickEffort = computed(() => quickSprintPF.value * quickProductivity.value)
const teamCapacity = computed(() => teamMembers.value * sprintDuration.value * 5 * 8)

const viabilityClass = computed(() => {
  if (teamCapacity.value <= 0) return 'bg-yellow-100 text-yellow-800'
  if (quickEffort.value > teamCapacity.value) return 'bg-red-100 text-red-800'
  return 'bg-green-100 text-green-800'
})

const viabilityMessage = computed(() => {
  if (teamCapacity.value <= 0) return 'Adicione membros à equipe para calcular a viabilidade.'
  if (quickEffort.value > teamCapacity.value) return 'Atenção: O esforço estimado excede a capacidade da equipe.'
  return 'Viável: O esforço estimado está dentro da capacidade da equipe.'
})
</script>
