<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <section class="mb-12 text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 text-primary-700">
        Análise de Pontos de Função (APF)
      </h1>
      <p class="text-xl text-stone-600 max-w-3xl mx-auto">
        Dashboard interativo para medição, estimativa e gestão de projetos de software
        usando a metodologia padronizada de Pontos de Função
      </p>
    </section>

    <!-- O Que é APF -->
    <section class="mb-12">
      <h2 class="section-title">O Que é Análise de Pontos de Função (APF)?</h2>
      <p class="mb-6 text-base md:text-lg leading-relaxed">
        A APF é um método padronizado para medir o tamanho funcional de um software a partir da perspectiva do usuário.
        Em vez de contar linhas de código (uma medida técnica), a APF quantifica <strong>o que</strong> o software faz,
        não <strong>como</strong> ele o faz. Isso fornece uma medida de "tamanho" independente de tecnologia,
        crucial para estimativas, gestão de contratos e medição de produtividade.
      </p>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="card">
          <h3 class="subsection-title text-orange-600">
            <Icon name="mdi:alert-circle-outline" class="inline-block mr-2" />
            O Problema Histórico
          </h3>
          <p>
            Medir software por <strong>Linhas de Código (LOC)</strong> é falho. O mesmo recurso pode ter 50 ou 500 linhas
            dependendo da linguagem. LOC mede o "tamanho da solução", não o "tamanho do problema", tornando as comparações
            de produtividade e as estimativas iniciais imprecisas.
          </p>
        </div>

        <div class="card">
          <h3 class="subsection-title text-green-600">
            <Icon name="mdi:check-circle-outline" class="inline-block mr-2" />
            A Solução da APF
          </h3>
          <p>
            Criada por Allan J. Albrecht na IBM, a APF foca na <strong>funcionalidade entregue ao usuário</strong>.
            É como medir uma casa em metros quadrados, não importa se as paredes são de tijolo ou madeira.
            Essa visão de negócio cria uma linguagem comum entre gestores e equipes de TI.
          </p>
        </div>
      </div>
    </section>

    <!-- Principais Benefícios -->
    <section class="mb-12">
      <h3 class="text-2xl font-bold mb-6 text-primary-700">Principais Benefícios</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          class="bg-primary-50 p-4 rounded-lg hover:shadow-md transition-shadow"
        >
          <div class="flex items-start">
            <Icon :name="benefit.icon" class="text-2xl text-primary-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <strong class="text-primary-800">{{ benefit.title }}:</strong>
              <span class="text-stone-700"> {{ benefit.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ferramentas Disponíveis -->
    <section>
      <h3 class="text-2xl font-bold mb-6 text-primary-700">Ferramentas Disponíveis</h3>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="tool in tools"
          :key="tool.path"
          :to="tool.path"
          class="card hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
        >
          <div class="flex items-center mb-3">
            <Icon :name="tool.icon" class="text-4xl text-primary-600 mr-3 group-hover:text-primary-700" />
            <h4 class="text-xl font-bold text-stone-800 group-hover:text-primary-700">{{ tool.title }}</h4>
          </div>
          <p class="text-stone-600">{{ tool.description }}</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Dashboard APF - Análise de Pontos de Função',
  description: 'Dashboard interativo para medição, estimativa e gestão de projetos de software usando a metodologia padronizada de Pontos de Função'
})

const benefits = [
  {
    title: 'Estimativa de Projetos',
    description: 'Base para estimar custo, prazo e esforço',
    icon: 'mdi:calculator'
  },
  {
    title: 'Medição de Produtividade',
    description: 'Permite comparar o desempenho entre projetos e equipes',
    icon: 'mdi:chart-line'
  },
  {
    title: 'Benchmarking',
    description: 'Compara o desempenho da organização com os padrões da indústria',
    icon: 'mdi:compare'
  },
  {
    title: 'Gestão de Contratos',
    description: 'Base objetiva para contratação de software por "preço por ponto de função"',
    icon: 'mdi:file-document'
  },
  {
    title: 'Análise de Portfólio',
    description: 'Ajuda em decisões estratégicas sobre o portfólio de aplicações',
    icon: 'mdi:briefcase'
  },
  {
    title: 'Governança de TI',
    description: 'Padronizada pela ISO, garantindo consistência global',
    icon: 'mdi:shield-check'
  }
]

const tools = [
  {
    title: 'Calculadora',
    description: 'Monte uma contagem detalhada de um projeto completo',
    icon: 'mdi:calculator-variant',
    path: '/calculadora'
  },
  {
    title: 'Analisador',
    description: 'Analise requisitos e obtenha estimativas rápidas',
    icon: 'mdi:text-search',
    path: '/analisador'
  },
  {
    title: 'Sprint',
    description: 'Simule e planeje sprints com distribuição de esforço',
    icon: 'mdi:run-fast',
    path: '/sprint'
  },
  {
    title: 'Fases',
    description: 'Visualize a distribuição de esforço por fase do projeto',
    icon: 'mdi:timeline',
    path: '/fases'
  },
  {
    title: 'Portfólio',
    description: 'Planeje e gerencie seu portfólio de projetos',
    icon: 'mdi:briefcase-outline',
    path: '/portfolio'
  },
  {
    title: 'Simulado APF',
    description: 'Teste seus conhecimentos com questões práticas',
    icon: 'mdi:school',
    path: '/simulado'
  },
  {
    title: 'Referências',
    description: 'Consulte tabelas e fórmulas de cálculo',
    icon: 'mdi:book-open-variant',
    path: '/referencias'
  }
]
</script>
