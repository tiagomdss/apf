# 🚀 Guia Rápido de Instalação - Dashboard APF

## Passos para Executar o Projeto

### 1️⃣ Instalar Dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

Ou se preferir usar yarn ou pnpm:

```bash
yarn install
# ou
pnpm install
```

### 2️⃣ Executar o Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor iniciará em: **http://localhost:3000**

### 3️⃣ Acessar a Aplicação

Abra seu navegador e acesse:
- **http://localhost:3000** - Página inicial
- **http://localhost:3000/calculadora** - Calculadora de Projeto
- **http://localhost:3000/como-funciona** - Explicação da metodologia
- **http://localhost:3000/referencias** - Tabelas de referência

## ⚠️ Resolução de Problemas

### Erro: "Cannot find module"

Execute:
```bash
npm install
npm run postinstall
```

### Erro de porta já em uso

Mude a porta no comando:
```bash
PORT=3001 npm run dev
```

### Limpar cache do Nuxt

```bash
rm -rf .nuxt
npm run dev
```

## 📦 Build para Produção

```bash
npm run build
npm run preview
```

## 🎯 Próximos Passos

Após a instalação, você pode:

1. ✅ Explorar a página inicial para entender a metodologia APF
2. ✅ Usar a calculadora para adicionar funções ao seu projeto
3. ✅ Consultar as tabelas de referência para cálculos manuais
4. ✅ Personalizar o tema editando `tailwind.config.ts`

## 💡 Dicas

- Use **Ctrl + C** no terminal para parar o servidor
- O hot-reload está ativo - suas mudanças aparecem automaticamente
- Verifique o console do navegador para debug
- Use o Nuxt DevTools (abre automaticamente no navegador)

---

**Pronto!** Seu Dashboard APF está funcionando. 🎉
