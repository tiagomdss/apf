# 🎨 Design Moderno do Dashboard APF

## ✨ Características Visuais

### 🌓 Dark Mode
- Toggle de tema claro/escuro no navbar
- Persistência da preferência no localStorage
- Transições suaves entre temas
- Suporte a preferência do sistema

### 🎯 Design System

#### Cores
- **Primária**: Teal (#0d9488) - Confiável e profissional
- **Secundária**: Blue (#2563eb) - Energia e inovação
- **Gradientes**: Teal → Blue para elementos de destaque

#### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Hierarquia clara**: Títulos grandes e impactantes
- **Legibilidade**: Contraste otimizado para dark/light mode

#### Componentes

##### Cards Interativos
- Hover com elevação (-translate-y-2)
- Bordas arredondadas (rounded-2xl)
- Sombras suaves
- Gradientes sutis no hover

##### Botões
- Primários: Gradiente teal → blue
- Secundários: Outline com hover
- Efeito de escala no hover (scale-105)
- Sombras para profundidade

##### Navegação
- Glassmorphism no navbar (backdrop-blur-lg)
- Sidebar sticky com scroll spy
- Links com estados ativos destacados
- Menu mobile responsivo

### 🎭 Animações

#### Fade In
- Entrada suave das seções
- Duração: 0.5s
- Easing: ease-out

#### Hover Effects
- Escala: 105% - 110%
- Translação: -2px (elevação)
- Transições: 300ms

### 📱 Responsividade

#### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

#### Adaptações
- Sidebar oculta em mobile
- Menu hambúrguer
- Grid responsivo (1 → 2 → 3 colunas)
- Espaçamentos ajustados

## 🎓 Abordagem Didática

### Elementos Divertidos
- 🎯 Emojis contextuais
- 💡 Analogias simples
- 🎨 Visual atrativo
- ✨ Micro-interações

### Estrutura de Aprendizado
1. **Welcome**: Boas-vindas empolgantes
2. **What is**: Explicação com analogias
3. **Benefits**: Benefícios visuais
4. **Tools**: Ferramentas com gradientes
5. **Learn**: Call-to-action

## 🛠️ Tecnologias

- **Nuxt 4**: Framework Vue.js
- **Tailwind CSS**: Utility-first CSS
- **TypeScript**: Type safety
- **Dark Mode**: Via Tailwind class strategy

## 🚀 Próximas Melhorias

- [ ] Animações mais elaboradas (Framer Motion)
- [ ] Ilustrações customizadas
- [ ] Modo de alto contraste
- [ ] Temas personalizáveis
- [ ] Gamificação (badges, progresso)
