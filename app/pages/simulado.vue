<template>
  <div class="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
    <div class="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/10 p-6 md:p-10 border border-gray-200 dark:border-gray-700">
      
      <!-- Tela Inicial -->
      <div v-if="currentScreen === 'start'" class="text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Simulado APF - Análise de Pontos de Função</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Teste seus conhecimentos com questões baseadas no manual do IFPUG.
          <br>O simulado contém <strong class="text-blue-600 dark:text-blue-400">{{ TOTAL_QUESTIONS_IN_QUIZ }}</strong> questões randomizadas de 3 categorias.
        </p>
        <button @click="startQuiz" class="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
          Iniciar Simulado
        </button>
      </div>

      <!-- Tela do Quiz -->
      <div v-if="currentScreen === 'quiz'">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-blue-600 dark:text-blue-400">Questão {{ currentQuestionIndex + 1 }} de {{ quizQuestions.length }}</h2>
          <div class="text-sm font-semibold text-gray-600 dark:text-gray-400">{{ currentQuestion.category }}</div>
        </div>
        <div class="mb-8">
          <p class="text-xl md:text-2xl font-medium leading-relaxed text-gray-900 dark:text-gray-100">{{ currentQuestion.question }}</p>
        </div>
        <div class="space-y-3 mb-8">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="selectAnswer(index)"
            :class="[
              'option-btn w-full text-left p-4 border-2 rounded-lg transition-all',
              userAnswers[currentQuestionIndex] === index
                ? 'selected bg-blue-600 text-white border-blue-500'
                : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-blue-500'
            ]"
          >
            <span class="font-bold mr-2">{{ String.fromCharCode(65 + index) }}.</span> {{ option }}
          </button>
        </div>
        <div class="flex justify-between items-center mt-8">
          <button 
            @click="prevQuestion" 
            :disabled="currentQuestionIndex === 0"
            :class="[
              'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors',
              currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            ]"
          >
            Anterior
          </button>
          <button 
            v-if="currentQuestionIndex < quizQuestions.length - 1"
            @click="nextQuestion" 
            class="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Próxima
          </button>
          <button 
            v-else
            @click="finishQuiz" 
            class="bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            Finalizar
          </button>
        </div>
      </div>

      <!-- Tela de Resultados -->
      <div v-if="currentScreen === 'results'" class="text-center">
        <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Resultado Final</h2>
        <p class="text-xl mb-2 text-gray-700 dark:text-gray-300">Seu placar foi:</p>
        <p class="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">{{ score }} / {{ quizQuestions.length }}</p>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">({{ scorePercentage }}%)</p>
        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <button @click="restart" class="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
            Recomeçar
          </button>
          <button @click="showReview" class="w-full md:w-auto bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-transform transform hover:scale-105">
            Revisar Respostas
          </button>
        </div>
      </div>
      
      <!-- Tela de Revisão -->
      <div v-if="currentScreen === 'review'">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Revisão do Simulado</h2>
          <button @click="backToResults" class="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Voltar
          </button>
        </div>
        <div class="space-y-6">
          <div 
            v-for="(question, index) in quizQuestions" 
            :key="index"
            :class="[
              'p-5 border rounded-lg shadow-md bg-gray-50 dark:bg-gray-800/50',
              userAnswers[index] === question.answer ? 'border-green-600' : 'border-red-600'
            ]"
          >
            <p class="font-bold text-lg mb-2 text-gray-900 dark:text-white">Questão {{ index + 1 }}: {{ question.question }}</p>
            <div class="mb-3">
              <div 
                v-for="(option, optIndex) in question.options" 
                :key="optIndex"
                :class="[
                  'p-3 my-2 rounded-md border',
                  optIndex === question.answer ? 'bg-green-600 text-white border-green-500' : '',
                  optIndex === userAnswers[index] && optIndex !== question.answer ? 'bg-red-600 text-white border-red-500' : '',
                  optIndex !== question.answer && optIndex !== userAnswers[index] ? 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300' : ''
                ]"
              >
                {{ String.fromCharCode(65 + optIndex) }}. {{ option }}
              </div>
            </div>
            <div class="p-3 bg-blue-50 dark:bg-gray-900/80 rounded-lg border border-blue-300 dark:border-blue-800">
              <p class="font-semibold text-blue-600 dark:text-blue-400">Explicação:</p>
              <p class="text-gray-700 dark:text-gray-300">{{ question.explanation }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de Confirmação de Saída -->
      <Transition name="fade">
        <div v-if="showExitModal" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 dark:bg-black/70">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sair do Simulado?</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Você está no meio de um simulado. Se sair agora, o simulado será reiniciado e todo o progresso será perdido.
            </p>
            <div class="flex gap-3 justify-end">
              <button
                @click="cancelExit"
                class="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Não, continuar
              </button>
              <button
                @click="confirmExit"
                class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Sim, sair
              </button>
            </div>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Simulado APF - Dashboard APF',
  description: 'Teste seus conhecimentos em Análise de Pontos de Função com questões práticas'
})

interface Question {
  question: string
  options: string[]
  answer: number
  explanation: string
  category: string
}

const TOTAL_QUESTIONS_IN_QUIZ = 30 // 30 questões aleatórias de um banco de 150+

