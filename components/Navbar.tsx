import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, XIcon } from './Icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import AvatarLogo from './AvatarLogo';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
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
    className={`nav-link-base ${isActive ? 'active' : ''}`}
    aria-current={isActive ? 'page' : undefined}
  >
    {item.label}
    {isActive && (
      <motion.div
        layoutId="nav-pill"
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="nav-pill"
      />
    )}
  </a>
);

const ActionButton: React.FC<{ onClick: () => void; label: string; children: React.ReactNode }> = ({ onClick, label, children }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="action-button"
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
  const { t } = useLanguage();
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
    { href: '#about', label: t('nav.about') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#courses', label: t('nav.education') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact-section', label: t('nav.contact') },
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
        className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
          {/* Left Actions Group: Language & Theme */}
          <div className="flex items-center gap-2">
            <LanguageSelector align="left" />
            <ThemeToggle />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center" role="navigation" aria-label="Main Navigation">
            <div
              className="nav-links-container"
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
            {/* ThemeToggle removed from here as it's now on the left */}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {/* ThemeToggle removed from here as it's now on the left */}
            <ActionButton
              onClick={() => setIsOpen(!isOpen)}
              label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <XIcon width="20" height="20" /> : <MenuIcon width="20" height="20" />}
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
            className="mobile-menu-overlay"
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
            className="mobile-menu-drawer"
          >
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Menu</span>
              <ActionButton onClick={() => setIsOpen(false)} label="Close menu">
                <XIcon />
              </ActionButton>
            </div>

            <div className="mobile-menu-links">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="mobile-menu-link"
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
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;