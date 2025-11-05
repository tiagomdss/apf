<script setup lang="ts">
const { isDark, initTheme } = useTheme()

useSeoMeta({
  title: 'Dashboard APF - Análise de Pontos de Função',
  description: 'Dashboard interativo e divertido para aprender e aplicar Análise de Pontos de Função'
})

const activeSection = ref('welcome')

const tools = [
  {
    icon: '🧮',
    title: 'Calculadora',
    description: 'Monte uma contagem detalhada de um projeto completo',
    path: '/calculadora',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: '🔍',
    title: 'Analisador',
    description: 'Analise requisitos e obtenha estimativas rápidas',
    path: '/analisador',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: '🏃',
    title: 'Sprint',
    description: 'Simule e planeje sprints com distribuição de esforço',
    path: '/sprint',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: '📊',
    title: 'Fases',
    description: 'Visualize a distribuição de esforço por fase do projeto',
    path: '/fases',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: '💼',
    title: 'Portfólio',
    description: 'Planeje e gerencie seu portfólio de projetos',
    path: '/portfolio',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: '🎓',
    title: 'Simulado APF',
    description: 'Teste seus conhecimentos com questões práticas',
    path: '/simulado',
    color: 'from-yellow-500 to-orange-500'
  }
]

const benefits = [
  {
    icon: '📏',
    title: 'Medição Padronizada',
    description: 'Siga os padrões IFPUG e SISP para medições precisas'
  },
  {
    icon: '⚡',
    title: 'Estimativas Rápidas',
    description: 'Calcule esforço e custo de projetos em minutos'
  },
  {
    icon: '🎯',
    title: 'Gestão Eficiente',
    description: 'Planeje sprints e gerencie portfólios com facilidade'
  },
  {
    icon: '📚',
    title: 'Aprenda Brincando',
    description: 'Interface didática e divertida para dominar APF'
  }
]

onMounted(() => {
  initTheme()
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.3 }
  )

  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section)
  })
})
</script>

<template>
  <div>
    <div class="container mx-auto px-4">
      <div class="lg:flex gap-8">
        <!-- Sidebar -->
        <aside class="hidden lg:block w-64 py-12 sticky top-24 h-fit">
          <nav class="space-y-2">
            <a 
              v-for="link in [
                { id: 'welcome', icon: '🚀', label: 'Bem-vindo' },
                { id: 'what-is', icon: '🤔', label: 'O que é APF?' },
                { id: 'benefits', icon: '✨', label: 'Benefícios' },
                { id: 'tools', icon: '🛠️', label: 'Ferramentas' },
                { id: 'learn', icon: '📖', label: 'Aprenda Mais' }
              ]"
              :key="link.id"
              :href="`#${link.id}`"
              class="flex items-center gap-3 px-4 py-2 rounded-lg transition-all"
              :class="{
                'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-bold': activeSection === link.id,
                'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800': activeSection !== link.id
              }"
            >
              <span>{{ link.icon }}</span>
              <span>{{ link.label }}</span>
            </a>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 py-12 space-y-24">
          
          <!-- Welcome -->
          <section id="welcome" class="text-center scroll-mt-24">
            <h1 class="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
              Bem-vindo ao <span class="bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">APF</span>!
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Aprenda, calcule e gerencie Pontos de Função de forma divertida e eficiente. 
              Vamos transformar a medição de software em uma jornada empolgante! 🎉
            </p>
          </section>

          <!-- What is APF -->
          <section id="what-is" class="scroll-mt-24">
            <h2 class="text-4xl font-bold mb-6 border-b-4 border-teal-500 dark:border-teal-400 inline-block pb-2 text-gray-900 dark:text-white">
              🤔 O que é Análise de Pontos de Função?
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
              A APF é como uma <strong class="text-gray-900 dark:text-white">régua universal</strong> para medir software! 
              Imagine poder comparar projetos diferentes, feitos em linguagens diferentes, 
              usando uma medida justa e padronizada. Isso é APF!
            </p>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-blue-500/10 transition-all hover:-translate-y-2">
                <div class="text-5xl mb-3">🎯</div>
                <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Foco no Usuário</h3>
                <p class="text-gray-600 dark:text-gray-300">Mede o que o software FAZ, não como é feito.</p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-blue-500/10 transition-all hover:-translate-y-2">
                <div class="text-5xl mb-3">⚖️</div>
                <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Independente</h3>
                <p class="text-gray-600 dark:text-gray-300">Não importa a linguagem ou tecnologia usada.</p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-blue-500/10 transition-all hover:-translate-y-2">
                <div class="text-5xl mb-3">📐</div>
                <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Padronizado</h3>
                <p class="text-gray-600 dark:text-gray-300">Segue padrões internacionais (IFPUG).</p>
              </div>
            </div>
          </section>

          <!-- Benefits -->
          <section id="benefits" class="scroll-mt-24">
            <h2 class="text-4xl font-bold mb-6 border-b-4 border-teal-500 dark:border-teal-400 inline-block pb-2 text-gray-900 dark:text-white">
              ✨ Por que usar APF?
            </h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div 
                v-for="benefit in benefits"
                :key="benefit.title"
                class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-blue-500/10 transition-all"
              >
                <div class="flex items-start gap-4">
                  <div class="text-4xl">{{ benefit.icon }}</div>
                  <div>
                    <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{{ benefit.title }}</h3>
                    <p class="text-gray-600 dark:text-gray-300">{{ benefit.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Tools -->
          <section id="tools" class="scroll-mt-24">
            <h2 class="text-4xl font-bold mb-6 border-b-4 border-teal-500 dark:border-teal-400 inline-block pb-2 text-gray-900 dark:text-white">
              🛠️ Ferramentas Disponíveis
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Escolha sua ferramenta e comece a explorar o mundo da APF!
            </p>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NuxtLink
                v-for="tool in tools"
                :key="tool.path"
                :to="tool.path"
                class="group relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div :class="`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity`"></div>
                <div class="relative">
                  <div class="text-5xl mb-3">{{ tool.icon }}</div>
                  <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {{ tool.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">{{ tool.description }}</p>
                </div>
              </NuxtLink>
            </div>
          </section>

          <!-- Learn More -->
          <section id="learn" class="scroll-mt-24 text-center">
            <h2 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">📖 Quer Aprender Mais?</h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore nosso guia completo sobre como funciona a APF e domine a arte de medir software!
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
              <NuxtLink 
                to="/como-funciona"
                class="inline-block px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-bold rounded-full text-lg transition-all hover:scale-105 shadow-lg"
              >
                🚀 Como Funciona
              </NuxtLink>
              <NuxtLink 
                to="/referencias"
                class="inline-block px-8 py-4 bg-white dark:bg-gray-800 border-2 border-teal-600 text-teal-600 dark:text-teal-400 font-bold rounded-full text-lg transition-all hover:scale-105 hover:bg-teal-50 dark:hover:bg-gray-700"
              >
                📚 Referências
              </NuxtLink>
            </div>
          </section>

        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

section {
  animation: fade-in 0.5s ease-out;
}
</style>
