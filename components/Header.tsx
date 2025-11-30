import React, { useEffect, useRef, useState } from 'react';
import { DownloadIcon } from './Icons';
import DownloadCVButton from './DownloadCVButton';
import AvatarLogo from './AvatarLogo';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';



const AnimatedStat = ({ value, label }: { value: number; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  // Slow, smooth spring configuration
  const spring = useSpring(0, {
    mass: 5,      // Heavier mass = slower movement
    stiffness: 50, // Lower stiffness = less snap
    damping: 50,   // Higher damping = no bounce, just smooth arrival
    duration: 3000 // Fallback/hint
  });

  const displayValue = useTransform(spring, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <div style={styles.statItem} ref={ref}>
      <div style={styles.statNumber}>
        <motion.span>{displayValue}</motion.span>+
      </div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
};

const Header: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = () => {
    setIsDownloading(true);
    setTimeout(() => {
      window.open('/cv.html', '_blank');
      setIsDownloading(false);
    }, 800);
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('projects');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="home" role="banner" style={styles.hero}>
      <div className="container">
        <div style={styles.heroInner}>
          {/* Avatar Section */}
          <div style={styles.avatarSection} className="animate-on-scroll">
            <div style={styles.avatarWrapper}>
              <AvatarLogo size={180} />
              <div style={styles.avatarGlow} aria-hidden="true"></div>
            </div>
          </div>

          {/* Content Section */}
          <div style={styles.contentSection}>


            <h1 style={styles.mainTitle} className="animate-on-scroll">
              Newton Luiz Calvin
            </h1>

            <div style={styles.subtitleWrapper} className="animate-on-scroll">
              <p style={styles.subtitle}>
                Tech Lead & Especialista Salesforce
              </p>
            </div>

            <p style={styles.description} className="animate-on-scroll">
              Impulsionando a transformação digital através de liderança técnica estratégica. Atuo como <strong>Tech Manager</strong> focado em arquitetura de soluções robustas e gestão de equipes de alta performance para maximizar resultados de negócios.
            </p>

            {/* CTA Buttons */}
            <div style={styles.ctaContainer} className="animate-on-scroll">
              <button
                onClick={scrollToContact}
                className="btn btn-primary"
                style={styles.ctaPrimary}
              >
                Entrar em Contato
              </button>
              <button
                onClick={handleDownloadCV}
                className="btn btn-primary"
                style={styles.ctaPrimary}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid #fff',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                ) : (
                  <DownloadIcon style={styles.iconDownload} />
                )}
                <span style={{ marginLeft: '0.5rem' }}>{isDownloading ? 'Abrindo...' : 'Baixar CV'}</span>
              </button>
            </div>

            {/* Innovative Scroll Indicator - Auto Scroll Trigger */}
            <motion.div
              style={styles.scrollIndicator}
              aria-hidden="true"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              onClick={() => {
                const target = document.getElementById('about');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              role="button"
              tabIndex={0}
            >
              <motion.div
                style={styles.mouseIcon}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div style={styles.mouseWheel} />
              </motion.div>
              <motion.span
                style={styles.scrollText}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Role para saber mais
              </motion.span>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <div style={styles.statsContainer} className="animate-on-scroll">
            <AnimatedStat value={10} label="Anos de Experiência" />
            <div style={styles.statDivider} aria-hidden="true"></div>
            <AnimatedStat value={8} label="Projetos Concluídos" />
            <div style={styles.statDivider} aria-hidden="true"></div>
            <AnimatedStat value={15} label="Expertise em DevOps & CRM" />
          </div>
        </div>
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  hero: {
    minHeight: 'calc(100vh + 8rem)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    padding: '0 0 0', // Zero bottom padding
    paddingTop: 'calc(80px + 5px)',
    overflow: 'visible',
    background: 'transparent',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 0,
  },
  gradientOrb1: {
    position: 'absolute',
    top: '-20%',
    right: '-10%',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(110, 168, 255, 0.15) 0%, transparent 70%)',
    filter: 'blur(60px)',
    animation: 'float 20s ease-in-out infinite',
  },
  gradientOrb2: {
    position: 'absolute',
    bottom: '-15%',
    left: '-5%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(78, 123, 255, 0.12) 0%, transparent 70%)',
    filter: 'blur(50px)',
    animation: 'float 25s ease-in-out infinite reverse',
  },
  gradientOrb3: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(142, 186, 255, 0.1) 0%, transparent 70%)',
    filter: 'blur(40px)',
    animation: 'pulse 15s ease-in-out infinite',
  },
  particleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 1,
    pointerEvents: 'none',
  },
  particle: {
    position: 'absolute',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'rgba(110, 168, 255, 0.4)',
    boxShadow: '0 0 10px rgba(110, 168, 255, 0.6)',
    animation: 'floatParticle 20s linear infinite',
  },
  heroInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3rem', // Reduced gap for tighter layout
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '100%',
  },
  avatarSection: {
    flexShrink: 0,
    position: 'relative',
  },
  avatarWrapper: {
    position: 'relative',
    display: 'inline-block',
    padding: '0', // Removed padding for cleaner look
    borderRadius: '50%',
    // Modern structural glow: subtle layers of shadow instead of heavy blur
    boxShadow: `
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 20px 40px -10px rgba(0, 0, 0, 0.5),
      0 0 80px -20px rgba(78, 123, 255, 0.3)
    `,
  },
  avatarGlow: {
    // Removed heavy pulse. Keeping this as a subtle ambient light if needed, or removing.
    // Let's make it a very subtle static backlight.
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120%',
    height: '120%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(110, 168, 255, 0.15) 0%, transparent 70%)',
    filter: 'blur(20px)',
    zIndex: -1,
  },
  contentSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem', // Reduced gap further
    maxWidth: '650px', // Tightened width for better reading flow
    width: '100%',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(110, 168, 255, 0.1)',
    border: '1px solid rgba(110, 168, 255, 0.3)',
    borderRadius: '999px',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#6EA8FF',
    margin: '0 auto',
  },
  badgeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    animation: 'pulse 2s ease-in-out infinite',
  },
  mainTitle: {
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', // Significantly reduced max size
    fontWeight: 800,
    marginBottom: '0.25rem',
    background: 'linear-gradient(90deg, #FFFFFF 0%, #6EA8FF 50%, #FFFFFF 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
    animation: 'shimmer 8s ease-in-out infinite',
    position: 'relative' as const,
  },
  subtitleWrapper: {
    minHeight: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', // Reduced subtitle size
    color: 'var(--color-text-secondary)',
    margin: 0,
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  typedText: {
    // Styles merged into subtitle for gradient effect
  },
  description: {
    fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', // Reduced description size
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
    maxWidth: '600px', // Kept tight
    margin: '0 auto',
    fontWeight: 400,
    opacity: 0.8,
  },
  ctaContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '1rem',
  },
  ctaPrimary: {
    minHeight: '48px',
    padding: '0.875rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #6EA8FF 0%, #4E7BFF 100%)',
    boxShadow: '0 4px 14px 0 rgba(110, 168, 255, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'relative',
  },
  ctaIcon: {
    fontSize: '1.25rem',
    lineHeight: 1,
  },
  ctaBadge: {
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    marginLeft: '0.5rem',
    whiteSpace: 'nowrap',
  },
  ctaSecondary: {
    minHeight: '48px',
    padding: '0.875rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  availabilityBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    backgroundColor: 'var(--color-bg-secondary)',
    padding: '0.75rem 1.25rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-border)',
    marginTop: '1rem',
  },
  availabilityIcon: {
    fontSize: '1.125rem',
    lineHeight: 1,
  },
  iconDownload: {
    width: '18px',
    height: '18px',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column', // Changed to column
    justifyContent: 'center',
    alignItems: 'center', // Center items horizontally
    gap: '2rem', // Adjusted gap for vertical layout
    marginTop: '0', // Removed top margin to sit flush or close
    padding: '2rem', // Reduced padding
    background: 'var(--color-bg-secondary)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--color-border)',
    boxShadow: '0 8px 32px -8px rgba(59, 130, 246, 0.15)',
    position: 'relative',
    overflow: 'hidden',
    minWidth: '200px', // Ensure consistent width
  },
  statItem: {
    textAlign: 'center',
    padding: '0',
    borderRadius: '0',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 1,
    width: '100%',
  },
  statNumber: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    fontWeight: 900,
    color: 'var(--color-text-primary)',
    marginBottom: '0.25rem',
    lineHeight: 1,
    letterSpacing: '-0.02em',
  },
  statLabel: {
    fontSize: '0.65rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 600,
    lineHeight: 1.4,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    opacity: 0.8,
  },
  statDivider: {
    width: '60%', // Horizontal divider width
    height: '1px', // Horizontal divider height
    background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent)', // Horizontal gradient
    display: 'block',
  },
  scrollIndicator: {
    position: 'relative', // Changed from absolute
    marginTop: '3rem', // Add spacing from content above
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
    width: '100%', // Ensure centering
  },
  mouseIcon: {
    width: '26px',
    height: '42px',
    borderRadius: '13px',
    border: '2px solid var(--color-text-secondary)',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  mouseWheel: {
    width: '4px',
    height: '8px',
    borderRadius: '2px',
    backgroundColor: 'var(--color-primary)',
    marginTop: '8px',
  },
  scrollText: {
    fontSize: '0.75rem',
    color: 'var(--color-text-tertiary)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    fontWeight: 600,
    background: 'linear-gradient(to right, var(--color-text-tertiary), var(--color-primary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
};

// Media query styles applied via inline styles with window.matchMedia
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(min-width: 1024px)');

  if (mediaQuery.matches) {
    Object.assign(styles.heroInner, {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '4rem',
      textAlign: 'left',
    });

    Object.assign(styles.contentSection, {
      alignItems: 'flex-start',
    });

    Object.assign(styles.badge, {
      margin: 0,
    });

    Object.assign(styles.description, {
      margin: 0,
    });

    Object.assign(styles.ctaContainer, {
      justifyContent: 'flex-start',
    });

    Object.assign(styles.statsContainer, {
      justifyContent: 'flex-start',
    });
  }
}

export default Header;