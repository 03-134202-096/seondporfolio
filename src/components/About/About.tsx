import Image from 'next/image';
import Link from 'next/link';
import styles from './About.module.css';

const features = [
  {
    icon: '🔄',
    title: 'Unlimited Revisions',
    description: 'We revise until you are 100% satisfied — no extra cost.',
  },
  {
    icon: '💰',
    title: 'Refund Guarantee',
    description: 'Full or partial refund if we miss deadlines or fail to deliver.',
  },
  {
    icon: '🔒',
    title: '100% Confidential',
    description: 'Your data and research remain strictly private.',
  },
  {
    icon: '⚡',
    title: 'Dedicated Experts',
    description: 'Domain-matched professionals assigned to every project.',
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
                We are <strong>DeepDivers</strong> — a professional task-handoff platform
                where you delegate your research, data science, and development projects
                to dedicated experts. Based in Pakistan, serving clients worldwide.
              </p>
              <p>
                Simply hand over your project — whether it&apos;s a manuscript for a 
                top-tier journal, a machine learning experiment, a statistical analysis, 
                or a full-stack web application — and our team delivers polished, 
                professional results on time.
              </p>
              <p>
                With unlimited revisions, refund guarantees, and 24/7 support, 
                your satisfaction is our top priority. We don&apos;t just provide 
                services — we become your trusted project partners.
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
            <div className={styles.aboutCta}>
              <Link href="/about" className={styles.aboutCtaLink}>
                Learn More About Us →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
