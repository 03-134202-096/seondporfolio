import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-label="DeepDivers - Hand Over Your Projects to Expert Professionals">
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <span className={`badge ${styles.heroBadge}`}>
            🎓 Published researchers • Clients worldwide • Quotes in 24h
          </span>
          <h1 className={styles.heroTitle}>
            Expert <span className={styles.heroHighlight}>research support</span> for your
            thesis, papers and <span className={styles.heroHighlight}>data</span>.
          </h1>
          <p className={styles.heroDescription}>
            Statistics, academic editing, journal formatting, systematic reviews and machine
            learning experiments by published researchers. You stay the author; we make the
            work stronger, clearer and ready to submit.
          </p>
          <div className={styles.heroButtons}>
            <a href="#services" className="btn btn-primary">
              Explore Services →
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get a Free Quote
            </a>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>90+</div>
              <div className={styles.statLabel}>Expert Services</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>Global</div>
              <div className={styles.statLabel}>Client Reach</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5</div>
              <div className={styles.statLabel}>Peer-Reviewed Papers</div>
            </div>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroImageWrapper}>
            {/* Decorative aurora halo — soft, pulsing (outermost layer) */}
            <div className={styles.heroImageHalo} aria-hidden="true" />
            {/* Rotating conic-gradient ring — the main "stirred light" */}
            <div className={styles.heroImageBg} aria-hidden="true" />
            {/* Fast comet-trail orbit — a bright arc sweeping around */}
            <div className={styles.heroImageOrbit} aria-hidden="true" />
            {/* Tiny luminous dot that follows the orbit */}
            <div className={styles.heroImageSpark} aria-hidden="true" />

            <Image
              src="/landingIntro.webp"
              alt="DeepDivers Team - Professional Research and Data Science Experts"
              width={400}
              height={400}
              sizes="(max-width: 768px) 300px, 400px"
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
