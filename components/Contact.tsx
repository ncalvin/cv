import React from 'react';
import Section from './Section';
import { LinkedinIcon, GithubIcon, MailIcon } from './Icons';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Obrigado pelo seu contato! Esta é uma demonstração; o formulário não está ativo.");
  };

  return (
    <Section id="contact" title="Vamos Conversar?">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }} className="animate-on-scroll">
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-xl)'
          }}>
            Tem alguma pergunta ou quer trabalhar junto? Entre em contato!
          </p>

          {/* Social Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://www.linkedin.com/in/newtoncalvin"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              aria-label="LinkedIn"
            >
              <LinkedinIcon style={{ width: '1.5rem', height: '1.5rem' }} />
            </a>
            <a
              href="mailto:newton.calvin@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              aria-label="Email"
            >
              <MailIcon style={{ width: '1.5rem', height: '1.5rem' }} />
            </a>
            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              aria-label="GitHub"
            >
              <GithubIcon style={{ width: '1.5rem', height: '1.5rem' }} />
            </a>
          </div>
        </div>

        {/* Contact Form - Minimalist */}
        <div className="animate-on-scroll">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label htmlFor="name" className="sr-only">Nome</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Seu Nome"
                  required
                  style={{
                    width: '100%',
                    padding: '0 0 0.75rem 0',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--color-border)',
                    fontSize: '1rem',
                    color: 'var(--color-text-primary)',
                    transition: 'border-color 0.2s ease',
                    outline: 'none',
                    borderRadius: 0
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Seu Email"
                  required
                  style={{
                    width: '100%',
                    padding: '0 0 0.75rem 0',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--color-border)',
                    fontSize: '1rem',
                    color: 'var(--color-text-primary)',
                    transition: 'border-color 0.2s ease',
                    outline: 'none',
                    borderRadius: 0
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Mensagem</label>
              <textarea
                name="message"
                id="message"
                rows={4}
                placeholder="Sua Mensagem"
                required
                style={{
                  width: '100%',
                  padding: '0 0 0.75rem 0',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--color-border)',
                  fontSize: '1rem',
                  color: 'var(--color-text-primary)',
                  transition: 'border-color 0.2s ease',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  borderRadius: 0
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
              />
            </div>
            <button
              type="submit"
              style={{
                alignSelf: 'center', // Centered button
                padding: '0.75rem 2rem',
                backgroundColor: 'transparent',
                color: 'var(--color-primary)',
                border: '1px solid var(--color-primary)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginTop: '1rem'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Contact;