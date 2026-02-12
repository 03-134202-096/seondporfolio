import styles from './Services.module.css';

const services = [
  {
    icon: '🎓',
    title: 'Academic & Research Services',
    description:
      'Comprehensive support for researchers, from manuscript preparation to publication. We help you navigate the academic publishing landscape with precision.',
    items: [
      'Journal-style formatting & LaTeX typesetting',
      'Copyediting, proofreading & language editing',
      'Citation formatting (APA, MLA, Chicago, Vancouver)',
      'Systematic review & literature search support',
      'End-to-end Q1 paper publication support',
      'Research gap analysis & annotated bibliography',
      'Grant proposal writing & reviewer response drafting',
      'CV/SOP editing & student application assistance',
      'Academic poster & presentation design',
    ],
    count: '27+ specialized services',
  },
  {
    icon: '🤖',
    title: 'Data, AI & Technical Services',
    description:
      'From raw data to actionable insights. Our team handles the complete data pipeline—collection, cleaning, analysis, and AI/ML model execution.',
    items: [
      'Data collection, entry & cleaning',
      'Data annotation for ML/AI tasks',
      'Python visualization & chart creation',
      'Web scraping & dataset curation',
      'ML/DL/AI model training & parameter tuning',
      'Experiment execution & benchmarking',
      'Next.js/Nest.js full-stack development',
      'AWS deployment & cloud infrastructure',
    ],
    count: '15+ technical solutions',
  },
  {
    icon: '✍️',
    title: 'Writing, Content & Admin',
    description:
      'Professional content creation and administrative support tailored for academics, businesses, and digital platforms seeking quality communication.',
    items: [
      'Blog writing & SEO content optimization',
      'General & medical article writing',
      'Paraphrasing, rewriting & humanizing text',
      'Abstract writing & keyword selection',
      'Social media & website content updates',
      'Email drafting & agenda preparation',
      'Book topic research & core summaries',
      'Cover letters & recruitment materials',
      'Meta ads management & internet research',
    ],
    count: '20+ content services',
  },
];

export default function Services() {
  return (
    <section id="services" className={`section ${styles.services}`}>
      <div className="container">
        <div className="section-header">
          <h2>Our Expertise</h2>
          <p>
            We deliver end-to-end solutions across three core domains, ensuring your
            research, data projects, and content needs are handled by specialists.
          </p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <article key={service.title} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <ul className={styles.serviceList}>
                {service.items.map((item) => (
                  <li key={item} className={styles.serviceListItem}>
                    <span className={styles.serviceListIcon}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.serviceCount}>{service.count}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
