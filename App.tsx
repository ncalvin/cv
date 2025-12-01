import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Courses from './components/Courses';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollGuide from './components/ScrollGuide';
import SEO from './components/SEO';
import './src/i18n/config';

// Wrapper to handle language based on route
const RouteHandler: React.FC<{ lang: 'pt' | 'en' | 'es' | 'de' }> = ({ lang }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [lang]); // Re-run when language changes to ensure new content is observed

  return (
    <div style={{ minHeight: '100vh' }}>
      <SEO />
      <ScrollGuide />
      <Navbar />
      <main className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Header />
        <About />
        <Experience />
        <Skills />
        <Courses />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RouteHandler lang="pt" />} />
      <Route path="/en" element={<RouteHandler lang="en" />} />
      <Route path="/es" element={<RouteHandler lang="es" />} />
      <Route path="/de" element={<RouteHandler lang="de" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;