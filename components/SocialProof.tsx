import React from 'react';

const SocialProof: React.FC = () => {
    const companies = [
        { name: 'Salesforce', logo: '☁️' },
        { name: 'Fintech', logo: '💳' },
        { name: 'Cloud Services', logo: '🌐' },
        { name: 'Enterprise', logo: '🏢' },
    ];

    const certifications = [
        { name: 'AWS Certified', icon: '☁️', color: '#FF9900' },
        { name: 'Salesforce Expert', icon: '⚡', color: '#00A1E0' },
        { name: 'Scrum Master', icon: '🎯', color: '#6EA8FF' },
        { name: 'Tech Lead', icon: '👨‍💻', color: '#4E7BFF' },
    ];

    return (
        <section style={styles.section} className="animate-on-scroll">
            <div className="container">
                {/* Trusted By */}
                <div style={styles.trustedSection}>
                    <h3 style={styles.sectionTitle}>
                        <span style={styles.titleIcon}>🏆</span>
                        Confiado por Empresas Líderes
                    </h3>
                    <div style={styles.companiesGrid}>
                        {companies.map((company, index) => (
                            <div
                                key={index}
                                style={styles.companyCard}
                                className="animate-on-scroll"
                            >
                                <span style={styles.companyLogo}>{company.logo}</span>
                                <span style={styles.companyName}>{company.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certifications */}
                <div style={styles.certificationsSection}>
                    <h3 style={styles.sectionTitle}>
                        <span style={styles.titleIcon}>🎓</span>
                        Certificações & Especialidades
                    </h3>
                    <div style={styles.badgesGrid}>
                        {certifications.map((cert, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.certBadge,
                                    borderColor: cert.color,
                                    boxShadow: `0 4px 12px ${cert.color}20`,
                                }}
                                className="animate-on-scroll"
                            >
                                <span style={{ ...styles.certIcon, color: cert.color }}>
                                    {cert.icon}
                                </span>
                                <span style={styles.certName}>{cert.name}</span>
                                <div
                                    style={{ ...styles.certGlow, backgroundColor: cert.color }}
                                    aria-hidden="true"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Bar */}
                <div style={styles.statsBar} className="animate-on-scroll">
                    <div style={styles.statBadge}>
                        <span style={styles.statIcon}>⭐</span>
                        <div>
                            <div style={styles.statValue}>100%</div>
                            <div style={styles.statLabel}>Taxa de Sucesso</div>
                        </div>
                    </div>
                    <div style={styles.statDivider} />
                    <div style={styles.statBadge}>
                        <span style={styles.statIcon}>🚀</span>
                        <div>
                            <div style={styles.statValue}>50+</div>
                            <div style={styles.statLabel}>Projetos Entregues</div>
                        </div>
                    </div>
                    <div style={styles.statDivider} />
                    <div style={styles.statBadge}>
                        <span style={styles.statIcon}>👥</span>
                        <div>
                            <div style={styles.statValue}>15+</div>
                            <div style={styles.statLabel}>Equipes Lideradas</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    section: {
        padding: '4rem 0',
        background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
    },
    trustedSection: {
        marginBottom: '3rem',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
    },
    titleIcon: {
        fontSize: '1.5rem',
        lineHeight: 1,
    },
    companiesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1.5rem',
        maxWidth: '800px',
        margin: '0 auto',
    },
    companyCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1.5rem 1rem',
        background: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        transition: 'all var(--transition-base)',
        cursor: 'default',
    },
    companyLogo: {
        fontSize: '2.5rem',
        lineHeight: 1,
        filter: 'grayscale(0.3)',
        transition: 'all var(--transition-base)',
    },
    companyName: {
        fontSize: '0.875rem',
        fontWeight: 600,
        color: 'var(--color-text-secondary)',
    },
    certificationsSection: {
        marginBottom: '3rem',
        textAlign: 'center',
    },
    badgesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.5rem',
        maxWidth: '900px',
        margin: '0 auto',
    },
    certBadge: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1.75rem 1.25rem',
        background: 'var(--color-bg-primary)',
        border: '2px solid',
        borderRadius: 'var(--radius-lg)',
        transition: 'all var(--transition-base)',
        cursor: 'default',
        overflow: 'hidden',
    },
    certIcon: {
        fontSize: '2.5rem',
        lineHeight: 1,
        zIndex: 1,
    },
    certName: {
        fontSize: '0.9375rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        zIndex: 1,
    },
    certGlow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '4px',
        opacity: 0.6,
    },
    statsBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(110, 168, 255, 0.05) 0%, rgba(78, 123, 255, 0.05) 100%)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(110, 168, 255, 0.2)',
        flexWrap: 'wrap',
    },
    statBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    statIcon: {
        fontSize: '2rem',
        lineHeight: 1,
    },
    statValue: {
        fontSize: '1.75rem',
        fontWeight: 800,
        color: 'var(--color-primary)',
        lineHeight: 1,
        marginBottom: '0.25rem',
    },
    statLabel: {
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: 'var(--color-text-secondary)',
        whiteSpace: 'nowrap',
    },
    statDivider: {
        width: '1px',
        height: '3rem',
        background: 'var(--color-border)',
    },
};

export default SocialProof;