const questionBank = {
  ifpugRules: [
    { question: "Qual das seguintes NÃO é uma das cinco funções medidas pela Análise de Pontos de Função (APF)?", options: ["Entrada Externa (EE)", "Saída Externa (SE)", "Consulta Externa (CE)", "Processamento Lógico Interno (PLI)", "Arquivo Lógico Interno (ALI)"], answer: 3, explanation: "As cinco funções são: Entrada Externa (EE), Saída Externa (SE), Consulta Externa (CE), Arquivo Lógico Interno (ALI) e Arquivo de Interface Externa (AIE). 'Processamento Lógico Interno' não é uma delas." },
    { question: "Qual é a principal intenção de uma Entrada Externa (EE)?", options: ["Apresentar dados ao usuário.", "Manter (incluir, alterar, excluir) os dados de um ou mais Arquivos Lógicos Internos (ALIs).", "Ler dados de um ALI sem alterá-los.", "Representar um grupo de dados mantido por outra aplicação.", "Calcular um valor complexo."], answer: 1, explanation: "A intenção primária de uma Entrada Externa é processar dados que vêm de fora da fronteira da aplicação para manter os dados internos (ALIs)." },
    { question: "A diferença fundamental entre uma Saída Externa (SE) e uma Consulta Externa (CE) é que a SE...", options: ["...lê dados de um ALI, enquanto a CE não.", "...apenas apresenta dados, sem processamento.", "...inclui lógica de processamento além da recuperação direta de dados (ex: cálculos, formatação).", "...é sempre iniciada por outra aplicação, nunca por um usuário.", "...mantém um ALI."], answer: 2, explanation: "Ambas apresentam dados. A CE apenas recupera e exibe. A SE envolve algum tipo de processamento adicional, como cálculos, derivação de dados ou formatação específica antes da apresentação." },
    { question: "O que define um Arquivo de Interface Externa (AIE)?", options: ["Um arquivo de log do sistema.", "Um grupo de dados lógicos que é mantido pela própria aplicação.", "Uma tabela temporária usada para processamento.", "Um grupo de dados lógicos que é referenciado pela aplicação, mas mantido por outra aplicação.", "Uma interface de hardware, como uma impressora."], answer: 3, explanation: "Um AIE representa dados que a sua aplicação lê, mas não mantém. A responsabilidade pela manutenção dos dados do AIE é de outra aplicação." },
    { question: "O que é um 'processo elementar' no contexto da APF?", options: ["Qualquer clique do mouse.", "A menor unidade de atividade que é significativa para o usuário e deixa o negócio em um estado consistente.", "Uma única linha de código.", "Um processo que roda em menos de 1 segundo.", "Uma função que não acessa o banco de dados."], answer: 1, explanation: "Um processo elementar é a menor unidade de trabalho que um usuário reconhece como uma tarefa completa e que, ao ser concluída, deixa os dados da aplicação em um estado consistente." },
    { question: "Conforme a IFPUG, o primeiro passo para o cálculo do Valor do Fator de Ajuste (VAF) é avaliar cada uma das:", options: ["14 características gerais do sistema na escala de 0 a 5", "10 características gerais do sistema na escala de 0 a 3", "7 características gerais do sistema na escala de 1 a 3", "5 características gerais do sistema na escala de 0 a 5"], answer: 0, explanation: "O VAF é calculado a partir do Somatório do Nível de Influência (TDI), que é a soma da avaliação das 14 Características Gerais do Sistema (CGS). Cada característica é avaliada em uma escala de 0 (sem influência) a 5 (influência forte)." },
    { question: "A métrica de pontos por função (IFPUG) visa estimar recursos para projetos de softwares orientados a objetos a partir de casos de uso.", options: ["Certo", "Errado"], answer: 1, explanation: "A Análise de Pontos de Função (APF) é uma métrica de tamanho funcional, independente da tecnologia (como OO). Ela não estima recursos diretamente, mas sim o tamanho, que serve de entrada para modelos de estimativa de esforço." },
    { question: "Treinamentos em TI devem ser incluídos no cálculo dos pontos de função.", options: ["Certo", "Errado"], answer: 1, explanation: "A contagem de PF mede o tamanho funcional do software. Atividades de projeto como treinamentos, gerenciamento ou documentação não fazem parte do escopo da contagem." },
    { question: "Backfiring deriva PF a partir de Linhas de Código (LOC), utilizando um fator de conversão independente da linguagem.", options: ["Certo", "Errado"], answer: 1, explanation: "O método Backfiring estima PF a partir de LOC, mas o fator de conversão é totalmente dependente da linguagem de programação, pois a expressividade de cada uma é diferente." },
    { question: "Funcionalidades de migração ou carga inicial de dados não são consideradas na contagem de PF de projetos de desenvolvimento ou melhoria.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. Funções de conversão de dados são consideradas parte do esforço de implantação, não do escopo funcional da aplicação a ser mantida pelo usuário, e por isso não são contadas." },
    { question: "Scope Creep é a mudança de requisitos que ocorre durante o desenvolvimento, a partir do maior conhecimento do negócio.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. Scope Creep é o fenômeno de crescimento do escopo de um projeto após seu início, muitas vezes de forma não controlada, à medida que o entendimento do negócio evolui." },
    { question: "Se um sistema tem 90 PF não ajustados e 80,10 PF ajustados, o somatório dos níveis de influência (TDI) é 24.", options: ["Certo", "Errado"], answer: 0, explanation: "A fórmula é: PFA = PFNA * (0,65 + 0,01 * TDI). Logo, 80,10 = 90 * (0,65 + 0,01 * TDI). Isolando TDI: (80,10/90) = 0,65 + 0,01*TDI => 0,89 = 0,65 + 0,01*TDI => 0,24 = 0,01*TDI => TDI = 24." },
    { question: "Para um sistema de 1.000 PF não ajustados, a faixa de valores possíveis de PF ajustados é:", options: ["de 500 a 1.500.", "de 650 a 1.350.", "de 700 a 1.300.", "de 860 a 1.140."], answer: 1, explanation: "O Fator de Ajuste (VAF) varia de 0,65 (TDI=0) a 1,35 (TDI=70). Portanto, a contagem ajustada pode variar de 1.000 * 0,65 = 650 a 1.000 * 1,35 = 1.350." },
    { question: "Os 3 tipos de contagem de PF são: Desenvolvimento, Melhoria ou...", options: ["Aplicação.", "Suporte.", "Pesquisa.", "Interoperabilidade."], answer: 0, explanation: "O IFPUG define três tipos de contagem: Projeto de Desenvolvimento, Projeto de Melhoria (manutenção) e Contagem de Aplicação (mede o tamanho total em um dado momento)." },
    { question: "Na APF, a contagem dos PF não ajustados precede a determinação do fator de ajuste.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. O processo é: 1. Contar as funções de dados e transação para obter os PF não ajustados. 2. Avaliar as 14 CGS para calcular o VAF. 3. Multiplicar os dois para obter os PF ajustados." },
    { question: "Na fórmula VAF = X + (0.01 * TDI), o valor correto para X é:", options: ["1,00", "0,65", "0,50", "2,00"], answer: 1, explanation: "A fórmula padrão do IFPUG para o cálculo do Fator de Ajuste de Valor (VAF) é: VAF = 0,65 + (0,01 * TDI). A constante base é 0,65." },
    { question: "Se o Fator de Ajuste (VAF) é 1,21, qual a soma das características gerais do sistema (TDI)?", options: ["0,65", "21", "56", "90"], answer: 2, explanation: "Usando a fórmula VAF = 0,65 + (0,01 * TDI), temos 1,21 = 0,65 + (0,01 * TDI). Isolando TDI: 1,21 - 0,65 = 0,56. Então, TDI = 0,56 / 0,01 = 56." },
    { question: "Com 216 PF Não Ajustados e um VAF de 1.11, qual o número de PF ajustados?", options: ["120", "195", "240", "389"], answer: 2, explanation: "PF Ajustados (PFA) = PF Não Ajustados (PFNA) * VAF. PFA = 216 * 1,11 = 239,76. O valor arredondado mais próximo é 240." },
    { question: "O primeiro passo da contagem de PF é a identificação do escopo e da fronteira da aplicação.", options: ["Certo", "Errado"], answer: 1, explanation: "De acordo com o Manual de Práticas de Contagem do IFPUG, o primeiro passo do processo é determinar o Tipo de Contagem (Desenvolvimento, Melhoria ou Aplicação). A identificação do escopo e da fronteira é o segundo passo." },
    { question: "Em projetos de melhoria, as funções de conversão de dados não devem ser contadas.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. Assim como em projetos de desenvolvimento, funcionalidades de conversão de dados para implantação não são incluídas no escopo funcional da aplicação." },
    { question: "Os tipos de contagem de PF são de desenvolvimento, melhorias ou aplicações.", options: ["Certo", "Errado"], answer: 0, explanation: "A afirmação está correta. O IFPUG define os três tipos de contagem (Desenvolvimento, Melhoria, Aplicação), e a APF é muito usada para estimativas nos estágios iniciais." },
    { question: "Dados recebidos de outra aplicação para alterar um ALI são computados como AIE.", options: ["Certo", "Errado"], answer: 1, explanation: "Errado. A descrição refere-se a uma Entrada Externa (EE), processo que recebe dados para manter um ALI. Um Arquivo de Interface Externa (AIE) é um grupo de dados lido, mas mantido por outra aplicação." },
    { question: "O IFPUG provê estudos de casos ilustrando a contagem em diferentes fases, como no fim da análise e no final da construção.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. O IFPUG publica o Manual de Práticas de Contagem (CPM) e outros materiais de suporte que incluem diversos estudos de caso e exemplos para auxiliar na aplicação correta da metodologia." },
    { question: "A adição de uma nova página HTML sempre aumentará o número de PF não ajustados.", options: ["Certo", "Errado"], answer: 1, explanation: "Errado. A simples adição de uma página não garante um aumento nos PF; é necessário que ela implemente uma função de transação (EE, SE, CE) ou de dados (ALI, AIE) que atenda a um requisito do usuário." },
    { question: "A relação entre LOC e PF depende da linguagem de programação e da qualidade do projeto.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. A quantidade de Linhas de Código (LOC) para implementar um Ponto de Função varia drasticamente entre linguagens. Fatores como a qualidade do projeto e a habilidade do programador também influenciam." },
    { question: "Ao se utilizar PF e LOC para estimativas, não devem ser usadas referências históricas.", options: ["Certo", "Errado"], answer: 1, explanation: "Errado. Pelo contrário, o uso de dados históricos é fundamental para calibrar modelos de estimativa. A produtividade (ex: horas/PF) de projetos passados é a melhor referência para estimar o esforço de projetos futuros." },
    { question: "A APF tem fórmulas específicas para projetos novos e para manutenção de legados.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. A APF é uma técnica robusta e escalável, aplicável a projetos de desenvolvimento e melhoria (manutenção). As regras são consistentes, mas aplicadas de forma diferente para cada tipo de projeto." },
    { question: "O cálculo de PF é baseado em características do domínio de informação e complexidade do software.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. A contagem de PF considera o domínio da informação (entradas, saídas, arquivos) e a complexidade tanto das funções (via matriz de complexidade) quanto do sistema (via Características Gerais)." },
    { question: "Uma consulta que possua contador incrementado é considerada uma saída externa.", options: ["Certo", "Errado"], answer: 1, explanation: "Errado. A ação de incrementar um contador significa que um Arquivo Lógico Interno (ALI) está sendo mantido. Uma função que mantém um ALI é, por definição, uma Entrada Externa (EE)." },
    { question: "Uma entrada do usuário é definida como uma ação que resulta na geração de uma resposta imediata do software.", options: ["Certo", "Errado"], answer: 1, explanation: "Errado. Esta é a definição de uma Consulta Externa (CE). Uma Entrada Externa (EE) é um processo cuja intenção primária é manter um ou mais ALIs." },
    { question: "Se duas aplicações mantêm o mesmo ALI, ele será contado apenas na aplicação que detém o arquivo físico.", options: ["Certo", "Errado"], answer: 1, explanation: "Errado. Em APF, a fronteira é lógica. Se duas aplicações distintas mantêm o mesmo grupo lógico de dados, ele será contado como um ALI para cada uma delas." },
    { question: "A fórmula de cálculo de PF exprime uma relação exponencial.", options: ["Certo", "Errado"], answer: 1, explanation: "Errado. A relação é linear. A contagem de PF Não Ajustados é uma soma ponderada, e o Fator de Ajuste também é calculado de forma linear." },
    { question: "Valores de ajuste de complexidade são obtidos a partir de questões relativas ao contexto do software.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. Os valores de ajuste (VAF) derivam da avaliação das 14 Características Gerais do Sistema (CGS), que abordam o contexto não funcional (desempenho, usabilidade, etc.)." },
    { question: "Um fator de complexidade permite dar um peso a cada característica do domínio da informação.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. Cada função (ALI, AIE, EE, SE, CE) é classificada em baixa, média ou alta complexidade, e a essa classificação é associado um peso em pontos de função." },
    { question: "ALIs de alta complexidade representam a maior contribuição para a contagem de PF não ajustados.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. De acordo com a tabela de pesos do IFPUG, um ALI de alta complexidade contribui com 15 pontos, o maior valor entre todos os tipos de funções." },
    { question: "Os componentes contados na APF são: ALIs, arquivos de interface interna, EEs, CEs e SEs.", options: ["Certo", "Errado"], answer: 1, explanation: "Errado. O erro está em 'arquivos de interface interna'. O correto é 'arquivos de interface EXTERNA' (AIE)." },
    { question: "A métrica de APF é mais para estimar o esforço que para estimar o prazo.", options: ["Certo", "Errado"], answer: 1, explanation: "Errado. A APF é uma métrica de TAMANHO. Ela não estima esforço nem prazo diretamente. O tamanho (em PF) é usado como entrada para modelos que, com dados históricos, estimam o esforço e, consequentemente, o prazo." },
    { question: "Itens de contagem de PF incluem requisitos e saídas, onde campos individuais são saídas separadas.", options: ["Certo", "Errado"], answer: 1, explanation: "Errado. 'Requisitos' não é um tipo de função contado. Além disso, uma Saída Externa (SE) é a transação como um todo, não seus campos individuais." },
    { question: "A contagem de ALIs é contabilizada como pontos não ajustados.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. A soma das contribuições ponderadas de todas as funções (incluindo ALIs) compõe o total de Pontos de Função Não Ajustados." },
    { question: "A APF mede o tamanho sob o ponto de vista do desenvolvedor.", options: ["Certo", "Errado"], answer: 1, explanation: "Errado. A premissa da APF é medir o software sob o ponto de vista do USUÁRIO, quantificando a funcionalidade que ele solicita e recebe." },
    { question: "Para determinar PF não ajustados, multiplica-se o total de ALIs, AIEs, entidades externas, SEs e CEs pela complexidade.", options: ["Certo", "Errado"], answer: 1, explanation: "Errado. O erro é 'entidades externas'. O componente correto é 'entradas externas' (EE)." },
    { question: "Estimativas de tamanho auxiliam na análise de custos e benefícios do projeto.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. Uma estimativa de tamanho funcional (em PF) é uma base objetiva para negociar escopo, estimar custos e prazos, e realizar análises de viabilidade." },
    { question: "No método backfiring, assume-se uma relação linear entre o tamanho funcional e o físico.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. Backfiring usa Linhas de Código para estimar Pontos de Função, baseando-se em tabelas que assumem uma relação de produtividade (LOC por PF), implicando uma correlação linear." },
    { question: "A APF auxilia a gerenciar problemas como baixos custos e atrasos no pagamento.", options: ["Certo", "Errado"], answer: 1, explanation: "Errado. A APF ajuda a gerenciar problemas como estouro de custos (não 'baixos custos') e produtividade, mas não está diretamente relacionada a 'atrasos no pagamento'." },
    { question: "Funcionalidades de 'help' devem ser contadas se forem um requisito do usuário.", options: ["Certo", "Errado"], answer: 0, explanation: "Correto. Se o sistema de 'help' é um requisito do usuário e possui funcionalidades que se encaixam nas definições de funções de dados e transações, elas devem ser contadas." },
    { question: "Qual das seguintes afirmativas define melhor a Análise de Pontos de Função (APF)?", options: ["Mede o tamanho funcional do sistema sob o ponto de vista do usuário.", "Analisa funções da linguagem para medir o tempo de desenvolvimento.", "Analisa o tempo de processamento para medir a qualidade do código."], answer: 0, explanation: "Esta é a definição mais precisa. A APF mede o tamanho funcional de um software a partir da perspectiva do usuário, quantificando as funcionalidades que ele solicita e recebe." },
    { question: "Os pesos 3, 4 e 6 (simples, médio, complexo) se aplicam a quais tipos de função?", options: ["Entrada externa e saída externa.", "Entrada externa e consulta externa.", "Consulta externa e saída externa.", "Arquivo lógico interno e consulta externa."], answer: 1, explanation: "Consultando a tabela de pesos do IFPUG, tanto a Entrada Externa (EE) quanto a Consulta Externa (CE) utilizam os pesos 3, 4 e 6 para complexidade baixa, média e alta, respectivamente." },
    { question: "Com 1 ALI (S:7, M:10, C:15), 1 AIE (S:5, M:7, C:10), 1 EE (S:3, M:4, C:6), 1 SE (S:4, M:5, C:7) e 1 CE (S:3, M:4, C:6) de cada complexidade, qual o total de PF brutos?", options: ["96", "99", "106", "109"], answer: 0, explanation: "Soma dos pesos por tipo: ALI(7+10+15=32), AIE(5+7+10=22), EE(3+4+6=13), SE(4+5+7=16), CE(3+4+6=13). Total = 32+22+13+16+13 = 96." },
    { question: "Qual função de dados se refere a um depósito de dados mantido fora da aplicação?", options: ["AIE (Arquivo de Interface Externa)", "ALI (Arquivo Lógico Interno)", "EE (Entrada Externa)", "SE (Saída Externa)"], answer: 0, explanation: "Essa é a definição exata de um Arquivo de Interface Externa (AIE ou EIF), dados que a aplicação lê, mas não mantém." },
    { question: "Identifique os tipos de função I, II e III com base nos pesos: I(7,10,15), II(5,7,10), III(4,5,7).", options: ["ALI, AIE, SE", "ALI, CE, AIE", "CE, EE, ALI", "AIE, ALI, EE"], answer: 0, explanation: "Consultando a tabela de pesos padrão do IFPUG: I(7,10,15) corresponde a ALI, II(5,7,10) corresponde a AIE e III(4,5,7) corresponde a SE." },
    { question: "Qual metodologia tem como objetivos medir o que o usuário recebe, apoiar a análise de produtividade, estimar o tamanho do software e ser um fator de normalização para comparação?", options: ["Modelagem de Dados", "Análise de Pontos por Função", "Model Driven Architecture", "Service Oriented Architecture"], answer: 1, explanation: "Todos os itens listados são objetivos e benefícios primários da Análise de Pontos por Função (APF)." },
    { question: "Qual o total de PF não ajustados para 10 ALI simples, 5 EE médias, 2 SE complexas e 5 CE complexas?", options: ["118", "126", "134", "162"], answer: 2, explanation: "Cálculo: (10 * 7 para ALI simples) + (5 * 4 para EE médias) + (2 * 7 para SE complexas) + (5 * 6 para CE complexas) = 70 + 20 + 14 + 30 = 134." },
    { question: "Sobre métricas de software é correto afirmar que:", options: ["um indicador é parte de uma métrica.", "custo e funcionalidade são métricas indiretas.", "a métrica de pontos de função só pode ser calculada com o código terminado.", "linhas de código, esforço e memória são métricas diretas."], answer: 3, explanation: "Métricas diretas são aquelas que podem ser medidas diretamente do artefato (ex: LOC, esforço em horas). Métricas indiretas são derivadas (ex: produtividade). APF é calculada antes do código. Um indicador é a interpretação de uma métrica." },
    { question: "Analise os passos da contagem de PF: I. Identificação do propósito; II. Determinação do tipo (incluindo conversão de dados); III. Contagem das funções; IV. Cálculo do fator de ajuste; V. Cálculo dos PF ajustados. Quais estão corretos?", options: ["I, III, IV e V, apenas.", "I, II, III e IV, apenas.", "II, III, IV e V, apenas.", "I, II, III, IV e V."], answer: 0, explanation: "O passo II está incorreto porque funções de conversão de dados são explicitamente excluídas da contagem de PF de um projeto de desenvolvimento. Portanto, a opção que exclui o item II (I, III, IV e V) é a correta." },
    { question: "Se 4 das 14 Características Gerais têm influência forte (grau 5), os pontos ajustados serão:", options: ["65% dos pontos brutos", "75% dos pontos brutos", "85% dos pontos brutos", "115% dos pontos brutos"], answer: 2, explanation: "TDI = 4 * 5 = 20. VAF = 0,65 + (0,01 * 20) = 0,65 + 0,20 = 0,85. Portanto, os pontos ajustados serão 85% dos pontos brutos." },
    { question: "Se o nível de influência global (TDI) é 20, o PFA em relação ao PFB é:", options: ["PFA = PFB × 0,15", "PFA = PFB × 0,45", "PFA = PFB × 0,85", "PFA = PFB × 1,20"], answer: 2, explanation: "VAF = 0,65 + (0,01 * TDI) = 0,65 + (0,01 * 20) = 0,65 + 0,20 = 0,85. Logo, PFA = PFB * 0,85." },
    { question: "Os três tipos de contagem de PF se dividem em:", options: ["entrada, saída e processamento.", "requisitos, elaboração e testes.", "desenvolvimento, melhoria e aplicação.", "lógico, físico e modelagem."], answer: 2, explanation: "Os tipos de contagem definidos pelo IFPUG são: Projeto de Desenvolvimento, Projeto de Melhoria (ou Manutenção) e Contagem de Aplicação." },
    { question: "Com 1952 PF brutos e valor 3 aplicado a todos os 14 fatores de ajuste, os PF ajustados são:", options: ["1268,80", "1542,08", "2088,64", "2635,20"], answer: 2, explanation: "TDI = 14 * 3 = 42. VAF = 0,65 + (0,01 * 42) = 0,65 + 0,42 = 1,07. PFA = 1952 * 1,07 = 2088,64." },
    { question: "Qual a definição de um processo que mantém dados recebidos de fora da fronteira em um ou mais ALIs?", options: ["SE", "AIE", "EE", "ALI"], answer: 2, explanation: "Esta é a definição precisa de uma Entrada Externa (EE)." },
    { question: "Na APF, o fator de ajuste pode aumentar ou diminuir os pontos brutos em até:", options: ["aumentar em 35% ou diminuir em 65%.", "aumentar ou diminuir em até 35%.", "aumentar ou diminuir em até 65%.", "aumentar ou diminuir em até 1,35%."], answer: 1, explanation: "O VAF varia de 0,65 (-35%) a 1,35 (+35%). Portanto, a variação máxima, para mais ou para menos, é de 35%." },
    { question: "Com 550 PF brutos e TDI de 30, a medida final em PF foi:", options: ["520", "522,5", "552,5", "580"], answer: 1, explanation: "VAF = 0,65 + (0,01 * 30) = 0,65 + 0,30 = 0,95. PFA = 550 * 0,95 = 522,5." },
    { question: "Com 320 PF brutos, 3 influências moderadas (2), 1 significante (4) e 2 fortes (5), qual a pontuação ajustada?", options: ["208", "272", "360", "432"], answer: 1, explanation: "TDI = (3 * 2) + (1 * 4) + (2 * 5) = 6 + 4 + 10 = 20. VAF = 0,65 + (0,01 * 20) = 0,85. PFA = 320 * 0,85 = 272." },
    { question: "Na tabela de pesos, os valores para ALI complexo (X), AIE médio (Y) e SE simples (Z) são, respectivamente:", options: ["12, 7, 3", "15, 7, 4", "13, 6, 4", "15, 8, 3"], answer: 1, explanation: "Consultando a tabela de pesos padrão do IFPUG: ALI complexo = 15, AIE médio = 7 e SE simples = 4." },
    { question: "Na tabela de pesos, as funções I (5,7,10), II (7,10,15) e III (4,5,7) correspondem, respectivamente, a:", options: ["SE, ALI, AIE", "AIE, ALI, SE", "AIE, SE, ALI", "ALI, AIE, SE"], answer: 1, explanation: "Consultando a tabela de pesos padrão do IFPUG: I(5,7,10) é AIE, II(7,10,15) é ALI, e III(4,5,7) é SE." },
    { question: "Analise as afirmativas sobre APF: I. A medição é do ponto de vista do desenvolvedor. II. A contagem sem ajustes (UFPC) reflete as funcionalidades. III. É uma ferramenta para determinar os benefícios de pacotes. Quais estão corretas?", options: ["Apenas II.", "Apenas I e II.", "Apenas I e III.", "Apenas II e III."], answer: 3, explanation: "A afirmação I está incorreta (é do ponto de vista do USUÁRIO). A afirmação II está correta (UFPC reflete funcionalidades). A afirmação III está correta (APF ajuda a avaliar pacotes). Portanto, II e III estão corretas." },
    { question: "Com 140 PF brutos e 110,60 PF ajustados, qual o somatório dos itens do nível de influência (TDI)?", options: ["11", "14", "15", "18"], answer: 1, explanation: "PFA = PFNA * (0,65 + 0,01 * TDI) => 110,60 = 140 * (0,65 + 0,01 * TDI) => (110,60/140) = 0,79 = 0,65 + 0,01 * TDI => 0,14 = 0,01 * TDI => TDI = 14." },
    { question: "Uma contagem de funções resultou em 65 PF Brutos e o TDI foi calculado em 30. Qual o total de PF ajustados?", options: ["52,25", "57,95", "61,75", "67,45"], answer: 2, explanation: "Com os dados fornecidos: PF Bruto = 65. TDI = 30. O cálculo do VAF é: VAF = 0,65 + (0,01 * TDI) = 0,65 + (0,01 * 30) = 0,95. O cálculo do PFA é: PFA = PF Bruto * VAF = 65 * 0,95 = 61,75." },
    { question: "EE de média complexidade e ALI de alta complexidade valem, respectivamente:", options: ["3 e 7", "3 e 10", "4 e 10", "4 e 15"], answer: 3, explanation: "De acordo com a tabela de pesos do IFPUG, uma Entrada Externa (EE) de média complexidade vale 4 pontos, e um Arquivo Lógico Interno (ALI) de alta complexidade vale 15 pontos." },
    { question: "Qual tipo NÃO pertence ao domínio de informação da métrica Ponto de Função?", options: ["Entradas externas (EIs)", "Saídas externas (EOs)", "Consultas externas (EQs)", "Transações lógicas externas (ELTs)"], answer: 3, explanation: "'Transações lógicas externas' não é um dos cinco tipos de função definidos pelo IFPUG. Os cinco são: Entradas Externas, Saídas Externas, Consultas Externas, Arquivos Lógicos Internos e Arquivos de Interface Externa." },
    { question: "Na análise de pontos de função, são apenas do tipo Transação as funções:", options: ["ALI e SE", "ALI e AIE", "CE, EE e SE", "CE, EE, SE e AIE"], answer: 2, explanation: "As funções são divididas em dois grupos: Funções de Dados (ALI e AIE) e Funções de Transação (EE, SE e CE)." }
  ],
  exercises: [
    { question: "Uma tela de cadastro de 'Clientes' possui campos para dados pessoais (CPF, nome, endereço) e dados de contato (telefone, email). A aplicação mantém esses dados. Os dados são salvos em uma única tabela no banco de dados. Como essa funcionalidade seria classificada?", options: ["Como um ALI de baixa complexidade.", "Como um AIE de média complexidade.", "Como um ALI com 2 TREs (Dados Pessoais, Dados de Contato).", "Como uma Entrada Externa (EE) apenas.", "Como dois ALIs separados."], answer: 2, explanation: "A tela representa um único Arquivo Lógico Interno (Cliente). Os agrupamentos 'dados pessoais' e 'dados de contato' são reconhecidos pelo usuário como subgrupos, portanto, são 2 TREs." },
    { question: "Um processo permite ao usuário inserir o código de um produto e o sistema exibe na tela o nome, o preço e o estoque atual. O sistema não realiza cálculos e os dados são lidos de um ALI. Qual tipo de função de transação é essa?", options: ["Entrada Externa (EE)", "Saída Externa (SE)", "Consulta Externa (CE)", "Arquivo Lógico Interno (ALI)", "Arquivo de Interface Externa (AIE)"], answer: 2, explanation: "É uma Consulta Externa (CE) porque o objetivo principal é apresentar dados ao usuário. Não há processamento complexo nem alteração de dados." },
    { question: "Considere um ALI 'Produto' com 45 Tipos de Dados Elementares (TDEs) e 2 Tipos de Registros Elementares (TREs). Qual é a sua complexidade funcional?", options: ["Baixa", "Média", "Alta", "Não pode ser determinada", "Muito Alta"], answer: 1, explanation: "A complexidade de ALIs/AIEs é determinada por uma matriz. Para 2-5 TREs e 20-50 TDEs, a complexidade é Média." },
    { question: "Uma funcionalidade de 'Incluir Pedido' recebe dados do item, quantidade e cliente. O processo valida o estoque (lendo o ALI 'Produto'), calcula o total do pedido e salva os dados no ALI 'Pedido'. Esta funcionalidade deve ser contada como:", options: ["Uma Consulta Externa (CE), pois lê o estoque.", "Uma Saída Externa (SE), pois mostra uma mensagem de sucesso.", "Uma Entrada Externa (EE), pois seu objetivo principal é manter o ALI 'Pedido'.", "Dois ALIs ('Produto' e 'Pedido').", "Um processo não elementar."], answer: 2, explanation: "A intenção primária do usuário é adicionar um novo pedido. O processo mantém (adiciona dados) o ALI 'Pedido', o que a caracteriza como uma Entrada Externa (EE)." },
    { question: "Um relatório de 'Vendas Mensais' é gerado. Ele lê dados do ALI 'Pedido' e do ALI 'Cliente', realiza cálculos de totais e subtotais por região e apresenta os resultados em formato de tabela. Esta funcionalidade é uma:", options: ["Entrada Externa (EE)", "Consulta Externa (CE)", "Saída Externa (SE)", "Função de dados complexa", "Transação interna"], answer: 2, explanation: "É uma Saída Externa (SE) porque apresenta dados ao usuário e envolve lógica de processamento (cálculos) além da simples recuperação de dados." },
    { question: "Uma tela de login que valida usuário e senha contra um ALI 'Usuários' é classificada como:", options: ["Uma Entrada Externa (EE), pois a intenção é entrar no sistema, o que altera o estado lógico da aplicação.", "Uma Consulta Externa (CE), pois apenas lê os dados do usuário.", "Uma Saída Externa (SE), pois exibe uma mensagem de erro ou sucesso.", "Um processo não elementar.", "Um ALI 'Usuários'."], answer: 0, explanation: "Apesar de parecer uma consulta, a intenção do usuário é processar dados que entram na aplicação para realizar uma ação (login), o que é uma característica de EE. A validação é parte do processamento." },
    { question: "Um sistema exporta uma lista de clientes para um arquivo CSV. O processo lê o ALI 'Clientes', formata os dados e gera o arquivo para download. Esta funcionalidade é uma:", options: ["Consulta Externa (CE)", "Saída Externa (SE)", "Entrada Externa (EE)", "Arquivo de Interface Externa (AIE)", "Função de conversão de dados."], answer: 1, explanation: "A geração de um arquivo com dados processados ou formatados para o exterior da aplicação é uma Saída Externa (SE)." },
    { question: "Uma Entrada Externa (EE) possui 15 TDEs (Tipos de Dados Elementares) e referencia 2 ALIs (Arquivos Lógicos Referenciados). Qual é a sua complexidade?", options: ["Baixa", "Média", "Alta", "Depende dos TREs.", "Não pode ser determinada."], answer: 1, explanation: "Pela matriz de complexidade de transações do IFPUG, uma EE com 2 ALRs (FTRs) e 15 TDEs (DETs) se enquadra na complexidade Média." },
    { question: "Um processo noturno (batch) lê um arquivo de transações bancárias (AIE) e atualiza o saldo dos clientes no ALI 'Contas'. Esse processo é classificado como:", options: ["Uma única Entrada Externa (EE).", "Uma única Saída Externa (SE).", "Várias EEs, uma para cada cliente.", "Um processo de sistema, não contado pela APF.", "Um AIE e um ALI."], answer: 0, explanation: "O processo tem a intenção principal de manter um ALI ('Contas'), processando dados que vêm de fora da fronteira. Portanto, é uma Entrada Externa (EE)." },
    { question: "Um usuário pode alterar seu endereço na tela de perfil. Ele preenche os campos (rua, cidade, CEP) e clica em 'Salvar'. O sistema atualiza o ALI 'Cliente'. A transação 'Alterar Endereço' é uma:", options: ["Consulta Externa (CE)", "Saída Externa (SE)", "Entrada Externa (EE)", "Arquivo Lógico Interno (ALI)", "Múltiplas funções."], answer: 2, explanation: "A intenção primária do usuário é manter (neste caso, alterar) os dados de um ALI. Isso caracteriza a transação como uma Entrada Externa (EE)." },
    { question: "Uma tela exibe uma lista de produtos paginada (10 por página). O usuário pode navegar entre as páginas. A navegação de página deve ser contada como:", options: ["Uma SE para cada página.", "Uma CE que inclui a lógica de paginação.", "Não é contada, pois é um controle de interface e não um processo elementar.", "Uma EE, pois o número da página entra na aplicação.", "Um ALI de 'Produtos'." ], answer: 2, explanation: "Controles de interface como paginação, ordenação de colunas ou filtros que não envolvem um novo processamento de negócio não são contados como transações separadas. A transação é a consulta inicial que gera a lista." },
    { question: "Um sistema lê um CEP de uma API externa (AIE) e preenche os campos de endereço na tela. A leitura do CEP e preenchimento dos campos é qual tipo de função?", options: ["Entrada Externa (EE)", "Saída Externa (SE)", "Consulta Externa (CE)", "Não é uma função, é uma feature.", "Um AIE de 'CEP'." ], answer: 2, explanation: "É uma Consulta Externa (CE). A intenção é buscar dados de uma fonte externa (o AIE do serviço de CEP) e apresentá-los ao usuário, sem alterar nenhum ALI." },
    { question: "Uma função de 'Excluir Cliente' remove o registro do cliente do ALI 'Clientes'. A tela de confirmação ('Deseja realmente excluir?') é contada separadamente?", options: ["Sim, como uma SE.", "Não, é parte do processamento da EE 'Excluir Cliente'.", "Sim, como uma CE.", "Depende se o botão 'Sim' for clicado.", "Sim, como outra EE." ], answer: 1, explanation: "A caixa de diálogo de confirmação é parte da interação do usuário dentro de um único processo elementar. A transação é a exclusão em si, que é uma Entrada Externa (EE)." },
    { question: "Um sistema calcula a rota mais curta entre dois pontos, usando dados geográficos de um ALI. A exibição da rota no mapa é uma CE ou SE?", options: ["CE, pois apenas exibe dados.", "SE, pois há uma lógica de processamento complexa (cálculo da rota).", "Uma EE, pois os dois pontos são entradas.", "Um ALI 'Mapa'.", "Nenhuma das anteriores." ], answer: 1, explanation: "A presença de uma lógica de processamento significativa (o algoritmo de cálculo de rota) que deriva novos dados (a rota) antes da apresentação classifica a função como uma Saída Externa (SE)." },
    { question: "Um arquivo de AIE 'Cotação do Dólar' tem apenas 1 TDE (o valor) e, por definição, 1 TRE. Qual sua complexidade?", options: ["Baixa", "Média", "Alta", "Não pode ser determinada.", "Zero." ], answer: 0, explanation: "Pela matriz de complexidade de funções de dados, um arquivo com 1 TRE e 1-19 TDEs tem complexidade Baixa." },
    { question: "O sistema gera um gráfico de pizza com a distribuição de vendas por categoria. Os dados vêm do ALI 'Vendas'. A geração do gráfico é uma CE ou SE?", options: ["CE, pois não há cálculos, apenas representação visual.", "SE, pois a geração de um gráfico é considerada uma lógica de processamento que formata os dados.", "EE, pois o usuário pode pedir o gráfico.", "Depende do tipo de gráfico.", "É uma função não funcional." ], answer: 1, explanation: "A transformação dos dados brutos em uma representação gráfica (pizza, barras, etc.) é considerada uma lógica de processamento. Portanto, é uma Saída Externa (SE)." },
    { question: "Um usuário preenche um formulário com 25 campos (TDEs) para se cadastrar. A função salva em 1 ALI. Qual a complexidade da EE?", options: ["Baixa", "Média", "Alta", "Depende do número de ALRs.", "Não pode ser determinada." ], answer: 1, explanation: "Assumindo 1 ALR (o ALI que está sendo mantido), e 25 TDEs, a matriz de complexidade para EEs indica complexidade Média (para >=2 ALRs seria Alta)." },
    { question: "Para emitir uma nota fiscal, o sistema lê 3 ALIs (Cliente, Produto, Pedido) e 1 AIE (Tabela de Impostos). Quantos ALRs (FTRs) tem essa transação?", options: ["1", "2", "3", "4", "Não é possível saber." ], answer: 3, explanation: "A contagem de ALRs (Arquivos Lógicos Referenciados) é o número de arquivos lógicos (ALIs ou AIEs) distintos que são lidos ou atualizados. Neste caso, 3 ALIs + 1 AIE = 4 ALRs." },
    { question: "Um ALI tem 60 TDEs e 3 TREs. Qual é a sua complexidade?", options: ["Baixa", "Média", "Alta"], answer: 2, explanation: "Pela matriz de complexidade, um ALI/AIE com 2-5 TREs e mais de 50 TDEs é classificado como de Alta complexidade." },
    { question: "Um sistema de RH possui uma função para calcular o imposto de renda. Ele lê o ALI 'Funcionário' e o AIE 'Tabela de Alíquotas'. A função é uma:", options: ["EE", "SE", "CE"], answer: 1, explanation: "É uma Saída Externa (SE) porque envolve lógica de processamento (o cálculo do imposto) para derivar um novo dado antes de apresentá-lo." },
    { question: "Uma SE tem 18 TDEs e acessa 4 ALRs. Qual sua complexidade?", options: ["Baixa", "Média", "Alta"], answer: 2, explanation: "De acordo com a matriz de complexidade para SE/CE, com 4 ou mais ALRs e 6-19 TDEs, a complexidade é Alta." },
    { question: "Um AIE tem 15 TDEs e 1 TRE. Qual sua complexidade?", options: ["Baixa", "Média", "Alta"], answer: 0, explanation: "Pela matriz de complexidade de funções de dados, um arquivo com 1 TRE e 1-19 TDEs tem complexidade Baixa." },
    { question: "Se o TDI de um sistema é 25, qual é o VAF?", options: ["0,90", "1,00", "0,65", "1,25"], answer: 0, explanation: "VAF = 0,65 + (0,01 * TDI) = 0,65 + (0,01 * 25) = 0,65 + 0,25 = 0,90." },
    { question: "Um projeto tem 450 PF não ajustados e um VAF de 1.15. Qual o total de PF ajustados?", options: ["450", "517.5", "391.3", "465"], answer: 1, explanation: "PFA = PFNA * VAF = 450 * 1,15 = 517,5." },
    { question: "Um projeto foi medido em 220 PFA. Sabendo que o VAF foi 1.10, qual era a contagem de PF não ajustados?", options: ["200", "242", "180", "210"], answer: 0, explanation: "PFNA = PFA / VAF = 220 / 1,10 = 200." },
    { question: "Uma CE acessa 3 ALRs e tem 25 TDEs. Qual sua complexidade?", options: ["Baixa", "Média", "Alta"], answer: 2, explanation: "Pela matriz de SE/CE, com 2-3 ALRs e 20 ou mais TDEs, a complexidade é Alta." },
    { question: "Uma EE altera 1 ALI e lê 2 AIEs. Ela processa 8 TDEs. Qual a sua complexidade?", options: ["Baixa", "Média", "Alta"], answer: 1, explanation: "A transação tem 3 ALRs (1 mantido + 2 lidos). Pela matriz de EE, com 2 ou mais ALRs e 5-15 TDEs, a complexidade é Média." },
    { question: "O total de PF brutos de uma aplicação é 150. O TDI é 50. Calcule os PF ajustados.", options: ["120", "150", "172.5", "195"], answer: 2, explanation: "VAF = 0,65 + (0,01 * 50) = 0,65 + 0,50 = 1,15. PFA = 150 * 1,15 = 172,5." }
  ],
  caseStudies: [
    { question: "Estudo de Caso: Sistema de Biblioteca. O sistema deve permitir que o bibliotecário cadastre novos livros (título, autor, editora, ano). Os livros ficam armazenados no sistema. O 'Cadastro de Livros' deve ser contado como:", options: ["Um ALI 'Livro' e uma EE 'Incluir Livro'.", "Apenas um ALI 'Livro'.", "Apenas uma EE 'Incluir Livro'.", "Um AIE 'Livro'.", "Uma CE 'Consultar Livro'."], answer: 0, explanation: "O grupo de dados 'Livro' é um Arquivo Lógico Interno (ALI). A ação de cadastrar um novo livro é uma Entrada Externa (EE) que mantém este ALI." },
    { question: "Estudo de Caso: E-commerce. Um usuário clica em 'Finalizar Compra'. O sistema processa o carrinho, lê os dados do cliente (ALI Cliente), lê os dados dos produtos (ALI Produto), consome um serviço externo (AIE) para validar o pagamento com cartão de crédito, e finalmente, cria um novo registro no ALI 'Venda'. A transação 'Finalizar Compra' é melhor classificada como:", options: ["Uma Saída Externa (SE) complexa.", "Uma Entrada Externa (EE).", "Uma Consulta Externa (CE).", "Um processo de negócio muito complexo para ser contado.", "Múltiplas transações (EE, CE, SE)."], answer: 1, explanation: "Do ponto de vista do usuário, 'Finalizar Compra' é uma única ação. A intenção principal é criar uma nova venda. Portanto, é uma Entrada Externa (EE) que mantém o ALI 'Venda', apesar de ler outros ALIs e AIEs." },
    { question: "Estudo de Caso: Sistema de RH. O sistema gera um contracheque para um funcionário. Ele busca o salário base do ALI 'Funcionário', busca os descontos do ALI 'Tabela de Impostos', calcula o salário líquido e exibe o resultado formatado na tela. A função 'Gerar Contracheque' é:", options: ["Uma Consulta Externa (CE), pois apenas exibe dados.", "Uma Entrada Externa (EE), pois atualiza o status de pagamento.", "Uma Saída Externa (SE), pois possui lógica de processamento (cálculos).", "Um AIE, pois a tabela de impostos pode ser externa.", "Dois ALIs e uma SE."], answer: 2, explanation: "A geração do contracheque envolve processamento (cálculos) antes de apresentar a informação ao usuário, o que a caracteriza como uma Saída Externa (SE)." },
    { question: "Estudo de Caso: App de Previsão do Tempo. O aplicativo busca dados de temperatura e umidade de uma API de meteorologia externa e exibe para o usuário. Os dados não são armazenados no aplicativo. A fonte de dados da API deve ser contada como:", options: ["Um Arquivo Lógico Interno (ALI).", "Um Arquivo de Interface Externa (AIE).", "Uma Entrada Externa (EE).", "Uma Saída Externa (SE).", "Não é contado na APF."], answer: 1, explanation: "A API de meteorologia é um grupo de dados lógicos que é mantido por outra aplicação e apenas referenciado pela aplicação que está sendo contada. Isso define um Arquivo de Interface Externa (AIE)." },
    { question: "Estudo de Caso: Sistema Bancário. O usuário solicita um extrato dos últimos 30 dias. O sistema lê o ALI 'Transações' e o ALI 'Cliente' para exibir a lista de débitos e créditos, junto com o nome do cliente. Nenhuma informação é alterada. Esta funcionalidade é:", options: ["Uma Saída Externa (SE), devido ao filtro de 30 dias.", "Uma Consulta Externa (CE), pois a intenção principal é recuperar e apresentar dados sem processamento complexo.", "Uma Entrada Externa (EE), pois registra a solicitação do extrato.", "Um AIE 'Transações'.", "Um processo não funcional."], answer: 1, explanation: "A funcionalidade é uma Consulta Externa (CE). A recuperação direta de dados de um ou mais ALIs/AIEs e sua apresentação ao usuário, sem lógica de processamento derivada, é a definição de uma CE." },
    { question: "Estudo de Caso: Sistema de Inventário. Um relatório exibe todos os produtos cujo estoque está abaixo de 10 unidades. Ele lê o ALI 'Produto', aplica o filtro e formata uma tabela. Este relatório é uma:", options: ["Consulta Externa (CE), pois apenas mostra dados.", "Saída Externa (SE), pois envolve uma lógica de processamento (o filtro 'estoque < 10').", "Entrada Externa (EE).", "Função de dados.", "Um processo de baixa complexidade."], answer: 1, explanation: "A presença de lógica de processamento, como um filtro ou cálculo que cria dados derivados (a lista de aniversariantes) classifica a função como uma Saída Externa (SE), e não uma simples Consulta (CE)." },
    { question: "Estudo de Caso: Portal Universitário. Um aluno visualiza seu histórico de notas. Os dados são obtidos em tempo real de um sistema acadêmico legado, que não é mantido pela equipe do portal. Para o Portal, o sistema acadêmico legado é um:", options: ["Arquivo Lógico Interno (ALI)", "Arquivo de Interface Externa (AIE)", "Entrada Externa (EE)", "Saída Externa (SE)", "Um sistema fora da fronteira e não é contado."], answer: 1, explanation: "O sistema acadêmico legado é um grupo de dados lógicos mantido por outra aplicação e apenas referenciado pelo Portal. Isso o define como um Arquivo de Interface Externa (AIE)." },
    { question: "Estudo de Caso: CRM. Ao registrar uma nova venda (EE), o sistema automaticamente envia um e-mail de confirmação para o cliente. O envio do e-mail deve ser contado como:", options: ["Uma Saída Externa (SE) separada.", "Parte do processamento da Entrada Externa (EE) 'Registrar Venda'.", "Uma Consulta Externa (CE).", "Uma funcionalidade não-funcional.", "Depende se o usuário solicita o e-mail."], answer: 1, explanation: "O envio do e-mail é uma parte da lógica de processamento do processo elementar iniciado pelo usuário, que é 'Registrar Venda'. Portanto, não é contado como uma transação separada." },
    { question: "Estudo de Caso: Sistema de Reservas de Voos. O usuário busca voos entre duas cidades. O sistema consulta seu próprio ALI 'Voos' e também o sistema de uma companhia aérea parceira (um AIE), e combina os resultados em uma única lista ordenada por preço. A funcionalidade 'Buscar Voos' é uma:", options: ["Consulta Externa (CE), pois o usuário está consultando voos.", "Saída Externa (SE), devido à lógica de combinar e ordenar dados de múltiplas fontes.", "Duas CEs, uma para cada fonte de dados.", "Uma EE, pois a busca é uma entrada.", "Um AIE e um ALI."], answer: 1, explanation: "A lógica de processamento para combinar e ordenar os resultados de duas fontes de dados distintas (um ALI e um AIE) vai além de uma simples recuperação de dados, caracterizando a transação como uma Saída Externa (SE)." },
    { question: "Estudo de Caso: Plataforma de Streaming. Um usuário pode adicionar um filme à sua 'Lista de Favoritos'. Essa ação cria uma associação entre o usuário (do ALI 'Usuários') e o filme (do ALI 'Filmes'), salvando essa associação no ALI 'Favoritos'. A funcionalidade 'Adicionar aos Favoritos' é uma:", options: ["Consulta Externa (CE)", "Saída Externa (SE)", "Entrada Externa (EE)", "Modificação de dois ALIs.", "Uma relação lógica, não contada."], answer: 2, explanation: "A intenção principal é manter (criar um novo registro) o ALI 'Favoritos'. Portanto, é uma Entrada Externa (EE) que lê outros dois ALIs para criar a associação." },
    { question: "Estudo de Caso: Sistema de Fórum. Um usuário posta uma nova mensagem. O sistema salva a mensagem no ALI 'Posts' e atualiza o contador de mensagens no ALI 'Tópicos'. Como contar 'Postar Mensagem'?", options: ["Duas EEs, uma para cada ALI.", "Uma única EE que mantém o ALI 'Posts' e o ALI 'Tópicos'.", "Uma EE para 'Posts' e uma SE para o contador.", "Uma EE complexa.", "Um processo não elementar."], answer: 1, explanation: "Do ponto de vista do usuário, 'Postar Mensagem' é um único processo elementar. Mesmo que dois ALIs sejam atualizados, a ação é uma única Entrada Externa (EE)." },
    { question: "Estudo de Caso: App de Banco. Ao fazer uma transferência (EE), o sistema valida o saldo (lendo ALI 'Contas'), debita da conta de origem e credita na de destino (ambas no mesmo ALI). Como a manutenção do ALI 'Contas' é considerada?", options: ["Como a manutenção de 2 ALIs.", "Como a manutenção de 1 ALI, pois é o mesmo grupo lógico.", "Como uma EE e uma SE.", "Como 2 TREs do mesmo ALI.", "Como uma transação de alta complexidade."], answer: 1, explanation: "Mesmo que duas 'partes' (contas) do arquivo lógico 'Contas' sejam alteradas, ele é contado como a manutenção de um único ALI para essa transação." },
    { question: "Estudo de Caso: Intranet Corporativa. Uma página exibe aniversariantes do dia. O processo lê o ALI 'Funcionários' e filtra pela data de hoje. Como contar essa funcionalidade?", options: ["Como uma CE.", "Como uma SE, devido à lógica de filtro.", "Como um ALI.", "Como uma EE.", "Como um processo diário."], answer: 1, explanation: "A lógica de filtrar os registros (mesmo que seja um filtro simples como a data) para criar um conjunto de dados derivado (a lista de aniversariantes) classifica a função como uma Saída Externa (SE)." },
    { question: "Estudo de Caso: Plataforma EAD. Um professor monta uma prova selecionando questões de um banco (ALI 'Questões') e salvando como uma nova avaliação (ALI 'Avaliações'). A função 'Montar Prova' é uma...", options: ["EE que lê o ALI 'Questões' e mantém o ALI 'Avaliações'.", "SE que exibe as questões selecionadas.", "CE que consulta o banco de questões.", "Múltiplas EEs.", "Função de dados complexa."], answer: 0, explanation: "A intenção primária do professor é criar (manter) uma nova 'Avaliação'. O processo lê dados de 'Questões' para isso, caracterizando uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: Sistema de Logística. Um painel (dashboard) atualiza em tempo real a localização de 50 caminhões, lendo dados de um AIE (serviço de GPS). A exibição no mapa é uma única função?", options: ["Sim, uma única SE complexa.", "Não, são 50 CEs, uma para cada caminhão.", "Sim, uma CE, pois apenas mostra dados.", "Depende da frequência de atualização.", "É uma função não funcional."], answer: 0, explanation: "Do ponto de vista do usuário, é uma única funcionalidade ('Ver Mapa de Caminhões'). A lógica para buscar e apresentar múltiplos pontos de dados de forma consolidada é contada como uma única Saída Externa (SE)." },
    { question: "Estudo de Caso: E-commerce. O sistema recomenda produtos com base no histórico de navegação do usuário (ALI 'Histórico'). A exibição da lista de 'Recomendados para Você' é uma CE ou SE?", options: ["CE, pois apenas exibe produtos.", "SE, pois envolve um algoritmo (lógica de processamento) para gerar a lista de recomendações.", "EE, pois o histórico é uma entrada.", "Um ALI 'Recomendações'.", "Não é contado."], answer: 1, explanation: "A geração de recomendações com base em um algoritmo é uma lógica de processamento que deriva um novo conjunto de dados. Portanto, a exibição dessa lista é uma Saída Externa (SE)." },
    { question: "Estudo de Caso: Sistema de Seguros. A função 'Calcular Apólice' recebe dados do veículo e do motorista, consulta 3 AIEs (Serasa, Detran, Tabela FIPE) e calcula o valor do seguro. Qual o tipo e a principal característica dessa função?", options: ["EE, pois recebe dados do usuário.", "CE, pois consulta fontes externas.", "SE, pois seu objetivo principal é apresentar um dado calculado (o valor do seguro).", "Múltiplas transações.", "Um processo de negócio."], answer: 2, explanation: "A intenção primária do usuário é obter um resultado processado (o valor). Como envolve cálculos e consulta a múltiplas fontes para derivar um novo dado, é uma Saída Externa (SE)." },
    { question: "Estudo de Caso: App de Rede Social. O feed de notícias combina posts do usuário (ALI 'Posts'), posts de amigos (mesmo ALI) e anúncios (AIE 'Anúncios'). O processo de montar e exibir o feed é uma...", options: ["CE.", "Múltiplas CEs e SEs.", "EE.", "SE, devido à lógica de combinação, ordenação e formatação dos dados.", "Função não funcional."], answer: 3, explanation: "A lógica para buscar dados de fontes diferentes (mesmo que um seja o próprio ALI e o outro um AIE), combiná-los, ordená-los (por relevância ou data) e apresentá-los é um processamento que caracteriza a função como uma Saída Externa (SE)." },
    { question: "Estudo de Caso: Sistema de Ponto Eletrônico. Um relatório de 'Horas Trabalhadas' é gerado para um funcionário. Ele lê o ALI 'Registros de Ponto', calcula as horas diárias, as horas extras e os atrasos. Este relatório é uma CE ou SE?", options: ["CE, pois apenas exibe as marcações de ponto.", "SE, pois envolve múltiplos cálculos para derivar novas informações (total de horas, extras, atrasos).", "EE, pois o funcionário solicita o relatório.", "Um ALI de 'Relatórios'.", "Uma função de baixa complexidade."], answer: 1, explanation: "A presença de múltiplos cálculos que transformam os dados brutos (marcações) em informações derivadas (totais, extras) é a marca de uma Saída Externa (SE)." },
    { question: "Estudo de Caso: App de Investimentos. Uma tela exibe um gráfico com a performance histórica de uma ação, buscando os dados de uma API externa (AIE). Como essa funcionalidade é contada?", options: ["Como um AIE apenas.", "Como uma CE que lê o AIE.", "Como uma SE, pois a geração do gráfico é um processamento.", "Como uma EE.", "Não é contada."], answer: 2, explanation: "A transformação dos dados brutos (cotações) em um formato gráfico é considerada uma lógica de processamento. Portanto, a função que busca os dados no AIE e monta o gráfico é uma Saída Externa (SE)." },
    { question: "Estudo de Caso: Sistema de Helpdesk. Um cliente abre um novo ticket de suporte, preenchendendo título, descrição e categoria. O ticket é salvo no ALI 'Tickets'. A função 'Abrir Ticket' é uma:", options: ["SE", "CE", "ALI", "EE", "AIE."], answer: 3, explanation: "A intenção primária do usuário é criar um novo registro, mantendo o ALI 'Tickets'. Isso define a transação como uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: Site de Notícias. O sistema tem uma função de 'Busca' que pesquisa por palavras-chave nos ALIs 'Artigos' e 'Autores' e exibe uma lista de resultados. A busca é uma:", options: ["EE", "SE", "CE", "Dois ALIs", "Não é funcional."], answer: 2, explanation: "A intenção do usuário é consultar informações. O sistema lê um ou mais ALIs e apresenta os dados. É uma Consulta Externa (CE). A lógica de busca em si é considerada parte da recuperação de dados da CE." },
    { question: "Estudo de Caso: Ferramenta de BI. A ferramenta importa um arquivo .CSV (fornecido pelo usuário) e popula as tabelas do ALI 'Vendas'. A função 'Importar CSV' é uma:", options: ["SE", "EE, pois a intenção é manter o ALI 'Vendas'.", "CE", "AIE", "Função de sistema."], answer: 1, explanation: "O processo elementar iniciado pelo usuário tem como objetivo principal processar dados que entram na fronteira para manter um ou mais ALIs. É uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: App de Delivery. O usuário pode 'Rastrear Pedido'. A tela mostra o status atual ('Em preparação', 'Saiu para entrega'), lendo de um ALI 'Pedidos' e exibe a localização do entregador em um mapa, lendo de um AIE (API de geolocalização). Como contar?", options: ["Como uma CE.", "Como uma SE, devido à combinação de fontes e exibição no mapa.", "Como uma EE.", "Como um ALI e um AIE.", "Duas transações separadas."], answer: 1, explanation: "Do ponto de vista do usuário é uma única função. A combinação de dados de fontes distintas (ALI e AIE) e sua apresentação em um formato específico (mapa) envolve lógica de processamento, classificando-a como uma Saída Externa (SE)." },
    { question: "Estudo de Caso: Sistema Acadêmico. A função 'Fechar Semestre' é um processo batch que lê as notas do ALI 'Notas Parciais', calcula a média final de cada aluno, e atualiza o status ('Aprovado'/'Reprovado') no ALI 'Histórico Escolar'. Como contar?", options: ["Como múltiplas EEs.", "Como uma SE.", "Como uma única e complexa EE.", "Como uma função de dados.", "Não é contada pois é batch."], answer: 2, explanation: "É um processo com uma única intenção clara: atualizar o histórico escolar com base nos resultados. Mesmo sendo um processo batch, ele é iniciado (ainda que de forma agendada) para executar uma função de negócio e mantém um ALI, sendo contado como uma única Entrada Externa (EE)." },
    { question: "Estudo de Caso: Módulo de Configuração. Um administrador pode definir os parâmetros do sistema (ex: e-mail de notificação, logo da empresa). Ele preenche um formulário e salva no ALI 'Configurações'. A função 'Salvar Configurações' é uma:", options: ["EE", "SE", "CE", "Função de sistema, não contada.", "AIE."], answer: 0, explanation: "A intenção do administrador (um usuário do sistema) é manter (criar ou alterar) os dados do ALI 'Configurações'. Portanto, é uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: App de Fitness. O app registra a corrida de um usuário, capturando dados do GPS do celular (um AIE). No final, ele salva um resumo da corrida (distância, tempo, calorias) no ALI 'Atividades'. O processo de salvar o resumo é uma:", options: ["EE", "SE", "CE", "AIE", "Múltiplas transações."], answer: 0, explanation: "A intenção principal é criar um novo registro no ALI 'Atividades' com os dados processados da corrida. É uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: Migração de Sistema. Um projeto consiste em migrar dados de um sistema legado para um novo sistema. Foi desenvolvido um script para isso. Como a APF conta esse script?", options: ["Não é contado, pois é um esforço de migração.", "Como uma única EE que mantém todos os ALIs do novo sistema.", "Como uma SE que lê os dados do sistema legado.", "Depende do número de tabelas migradas.", "Como um requisito não funcional."], answer: 1, explanation: "Se o script de migração foi desenvolvido como parte do projeto para ser usado pelo usuário (equipe de implantação), ele é contado como uma funcionalidade. Geralmente, é classificado como uma única Entrada Externa (EE) complexa." },
    { question: "Estudo de Caso: Sistema com Microserviços. Um serviço de 'Usuários' gerencia os dados de usuários (um ALI). Um serviço de 'Pedidos' precisa dos dados do usuário para criar um pedido. Para o serviço de 'Pedidos', o serviço de 'Usuários' é um:", options: ["ALI", "AIE", "EE", "SE", "Parte da mesma aplicação."], answer: 1, explanation: "Na perspectiva do serviço 'Pedidos', os dados de usuários são um grupo lógico mantido por outra aplicação (o serviço 'Usuários'). Portanto, o serviço 'Usuários' atua como um Arquivo de Interface Externa (AIE)." },
    { question: "Estudo de Caso: ATM. A transação 'Saque' recebe o valor desejado, valida o saldo no ALI 'Contas', atualiza o saldo e emite o dinheiro. Como o sistema externo que controla a liberação do dinheiro é visto?", options: ["Como um AIE", "Como parte da EE 'Saque'", "Como uma SE", "Como um requisito não funcional.", "Não é considerado na contagem."], answer: 1, explanation: "A interação com hardware (dispensador de cédulas) é considerada parte do processamento da transação (a EE 'Saque') e não é contada como uma função de dados ou transação separada." },
    { question: "Estudo de Caso: Sistema de Votação Online. Um eleitor submete seu voto. O sistema valida se ele já votou (lendo o ALI 'Eleitores') e, se não, registra o voto no ALI 'Votos'. A função 'Submeter Voto' é uma:", options: ["CE", "SE", "EE", "Processo anônimo, não contado.", "Dois ALIs."], answer: 2, explanation: "A intenção primária do eleitor é manter (criar um novo registro) o ALI 'Votos'. A validação é parte do processamento. É uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: Ferramenta de Suporte Remoto. Um técnico visualiza a tela de um cliente em tempo real. Como essa funcionalidade de 'espelhamento de tela' é contada?", options: ["Como uma SE de altíssima complexidade.", "Como uma CE.", "Como uma EE.", "Não é contada pela APF, pois é um fluxo de vídeo e não dados de negócio estruturados.", "Como um AIE."], answer: 3, explanation: "A APF é projetada para medir o processamento de dados de negócio. Fluxos contínuos de dados como vídeo, áudio ou espelhamento de tela não se encaixam no modelo de funções de dados e transações, e geralmente não são contados." },
    { question: "Estudo de Caso: Loja de Aplicativos. Um desenvolvedor submete um novo aplicativo para publicação. Ele preenche um formulário com nome, descrição, imagens e o arquivo do app. Tudo é salvo no ALI 'Aplicativos'. A submissão é uma:", options: ["EE", "SE", "CE", "Um AIE para o arquivo do app.", "Várias transações."], answer: 0, explanation: "Do ponto de vista do desenvolvedor (o usuário), é um processo elementar para criar um novo registro no ALI 'Aplicativos'. Portanto, é uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: Plataforma de Cursos. Um aluno assiste a uma videoaula. O sistema registra o progresso (ex: marca a aula como 'concluída') no ALI 'Progresso do Aluno'. A ação de marcar como 'concluída' é:", options: ["Uma SE que exibe o vídeo.", "Uma EE que atualiza o progresso.", "Uma CE.", "Não é contada, pois assistir a um vídeo é passivo.", "Um ALI 'Vídeos'."], answer: 1, explanation: "A interação que mantém o estado do aluno (seu progresso) é uma funcionalidade. A intenção é manter o ALI 'Progresso do Aluno', o que a classifica como uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: Sistema de Frotas. O sistema recebe coordenadas de GPS de um caminhão (via AIE) e atualiza sua posição no ALI 'Veículos'. Este processo de atualização contínua é contado como:", options: ["Uma única EE que roda em loop.", "Múltiplas EEs, uma para cada coordenada recebida.", "Uma SE que exibe o mapa.", "Não é contado, pois é um processo automático.", "Um AIE."], answer: 0, explanation: "Embora automático, o processo tem uma função de negócio clara: manter a localização dos veículos. É classificado como uma única Entrada Externa (EE) que é acionada por um evento externo (recebimento de coordenadas)." },
    { question: "Estudo de Caso: Editor de Texto Online. A função 'Salvar Documento' envia o conteúdo do documento para o servidor e o armazena no ALI 'Documentos'. Essa função é uma:", options: ["CE", "SE", "EE", "AIE", "Função de sistema."], answer: 2, explanation: "A intenção primária do usuário é manter (criar ou atualizar) o ALI 'Documentos' com o conteúdo digitado. É uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: Sistema de Contabilidade. A função 'Balanço Patrimonial' lê diversas contas dos ALIs 'Ativos' e 'Passivos', realiza somas complexas e apresenta um relatório estruturado. Esta função é uma:", options: ["CE", "EE", "SE", "Múltiplas SEs", "Função de dados."], answer: 2, explanation: "A geração de um relatório que envolve cálculos complexos e derivação de dados antes de sua apresentação é a definição clássica de uma Saída Externa (SE)." },
    { question: "Estudo de Caso: Ferramenta de Análise de Código. A ferramenta lê um arquivo de código-fonte e exibe métricas como complexidade ciclomática e número de linhas. Como isso seria contado?", options: ["Como uma SE que processa o código.", "Como uma EE que recebe o arquivo.", "Não seria contado pela APF, pois o 'dado' processado (código-fonte) não é um dado de negócio do ponto de vista do usuário.", "Como um AIE.", "Como uma CE."], answer: 2, explanation: "A APF mede o tamanho funcional de sistemas de negócio. Ferramentas de desenvolvimento ou análise técnica que processam outros artefatos de software, em vez de dados de negócio, geralmente estão fora do escopo da contagem padrão." },
    { question: "Estudo de Caso: App de Receitas. O usuário pode ajustar o número de porções de uma receita, e o sistema recalcula a quantidade de cada ingrediente. A função de recalcular é:", options: ["Uma EE, pois o número de porções é a entrada.", "Uma CE, pois consulta os ingredientes.", "Uma SE, pois realiza cálculos para derivar a nova lista de quantidades.", "Não é contada, é apenas um cálculo na tela.", "Um ALI 'Ingredientes'."], answer: 2, explanation: "O sistema está processando uma entrada (número de porções) para derivar e apresentar um novo conjunto de dados (as quantidades recalculadas). Isso é uma Saída Externa (SE)." },
    { question: "Estudo de Caso: Sistema de RH. Um funcionário solicita férias. Ele preenche as datas, o sistema valida contra as regras da empresa (lendo um ALI 'Regras Férias') e salva a solicitação no ALI 'Solicitações Férias'. A função 'Solicitar Férias' é:", options: ["SE", "CE", "EE", "Dois ALIs", "Processo de negócio."], answer: 2, explanation: "A intenção primária do funcionário é criar um novo registro no ALI 'Solicitações Férias'. A validação é parte do processamento da Entrada Externa (EE)." },
    { question: "Estudo de Caso: Website Institucional. Uma página de 'Contato' envia um e-mail para a empresa com os dados preenchidos pelo usuário. Não há armazenamento desses dados no sistema. Como contar?", options: ["Como uma EE, pois processa dados que entram.", "Como uma SE, pois a 'saída' é o e-mail.", "Não é contada, pois não mantém um ALI.", "Como um AIE.", "Depende se o usuário recebe cópia."], answer: 2, explanation: "Pelas regras do IFPUG, uma transação deve ler ou manter pelo menos um ALI/AIE. Se o formulário apenas dispara um e-mail e não armazena ou lê nenhum arquivo lógico, ele não seria contado." },
    { question: "Estudo de Caso: Sistema de Controle de Acesso. Um segurança visualiza o vídeo de uma câmera em tempo real. Esta funcionalidade é contada?", options: ["Sim, como uma SE.", "Sim, como uma CE.", "Não, pois é um fluxo de vídeo e não dados de negócio estruturados.", "Sim, como um AIE.", "Depende da resolução da câmera."], answer: 2, explanation: "Assim como o espelhamento de tela, a transmissão de vídeo ao vivo não se enquadra no modelo da APF, que foca no processamento de dados de negócio." },
    { question: "Estudo de Caso: App de Tradução por Voz. O usuário fala uma frase, o app envia o áudio para uma API externa (AIE) que o converte em texto e o traduz, e então o app exibe a tradução. A exibição da tradução é uma:", options: ["EE", "CE", "SE", "AIE", "Não é contada."], answer: 2, explanation: "A função entrega ao usuário um dado (o texto traduzido) que foi gerado através de um processamento complexo (reconhecimento de voz e tradução) por um serviço externo. Isso a classifica como uma Saída Externa (SE)." },
    { question: "Estudo de Caso: Sistema de E-commerce. Após uma compra, o sistema permite ao usuário 'Avaliar o Produto', dando uma nota de 1 a 5 estrelas e um comentário. A avaliação é salva no ALI 'Avaliações'. Esta função é uma:", options: ["SE", "CE", "EE", "AIE", "Função não funcional."], answer: 2, explanation: "A intenção do usuário é criar um novo registro no ALI 'Avaliações'. Portanto, é uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: Fórum Online. Um moderador tem a função de 'Banir Usuário'. A função atualiza um campo 'status' no ALI 'Usuários' para 'banido'. Esta função é uma:", options: ["CE", "SE", "EE", "Função administrativa", "Um AIE."], answer: 2, explanation: "O moderador é um tipo de usuário do sistema. A intenção é manter (alterar) o ALI 'Usuários', o que classifica a função como uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: Jogo Online. O jogo salva o progresso do jogador (nível, pontos, itens) no ALI 'ProgressoJogador'. A função de salvar o progresso é uma:", options: ["EE", "SE", "CE", "Não é contada em APF.", "Função de sistema."], answer: 0, explanation: "Se aplicarmos a APF (o que é incomum para jogos), a intenção é manter um arquivo lógico ('ProgressoJogador'), o que a classificaria como uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: Sistema de Biblioteca. A função 'Renovar Empréstimo' atualiza a data de devolução de um livro no ALI 'Empréstimos'. Esta função é uma:", options: ["CE", "SE", "EE", "ALI", "Processo simples."], answer: 2, explanation: "A intenção primária do usuário é manter (alterar a data) um registro no ALI 'Empréstimos'. É uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: App de Notícias. O usuário pode customizar seu feed, selecionando categorias de interesse (esportes, tecnologia). As preferências são salvas no ALI 'PreferênciasUsuário'. A função 'Salvar Preferências' é:", options: ["CE", "SE", "EE", "AIE", "Função não funcional."], answer: 2, explanation: "A intenção do usuário é manter seus próprios dados de preferência no ALI 'PreferênciasUsuário'. É uma Entrada Externa (EE)." },
    { question: "Estudo de Caso: Sistema de Vendas. Um vendedor pode aplicar um desconto a um item no carrinho de compras. O sistema recalcula o total do pedido. A aplicação do desconto seguida do recálculo é classificada como:", options: ["Uma EE para aplicar o desconto.", "Uma SE para mostrar o novo total.", "Uma única transação que pode ser EE ou SE, dependendo da intenção.", "Uma EE (aplicar o desconto) e uma SE (recalcular o total) separadas.", "Um processo não elementar."], answer: 2, explanation: "A intenção primária do usuário (vendedor) é manter o estado do carrinho (adicionando o desconto). O recálculo e a exibição do novo total são parte do processamento dessa ação. Portanto, é melhor classificada como uma Entrada Externa (EE)." },
    { question: "Cenário: Cadastro de Clientes. Como o grupo de dados 'Cliente', mantido pelo sistema, é classificado?", options: ["ALI", "AIE", "EE", "SE", "CE", "NA"], answer: 0, explanation: "Cliente é um grupo de dados lógicos mantido dentro da fronteira da aplicação, portanto é um Arquivo Lógico Interno (ALI)." },
    { question: "Cenário: Cadastro de Clientes. A função 'Incluir Cliente', que foi alterada para validar CPF duplicado, é classificada como:", options: ["ALI", "AIE", "EE", "SE", "CE", "NA"], answer: 2, explanation: "A função 'Incluir Cliente' tem a intenção primária de manter (adicionar) dados ao ALI Cliente. A validação de duplicidade é uma lógica de processamento dentro desta Entrada Externa (EE)." },
    { question: "Cenário: Cadastro de Clientes. Como a função existente 'Alterar Cliente' é classificada?", options: ["ALI", "AIE", "EE", "SE", "CE", "NA"], answer: 2, explanation: "A função 'Alterar Cliente' tem a intenção primária de manter (modificar) dados no ALI Cliente. Portanto, é uma Entrada Externa (EE)." },
    { question: "Cenário: Cadastro de Clientes. Como a função existente 'Consultar Cliente' é classificada?", options: ["ALI", "AIE", "EE", "SE", "CE", "NA"], answer: 4, explanation: "A função 'Consultar Cliente' apenas recupera e apresenta dados ao usuário, sem realizar cálculos ou alterar dados, caracterizando uma Consulta Externa (CE)." },
    { question: "Cenário: Cadastro de Clientes. Como a tabela de CEPs dos Correios, usada para consulta, é classificada?", options: ["ALI", "AIE", "EE", "SE", "CE", "NA"], answer: 1, explanation: "A tabela de CEPs é um grupo de dados lógicos referenciado pela aplicação, mas mantido por uma fonte externa (os Correios). Portanto, é um Arquivo de Interface Externa (AIE)." },
    { question: "Cenário: Cadastro de Clientes. Como a função 'Excluir Cliente' é classificada?", options: ["ALI", "AIE", "EE", "SE", "CE", "NA"], answer: 2, explanation: "A função 'Excluir Cliente' tem a intenção de manter (remover) dados do ALI Cliente, sendo classificada como uma Entrada Externa (EE)." },
    { question: "Cenário: Cadastro de Clientes. A função 'Gerar Relação de Aniversariantes', alterada para incluir o e-mail, é classificada como:", options: ["ALI", "AIE", "EE", "SE", "CE", "NA"], answer: 3, explanation: "A função gera um arquivo para fora da fronteira e contém lógica de processamento (cálculo da idade). A alteração de um campo não muda sua classificação como Saída Externa (SE)." },
    { question: "Cenário: Cadastro de Clientes. A nova função 'Listar Inadimplentes', que consulta outro sistema e gera um relatório com totais, é classificada como:", options: ["ALI", "AIE", "EE", "SE", "CE", "NA"], answer: 3, explanation: "A função consulta um AIE ('Contas a Receber'), realiza cálculos (total no rodapé) e apresenta dados formatados para fora da fronteira. Isso a classifica como uma Saída Externa (SE)." },
    { question: "Cenário: Cadastro de Clientes. Para o relatório de inadimplentes, como o 'Sistema de Contas a Receber' é classificado?", options: ["ALI", "AIE", "EE", "SE", "CE", "NA"], answer: 1, explanation: "O 'Sistema de Contas a Receber' é uma fonte de dados externa, lida pela aplicação mas não mantida por ela. Portanto, é um Arquivo de Interface Externa (AIE)." },
    { question: "Cenário: Cadastro de Clientes. A função 'Buscar CEP', que preenche o endereço, é classificada como:", options: ["ALI", "AIE", "EE", "SE", "CE", "NA"], answer: 4, explanation: "A função consulta uma fonte externa (AIE CEP) para recuperar e apresentar dados ao usuário, sem alterar ALIs. É uma Consulta Externa (CE)." }
  ]
}

