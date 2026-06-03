import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../constants';
import { useTheme } from '../App';

const Navbar = () => {
  const [scrolled,       setScrolled]       = useState(false);
  const [activeSection,  setActiveSection]  = useState('');
  const [menuOpen,       setMenuOpen]       = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // Apply glass on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via Intersection Observer
  useEffect(() => {
    const observers = navLinks.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // Close menu on resize past mobile
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background:     'var(--bg-navbar)',
        backdropFilter: 'blur(22px)',
        borderBottom:   '1px solid var(--border-navbar)',
      } : {}}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <nav className="flex items-center justify-between" style={{ height: 68 }}>

          {/* ── Logo ── */}
          <motion.button
            className="text-2xl font-black gradient-text select-none"
            style={{ letterSpacing: '-1px', border: 'none', background: 'none' }}
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Go to top"
          >
            UF
          </motion.button>

          {/* ── Desktop Links ── */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="text-sm font-medium transition-all duration-200 relative"
                  style={{
                    color:      activeSection === link.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: 'none',
                    border:     'none',
                  }}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: 'linear-gradient(90deg, #915EFF, #00FFFF)' }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-3">

            {/* Dark / Light toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Toggle theme"
              className="flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width:      40,
                height:     40,
                background: isDark ? 'rgba(145,94,255,0.12)' : 'rgba(255,200,50,0.15)',
                border:     isDark ? '1px solid rgba(145,94,255,0.35)' : '1px solid rgba(255,180,0,0.40)',
                fontSize:   18,
              }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>

            {/* CV button — hidden on very small screens */}
            <a
              href="mailto:umarfarid034@gmail.com"
              className="btn-primary hidden sm:inline-flex"
              style={{ padding: '9px 18px', fontSize: '0.82rem', borderRadius: 8 }}
            >
              Hire Me
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-1.5"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-5 h-[2px] rounded transition-all duration-300"
                  style={{
                    background: 'var(--text-primary)',
                    transform:
                      menuOpen
                        ? i === 0 ? 'translateY(7px) rotate(45deg)'
                        : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                        : 'scaleX(0)'
                        : 'none',
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mobile Slide-in Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              className="fixed top-0 right-0 h-full z-50 flex flex-col p-7 gap-5"
              style={{
                width:          'min(280px, 85vw)',
                background:     'var(--bg-navbar)',
                backdropFilter: 'blur(30px)',
                borderLeft:     '1px solid var(--border-card)',
              }}
            >
              {/* Close */}
              <button
                onClick={() => setMenuOpen(false)}
                className="self-end text-xl font-bold transition-colors"
                style={{ color: 'var(--text-muted)', border: 'none', background: 'none' }}
                aria-label="Close menu"
              >
                ✕
              </button>

              {/* Logo in drawer */}
              <div className="text-xl font-black gradient-text mb-2">Umar Farid</div>

              {/* Links */}
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-base font-medium transition-colors py-1"
                  style={{
                    color:      activeSection === link.id ? 'var(--accent)' : 'var(--text-secondary)',
                    border:     'none',
                    background: 'none',
                  }}
                >
                  {activeSection === link.id ? '▸ ' : ''}{link.label}
                </motion.button>
              ))}

              <div className="mt-auto flex flex-col gap-3">
                {/* Theme toggle in drawer */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-sm font-medium py-2 px-4 rounded-lg transition-all"
                  style={{
                    background: isDark ? 'rgba(145,94,255,0.1)' : 'rgba(255,200,50,0.12)',
                    border:     isDark ? '1px solid rgba(145,94,255,0.3)' : '1px solid rgba(255,180,0,0.35)',
                    color:      'var(--text-secondary)',
                  }}
                >
                  {isDark ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
                </button>

                <a
                  href="mailto:umarfarid034@gmail.com"
                  className="btn-primary text-center justify-center text-sm"
                >
                  📬 Hire Me
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
