import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollGuide: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map scroll progress to percentage string for positioning the icon
    const yRange = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: '40px', // Moved further right (was 20px)
                bottom: 0,
                width: '2px',
                zIndex: 90,
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
            className="hidden md:flex"
        >
            {/* Track Line */}
            <div
                style={{
                    position: 'absolute',
                    top: '10vh',
                    bottom: '10vh',
                    width: '1px',
                    backgroundColor: 'var(--color-border)',
                    opacity: 0.3,
                }}
            />

            {/* Active Progress Line */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '10vh',
                    left: 0,
                    right: 0,
                    width: '2px',
                    height: '80vh', // Matches track height
                    backgroundColor: 'var(--color-primary)',
                    transformOrigin: 'top',
                    scaleY: scaleY,
                    boxShadow: '0 0 10px var(--color-primary)',
                }}
            />

            {/* Innovative Navigation Icon (The "Head") */}
            <div style={{ position: 'absolute', top: '10vh', height: '80vh', width: '20px', display: 'flex', flexDirection: 'column' }}>
                <motion.div
                    style={{
                        position: 'absolute',
                        top: yRange,
                        left: '50%',
                        x: '-50%',
                        y: '-50%', // Center on the tip
                        width: '12px',
                        height: '12px',
                        backgroundColor: 'var(--color-bg-primary)',
                        border: '2px solid var(--color-primary)',
                        rotate: 45, // Diamond shape
                        boxShadow: '0 0 15px var(--color-primary)',
                        zIndex: 10,
                    }}
                    animate={{
                        rotate: [45, 225], // Subtle rotation animation
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        inset: '2px',
                        backgroundColor: 'var(--color-primary)',
                        opacity: 0.5,
                    }} />
                </motion.div>
            </div>
        </div>
    );
};

export default ScrollGuide;
