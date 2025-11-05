<template>
  <footer class="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-auto border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Sobre -->
        <div>
          <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-3">Sobre o Dashboard APF</h3>
          <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Ferramenta completa para Análise de Pontos de Função, seguindo os padrões IFPUG e as diretrizes do Roteiro de Métricas de Software do SISP.
          </p>
        </div>

        <!-- Links Rápidos -->
        <div>
          <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-3">Links Rápidos</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Visão Geral
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/calculadora" class="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Calculadora de Projeto
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/sprint" class="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Simulador de Sprint
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/referencias" class="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Referências e Tabelas
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Informações -->
        <div>
          <h3 class="text-gray-900 dark:text-white font-bold text-lg mb-3">Padrões e Referências</h3>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li class="flex items-start">
              <Icon name="mdi:check-circle" class="text-teal-600 dark:text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>IFPUG CPM 4.3.1</span>
            </li>
            <li class="flex items-start">
              <Icon name="mdi:check-circle" class="text-teal-600 dark:text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>Roteiro SISP v2.3</span>
            </li>
            <li class="flex items-start">
              <Icon name="mdi:check-circle" class="text-teal-600 dark:text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
              <span>ISO/IEC 20926</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-300 dark:border-gray-700 mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; {{ currentYear }} Dashboard APF. Desenvolvido para facilitar a gestão de projetos de software.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
