import type { Project } from '../types';
import React, { useState } from 'react';
import Section from './Section';
import { GithubIcon, ExternalLinkIcon } from './Icons';
import { projectsData } from '../data/projectsData';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectListItem: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '85%' }}>
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
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                        fontWeight: 800,
                        color: isHovered ? 'var(--color-primary)' : 'var(--color-text-primary)',
                        transition: 'color 0.3s ease',
                        margin: 0,
                    }}>
                        {project.title}
                    </h3>
                </div>
                <motion.span
                    animate={{ rotate: isHovered ? 45 : 0 }}
                    style={{
                        fontSize: '2rem',
                        color: isHovered ? 'var(--color-primary)' : 'var(--color-text-tertiary)'
                    }}
                >
                    ↗
                </motion.span>
            </div>

            {/* Expanded Content (Faded In) */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '2rem' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="project-content-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '2rem',
                            alignItems: 'center'
                        }}>
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
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    {project.repoUrl && project.repoUrl !== '#' && (
                                        <a
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-text"
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                        >
                                            <GithubIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                                            Ver Código
                                        </a>
                                    )}
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-text"
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}
                                    >
                                        <ExternalLinkIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                                        Ver Projeto
                                    </a>
                                </div>
                            </div>

                            {/* Image Preview */}
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Fallback (Always visible on small screens, hidden on desktop via CSS) */}
            <div className="mobile-only-content" style={{ marginTop: '1.5rem', display: 'none' }}>
                <style>{`
                    @media (max-width: 768px) {
                        .project-content-grid {
                            grid-template-columns: 1fr !important;
                        }
                        .mobile-only-content {
                            display: block !important;
                        }
                        .project-list-item:hover .project-content-grid {
                            display: none !important;
                        }
                    }
                `}</style>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{project.description}</p>
                <a href={project.liveUrl} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Ver Projeto →</a>
            </div>
        </motion.div>
    );
};

const Projects: React.FC = () => {
    return (
        <Section id="projects" title="Projetos Selecionados">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {projectsData.map((project, index) => (
                    <ProjectListItem key={index} project={project} index={index} />
                ))}
            </div>
        </Section>
    );
};

export default Projects;