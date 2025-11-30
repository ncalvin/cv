import React from 'react';
import Section from './Section';
import SkillsChart from './SkillsChart';

const Skills: React.FC = () => {
  return (
    <Section id="skills" title="Principais Competências">
      {/* Key Competencies Text List */}
      <div className="animate-on-scroll" style={{ maxWidth: '900px', margin: '0 auto 3rem auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>

          {/* Liderança Técnica */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-primary)' }}>Liderança Técnica</h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              Gestão de Equipes Ágeis, Mentoria de Desenvolvedores, Code Review, Planejamento Estratégico.
            </p>
          </div>

          {/* Especialidade Salesforce */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-primary)' }}>Especialidade Salesforce</h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              Apex, Lightning Web Components (LWC), Sales Cloud, Service Cloud, Arquitetura de CRM.
            </p>
          </div>

          {/* Tech Management */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-primary)' }}>Tech Management</h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
              CI/CD, DevOps, Gestão de Stakeholders, Otimização de Processos de TI.
            </p>
          </div>

        </div>
      </div>

      <div className="animate-on-scroll" style={{ transitionDelay: `100ms` }}>
        <SkillsChart />
      </div>
    </Section>
  );
};

export default Skills;