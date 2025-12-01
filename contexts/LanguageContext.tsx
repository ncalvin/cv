import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import '../src/i18n/config'; // Import i18n config to ensure it initializes

type Language = 'pt' | 'en' | 'es' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();

  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{
      language: i18n.language as Language,
      setLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
