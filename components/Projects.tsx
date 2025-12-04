import type { Project } from '../types';
import React, { useState } from 'react';
import Section from './Section';
import { GithubIcon, ExternalLinkIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const Projects: React.FC = () => {
    const { t } = useLanguage();
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const projects: Project[] = [
        {
            title: t('projects.getnet.title'),
            description: t('projects.getnet.description'),
            repoUrl: '#',
            liveUrl: 'https://www.santander.com/en/press-room/press-releases/2024/10/getnet-by-santander-launches-getnet-sep-a-solution-for-e-commerce-payments-in-brazil-argentina-mexico-and-chile-through-a-single-integration',
            imageUrl: '/images/getnet-project.png',
            year: '2025',
        },
        {
            title: t('projects.pagonxt.title'),
            description: t('projects.pagonxt.description'),
            repoUrl: '#',
            liveUrl: 'https://www.pagonxt.com/',
            imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1032&auto=format&fit=crop',
            year: '2023',
        },
        {
            title: t('projects.sap.title'),
            description: t('projects.sap.description'),
            repoUrl: '#',
            liveUrl: '#',
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=870&auto=format&fit=crop',
            year: '2021',
        },
        {
            title: t('projects.magenta.title'),
            description: t('projects.magenta.description'),
            repoUrl: '#',
            liveUrl: 'http://devops.telekom.de/de',
            imageUrl: '/images/magenta-cicd-logo.png',
            year: '2020',
        },
    ];

    const toggleExpand = (index: number) => {
        setExpandedId(expandedId === index ? null : index);
    };

    return (
        <Section id="projects" title={t('projects.title')}>
            <div className="timeline-container animate-on-scroll is-visible">
                {projects.map((project, index) => {
                    const isExpanded = expandedId === index;

                    return (
                        <div key={index} className="timeline-row">
                            {/* Timeline Date Column (Year) */}
                            <div className="timeline-date-col">
                                <div className="timeline-date-content">
                                    <span className="timeline-year" style={{ fontSize: '1.2rem' }}>{project.year}</span>
                                </div>
                                <div className="timeline-marker-line">
                                    <div className="timeline-dot"></div>
                                </div>
                            </div>

                            {/* Project Card Column */}
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
                                    {/* Header */}
                                    <div className="card-header">
                                        {/* Expand Icon */}
                                        <div className="expand-icon" style={{ transition: 'transform 0.3s ease', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </div>

                                        <div className="card-title-group">
                                            <h3 className="card-role">{project.title}</h3>
                                        </div>
                                    </div>

                                    {/* Collapsed View: Summary (Truncated Description) */}
                                    {!isExpanded && (
                                        <div className="card-summary line-clamp-1">
                                            {project.description}
                                        </div>
                                    )}
                                </div>

                                {/* Expanded View: Details */}
                                {isExpanded && (
                                    <div className="card-details" style={{ marginTop: '1.5rem' }}>
                                        <div style={{
                                            display: 'flex',
                                            gap: '1.5rem',
                                            flexDirection: window.innerWidth < 768 ? 'column' : 'row'
                                        }}>
                                            {/* Image (Left) */}
                                            {project.imageUrl && (
                                                <div style={{
                                                    flexShrink: 0,
                                                    width: window.innerWidth < 768 ? '100%' : '33%',
                                                    maxWidth: window.innerWidth < 768 ? '100%' : '240px'
                                                }}>
                                                    <div className="rounded-lg overflow-hidden shadow-sm border border-border">
                                                        <img
                                                            src={project.imageUrl}
                                                            alt={project.title}
                                                            className="w-full h-auto object-cover"
                                                            style={{
                                                                width: '100%',
                                                                height: 'auto',
                                                                maxHeight: '160px',
                                                                objectFit: 'cover',
                                                                borderRadius: '0.5rem'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Text Content (Right) */}
                                            <div style={{ flexGrow: 1 }}>
                                                {/* Full Description */}
                                                <p className="card-summary-expanded mb-6 text-text-secondary leading-relaxed" style={{ lineHeight: '1.625' }}>
                                                    {project.description}
                                                </p>

                                                {/* Links */}
                                                <div className="flex gap-4" style={{ display: 'flex', gap: '1rem' }}>
                                                    {project.repoUrl && project.repoUrl !== '#' && (
                                                        <a
                                                            href={project.repoUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn-text flex items-center gap-2"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <GithubIcon width={16} height={16} />
                                                            {t('projects.cta.code')}
                                                        </a>
                                                    )}
                                                    {project.liveUrl && project.liveUrl !== '#' && (
                                                        <a
                                                            href={project.liveUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn-text flex items-center gap-2 text-primary"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <ExternalLinkIcon width={16} height={16} />
                                                            {t('projects.cta.live')}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
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

export default Projects;