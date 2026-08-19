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
              className="cert-card h-full justify-between"
            >
              {/* Colored shimmer overlay */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${cert.color}18, transparent 60%, ${cert.color}10)`,
                }}
              />

              {/* Top part: Logo circle + Info */}
              <div className="w-full flex flex-col items-center">
                {/* Logo circle */}
                <div className="relative z-10 mb-4 flex justify-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center p-3"
                    style={{
                      background: `radial-gradient(circle, ${cert.color}25, transparent)`,
                      border:     `2px solid ${cert.color}50`,
                    }}
                  >
                    <img
                      src={cert.logo}
                      alt={`${cert.name} certification badge - ${cert.issuer}`}
                      width="32"
                      height="32"
                      loading="lazy"
                      className="w-8 h-8 object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="relative z-10 space-y-1.5 w-full text-center">
                  <h3
                    className="text-sm font-bold leading-snug px-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {cert.name}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {cert.issuer}
                  </p>
                  <p className="text-xs font-semibold pt-1" style={{ color: cert.color }}>
                    📅 {cert.date}
                  </p>
                </div>
              </div>

              {/* View button */}
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all"
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
