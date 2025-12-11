import React from 'react';
import { ScrollReveal } from './ScrollReveal';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Section: React.FC<SectionProps> = ({ id, title, children, style }) => {
  return (
    <section id={id} className="section" style={{ position: 'relative', ...style }}>
      <div className="container">
        {title && (
          <ScrollReveal width="100%">
            <h2 className="section-title">
              {title}
            </h2>
          </ScrollReveal>
        )}
        <ScrollReveal width="100%" delay={0.2}>
          {children}
        </ScrollReveal>
      </div>

      {/* Subtle Scroll Hint */}
      <div
        className="scroll-hint"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.6, // Increased opacity
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
          filter: 'drop-shadow(0 0 8px var(--color-primary))' // Added glow effect
        }}
      >
        <div style={{
          width: '2px', // Slightly thicker line
          height: '24px', // Slightly longer
          background: 'linear-gradient(to bottom, var(--color-primary), transparent)', // Changed to primary color
          marginBottom: '0.5rem',
          borderRadius: '2px'
        }} />
        <svg
          width="20" // Slightly larger icon
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5" // Thicker stroke
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--color-primary)' }} // Changed to primary color
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
        <style>{`
          @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0); opacity: 0.6; }
            50% { transform: translateY(8px); opacity: 1; }
          }
          .scroll-hint svg {
            animation: bounce-subtle 2s infinite ease-in-out;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Section;