import React from 'react';
import Section from './Section';
import { LinkedinIcon, GithubIcon, MailIcon } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@ncalvin.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setErrorMessage(t('contact.error.generic'));
      }
    } catch (error) {
      setErrorMessage(t('contact.error.connection'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact-section" title={t('contact.title')}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }} className="animate-on-scroll">
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-xl)'
          }}>
            {t('contact.description')}
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
              href="mailto:info@ncalvin.dev"
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
              href="https://github.com/ncalvin"
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
              aria-label="GitHub"
            >
              <GithubIcon style={{ width: '1.5rem', height: '1.5rem' }} />
            </a>
          </div>
        </div>

        {/* Contact Form - Minimalist */}
        <div className="animate-on-scroll">
          {isSuccess ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>{t('contact.success.title')}</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>{t('contact.success.message')}</p>
              <button
                onClick={() => setIsSuccess(false)}
                style={{
                  marginTop: '1.5rem',
                  padding: '0.5rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: '#10b981',
                  border: '1px solid #10b981',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                {t('contact.success.button')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <input type="hidden" name="_subject" value="Novo contato via Portfolio" />
              <input type="hidden" name="_captcha" value="false" />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="name" className="sr-only">{t('contact.form.name')}</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder={t('contact.form.name.placeholder')}
                    required
                    disabled={isSubmitting}
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
                      borderRadius: 0,
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t('contact.form.email.placeholder')}
                    required
                    disabled={isSubmitting}
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
                      borderRadius: 0,
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="sr-only">{t('contact.form.message')}</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder={t('contact.form.message.placeholder')}
                  required
                  disabled={isSubmitting}
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
                    borderRadius: 0,
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                />
              </div>

              {errorMessage && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center' }}>{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  alignSelf: 'center', // Centered button
                  padding: '0.75rem 2rem',
                  backgroundColor: isSubmitting ? 'var(--color-border)' : 'transparent',
                  color: isSubmitting ? 'var(--color-text-secondary)' : 'var(--color-primary)',
                  border: `1px solid ${isSubmitting ? 'var(--color-border)' : 'var(--color-primary)'}`,
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-primary)';
                  }
                }}
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Contact;