import { motion } from 'framer-motion';

const proposals = [
  {
    icon: '🛡️',
    title: 'Brigadas Ecológicas Estudiantiles',
    description:
      'Grupos de 5-10 estudiantes voluntarios por facultad que monitorean las zonas de residuos, educan a compañeros y reportan problemas directamente a la administración.',
    solves: 'Falta de participación y desconexión con la administración',
    governance: 'Crea canales directos de comunicación entre estudiantes y directivos',
    concepts: ['Ciencia Ciudadana', 'Servicios Ecosistémicos'],
  },
  {
    icon: '🏆',
    title: 'Retos Ecológicos entre Facultades',
    description:
      'Competencias mensuales donde cada facultad compite por reducir su huella de residuos. Se mide la cantidad correctamente separada y se premia con beneficios reales.',
    solves: 'Falta de motivación para separar residuos',
    governance: 'Fomenta la competencia sana y la responsabilidad colectiva por facultad',
    concepts: ['Límites Planetarios', 'Cambio Global'],
  },
  {
    icon: '📱',
    title: 'Campañas Visuales en Canecas',
    description:
      'Rediseño de la señalización de canecas con códigos de color claros, íconos intuitivos y frases motivadoras creadas por los propios estudiantes.',
    solves: 'Confusión al momento de separar residuos',
    governance: 'Los estudiantes co-diseñan las soluciones que ellos mismos van a usar',
    concepts: ['Antropoceno', 'Servicios Ecosistémicos'],
  },
  {
    icon: '🌿',
    title: 'Huertas Urbanas con Compost',
    description:
      'Espacios de agricultura urbana que reutilizan residuos orgánicos del campus como compost. Gestionados por estudiantes interesados en sostenibilidad.',
    solves: 'Desperdicio de residuos orgánicos aprovechables',
    governance: 'Genera espacios de aprendizaje y responsabilidad compartida',
    concepts: ['Servicios Ecosistémicos', 'Ciencia Ciudadana'],
  },
  {
    icon: '⭐',
    title: 'Sistema de Puntos Ecológicos',
    description:
      'Gamificación institucional: los estudiantes acumulan puntos por acciones sostenibles verificadas (separar bien, participar en jornadas, reportar problemas). Los puntos se canjean por beneficios.',
    solves: 'Falta de incentivos para adoptar comportamientos sostenibles',
    governance: 'Conecta acciones individuales con reconocimiento institucional',
    concepts: ['Cambio Global', 'Antropoceno'],
  },
  {
    icon: '📊',
    title: 'Reportes Colaborativos Ambientales',
    description:
      'Plataforma donde cualquier miembro de la comunidad puede reportar problemas ambientales del campus: canecas llenas, zonas sucias, contaminación visual. Los datos se usan para mejorar la gestión.',
    solves: 'Falta de información en tiempo real para la toma de decisiones',
    governance: 'Convierte a cada estudiante en un sensor activo para la universidad',
    concepts: ['Ciencia Ciudadana', 'Límites Planetarios'],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function GovernanceSection() {
  return (
    <section className="section governance-section" id="gobernanza">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Propuesta</div>
          <h2 className="section-title">
            Gobernanza que empieza con nosotros
          </h2>
          <p className="section-subtitle">
            Propuestas realistas, creativas y alcanzables para que la comunidad
            estudiantil lidere el cambio ambiental. Sin leyes complejas. Solo
            acciones colectivas con impacto real.
          </p>
        </motion.div>

        <motion.div
          className="governance-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {proposals.map((p) => (
            <motion.div
              key={p.title}
              className="glass-card governance-card"
              variants={cardVariant}
              whileHover={{ y: -4 }}
            >
              <div className="governance-card-header">
                <div className="governance-card-icon">{p.icon}</div>
                <h3>{p.title}</h3>
              </div>
              <p>{p.description}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--green-200)', marginBottom: '4px' }}>
                <strong>Resuelve:</strong> {p.solves}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--neutral-400)' }}>
                <strong>Gobernanza:</strong> {p.governance}
              </p>
              <div className="governance-card-meta">
                {p.concepts.map((c) => (
                  <span className="tag" key={c}>{c}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