const router = useRouter()
const route = useRoute()

const currentScreen = ref('start')
const quizQuestions = ref<Question[]>([])
const userAnswers = ref<(number | null)[]>([])
const currentQuestionIndex = ref(0)
const score = ref(0)
const showExitModal = ref(false)
const pendingNavigation = ref<string | null>(null)

const currentQuestion = computed(() => quizQuestions.value[currentQuestionIndex.value] || {})
const scorePercentage = computed(() => ((score.value / quizQuestions.value.length) * 100).toFixed(1))
const isQuizInProgress = computed(() => currentScreen.value === 'quiz')

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

function startQuiz() {
  const rules = questionBank.ifpugRules.map(q => ({...q, category: 'Regras IFPUG'}))
  const exercises = questionBank.exercises.map(q => ({...q, category: 'Exercícios Práticos'}))
  const cases = questionBank.caseStudies.map(q => ({...q, category: 'Estudos de Caso'}))

  const allQuestions = [...rules, ...exercises, ...cases]
  
  const selectedQuestions = shuffleArray(allQuestions).slice(0, TOTAL_QUESTIONS_IN_QUIZ)

  quizQuestions.value = selectedQuestions.map(question => {
    const correctAnswerText = question.options[question.answer]
    const shuffledOptions = shuffleArray([...question.options])
    return {
      ...question,
      options: shuffledOptions,
      answer: shuffledOptions.indexOf(correctAnswerText)
    }
  })
  
  userAnswers.value = new Array(quizQuestions.value.length).fill(null)
  currentQuestionIndex.value = 0
  score.value = 0
  currentScreen.value = 'quiz'
}

