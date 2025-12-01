import React, { useState } from 'react';
import Section from './Section';
import { useLanguage } from '../contexts/LanguageContext';
import type { ExperienceItem } from '../types';

const Experience: React.FC = () => {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const experienceData: ExperienceItem[] = [
    {
      company: 'Getnet',
      role: t('experience.getnet.role'),
      period: t('experience.getnet.period'),
      location: t('experience.getnet.location'),
      summary: t('experience.getnet.summary'),
      description: [
        t('experience.getnet.description.0'),
        t('experience.getnet.description.1'),
        t('experience.getnet.description.2'),
        t('experience.getnet.description.3'),
      ],
      results: [
        t('experience.getnet.result.0'),
        t('experience.getnet.result.1'),
      ],
      skills: [
        t('experience.getnet.skills.0'),
        t('experience.getnet.skills.1'),
        t('experience.getnet.skills.2'),
        t('experience.getnet.skills.3'),
        t('experience.getnet.skills.4'),
        t('experience.getnet.skills.5'),
      ],
      link: 'https://www.getnet.com.br'
    },
    {
      company: 'PagoNxt (a Santander company)',
      role: t('experience.pagonxt.role'),
      period: t('experience.pagonxt.period'),
      location: t('experience.pagonxt.location'),
      summary: t('experience.pagonxt.summary'),
      description: [
        t('experience.pagonxt.description.0'),
        t('experience.pagonxt.description.1'),
        t('experience.pagonxt.description.2'),
        t('experience.pagonxt.description.3'),
      ],
      results: [
        t('experience.pagonxt.result.0'),
        t('experience.pagonxt.result.1'),
      ],
      skills: [
        t('experience.pagonxt.skills.0'),
        t('experience.pagonxt.skills.1'),
        t('experience.pagonxt.skills.2'),
        t('experience.pagonxt.skills.3'),
        t('experience.pagonxt.skills.4'),
      ],
      link: 'https://www.pagonxt.com'
    },
    {
      company: 'IBM IX',
      role: t('experience.ibmix.role'),
      period: t('experience.ibmix.period'),
      location: t('experience.ibmix.location'),
      summary: t('experience.ibmix.summary'),
      description: [
        t('experience.ibmix.description.0'),
        t('experience.ibmix.description.1'),
        t('experience.ibmix.description.2'),
      ],
      results: [
        t('experience.ibmix.result.0'),
        t('experience.ibmix.result.1'),
      ],
      skills: [
        t('experience.ibmix.skills.0'),
        t('experience.ibmix.skills.1'),
        t('experience.ibmix.skills.2'),
        t('experience.ibmix.skills.3'),
        t('experience.ibmix.skills.4'),
      ],
      link: 'https://www.ibm.com/ibmix'
    },
    {
      company: 'T-Systems International',
      role: t('experience.tsystems.role'),
      period: t('experience.tsystems.period'),
      location: t('experience.tsystems.location'),
      summary: t('experience.tsystems.summary'),
      description: [
        t('experience.tsystems.description.0'),
        t('experience.tsystems.description.1'),
        t('experience.tsystems.description.2'),
      ],
      results: [
        t('experience.tsystems.result.0'),
        t('experience.tsystems.result.1'),
      ],
      skills: [
        t('experience.tsystems.skills.0'),
        t('experience.tsystems.skills.1'),
        t('experience.tsystems.skills.2'),
        t('experience.tsystems.skills.3'),
        t('experience.tsystems.skills.4'),
        t('experience.tsystems.skills.5'),
      ],
      link: 'https://www.t-systems.com'
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  const formatDate = (period: string) => {
    // Extract start date
    const startDateStr = period.split(' - ')[0];
    const parts = startDateStr.split(' ');

    let month = '';
    let year = '';

    if (parts.length === 3) { // PT: Month de Year
      month = parts[0].toLowerCase();
      year = parts[2];
    } else if (parts.length === 2) { // EN: Month Year
      month = parts[0].toLowerCase();
      year = parts[1];
    } else {
      return { month: '', year: '' };
    }

    const monthMap: { [key: string]: string } = {
      'janeiro': 'Jan', 'fevereiro': 'Fev', 'março': 'Mar', 'abril': 'Abr',
      'maio': 'Mai', 'junho': 'Jun', 'julho': 'Jul', 'agosto': 'Ago',
      'setembro': 'Set', 'outubro': 'Out', 'novembro': 'Nov', 'dezembro': 'Dez',
      // English
      'january': 'Jan', 'february': 'Feb', 'march': 'Mar', 'april': 'Apr',
      'may': 'May', 'june': 'Jun', 'july': 'Jul', 'august': 'Aug',
      'september': 'Sep', 'october': 'Oct', 'november': 'Nov', 'december': 'Dec'
    };

    const shortMonth = monthMap[month] || month.substring(0, 3);
    return { month: shortMonth, year };
  };

  return (
    <Section id="experience" title={t('experience.title')}>
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
              >
                {/* Accessible Trigger Wrapper */}
                <div
                  role="button"
                  aria-expanded={isExpanded}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(index);
                    }
                  }}
                  className="card-trigger"
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
                </div>

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
                      <p className="card-summary-expanded">{item.summary}</p>
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
                            <li key={i} className="result-item result-highlight">{res}</li>
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