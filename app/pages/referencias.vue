<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Referências e Tabelas de Cálculo</h1>
    <p class="mb-8 text-base md:text-lg text-gray-600 dark:text-gray-300">
      Esta seção centraliza as tabelas e fórmulas utilizadas em todas as calculadoras e simuladores deste dashboard.
      Elas são a base para converter a contagem de componentes funcionais em um valor numérico de Pontos de Função
      e, subsequentemente, em esforço.
    </p>

    <!-- Fórmulas Essenciais -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-8">
      <h3 class="text-xl font-bold mb-4 text-teal-700 dark:text-teal-400">
        <Icon name="mdi:function-variant" class="inline-block mr-2" />
        Fórmulas Essenciais de Estimativa
      </h3>
      
      <div class="space-y-6">
        <div>
          <h4 class="font-semibold text-lg mb-2 text-gray-900 dark:text-white">1. Cálculo do PF Ponderado</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Ajusta o tamanho bruto da função com base no tipo de demanda.</p>
          <code class="block bg-gray-100 dark:bg-gray-900 p-3 rounded-md text-sm font-mono text-gray-900 dark:text-gray-100">
            PF_Ponderado = PF_Bruto × Fator_Ponderação
          </code>
          <ul class="list-disc list-inside text-sm mt-3 space-y-1 text-gray-600 dark:text-gray-300">
            <li><strong>Nova Funcionalidade (HU/TE):</strong> Fator = 100%</li>
            <li><strong>Melhoria (ME) na mesma Release:</strong> Fator = 50%</li>
            <li><strong>Melhoria (ME) em outra Release:</strong> Fator = 75%</li>
            <li><strong>Correção de Bug (DE) na mesma Release:</strong> Fator = 0%</li>
            <li><strong>Correção de Bug (DE) em outra Release:</strong> Fator = 25%</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-lg mb-2 text-gray-900 dark:text-white">2. Cálculo do Esforço (HH)</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Converte o tamanho ponderado em horas de trabalho.</p>
          <code class="block bg-gray-100 dark:bg-gray-900 p-3 rounded-md text-sm font-mono text-gray-900 dark:text-gray-100">
            Esforço(HH) = PF_Ponderado × Produtividade_(HH/PF)
          </code>
        </div>

        <div>
          <h4 class="font-semibold text-lg mb-2 text-gray-900 dark:text-white">3. Cálculo da Produtividade da Equipe</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Define a taxa de conversão de PF em horas, baseada no desempenho passado da equipe.</p>
          <code class="block bg-gray-100 dark:bg-gray-900 p-3 rounded-md text-sm font-mono text-gray-900 dark:text-gray-100">
            Produtividade(HH/PF) = Σ Horas_Trabalhadas / Σ Pontos_de_Função_Entregues
          </code>
        </div>
      </div>
    </div>

    <!-- Tabela de Pontuação -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-8">
      <h4 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Tabela de Pontuação por Tipo de Função</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold">Tipo de Função</th>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold">Complexidade Baixa</th>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold">Complexidade Média</th>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold">Complexidade Alta</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">Entradas Externas (EE)</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">3 pontos</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">4 pontos</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">6 pontos</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">Saídas Externas (SE)</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">4 pontos</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">5 pontos</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">7 pontos</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">Consultas Externas (CE)</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">3 pontos</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">4 pontos</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">6 pontos</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">Arquivos Lógicos Internos (ALI)</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">7 pontos</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">10 pontos</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">15 pontos</td>
            </tr>
            <tr>
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">Arquivos de Interface Externa (AIE)</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">5 pontos</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">7 pontos</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-600 dark:text-gray-300">10 pontos</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Matriz ALI/AIE -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-8">
      <h4 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Matriz de Complexidade – ALIs e AIEs</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold" rowspan="2">Tipos de Registro (TRs)</th>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-900 dark:text-white font-semibold" colspan="3">Tipos de Dados Elementares (TDEs)</th>
            </tr>
            <tr>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold">1 a 19 TDEs</th>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold">20 a 50 TDEs</th>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold">51+ TDEs</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">1 TR</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-green-100 dark:bg-green-900/30 text-center text-gray-900 dark:text-green-300">Baixa</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-green-100 dark:bg-green-900/30 text-center text-gray-900 dark:text-green-300">Baixa</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-yellow-100 dark:bg-yellow-900/30 text-center text-gray-900 dark:text-yellow-300">Média</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">2 a 5 TRs</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-green-100 dark:bg-green-900/30 text-center text-gray-900 dark:text-green-300">Baixa</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-yellow-100 dark:bg-yellow-900/30 text-center text-gray-900 dark:text-yellow-300">Média</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-red-100 dark:bg-red-900/30 text-center text-gray-900 dark:text-red-300">Alta</td>
            </tr>
            <tr>
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">6+ TRs</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-yellow-100 dark:bg-yellow-900/30 text-center text-gray-900 dark:text-yellow-300">Média</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-red-100 dark:bg-red-900/30 text-center text-gray-900 dark:text-red-300">Alta</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-red-100 dark:bg-red-900/30 text-center text-gray-900 dark:text-red-300">Alta</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Matriz EE -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-8">
      <h4 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Matriz de Complexidade – Entradas Externas (EE)</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold" rowspan="2">Arquivos Referenciados (ARs)</th>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-900 dark:text-white font-semibold" colspan="3">Tipos de Dados Elementares (TDEs)</th>
            </tr>
            <tr>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold">1 a 4 TDEs</th>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold">5 a 15 TDEs</th>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold">16+ TDEs</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">0 ou 1 AR</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-green-100 dark:bg-green-900/30 text-center text-gray-900 dark:text-green-300">Baixa</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-green-100 dark:bg-green-900/30 text-center text-gray-900 dark:text-green-300">Baixa</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-yellow-100 dark:bg-yellow-900/30 text-center text-gray-900 dark:text-yellow-300">Média</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">2 ARs</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-green-100 dark:bg-green-900/30 text-center text-gray-900 dark:text-green-300">Baixa</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-yellow-100 dark:bg-yellow-900/30 text-center text-gray-900 dark:text-yellow-300">Média</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-red-100 dark:bg-red-900/30 text-center text-gray-900 dark:text-red-300">Alta</td>
            </tr>
            <tr>
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">3+ ARs</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-yellow-100 dark:bg-yellow-900/30 text-center text-gray-900 dark:text-yellow-300">Média</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-red-100 dark:bg-red-900/30 text-center text-gray-900 dark:text-red-300">Alta</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-red-100 dark:bg-red-900/30 text-center text-gray-900 dark:text-red-300">Alta</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Matriz SE/CE -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <h4 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Matriz de Complexidade – Saídas (SE) e Consultas (CE)</h4>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left border border-gray-200 dark:border-gray-700">
          <thead class="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold" rowspan="2">Arquivos Referenciados (ARs)</th>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-center text-gray-900 dark:text-white font-semibold" colspan="3">Tipos de Dados Elementares (TDEs)</th>
            </tr>
            <tr>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold">1 a 5 TDEs</th>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold">6 a 19 TDEs</th>
              <th class="p-3 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold">20+ TDEs</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">0 ou 1 AR</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-green-100 dark:bg-green-900/30 text-center text-gray-900 dark:text-green-300">Baixa</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-green-100 dark:bg-green-900/30 text-center text-gray-900 dark:text-green-300">Baixa</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-yellow-100 dark:bg-yellow-900/30 text-center text-gray-900 dark:text-yellow-300">Média</td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">2 a 3 ARs</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-green-100 dark:bg-green-900/30 text-center text-gray-900 dark:text-green-300">Baixa</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-yellow-100 dark:bg-yellow-900/30 text-center text-gray-900 dark:text-yellow-300">Média</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-red-100 dark:bg-red-900/30 text-center text-gray-900 dark:text-red-300">Alta</td>
            </tr>
            <tr>
              <td class="p-3 border border-gray-200 dark:border-gray-600 font-medium text-gray-900 dark:text-white">4+ ARs</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-yellow-100 dark:bg-yellow-900/30 text-center text-gray-900 dark:text-yellow-300">Média</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-red-100 dark:bg-red-900/30 text-center text-gray-900 dark:text-red-300">Alta</td>
              <td class="p-3 border border-gray-200 dark:border-gray-600 bg-red-100 dark:bg-red-900/30 text-center text-gray-900 dark:text-red-300">Alta</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Referências e Tabelas - Dashboard APF',
  description: 'Consulte as tabelas de complexidade e fórmulas de cálculo de Pontos de Função'
})
</script>
