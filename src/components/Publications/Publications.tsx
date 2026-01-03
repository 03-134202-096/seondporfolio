import styles from './Publications.module.css';

const publications = [
  {
    title: 'Inner Speech Decoding: A Comprehensive Review',
    journal: 'Wiley Interdisciplinary Reviews: Cognitive Science',
    year: '2025',
    doi: 'https://doi.org/10.1002/wcs.70016',
    category: 'Neuroscience',
  },
  {
    title:
      'Attention-Based Approach for Arabic Sign Language Recognition, Supporting Differently Abled Persons',
    journal: 'Journal of Disability Research',
    year: '2025',
    doi: 'http://doi.org/10.57197/JDR-2025-0586',
    category: 'Deep Learning',
  },
  {
    title: 'Graph Attention Networks for Skin Lesion Classification with CNN-Driven Node Features',
    journal: 'Computers, Materials & Continua (CMC)',
    year: '2025',
    doi: 'https://doi.org/10.32604/cmc.2025.069162',
    category: 'Medical AI',
  },
  {
    title: 'From Radiomics to Transformers in Pancreatic Cancer Detection and Prognosis',
    journal: 'Frontiers in Medicine',
    year: '2025',
    doi: 'https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2025.1731922/abstract',
    category: 'Medical AI',
  },
];

export default function Publications() {
  return (
    <section id="publications" className={`section ${styles.publications}`}>
      <div className="container">
        <div className="section-header">
          <h2>Our Publications</h2>
          <p>
            Peer-reviewed research demonstrating our expertise in AI, deep learning, and
            medical informatics. Each paper reflects our commitment to advancing scientific
            knowledge.
          </p>
        </div>
        <div className={styles.publicationsGrid}>
          {publications.map((pub) => (
            <article key={pub.doi} className={styles.publicationCard}>
              <span className={`badge ${styles.publicationBadge}`}>{pub.category}</span>
              <h3 className={styles.publicationTitle}>{pub.title}</h3>
              <div className={styles.publicationMeta}>
                <span className={styles.publicationMetaItem}>
                  <span className={styles.publicationMetaIcon}>📰</span>
                  {pub.journal}
                </span>
                <span className={styles.publicationMetaItem}>
                  <span className={styles.publicationMetaIcon}>📅</span>
                  {pub.year}
                </span>
              </div>
              <a
                href={pub.doi}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.publicationLink}
              >
                View Publication →
              </a>
            </article>
          ))}
        </div>
        <div className={styles.publicationsNote}>
          <p>📚 Additional publications currently in progress and under peer review.</p>
        </div>
      </div>
    </section>
  );
}
