<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Como Funciona o Processo de Contagem</h1>
    <p class="mb-6 text-base md:text-lg text-gray-600 dark:text-gray-300">
      O processo de contagem de Pontos de Função é sistemático e baseado em regras para garantir consistência.
      A Fiocruz, seguindo as melhores práticas do setor público, adota o padrão do IFPUG como base,
      mas o contextualiza através do seu próprio <strong>Roteiro de Métricas de Software</strong>.
    </p>

    <!-- Roteiro da Fiocruz -->
    <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded-r-lg mb-8">
      <h3 class="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
        <Icon name="mdi:book-open-page-variant" class="inline-block mr-2" />
        O Roteiro da Fiocruz: Adaptando o Padrão Global
      </h3>
      <p class="text-blue-900 dark:text-blue-200 leading-relaxed">
        A Fiocruz utiliza o <strong>Roteiro de Métricas de Software do SISP (v2.3)</strong> como principal referência,
        que por sua vez é fundamentado no manual <strong>CPM 4.3.1 do IFPUG</strong>. Isso significa que os conceitos
        de ALI, AIE, EE, SE e CE são os mesmos. A importância do roteiro da Fiocruz está em estabelecer uma
        <strong>ordem de precedência</strong> clara e definir regras específicas para o contexto da instituição,
        como a não utilização do Fator de Ajuste (VAF=1) e a definição de métricas para itens não mensuráveis
        (manutenção cosmética, etc.). Em caso de dúvida, a ordem é: 1º Roteiro Fiocruz, 2º Roteiro SISP, 3º Manual do IFPUG.
      </p>
    </div>

    <!-- Tabs -->
    <div class="mb-6 border-b border-gray-200 dark:border-gray-700 flex space-x-4">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'py-3 px-6 border-b-2 font-medium transition-colors',
          activeTab === tab.id
            ? 'border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400'
            : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Funções de Dados -->
    <div v-show="activeTab === 'data'" class="fade-in">
      <h3 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Medindo Funções de Dados (ALI & AIE)</h3>
      <p class="mb-6 text-gray-600 dark:text-gray-300">
        Representam os requisitos de armazenamento de dados do usuário. São agrupamentos lógicos de informação,
        não tabelas físicas.
      </p>

      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-blue-500 dark:border-blue-400 shadow-md">
          <h4 class="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">
            <Icon name="mdi:database" class="inline-block mr-2" />
            ALI - Arquivo Lógico Interno
          </h4>
          <p class="mb-3 text-gray-600 dark:text-gray-300">
            Dados mantidos <strong>dentro</strong> da aplicação. O sistema que está sendo medido é responsável
            por criar, alterar e excluir esses dados.
          </p>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
            <p class="text-sm text-blue-900 dark:text-blue-200">
              <strong>Exemplo:</strong> Um arquivo de "Clientes" em um sistema de CRM.
            </p>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-green-500 dark:border-green-400 shadow-md">
          <h4 class="text-xl font-bold mb-3 text-green-600 dark:text-green-400">
            <Icon name="mdi:database-export" class="inline-block mr-2" />
            AIE - Arquivo de Interface Externa
          </h4>
          <p class="mb-3 text-gray-600 dark:text-gray-300">
            Dados referenciados pela aplicação, mas mantidos <strong>fora</strong> dela (em outro sistema).
            A aplicação apenas lê esses dados.
          </p>
          <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded">
            <p class="text-sm text-green-900 dark:text-green-200">
              <strong>Exemplo:</strong> Uma tabela de "Taxas de Câmbio" mantida por um sistema financeiro,
              mas lida por um app de vendas.
            </p>
          </div>
        </div>
      </div>

      <!-- Dica Didática -->
      <div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-500 p-6 rounded-r-lg">
        <h4 class="font-bold text-lg text-amber-800 dark:text-amber-300 mb-3">
          <Icon name="mdi:lightbulb" class="inline-block mr-2" />
          Dica Didática: A Regra do Carro (TR vs. ALI)
        </h4>
        <p class="text-amber-900 dark:text-amber-200 mb-3">
          Para diferenciar um <strong>Tipo de Registro (TR)</strong> de um <strong>Arquivo Lógico Interno (ALI)</strong>,
          pense em um carro:
        </p>
        <ul class="list-disc list-inside space-y-2 text-amber-900 dark:text-amber-200">
          <li>
            É um <strong>TR</strong> se for uma "característica" que só existe dentro de outra entidade
            (ex: o Ar Condicionado de um carro específico).
          </li>
          <li>
            É um <strong>ALI separado</strong> se for uma "coisa" com vida própria que pode ser reutilizada
            (ex: o Modelo do Pneu, que serve para vários carros e existe independentemente de um carro específico).
          </li>
        </ul>
      </div>
    </div>

    <!-- Funções de Transação -->
    <div v-show="activeTab === 'transaction'" class="fade-in">
      <h3 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Medindo Funções de Transação (EE, SE & CE)</h3>
      <p class="mb-6 text-gray-600 dark:text-gray-300">
        Representam os requisitos de processamento de dados. São as menores atividades que têm significado para o usuário.
      </p>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-orange-500 dark:border-orange-400 shadow-md">
          <h4 class="text-xl font-bold mb-3 text-orange-600 dark:text-orange-400">
            <Icon name="mdi:import" class="inline-block mr-2" />
            EE - Entrada Externa
          </h4>
          <p class="mb-3 text-gray-600 dark:text-gray-300">
            Processa dados que entram na aplicação para manter um ALI ou alterar o comportamento do sistema.
          </p>
          <div class="bg-orange-50 dark:bg-orange-900/20 p-3 rounded">
            <p class="text-sm text-orange-900 dark:text-orange-200">
              <strong>Exemplo:</strong> Tela de "Cadastro de Novo Produto".
            </p>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-purple-500 dark:border-purple-400 shadow-md">
          <h4 class="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">
            <Icon name="mdi:file-chart" class="inline-block mr-2" />
            SE - Saída Externa
          </h4>
          <p class="mb-3 text-gray-600 dark:text-gray-300">
            Envia dados para fora da aplicação, mas inclui alguma lógica de processamento (cálculos, dados derivados).
          </p>
          <div class="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
            <p class="text-sm text-purple-900 dark:text-purple-200">
              <strong>Exemplo:</strong> "Relatório de Vendas Mensais" com totais e médias.
            </p>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-red-500 dark:border-red-400 shadow-md">
          <h4 class="text-xl font-bold mb-3 text-red-600 dark:text-red-400">
            <Icon name="mdi:magnify" class="inline-block mr-2" />
            CE - Consulta Externa
          </h4>
          <p class="mb-3 text-gray-600 dark:text-gray-300">
            Envia dados para fora da aplicação, envolvendo apenas a recuperação e apresentação direta de informações.
          </p>
          <div class="bg-red-50 dark:bg-red-900/20 p-3 rounded">
            <p class="text-sm text-red-900 dark:text-red-200">
              <strong>Exemplo:</strong> Função "Buscar Detalhes do Cliente por CPF".
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Como Funciona - Dashboard APF',
  description: 'Entenda o processo de contagem de Pontos de Função e as diferenças entre funções de dados e transação'
})

const activeTab = ref('data')

const tabs = [
  { id: 'data', label: 'Funções de Dados' },
  { id: 'transaction', label: 'Funções de Transação' }
]
</script>
