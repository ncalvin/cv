import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, XIcon } from './Icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import AvatarLogo from './AvatarLogo';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

// --- Types & Interfaces ---
interface NavLinkItem {
  href: string;
  label: string;
}

interface NavLinkProps {
  item: NavLinkItem;
  isActive: boolean;
  onClick: () => void;
  onHover: () => void;
}

// --- Components ---

const NavLink: React.FC<NavLinkProps> = ({ item, isActive, onClick, onHover }) => (
  <a
    href={item.href}
    onClick={onClick}
    onMouseEnter={onHover}
    className="nav-link"
    aria-current={isActive ? 'page' : undefined}
    style={{
      position: 'relative',
      padding: '0.6rem 1.25rem',
      fontSize: '0.95rem',
      fontWeight: 500,
      color: isActive ? 'var(--color-primary)' : 'var(--color-text-primary)',
      textDecoration: 'none',
      display: 'block',
      transition: 'color 0.3s ease',
      zIndex: 1,
      outline: 'none',
    }}
  >
    {item.label}
    {isActive && (
      <motion.div
        layoutId="nav-pill"
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(110, 168, 255, 0.12)',
          borderRadius: '12px',
          zIndex: -1,
          border: '1px solid rgba(110, 168, 255, 0.15)',
          boxShadow: '0 0 20px rgba(110, 168, 255, 0.1)',
        }}
      />
    )}
  </a>
);

const ActionButton: React.FC<{ onClick: () => void; label: string; children: React.ReactNode }> = ({ onClick, label, children }) => (
  <button
    onClick={onClick}
    aria-label={label}
    style={{
      padding: '0.5rem',
      borderRadius: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-text-secondary)',
      transition: 'all 0.2s ease',
      minWidth: '40px',
      minHeight: '40px',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.borderColor = 'var(--color-primary)';
      e.currentTarget.style.color = 'var(--color-primary)';
      e.currentTarget.style.backgroundColor = 'rgba(110, 168, 255, 0.05)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.color = 'var(--color-text-secondary)';
      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
    }}
    onFocus={(e) => {
      e.currentTarget.style.borderColor = 'var(--color-primary)';
      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(110, 168, 255, 0.3)';
    }}
    onBlur={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {children}
  </button>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Scroll Logic: Auto-hide & Transparency
  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;

    // Auto-hide logic (only triggers after scrolling down a bit)
    if (Math.abs(diff) > 5) { // Threshold to avoid jitter
      if (latest > 100 && diff > 0) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    }

    // Transparency logic
    setIsScrolled(latest > 20);

    lastScrollY.current = latest;
  });

  const navLinks: NavLinkItem[] = [
    { href: '#about', label: 'Sobre' },
    { href: '#experience', label: 'Experiência' },
    { href: '#skills', label: 'Habilidades' },
    { href: '#projects', label: 'Projetos' },
    { href: '#contact-section', label: 'Contato' },
  ];

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
  };

  return (
    <>
      <motion.header
        variants={navVariants}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          padding: isScrolled ? '1rem' : '1.5rem',
          pointerEvents: 'none', // Allow clicks through the container area
        }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: '1000px',
            padding: '0.5rem 1rem',
            backgroundColor: isScrolled
              ? (theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.85)')
              : (theme === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(15, 23, 42, 0.5)'),
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            borderRadius: '16px',
            border: `1px solid ${theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)'}`,
            boxShadow: isScrolled
              ? `0 20px 40px -10px ${theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.4)'}, 0 0 0 1px ${theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255, 255, 255, 0.05)'} inset`
              : `0 10px 30px -10px ${theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.2)'}, 0 0 0 1px ${theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255, 255, 255, 0.05)'} inset`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Centered content
            gap: '2rem', // Added gap for spacing
            transition: 'all 0.3s ease',
          }}
        >
          {/* Logo Section - Removed as per request */}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center" role="navigation" aria-label="Main Navigation">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                padding: '0.25rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.href}
                  item={link}
                  isActive={hoveredIndex === index}
                  onClick={() => { }}
                  onHover={() => setHoveredIndex(index)}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem', gap: '0.5rem' }}>
              <ActionButton
                onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                label={`Switch to ${language === 'pt' ? 'English' : 'Portuguese'}`}
              >
                <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{language === 'pt' ? 'EN' : 'PT'}</span>
              </ActionButton>

              <ActionButton
                onClick={toggleTheme}
                label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} mode`}
              >
                {theme === 'light' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
              </ActionButton>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ActionButton
              onClick={() => setIsOpen(!isOpen)}
              label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <XIcon /> : <MenuIcon />}
            </ActionButton>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 998,
            }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '80%',
              maxWidth: '320px',
              backgroundColor: 'var(--color-bg-secondary)',
              borderLeft: '1px solid var(--color-border)',
              zIndex: 999,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Menu</span>
              <ActionButton onClick={() => setIsOpen(false)} label="Close menu">
                <XIcon />
              </ActionButton>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid transparent',
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(110, 168, 255, 0.1)',
                    borderColor: 'rgba(110, 168, 255, 0.2)',
                    color: 'var(--color-primary)',
                    x: 5
                  }}
                >
                  {link.label}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </motion.a>
              ))}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <ActionButton
                onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                label="Switch Language"
              >
                <span style={{ fontWeight: 600, padding: '0 0.5rem' }}>{language === 'pt' ? 'English' : 'Português'}</span>
              </ActionButton>

              <ActionButton
                onClick={toggleTheme}
                label="Toggle Theme"
              >
                {theme === 'light' ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 0.5rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                    <span>Dark</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 0.5rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                    <span>Light</span>
                  </div>
                )}
              </ActionButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;