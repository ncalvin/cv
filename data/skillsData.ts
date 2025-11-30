import { SkillCard } from '../types';

export const skillsData: SkillCard[] = [
    {
        name: 'Salesforce',
        level: 95,
        tagline: 'Soluções enterprise que transformam',
        impactStatement: '12 projetos · 3 países',
        description: 'Service Cloud, Field Service, CRM, CPQ e integração de sistemas',
        results: ['+45% conversão', '12 projetos', '3 países'],
        chips: ['Service Cloud', 'Field Service', 'CPQ']
    },
    {
        name: 'Fintech & Payments',
        level: 90,
        tagline: 'Pagamentos seguros e escaláveis',
        impactStatement: '5M+ transações processadas',
        description: 'Arquitetura de pagamentos digitais com compliance PCI-DSS',
        results: ['99.9% uptime', '5M+ transações', 'PCI-DSS'],
        chips: ['PCI-DSS', 'Gateways', 'Fraud Detection']
    },
    {
        name: 'Cloud Architecture',
        level: 90,
        tagline: 'Infraestrutura moderna e resiliente',
        impactStatement: 'multi-cloud · serverless',
        description: 'Azure, arquitetura serverless e microsserviços escaláveis',
        results: ['-40% custos', '99.95% SLA', 'Multi-cloud'],
        chips: ['Azure', 'Serverless']
    },
    {
        name: 'Python',
        level: 85,
        tagline: 'Backend robusto e performático',
        impactStatement: 'ETL Data Migration, automation, scripts',
        description: 'Data processing e automação de processos',
        results: ['Automação de workflows e scripts para redução de tarefas manuais', 'ETL pipelines'],
        chips: ['Django', 'Pandas', 'Knime']
    },
    {
        name: 'Node.js',
        level: 85,
        tagline: 'APIs rápidas e escaláveis',
        impactStatement: '10K+ req/s · real-time',
        description: 'Express, REST APIs, microservices e aplicações real-time',
        results: ['10K+ req/s', '15+ APIs', 'WebSockets'],
        chips: ['Express', 'NestJS', 'Socket.io']
    },
    {
        name: 'Cybersecurity',
        level: 80,
        tagline: 'Segurança em cada camada',
        impactStatement: 'zero breach · SOC 2',
        description: 'Fortify, ForgeRock, compliance',
        results: ['Zero breach', 'SOC 2'],
        chips: ['Fortify', 'ForgeRock', 'OWASP']
    },
    {
        name: 'DevOps (CI/CD)',
        level: 80,
        tagline: 'Deploy contínuo e confiável',
        impactStatement: '50+ deploys/mês · zero downtime',
        description: 'GitLab, Jenkins, Docker, Ansible e orquestração Kubernetes',
        results: ['50+ deploys/mês', '95% automação', 'Zero downtime'],
        chips: ['GitLab CI', 'Docker', 'K8s']
    },
    {
        name: 'Databricks',
        level: 75,
        tagline: 'Big Data e Analytics',
        impactStatement: 'Salesforce Cases Migration',
        description: 'Apache Spark, migração de dados e pipelines ETL robustos',
        results: ['Salesforce Cases Migration', '100M+ records', 'Enrichment Data'],
        chips: ['Spark', 'Delta Lake']
    },
];
