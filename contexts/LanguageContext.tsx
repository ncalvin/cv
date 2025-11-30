import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Header
    'header.available': 'Disponível para novas oportunidades',
    'header.subtitle.1': 'Tech Lead especializado em Fintech',
    'header.subtitle.2': 'Arquiteto de Soluções Salesforce',
    'header.subtitle.3': 'Full-Stack Developer (Python & Node.js)',
    'header.subtitle.4': 'Especialista em Cloud & Security',
    'header.description': 'Transformo desafios complexos em soluções elegantes. Com mais de 10 anos de experiência, lidero equipes e projetos que entregam resultados mensuráveis em Fintech, Cloud e Digital Transformation.',
    'header.cta.contact': 'Vamos Conversar',
    'header.cta.projects': 'Ver Projetos',
    'header.cta.download': 'Baixar CV',
    'header.stats.years': 'Anos de Experiência',
    'header.stats.projects': 'Projetos Concluídos',
    'header.stats.technologies': 'Tecnologias Dominadas',
    'header.scroll': 'Role para saber mais',
    
    // Navigation
    'nav.about': 'Sobre',
    'nav.experience': 'Experiência',
    'nav.skills': 'Habilidades',
    'nav.education': 'Educação',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    
    // Skills
    'skills.title': 'Habilidades Técnicas',
    'skills.salesforce.tagline': 'Soluções enterprise que transformam',
    'skills.salesforce.description': 'Service Cloud, Field Service, CRM, CPQ e integração complexa de sistemas',
    'skills.fintech.tagline': 'Pagamentos seguros e escaláveis',
    'skills.fintech.description': 'Arquitetura de pagamentos digitais com compliance PCI-DSS',
    'skills.cloud.tagline': 'Infraestrutura moderna e resiliente',
    'skills.cloud.description': 'AWS, Azure, arquitetura serverless e microsserviços escaláveis',
    'skills.python.tagline': 'Backend robusto e performático',
    'skills.python.description': 'Django, FastAPI, data processing e automação de processos',
    'skills.node.tagline': 'APIs rápidas e escaláveis',
    'skills.node.description': 'Express, REST APIs, microservices e aplicações real-time',
    'skills.security.tagline': 'Segurança em cada camada',
    'skills.security.description': 'Fortify, ForgeRock, compliance e testes de penetração',
    'skills.devops.tagline': 'Deploy contínuo e confiável',
    'skills.devops.description': 'GitLab, Jenkins, Docker, Ansible e orquestração Kubernetes',
    'skills.databricks.tagline': 'Big Data e Analytics',
    'skills.databricks.description': 'Apache Spark, migração de dados e pipelines ETL robustos',
    
    // About
    'about.title': 'Sobre Mim',
    
    // Experience
    'experience.title': 'Experiência Profissional',
    
    // Education
    'education.title': 'Formação Acadêmica',
    
    // Projects
    'projects.title': 'Projetos em Destaque',
    
    // Contact
    'contact.title': 'Vamos Trabalhar Juntos',
    
    // Footer
    'footer.rights': 'Todos os direitos reservados.',
  },
  en: {
    // Header
    'header.available': 'Available for new opportunities',
    'header.subtitle.1': 'Tech Lead specialized in Fintech',
    'header.subtitle.2': 'Salesforce Solutions Architect',
    'header.subtitle.3': 'Full-Stack Developer (Python & Node.js)',
    'header.subtitle.4': 'Cloud & Security Specialist',
    'header.description': 'I transform complex challenges into elegant solutions. With over 10 years of experience, I lead teams and projects that deliver measurable results in Fintech, Cloud, and Digital Transformation.',
    'header.cta.contact': "Let's Talk",
    'header.cta.projects': 'View Projects',
    'header.cta.download': 'Download CV',
    'header.stats.years': 'Years of Experience',
    'header.stats.projects': 'Completed Projects',
    'header.stats.technologies': 'Mastered Technologies',
    'header.scroll': 'Scroll to learn more',
    
    // Navigation
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.education': 'Education',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Skills
    'skills.title': 'Technical Skills',
    'skills.salesforce.tagline': 'Enterprise solutions that transform',
    'skills.salesforce.description': 'Service Cloud, Field Service, CRM, CPQ and complex system integration',
    'skills.fintech.tagline': 'Secure and scalable payments',
    'skills.fintech.description': 'Digital payment architecture with PCI-DSS compliance',
    'skills.cloud.tagline': 'Modern and resilient infrastructure',
    'skills.cloud.description': 'AWS, Azure, serverless architecture and scalable microservices',
    'skills.python.tagline': 'Robust and high-performance backend',
    'skills.python.description': 'Django, FastAPI, data processing and process automation',
    'skills.node.tagline': 'Fast and scalable APIs',
    'skills.node.description': 'Express, REST APIs, microservices and real-time applications',
    'skills.security.tagline': 'Security at every layer',
    'skills.security.description': 'Fortify, ForgeRock, compliance and penetration testing',
    'skills.devops.tagline': 'Continuous and reliable deployment',
    'skills.devops.description': 'GitLab, Jenkins, Docker, Ansible and Kubernetes orchestration',
    'skills.databricks.tagline': 'Big Data and Analytics',
    'skills.databricks.description': 'Apache Spark, data migration and robust ETL pipelines',
    
    // About
    'about.title': 'About Me',
    
    // Experience
    'experience.title': 'Professional Experience',
    
    // Education
    'education.title': 'Academic Background',
    
    // Projects
    'projects.title': 'Featured Projects',
    
    // Contact
    'contact.title': "Let's Work Together",
    
    // Footer
    'footer.rights': 'All rights reserved.',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored === 'en' || stored === 'pt') ? stored : 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
