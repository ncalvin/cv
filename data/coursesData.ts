import type { CourseItem } from '../types';

/**
 * Courses, Trainings & Certifications Data
 * 
 * Configure your professional development courses and certifications here.
 * Each entry represents a course, training, or certification you've completed.
 * 
 * TODO: Update with full LinkedIn certification data. Access was restricted during automated retrieval.
 */
export const coursesData: CourseItem[] = [
    {
        id: 'cert-knime-ds',
        type: 'certification',
        title: 'Data Science Professional Certificate by KNIME',
        institution: 'LinkedIn Learning',
        summary: 'Certificação profissional em ciência de dados com foco na plataforma KNIME.',
        bullets: [
            'Data Science Workflow',
            'Machine Learning Models',
            'Data Visualization',
            'KNIME Analytics Platform'
        ],
        skills: ['Data Science', 'KNIME', 'Machine Learning', 'Analytics'],
        dateCompleted: '2025-08',
        format: 'online',
        level: 'advanced',
        verified: true,
        certificateUrl: 'https://www.linkedin.com/learning/certificates/199a3b71601154b6998aeda82474982f75bfac842717a91c7ea12662c341f1a8'
    },
    {
        id: 'cert-ai-security',
        type: 'certification',
        title: 'Building AI Products: Security Essentials',
        institution: 'LinkedIn Learning',
        summary: 'Segurança essencial no desenvolvimento e gestão de produtos de Inteligência Artificial.',
        bullets: [
            'AI Security Frameworks',
            'Risk Management in AI',
            'Secure AI Development',
            'Ethical AI'
        ],
        skills: ['AI', 'Security', 'Product Management', 'Artificial Intelligence'],
        dateCompleted: '2025-07',
        format: 'online',
        level: 'advanced',
        verified: true,
        certificateUrl: 'https://www.linkedin.com/learning/certificates/09a3425af1c597a5ee8b37aa0fa15ddc05fb47f1fed2f03dba507979ca85c973'
    },
    {
        id: 'cert-docker-foundations',
        type: 'certification',
        title: 'Docker Foundations Professional Certificate',
        institution: 'LinkedIn Learning',
        summary: 'Fundamentos profissionais completos de Docker e containerização para ambientes modernos.',
        bullets: [
            'Container Orchestration',
            'Docker Images & Containers',
            'Microservices Architecture',
            'DevOps Practices'
        ],
        skills: ['Docker', 'Containers', 'DevOps', 'Microservices'],
        dateCompleted: '2025-07',
        format: 'online',
        level: 'intermediate',
        verified: true,
        certificateUrl: 'https://www.linkedin.com/learning/certificates/ba78f474733b38f862aa176dea5ccd1499bc8501dffced67525d6b162fbc96a5'
    },
    {
        id: 'cert-agentforce',
        type: 'certification',
        title: 'Salesforce Agentforce Specialist',
        institution: 'Salesforce',
        summary: 'Especialista em agentes de IA autônomos na plataforma Salesforce (Agentforce).',
        bullets: [
            'Configuração de Agentes Autônomos',
            'Atlas Reasoning Engine',
            'Integração com Data Cloud',
            'Automação de processos com IA'
        ],
        skills: ['Agentforce', 'AI', 'Salesforce', 'Automation'],
        dateCompleted: '2024-10',
        format: 'online',
        level: 'advanced',
        verified: true,
        certificateUrl: 'https://trailhead.salesforce.com/pt-BR/me/ncalvin'
    },
    {
        id: 'cert-cust-comm',
        type: 'certification',
        title: 'Effective Customer Communication',
        institution: 'Santander',
        summary: 'Técnicas avançadas e eficazes de comunicação e relacionamento com clientes.',
        bullets: [
            'Comunicação Assertiva',
            'Gestão de Expectativas',
            'Resolução de Conflitos',
            'Customer Experience'
        ],
        skills: ['Communication', 'Customer Service', 'Soft Skills', 'CX'],
        dateCompleted: '2024-08',
        format: 'online',
        level: 'intermediate',
        verified: true,
        certificateUrl: 'https://www.credly.com/badges/0d853cc8-2e42-41d3-a4ce-ebedadd30bb9/linked_in_profile'
    },
    {
        id: 'cert-salesforce-platform',
        type: 'certification',
        title: 'Salesforce Platform Certification',
        institution: 'Salesforce',
        summary: 'Certificação oficial da plataforma Salesforce.',
        bullets: [
            'Desenvolvimento e customização',
            'Segurança e compartilhamento',
            'Automação de processos',
            'Modelagem de dados'
        ],
        skills: ['Salesforce Platform', 'Cloud Computing', 'CRM'],
        dateCompleted: '2024-01',
        format: 'online',
        level: 'advanced',
        verified: true,
        certificateUrl: 'https://trailhead.salesforce.com/pt-BR/me/ncalvin'
    },
    {
        id: 'rank-ranger',
        type: 'certification',
        title: 'Salesforce Ranger',
        institution: 'Salesforce Trailhead',
        summary: 'Rank máximo no Trailhead, demonstrando comprometimento contínuo com aprendizado no ecossistema Salesforce.',
        bullets: [
            '500+ Badges conquistados',
            'Amplo conhecimento do ecossistema',
            'Aprendizado contínuo',
            'Comunidade Trailblazer'
        ],
        skills: ['Salesforce', 'Trailhead', 'Continuous Learning'],
        dateCompleted: '2024-01',
        format: 'online',
        level: 'advanced',
        verified: true,
        certificateUrl: 'https://trailhead.salesforce.com/pt-BR/me/ncalvin'
    },
    {
        id: 'cert-leading-agile',
        type: 'certification',
        title: 'Leading in Agile',
        institution: 'Santander',
        summary: 'Liderança ágil e gestão de equipes em ambientes dinâmicos.',
        bullets: [
            'Agile Mindset',
            'Servant Leadership',
            'Team Empowerment',
            'Change Management'
        ],
        skills: ['Agile', 'Leadership', 'Management', 'Scrum'],
        dateCompleted: '2023-04',
        format: 'online',
        level: 'intermediate',
        verified: true,
        certificateUrl: 'https://www.credly.com/badges/b6eb2ef8-95b4-4dab-ba8f-e51089bfe007/linked_in_profile'
    },
    {
        id: 'cert-digital-trans',
        type: 'course',
        title: 'Digital Transformation for Tech Leaders',
        institution: 'LinkedIn Learning',
        summary: 'Estratégias e práticas de transformação digital para líderes de tecnologia.',
        bullets: [
            'Digital Strategy',
            'Innovation Management',
            'Technology Trends',
            'Organizational Change'
        ],
        skills: ['Digital Transformation', 'Leadership', 'Strategy', 'Innovation'],
        dateCompleted: '2022-12',
        format: 'online',
        level: 'advanced',
        verified: true,
        certificateUrl: 'https://www.linkedin.com/learning/certificates/b4a383d999d0cda95b5f8504f55c294dbea7de08e56ac696a227916896167a13'
    },
    {
        id: 'cert-lean-devops',
        type: 'course',
        title: 'Applying Lean, DevOps, and Agile',
        institution: 'LinkedIn Learning',
        summary: 'Aplicação integrada de metodologias Lean, DevOps e Agile na organização de TI.',
        bullets: [
            'Value Stream Mapping',
            'DevOps Culture',
            'Lean Principles',
            'Agile Scaling'
        ],
        skills: ['Lean', 'DevOps', 'Agile', 'IT Management'],
        dateCompleted: '2022-12',
        format: 'online',
        level: 'advanced',
        verified: true,
        certificateUrl: 'https://www.linkedin.com/learning/certificates/5fe048a24f8633a685a16f4664860e089a0a0e6e77b01a25c6e98380470a5f10'
    },
    {
        id: 'cert-soft-pm',
        type: 'course',
        title: 'Develop Your Skills as a Software Project Manager',
        institution: 'LinkedIn Learning',
        summary: 'Desenvolvimento de habilidades essenciais para gestão de projetos de software.',
        bullets: [
            'Project Planning',
            'Risk Management',
            'Stakeholder Communication',
            'Software Lifecycle'
        ],
        skills: ['Project Management', 'Software Development', 'Agile', 'Leadership'],
        dateCompleted: '2022-12',
        format: 'online',
        level: 'intermediate',
        verified: true,
        certificateUrl: 'https://www.linkedin.com/learning/certificates/817d030ba992cdf49f5d3161d682c93496813591216589a5944b24172e0c87a7'
    },
    {
        id: 'cert-agile-pm-start',
        type: 'course',
        title: 'Getting Started as an Agile Project Manager',
        institution: 'LinkedIn Learning',
        summary: 'Fundamentos e práticas iniciais para gestão de projetos ágeis.',
        bullets: [
            'Agile Manifesto',
            'Scrum Basics',
            'Kanban',
            'Agile Roles'
        ],
        skills: ['Agile', 'Project Management', 'Scrum', 'Kanban'],
        dateCompleted: '2022-09',
        format: 'online',
        level: 'beginner',
        verified: true,
        certificateUrl: 'https://www.linkedin.com/learning/certificates/c1929be07e7b1f6184bde470b4d9e72bcd3cc0b00f3fabe2c908a2aa64695b10'
    },
    {
        id: 'cert-ibm-virtual',
        type: 'certification',
        title: 'IBM Virtual Collaborator',
        institution: 'IBM',
        summary: 'Competências comprovadas para colaboração eficaz e produtiva em ambientes virtuais.',
        bullets: [
            'Remote Collaboration',
            'Digital Tools',
            'Virtual Communication',
            'Team Productivity'
        ],
        skills: ['Remote Work', 'Collaboration', 'Virtual Teams', 'Communication'],
        dateCompleted: '2022-03',
        format: 'online',
        level: 'intermediate',
        verified: true,
        certificateUrl: 'https://www.credly.com/badges/f0173dbe-6b4a-486f-a2d6-746698abff75?source=linked_in_profile'
    },
    {
        id: 'cert-agile-arch',
        type: 'certification',
        title: 'Agile Enterprise Architecture',
        institution: 'IBM',
        summary: 'Arquitetura empresarial aplicada em contextos ágeis para transformação digital.',
        bullets: [
            'Enterprise Architecture',
            'Agile Strategy',
            'Digital Transformation',
            'Architecture Governance'
        ],
        skills: ['Agile', 'Enterprise Architecture', 'Strategy', 'TOGAF'],
        dateCompleted: '2022-03',
        format: 'online',
        level: 'advanced',
        verified: true,
        certificateUrl: 'https://www.credly.com/badges/5f3c70f7-e973-4a20-866a-e4fa19be92a8?source=linked_in_profile'
    },
    {
        id: 'cert-ibm-clm',
        type: 'certification',
        title: 'IBM CLM® for SAFe® - Level 1',
        institution: 'IBM',
        summary: 'Gestão do ciclo de vida colaborativo (CLM) para Scaled Agile Framework (SAFe).',
        bullets: [
            'SAFe Framework',
            'Collaborative Lifecycle Management',
            'Requirements Management',
            'Quality Management'
        ],
        skills: ['IBM CLM', 'SAFe', 'Agile', 'ALM'],
        dateCompleted: '2022-01',
        format: 'online',
        level: 'intermediate',
        verified: true,
        certificateUrl: 'https://www.credly.com/badges/58cc08a4-31b8-43ac-b9e2-c8156d4cf65e?source=linked_in_profile'
    },
    {
        id: 'cert-design-thinking',
        type: 'certification',
        title: 'Enterprise Design Thinking Practitioner',
        institution: 'IBM',
        summary: 'Praticante de Design Thinking focado em soluções empresariais centradas no usuário.',
        bullets: [
            'User-Centered Design',
            'Empathy Maps',
            'Ideation',
            'Prototyping'
        ],
        skills: ['Design Thinking', 'Innovation', 'UX', 'User Research'],
        dateCompleted: '2021-10',
        format: 'online',
        level: 'intermediate',
        verified: true,
        certificateUrl: 'https://www.credly.com/badges/00e2a313-7cf1-4476-9638-fbdbe33b8fe1?source=linked_in_profile'
    }
];
