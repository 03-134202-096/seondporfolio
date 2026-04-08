'use client';

import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Otuekong E.',
    role: 'PhD Student, Computer Science — Technical University of Munich, Germany',
    text: 'Perfect, I love your work. It was difficult to do away with all the lengthy texts in the paper. And you\'ve done a great job at decluttering. I think it is perfect like this.',
    rating: 5,
    service: 'IEEE Conference Paper',
  },
  {
    name: 'Dr. Samabia T.',
    role: 'Head of AI Applied Technologies Research Center — Bahria University, Islamabad',
    text: 'Asad has been an outstanding researcher and developer under my supervision. He contributed significantly to multiple research projects, leading to four peer-reviewed publications with additional manuscripts currently under review. He demonstrated strong technical depth in designing, implementing, and evaluating AI, machine learning, and deep learning experiments that formed the core of our research work. I strongly recommend him for advanced research roles.',
    rating: 5,
    service: 'Research Papers & AI/ML Experiments',
  },
  {
    name: 'Dominic K.',
    role: 'PhD Researcher, Computer Science — University of Stuttgart, Germany',
    text: 'It is just perfect. Good.',
    rating: 5,
    service: 'Thesis Formatting & Template Conversion',
  },
];

const trustBadges = [
  { icon: '🛡️', label: '100% Satisfaction' },
  { icon: '🔒', label: 'NDA Protected' },
  { icon: '♻️', label: 'Unlimited Revisions' },
  { icon: '⚡', label: '24hr Response' },
  { icon: '🌍', label: 'Global Reach' },
  { icon: '📄', label: 'Plagiarism-Free' },
];

export default function Testimonials() {
  return (
    <div className={styles.testimonials}>
      <div className={styles.container}>
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
    </div>
  );
}
