import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

const GlobeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

interface LanguageSelectorProps {
    direction?: 'up' | 'down';
    align?: 'left' | 'right';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ direction = 'down', align = 'right' }) => {
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navigate = useNavigate();

    const handleLanguageChange = (langCode: string) => {
        if (langCode === 'pt') {
            navigate('/');
        } else {
            navigate(`/${langCode}`);
        }
        setIsOpen(false);
    };

    return (
        <div className="language-selector" ref={containerRef}>
            <button
                className="language-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Select Language"
                aria-expanded={isOpen}
            >
                <GlobeIcon />
                <span className="current-lang-code">{language.toUpperCase()}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: direction === 'up' ? 10 : -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: direction === 'up' ? 10 : -10 }}
                        transition={{ duration: 0.2 }}
                        className="language-dropdown"
                        style={{
                            top: direction === 'down' ? 'calc(100% + 0.5rem)' : 'auto',
                            bottom: direction === 'up' ? 'calc(100% + 0.5rem)' : 'auto',
                            right: align === 'right' ? 0 : 'auto',
                            left: align === 'left' ? 0 : 'auto',
                        }}
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                className={`language-option ${language === lang.code ? 'active' : ''}`}
                                onClick={() => handleLanguageChange(lang.code)}
                            >
                                <span className="lang-name">{lang.name}</span>
                                {language === lang.code && (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="check-icon">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSelector;
