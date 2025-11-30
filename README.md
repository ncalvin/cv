# Newton Calvin - Professional CV Website 💼

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)

Um site de currículo moderno, responsivo e interativo com foco em impacto visual, performance e acessibilidade.

[Ver Demo](#) • [Relatório de Bugs](https://github.com/newtoncalvin/cv/issues) • [Solicitar Feature](https://github.com/newtoncalvin/cv/issues)

</div>

---

## ✨ Características

### 🎨 Design Visual Impactante
- **Hero Section** com foto profissional, frase de impacto e CTAs estratégicos
- **Timeline Interativa** para experiência profissional e educação
- **Gráficos Visuais** de habilidades com animações suaves
- **Cards de Projetos** com imagens, descrições e links
- **Seção de Resultados** com métricas de impacto

### 🌓 Tema Claro/Escuro
- Alternância suave entre temas
- Persistência da preferência do usuário (localStorage)
- Respeita preferência do sistema operacional
- Tokens de design consistentes

### 📱 Responsividade Total
- Design mobile-first
- Otimizado para tablets e desktops
- Grid responsivo com breakpoints inteligentes
- Imagens otimizadas com lazy loading

### ♿ Acessibilidade (WCAG AA)
- Contraste adequado em todos os temas
- Navegação por teclado completa
- Labels ARIA apropriados
- Foco visual destacado
- Suporte a leitores de tela

### 🚀 Performance Otimizada
- Tempo de carregamento < 2s
- Code splitting automático
- Lazy loading de imagens
- Animações com `prefers-reduced-motion`
- CSS puro (sem frameworks pesados)

### 🎭 Animações e Microinterações
- Scroll animations com Intersection Observer
- Hover effects suaves
- Transições fluidas entre seções
- Loading states elegantes

---

## 🛠️ Tecnologias

- **React 19.2** - Framework UI
- **TypeScript 5.8** - Type safety
- **Vite 6.2** - Build tool ultra-rápido
- **CSS Variables** - Sistema de design tokens
- **Context API** - Gerenciamento de estado (tema)
- **Typed.js** - Efeito de digitação animado

---

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/newtoncalvin/professional-cv.git
   cd professional-cv
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra no navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Visualiza build de produção localmente
```

---

## 📂 Estrutura do Projeto

```
newton-calvin-cv/
├── components/          # Componentes React
│   ├── About.tsx       # Seção Sobre
│   ├── Contact.tsx     # Formulário de contato
│   ├── Education.tsx   # Timeline de educação
│   ├── Experience.tsx  # Timeline de experiência
│   ├── Footer.tsx      # Rodapé
│   ├── Header.tsx      # Hero section
│   ├── Icons.tsx       # Ícones SVG
│   ├── Navbar.tsx      # Navegação com tema toggle
│   ├── Projects.tsx    # Cards de projetos
│   ├── Section.tsx     # Wrapper de seção
│   ├── Skills.tsx      # Wrapper de habilidades
│   └── SkillsChart.tsx # Gráficos de habilidades
├── contexts/           # React Contexts
│   └── ThemeContext.tsx # Gerenciamento de tema
├── styles.css          # Estilos globais e tokens
├── types.ts            # TypeScript types
├── App.tsx             # Componente principal
├── index.tsx           # Entry point
├── index.html          # HTML template
├── vite.config.ts      # Configuração Vite
└── package.json        # Dependências

```

---

## 🎨 Sistema de Design

### Tokens de Cor

**Modo Claro:**
- Primary: `#2563eb` (Azul)
- Accent: `#f59e0b` (Amarelo)
- Background: `#ffffff`, `#f9fafb`, `#f3f4f6`
- Text: `#111827`, `#6b7280`, `#9ca3af`

**Modo Escuro:**
- Primary: `#2563eb` (Azul)
- Accent: `#f59e0b` (Amarelo)
- Background: `#0f172a`, `#1e293b`, `#334155`
- Text: `#f1f5f9`, `#cbd5e1`, `#94a3b8`

### Tipografia
- Sans: System fonts (-apple-system, Segoe UI, Roboto)
- Serif: Georgia, Times New Roman
- Escala: clamp() para responsividade fluida

---

## ✅ Checklist de Implementação

- [x] Hero section com foto e CTAs
- [x] Tema claro/escuro persistente
- [x] Timeline interativa (Experience & Education)
- [x] Gráficos visuais de habilidades
- [x] Cards de projetos com imagens
- [x] Seção de contato com formulário
- [x] Navegação sticky responsiva
- [x] Animações com Intersection Observer
- [x] Sistema de design tokens (CSS Variables)
- [x] Responsividade mobile-first
- [x] Acessibilidade WCAG AA
- [x] Performance otimizada
- [x] SEO meta tags
- [ ] Botão de download de PDF funcional
- [ ] Testes E2E (Playwright/Cypress)
- [ ] Lighthouse score 90+ em todas as métricas

---

## 🎯 Próximos Passos

1. **Geração de PDF**: Implementar download real do CV em PDF
2. **Analytics**: Adicionar Google Analytics ou similar
3. **i18n**: Suporte multi-idioma (PT/EN)
4. **CMS**: Integração com Headless CMS para conteúdo dinâmico
5. **Blog**: Seção de artigos técnicos
6. **Testes**: Suite de testes automatizados

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Newton Calvin**  
Tech Lead | Fintech & Cloud Architecture Specialist

- LinkedIn: [newtoncalvin](https://www.linkedin.com/in/newtoncalvin)
- Email: newton.calvin@gmail.com
- Portfolio: [Este site!](#)

---

<div align="center">

**Feito com ❤️ e tecnologia moderna**

</div>
