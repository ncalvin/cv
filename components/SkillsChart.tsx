import React, { useState, useRef, useEffect } from 'react';
import type { Skill } from '../types';

interface SkillCard extends Skill {
  description: string;
  tagline?: string;
  impactStatement?: string;
  results?: string[];
  chips?: string[];
}

interface FlipCardProps {
  skill: SkillCard;
  index: number;
  flipOnHover?: boolean;
  autoRotate?: number | false;
  axis?: 'y' | 'x';
  disabled?: boolean;
}

const skillsData: SkillCard[] = [
  {
    name: 'Salesforce',
    level: 95,
    tagline: 'Soluções enterprise que transformam',
    impactStatement: '12 projetos · 3 países',
    description: 'Service Cloud, Field Service, CRM, CPQ e integração complexa de sistemas',
    results: ['+45% conversão', '12 projetos', '3 países'],
    chips: ['Service Cloud', 'Field Service', 'CPQ']
  },
  {
    name: 'Fintech & Payments',
    level: 90,
    tagline: 'Pagamentos seguros e escaláveis',
    impactStatement: '5M+ transações processadas',
    description: 'Arquitetura de pagamentos digitais com compliance PCI-DSS',
    results: ['99.9% uptime', '5M+ transações', 'PCI-DSS'],
    chips: ['PCI-DSS', 'Gateways', 'Fraud Detection']
  },
  {
    name: 'Cloud Architecture',
    level: 90,
    tagline: 'Infraestrutura moderna e resiliente',
    impactStatement: 'multi-cloud · serverless',
    description: 'AWS, Azure, arquitetura serverless e microsserviços escaláveis',
    results: ['-40% custos', '99.95% SLA', 'Multi-cloud'],
    chips: ['AWS', 'Azure', 'Serverless']
  },
  {
    name: 'Python',
    level: 85,
    tagline: 'Backend robusto e performático',
    impactStatement: '8 anos · 20+ APIs',
    description: 'Django, FastAPI, data processing e automação de processos',
    results: ['8+ anos', '20+ APIs', 'ETL pipelines'],
    chips: ['Django', 'FastAPI', 'Pandas']
  },
  {
    name: 'Node.js',
    level: 85,
    tagline: 'APIs rápidas e escaláveis',
    impactStatement: '10K+ req/s · real-time',
    description: 'Express, REST APIs, microservices e aplicações real-time',
    results: ['10K+ req/s', '15+ APIs', 'WebSockets'],
    chips: ['Express', 'NestJS', 'Socket.io']
  },
  {
    name: 'Cybersecurity',
    level: 80,
    tagline: 'Segurança em cada camada',
    impactStatement: 'zero breach · SOC 2',
    description: 'Fortify, ForgeRock, compliance e testes de penetração',
    results: ['Zero breach', 'SOC 2', 'Pen testing'],
    chips: ['Fortify', 'ForgeRock', 'OWASP']
  },
  {
    name: 'DevOps (CI/CD)',
    level: 80,
    tagline: 'Deploy contínuo e confiável',
    impactStatement: '50+ deploys/mês · zero downtime',
    description: 'GitLab, Jenkins, Docker, Ansible e orquestração Kubernetes',
    results: ['50+ deploys/mês', '95% automação', 'Zero downtime'],
    chips: ['GitLab CI', 'Docker', 'K8s']
  },
  {
    name: 'Databricks',
    level: 75,
    tagline: 'Big Data e Analytics',
    impactStatement: '5TB+ · 100M records',
    description: 'Apache Spark, migração de dados e pipelines ETL robustos',
    results: ['5TB+ migrados', '100M+ records', 'Delta Lake'],
    chips: ['Spark', 'Delta Lake', 'MLflow']
  },
];

const CARD_ACCENT = '#6EA8FF';
const CARD_ACCENT_SOFT = 'rgba(110, 168, 255, 0.16)';
const CARD_ACCENT_BORDER = 'rgba(110, 168, 255, 0.38)';

// Função helper para obter cor de superfície com suporte a tema
const getCardSurfaceBg = (isDark: boolean) =>
  isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(240, 247, 255, 0.95)';


