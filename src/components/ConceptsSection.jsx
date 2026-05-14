import { motion } from 'framer-motion';

const concepts = [
  {
    emoji: '🏭',
    title: 'Antropoceno',
    number: '01',
    description:
      'Era geológica actual donde las actividades humanas son la principal fuerza de transformación del planeta. Nuestro campus es un reflejo a escala de esta realidad global.',
    example:
      'Los residuos generados diariamente en cafeterías, salones y laboratorios de Uninorte son una muestra directa de cómo la actividad humana impacta ecosistemas locales.',
  },
  {
    emoji: '🌡️',
    title: 'Cambio Global',
    number: '02',
    description:
      'Conjunto de alteraciones ambientales provocadas por actividades humanas que afectan la temperatura, biodiversidad, ciclos del agua y composición atmosférica del planeta.',
    example:
      'Cada bolsa de basura mal separada genera metano en rellenos sanitarios. Si Uninorte reduce un 30% sus residuos al relleno, disminuye su huella de carbono institucional.',
  },
  {
    emoji: '🛑',
    title: 'Límites Planetarios',
    number: '03',
    description:
      'Son 9 umbrales ambientales que la humanidad no debería cruzar para mantener condiciones de vida estables. Incluyen cambio climático, biodiversidad, ciclos de nutrientes y contaminación química.',
    example:
      'Los residuos plásticos y químicos de laboratorios contribuyen a la contaminación por sustancias nuevas, uno de los límites ya transgredidos a nivel global.',
  },
  {
    emoji: '🌳',
    title: 'Servicios Ecosistémicos',
    number: '04',
    description:
      'Beneficios que los ecosistemas brindan a las personas: aire limpio, regulación del clima, polinización, bienestar emocional y espacios de recreación.',
    example:
      'Las zonas verdes de Uninorte regulan temperatura, mejoran la calidad del aire y reducen el estrés estudiantil. Protegerlas depende de cómo manejamos nuestros residuos.',
  },
  {
    emoji: '🔬',
    title: 'Ciencia Ciudadana',
    number: '05',
    description:
      'Participación activa de personas no científicas en la recopilación de datos, observación y generación de conocimiento ambiental útil para la toma de decisiones.',
    example:
      'Los estudiantes pueden registrar puntos de acumulación de basura, tipos de residuos y proponer soluciones. Esta información permite que la universidad tome decisiones basadas en datos reales.',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ConceptsSection() {
  return (
    <section className="section concepts-section" id="conceptos">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Base conceptual</div>
          <h2 className="section-title">
            Ecología Urbana aplicada al campus
          </h2>
          <p className="section-subtitle">
            Estos cinco conceptos fundamentan toda nuestra propuesta. No son solo
            teoría: son la razón por la que la gobernanza ambiental importa.
          </p>
        </motion.div>

        <motion.div
          className="concepts-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {concepts.map((c) => (
            <motion.div
              key={c.title}
              className="glass-card concept-card"
              variants={cardVariant}
              whileHover={{ y: -6 }}
            >
              <span className="concept-card-number">{c.number}</span>
              <div className="concept-card-emoji">{c.emoji}</div>
              <h3>{c.title}</h3>
              <p className="concept-card-desc">{c.description}</p>
              <div className="concept-card-example">
                <strong>📍 En Uninorte</strong>
                {c.example}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
