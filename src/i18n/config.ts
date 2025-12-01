import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { pt } from './locales/pt';
import { en } from './locales/en';
import { es } from './locales/es';
import { de } from './locales/de';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            pt,
            en,
            es,
            de
        },
        fallbackLng: 'pt',
        interpolation: {
            escapeValue: false // react already safes from xss
        },
        detection: {
            order: ['path', 'localStorage', 'navigator'],
            lookupFromPathIndex: 0,
            caches: ['localStorage'],
        }
    });

export default i18n;
