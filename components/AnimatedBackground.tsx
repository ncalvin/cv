import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
    orbCount?: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ orbCount = 6 }) => {
    // Generate random orb configurations
    const orbs = useMemo(() => {
        return Array.from({ length: orbCount }, (_, i) => ({
            id: i,
            size: Math.random() * 300 + 200, // 200-500px
            initialX: Math.random() * 100, // 0-100%
            initialY: Math.random() * 100, // 0-100%
            duration: Math.random() * 20 + 20, // 20-40s
            delay: Math.random() * 5, // 0-5s
            color: i % 3 === 0
                ? 'rgba(110, 168, 255, 0.15)' // Electric Blue
                : i % 3 === 1
                    ? 'rgba(147, 112, 219, 0.12)' // Purple
                    : 'rgba(79, 195, 247, 0.13)', // Light Blue
        }));
    }, [orbCount]);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'hidden',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            {/* Animated Gradient Background */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)',
                    animation: 'gradientShift 15s ease-in-out infinite',
                }}
            />

            {/* Floating Orbs */}
            {orbs.map((orb) => (
                <motion.div
                    key={orb.id}
                    style={{
                        position: 'absolute',
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                        borderRadius: '50%',
                        background: orb.color,
                        filter: 'blur(60px)',
                        willChange: 'transform',
                    }}
                    initial={{
                        x: `${orb.initialX}vw`,
                        y: `${orb.initialY}vh`,
                    }}
                    animate={{
                        x: [
                            `${orb.initialX}vw`,
                            `${(orb.initialX + 20) % 100}vw`,
                            `${(orb.initialX - 10) % 100}vw`,
                            `${orb.initialX}vw`,
                        ],
                        y: [
                            `${orb.initialY}vh`,
                            `${(orb.initialY - 15) % 100}vh`,
                            `${(orb.initialY + 10) % 100}vh`,
                            `${orb.initialY}vh`,
                        ],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: orb.duration,
                        delay: orb.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* CSS Keyframes for gradient animation */}
            <style>
                {`
          @keyframes gradientShift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
            </style>
        </div>
    );
};

export default AnimatedBackground;
