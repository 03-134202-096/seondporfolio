import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-label="DeepDivers - Professional Research and Data Science Services">
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <span className={`badge ${styles.heroBadge}`}>
            Dive Until Satisfaction
          </span>
          <h1 className={styles.heroTitle}>
            Professional <span className={styles.heroHighlight}>Research</span> &{' '}
            <span className={styles.heroHighlight}>Data Science</span> Services
          </h1>
          <p className={styles.heroDescription}>
            Expert freelance team offering research paper writing, data analysis, machine learning, 
            AI solutions, and academic services. We deliver publication-ready manuscripts and 
            professional content for researchers, students, and businesses worldwide. Available 24/7 on Fiverr, Upwork & Freelancer.
          </p>
          <div className={styles.heroButtons}>
            <Link href="#services" className="btn btn-primary" aria-label="View our services">
              Explore Services
            </Link>
            <Link href="#contact" className="btn btn-secondary" aria-label="Get a free quote">
              Get Free Quote
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
