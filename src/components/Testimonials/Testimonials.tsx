'use client';

import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Postdoctoral Researcher, MIT',
    text: 'DeepDivers formatted my entire manuscript to Frontiers guidelines in 48 hours. Their LaTeX typesetting and citation accuracy were flawless. Saved me weeks of work.',
    rating: 5,
    service: 'Journal Formatting & LaTeX',
  },
  {
    name: 'Ahmed Al-Rashid',
    role: 'PhD Candidate, University of Jeddah',
    text: 'They handled my systematic review screening — 2,000+ papers filtered down to 85 relevant studies with annotated bibliography. Incredibly thorough and professional.',
    rating: 5,
    service: 'Systematic Review Support',
  },
  {
    name: 'Prof. Maria Gonzalez',
    role: 'Associate Professor, Universidad de Barcelona',
    text: 'The data visualization and architecture diagrams they created for my AI paper were publication-quality. The reviewers specifically praised the visual clarity.',
    rating: 5,
    service: 'Data Visualization & Diagrams',
  },
  {
    name: 'James Chen',
    role: 'Startup Founder, Singapore',
    text: 'They built our company website with Next.js and deployed it on AWS. Fast, clean code, and they handled everything from design to production. Highly recommend.',
    rating: 5,
    service: 'Full-Stack Development',
  },
  {
    name: 'Dr. Fatima Noor',
    role: 'Research Scientist, King Abdullah University',
    text: 'I needed help with ML model training and parameter tuning for my cancer detection paper. DeepDivers delivered reproducible results with detailed documentation.',
    rating: 5,
    service: 'ML/AI Model Training',
  },
  {
    name: 'Thomas Anderson',
    role: 'Graduate Student, University of Melbourne',
    text: 'Affordable, fast, and reliable. They proofread my 80-page thesis, fixed all citation formatting issues, and even caught factual inconsistencies. Worth every penny.',
    rating: 5,
    service: 'Thesis Proofreading',
  },
];

const trustBadges = [
  { icon: '🛡️', label: '100% Satisfaction' },
  { icon: '🔒', label: 'NDA Protected' },
  { icon: '♻️', label: 'Unlimited Revisions' },
  { icon: '⚡', label: '24hr Response' },
  { icon: '🌍', label: '190+ Countries' },
  { icon: '📄', label: 'Plagiarism-Free' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Testimonials</span>
          <h2 className={styles.title}>What Our Clients Say</h2>
          <p className={styles.subtitle}>
            Trusted by researchers, students, and businesses worldwide.
            Here is what they have to say about working with us.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.stars}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className={styles.star}>★</span>
                  ))}
                </div>
                <span className={styles.serviceTag}>{item.service}</span>
              </div>
              <p className={styles.cardText}>&ldquo;{item.text}&rdquo;</p>
              <div className={styles.cardAuthor}>
                <div className={styles.authorAvatar}>
                  {item.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className={styles.authorName}>{item.name}</h4>
                  <p className={styles.authorRole}>{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.trustBar}>
          {trustBadges.map((badge) => (
            <div key={badge.label} className={styles.trustItem}>
              <span className={styles.trustIcon}>{badge.icon}</span>
              <span className={styles.trustLabel}>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