const SkillFlipCard: React.FC<FlipCardProps> = ({
  skill,
  index,
  flipOnHover = true,
  autoRotate = false,
  axis = 'y',
  disabled = false
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
    // Detectar tema atual
    const checkTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };

    checkTheme();

    // Observar mudanças no atributo data-theme
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Auto-rotate functionality
  useEffect(() => {
    if (autoRotate && typeof autoRotate === 'number' && !isHovered && !isFocused && !disabled) {
      // Add staggered delay based on index to prevent all cards flipping at once
      const initialDelay = index * 1000; // 1 second delay between each card's first flip

      const startRotation = () => {
        autoRotateTimerRef.current = setInterval(() => {
          setIsFlipped(prev => !prev);
        }, autoRotate);
      };

      const timeoutId = setTimeout(() => {
        setIsFlipped(true); // Initial flip
        startRotation();
      }, initialDelay);

      return () => {
        clearTimeout(timeoutId);
        if (autoRotateTimerRef.current) {
          clearInterval(autoRotateTimerRef.current);
        }
      };
    }
  }, [autoRotate, isHovered, isFocused, disabled, index]);

  const handleFlip = () => {
    if (!disabled) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

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
    if (flipOnHover && !disabled && !prefersReducedMotion) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (flipOnHover && !disabled) {
      setIsFlipped(false);
    }
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

  const rotateTransform = axis === 'y'
    ? (isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')
    : (isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)');
  const accentColor = CARD_ACCENT;
  const accentSoft = CARD_ACCENT_SOFT;
  const accentBorder = CARD_ACCENT_BORDER;

  return (
    <div
      ref={cardRef}
      className="animate-on-scroll"
      style={{
        perspective: prefersReducedMotion ? 'none' : '1300px',
        height: '220px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'opacity 0.2s ease'
      }}
      onClick={handleFlip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={disabled ? -1 : 0}
      role="article"
      aria-label={`${skill.name} - ${isFlipped ? 'mostrando detalhes' : 'pressione Enter ou Space para ver detalhes'}`}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: prefersReducedMotion ? 'flat' : 'preserve-3d',
          transition: prefersReducedMotion
            ? 'opacity 0.3s ease'
            : `transform ${FLIP_DURATION} ${FLIP_EASING}`,
          transform: prefersReducedMotion ? 'none' : rotateTransform,
          willChange: prefersReducedMotion ? 'auto' : 'transform',
          outline: isFocused ? '3px solid var(--color-primary)' : 'none',
          outlineOffset: '4px',
          borderRadius: 'var(--radius-xl)'
        }}
      >
        {/* Front Side - Brand First Design */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: prefersReducedMotion ? 'visible' : 'hidden',
            WebkitBackfaceVisibility: prefersReducedMotion ? 'visible' : 'hidden',
            display: prefersReducedMotion && isFlipped ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-xl)',
            border: `1px solid ${isHovered && !isFlipped ? accentColor : accentBorder}`,
            padding: '1.25rem',
            boxShadow: isFlipped
              ? 'none'
              : (isHovered
                ? `0 8px 16px -4px rgba(0, 0, 0, 0.15), 0 0 0 1px ${accentColor}, 0 0 12px -2px rgba(110, 168, 255, 0.3)`
                : `0 4px 8px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(110, 168, 255, 0.15)`),
            transition: prefersReducedMotion
              ? 'opacity 0.25s ease'
              : `box-shadow 0.3s ${FLIP_EASING}, opacity 0.3s ease, border-color 0.3s ${FLIP_EASING}, transform 0.3s ${FLIP_EASING}`,
            opacity: prefersReducedMotion ? 1 : (isFlipped ? 0 : 1),
            transform: isHovered && !isFlipped && !prefersReducedMotion
              ? 'translateZ(10px) translateY(-4px) scale(1.02)'
              : 'translateZ(0)',
            willChange: 'transform, box-shadow',
            overflow: 'hidden'
          }}
          aria-hidden={isFlipped}
        >
          {/* Accent Divider */}
          <div
            style={{
              width: '40px',
              height: '2px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: accentColor,
              marginBottom: 'var(--spacing-sm)',
              opacity: 0.8,
              transition: 'opacity 0.3s ease'
            }}
            aria-hidden="true"
          />

          {/* Title & Tagline */}
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            marginBottom: '0.375rem',
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            lineHeight: 1.3,
            transition: `transform 0.3s ${FLIP_EASING}`,
            transform: isHovered && !isFlipped ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)'
          }}>
            {skill.name}
          </h3>

          {skill.tagline && (
            <p style={{
              fontSize: '0.8125rem',
              color: 'var(--color-text-secondary)',
              textAlign: 'center',
              margin: '0 0 var(--spacing-sm) 0',
              lineHeight: 1.4,
              fontWeight: 400,
              opacity: 0.8,
              padding: '0 0.25rem'
            }}>
              {skill.tagline}
            </p>
          )}

          {/* Impact Statement */}
          {skill.impactStatement && (
            <div style={{
              marginTop: 'var(--spacing-sm)',
              padding: '0.375rem 0.625rem',
              background: 'transparent',
              border: `1px solid rgba(110, 168, 255, 0.2)`,
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <span style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
                letterSpacing: '0.2px',
                lineHeight: 1.4,
                opacity: 0.8
              }}>
                {skill.impactStatement}
              </span>
            </div>
          )}

          {/* Chevron Indicator */}
          {!isFlipped && (
            <div style={{
              marginTop: 'auto',
              paddingTop: 'var(--spacing-xs)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.6875rem',
              color: 'var(--color-text-tertiary)',
              fontWeight: 500,
              opacity: isHovered ? 0.9 : 0.6,
              transition: 'opacity 0.3s ease',
              transform: 'translateY(0)'
            }}>
              <span>Ver detalhes</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" style={{
                transition: 'transform 0.3s ease',
                transform: isHovered ? 'translateX(1px)' : 'translateX(0)'
              }}>
                <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>

        {/* Back Side - Results & Skills Focused */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: prefersReducedMotion ? 'visible' : 'hidden',
            WebkitBackfaceVisibility: prefersReducedMotion ? 'visible' : 'hidden',
            display: prefersReducedMotion && !isFlipped ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: '0.875rem',
            boxShadow: isFlipped
              ? `0 8px 16px -4px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)`
              : 'none',
            transform: prefersReducedMotion ? 'none' : (axis === 'y' ? 'rotateY(180deg)' : 'rotateX(180deg)'),
            color: '#ffffff',
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            opacity: prefersReducedMotion ? 1 : (isFlipped ? 1 : 0),
            transition: prefersReducedMotion
              ? 'opacity 0.25s ease'
              : `opacity 0.4s ${FLIP_EASING} 0.3s, box-shadow 0.4s ${FLIP_EASING} 0.3s`,
            willChange: 'opacity, box-shadow',
            overflow: 'hidden'
          }}
          aria-hidden={!isFlipped}
          aria-live="polite"
        >
          {/* Header */}
          <div style={{ width: '100%', marginBottom: '0.375rem' }}>
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '0.1875rem',
              color: '#60a5fa',
              textShadow: 'none',
              lineHeight: 1.2
            }}>
              {skill.name}
            </h3>
            <div style={{
              width: '32px',
              height: '2px',
              backgroundColor: '#60a5fa',
              borderRadius: 'var(--radius-full)',
              opacity: 0.8
            }} />
          </div>

          {/* Results/Metrics */}
          {skill.results && skill.results.length > 0 && (
            <div style={{
              display: 'flex',
              gap: '0.3125rem',
              flexWrap: 'wrap',
              marginBottom: '0.375rem',
              width: '100%'
            }}>
              {skill.results.map((result, idx) => (
                <div key={idx} style={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  padding: '0.1875rem 0.4375rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: `1px solid rgba(255, 255, 255, 0.2)`,
                  borderRadius: 'var(--radius-md)',
                  color: '#ffffff',
                  textShadow: 'none',
                  backdropFilter: 'blur(4px)',
                  letterSpacing: '0.2px',
                  lineHeight: 1.2
                }}>
                  {result}
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <p style={{
            fontSize: '0.6875rem',
            lineHeight: 1.45,
            color: 'rgba(255, 255, 255, 0.9)',
            margin: '0 0 0.375rem 0',
            fontWeight: 400,
            textShadow: 'none'
          }}>
            {skill.description}
          </p>

          {/* Skills Chips */}
          {skill.chips && skill.chips.length > 0 && (
            <div style={{
              display: 'flex',
              gap: '0.3125rem',
              flexWrap: 'wrap',
              marginBottom: '0.375rem',
              width: '100%'
            }}>
              {skill.chips.map((chip, idx) => (
                <span key={idx} style={{
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  padding: '0.1875rem 0.4375rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-full)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(2px)',
                  boxShadow: 'none',
                  lineHeight: 1.2
                }}>
                  {chip}
                </span>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '0.375rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            width: '100%'
          }}>
            <a
              href="#contact"
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3125rem',
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: '#60a5fa',
                textDecoration: 'none',
                padding: '0.25rem 0',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                borderRadius: 'var(--radius-sm)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#93c5fd';
                e.currentTarget.style.transform = 'translateX(2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#60a5fa';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span>Vamos conversar sobre isso</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h6M6 3l3 3-3 3" />
              </svg>
            </a>
          </div>

          {/* Close Hint */}
          {isFlipped && (
            <div style={{
              fontSize: '0.5625rem',
              color: 'rgba(255, 255, 255, 0.6)',
              marginTop: '0.25rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.1875rem'
            }}>
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 2L8 8M8 2L2 8" strokeLinecap="round" />
              </svg>
              <span>ESC ou clique para fechar</span>
            </div>
          )}
        </div>

        {/* Screen Reader Only Content */}
        <div style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0
        }}>
          {isFlipped
            ? `Detalhes de ${skill.name}: ${skill.description}`
            : `${skill.name} com ${skill.level}% de proficiência`}
        </div>
      </div>
    </div>
  );
};

const SkillsChart: React.FC = () => {
  return (
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
  );
};

export default SkillsChart;