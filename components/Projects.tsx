import type { Project } from '../types';
import React, { useState } from 'react';
import Section from './Section';
import { GithubIcon, ExternalLinkIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectListItem: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const { t } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    const [isExpandedMobile, setIsExpandedMobile] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const isActive = isMobile ? isExpandedMobile : isHovered;

    const handleInteraction = () => {
        if (isMobile) {
            setIsExpandedMobile(!isExpandedMobile);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            onClick={handleInteraction}
            className="project-list-item"
            style={{
                borderBottom: '1px solid var(--color-border)',
                padding: '2rem 0',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Header Row */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '85%', flexWrap: 'wrap' }}>
                    {project.year && (
                        <span style={{
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            color: 'var(--color-primary)',
                            border: '1px solid var(--color-primary)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '999px',
                            whiteSpace: 'nowrap'
                        }}>
                            {project.year}
                        </span>
                    )}
                    <h3 style={{
                        fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
                        fontWeight: 800,
                        color: isActive ? 'var(--color-primary)' : 'var(--color-text-primary)',
                        transition: 'color 0.3s ease',
                        margin: 0,
                        lineHeight: 1.2
                    }}>
                        {project.title}
                    </h3>
                </div>
                <motion.span
                    animate={{ rotate: isActive ? 45 : 0 }}
                    style={{
                        fontSize: '2rem',
                        color: isActive ? 'var(--color-primary)' : 'var(--color-text-tertiary)'
                    }}
                >
                    ↗
                </motion.span>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '2rem' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="project-content-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            gap: '2rem',
                            alignItems: 'center'
                        }}>
                            {/* Mobile Image (First) */}
                            {isMobile && (
                                <div style={{
                                    borderRadius: 'var(--radius-lg)',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                                    border: '1px solid rgba(96, 165, 250, 0.3)',
                                    height: '200px',
                                    width: '100%'
                                }}>
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center'
                                        }}
                                    />
                                </div>
                            )}

                            {/* Description & Links */}
                            <div>
                                <p style={{
                                    fontSize: '1.125rem',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 1.6,
                                    marginBottom: '2rem'
                                }}>
                                    {project.description}
                                </p>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    {project.repoUrl && project.repoUrl !== '#' && (
                                        <a
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-text"
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <GithubIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                                            {t('projects.cta.code')}
                                        </a>
                                    )}
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-text"
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ExternalLinkIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                                        {t('projects.cta.live')}
                                    </a>
                                </div>
                            </div>

                            {/* Desktop Image (Second) */}
                            {!isMobile && (
                                <div style={{
                                    borderRadius: 'var(--radius-lg)',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                                    border: '1px solid rgba(96, 165, 250, 0.3)',
                                    height: '250px',
                                    width: '100%'
                                }}>
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Projects: React.FC = () => {
    const { t } = useLanguage();

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

    return (
        <Section id="projects" title={t('projects.title')}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {projects.map((project, index) => (
                    <ProjectListItem key={index} project={project} index={index} />
                ))}
            </div>
        </Section>
    );
};

export default Projects;