import type { ExperienceItem } from '../types';

/**
 * Professional Experience Data
 * 
 * Configure your professional experience here.
 * Each entry represents a position in your career.
 */
export const experienceData: ExperienceItem[] = [
    {
        company: 'Getnet',
        role: 'Tech Lead Salesforce',
        period: 'janeiro de 2025 - Presente',
        location: 'Porto Alegre, RS',
        summary: 'Liderança técnica na migração e reestruturação de orgs complexas, resultando em um aumento de 40% na eficiência operacional das equipes de vendas.',
        description: [
            'Atuo como Tech Lead liderando a migração estratégica de orgs Salesforce, garantindo integridade de dados e continuidade de negócios.',
            'Defino a arquitetura de soluções escaláveis em Sales Cloud e Service Cloud, alinhadas aos objetivos de crescimento da empresa.',
            'Gerencio a dívida técnica e implemento melhores práticas de CI/CD e DevOps para acelerar o ciclo de desenvolvimento.',
            'Mentoro desenvolvedores e analistas, elevando o nível técnico do time e promovendo uma cultura de excelência.'
        ],
        results: [
            'Aumento de 40% na eficiência operacional das equipes de vendas.',
            'Redução significativa de incidentes críticos através de code reviews rigorosos.'
        ],
        skills: ['Salesforce', 'Tech Lead', 'Apex', 'LWC', 'Arquitetura de Soluções', 'DevOps'],
        link: 'https://www.getnet.com.br'
    },
    {
        company: 'PagoNxt (a Santander company)',
        role: 'Consultor Salesforce & Arquiteto de Soluções',
        period: 'outubro de 2022 - outubro de 2024',
        location: 'Porto Alegre, RS',
        summary: 'Gestão integral do ciclo de vida de desenvolvimento de software, garantindo entregas pontuais e alinhamento estratégico com objetivos corporativos globais.',
        description: [
            'Atuei como Consultor Salesforce gerenciando atuando com times multidisciplinares em projetos globais de pagamentos e CRM.',
            'Colaborei com a arquitetura e integração de dados utilizando Databricks e Salesforce.',
            'Implementei processos de governança de TI que aumentaram a previsibilidade e qualidade das entregas.',
            'Atuei com stakeholders internacionais no México e Chile para alinhar requisitos de negócios e soluções técnicas.'
        ],
        results: [
            'Entrega pontual de projetos críticos de transformação digital.',
            'Melhoria na satisfação dos stakeholders através de comunicação transparente e gestão eficaz.'
        ],
        skills: ['Tech Lead', 'Salesforce', 'Databricks', 'Consultoria', 'Integração de Sistemas'],
        link: 'https://www.pagonxt.com'
    },
    {
        company: 'IBM IX',
        role: 'Consultor Sênior Salesforce',
        period: 'setembro de 2021 - outubro de 2022',
        location: 'Remoto',
        summary: 'Desenvolvimento e implementação de customizações avançadas em Apex e LWC, elevando a performance e a usabilidade do CRM para usuários finais.',
        description: [
            'Desenvolvi soluções customizadas em Salesforce Service Cloud e Field Service, focando em experiência do usuário e performance.',
            'Atuei na resolução de problemas complexos de integração, garantindo a estabilidade do ecossistema de CRM.',
            'Colaborei em squads ágeis, participando ativamente de rituais e contribuindo para a melhoria contínua dos processos.'
        ],
        results: [
            'Otimização de processos de atendimento ao cliente, reduzindo o tempo de resolução de chamados.',
            'Entrega de componentes LWC de alta performance e reutilizáveis.'
        ],
        skills: ['Salesforce', 'Apex', 'LWC', 'Service Cloud', 'Field Service'],
        link: 'https://www.ibm.com/ibmix'
    },
    {
        company: 'T-Systems International',
        role: 'Product Owner / Salesforce Specialist',
        period: 'junho de 2019 - setembro de 2021',
        location: 'Blumenau, SC / Alemanha',
        summary: 'Gestão de produtos e implementação de soluções Salesforce para grandes clientes europeus.',
        description: [
            'Atuei como Consultor Salesforce em projetos de CRM para a Deutsche Telekom na Alemanha.',
            'Implementei soluções robustas focadas em transformação digital e segurança.',
            'Liderei iniciativas como DevOps Product Owner, SAP / Node.js / Python & Salesforce.'
        ],
        results: [
            'Implementação bem-sucedida da Plataforma devpops Magenta CI/CD & entrega contínua. (Alemanha)',
            'Melhoria nos processos de DevOps e entrega contínua.'
        ],
        skills: ['Salesforce', 'DevOps', 'GitLab', 'Docker', 'Jenkins', 'Ansible'],
        link: 'https://www.t-systems.com'
    }
];
