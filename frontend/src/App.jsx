import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import About          from './components/About';
import Skills         from './components/Skills';
import Experience     from './components/Experience';
import Projects       from './components/Projects';
import Certifications from './components/Certifications';
import Contact        from './components/Contact';
import Footer         from './components/Footer';

// ── Theme Context ──────────────────────────────────────────────────────────────
export const ThemeContext = createContext({ isDark: true, toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

// ── Simple Instant Cursor ──────────────────────────────────────────────────────
const CustomCursor = () => {
  const dotRef = useRef(null);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e) => {
      // Use transform for instant GPU-accelerated positioning — zero lag
      dot.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
    };

    const onDown = () => dot.classList.add('clicking');
    const onUp   = () => dot.classList.remove('clicking');

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" style={{ transform: 'translate(-100px,-100px)' }} />;
};

// ── Page Load Overlay ──────────────────────────────────────────────────────────
const LoaderOverlay = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="loader-overlay">
      <style>{`
        @keyframes loaderFadeOut { from{opacity:1} to{opacity:0;pointer-events:none} }
        @keyframes loadBar { from{width:0%} to{width:100%} }
        .loader-anim { animation: loaderFadeOut 0.5s ease 1s forwards; }
        .bar-anim    { height:100%; animation: loadBar 1.1s ease-out forwards;
                       background: linear-gradient(90deg,#915EFF,#00FFFF); }
      `}</style>
      <div className="loader-anim flex flex-col items-center gap-4">
        <span className="text-4xl font-black gradient-text tracking-tight select-none">UF</span>
        <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ background:'rgba(145,94,255,0.2)' }}>
          <div className="bar-anim" />
        </div>
      </div>
    </div>
  );
};

// ── App ────────────────────────────────────────────────────────────────────────
function App() {
  const [loaded,  setLoaded]  = useState(false);

  // Persist theme in localStorage
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('uf-theme');
    return saved ? saved === 'dark' : true;
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('uf-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Apply class to <html> for CSS variable switching
  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {!loaded && <LoaderOverlay onDone={() => setLoaded(true)} />}

      <CustomCursor />

      <div className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme={isDark ? 'dark' : 'light'}
      />
    </ThemeContext.Provider>
  );
}

export default App;
