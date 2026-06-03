import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experiences } from '../constants';

const ExperienceCard = ({ exp, index, inView }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">

      {/* Timeline dot */}
      <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
          className="w-5 h-5 rounded-full border-4"
          style={{
            background:  inView ? exp.color : 'transparent',
            borderColor: exp.color,
            boxShadow:   inView ? `0 0 0 4px ${exp.color}30, 0 0 20px ${exp.color}60` : 'none',
            transition:  'all 0.5s ease',
          }}
        />
      </div>

      {/* Card */}
      <motion.div
        className={`md:col-span-1 ${isLeft ? 'md:col-start-1 md:pr-10' : 'md:col-start-2 md:pl-10'}`}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.2, duration: 0.7, ease: 'easeOut' }}
      >
        <div
          className="glass-card p-6 transition-transform duration-300 hover:scale-[1.01]"
          style={{ borderColor: `${exp.color}40` }}
        >
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl flex-shrink-0">{exp.icon}</span>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white leading-tight">{exp.role}</h3>
              <p className="text-sm font-semibold mt-0.5" style={{ color: exp.color }}>
                {exp.company}
              </p>
              <p className="text-xs text-white/40 mt-0.5">{exp.period}</p>
            </div>
          </div>

          {/* Bullets */}
          <ul className="space-y-2">
            {exp.bullets.map((bullet, bi) => (
              <li key={bi} className="flex gap-2 text-white/65 text-sm leading-relaxed">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: exp.color }}
                />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Spacer for alternating layout */}
      <div className={`hidden md:block md:col-span-1 ${isLeft ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`} />
    </div>
  );
};

const Experience = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" ref={ref} className="relative py-24" style={{ background: 'var(--bg-alt)' }}>
      <div className="section-padding">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-subheading"
        >
          What I've done
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-heading mb-16"
        >
          Work <span className="gradient-text">Experience</span>
        </motion.h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[2px] rounded-full"
            style={{
              top:        0,
              height:     '100%',
              background: 'linear-gradient(180deg, #915EFF40, #00FFFF40)',
            }}
          />
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
