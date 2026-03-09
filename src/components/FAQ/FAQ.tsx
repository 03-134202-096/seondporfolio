'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Browse our Service Catalog to find what you need, then click "Order Now" or fill out the contact form with your project details. We\'ll respond within 24 hours with a detailed quote. Once approved, you pay securely and we begin work immediately.'
  },
  {
    question: 'How can I track my project progress?',
    answer: 'Once you place an order, we assign a dedicated team member exclusively to your project. Your assigned expert focuses solely on your work and is available 24/7 to provide real-time progress updates, answer questions, and implement your feedback. You can request status updates, suggest changes, or discuss your project anytime via WhatsApp, email, or your preferred communication channel — we respond promptly, day or night.'
  },
  {
    question: 'How does payment work with Payoneer?',
    answer: 'After your quote is approved, we send you a Payoneer payment link. You can pay using credit card (Visa, Mastercard, Amex), debit card, bank transfer, or Payoneer balance. You do NOT need a Payoneer account to pay — simply use your preferred payment method. Payoneer supports 190+ countries and 150+ currencies with fast, secure processing.'
  },
  {
    question: 'What other payment methods do you accept?',
    answer: 'Our primary payment method is Payoneer (credit/debit card, bank transfer, Payoneer balance). For projects through freelance platforms (Fiverr, Upwork, Freelancer), we also accept platform escrow payments. Contact us if you need alternative payment arrangements.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. Simple tasks (data entry, basic analysis, proofreading) take 1-3 days. Research papers, ML models, and complex analyses typically take 1-2 weeks. Web development projects take 1-4 weeks. We always provide an estimated timeline with your quote and prioritize meeting your deadlines.'
  },
  {
    question: 'Do you offer revisions?',
    answer: 'Absolutely! We offer unlimited revisions until you\'re 100% satisfied with the work. Our goal is your complete satisfaction, and we won\'t consider a project complete until you\'re happy with the results.'
  },
  {
    question: 'What are your pricing packages?',
    answer: 'We offer three main packages: Starter (from $25) for single tasks and quick turnarounds, Professional (from $100) for complete research papers and medium projects, and Enterprise (from $300) for multi-deliverable projects and ongoing support. Every project also gets a custom quote based on your specific requirements.'
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
    answer: 'Absolutely! We work with clients from 190+ countries and are flexible with communication times. We ensure timely responses regardless of your location and can schedule calls at convenient times for you.'
  },
  {
    question: 'What file formats do you deliver?',
    answer: 'We deliver in any format you need: Word (.docx), PDF, Excel, LaTeX, PowerPoint, Python notebooks (.ipynb), code repositories, and more. Just specify your preferred format, and we\'ll accommodate.'
  },
  {
    question: 'Is my payment secure?',
    answer: 'Yes, all payments are processed through Payoneer\'s secure payment infrastructure, which uses bank-level encryption and is regulated by financial authorities worldwide. Your payment information is never shared with us directly.'
  },
  {
    question: 'Do you guarantee journal publication?',
    answer: 'We provide professional research support including manuscript writing, data analysis, formatting, and submission assistance. However, publication decisions are made solely by independent journal editors and peer reviewers. We do not guarantee journal acceptance. Our deliverable is a high-quality, publication-ready manuscript that you own regardless of the journal\'s decision. Our track record includes papers published in IEEE Access, Frontiers, and Wiley journals.'
  },
  {
    question: 'How does milestone-based payment work for large projects?',
    answer: 'For multi-phase projects like end-to-end research papers, we use milestone-based payments. The project is divided into clear stages (e.g., literature review, methodology, writing, submission support) — each with a defined deliverable and payment. You pay upon completion of each milestone, and you receive tangible work at every stage. You can stop at any milestone and keep all delivered work.'
  },
];

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
                <span>support@deepdivers.services</span>
              </div>
              <div className={styles.method}>
                <span>📱</span>
                <span>+92 312 5065538</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
