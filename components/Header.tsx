import React, { useEffect, useRef } from 'react';
import AvatarLogo from './AvatarLogo';
import DownloadCVButton from './DownloadCVButton';
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
    <div className="stat-item" ref={ref}>
      <div className="stat-number">
        <motion.span>{displayValue}</motion.span>+
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t } = useLanguage();

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('projects');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="home" role="banner" className="header-hero">
      <div className="container">
        <div className="header-inner">
          {/* Avatar Section */}
          <div className="avatar-section animate-on-scroll">
            <div className="avatar-wrapper">
              <AvatarLogo size={180} />
              <div className="avatar-glow" aria-hidden="true"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="content-section">


            <h1 className="header-title animate-on-scroll">
              Newton Calvin
            </h1>

            <div className="subtitle-wrapper animate-on-scroll">
              <p className="header-subtitle">
                {t('header.subtitle.1')} & {t('header.subtitle.2')}
              </p>
            </div>

            <p className="header-description animate-on-scroll">
              {t('header.description')}
              <br />
              <DownloadCVButton variant="link" />
            </p>

            {/* Innovative Scroll Indicator - Auto Scroll Trigger */}
            <motion.div
              className="scroll-indicator"
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
                className="mouse-icon"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="mouse-wheel" />
              </motion.div>
              <motion.span
                className="scroll-text"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {t('header.scroll')}
              </motion.span>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <div className="header-stats animate-on-scroll">
            <AnimatedStat value={10} label={t('header.stats.years')} />
            <div className="stat-divider" aria-hidden="true"></div>
            <AnimatedStat value={8} label={t('header.stats.projects')} />
            <div className="stat-divider" aria-hidden="true"></div>
            <AnimatedStat value={15} label={t('header.stats.technologies')} />
          </div>
        </div>
      </div>
    </header >
  );
};

export default Header;