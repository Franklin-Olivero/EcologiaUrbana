import { motion } from 'framer-motion';

const stats = [
  { number: '2.1M', label: 'Ton de residuos/año en Colombia' },
  { number: '78%', label: 'Residuos mal separados en campus' },
  { number: '5 min', label: 'Para aprender a reciclar bien' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
};

export default function HeroSection() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" />

      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="hero-badge-dot" />
          Universidad del Norte · Ecología Urbana
        </motion.div>

        <motion.h1
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          Cada residuo mal separado
          <br />
          es una <span className="highlight">decisión colectiva</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          Plataforma de participación ecológica para fortalecer la gobernanza
          institucional frente al manejo de residuos en nuestro campus. Porque las
          pequeñas acciones colectivas generan grandes transformaciones ambientales.
        </motion.p>

        <motion.div
          className="hero-buttons"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <button className="btn-primary" onClick={() => scrollTo('#problema')}>
            Descubre el problema ↓
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('#minijuego')}>
            🎮 Jugar ahora
          </button>
        </motion.div>

        <motion.div
          className="hero-stats"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          {stats.map((s) => (
            <div className="hero-stat" key={s.label}>
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
