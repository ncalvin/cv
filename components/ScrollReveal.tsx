import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, MotionProps } from 'framer-motion';

interface ScrollRevealProps extends MotionProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
}

export const ScrollReveal = ({ children, width = 'fit-content', delay = 0, ...props }: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div ref={ref} style={{ position: 'relative', width }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.6, delay: delay, ease: "easeInOut" }}
                {...props}
            >
                {children}
            </motion.div>
        </div>
    );
};

export const ParallaxText = ({ children, baseVelocity = 100 }: { children: string; baseVelocity?: number }) => {
    // Implementation for parallax text if needed
    return <div>{children}</div>;
};
