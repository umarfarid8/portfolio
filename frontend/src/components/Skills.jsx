import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { skillCategories } from '../constants';

const Skills = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    const containerVar = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
    };
    const cardVar = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <section
            id="skills"
            ref={ref}
            className="relative py-24"
            style={{ background: 'var(--bg-main)' }}
        >
            <div className="section-padding">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="section-subheading"
                >
                    What I know
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="section-heading mb-16"
                >
                    Technologies I{' '}
                    <span className="gradient-text">Work With</span>
                </motion.h2>

                <div className="space-y-12">
                    {skillCategories.map((cat, catIdx) => (
                        <div key={cat.category}>
                            {/* Category label */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                                className="flex items-center gap-3 mb-6"
                            >
                                <div
                                    className="h-[2px] w-8 rounded-full"
                                    style={{ background: cat.color }}
                                />
                                <span
                                    className="text-sm font-semibold uppercase tracking-widest"
                                    style={{ color: cat.color }}
                                >
                                    {cat.category}
                                </span>
                            </motion.div>

                            {/* Skill cards */}
                            <motion.div
                                variants={containerVar}
                                initial="hidden"
                                animate={inView ? 'visible' : 'hidden'}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                            >
                                {cat.skills.map((skill) => (
                                    <motion.div key={skill.name} variants={cardVar}>
                                        <Tilt
                                            tiltMaxAngleX={15}
                                            tiltMaxAngleY={15}
                                            glareEnable={true}
                                            glareMaxOpacity={0.08}
                                            glareColor={cat.color}
                                            glarePosition="all"
                                            className="skill-card"
                                        >
                                            <img
                                                src={skill.icon}
                                                alt={`${skill.name} technology icon`}
                                                width="48"
                                                height="48"
                                                loading="lazy"
                                                className="w-12 h-12 object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                            <span
                                                className="text-xs font-semibold text-center leading-tight"
                                                style={{ color: 'var(--text-secondary)' }}
                                            >
                                                {skill.name}
                                            </span>
                                        </Tilt>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
