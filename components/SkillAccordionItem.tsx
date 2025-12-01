import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkillCard } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SkillAccordionItemProps {
    skill: SkillCard;
    isOpen: boolean;
    onClick: () => void;
    index: number;
}

const SkillAccordionItem: React.FC<SkillAccordionItemProps> = ({ skill, isOpen, onClick, index }) => {
    const { t } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`border-b border-border transition-colors duration-300 ${isOpen ? 'bg-bg-secondary/30' : 'hover:bg-bg-secondary/10'}`}
        >
            {/* Header / Trigger */}
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-6 px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-expanded={isOpen}
                aria-controls={`skill-content-${index}`}
            >
                <div className="flex items-center gap-4">
                    <span className="text-primary font-mono text-sm opacity-50">
                        {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-text-primary'}`}>
                        {skill.name}
                    </h3>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2">
                        <div className="h-1.5 w-24 bg-bg-tertiary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-1000 ease-out"
                                style={{ width: `${skill.level}%` }}
                            />
                        </div>
                        <span className="text-xs font-mono text-text-tertiary">{skill.level}%</span>
                    </div>

                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`text-text-secondary ${isOpen ? 'text-primary' : ''}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </motion.div>
                </div>
            </button>

            {/* Collapsible Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id={`skill-content-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-8 pt-2 md:pl-12">
                            <div className="max-w-4xl">
                                {skill.tagline && (
                                    <p className="text-lg text-text-secondary italic mb-4 font-medium">
                                        {skill.tagline}
                                    </p>
                                )}

                                <p className="text-text-primary leading-relaxed mb-8 text-base md:text-lg">
                                    {skill.description}
                                </p>

                                {/* Impact Grid */}
                                {skill.results && skill.results.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                        {skill.results.map((result, i) => (
                                            <div key={i} className="bg-bg-tertiary/30 p-4 rounded-lg border border-border/50">
                                                <div className="flex items-start gap-2">
                                                    <div className="mt-1 text-accent-green">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm font-medium text-text-secondary">{result}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Chips */}
                                {skill.chips && skill.chips.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {skill.chips.map((chip, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 rounded-full text-xs font-medium bg-bg-tertiary text-text-tertiary border border-border hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                                            >
                                                {chip}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SkillAccordionItem;
