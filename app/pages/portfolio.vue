<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Planejador de Portfólio de Projetos</h1>
    <p class="mb-6 text-base md:text-lg text-gray-600 dark:text-gray-300">
      Transforme a APF em uma ferramenta de gestão estratégica. Modele sua equipe, defina a produtividade
      e liste seus projetos futuros para obter uma visão clara da sua capacidade de entrega versus a demanda
      do seu portfólio.
    </p>

    <div class="grid lg:grid-cols-2 gap-8 mb-6">
      <!-- Capacidade da Equipe -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Capacidade da Equipe</h3>
        <div class="space-y-4 mb-6">
          <div>
            <label class="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Nº de Analistas na Equipe</label>
            <input v-model.number="teamSize" type="number" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label class="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Produtividade Média (PF/Mês por Analista)</label>
            <input v-model.number="productivity" type="number" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>

        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Adicionar Projeto ao Portfólio</h3>
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="flex-grow">
            <label class="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Nome do Projeto</label>
            <input v-model="newProjectName" type="text" placeholder="Ex: ARRECADAÇÃO" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div class="w-full sm:w-32">
            <label class="block font-medium text-sm mb-1 text-gray-700 dark:text-gray-300">Tamanho (PF)</label>
            <input v-model.number="newProjectPF" type="number" placeholder="590" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>
        <button @click="addProject" class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full">
          <Icon name="mdi:plus" class="inline-block mr-2" />
          Adicionar Projeto
        </button>
      </div>

      <!-- Análise -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">Capacidade vs. Demanda</h3>
        <div class="text-center mt-8 space-y-6">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Capacidade Mensal da Equipe</p>
            <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ teamCapacity }} PF/mês</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Demanda Total do Portfólio</p>
            <p class="text-3xl font-bold text-teal-600 dark:text-teal-400">{{ totalDemand }} PF</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400">Tempo Estimado para Conclusão</p>
            <p class="text-3xl font-bold text-green-600 dark:text-green-400">
              {{ estimatedMonths.toFixed(1) }} meses
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pipeline de Projetos -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Pipeline de Projetos</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="p-3 text-left text-gray-900 dark:text-white font-semibold">Projeto</th>
              <th class="p-3 text-left text-gray-900 dark:text-white font-semibold">Tamanho (PF)</th>
              <th class="p-3 text-left text-gray-900 dark:text-white font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(project, index) in projects"
              :key="index"
              class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <td class="p-3 font-medium text-gray-900 dark:text-white">{{ project.name }}</td>
              <td class="p-3 text-gray-600 dark:text-gray-300">{{ project.pf }} PF</td>
              <td class="p-3">
                <button
                  @click="removeProject(index)"
                  class="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Icon name="mdi:delete" class="text-xl" />
                </button>
              </td>
            </tr>
            <tr v-if="projects.length === 0">
              <td colspan="3" class="p-8 text-center text-gray-500 dark:text-gray-400">
                Nenhum projeto adicionado ainda. Adicione projetos acima para começar.
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="projects.length > 0" class="mt-4 text-right font-bold text-gray-900 dark:text-white">
          Total Demandado: {{ totalDemand }} PF
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PortfolioProject } from '~/types/apf'

useSeoMeta({
  title: 'Planejador de Portfólio - Dashboard APF',
  description: 'Planeje e gerencie seu portfólio de projetos com análise de capacidade'
})

// Estado
const teamSize = ref(26)
const productivity = ref(16)
const newProjectName = ref('')
const newProjectPF = ref(0)
const projects = ref<PortfolioProject[]>([])

// Computed
const teamCapacity = computed(() => teamSize.value * productivity.value)
const totalDemand = computed(() => projects.value.reduce((sum, p) => sum + p.pf, 0))
const estimatedMonths = computed(() => {
  if (teamCapacity.value === 0) return 0
  return totalDemand.value / teamCapacity.value
})

// Métodos
const addProject = () => {
  if (newProjectName.value && newProjectPF.value > 0) {
    projects.value.push({
      name: newProjectName.value,
      pf: newProjectPF.value
    })
    newProjectName.value = ''
    newProjectPF.value = 0
  }
}

const removeProject = (index: number) => {
  projects.value.splice(index, 1)
}
</script>
