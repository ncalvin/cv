import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { generatePDF } from '../src/utils/pdfGenerator';
import './DownloadCVButton.css';

// Modern Minimalist Icon
const DownloadIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const SpinnerIcon = ({ className }: { className?: string }) => (
    <div className={`cv-spinner ${className}`} role="status" aria-label="Carregando"></div>
);

interface DownloadCVButtonProps {
    variant?: 'primary' | 'icon' | 'fab' | 'link';
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const DownloadCVButton: React.FC<DownloadCVButtonProps> = ({
    variant = 'primary',
    className = '',
    style,
    onClick
}) => {
    const { t, language } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleDownload = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);

        // Analytics Event (Mock)
        console.log('Analytics Event:', {
            category: 'CTA',
            action: 'cv_download',
            label: 'Newton_Calvin',
            value: 'PDF_HTML_View'
        });

        generatePDF(language).then(() => {
            setIsLoading(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            if (onClick) onClick();
        });
    };

    const ariaLabel = isLoading
        ? 'Preparando download...'
        : t('header.cta.download');

    // Link variant rendering
    if (variant === 'link') {
        return (
            <>
                <motion.button
                    className={`cv-btn cv-btn--link ${isLoading ? 'cv-btn--loading' : ''} ${className}`}
                    style={style}
                    onClick={handleDownload}
                    disabled={isLoading}
                    aria-label={ariaLabel}
                    title={t('header.cta.download')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {isLoading ? (
                        <span className="cv-link-loading">Carregando...</span>
                    ) : (
                        <span className="cv-link-text">
                            {t('header.cta.download')}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px', display: 'inline-block' }}>
                                <path d="M7 17L17 7" />
                                <path d="M7 7h10v10" />
                            </svg>
                        </span>
                    )}
                </motion.button>

                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            className="cv-toast"
                            initial={{ opacity: 0, y: 50, x: '-50%' }}
                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                            exit={{ opacity: 0, y: 20, x: '-50%' }}
                        >
                            CV aberto em nova aba!
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        );
    }

    // Default (Icon/Primary) rendering
    return (
        <>
            <motion.button
                className={`cv-btn cv-btn--${variant} ${isLoading ? 'cv-btn--loading' : ''} ${className}`}
                style={style}
                onClick={handleDownload}
                disabled={isLoading}
                aria-label={ariaLabel}
                title={t('header.cta.download')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
                {isLoading ? (
                    <SpinnerIcon />
                ) : (
                    <DownloadIcon className="cv-icon" />
                )}
            </motion.button>

            <AnimatePresence>
                {showToast && (
                    <motion.div
                        className="cv-toast"
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                    >
                        CV aberto em nova aba!
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DownloadCVButton;
