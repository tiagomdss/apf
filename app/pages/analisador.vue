<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Analisador de Requisitos</h1>
    <p class="mb-6 text-base md:text-lg text-gray-600 dark:text-gray-300">
      Cole o texto de um requisito, selecione o contexto e obtenha uma análise completa de tipo,
      tamanho (PF) e uma projeção de esforço (horas) que considera todos os fatores.
    </p>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Formulário -->
        <div>
          <div class="mb-4">
            <label for="projectContext" class="block font-medium mb-2 text-gray-900 dark:text-white">
              1. Selecione o Contexto do Projeto:
            </label>
            <select v-model="projectContext" id="projectContext" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="new">Novo Projeto (ou em Andamento)</option>
              <option value="evolution">Projeto em Evolução (Pós-Garantia)</option>
              <option value="legacy">Projeto Legado (Crítico/Complexo)</option>
            </select>
          </div>

          <div>
            <label for="requirementText" class="block font-medium mb-2 text-gray-900 dark:text-white">
              2. Cole o texto do requisito aqui:
            </label>
            <textarea
              v-model="requirementText"
              id="requirementText"
              rows="10"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Ex: O sistema apresenta erro ao salvar o relatório de vendas. É preciso corrigir..."
            ></textarea>
            <button @click="analyzeRequirement" class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full mt-4">
              <Icon name="mdi:text-search" class="inline-block mr-2" />
              Analisar Requisito
            </button>
          </div>
        </div>

        <!-- Resultado -->
        <div class="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Resultado da Análise</h3>
          <div v-if="!analyzed" class="text-gray-500 dark:text-gray-400 text-center py-8">
            Aguardando análise...
          </div>
          <div v-else class="space-y-4">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Tipo de Demanda Identificado</p>
              <p :class="['font-bold text-lg px-3 py-2 rounded-md inline-block', demandColorClass]">
                {{ demandTypeLabel }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">Estimativa de Tamanho Funcional (PF)</p>
              <p class="font-bold text-2xl text-teal-600 dark:text-teal-400">~{{ estimatedPF }} PF</p>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Cálculo de Esforço Estimado</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                PF Ponderado: {{ estimatedPF }} PF × {{ (demandWeightFactor * 100).toFixed(0) }}% = {{ weightedPF.toFixed(2) }} PF
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Produtividade Ajustada: {{ baseProductivity }} h/PF × {{ effortMultiplier }} = {{ (baseProductivity * effortMultiplier).toFixed(2) }} h/PF
              </p>
              <p class="font-bold text-3xl text-blue-600 dark:text-blue-400 mt-3">~{{ finalEffort.toFixed(1) }} Horas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Analisador de Requisitos - Dashboard APF',
  description: 'Analise requisitos e obtenha estimativas rápidas de esforço'
})

const { getDemandWeightFactor, getProjectContextMultiplier } = useAPF()

// Estado
const projectContext = ref('evolution')
const requirementText = ref('')
const analyzed = ref(false)

// Resultados
const demandType = ref('new')
const demandTypeLabel = ref('Nova Funcionalidade')
const demandColorClass = ref('bg-blue-100 text-blue-800')
const estimatedPF = ref(0)
const demandWeightFactor = ref(1.0)
const effortMultiplier = ref(1.0)
const weightedPF = ref(0)
const finalEffort = ref(0)
const baseProductivity = 13

// Método de análise
const analyzeRequirement = () => {
  const text = requirementText.value.toLowerCase()
  
  if (!text) {
    return
  }

  // Identificar tipo de demanda
  const enhancementKeywords = ['melhorar', 'alterar', 'editar', 'exibir todos', 'retirar coluna', 'me1651', 'me1652']
  const bugKeywords = ['corrigir', 'erro', 'falhou', 'apresenta valor diferente', 'bug', 'defeito']

  if (enhancementKeywords.some(kw => text.includes(kw))) {
    demandType.value = 'enhancement'
    demandTypeLabel.value = 'Melhoria (ME)'
    demandColorClass.value = 'bg-yellow-100 text-yellow-800'
  } else if (bugKeywords.some(kw => text.includes(kw))) {
    demandType.value = 'bug'
    demandTypeLabel.value = 'Correção de Bug (DE)'
    demandColorClass.value = 'bg-red-100 text-red-800'
  } else {
    demandType.value = 'new'
    demandTypeLabel.value = 'Nova Funcionalidade'
    demandColorClass.value = 'bg-blue-100 text-blue-800'
  }

  // Estimar PF baseado em palavras-chave
  const actionVerbs = ['criar', 'editar', 'listar', 'pesquisar', 'validar', 'exibir', 'salvar', 'gerar', 'adicionar', 'remover']
  const dataNouns = ['iniciativa', 'classe', 'item', 'usuário', 'grupo', 'relatório', 'filtro', 'tela', 'api', 'tabela']
  
  const verbCount = actionVerbs.filter(verb => text.includes(verb)).length
  const nounCount = dataNouns.filter(noun => text.includes(noun)).length
  
  estimatedPF.value = Math.max(1, Math.round((verbCount * 1.5) + (nounCount * 0.8)))

  // Calcular fatores
  effortMultiplier.value = getProjectContextMultiplier(projectContext.value)
  demandWeightFactor.value = getDemandWeightFactor(
    demandType.value,
    projectContext.value === 'new'
  )

  weightedPF.value = estimatedPF.value * demandWeightFactor.value
  finalEffort.value = weightedPF.value * (baseProductivity * effortMultiplier.value)

  analyzed.value = true
}
</script>
