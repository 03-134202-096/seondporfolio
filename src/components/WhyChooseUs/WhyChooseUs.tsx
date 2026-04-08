'use client';

import styles from './WhyChooseUs.module.css';

const reasons = [
  {
    icon: '🎓',
    title: 'Expert Team',
    description: 'Published researchers and experienced professionals with expertise across 90+ service areas.',
    highlight: '5+ Papers Published'
  },
  {
    icon: '⚡',
    title: 'Fast Turnaround',
    description: 'Quick response times and efficient delivery without compromising on quality.',
    highlight: '24hr Quote Response'
  },
  {
    icon: '💯',
    title: '100% Satisfaction',
    description: 'Unlimited revisions until you\'re completely satisfied with the final deliverable.',
    highlight: 'Free Revisions'
  },
  {
    icon: '🔒',
    title: 'Confidential & Secure',
    description: 'Your data and projects are handled with complete privacy and discretion.',
    highlight: 'NDA Available'
  },
  {
    icon: '💰',
    title: 'Affordable Pricing',
    description: 'Competitive rates starting from $25. Quality work doesn\'t have to break the bank.',
    highlight: 'From $25'
  },
  {
    icon: '🌍',
    title: 'Global Support',
    description: 'Available 24/7 across time zones. Quick communication via WhatsApp, email, or platforms.',
    highlight: '24/7 Available'
  }
];

const stats = [
  { value: '100%', label: 'Client Satisfaction' },
  { value: '90+', label: 'Services Offered' },
  { value: '5+', label: 'Published Papers' },
  { value: '24/7', label: 'Support Available' }
];

export default function WhyChooseUs() {
  return (
    <div className={styles.whyChooseUs}>
      <div className={styles.container}>
        <div className={styles.reasonsGrid}>
          {reasons.map((reason, index) => (
            <div key={index} className={styles.reasonCard}>
              <div className={styles.cardIcon}>{reason.icon}</div>
              <h3 className={styles.cardTitle}>{reason.title}</h3>
              <p className={styles.cardDescription}>{reason.description}</p>
              <span className={styles.cardHighlight}>{reason.highlight}</span>
            </div>
          ))}
        </div>

        <div className={styles.statsBar}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3>Ready to Get Started?</h3>
            <p>Join our satisfied clients and experience the DeepDivers difference</p>
          </div>
          <div className={styles.ctaButtons}>
            <a href="#contact" className={styles.ctaPrimary}>
              Get a Free Quote
            </a>
            <a href="#services" className={styles.ctaSecondary}>
              View Services
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
