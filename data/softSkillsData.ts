export interface SoftSkill {
    name: string;
    tagline: string;
    description: string;
    examples: string[];
    icon: string;
}

/**
 * Soft Skills Data for Tech Leads
 * 
 * Essential soft skills for technical leadership based on
 * personal branding and leadership best practices.
 */
export const softSkillsData: SoftSkill[] = [
    {
        name: 'Liderança Técnica',
        icon: 'compass',
        tagline: 'Guiar equipes com visão clara',
        description: 'Capacidade de definir direção técnica, inspirar equipes e tomar decisões arquiteturais que equilibram inovação com pragmatismo.',
        examples: [
            'Definição de roadmaps técnicos',
            'Tomada de decisões arquiteturais',
            'Inspiração e motivação de times'
        ]
    },
    {
        name: 'Comunicação Efetiva',
        icon: 'message',
        tagline: 'Traduzir complexidade em clareza',
        description: 'Habilidade de comunicar conceitos técnicos complexos para diferentes audiências, desde desenvolvedores até executivos.',
        examples: [
            'Apresentações para stakeholders',
            'Documentação técnica clara',
            'Facilitação de discussões técnicas'
        ]
    },
    {
        name: 'Mentoria & Coaching',
        icon: 'users',
        tagline: 'Desenvolver talentos e elevar o time',
        description: 'Compromisso com o crescimento da equipe através de mentoria ativa, feedback construtivo e criação de oportunidades de aprendizado.',
        examples: [
            'Sessões 1:1 regulares',
            'Code reviews educativos',
            'Planos de desenvolvimento individual'
        ]
    },
    {
        name: 'Pensamento Estratégico',
        icon: 'target',
        tagline: 'Alinhar tecnologia com negócio',
        description: 'Visão holística que conecta decisões técnicas aos objetivos de negócio, antecipando tendências e planejando para o futuro.',
        examples: [
            'Alinhamento tech-business',
            'Planejamento de longo prazo',
            'Análise de trade-offs'
        ]
    },
    {
        name: 'Resolução de Problemas',
        icon: 'lightbulb',
        tagline: 'Transformar desafios em oportunidades',
        description: 'Abordagem estruturada para resolver problemas complexos, combinando pensamento analítico com criatividade e pragmatismo.',
        examples: [
            'Debugging de sistemas complexos',
            'Otimização de performance',
            'Resolução de conflitos técnicos'
        ]
    },
    {
        name: 'Colaboração',
        icon: 'handshake',
        tagline: 'Trabalhar efetivamente em equipe',
        description: 'Capacidade de trabalhar com times multifuncionais, construir consenso e criar ambiente de confiança e colaboração.',
        examples: [
            'Trabalho cross-functional',
            'Construção de consenso',
            'Facilitação de retrospectivas'
        ]
    }
];
