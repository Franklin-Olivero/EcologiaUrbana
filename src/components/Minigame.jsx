import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ---- Data ---- */
const wasteItems = [
  { id: 1, emoji: '🍌', label: 'Cáscara', bin: 'organico' },
  { id: 2, emoji: '🥤', label: 'Vaso plástico', bin: 'reciclable' },
  { id: 3, emoji: '📄', label: 'Papel', bin: 'reciclable' },
  { id: 4, emoji: '🍎', label: 'Manzana', bin: 'organico' },
  { id: 5, emoji: '🧃', label: 'Caja de jugo', bin: 'reciclable' },
  { id: 6, emoji: '🩹', label: 'Curita usada', bin: 'ordinario' },
  { id: 7, emoji: '🔋', label: 'Batería', bin: 'peligroso' },
  { id: 8, emoji: '🧴', label: 'Envase químico', bin: 'peligroso' },
  { id: 9, emoji: '🥡', label: 'Icopor sucio', bin: 'ordinario' },
  { id: 10, emoji: '📦', label: 'Cartón', bin: 'reciclable' },
  { id: 11, emoji: '🦴', label: 'Hueso', bin: 'organico' },
  { id: 12, emoji: '🖊️', label: 'Esfero', bin: 'ordinario' },
  { id: 13, emoji: '💊', label: 'Medicamento', bin: 'peligroso' },
  { id: 14, emoji: '🥚', label: 'Cáscara huevo', bin: 'organico' },
  { id: 15, emoji: '🧻', label: 'Servilleta usada', bin: 'ordinario' },
  { id: 16, emoji: '🍶', label: 'Botella vidrio', bin: 'reciclable' },
];

const bins = [
  { id: 'reciclable', icon: '♻️', label: 'Reciclable', colorClass: 'bin-color-reciclable' },
  { id: 'organico', icon: '🌱', label: 'Orgánico', colorClass: 'bin-color-organico' },
  { id: 'ordinario', icon: '🗑️', label: 'Ordinario', colorClass: 'bin-color-ordinario' },
  { id: 'peligroso', icon: '☣️', label: 'Peligroso', colorClass: 'bin-color-peligroso' },
];

