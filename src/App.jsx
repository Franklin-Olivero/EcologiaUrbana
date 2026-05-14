import { useState, useEffect, useRef } from 'react';
import './styles/index.css';
import './styles/animations.css';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import ConceptsSection from './components/ConceptsSection';
import GovernanceSection from './components/GovernanceSection';
import CitizenScience from './components/CitizenScience';
import Minigame from './components/Minigame';
import FinalSection from './components/FinalSection';

/* ---- Particles background ---- */
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * 20,
    opacity: 0.05 + Math.random() * 0.12,
  }));

  return (
    <div className="bg-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ---- Custom cursor ---- */
function CustomCursor() {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const onMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };

    const onOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList?.contains('waste-item') ||
        target.classList?.contains('nav-link')
      ) {
        setHovering(true);
      }
    };

    const onOut = () => setHovering(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor ${hovering ? 'hovering' : ''}`} />
      <div ref={glowRef} className="cursor-glow" />
    </>
  );
}

/* ---- App ---- */
export default function App() {
  return (
    <>
      <CustomCursor />
      <Particles />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <ConceptsSection />
        <GovernanceSection />
        <CitizenScience />
        <Minigame />
        <FinalSection />
      </main>
    </>
  );
}
