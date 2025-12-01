import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    title?: string;
    description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const siteTitle = t('seo.defaultTitle');
    const defaultDescription = t('seo.defaultDescription');

    return (
        <Helmet>
            <html lang={currentLang} />
            <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />

            {/* Hreflang Tags */}
            <link rel="alternate" hreflang="pt" href="https://ncalvin.dev/" />
            <link rel="alternate" hreflang="en" href="https://ncalvin.dev/en" />
            <link rel="alternate" hreflang="es" href="https://ncalvin.dev/es" />
            <link rel="alternate" hreflang="de" href="https://ncalvin.dev/de" />
            <link rel="alternate" hreflang="x-default" href="https://ncalvin.dev/" />
        </Helmet>
    );
};

export default SEO;
