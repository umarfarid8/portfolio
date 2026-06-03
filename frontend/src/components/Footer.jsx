import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const year = new Date().getFullYear();

  const socials = [
    {
      label: 'GitHub',
      icon:  '🐙',
      href:  'https://github.com/umarfaridse',
    },
    {
      label: 'LinkedIn',
      icon:  '💼',
      href:  'https://linkedin.com/in/umar-farid-dev',
    },
    {
      label: 'Email',
      icon:  '📧',
      href:  'mailto:umarfarid034@gmail.com',
    },
    {
      label: 'Phone',
      icon:  '📱',
      href:  'tel:+923027836793',
    },
  ];

  return (
    <footer
      className="relative py-12 border-t"
      style={{ borderColor: 'rgba(145,94,255,0.15)', background: 'var(--bg-main)' }}
    >
      <div className="section-padding py-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-1"
          >
            <span className="text-2xl font-black gradient-text">UF</span>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Designed &amp; Built by{' '}
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>Umar Farid</span>
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Software Engineer · .NET Developer · Sahiwal, Pakistan</p>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-3 justify-center"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all"
                style={{ border: '1px solid rgba(145,94,255,0.2)', color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(145,94,255,0.5)';
                  e.currentTarget.style.background  = 'rgba(145,94,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(145,94,255,0.2)';
                  e.currentTarget.style.background  = 'transparent';
                }}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </motion.div>

          {/* Year */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-center" style={{ color: 'var(--text-muted)' }}
          >
            © {year} Umar Farid. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
