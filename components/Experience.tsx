import React, { useState } from 'react';
import Section from './Section';
import { experienceData } from '../data/experienceData';

const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  const formatDate = (period: string) => {
    // Extract start date (assumes format "Month de Year - ...")
    const parts = period.split(' - ')[0].split(' ');
    if (parts.length >= 3) {
      const month = parts[0].toLowerCase();
      const year = parts[2];

      const monthMap: { [key: string]: string } = {
        'janeiro': 'Jan', 'fevereiro': 'Fev', 'março': 'Mar', 'abril': 'Abr',
        'maio': 'Mai', 'junho': 'Jun', 'julho': 'Jul', 'agosto': 'Ago',
        'setembro': 'Set', 'outubro': 'Out', 'novembro': 'Nov', 'dezembro': 'Dez'
      };

      const shortMonth = monthMap[month] || month.substring(0, 3);
      return { month: shortMonth, year };
    }
    return { month: '', year: '' };
  };

  return (
    <Section id="experience" title="Experiência Profissional">
      <div className="timeline-container animate-on-scroll is-visible">
        {experienceData.map((item, index) => {
          const isExpanded = expandedId === index;
          const { month, year } = formatDate(item.period);

          return (
            <div key={index} className="timeline-row">
              {/* Timeline Date Column */}
              <div className="timeline-date-col">
                <div className="timeline-date-content">
                  <span className="timeline-month">{month}</span>
                  <span className="timeline-year">{year}</span>
                </div>
                <div className="timeline-marker-line">
                  <div className="timeline-dot"></div>
                </div>
              </div>

              {/* Experience Card Column */}
              <div
                className={`experience-card ${isExpanded ? 'expanded' : ''} ${hoveredId === index && !isExpanded ? 'hovered' : ''}`}
                onClick={() => toggleExpand(index)}
                onMouseEnter={() => setHoveredId(index)}
                onMouseLeave={() => setHoveredId(null)}
                role="button"
                aria-expanded={isExpanded}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleExpand(index);
                  }
                }}
              >
                {/* Header: Icon (Left), Logo, Title Group */}
                <div className="card-header">
                  {/* Expand Icon - Now on Left */}
                  <div className="expand-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>

                  {isExpanded && (
                    <div className="company-logo">
                      {/* Placeholder for logo - using first letter of company */}
                      {item.logo ? (
                        <img src={item.logo} alt={`${item.company} logo`} />
                      ) : (
                        <span>{item.company.charAt(0)}</span>
                      )}
                    </div>
                  )}

                  <div className="card-title-group">
                    <h3 className="card-role">{item.role}</h3>
                    <span className="card-separator">at</span>
                    <div className="card-company">{item.company}</div>
                  </div>
                </div>

                {/* Collapsed View: Summary */}
                {!isExpanded && item.summary && (
                  <div className="card-summary">
                    {item.summary}
                  </div>
                )}

                {/* Expanded View: Details */}
                {isExpanded && (
                  <div className="card-details">
                    {/* Location moved here */}
                    <div className="card-meta">
                      {item.location && (
                        <span className="meta-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                          {item.location}
                        </span>
                      )}
                    </div>

                    {/* Summary if present */}
                    {item.summary && (
                      <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>{item.summary}</p>
                    )}

                    {/* Responsibilities / Description */}
                    <div className="details-section-title">Responsabilidades</div>
                    <ul className="results-list">
                      {item.description.map((desc, i) => (
                        <li key={i} className="result-item">{desc}</li>
                      ))}
                    </ul>

                    {/* Results */}
                    {item.results && item.results.length > 0 && (
                      <>
                        <div className="details-section-title">Resultados Chave</div>
                        <ul className="results-list">
                          {item.results.map((res, i) => (
                            <li key={i} className="result-item" style={{ color: 'var(--color-text-primary)' }}>{res}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Skills */}
                    {item.skills && item.skills.length > 0 && (
                      <>
                        <div className="details-section-title">Tecnologias</div>
                        <div className="skills-container">
                          {item.skills.map((skill, i) => (
                            <span key={i} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Link */}
                    {item.link && (
                      <div className="card-footer">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-text" onClick={(e) => e.stopPropagation()}>
                          Ver Empresa ↗
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Experience;