import React from 'react';
import Section from './Section';
import { SkillFlipCard, skillsData } from './SkillCard';

const SkillsChart: React.FC = () => {
  return (
    <Section id="skills" title="Principais Competências">
      <div style={{ width: '100%', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'var(--item-gap)',
          rowGap: 'var(--section-gap)'
        }}>
          {skillsData.map((skill, index) => (
            <SkillFlipCard
              key={skill.name}
              skill={skill}
              index={index}
              flipOnHover={true}
              autoRotate={false}
              axis="y"
              disabled={false}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SkillsChart;