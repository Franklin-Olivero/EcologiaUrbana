import { motion } from 'framer-motion';

const problems = [
  {
    icon: '🗑️',
    title: 'Residuos mal separados',
    description:
      'En el campus, más del 70% de los residuos terminan en la caneca equivocada. Esto genera contaminación cruzada, hace inviable el reciclaje y aumenta la cantidad de desechos que llegan a los rellenos sanitarios.',
    tag: 'Antropoceno',
  },
  {
    icon: '🤷',
    title: 'Falta de participación',
    description:
      'La comunidad universitaria no cuenta con canales efectivos para involucrarse en las decisiones sobre manejo de residuos. Sin participación, no hay gobernanza real y las políticas ambientales se quedan en el papel.',
    tag: 'Límites Planetarios',
  },
  {
    icon: '🏛️',
    title: 'Gobernanza fragmentada',
    description:
      'Las decisiones sobre sostenibilidad se toman de forma vertical sin involucrar a estudiantes, docentes y personal. Una gobernanza efectiva requiere que todos los actores participen en la toma de decisiones.',
    tag: 'Cambio Global',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ProblemSection() {
  return (
    <section className="section problem-section" id="problema">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">El problema</div>
          <h2 className="section-title">
            ¿Qué está pasando en nuestro campus?
          </h2>
          <p className="section-subtitle">
            El manejo inadecuado de residuos no es solo un problema ambiental.
            Es un reflejo de cómo tomamos — o dejamos de tomar — decisiones
            colectivas dentro de la universidad.
          </p>
        </motion.div>

        <motion.div
          className="problem-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {problems.map((p) => (
            <motion.div
              key={p.title}
              className="glass-card problem-card"
              variants={item}
            >
              <div className="problem-card-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <span className="tag">{p.tag}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="glass-card problem-connection"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>🌍 Conexión con el Antropoceno</h3>
          <p>
            Vivimos en la era del Antropoceno, donde las actividades humanas son
            la fuerza dominante que transforma el planeta. Cada campus
            universitario es un microcosmos de esta realidad global: la forma en
            que gestionamos nuestros residuos refleja directamente nuestra
            capacidad para enfrentar el cambio global y respetar los límites
            planetarios. Si no podemos organizarnos a nivel institucional,
            ¿cómo lo haremos a escala planetaria?
          </p>
        </motion.div>
      </div>
    </section>
  );
}
