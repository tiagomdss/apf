# Dashboard APF - Análise de Pontos de Função

> Documentação consolidada em um único arquivo: veja `DOCUMENTACAO.md`.

Dashboard interativo completo para **Análise de Pontos de Função (APF)**, desenvolvido com Nuxt 4, TypeScript e Tailwind CSS. Ferramenta moderna e bem documentada para medição, estimativa e gestão de projetos de software usando a metodologia padronizada de Pontos de Função.

## 🎯 Sobre o Projeto

Este dashboard foi completamente reformulado a partir do projeto AFP original, trazendo:

- ✅ **Arquitetura Moderna**: Nuxt 4 com estrutura `app/` directory
- ✅ **TypeScript**: Tipagem completa para maior segurança
- ✅ **Design Responsivo**: Interface adaptável para todos os dispositivos
- ✅ **Navbar Superior**: Navegação intuitiva e moderna
- ✅ **Rodapé Organizado**: Informações e links úteis
- ✅ **Componentização**: Código modular e reutilizável
- ✅ **Documentação Completa**: Tudo em um único lugar

## 🚀 Tecnologias Utilizadas

- **[Nuxt 4](https://nuxt.com/)** - Framework Vue.js para aplicações web
- **[Vue 3](https://vuejs.org/)** - Framework JavaScript progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript com tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Nuxt Icon](https://nuxt.com/modules/icon)** - Ícones para Nuxt
- **[Chart.js](https://www.chartjs.org/)** - Biblioteca para gráficos (preparado para uso futuro)

## 📁 Estrutura do Projeto

```
AFPNuxt4/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css          # Estilos globais (arquivo único)
│   ├── components/
│   │   ├── AppNavbar.vue         # Navbar superior com menu responsivo
│   │   └── AppFooter.vue         # Rodapé com informações e links
│   ├── composables/
│   │   └── useAPF.ts             # Lógica de cálculos APF (IFPUG/SISP)
│   ├── layouts/
│   │   └── default.vue           # Layout padrão com navbar e rodapé
│   ├── pages/
│   │   ├── index.vue             # Página inicial - Visão geral
│   │   ├── calculadora.vue       # Calculadora de projeto
│   │   ├── como-funciona.vue     # Explicação do processo de contagem
│   │   └── referencias.vue       # Tabelas e fórmulas de referência
│   ├── types/
│   │   └── apf.ts                # Tipos TypeScript para APF
│   └── app.vue                   # Componente raiz da aplicação
├── public/                       # Arquivos estáticos
├── .gitignore                    # Arquivos ignorados pelo Git
├── nuxt.config.ts                # Configuração do Nuxt
├── package.json                  # Dependências do projeto
├── tailwind.config.ts            # Configuração do Tailwind CSS
├── tsconfig.json                 # Configuração do TypeScript
├── DOCUMENTACAO.md               # Documentação consolidada
└── README.md                     # Este arquivo (visão geral)
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ instalado
- npm, yarn ou pnpm

### Passos para instalação

1. **Clone ou navegue até o diretório do projeto**

```bash
cd AFPNuxt4
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Execute o servidor de desenvolvimento**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Acesse no navegador**

Abra [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 📚 Funcionalidades

### 1. **Visão Geral (Página Inicial)**
- Introdução à Análise de Pontos de Função
- Principais benefícios da metodologia
- Acesso rápido a todas as ferramentas

### 2. **Como Funciona**
- Explicação do processo de contagem
- Diferença entre funções de dados (ALI/AIE) e transação (EE/SE/CE)
- Roteiro da Fiocruz e ordem de precedência
- Dicas didáticas (ex: Regra do Carro)

### 3. **Calculadora de Projeto**
- Adicione funções ao projeto (EE, SE, CE, ALI, AIE)
- Cálculo automático de complexidade
- Visualização do tamanho total em PF
- Exemplo pré-carregado (SGAB)

### 4. **Referências e Tabelas**
- Fórmulas essenciais de estimativa
- Tabela de pontuação por tipo e complexidade
- Matrizes de complexidade (ALI/AIE, EE, SE/CE)
- Fatores de ponderação

## 🧮 Metodologia APF

O dashboard implementa as seguintes normas e padrões:

- **IFPUG CPM 4.3.1** - Manual de Práticas de Contagem
- **Roteiro SISP v2.3** - Roteiro de Métricas de Software
- **ISO/IEC 20926** - Padrão internacional para medição funcional

### Tipos de Função

#### Funções de Dados
- **ALI (Arquivo Lógico Interno)**: Dados mantidos dentro da aplicação
- **AIE (Arquivo de Interface Externa)**: Dados referenciados, mas mantidos fora

#### Funções de Transação
- **EE (Entrada Externa)**: Processa dados que entram na aplicação
- **SE (Saída Externa)**: Envia dados com lógica de processamento
- **CE (Consulta Externa)**: Recuperação e apresentação direta de dados

### Cálculo de Complexidade

A complexidade é determinada por:
- **TDEs** (Tipos de Dados Elementares): Campos únicos reconhecidos pelo usuário
- **TRs** (Tipos de Registro): Subgrupos de dados dentro de um ALI/AIE
- **ARs** (Arquivos Referenciados): Arquivos lidos ou mantidos pela função

## 🎨 Personalização

### Cores do Tema

O projeto usa uma paleta de cores baseada em Teal (Primary). Para alterar, edite `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Suas cores aqui
  }
}
```

### Estilos Globais

Classes utilitárias personalizadas estão em `app/assets/css/main.css`:
- `.btn-primary` - Botão primário
- `.btn-secondary` - Botão secundário
- `.card` - Card com sombra e borda
- `.input-field` - Campo de entrada estilizado
- `.section-title` - Título de seção
- `.subsection-title` - Subtítulo

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Gerar site estático
npm run generate

# Preview da build de produção
npm run preview

# Preparar tipos TypeScript
npm run postinstall
```

## 📦 Build e Deploy

### Build para Produção

```bash
npm run build
```

### Geração de Site Estático

```bash
npm run generate
```

Os arquivos serão gerados na pasta `.output/public/` e podem ser hospedados em qualquer servidor estático.

### Opções de Deploy

- **Vercel**: Deploy automático via Git
- **Netlify**: Suporte nativo para Nuxt
- **Cloudflare Pages**: Deploy rápido e global
- **Servidor Node.js**: Use `npm run build` e execute o servidor

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é de uso interno e educacional.

## 👨‍💻 Autor

Desenvolvido para facilitar a gestão de projetos de software através da metodologia de Análise de Pontos de Função.

## 🔗 Links Úteis

- [Documentação Nuxt 4](https://nuxt.com/docs)
- [IFPUG - International Function Point Users Group](https://www.ifpug.org/)
- [Roteiro de Métricas SISP](https://www.gov.br/governodigital/)
- [ISO/IEC 20926](https://www.iso.org/standard/70438.html)

## 📞 Suporte

Para dúvidas ou sugestões sobre o dashboard, entre em contato com a equipe de desenvolvimento.

---

**Dashboard APF** - Transformando a medição de software em uma ferramenta estratégica de gestão.
