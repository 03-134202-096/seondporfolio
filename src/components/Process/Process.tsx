'use client';

import styles from './Process.module.css';

const processSteps = [
  {
    step: '01',
    title: 'Submit Your Request',
    description: 'Fill out our contact form with your project details, requirements, and deadline. Attach any relevant files or references.',
    icon: '📝'
  },
  {
    step: '02',
    title: 'Get a Quote',
    description: 'We review your requirements and provide a detailed quote within 24 hours. No hidden fees, transparent pricing.',
    icon: '💰'
  },
  {
    step: '03',
    title: 'Confirm & Pay',
    description: 'Once you approve the quote, make payment via Payoneer, PayPal, or platform escrow. We begin work immediately.',
    icon: '✅'
  },
  {
    step: '04',
    title: 'Work in Progress',
    description: 'We keep you updated throughout the process. Ask questions, request changes, or provide feedback anytime.',
    icon: '⚙️'
  },
  {
    step: '05',
    title: 'Review & Revisions',
    description: 'Receive your completed work for review. We offer free revisions until you\'re 100% satisfied with the results.',
    icon: '🔄'
  },
  {
    step: '06',
    title: 'Final Delivery',
    description: 'Get your polished, professional deliverables. We provide ongoing support for any questions after delivery.',
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
