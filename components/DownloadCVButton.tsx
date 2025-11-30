import React, { useState } from 'react';
import './DownloadCVButton.css';

// Icons
const DownloadIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
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
    variant?: 'primary' | 'icon' | 'fab';
    label?: string;
    fileName?: string;
    fileUrl?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const DownloadCVButton: React.FC<DownloadCVButtonProps> = ({
    variant = 'primary',
    label = 'Baixar CV',
    fileName = 'Newton_Calvin_Tech_Lead_2025.pdf',
    fileUrl = '/cv.html',
    className = '',
    style,
    onClick
}) => {
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

        // Simulate preparation delay for UX
        setTimeout(() => {
            setIsLoading(false);
            setShowToast(true);

            // Open CV
            window.open(fileUrl, '_blank');

            // Hide toast after 3s
            setTimeout(() => setShowToast(false), 3000);

            if (onClick) onClick();
        }, 800);
    };

    // Determine classes
    const baseClass = 'cv-btn';
    const variantClass = `cv-btn--${variant}`;
    const loadingClass = isLoading ? 'cv-btn--loading' : '';

    // Determine Aria Label
    const ariaLabel = isLoading
        ? 'Preparando download do currículo...'
        : `Baixar currículo de Newton Calvin em PDF (${fileName})`;

    return (
        <>
            <button
                className={`${baseClass} ${variantClass} ${loadingClass} ${className}`}
                style={style}
                onClick={handleDownload}
                disabled={isLoading}
                aria-label={ariaLabel}
                aria-busy={isLoading}
                title={label}
                type="button"
            >
                {isLoading ? (
                    <SpinnerIcon />
                ) : (
                    <DownloadIcon className={variant === 'icon' ? '' : 'cv-icon-margin'} />
                )}

                {variant !== 'icon' && variant !== 'fab' && (
                    <span>{isLoading ? 'Preparando...' : label}</span>
                )}
            </button>

            {/* Toast Notification */}
            <div className={`cv-toast ${showToast ? 'cv-toast--visible' : ''}`} role="status" aria-live="polite">
                CV aberto em nova aba!
            </div>
        </>
    );
};

export default DownloadCVButton;