const GAME_DURATION = 45;
const ITEMS_PER_ROUND = 8;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Minigame() {
  const [state, setState] = useState('start'); // start | playing | result
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [ecoLevel, setEcoLevel] = useState(50);
  const [feedback, setFeedback] = useState(null);
  const [dragOverBin, setDragOverBin] = useState(null);
  const timerRef = useRef(null);
  const dragItemRef = useRef(null);

  /* ---- Timer ---- */
  useEffect(() => {
    if (state !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setState('result');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [state]);

  /* ---- Start game ---- */
  const startGame = () => {
    const shuffled = shuffle(wasteItems).slice(0, ITEMS_PER_ROUND);
    setItems(shuffled);
    setScore(0);
    setTotal(0);
    setTimeLeft(GAME_DURATION);
    setEcoLevel(50);
    setFeedback(null);
    setState('playing');
  };

  /* ---- Drop handler ---- */
  const handleDrop = useCallback(
    (binId) => {
      if (!dragItemRef.current) return;
      const item = dragItemRef.current;
      const correct = item.bin === binId;

      setTotal((t) => t + 1);

      if (correct) {
        setScore((s) => s + 1);
        setEcoLevel((e) => Math.min(100, e + 8));
        setFeedback({ type: 'correct', text: `¡Correcto! ${item.emoji} ${item.label} → ${binId}` });
      } else {
        setEcoLevel((e) => Math.max(0, e - 12));
        setFeedback({ type: 'incorrect', text: `Incorrecto. ${item.emoji} ${item.label} debía ir a "${item.bin}"` });
      }

      setItems((prev) => prev.filter((i) => i.id !== item.id));
      dragItemRef.current = null;
      setDragOverBin(null);

      setTimeout(() => setFeedback(null), 2000);

      // If all items are gone, add more
      setTimeout(() => {
        setItems((prev) => {
          if (prev.length === 0 && state === 'playing') {
            return shuffle(wasteItems).slice(0, ITEMS_PER_ROUND);
          }
          return prev;
        });
      }, 400);
    },
    [state]
  );

  /* ---- Drag handlers ---- */
  const onDragStart = (item) => {
    dragItemRef.current = item;
  };

  /* ---- Touch handlers for mobile ---- */
  const touchItemRef = useRef(null);
  const touchGhostRef = useRef(null);

  const onTouchStart = (e, item) => {
    dragItemRef.current = item;
    touchItemRef.current = item;
    // Create ghost element
    const ghost = document.createElement('div');
    ghost.style.position = 'fixed';
    ghost.style.fontSize = '2.5rem';
    ghost.style.pointerEvents = 'none';
    ghost.style.zIndex = '10001';
    ghost.style.transform = 'translate(-50%, -50%)';
    ghost.textContent = item.emoji;
    document.body.appendChild(ghost);
    touchGhostRef.current = ghost;
    const touch = e.touches[0];
    ghost.style.left = touch.clientX + 'px';
    ghost.style.top = touch.clientY + 'px';
  };

  const onTouchMove = (e) => {
    e.preventDefault();
    if (!touchGhostRef.current) return;
    const touch = e.touches[0];
    touchGhostRef.current.style.left = touch.clientX + 'px';
    touchGhostRef.current.style.top = touch.clientY + 'px';

    // Detect which bin is under touch
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    if (el) {
      const binEl = el.closest('[data-bin-id]');
      setDragOverBin(binEl ? binEl.dataset.binId : null);
    }
  };

  const onTouchEnd = () => {
    if (touchGhostRef.current) {
      document.body.removeChild(touchGhostRef.current);
      touchGhostRef.current = null;
    }
    if (dragOverBin && dragItemRef.current) {
      handleDrop(dragOverBin);
    }
    touchItemRef.current = null;
    setDragOverBin(null);
  };

  /* ---- Campus visual ---- */
  const getCampusVisual = () => {
    if (ecoLevel >= 80) return ['🌳', '🌻', '🦋', '🌿', '☀️', '🌳', '🌸'];
    if (ecoLevel >= 60) return ['🌳', '🌿', '☁️', '🌱', '🌳'];
    if (ecoLevel >= 40) return ['🌿', '☁️', '🏢', '☁️', '🌱'];
    if (ecoLevel >= 20) return ['☁️', '🏢', '💨', '🏭', '☁️'];
    return ['💨', '🏭', '🗑️', '💀', '🏭', '💨'];
  };

  const timerPercentage = (timeLeft / GAME_DURATION) * 100;

  /* ---- Render ---- */
  return (
    <section className="section minigame-section" id="minijuego">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Minijuego</div>
          <h2 className="section-title">
            Clasifica y transforma el campus
          </h2>
          <p className="section-subtitle">
            Arrastra cada residuo a la caneca correcta antes de que el tiempo
            termine. Tus decisiones impactan directamente el estado ecológico
            del campus.
          </p>
        </motion.div>

        <div className="minigame-container">
          <motion.div
            className="glass-card minigame-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            {/* ---- START SCREEN ---- */}
            {state === 'start' && (
              <div className="minigame-start">
                <h3>🎮 ¿Listo para clasificar?</h3>
                <p>
                  Arrastra cada residuo a la caneca correcta. Cada acierto mejora
                  el campus, cada error lo contamina. Tienes {GAME_DURATION} segundos.
                </p>
                <button className="btn-primary" onClick={startGame}>
                  ¡Empezar! 🚀
                </button>
              </div>
            )}

            {/* ---- PLAYING ---- */}
            {state === 'playing' && (
              <>
                <div className="minigame-header">
                  <div className="minigame-score">🏆 {score} pts</div>

                  <div className="minigame-timer">
                    ⏱️ {timeLeft}s
                    <div className="timer-bar">
                      <div
                        className={`timer-bar-fill ${timerPercentage < 30 ? 'low' : ''}`}
                        style={{ width: `${timerPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="minigame-eco-meter">
                    🌍
                    <div className="eco-meter-bar">
                      <div
                        className={`eco-meter-fill ${ecoLevel < 30 ? 'polluted' : ''}`}
                        style={{ width: `${ecoLevel}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Campus visual */}
                <div className="minigame-campus">
                  {getCampusVisual().map((e, i) => (
                    <motion.span
                      key={`${e}-${i}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.05, type: 'spring' }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>

                {/* Waste items */}
                <div className="minigame-area">
                  <div className="waste-items">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          className="waste-item"
                          draggable
                          onDragStart={() => onDragStart(item)}
                          onTouchStart={(e) => onTouchStart(e, item)}
                          onTouchMove={onTouchMove}
                          onTouchEnd={onTouchEnd}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                          whileHover={{ scale: 1.12 }}
                          whileTap={{ scale: 0.95 }}
                          layout
                        >
                          {item.emoji}
                          <span className="waste-item-label">{item.label}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Bins */}
                  <div className="bins-container">
                    {bins.map((bin) => (
                      <div
                        key={bin.id}
                        data-bin-id={bin.id}
                        className={`bin ${bin.colorClass} ${dragOverBin === bin.id ? 'drag-over' : ''}`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOverBin(bin.id);
                        }}
                        onDragLeave={() => setDragOverBin(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          handleDrop(bin.id);
                        }}
                      >
                        <div className="bin-icon">{bin.icon}</div>
                        <div className="bin-label">{bin.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      className={`minigame-feedback ${feedback.type}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {feedback.text}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {/* ---- RESULT SCREEN ---- */}
            {state === 'result' && (
              <div className="minigame-result">
                <h3>
                  {score >= total * 0.7 ? '🎉 ¡Excelente trabajo!' : score >= total * 0.4 ? '💪 ¡Buen intento!' : '😤 ¡Hay que mejorar!'}
                </h3>
                <div className="minigame-result-score">
                  {score}/{total}
                </div>
                <p>
                  {score >= total * 0.7
                    ? 'Demostaste que las decisiones individuales bien informadas transforman el campus. ¡Así se fortalece la gobernanza!'
                    : score >= total * 0.4
                      ? 'Vas por buen camino. Con más práctica y participación colectiva, el campus mejora para todos.'
                      : 'El campus necesita que cada persona aprenda a clasificar. ¡Practica de nuevo y sé parte del cambio!'}
                </p>

                <div className="minigame-campus" style={{ marginBottom: 'var(--space-xl)' }}>
                  {getCampusVisual().map((e, i) => (
                    <span key={`${e}-${i}`}>{e}</span>
                  ))}
                </div>

                <button className="btn-primary" onClick={startGame}>
                  Jugar de nuevo 🔄
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
