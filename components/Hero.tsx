import React from 'react';
import Section from './Section';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import AnimatedBackground from './AnimatedBackground';

const Hero: React.FC = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 100]);
    const y2 = useTransform(scrollY, [0, 300], [0, -50]);

    return (
        <Section id="about" title="" style={{ position: 'relative', padding: '3px 0 8rem', textAlign: 'center', overflow: 'hidden' }}>
            {/* Animated Background */}
            <AnimatedBackground orbCount={6} />

            {/* Content with higher z-index */}
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
                <motion.div style={{ y: y1 }}>
                    <ScrollReveal delay={0.2}>
                        <div style={{
                            textAlign: 'left',
                            color: 'var(--color-text-secondary)',
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}>
                            <p>
                                Com mais de 10 anos de experiência em Fintech, Cloud e transformação digital, lidero equipes e programas na Getnet para conceber e operacionalizar plataformas de pagamento seguras e escaláveis. Como Tech Lead, orquestro arquitetura, processos e times multidisciplinares, acelerando entregas e garantindo excelência operacional; minha stack inclui Salesforce para integrações e orquestração de negócios, além de desenvolvimento em Node.js e Python. Ao avançar de especialista técnico a líder, concentrei-me em entregar produtos centrados no usuário que reduzem riscos, encurtam o time-to-market e sustentam crescimento. Sou movido por desafios complexos e por transformar requisitos difíceis em soluções elegantes e duráveis.
                            </p>
                        </div>
                    </ScrollReveal>
                </motion.div>
            </div>
        </Section>
    );
};

export default Hero;
