import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialReports = [
  {
    id: 1,
    location: 'Bloque G — Entrada principal',
    type: 'Caneca llena',
    text: 'La caneca de reciclables lleva dos días sin ser vaciada. Los estudiantes terminan tirando todo en la caneca ordinaria.',
    time: 'Hace 2 horas',
  },
  {
    id: 2,
    location: 'Cafetería Central',
    type: 'Mala señalización',
    text: 'Las canecas no tienen rótulo visible. Es imposible saber cuál es para orgánicos y cuál para reciclables.',
    time: 'Hace 5 horas',
  },
  {
    id: 3,
    location: 'Zona Verde — Bloque K',
    type: 'Basura acumulada',
    text: 'Hay botellas plásticas y envolturas acumuladas cerca de los árboles. Se necesita una jornada de limpieza.',
    time: 'Hace 1 día',
  },
];

const locations = [
  'Bloque A', 'Bloque B', 'Bloque C', 'Bloque D', 'Bloque E',
  'Bloque F', 'Bloque G', 'Bloque K', 'Cafetería Central',
  'Biblioteca', 'Zona Verde', 'Cancha deportiva', 'Parqueadero',
];

const types = [
  'Caneca llena', 'Mala señalización', 'Basura acumulada',
  'Residuo peligroso', 'Falta de canecas', 'Otro',
];

export default function CitizenScience() {
  const [reports, setReports] = useState(initialReports);
  const [form, setForm] = useState({ location: '', type: '', text: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.location || !form.type || !form.text) return;

    const newReport = {
      id: Date.now(),
      location: form.location,
      type: form.type,
      text: form.text,
      time: 'Justo ahora',
    };

    setReports([newReport, ...reports]);
    setForm({ location: '', type: '', text: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="section citizen-section" id="ciencia">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Ciencia Ciudadana</div>
          <h2 className="section-title">
            Tus observaciones transforman el campus
          </h2>
          <p className="section-subtitle">
            Cada reporte que generas es un dato real que ayuda a la universidad a
            tomar mejores decisiones. Tú eres el sensor más importante del
            campus.
          </p>
        </motion.div>

        <div className="citizen-layout">
          <motion.div
            className="glass-card citizen-form-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h3>📝 Reportar un problema ambiental</h3>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  className="citizen-success"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  ✅ ¡Reporte enviado! Tu observación ya aparece en el feed.
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="location">📍 Ubicación en el campus</label>
                <select
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                >
                  <option value="">Selecciona una ubicación</option>
                  {locations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="type">🏷️ Tipo de problema</label>
                <select
                  id="type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="">Selecciona el tipo</option>
                  {types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="observation">💬 Describe lo que observas</label>
                <textarea
                  id="observation"
                  placeholder="Describe el problema que identificas..."
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                />
              </div>

              <button className="btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                Enviar reporte 📤
              </button>
            </form>
          </motion.div>

          <motion.div
            className="glass-card citizen-feed-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h3>📡 Feed de reportes recientes</h3>

            <AnimatePresence>
              {reports.map((r) => (
                <motion.div
                  key={r.id}
                  className="feed-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  layout
                >
                  <div className="feed-item-header">
                    <span className="feed-item-location">📍 {r.location}</span>
                    <span className="feed-item-type">{r.type}</span>
                  </div>
                  <p className="feed-item-text">{r.text}</p>
                  <span className="feed-item-time">{r.time}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