function selectAnswer(index: number) {
  userAnswers.value[currentQuestionIndex.value] = index
}

function nextQuestion() {
  if (currentQuestionIndex.value < quizQuestions.value.length - 1) {
    currentQuestionIndex.value++
  }
}

function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

function finishQuiz() {
  score.value = 0
  quizQuestions.value.forEach((question, index) => {
    if (userAnswers.value[index] === question.answer) {
      score.value++
    }
  })
  currentScreen.value = 'results'
}

function restart() {
  currentScreen.value = 'start'
}

function showReview() {
  currentScreen.value = 'review'
}

function backToResults() {
  currentScreen.value = 'results'
}

// Proteção contra saída durante o quiz
function handleNavigation(to: string) {
  if (isQuizInProgress.value) {
    showExitModal.value = true
    pendingNavigation.value = to
    return false
  }
  return true
}

function cancelExit() {
  showExitModal.value = false
  pendingNavigation.value = null
}

function confirmExit() {
  // Reinicia o simulado
  currentScreen.value = 'start'
  quizQuestions.value = []
  userAnswers.value = []
  currentQuestionIndex.value = 0
  score.value = 0
  
  showExitModal.value = false
  
  // Navega para a rota pendente
  if (pendingNavigation.value) {
    router.push(pendingNavigation.value)
    pendingNavigation.value = null
  }
}

// Intercepta navegação durante o quiz
router.beforeEach((to, from) => {
  if (from.path === '/simulado' && isQuizInProgress.value && to.path !== '/simulado') {
    handleNavigation(to.path)
    return false
  }
  return true
})

// Intercepta cliques nos links do menu
onMounted(() => {
  if (process.client) {
    // Intercepta cliques em links do navbar
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href]') as HTMLAnchorElement
      
      if (link && link.getAttribute('href')?.startsWith('/') && link.getAttribute('href') !== '/simulado') {
        if (isQuizInProgress.value) {
          e.preventDefault()
          handleNavigation(link.getAttribute('href') || '')
        }
      }
    }
    
    document.addEventListener('click', handleLinkClick)
    
    onUnmounted(() => {
      document.removeEventListener('click', handleLinkClick)
    })
  }
})
</script>

<style scoped>
.option-btn {
  transition: all 0.2s ease-in-out;
}
.option-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
