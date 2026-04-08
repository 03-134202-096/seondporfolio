'use client';

import styles from './Process.module.css';

const processSteps = [
  {
    step: '01',
    title: 'Browse & Select Service',
    description: 'Explore our catalog of 90+ services. Pick the one you need, or describe a custom project. Attach files and requirements via our order form.',
    icon: '🔍'
  },
  {
    step: '02',
    title: 'Get a Detailed Quote',
    description: 'We review your requirements and provide a transparent quote within 24 hours — no hidden fees. Includes scope, timeline, and deliverables.',
    icon: '💰'
  },
  {
    step: '03',
    title: 'Pay Securely via Payoneer',
    description: 'Once you approve the quote, we send you a Payoneer payment link. Pay with credit/debit card, bank transfer, or Payoneer balance — no Payoneer account needed. Available worldwide.',
    icon: '🔒'
  },
  {
    step: '04',
    title: 'Work Begins Immediately',
    description: 'Your dedicated expert starts right away. Track progress 24/7 via WhatsApp or email. Request changes or ask questions anytime.',
    icon: '⚙️'
  },
  {
    step: '05',
    title: 'Review & Free Revisions',
    description: 'Receive your completed work for review. We offer unlimited free revisions until you are 100% satisfied with the quality and accuracy.',
    icon: '🔄'
  },
  {
    step: '06',
    title: 'Final Delivery & Support',
    description: 'Get your polished, professional deliverables in any format. We provide ongoing support and are available for follow-up questions after delivery.',
    icon: '🎉'
  }
];

export default function Process() {
  return (
    <section id="process" className={styles.process}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>How It Works</span>
          <h2 className={styles.title}>Our Simple Process</h2>
          <p className={styles.subtitle}>
            From initial contact to final delivery, we ensure a smooth and transparent experience
          </p>
        </div>

        <div className={styles.timeline}>
          {processSteps.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.stepNumber}>{item.step}</div>
              <div className={styles.stepContent}>
                <div className={styles.stepIcon}>{item.icon}</div>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepDescription}>{item.description}</p>
              </div>
              {index < processSteps.length - 1 && (
                <div className={styles.connector} />
              )}
            </div>
          ))}
        </div>

        <div className={styles.guarantees}>
          <div className={styles.guaranteeItem}>
            <span className={styles.guaranteeIcon}>🛡️</span>
            <div>
              <h4>100% Satisfaction Guarantee</h4>
              <p>Free revisions until you&apos;re happy</p>
            </div>
          </div>
          <div className={styles.guaranteeItem}>
            <span className={styles.guaranteeIcon}>⏰</span>
            <div>
              <h4>On-Time Delivery</h4>
              <p>We respect your deadlines</p>
            </div>
          </div>
          <div className={styles.guaranteeItem}>
            <span className={styles.guaranteeIcon}>🔒</span>
            <div>
              <h4>Confidentiality</h4>
              <p>Your data is secure with us</p>
            </div>
          </div>
          <div className={styles.guaranteeItem}>
            <span className={styles.guaranteeIcon}>💬</span>
            <div>
              <h4>24/7 Support</h4>
              <p>Always available for questions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
