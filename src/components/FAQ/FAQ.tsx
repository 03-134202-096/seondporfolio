'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods including credit/debit cards, bank transfers, and PayPal. Payments are processed securely through Payoneer, which supports 190+ countries and 150+ currencies. You don\'t need a Payoneer account — simply use your preferred payment method. For projects on Fiverr, Upwork, or Freelancer, we also work through platform escrow for your protection.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. Simple tasks (data entry, basic analysis) take 1-3 days. Research papers and complex analyses typically take 1-2 weeks. We always provide an estimated timeline with your quote and prioritize meeting your deadlines.'
  },
  {
    question: 'Do you offer revisions?',
    answer: 'Absolutely! We offer unlimited revisions until you\'re 100% satisfied with the work. Our goal is your complete satisfaction, and we won\'t consider a project complete until you\'re happy with the results.'
  },
  {
    question: 'Is my data and project confidential?',
    answer: 'Yes, we maintain strict confidentiality. All client data, research materials, and project details are kept completely private. We never share or reuse any client work, and we can sign NDAs if required.'
  },
  {
    question: 'Can you help with urgent/rush orders?',
    answer: 'Yes, we accommodate urgent requests whenever possible. Rush orders may have an additional fee depending on the timeline and complexity. Contact us with your deadline, and we\'ll do our best to help.'
  },
  {
    question: 'What if I\'m not satisfied with the work?',
    answer: 'Your satisfaction is our priority. We offer free revisions to address any concerns. If you\'re still not satisfied after revisions, we provide partial or full refunds on a case-by-case basis. We\'ve maintained a 100% satisfaction rate with our clients.'
  },
  {
    question: 'Do you provide plagiarism reports?',
    answer: 'Yes, for all written content and research papers, we provide plagiarism reports upon request at no extra cost. We guarantee 100% original work using premium plagiarism checking tools.'
  },
  {
    question: 'Can you work on projects in different time zones?',
    answer: 'Absolutely! We work with clients globally and are flexible with communication times. We ensure timely responses regardless of your location and can schedule calls at convenient times for you.'
  },
  {
    question: 'What file formats do you deliver?',
    answer: 'We deliver in any format you need: Word (.docx), PDF, Excel, LaTeX, PowerPoint, Python notebooks (.ipynb), code repositories, and more. Just specify your preferred format, and we\'ll accommodate.'
  },
  {
    question: 'How do I get started?',
    answer: 'Simply fill out our contact form with your project details, or reach out via WhatsApp or email. We\'ll respond within 24 hours with questions (if any) and a detailed quote. Once approved, we begin work immediately!'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>FAQ</span>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Got questions? We&apos;ve got answers. Find quick solutions to common queries below.
          </p>
        </div>

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
                <span>teamdeepdivers@gmail.com</span>
              </div>
              <div className={styles.method}>
                <span>📱</span>
                <span>+92 312 5065538</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
