
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--color-bg-secondary)',
      borderTop: '1px solid var(--color-border)',
      marginTop: 0, // Removed margin to rely on previous section's padding
      transition: 'all var(--transition-base)'
    }}>
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'var(--spacing-2xl) var(--spacing-xl)',
        textAlign: 'center'
      }}>
        <p style={{
          color: 'var(--color-text-tertiary)',
          fontSize: '0.875rem',
          margin: 0
        }}>
          &copy; {new Date().getFullYear()} <strong style={{ color: 'var(--color-text-secondary)' }}>Newton Calvin</strong>.
          Todos os direitos reservados.
        </p>
        <p style={{
          color: 'var(--color-text-tertiary)',
          fontSize: '0.75rem',
          marginTop: 'var(--spacing-sm)'
        }}>
          Feito com ❤️ e tecnologia moderna
        </p>
      </div>
    </footer>
  );
};

export default Footer;