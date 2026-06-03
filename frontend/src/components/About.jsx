import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Cube from '../canvas/Cube';
import { bio, education } from '../constants';

const About = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const fadeUp = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section id="about" ref={ref} className="relative py-24" style={{ background: 'var(--bg-main)' }}>
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(145,94,255,0.06) 0%, transparent 70%)',
          filter:     'blur(40px)',
        }}
      />

      <div className="section-padding">
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-subheading"
        >
          Introduction
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="section-heading mb-16"
        >
          About <span className="gradient-text">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

          {/* ── 3D Cube (40%) ── */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            <div
              className="relative w-full max-w-sm rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(145,94,255,0.05)',
                border:     '1px solid rgba(145,94,255,0.2)',
              }}
            >
              <Cube />
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-medium text-white/60 whitespace-nowrap"
                style={{
                  background:     'rgba(5,8,22,0.8)',
                  backdropFilter: 'blur(10px)',
                  border:         '1px solid rgba(145,94,255,0.3)',
                }}
              >
                Hover to spin faster ✨
              </div>
            </div>
          </motion.div>

          {/* ── Bio & Education (60%) ── */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-6"
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.3 }}
          >
            {/* Objective paragraph */}
            <p style={{ color: 'var(--text-secondary)' }} className="leading-relaxed text-[1rem]">{bio}</p>

            {/* Education card */}
            <div
              className="glass-card p-5"
              style={{ borderColor: 'rgba(0,255,255,0.2)' }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎓</span>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-[#00FFFF] uppercase tracking-widest font-semibold">Education</p>
                  <h4 className="text-white font-bold text-base">{education.degree}</h4>
                  <p className="text-white/60 text-sm">{education.university}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <span className="text-xs text-white/40">{education.period}</span>
                    <span className="text-xs font-bold text-[#915EFF]">CGPA: {education.cgpa}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {education.coursework.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] px-2 py-0.5 rounded-full text-white/50"
                        style={{ background: 'rgba(145,94,255,0.1)', border: '1px solid rgba(145,94,255,0.2)' }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: '3.31/4.0', label: 'CGPA',            icon: '🎓', color: '#915EFF' },
                { value: '4',        label: 'Certifications',   icon: '🏆', color: '#FFD700' },
                { value: '✅',       label: 'Open to Work',     icon: '🟢', color: '#00FFFF' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="glass-card p-5 text-center"
                  whileHover={{ scale: 1.03 }}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <div className="text-3xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-black mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-xs font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
