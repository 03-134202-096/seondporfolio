import Image from 'next/image';
import styles from './About.module.css';

const features = [
  {
    icon: '🎯',
    title: 'Precision Focused',
    description: 'Every deliverable meets rigorous quality standards.',
  },
  {
    icon: '⚡',
    title: 'Fast Turnaround',
    description: 'Efficient workflows without compromising quality.',
  },
  {
    icon: '🔒',
    title: 'Confidential',
    description: 'Your data and research remain strictly private.',
  },
  {
    icon: '💬',
    title: 'Clear Communication',
    description: 'Regular updates and responsive support throughout.',
  },
];

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImage}>
            <div className={styles.aboutImageWrapper}>
              <Image
                src="/ProfilePicture.webp"
                alt="ResearchFlow Team"
                width={500}
                height={600}
                className={styles.aboutImg}
              />
            </div>
            <div className={styles.aboutImageBadge}>
              <strong>Asad Farooq</strong>
              <span>Team Lead</span>
            </div>
          </div>
          <div className={styles.aboutContent}>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <h2>About Our Team</h2>
            </div>
            <div className={styles.aboutText}>
              <p>
                We are <strong>DeepDivers</strong> — a specialized team of researchers, data
                scientists, and content professionals based in Pakistan, serving clients
                worldwide through platforms like Fiverr, Upwork, and Freelancer.
              </p>
              <p>
                With a strong foundation in computer science and hands-on experience in
                academic publishing, we bridge the gap between raw ideas and polished,
                publication-ready outputs. Our work spans peer-reviewed journals, conference
                presentations, and industry-grade data solutions.
              </p>
              <p>
                Whether you need a manuscript formatted for a top-tier journal, a machine
                learning experiment executed, or compelling content for your digital presence
                — we deliver with precision and professionalism.
              </p>
            </div>
            <div className={styles.aboutFeatures}>
              {features.map((feature) => (
                <div key={feature.title} className={styles.aboutFeature}>
                  <div className={styles.aboutFeatureIcon}>{feature.icon}</div>
                  <div className={styles.aboutFeatureText}>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.credentials}>
              <h4>Credentials & Tools</h4>
              <div className={styles.credentialsList}>
                <span className={styles.credentialItem}>
                  <span className={styles.credentialIcon}>📊</span> Python & Data Science
                </span>
                <span className={styles.credentialItem}>
                  <span className={styles.credentialIcon}>🤖</span> ML/DL Frameworks
                </span>
                <span className={styles.credentialItem}>
                  <span className={styles.credentialIcon}>💻</span> Next.js & Nest.js
                </span>
                <span className={styles.credentialItem}>
                  <span className={styles.credentialIcon}>☁️</span> AWS Services
                </span>
                <span className={styles.credentialItem}>
                  <span className={styles.credentialIcon}>📝</span> LaTeX Expert
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
