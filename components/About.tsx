import React, { useState, useRef, useEffect } from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { softSkillsData, type SoftSkill } from '../data/softSkillsData';
import { useLanguage } from '../contexts/LanguageContext';

// Ícones SVG minimalistas
const icons = {
  compass: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  message: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  users: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  target: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  lightbulb: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  ),
  handshake: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
};

interface SoftSkillFlipCardProps {
  skill: SoftSkill;
  index: number;
  autoRotate?: number | false;
  axis?: 'y' | 'x';
}

const SoftSkillFlipCard: React.FC<SoftSkillFlipCardProps> = ({
  skill,
  index,
  autoRotate = false,
  axis = 'y'
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Auto-rotate functionality
  useEffect(() => {
    if (autoRotate && typeof autoRotate === 'number' && !isHovered && !isFocused) {
      const initialDelay = index * 1000;

      const startRotation = () => {
        autoRotateTimerRef.current = setInterval(() => {
          setIsFlipped(prev => !prev);
        }, autoRotate);
      };

      const timeoutId = setTimeout(() => {
        setIsFlipped(true);
        startRotation();
      }, initialDelay);

      return () => {
        clearTimeout(timeoutId);
        if (autoRotateTimerRef.current) {
          clearInterval(autoRotateTimerRef.current);
        }
      };
    }
  }, [autoRotate, isHovered, isFocused, index]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    } else if (e.key === 'Escape' && isFlipped) {
      e.preventDefault();
      setIsFlipped(false);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!prefersReducedMotion) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsFlipped(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Custom easing for premium feel
  const FLIP_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const FLIP_DURATION = '0.6s';

  // Professional & Impactful Palette (Deep Midnight Blue with Electric Blue Accent)
  const accentColor = '#3b82f6'; // Electric Blue
  const accentSoft = 'rgba(59, 130, 246, 0.12)';
  const accentBorder = 'rgba(59, 130, 246, 0.25)';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        perspective: prefersReducedMotion ? 'none' : '1300px',
        cursor: 'pointer',
        height: 'auto', // Fluid height
        minHeight: '240px' // Minimum height for consistency
      }}
      onClick={handleFlip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      role="article"
      aria-label={`${skill.name} - ${isFlipped ? 'mostrando detalhes' : 'pressione Enter ou Space para ver detalhes'}`}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateAreas: '"stack"',
          transformStyle: prefersReducedMotion ? 'flat' : 'preserve-3d',
          transition: prefersReducedMotion
            ? 'opacity 0.3s ease'
            : `transform ${FLIP_DURATION} ${FLIP_EASING}`,
          transform: prefersReducedMotion ? 'none' : (isFlipped ? (axis === 'y' ? 'rotateY(180deg)' : 'rotateX(180deg)') : (axis === 'y' ? 'rotateY(0deg)' : 'rotateX(0deg)')),
          borderRadius: 'var(--radius-xl)',
          outline: 'none'
        }}
      >
        {/* Front Side */}
        <div
          style={{
            gridArea: 'stack',
            width: '100%',
            height: '100%', // Ensure it fills the grid cell
            backfaceVisibility: prefersReducedMotion ? 'visible' : 'hidden',
            display: prefersReducedMotion && isFlipped ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-xl)',
            border: `2px solid ${isHovered && !isFlipped ? accentColor : accentBorder}`,
            padding: '1.75rem',
            boxShadow: isFlipped
              ? 'var(--shadow-sm)'
              : (isHovered
                ? `0 12px 24px -8px rgba(59, 130, 246, 0.3), 0 0 0 1px ${accentSoft}`
                : 'var(--shadow-md)'),
            transition: `box-shadow 0.3s ${FLIP_EASING}, border-color 0.3s ${FLIP_EASING}, transform 0.3s ${FLIP_EASING}`,
            transform: isHovered && !isFlipped ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
            willChange: 'transform, box-shadow',
            opacity: prefersReducedMotion ? 1 : (isFlipped ? 0 : 1),
          }}
          aria-hidden={isFlipped}
        >
          {/* Icon */}
          <div style={{
            color: accentColor,
            marginBottom: 'var(--spacing-md)',
            opacity: 0.9,
            transition: `transform 0.3s ${FLIP_EASING}`,
            transform: isHovered && !isFlipped ? 'scale(1.08)' : 'scale(1)'
          }}>
            {icons[skill.icon as keyof typeof icons]}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            lineHeight: 1.3,
          }}>
            {skill.name}
          </h3>

          {/* Tagline */}
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
            margin: 0,
            lineHeight: 1.5,
            fontWeight: 500,
            opacity: 0.85,
          }}>
            {skill.tagline}
          </p>

          {/* Hint */}
          {!isFlipped && (
            <div style={{
              marginTop: 'auto',
              paddingTop: 'var(--spacing-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.6875rem',
              color: 'var(--color-text-tertiary)',
              fontWeight: 600,
              opacity: isHovered ? 1 : 0.6,
              transition: 'opacity 0.3s ease',
            }}>
              <span>Ver detalhes</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>

        {/* Back Side */}
        <div
          style={{
            gridArea: 'stack',
            width: '100%',
            height: '100%', // Ensure it fills the grid cell
            backfaceVisibility: prefersReducedMotion ? 'visible' : 'hidden',
            display: prefersReducedMotion && !isFlipped ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            background: `linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)`, // Deep Midnight Blue Gradient
            borderRadius: 'var(--radius-xl)',
            padding: '1.25rem',
            boxShadow: isFlipped
              ? '0 20px 40px -10px rgba(30, 58, 138, 0.5)'
              : 'var(--shadow-md)',
            transform: prefersReducedMotion ? 'none' : 'rotateY(180deg)',
            color: 'white',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            opacity: prefersReducedMotion ? 1 : (isFlipped ? 1 : 0),
            transition: `opacity 0.4s ${FLIP_EASING} 0.3s, box-shadow 0.4s ${FLIP_EASING} 0.3s`,
            willChange: 'opacity, box-shadow',
            overflow: 'hidden'
          }}
          aria-hidden={!isFlipped}
          aria-live="polite"
        >
          {/* Header */}
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: 'white',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            lineHeight: 1.3
          }}>
            {skill.name}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '0.75rem',
            lineHeight: 1.5,
            color: 'rgba(255, 255, 255, 0.95)',
            margin: '0 0 0.75rem 0',
            fontWeight: 400,
          }}>
            {skill.description}
          </p>

          {/* Examples */}
          <div style={{ marginTop: 'auto', width: '100%' }}>
            <p style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              marginBottom: '0.375rem',
              color: 'rgba(255, 255, 255, 0.9)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Aplicações
            </p>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              {skill.examples.map((example, idx) => (
                <li key={idx} style={{
                  fontSize: '0.6875rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  paddingLeft: '0.875rem',
                  position: 'relative',
                  lineHeight: 1.3
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.3rem',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                  }} />
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const { t } = useLanguage();

  const softSkills: SoftSkill[] = [
    {
      name: t('softskills.leadership.name'),
      icon: 'compass',
      tagline: t('softskills.leadership.tagline'),
      description: t('softskills.leadership.description'),
      examples: [
        t('softskills.leadership.example1'),
        t('softskills.leadership.example2'),
        t('softskills.leadership.example3')
      ]
    },
    {
      name: t('softskills.communication.name'),
      icon: 'message',
      tagline: t('softskills.communication.tagline'),
      description: t('softskills.communication.description'),
      examples: [
        t('softskills.communication.example1'),
        t('softskills.communication.example2'),
        t('softskills.communication.example3')
      ]
    },
    {
      name: t('softskills.mentorship.name'),
      icon: 'users',
      tagline: t('softskills.mentorship.tagline'),
      description: t('softskills.mentorship.description'),
      examples: [
        t('softskills.mentorship.example1'),
        t('softskills.mentorship.example2'),
        t('softskills.mentorship.example3')
      ]
    },
    {
      name: t('softskills.strategic.name'),
      icon: 'target',
      tagline: t('softskills.strategic.tagline'),
      description: t('softskills.strategic.description'),
      examples: [
        t('softskills.strategic.example1'),
        t('softskills.strategic.example2'),
        t('softskills.strategic.example3')
      ]
    },
    {
      name: t('softskills.problem_solving.name'),
      icon: 'lightbulb',
      tagline: t('softskills.problem_solving.tagline'),
      description: t('softskills.problem_solving.description'),
      examples: [
        t('softskills.problem_solving.example1'),
        t('softskills.problem_solving.example2'),
        t('softskills.problem_solving.example3')
      ]
    },
    {
      name: t('softskills.teamwork.name'),
      icon: 'handshake',
      tagline: t('softskills.teamwork.tagline'),
      description: t('softskills.teamwork.description'),
      examples: [
        t('softskills.teamwork.example1'),
        t('softskills.teamwork.example2'),
        t('softskills.teamwork.example3')
      ]
    }
  ];

  return (
    <Section id="about" title={t('about.title')}>
      <div style={{
        width: '100%',
        margin: '0 auto',
      }}>
        {/* Professional Summary */}
        <div className="animate-on-scroll" style={{ marginBottom: '3rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.8',
              color: 'var(--color-text-secondary)',
            }}
            dangerouslySetInnerHTML={{ __html: t('about.summary') }}
          />
        </div>

        {/* Soft Skills Flip Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          marginTop: '0'
        }}>
          {softSkills.map((skill, index) => (
            <SoftSkillFlipCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default About;