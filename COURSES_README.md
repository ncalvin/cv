# Seção de Cursos e Certificações

## Visão Geral

A seção "Cursos e Certificações" é um componente completo e interativo que exibe suas formações profissionais, cursos e certificações de forma organizada e profissional.

## Funcionalidades

### ✨ Principais Recursos

- **Filtros por Tipo**: Filtre por Certificações, Cursos ou Treinamentos
- **Busca Inteligente**: Busque por título, instituição ou habilidades
- **Estatísticas**: Visualização rápida do total de formações por categoria
- **Cards Interativos**: Hover effects e animações suaves
- **Modal Detalhado**: Clique em qualquer card para ver informações completas
- **Badges Verificados**: Indicador visual para certificações verificadas
- **Links Diretos**: Acesso rápido aos certificados oficiais
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

### 🎨 Design

- **Estilo**: Minimal/Modern com linhas limpas
- **Paleta**: Neutra com cores de destaque por tipo:
  - 🟢 Verde (#10B981) para Certificações
  - 🔵 Azul (#3B82F6) para Cursos
  - 🟣 Roxo (#8B5CF6) para Treinamentos
- **Tipografia**: Sans-serif, hierarquia clara
- **Animações**: Framer Motion para transições suaves (150-220ms)

### ♿ Acessibilidade

- Navegação por teclado completa
- Contraste WCAG AA
- Foco visível em elementos interativos
- Modal com escape key para fechar
- Semântica HTML apropriada

## Estrutura de Arquivos

```
/components
  └── Courses.tsx          # Componente principal
/data
  └── coursesData.ts       # Dados dos cursos
/types.ts                  # Definições TypeScript
```

## Tipos TypeScript

### CourseItem

```typescript
interface CourseItem {
  id: string;
  type: 'course' | 'training' | 'certification';
  title: string;
  institution: string;
  institutionLogoUrl?: string;
  startDate?: string; // YYYY-MM
  endDate?: string;
  dateCompleted?: string; // YYYY-MM
  duration?: string;
  format?: 'online' | 'presencial' | 'híbrido';
  level?: 'beginner' | 'intermediate' | 'advanced';
  summary: string;
  bullets?: string[];
  skills: string[];
  certificateUrl?: string;
  badgeUrl?: string;
  evidenceFiles?: EvidenceFile[];
  verified: boolean;
  expiresAt?: string;
}
```

## Como Adicionar Novos Cursos

1. Abra `/data/coursesData.ts`
2. Adicione um novo objeto ao array `coursesData`:

```typescript
{
  id: 'unique-id',
  type: 'certification', // ou 'course' ou 'training'
  title: 'Nome do Curso',
  institution: 'Instituição',
  summary: 'Descrição breve do curso em 1-2 frases',
  bullets: [
    'Tópico principal 1',
    'Tópico principal 2',
    'Tópico principal 3'
  ],
  skills: ['Skill 1', 'Skill 2', 'Skill 3'],
  dateCompleted: '2024-01',
  format: 'online',
  level: 'intermediate',
  verified: true,
  certificateUrl: 'https://...'
}
```

## Componentes

### Courses (Principal)

Componente principal que gerencia estado, filtros e renderização.

**Props**: Nenhuma (usa dados de `coursesData`)

**Estado**:
- `selectedType`: Filtro de tipo atual
- `searchQuery`: Termo de busca
- `selectedCourse`: Curso selecionado para modal
- `sortBy`: Ordenação (recente/relevante)

### CourseCard

Card individual para cada curso/certificação.

**Props**:
- `course: CourseItem` - Dados do curso
- `index: number` - Índice para animação escalonada
- `onClick: () => void` - Callback ao clicar

### CourseModal

Modal com informações detalhadas do curso.

**Props**:
- `course: CourseItem` - Dados do curso
- `onClose: () => void` - Callback para fechar

### TypeBadge

Badge colorido indicando o tipo de formação.

**Props**:
- `type: 'course' | 'training' | 'certification'`

## Personalização

### Cores

Edite as cores no componente `TypeBadge`:

```typescript
const config = {
  certification: { label: 'Certificação', color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
  course: { label: 'Curso', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
  training: { label: 'Treinamento', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' }
};
```

### Layout do Grid

Ajuste o grid responsivo em `Courses`:

```typescript
gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))'
```

### Animações

Personalize as animações do Framer Motion:

```typescript
transition={{ duration: 0.4, delay: index * 0.05 }}
```

## Dados de Exemplo

O arquivo `coursesData.ts` já contém 14 cursos e certificações reais extraídos do LinkedIn, incluindo:

- Salesforce Ranger
- DevOps Engineer (LinkedIn Learning)
- Docker Development
- Six Sigma White Belt
- Cursos Coursera de Product Management
- Cursos de Cybersecurity
- Treinamentos em Linux e SAP

## Melhorias Futuras

- [ ] Adicionar JSON-LD para SEO
- [ ] Implementar lazy loading de imagens
- [ ] Adicionar analytics (cliques, downloads)
- [ ] Suporte a múltiplos idiomas
- [ ] Timeline view alternativa
- [ ] Export para PDF
- [ ] Integração com APIs de certificação

## Suporte

Para questões ou sugestões, consulte a documentação principal do projeto.
