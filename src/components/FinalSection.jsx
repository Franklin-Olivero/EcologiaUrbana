import { motion } from 'framer-motion';

const quotes = [
  'La gobernanza comienza con las acciones cotidianas.',
  'La sostenibilidad depende de la participación colectiva.',
  'Cada acción ambiental también es una decisión institucional.',
  'No necesitamos leyes complejas. Necesitamos compromiso compartido.',
  'El campus que queremos se construye con las decisiones que tomamos hoy.',
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const quoteVariant = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function FinalSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="section final-section" id="final">
      <div className="container">
        <div className="final-content">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            Tu decisión también gobierna
          </motion.h2>

          <motion.div
            className="final-quotes"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {quotes.map((q) => (
              <motion.div key={q} className="final-quote" variants={quoteVariant}>
                "{q}"
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="final-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p>
              Esta plataforma es una demostración de cómo la tecnología, la
              ecología urbana y la participación estudiantil pueden fortalecer la
              gobernanza ambiental institucional. Cada sección fue diseñada para
              responder: <strong>"¿Cómo ayuda esto a que la universidad tome
              mejores decisiones en conjunto?"</strong>
            </p>
            <button className="btn-primary" onClick={scrollToTop}>
              Volver al inicio 🌱
            </button>
          </motion.div>

          <div className="final-footer">
            <p>
              Universidad del Norte · Ecología Urbana · Barranquilla, Colombia
              <br />
              Plataforma creada como propuesta académica de gobernanza institucional
              <br />
              <span style={{ marginTop: '8px', display: 'inline-block' }}>
                Conceptos integrados: Antropoceno · Cambio Global · Límites
                Planetarios · Servicios Ecosistémicos · Ciencia Ciudadana
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
