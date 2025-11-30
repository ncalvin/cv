# Dados Parametrizados

Este diretório contém os dados parametrizados para o site de CV profissional.

## 📋 Experiência Profissional

O arquivo `experienceData.ts` contém todas as suas experiências profissionais.

### Como Editar

Para adicionar, remover ou modificar suas experiências profissionais:

1. Abra o arquivo `data/experienceData.ts`
2. Edite o array `experienceData` seguindo a estrutura:

```typescript
{
    company: 'Nome da Empresa',
    role: 'Seu Cargo',
    period: 'Período (ex: janeiro de 2025 - Presente)',
    location: 'Localização (opcional)',
    description: [
        'Primeira responsabilidade ou conquista',
        'Segunda responsabilidade ou conquista',
        // Adicione quantas linhas precisar
    ]
}
```

### Exemplo

```typescript
{
    company: 'Minha Empresa',
    role: 'Desenvolvedor Senior',
    period: 'março de 2023 - Presente',
    location: 'São Paulo, Brasil',
    description: [
        'Desenvolvi aplicações web modernas usando React e TypeScript',
        'Liderei equipe de 5 desenvolvedores',
        'Implementei CI/CD pipelines reduzindo tempo de deploy em 50%'
    ]
}
```

### Dicas

- As experiências são exibidas na ordem em que aparecem no array (mais recente primeiro)
- O campo `location` é opcional
- Você pode adicionar quantas linhas de descrição precisar
- Use verbos de ação no início de cada descrição para maior impacto

---

## 🎓 Formação Acadêmica

O arquivo `educationData.ts` contém sua formação acadêmica e certificações.

### Como Editar

Para adicionar, remover ou modificar sua formação:

1. Abra o arquivo `data/educationData.ts`
2. Edite o array `educationData` seguindo a estrutura:

```typescript
{
    institution: 'Nome da Instituição',
    degree: 'Nome do Curso/Certificação',
    details: 'Detalhes adicionais (ano, foco, etc.)'
}
```

### Exemplo

```typescript
{
    institution: 'Universidade Federal do Brasil',
    degree: 'Bacharelado em Ciência da Computação',
    details: 'Graduação com ênfase em Inteligência Artificial (2018-2022).'
}
```

### Dicas

- Organize em ordem de relevância ou cronológica
- Inclua certificações importantes
- Seja conciso nos detalhes

---

## 💼 Projetos

O arquivo `projectsData.ts` contém seus projetos de portfólio.

### Como Editar

Para adicionar, remover ou modificar projetos:

1. Abra o arquivo `data/projectsData.ts`
2. Edite o array `projectsData` seguindo a estrutura:

```typescript
{
    title: 'Nome do Projeto',
    description: 'Descrição clara e concisa do projeto',
    repoUrl: 'https://github.com/seu-usuario/projeto',
    liveUrl: 'https://projeto.com',
    imageUrl: 'URL da imagem de preview (opcional)'
}
```

### Exemplo

```typescript
{
    title: 'E-commerce Platform',
    description: 'Plataforma completa de e-commerce com carrinho, pagamentos e painel administrativo.',
    repoUrl: 'https://github.com/usuario/ecommerce',
    liveUrl: 'https://meu-ecommerce.com',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=870'
}
```

### Dicas

- Use imagens de alta qualidade (recomendado: 870px de largura)
- Se não tiver URL do repositório ou site, use `'#'`
- Destaque projetos mais relevantes primeiro
- A descrição deve ser clara e objetiva (1-2 linhas)
