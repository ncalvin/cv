import type { CourseItem } from '../types';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Section from './Section';
import { coursesData } from '../data/coursesData';
import { AwardIcon, BookOpenIcon, TerminalIcon, ChevronDownIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

// Type badge component
const TypeBadge: React.FC<{ type: CourseItem['type'] }> = ({ type }) => {
    const { t } = useLanguage();

    const config = {
        certification: { label: t('courses.filters.certification'), color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
        course: { label: t('courses.filters.course'), color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
        training: { label: t('courses.filters.training'), color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' }
    };

    const { label, color, bg } = config[type];

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            color,
            background: bg,
            border: `1px solid ${color}40`,
            textTransform: 'uppercase',
            letterSpacing: '0.025em'
        }}>
            {label}
        </span>
    );
};

// Pulse animation for the "New" indicator or Call-to-Open chevron
const pulseAnimation = {
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1],
    transition: {
        duration: 2,
        repeat: 2, // Run 2-3 cycles as requested
        ease: "easeInOut"
    }
};

// Course Accordion Item Component
const CourseAccordionItem: React.FC<{
    course: CourseItem;
    index: number;
    isNewest: boolean;
    isOpen: boolean;
    onToggle: () => void;
}> = ({ course, index, isNewest, isOpen, onToggle }) => {
    const [isHovered, setIsHovered] = useState(false);
    const headerRef = useRef<HTMLButtonElement>(null);
    const { t } = useLanguage();

    // Auto-scroll on mobile when opening
    useEffect(() => {
        if (isOpen && window.innerWidth < 768 && headerRef.current) {
            setTimeout(() => {
                headerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        }
    }, [isOpen]);

    const getIcon = (type: CourseItem['type']) => {
        switch (type) {
            case 'certification': return <AwardIcon width={18} height={18} />;
            case 'training': return <TerminalIcon width={18} height={18} />;
            default: return <BookOpenIcon width={18} height={18} />;
        }
    };

    const getIconColor = (type: CourseItem['type']) => {
        switch (type) {
            case 'certification': return '#10B981'; // Emerald
            case 'training': return '#8B5CF6'; // Violet
            default: return '#3B82F6'; // Blue
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            layout
            style={{
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '0.75rem',
                position: 'relative',
                transition: 'all 0.2s ease',
                zIndex: isHovered ? 10 : 1,
                boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.08)' : '0 1px 2px rgba(0,0,0,0.03)',
                transform: isHovered ? 'translateY(-2px)' : 'none'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                ref={headerRef}
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`course-content-${course.id}`}
                style={{
                    width: '100%',
                    padding: '0.75rem 1rem', // Compact height (~48-56px)
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    position: 'relative',
                    outline: 'none'
                }}
                className="group focus-visible:ring-2 focus-visible:ring-primary"
            >
                {/* Left Content: Icon + Title + Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
                    {/* Icon */}
                    <div style={{
                        color: getIconColor(course.type),
                        opacity: isHovered || isOpen ? 1 : 0.7,
                        transition: 'opacity 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: isOpen ? `${getIconColor(course.type)}15` : 'transparent'
                    }}>
                        {getIcon(course.type)}
                    </div>

                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h3 style={{
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: 'var(--color-text-primary)',
                                margin: 0,
                                position: 'relative',
                                lineHeight: 1.4
                            }}>
                                {course.title}
                                <span style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: isHovered ? '100%' : '0%',
                                    height: '1px',
                                    background: 'var(--color-primary)',
                                    transition: 'width 0.3s ease'
                                }} />
                            </h3>
                            {course.verified && (
                                <span title={t('courses.verified')} style={{ color: '#10B981', display: 'flex', alignItems: 'center' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                                </span>
                            )}
                        </div>

                        {/* Compact Meta */}
                        <div style={{
                            fontSize: '0.8rem',
                            color: 'var(--color-text-tertiary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{ fontWeight: 500 }}>{course.institution}</span>
                            <span style={{ opacity: 0.4 }}>•</span>
                            <span>{new Date(course.dateCompleted || '').toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>

                {/* Right Content: New Indicator + Chevron */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '0.5rem' }}>
                    {isNewest && !isOpen && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0.8 }}
                            animate={pulseAnimation}
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#10B981',
                                boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)'
                            }}
                        />
                    )}

                    <motion.div
                        animate={{
                            rotate: isOpen ? 180 : 0,
                            y: !isOpen ? [0, 2, 0] : 0
                        }}
                        transition={{
                            rotate: { duration: 0.3 },
                            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{
                            color: isOpen ? 'var(--color-text-secondary)' : 'var(--color-primary)',
                            opacity: 1,
                            background: isOpen ? 'transparent' : 'rgba(59, 130, 246, 0.1)',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <ChevronDownIcon width={18} height={18} strokeWidth={2.5} />
                    </motion.div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id={`course-content-${course.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} // Smooth cubic-bezier
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{
                            padding: '0 1rem 1.5rem 3.5rem', // Indented
                            color: 'var(--color-text-secondary)'
                        }}>
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                            >
                                <p style={{
                                    lineHeight: 1.6,
                                    fontSize: '0.9rem',
                                    marginBottom: '1rem',
                                    maxWidth: '95%'
                                }}>
                                    {course.summary}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                    {course.skills.map(skill => (
                                        <span key={skill} style={{
                                            fontSize: '0.7rem',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '999px',
                                            background: 'var(--color-bg-tertiary)',
                                            color: 'var(--color-text-secondary)',
                                            border: '1px solid var(--color-border)',
                                            fontWeight: 500
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {course.certificateUrl && (
                                    <a
                                        href={course.certificateUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-text"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: 'var(--color-primary)',
                                            fontWeight: 600,
                                            fontSize: '0.85rem',
                                            textDecoration: 'none',
                                            marginTop: '0.5rem'
                                        }}
                                    >
                                        {t('courses.viewCredential')}
                                        <motion.span
                                            animate={{ x: [0, 3, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                        >
                                            →
                                        </motion.span>
                                    </a>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Main Courses Component
const Courses: React.FC = () => {
    const [selectedType, setSelectedType] = useState<CourseItem['type'] | 'all'>('all');
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const { t } = useLanguage();

    // Translate courses data
    const translatedCourses = useMemo(() => {
        return coursesData.map(course => ({
            ...course,
            title: t(`courses.items.${course.id}.title`),
            institution: t(`courses.items.${course.id}.institution`),
            summary: t(`courses.items.${course.id}.summary`),
            bullets: (t(`courses.items.${course.id}.bullets`, { returnObjects: true }) as unknown) as string[]
        }));
    }, [t]);

    // Filter and Sort courses
    const filteredCourses = useMemo(() => {
        let filtered = translatedCourses;

        // Filter by type
        if (selectedType !== 'all') {
            filtered = filtered.filter(course => course.type === selectedType);
        }

        // Sort by date (newest first)
        return filtered.sort((a, b) => {
            const dateA = a.dateCompleted || '0000-00';
            const dateB = b.dateCompleted || '0000-00';
            return dateB.localeCompare(dateA);
        });
    }, [selectedType, translatedCourses]);

    // Identify the newest item ID for the pulse effect
    const newestCourseId = useMemo(() => {
        if (filteredCourses.length > 0) {
            return filteredCourses[0].id;
        }
        return null;
    }, [filteredCourses]);

    // Count items for badges
    const counts = useMemo(() => {
        const c = { all: coursesData.length, certification: 0, course: 0, training: 0 };
        coursesData.forEach(item => {
            if (c[item.type] !== undefined) c[item.type]++;
        });
        return c;
    }, []);

    return (
        <Section id="courses" title={t('courses.title')}>
            <div style={{
                maxWidth: '1000px', // Increased max-width for 2-column layout
                margin: '0 auto'
            }}>
                {/* Header Text */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '2.5rem',
                    textAlign: 'center'
                }}>
                    <p style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '1rem',
                        maxWidth: '500px',
                        margin: '0 0 2rem 0',
                        lineHeight: 1.5
                    }}>
                        {t('courses.subtitle')}
                    </p>

                    {/* Filter Pills */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        justifyContent: 'center',
                    }}>
                        {(['all', 'certification', 'course', 'training'] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                style={{
                                    padding: '0.4rem 1rem',
                                    borderRadius: '999px',
                                    border: selectedType === type ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                                    background: selectedType === type ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                    color: selectedType === type ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                    fontWeight: selectedType === type ? 600 : 500,
                                    fontSize: '0.8rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem'
                                }}
                            >
                                {type === 'all' ? t('courses.filters.all') :
                                    type === 'certification' ? t('courses.filters.certification') :
                                        type === 'course' ? t('courses.filters.course') :
                                            t('courses.filters.training')}
                                <span style={{
                                    fontSize: '0.7rem',
                                    opacity: 0.7,
                                    background: selectedType === type ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
                                    color: selectedType === type ? 'white' : 'var(--color-text-tertiary)',
                                    padding: '0.1rem 0.4rem',
                                    borderRadius: '999px',
                                    minWidth: '1.2em',
                                    textAlign: 'center'
                                }}>
                                    {counts[type]}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Container */}
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                        gap: '1rem',
                        marginTop: '1rem'
                    }}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredCourses.map((course, index) => {
                            const row = Math.floor(index / 2);
                            const isOpen = expandedRow === row;

                            return (
                                <CourseAccordionItem
                                    key={course.id}
                                    course={course}
                                    index={index}
                                    isNewest={course.id === newestCourseId}
                                    isOpen={isOpen}
                                    onToggle={() => setExpandedRow(isOpen ? null : row)}
                                />
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {filteredCourses.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        color: 'var(--color-text-tertiary)'
                    }}>
                        {t('courses.noResults')}
                    </div>
                )}
            </div>
        </Section>
    );
};

export default Courses;
