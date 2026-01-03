import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <span className={`badge ${styles.heroBadge}`}>
            Dive Until Satisfaction
          </span>
          <h1 className={styles.heroTitle}>
            Empowering Your <span className={styles.heroHighlight}>Research</span> &{' '}
            <span className={styles.heroHighlight}>Data</span> Success
          </h1>
          <p className={styles.heroDescription}>
            We are a dedicated team of research specialists, data scientists, and content
            experts delivering publication-ready manuscripts, AI/ML solutions, and
            professional content services for academics and businesses globally.
          </p>
          <div className={styles.heroButtons}>
            <Link href="#services" className="btn btn-primary">
              Explore Services
            </Link>
            <Link href="#contact" className="btn btn-secondary">
              Request a Quote
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>4+</div>
              <div className={styles.statLabel}>Published Papers</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Services Offered</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Client Satisfaction</div>
            </div>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageBg} />
            <Image
              src="/ProfilePicture.webp"
              alt="DeepDivers Team Lead"
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
