import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Stars from '../canvas/Stars';
import { typewriterPhrases, heroStats } from '../constants';

/* ── Typewriter Hook ─────────────────────────────────────────────── */
function useTypewriter(phrases, speed = 65, pauseMs = 1800) {
  const [text,      setText]      = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx,   setCharIdx]   = useState(0);
  const [deleting,  setDeleting]  = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timer;
    if (!deleting && charIdx < current.length) {
      timer = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }
    setText(current.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pauseMs]);

  return text;
}

/* ── Hero Section ────────────────────────────────────────────────── */
const Hero = () => {
  const typeText = useTypewriter(typewriterPhrases);

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.18 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--bg-main)' }}
    >
      {/* Three.js canvas */}
      <div className="hero-canvas-wrapper">
        <Stars />
      </div>

      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(145,94,255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Foreground */}
      <div className="relative z-10 w-full section-padding flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium"
              style={{
                background: 'rgba(145,94,255,0.12)',
                border:     '1px solid rgba(145,94,255,0.35)',
                color:      'var(--text-primary)',
              }}
            >
              👋 Hi, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="section-heading gradient-text"
            style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}
          >
            Umar Farid
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={itemVariants} className="h-10 flex items-center">
            <span className="text-xl md:text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              {typeText}
              <span className="animate-pulse text-[#915EFF]">|</span>
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Building scalable web apps with{' '}
            <strong style={{ color: 'var(--text-primary)' }}>ASP.NET Core</strong>,{' '}
            <strong style={{ color: 'var(--text-primary)' }}>React.js</strong> &amp;{' '}
            <strong style={{ color: 'var(--text-primary)' }}>Node.js</strong> — COMSATS University, Sahiwal
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center mt-2">
            <a
              href="mailto:umarfarid034@gmail.com"
              className="btn-primary"
            >
              📬 Hire Me
            </a>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              🚀 View Projects
            </button>
          </motion.div>

          {/* Stat Pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center mt-4">
            {heroStats.map((stat) => (
              <div key={stat.label} className="glass-card px-6 py-3 flex items-center gap-3">
                <span className="text-2xl font-black gradient-text">
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Scroll</span>
          <div
            className="w-[1px] h-10"
            style={{ background: 'linear-gradient(180deg, #915EFF, transparent)' }}
          />
          <span className="text-[#915EFF] text-xl">↓</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
