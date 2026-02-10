'use client';

import Image from 'next/image';
import styles from './Hero.module.css';

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = el.offsetTop - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }
};

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-label="DeepDivers - Hand Over Your Projects to Expert Professionals">
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <span className={`badge ${styles.heroBadge}`}>
            🚀 60+ Services • Hand Over Any Task • We Deliver
          </span>
          <h1 className={styles.heroTitle}>
            Hand Over Your <span className={styles.heroHighlight}>Projects</span>.{' '}
            We Handle <span className={styles.heroHighlight}>Everything</span>.
          </h1>
          <p className={styles.heroDescription}>
            Stop doing it all yourself. Submit your research, data science, AI, or development 
            project — and let our dedicated experts deliver professional results. You focus on 
            what matters. We take care of the rest.
          </p>
          <div className={styles.heroButtons}>
            <button onClick={() => scrollTo('service-catalog')} className="btn btn-primary" aria-label="Browse and order services">
              Browse Services →
            </button>
            <button onClick={() => scrollTo('pricing')} className="btn btn-secondary" aria-label="View pricing packages">
              View Pricing
            </button>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>60+</div>
              <div className={styles.statLabel}>Expert Services</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>190+</div>
              <div className={styles.statLabel}>Countries Served</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Satisfaction Guarantee</div>
            </div>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageBg} />
            <Image
              src="/ProfilePicture.webp"
              alt="DeepDivers Team - Professional Research and Data Science Experts"
              width={400}
              height={400}
              className={styles.heroImage}
              priority
            />
            <div className={`${styles.floatingCard} ${styles.floatingCard1}`}>
              <div className={styles.floatingCardIcon}>📊</div>
              <div className={styles.floatingCardText}>Data Analysis</div>
              <div className={styles.floatingCardSub}>ML/AI Solutions</div>
            </div>
            <div className={`${styles.floatingCard} ${styles.floatingCard2}`}>
              <div className={styles.floatingCardIcon}>📝</div>
              <div className={styles.floatingCardText}>Research Support</div>
              <div className={styles.floatingCardSub}>Publication Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
