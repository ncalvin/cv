# Hospedagem e opções gratuitas para "Newton Calvin - Professional CV"

Este documento resume a análise de hospedagem para o projeto Vite + React presente no repositório, explica por que é possível publicar no GitHub Pages e apresenta alternativas gratuitas (Vercel, Netlify, Cloudflare Pages, Surge, Firebase Hosting, Render). Inclui comandos práticos e exemplos de configuração.

---

## Resumo do projeto

- **Tipo:** SPA React construída com Vite.
- **Build output:** `dist` (após `npm run build`).
- **Scripts:** `dev`, `build`, `preview` já presentes em `package.json`.
- **Vite config atual:** `vite.config.ts` não define `build.base`.

---

## GitHub Pages — é possível?

Sim. O projeto pode ser hospedado no GitHub Pages. Existem duas formas principais:

- **User/Org site (`username.github.io`)**
  - Se o repositório for `username.github.io`, o site roda na raiz (`/`) e **não** é necessário ajustar `build.base`.
- **Project site (`username/repo-name`)**
  - Neste caso os assets serão servidos em `/repo-name/`. Recomendo configurar o `base` do Vite para evitar problemas de caminhos relativos.
  - Exemplo: em `vite.config.ts` adicionar `build: { base: '/repo-name/' }`.

Observação: sem ajustar `base`, o site pode ter imagens e bundles quebrados quando publicado em um subpath.

---

## Passos práticos para GitHub Pages

Opção A — via `gh-pages` (local)

1. Instalar a dependência de deploy:

```bash
npm install --save-dev gh-pages
```

2. Adicionar scripts em `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. (Se for project page) Ajustar `vite.config.ts` para incluir `build.base`:

```ts
// vite.config.ts (exemplo)
export default defineConfig(({ mode }) => {
  // ...existing config
  return {
    // ...
    build: {
      base: '/REPO_NAME/'
    }
  }
});
```

4. Publicar:

```bash
npm run deploy
```

Opção B — via GitHub Actions (recomendado)

- Criar um workflow que roda `npm ci`, `npm run build` e publica `dist` na branch `gh-pages`.
- Vantagens: deploy automático em cada push, CI consistente.

Exemplo mínimo de workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Se for project page, mantenha `build.base` definido ou adicione `--base /repo-name/` ao build.

---

## Outras alternativas gratuitas (rápido comparativo)

- **Vercel**
  - Pros: integração automática com GitHub, detecta projetos Vite, previews para branches, SSL automático.
  - Como: conectar repo no dashboard Vercel ou usar `vercel` CLI. Build command: `npm run build`, Output dir: `dist`.

- **Netlify**
  - Pros: deploy por Git, funções serverless, deploys rápidos, fácil rollback.
  - Como: conectar repo no Netlify; build command `npm run build`; publish dir `dist`.
  - CLI: `npm i -g netlify-cli` && `netlify deploy --dir=dist --prod`.

- **Cloudflare Pages**
  - Pros: CDN global, gratuito para sites estáticos, integração Git.
  - Como: conectar repo; build command `npm run build`; output `dist`.

- **Firebase Hosting (Spark plan)**
  - Pros: CDN, HTTPS, CLI simples (`firebase-tools`).
  - Contras: limites do plano gratuito para uso intensivo.
  - Como: `npm i -g firebase-tools` && `firebase init hosting` && `firebase deploy`.

- **Surge.sh**
  - Pros: super simples, um comando para publicar.
  - Como: `npm i -g surge` && `surge ./dist`.

- **Render (Static Sites)**
  - Pros: build automático a partir de Git, gratuito para sites estáticos.

Escolha recomendada para facilidade: **Vercel** ou **Netlify** (integração Git, previews); para quem prefere ficar apenas no GitHub: **GitHub Pages**.

---

## Ajustes mínimos recomendados no projeto

1. **Definir `build.base` se publicar como Project Page**. Exemplo substituindo `REPO_NAME` pelo nome do repositório:

```ts
// vite.config.ts
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    // ...existing
    build: {
      base: '/newton-calvin---professional-cv/'
    },
  };
});
```

2. **Adicionar script de deploy com `gh-pages`** (opcional):

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. **Verificar `.env`**: o `vite.config.ts` usa `loadEnv` e define variáveis `process.env.GEMINI_API_KEY`. Garanta que segredos sensíveis não sejam publicados no repositório público. Use `GH Actions secrets` para variáveis privadas quando necessário.

---

## Comandos úteis

```bash
# instalar dependências
npm ci

# build local
npm run build

# preview local do build
npm run preview

# deploy via gh-pages (após adicionar script)
npm run deploy

# netlify (CLI)
npm i -g netlify-cli
netlify deploy --dir=dist --prod

# vercel (CLI)
npm i -g vercel
vercel --prod

# surge
npm i -g surge
surge ./dist
```

---

## Recomendações finais

- Se você quer deploy simples e previews automáticos: use **Vercel** (configuração zero na maioria dos casos) ou **Netlify**.
- Se já usa GitHub e prefere solução nativa sem contas extras: use **GitHub Pages** e adicione `build.base` se for `project page`.
- Posso aplicar as alterações automaticamente: adicionar `build.base` em `vite.config.ts`, criar o workflow em `.github/workflows/deploy.yml`, ou adicionar `gh-pages` script. Qualquer dessas opções você prefere que eu implemente agora?

---

Arquivo gerado automaticamente: `HOSTING.md`
