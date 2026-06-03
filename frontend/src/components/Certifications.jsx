import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { certifications } from '../constants';

const Certifications = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" ref={ref} className="relative py-24" style={{ background: 'var(--bg-alt)' }}>
      <div className="section-padding">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-subheading"
        >
          Achievements
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-heading mb-16"
        >
          My <span className="gradient-text">Certifications</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="cert-card"
            >
              {/* Gold shimmer overlay */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${cert.color}18, transparent 60%, ${cert.color}10)`,
                }}
              />

              {/* Logo circle */}
              <div className="relative z-10 mb-5 flex justify-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center p-3"
                  style={{
                    background: `radial-gradient(circle, ${cert.color}25, transparent)`,
                    border:     `2px solid ${cert.color}50`,
                  }}
                >
                  <img
                    src={cert.logo}
                    alt={cert.issuer}
                    className="w-10 h-10 object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>

              {/* Text */}
              <div className="relative z-10 space-y-1 flex-1">
                <h3 className="text-sm font-bold text-white leading-snug px-1">
                  {cert.name}
                </h3>
                <p className="text-xs text-white/45">{cert.issuer}</p>
                <p className="text-xs font-semibold" style={{ color: cert.color }}>
                  📅 {cert.date}
                </p>
              </div>

              {/* View button */}
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all"
                style={{
                  background: `${cert.color}15`,
                  border:     `1px solid ${cert.color}40`,
                  color:      cert.color,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${cert.color}28`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${cert.color}15`; }}
              >
                🏆 View Certificate ↗
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
