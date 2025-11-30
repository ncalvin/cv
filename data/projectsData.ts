import type { Project } from '../types';

/**
 * Projects Data
 * 
 * Configure your portfolio projects here.
 * Each entry represents a project you want to showcase.
 */
export const projectsData: Project[] = [
    {
        title: 'Integração Getnet SEP (Getnet by Santander)',
        description: 'Responsável pela arquitetura Salesforce no Getnet SEP (Chile) para orquestração de terminais TMS. Desenhei a gestão de configuração e inventário, integrando com Node.js e APIs dos provedores Coasin & Transformapp para provisionamento automático. Resultado: processo padronizado, rastreabilidade total e redução drástica no tempo de onboarding e operação manual.',
        repoUrl: '#',
        liveUrl: 'https://www.santander.com/en/press-room/press-releases/2024/10/getnet-by-santander-launches-getnet-sep-a-solution-for-e-commerce-payments-in-brazil-argentina-mexico-and-chile-through-a-single-integration',
        imageUrl: '/images/getnet-project.png',
        year: '2025',
    },
    {
        title: 'PagoNxt (Santander) - Transformação Digital & CRM',
        description: 'Entreguei soluções end-to-end de CRM e Field Service (Service Cloud) no México e Chile. Liderei transformações digitais e integrações de API complexas, orquestrando migrações com Databricks e Apache Spark. Coordenei equipes multifuncionais para adoção e automação, alcançando 30% de redução de custos operacionais e elevando a eficiência e experiência do cliente.',
        repoUrl: '#',
        liveUrl: 'https://www.pagonxt.com/',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1032&auto=format&fit=crop',
        year: '2023',
    },
    {
        title: 'DevOps Platform for SAP',
        description: 'DevOps e o SAP ChaRM (Change Request Management) unem os princípios do DevOps ao processo estruturado de mudanças do SAP, usando o SAP Solution Manager ChaRM para gerir alterações em sistemas SAP — código, testes e implantações. Integrado a ferramentas como Jira ou GitLab, o ChaRM permite otimizar fluxos de trabalho, automatizar processos e acelerar a entrega de mudanças no SAP, mantendo a governança e garantindo rastreabilidade efetiva',
        repoUrl: '#',
        liveUrl: '#',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=870&auto=format&fit=crop',
        year: '2021',
    },
    {
        title: 'Magenta CI/CD (Deutsche Telekom)',
        description: 'Plataforma integrada de pipelines e automação para acelerar releases e reduzir lead time. Orquestra builds, deploys e IaC com GitLab CI, Argo CD, Docker, Kubernetes e Terraform. Garante qualidade com testes automatizados, gestão de artefatos via JFrog Artifactory e observabilidade em tempo real (Prometheus, Grafana, ELK), focando em governança e métricas de performance (DORA).',
        repoUrl: '#',
        liveUrl: 'http://devops.telekom.de/de',
        imageUrl: '/images/magenta-cicd-logo.png',
        year: '2020',
    },
];
