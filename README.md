# Newton Calvin - Professional CV Website

Um site de currículo moderno, responsivo e altamente interativo, projetado para destacar experiência profissional e habilidades técnicas com impacto visual.

<div align="center">

![Build Status](https://img.shields.io/badge/build-passing-success?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

[Ver Demonstração](https://ncalvin.net) • [Reportar Bug](https://github.com/newtoncalvin/cv/issues) • [Solicitar Feature](https://github.com/newtoncalvin/cv/issues)

</div>

## 📸 Demonstração

![Screenshot do Projeto](https://placehold.co/1200x600/png?text=Demonstracao+do+Projeto)
*[NECESSITA VALIDAÇÃO: Inserir link real para GIF ou Screenshot aqui]*

## ✨ Principais Features

- **Design Premium & Responsivo**: Layout fluido que se adapta perfeitamente a mobile, tablet e desktop.
- **Modo Claro/Escuro**: Alternância de tema com persistência de preferência do usuário e detecção do sistema.
- **Internacionalização (i18n)**: Suporte completo para múltiplos idiomas (Português e Inglês).
- **Animações Suaves**: Transições de página e micro-interações refinadas usando Framer Motion.
- **Timeline Interativa**: Visualização elegante da trajetória profissional e acadêmica.
- **Exportação PDF**: Funcionalidade integrada para gerar e baixar o currículo em formato PDF.
- **Analytics e SEO**: Otimizado para motores de busca e integrado com Google Analytics 4.
- **Performance**: Carregamento ultra-rápido (<2s) utilizando Vite e otimizações de assets.

## 🛠️ Tecnologias Utilizadas

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Estilização**: CSS Variables (Temas), Design Responsivo Customizado
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Internacionalização**: [i18next](https://www.i18next.com/), react-i18next
- **Outros**: React Router, React Helmet Async, html2pdf.js

## 🚀 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente em seu ambiente Linux ou macOS.

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### Passo a Passo

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/newtoncalvin/cv.git
   cd cv
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Abra `http://localhost:5173` (ou a porta indicada no terminal).

## 💻 Exemplos de Uso

**Gerar Build de Produção:**
Para criar a versão otimizada para deploy:

```bash
npm run build
```

**Visualizar Build Localmente:**
Para testar a versão de produção antes de subir:

```bash
npm run preview
```

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Siga estas diretrizes para colaborar:

1. Faça um Fork do projeto.
2. Crie uma Branch para sua Feature (`git checkout -b feature/MinhaFeature`).
3. Commit suas alterações (`git commit -m 'Adiciona MinhaFeature'`).
4. Push para a Branch (`git push origin feature/MinhaFeature`).
5. Abra um Pull Request.

Por favor, garanta que seu código siga o estilo existente e passe em todos os testes (se houver).

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato e Suporte

Se você encontrar algum bug ou tiver dúvidas, entre em contato:

- **Email**: <info@ncalvin.dev>
- **LinkedIn**: [Newton Calvin](https://www.linkedin.com/in/newtoncalvin)
- **Twitter/X**: [@newtoncalvin](https://twitter.com/newtoncalvin)

---

## ❓ FAQ

**Posso utilizar este projeto como template para meu próprio portfólio?**
Sim! O código é open-source (MIT). Sinta-se à vontade para fazer um fork e adaptar para suas necessidades. Agradecemos se mantiver os créditos originais.

**Como faço para alterar as cores do tema?**
As cores são definidas através de variáveis CSS no arquivo `styles.css`. Basta alterar os valores das variáveis `:root` e `[data-theme='dark']` para customizar a paleta.

**Como adicionar novas experiências ou projetos?**
Os dados são separados do código na pasta `src/data`. Edite arquivos como `projectsData.ts` ou `experienceData.ts` (exemplo) para atualizar o conteúdo sem mexer nos componentes React.

---

<div align="center">

Obrigado por visitar este repositório! Se este projeto te ajudou, considere dar uma ⭐ estrela para apoiar o desenvolvimento.

</div>
