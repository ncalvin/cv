import type { EducationItem } from '../types';
import React from 'react';
import Section from './Section';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { AcademicCapIcon } from './Icons';

const EducationBadge: React.FC<{ item: EducationItem; index: number }> = ({ item, index }) => {
    // Randomize floating animation parameters for organic feel
    const randomDuration = 3 + Math.random() * 2;
    const randomDelay = Math.random() * 2;
    const randomY = 5 + Math.random() * 10;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{
                y: [0, -randomY, 0],
            }}
            transition={{
                y: {
                    duration: randomDuration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: randomDelay,
                }
            }}
            whileHover="hover"
            variants={{
                hover: {
                    scale: 1.1,
                    y: -5,
                    boxShadow: '0 0 25px rgba(96, 165, 250, 0.6)',
                    zIndex: 10,
                    transition: { duration: 0.2 }
                }
            }}
            className="education-badge"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                borderRadius: '12px',
                cursor: 'default',
                gap: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                margin: '0.5rem'
            }}
        >
            <motion.div
                variants={{
                    hover: {
                        scale: 1.4,
                        backgroundColor: '#60A5FA',
                        color: 'white',
                        rotate: 360,
                        transition: { duration: 0.4 }
                    }
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(96, 165, 250, 0.2)',
                    color: '#60A5FA'
                }}
            >
                <AcademicCapIcon style={{ width: '12px', height: '12px' }} />
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    lineHeight: 1.2
                }}>
                    {item.degree}
                </span>
                <span style={{
                    color: 'var(--color-text-tertiary)',
                    fontSize: '0.7rem',
                    fontWeight: 500
                }}>
                    {item.institution}
                </span>
            </div>
        </motion.div>
    );
};

const Education: React.FC = () => {
    const { t } = useLanguage();

    const educationData: EducationItem[] = [
        {
            institution: 'Universidade do Sul de Santa Catarina',
            degree: t('education.unisul.degree'),
            details: t('education.unisul.details'),
            year: '2010 - 2013'
        },
        {
            institution: 'Salesforce Trailhead',
            degree: t('education.salesforce.degree'),
            details: t('education.salesforce.details'),
            year: 'Present'
        },
        {
            institution: 'LinkedIn Learning',
            degree: t('education.devops.degree'),
            details: t('education.devops.details'),
            year: '2023'
        },
        {
            institution: 'LinkedIn Learning',
            degree: t('education.docker.degree'),
            details: t('education.docker.details'),
            year: '2023'
        },
        {
            institution: 'Coursera',
            degree: t('education.product.degree'),
            details: t('education.product.details'),
            year: '2023'
        },
        {
            institution: 'Coursera',
            degree: t('education.security.degree'),
            details: t('education.security.details'),
            year: '2014'
        },
        {
            institution: 'CSSC',
            degree: t('education.sixsigma.degree'),
            details: t('education.sixsigma.details'),
            year: '2023'
        },
        {
            institution: 'Humboldt Institut',
            degree: t('education.german.degree'),
            details: t('education.german.details'),
            year: '2016'
        },
        {
            institution: 'Red Hat',
            degree: t('education.redhat.degree'),
            details: t('education.redhat.details'),
            year: 'Course'
        },
        {
            institution: '4Linux',
            degree: t('education.linux.degree'),
            details: t('education.linux.details'),
            year: 'Course'
        },
        {
            institution: 'CompTIA',
            degree: t('education.comptia.degree'),
            details: t('education.comptia.details'),
            year: 'Course'
        },
        {
            institution: 'Skillsoft',
            degree: t('education.sap.degree'),
            details: t('education.sap.details'),
            year: 'Course'
        }
    ];

    return (
        <Section id="education" title={t('education.title')}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
                marginTop: '1rem'
            }}>
                {educationData.map((item, index) => (
                    <EducationBadge key={index} item={item} index={index} />
                ))}
            </div>

            <style>{`
                .education-badge:hover {
                    background: rgba(255, 255, 255, 0.08) !important;
                    border-color: var(--color-primary) !important;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </Section>
    );
};

export default Education;