import React, { useState, useEffect, useRef } from 'react';
import { SkillFlipCard } from './SkillCard';
import { useLanguage } from '../contexts/LanguageContext';
import { SkillCard } from '../types';

const SkillsChart: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skills: SkillCard[] = [
    {
      name: 'Salesforce',
      level: 95,
      tagline: t('skills.salesforce.tagline'),
      impactStatement: t('skills.salesforce.impact'),
      description: t('skills.salesforce.description'),
      results: [
        t('skills.salesforce.result.0'),
        t('skills.salesforce.result.1'),
        t('skills.salesforce.result.2')
      ],
      chips: ['Service Cloud', 'Field Service', 'CPQ']
    },
    {
      name: t('skills.fintech.name'),
      level: 90,
      tagline: t('skills.fintech.tagline'),
      impactStatement: t('skills.fintech.impact'),
      description: t('skills.fintech.description'),
      results: [
        t('skills.fintech.result.0'),
        t('skills.fintech.result.1'),
        t('skills.fintech.result.2')
      ],
      chips: ['PCI-DSS', 'Gateways', 'Fraud Detection']
    },
    {
      name: t('skills.cloud.name'),
      level: 90,
      tagline: t('skills.cloud.tagline'),
      impactStatement: t('skills.cloud.impact'),
      description: t('skills.cloud.description'),
      results: [
        t('skills.cloud.result.0'),
        t('skills.cloud.result.1'),
        t('skills.cloud.result.2')
      ],
      chips: ['Azure', 'Serverless']
    },
    {
      name: 'Python',
      level: 85,
      tagline: t('skills.python.tagline'),
      impactStatement: t('skills.python.impact'),
      description: t('skills.python.description'),
      results: [
        t('skills.python.result.0'),
        t('skills.python.result.1')
      ],
      chips: ['Django', 'Pandas', 'Knime']
    },
    {
      name: 'Node.js',
      level: 85,
      tagline: t('skills.node.tagline'),
      impactStatement: t('skills.node.impact'),
      description: t('skills.node.description'),
      results: [
        t('skills.node.result.0'),
        t('skills.node.result.1'),
        t('skills.node.result.2')
      ],
      chips: ['Express', 'NestJS', 'Socket.io']
    },
    {
      name: 'Cybersecurity',
      level: 80,
      tagline: t('skills.security.tagline'),
      impactStatement: t('skills.security.impact'),
      description: t('skills.security.description'),
      results: [
        t('skills.security.result.0'),
        t('skills.security.result.1')
      ],
      chips: ['Fortify', 'ForgeRock', 'OWASP']
    },
    {
      name: t('skills.devops.name'),
      level: 80,
      tagline: t('skills.devops.tagline'),
      impactStatement: t('skills.devops.impact'),
      description: t('skills.devops.description'),
      results: [
        t('skills.devops.result.0'),
        t('skills.devops.result.1'),
        t('skills.devops.result.2')
      ],
      chips: ['GitLab CI', 'Docker', 'K8s']
    },
    {
      name: 'Databricks',
      level: 75,
      tagline: t('skills.databricks.tagline'),
      impactStatement: t('skills.databricks.impact'),
      description: t('skills.databricks.description'),
      results: [
        t('skills.databricks.result.0'),
        t('skills.databricks.result.1'),
        t('skills.databricks.result.2')
      ],
      chips: ['Spark', 'Delta Lake']
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title inline-block relative">
            {t('skills.title')}
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '28px' }}>
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} h-full`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <SkillFlipCard
                skill={skill}
                index={index}
                flipOnHover={true}
                autoRotate={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsChart;