# 🎨 Modernização das Páginas - Padrão de Cores

## ✅ Status das Páginas

- ✅ **index.vue** - Modernizado
- ✅ **simulado.vue** - Modernizado
- ✅ **como-funciona.vue** - Modernizado
- ⏳ **calculadora.vue** - Aguardando
- ⏳ **analisador.vue** - Aguardando
- ⏳ **sprint.vue** - Aguardando
- ⏳ **fases.vue** - Aguardando
- ⏳ **portfolio.vue** - Aguardando
- ⏳ **comparacao.vue** - Aguardando
- ⏳ **referencias.vue** - Aguardando

## 🎨 Padrão de Cores para Dark Mode

### Estrutura Base
```vue
<div class="container mx-auto px-4 py-8">
```

### Títulos
```vue
<!-- H1 - Título Principal -->
<h1 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">

<!-- H2 - Subtítulos -->
<h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">

<!-- H3 - Seções -->
<h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">
```

### Textos
```vue
<!-- Parágrafos normais -->
<p class="text-gray-600 dark:text-gray-300">

<!-- Textos menores -->
<p class="text-sm text-gray-600 dark:text-gray-300">
```

### Cards
```vue
<!-- Card padrão -->
<div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">

<!-- Card com borda colorida -->
<div class="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-blue-500 dark:border-blue-400 shadow-md">
```

### Alertas/Destaques Coloridos
```vue
<!-- Azul -->
<div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded-r-lg">
  <h3 class="text-blue-800 dark:text-blue-300">
  <p class="text-blue-900 dark:text-blue-200">
</div>

<!-- Verde -->
<div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-6 rounded-r-lg">
  <h3 class="text-green-800 dark:text-green-300">
  <p class="text-green-900 dark:text-green-200">
</div>

<!-- Amarelo/Âmbar -->
<div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-500 p-6 rounded-r-lg">
  <h3 class="text-amber-800 dark:text-amber-300">
  <p class="text-amber-900 dark:text-amber-200">
</div>

<!-- Laranja -->
<div class="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 dark:border-orange-400 p-6 rounded-r-lg">
  <h3 class="text-orange-800 dark:text-orange-300">
  <p class="text-orange-900 dark:text-orange-200">
</div>

<!-- Roxo -->
<div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 dark:border-purple-400 p-6 rounded-r-lg">
  <h3 class="text-purple-800 dark:text-purple-300">
  <p class="text-purple-900 dark:text-purple-200">
</div>

<!-- Vermelho -->
<div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 p-6 rounded-r-lg">
  <h3 class="text-red-800 dark:text-red-300">
  <p class="text-red-900 dark:text-red-200">
</div>
```

### Tabs/Navegação
```vue
<div class="mb-6 border-b border-gray-200 dark:border-gray-700 flex space-x-4">
  <button
    :class="[
      'py-3 px-6 border-b-2 font-medium transition-colors',
      activeTab === tab.id
        ? 'border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400'
        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400'
    ]"
  >
```

### Inputs e Forms
```vue
<!-- Input padrão -->
<input class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500">

<!-- Select -->
<select class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">

<!-- Label -->
<label class="block font-medium mb-1 text-sm text-gray-700 dark:text-gray-300">
```

### Botões
```vue
<!-- Botão primário -->
<button class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">

<!-- Botão secundário -->
<button class="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">

<!-- Botão com ícone -->
<button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all hover:scale-105">
```

### Tabelas
```vue
<table class="w-full">
  <thead class="bg-gray-100 dark:bg-gray-800">
    <tr>
      <th class="px-4 py-3 text-left text-gray-900 dark:text-white">
  </thead>
  <tbody>
    <tr class="border-b border-gray-200 dark:border-gray-700">
      <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
```

## 🔧 Substituições Necessárias

### Remover Classes Antigas
- ❌ `.section-title` → ✅ `text-4xl font-bold mb-6 text-gray-900 dark:text-white`
- ❌ `.subsection-title` → ✅ `text-xl font-bold mb-3 text-gray-900 dark:text-white`
- ❌ `.card` → ✅ `bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md`
- ❌ `.input-field` → ✅ Usar classes completas com dark mode
- ❌ `text-stone-*` → ✅ `text-gray-*`
- ❌ `bg-stone-*` → ✅ `bg-gray-*`

### Cores de Texto
- ❌ Texto preto sem dark → ✅ `text-gray-900 dark:text-white`
- ❌ Texto cinza sem dark → ✅ `text-gray-600 dark:text-gray-300`
- ❌ `text-primary-*` → ✅ `text-teal-* dark:text-teal-*`

### Fundos
- ❌ `bg-white` sozinho → ✅ `bg-white dark:bg-gray-800`
- ❌ Fundos coloridos sem dark → ✅ Adicionar `dark:bg-{color}-900/20`

### Bordas
- ❌ `border-stone-*` → ✅ `border-gray-* dark:border-gray-*`
- ❌ Bordas coloridas sem dark → ✅ Adicionar `dark:border-{color}-400`

## 📋 Checklist por Página

Para cada página, verificar:
- [ ] Título principal com dark mode
- [ ] Todos os parágrafos com cores
- [ ] Cards com fundo dark
- [ ] Alertas/destaques coloridos com dark
- [ ] Inputs e selects com dark
- [ ] Botões com hover states
- [ ] Tabelas (se houver) com dark
- [ ] Bordas com dark mode
- [ ] Ícones visíveis em ambos os modos

## 🎯 Prioridade de Modernização

1. ✅ Como Funciona (Concluído)
2. ⏳ Calculadora (Próximo - página mais usada)
3. ⏳ Referências (Tabelas importantes)
4. ⏳ Analisador
5. ⏳ Sprint
6. ⏳ Fases
7. ⏳ Portfólio
8. ⏳ Comparação
