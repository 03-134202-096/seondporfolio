'use client';

import { useState } from 'react';
import { faqs } from '@/data/faqs';
import { SITE } from '@/config/site';
import styles from './FAQ.module.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faq}>
      <div className={styles.container}>
        <div className={styles.faqGrid}>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${openIndex === index ? styles.active : ''}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span>{faq.question}</span>
                  <span className={styles.faqIcon}>
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`${styles.faqAnswer} ${openIndex === index ? styles.open : ''}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.supportCard}>
            <div className={styles.supportIcon}>💬</div>
            <h3>Still have questions?</h3>
            <p>Can&apos;t find the answer you&apos;re looking for? Our team is here to help!</p>
            <a href="#contact" className={styles.supportButton}>
              Contact Us
            </a>
            <div className={styles.supportMethods}>
              <div className={styles.method}>
                <span>📧</span>
                <span>{SITE.email}</span>
              </div>
              <div className={styles.method}>
                <span>📱</span>
                <span>{SITE.phoneDisplay}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
