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

const TOTAL_QUESTIONS_IN_QUIZ = 30

const questionBank = {
  ifpugRules: [
    { question: "Qual das seguintes NÃO é uma das cinco funções medidas pela Análise de Pontos de Função (APF)?", options: ["Entrada Externa (EE)", "Saída Externa (SE)", "Consulta Externa (CE)", "Processamento Lógico Interno (PLI)", "Arquivo Lógico Interno (ALI)"], answer: 3, explanation: "As cinco funções são: Entrada Externa (EE), Saída Externa (SE), Consulta Externa (CE), Arquivo Lógico Interno (ALI) e Arquivo de Interface Externa (AIE). 'Processamento Lógico Interno' não é uma delas." },
    { question: "Qual é a principal intenção de uma Entrada Externa (EE)?", options: ["Apresentar dados ao usuário.", "Manter (incluir, alterar, excluir) os dados de um ou mais Arquivos Lógicos Internos (ALIs).", "Ler dados de um ALI sem alterá-los.", "Representar um grupo de dados mantido por outra aplicação.", "Calcular um valor complexo."], answer: 1, explanation: "A intenção primária de uma Entrada Externa é processar dados que vêm de fora da fronteira da aplicação para manter os dados internos (ALIs)." },
    { question: "A diferença fundamental entre uma Saída Externa (SE) e uma Consulta Externa (CE) é que a SE...", options: ["...lê dados de um ALI, enquanto a CE não.", "...apenas apresenta dados, sem processamento.", "...inclui lógica de processamento além da recuperação direta de dados (ex: cálculos, formatação).", "...é sempre iniciada por outra aplicação, nunca por um usuário.", "...mantém um ALI."], answer: 2, explanation: "Ambas apresentam dados. A CE apenas recupera e exibe. A SE envolve algum tipo de processamento adicional, como cálculos, derivação de dados ou formatação específica antes da apresentação." },
    // ... (adicione mais questões aqui - por brevidade, incluí apenas 3 como exemplo)
  ],
  exercises: [
    { question: "Uma tela de cadastro de 'Clientes' possui campos para dados pessoais (CPF, nome, endereço) e dados de contato (telefone, email). A aplicação mantém esses dados. Os dados são salvos em uma única tabela no banco de dados. Como essa funcionalidade seria classificada?", options: ["Como um ALI de baixa complexidade.", "Como um AIE de média complexidade.", "Como um ALI com 2 TREs (Dados Pessoais, Dados de Contato).", "Como uma Entrada Externa (EE) apenas.", "Como dois ALIs separados."], answer: 2, explanation: "A tela representa um único Arquivo Lógico Interno (Cliente). Os agrupamentos 'dados pessoais' e 'dados de contato' são reconhecidos pelo usuário como subgrupos, portanto, são 2 TREs." },
    // ... (adicione mais questões)
  ],
  caseStudies: [
    { question: "Estudo de Caso: Sistema de Biblioteca. O sistema deve permitir que o bibliotecário cadastre novos livros (título, autor, editora, ano). Os livros ficam armazenados no sistema. O 'Cadastro de Livros' deve ser contado como:", options: ["Um ALI 'Livro' e uma EE 'Incluir Livro'.", "Apenas um ALI 'Livro'.", "Apenas uma EE 'Incluir Livro'.", "Um AIE 'Livro'.", "Uma CE 'Consultar Livro'."], answer: 0, explanation: "O grupo de dados 'Livro' é um Arquivo Lógico Interno (ALI). A ação de cadastrar um novo livro é uma Entrada Externa (EE) que mantém este ALI." },
    // ... (adicione mais questões)
  ]
}

const currentScreen = ref('start')
const quizQuestions = ref<Question[]>([])
const userAnswers = ref<(number | null)[]>([])
const currentQuestionIndex = ref(0)
const score = ref(0)

const currentQuestion = computed(() => quizQuestions.value[currentQuestionIndex.value] || {})
const scorePercentage = computed(() => ((score.value / quizQuestions.value.length) * 100).toFixed(1))

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
</script>

<style scoped>
.option-btn {
  transition: all 0.2s ease-in-out;
}
.option-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
</style>
