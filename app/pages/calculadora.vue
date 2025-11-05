<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Calculadora de Projeto</h1>
    <p class="mb-6 text-base md:text-lg text-gray-600 dark:text-gray-300">
      Utilize esta ferramenta para montar uma contagem detalhada de um projeto. Adicione funções transacionais,
      de dados e itens de sustentação para obter o tamanho funcional total.
    </p>

    <div class="grid lg:grid-cols-5 gap-6 mb-6">
      <!-- Formulário de Entrada -->
      <div class="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Adicionar Função ao Projeto</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label for="functionName" class="block font-medium mb-1 text-sm text-gray-700 dark:text-gray-300">Nome da Função</label>
            <input
              v-model="newFunction.name"
              type="text"
              id="functionName"
              placeholder="Ex: Registrar Nova Amostra"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label for="functionType" class="block font-medium mb-1 text-sm text-gray-700 dark:text-gray-300">Tipo</label>
            <select v-model="newFunction.type" id="functionType" class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="EE">EE - Entrada Externa</option>
              <option value="SE">SE - Saída Externa</option>
              <option value="CE">CE - Consulta Externa</option>
              <option value="ALI">ALI - Arquivo Lógico Interno</option>
              <option value="AIE">AIE - Arquivo de Interface Externa</option>
            </select>
          </div>

          <div>
            <label for="dets" class="block font-medium mb-1 text-sm text-gray-700 dark:text-gray-300">TDEs</label>
            <input
              v-model.number="newFunction.dets"
              type="number"
              id="dets"
              min="0"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label for="extra" class="block font-medium mb-1 text-sm text-gray-700 dark:text-gray-300">
              {{ isDataFunction ? 'TRs' : 'ARs' }}
            </label>
            <input
              v-model.number="extraValue"
              type="number"
              id="extra"
              min="0"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-4">
          <button @click="addFunction" class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full sm:w-auto">
            <Icon name="mdi:plus" class="inline-block mr-1" />
            Adicionar Função
          </button>
          <button @click="loadExample" class="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors w-full sm:w-auto">
            <Icon name="mdi:file-document" class="inline-block mr-1" />
            Carregar Exemplo SGAB
          </button>
        </div>
      </div>

      <!-- Resumo -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <h3 class="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">Resumo do Projeto</h3>
        <div class="text-center mt-8">
          <p class="text-gray-600 dark:text-gray-400 mb-2">Tamanho Total do Projeto</p>
          <p class="text-5xl font-bold text-teal-600 dark:text-teal-400">{{ totalFP.toFixed(3).replace('.', ',') }} PF</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">{{ functions.length }} função(ões) adicionada(s)</p>
        </div>
      </div>
    </div>

    <!-- Tabela de Funções -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <h3 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Lista de Funções do Projeto</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="p-3 text-left text-gray-900 dark:text-white font-semibold">Função</th>
              <th class="p-3 text-left text-gray-900 dark:text-white font-semibold">Tipo</th>
              <th class="p-3 text-left text-gray-900 dark:text-white font-semibold hidden sm:table-cell">TDEs/TRs/ARs</th>
              <th class="p-3 text-left text-gray-900 dark:text-white font-semibold">Complex.</th>
              <th class="p-3 text-left text-gray-900 dark:text-white font-semibold">PF</th>
              <th class="p-3 text-left text-gray-900 dark:text-white font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(func, index) in functions"
              :key="index"
              class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <td class="p-3 text-gray-900 dark:text-white">{{ func.name }}</td>
              <td class="p-3">
                <span class="font-semibold text-xs py-1 px-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300">
                  {{ func.type }}
                </span>
              </td>
              <td class="p-3 hidden sm:table-cell text-gray-600 dark:text-gray-300">
                {{ func.dets }} / {{ func.rets || '-' }} / {{ func.ftrs || '-' }}
              </td>
              <td class="p-3 text-gray-600 dark:text-gray-300">{{ func.complexity?.substring(0, 1) || 'N/A' }}</td>
              <td class="p-3 font-bold text-gray-900 dark:text-white">{{ func.points?.toFixed(3).replace('.', ',') || '0' }}</td>
              <td class="p-3">
                <button
                  @click="removeFunction(index)"
                  class="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Icon name="mdi:delete" class="text-xl" />
                </button>
              </td>
            </tr>
            <tr v-if="functions.length === 0">
              <td colspan="6" class="p-8 text-center text-gray-500 dark:text-gray-400">
                Nenhuma função adicionada ainda. Comece adicionando uma função acima.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FunctionPoint } from '~/types/apf'

useSeoMeta({
  title: 'Calculadora de Projeto - Dashboard APF',
  description: 'Calcule o tamanho funcional do seu projeto em Pontos de Função'
})

const { calculateFunctionPoints } = useAPF()

// Estado
const functions = ref<FunctionPoint[]>([])
const newFunction = ref<FunctionPoint>({
  name: '',
  type: 'EE',
  dets: 5,
  rets: null,
  ftrs: 1
})

const extraValue = ref(1)

// Computed
const isDataFunction = computed(() => {
  return newFunction.value.type === 'ALI' || newFunction.value.type === 'AIE'
})

const totalFP = computed(() => {
  return functions.value.reduce((sum, func) => {
    const result = calculateFunctionPoints(func)
    return sum + (result.points || 0)
  }, 0)
})

// Métodos
const addFunction = () => {
  const func: FunctionPoint = {
    name: newFunction.value.name || `Função ${functions.value.length + 1}`,
    type: newFunction.value.type,
    dets: newFunction.value.dets,
    rets: isDataFunction.value ? extraValue.value : null,
    ftrs: !isDataFunction.value ? extraValue.value : null
  }

  const result = calculateFunctionPoints(func)
  func.complexity = result.complexity as any
  func.points = result.points

  functions.value.push(func)
  
  // Reset form
  newFunction.value.name = ''
}

const removeFunction = (index: number) => {
  functions.value.splice(index, 1)
}

const loadExample = () => {
  const sgabExample: FunctionPoint[] = [
    { name: 'ALI: Amostras Biológicas', type: 'ALI', dets: 7, rets: 1, ftrs: null },
    { name: 'ALI: Lotes de Análise', type: 'ALI', dets: 3, rets: 1, ftrs: null },
    { name: 'AIE: Cadastro Tipos Análise', type: 'AIE', dets: 2, rets: 1, ftrs: null },
    { name: 'Registrar Nova Amostra', type: 'EE', dets: 5, rets: null, ftrs: 1 },
    { name: 'Criar Lote de Análise', type: 'EE', dets: 3, rets: null, ftrs: 3 },
    { name: 'Registrar Resultados do Lote', type: 'EE', dets: 2, rets: null, ftrs: 2 },
    { name: 'Consultar Histórico da Amostra', type: 'CE', dets: 10, rets: null, ftrs: 2 },
    { name: 'Descartar Amostras', type: 'EE', dets: 2, rets: null, ftrs: 1 }
  ]

  functions.value = sgabExample.map(func => {
    const result = calculateFunctionPoints(func)
    return {
      ...func,
      complexity: result.complexity as any,
      points: result.points
    }
  })
}

// Watch para atualizar rets/ftrs quando o tipo muda
watch(() => newFunction.value.type, () => {
  if (isDataFunction.value) {
    newFunction.value.rets = extraValue.value
    newFunction.value.ftrs = null
  } else {
    newFunction.value.rets = null
    newFunction.value.ftrs = extraValue.value
  }
})
</script>
