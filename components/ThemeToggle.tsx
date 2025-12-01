import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            style={{
                overflow: 'hidden',
                position: 'relative',
                background: 'transparent',
                border: '1px solid transparent',
                padding: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                    rotate: isDark ? 90 : 0,
                }}
                transition={{ duration: 0.5, ease: "backOut" }}
            >
                <mask id="moon-mask">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <motion.circle
                        cx="24"
                        cy="10"
                        r="6"
                        fill="black"
                        animate={{
                            cx: isDark ? 17 : 24,
                            cy: isDark ? 7 : 10,
                        }}
                        transition={{ duration: 0.5, ease: "backOut" }}
                    />
                </mask>

                <motion.circle
                    cx="12"
                    cy="12"
                    r="5"
                    fill={isDark ? "#bfdbfe" : "#fbbf24"} // Blue-200 for Moon, Amber-400 for Sun
                    stroke="none"
                    mask="url(#moon-mask)"
                    animate={{
                        r: isDark ? 8 : 5,
                        fill: isDark ? "#bfdbfe" : "#fbbf24"
                    }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                />

                <motion.g
                    stroke="#fbbf24" // Amber-400 for Sun rays
                    initial={{ opacity: 1 }}
                    animate={{
                        opacity: isDark ? 0 : 1,
                        scale: isDark ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </motion.g>
            </motion.svg>
        </button>
    );
};

export default ThemeToggle;
