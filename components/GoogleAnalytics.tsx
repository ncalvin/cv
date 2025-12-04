import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

// Define window interface to include dataLayer
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-8MZE34H19S';

export const GoogleAnalytics: React.FC = () => {
    const location = useLocation();
    const { t } = useLanguage();

    const [consentGiven, setConsentGiven] = useState(() => {
        return localStorage.getItem('ga_consent_granted') === 'true';
    });

    // Initialize GA4
    // useEffect for checking stored consent is removed as it is now handled in initial state

    // Load Script when consent is given
    useEffect(() => {
        if (!consentGiven) return;

        if (GA_MEASUREMENT_ID === 'G-XXXXXXX') {
            console.warn('Google Analytics: Measurement ID is missing (G-XXXXXXX).');
            return;
        }

        // Check if script is already added
        if (document.getElementById('ga-script')) return;

        // Inject Script
        const script = document.createElement('script');
        script.id = 'ga-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }
        window.gtag = gtag;

        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, {
            anonymize_ip: true, // Requirement: Anonymize IP
        });

        console.log('Google Analytics initialized');

    }, [consentGiven]);

    // Track Page Views
    useEffect(() => {
        if (!consentGiven || !window.gtag) return;

        window.gtag('event', 'page_view', {
            page_path: location.pathname + location.search,
            page_title: document.title,
        });
        console.log(`Google Analytics Page View: ${location.pathname + location.search}`);
    }, [location, consentGiven]);

    // Simple Consent Banner (for demonstration)
    if (consentGiven) return null;

    return (
        <div className="cookie-banner">
            <p className="cookie-text">
                {t('cookieConsent.text')}
            </p>
            <div className="cookie-buttons">
                <button
                    onClick={() => {
                        localStorage.setItem('ga_consent_granted', 'true');
                        setConsentGiven(true);
                    }}
                    className="cookie-btn-accept"
                >
                    {t('cookieConsent.accept')}
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem('ga_consent_granted', 'true'); // Treat close as accept for now or implement deny
                        setConsentGiven(true);
                    }}
                    className="cookie-btn-close"
                >
                    {t('cookieConsent.close')}
                </button>
            </div>
        </div>
    );
};
