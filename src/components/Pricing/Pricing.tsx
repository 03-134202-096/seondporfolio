import styles from './Pricing.module.css';

const paymentMethods = [
  {
    icon: '💳',
    name: 'Credit / Debit Card',
    description: 'Visa, Mastercard, Amex via Payoneer',
  },
  {
    icon: '🏦',
    name: 'Bank Transfer',
    description: 'Direct bank transfer worldwide',
  },
  {
    icon: '🌐',
    name: 'Payoneer Balance',
    description: 'Pay directly from your Payoneer account',
  },
  {
    icon: '🛡️',
    name: 'Platform Escrow',
    description: 'Fiverr, Upwork & Freelancer escrow',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className={styles.pricing}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Pricing</span>
          <h2 className={styles.title}>Transparent & Affordable Pricing</h2>
          <p className={styles.subtitle}>
            No hidden fees. Every service in our catalog has a clear starting price.
            Browse the Service Catalog above for individual pricing, or request a custom quote below.
          </p>
        </div>

        <div className={styles.paymentSection}>
          <h3 className={styles.paymentTitle}>
            💰 Secure Payment via Payoneer
          </h3>
          <p className={styles.paymentSubtitle}>
            We use <strong>Payoneer</strong> to send you a secure payment request. You can pay
            using your preferred method — <strong>no Payoneer account needed</strong>.
            Supports clients worldwide with 150+ currencies.
          </p>
          <div className={styles.paymentGrid}>
            {paymentMethods.map((method) => (
              <div key={method.name} className={styles.paymentMethod}>
                <span className={styles.paymentIcon}>{method.icon}</span>
                <div>
                  <h4 className={styles.paymentName}>{method.name}</h4>
                  <p className={styles.paymentDesc}>{method.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.paymentFlow}>
            <div className={styles.flowStep}>
              <span className={styles.flowNumber}>1</span>
              <span>Submit your project</span>
            </div>
            <span className={styles.flowArrow}>→</span>
            <div className={styles.flowStep}>
              <span className={styles.flowNumber}>2</span>
              <span>Receive a quote</span>
            </div>
            <span className={styles.flowArrow}>→</span>
            <div className={styles.flowStep}>
              <span className={styles.flowNumber}>3</span>
              <span>Get a Payoneer payment link</span>
            </div>
            <span className={styles.flowArrow}>→</span>
            <div className={styles.flowStep}>
              <span className={styles.flowNumber}>4</span>
              <span>Pay &amp; we start work</span>
            </div>
          </div>
        </div>

        <div className={styles.customQuote}>
          <div className={styles.customQuoteContent}>
            <h3>Need a Custom Quote?</h3>
            <p>Every project is unique. Tell us your requirements and we will create a tailored package just for you.</p>
          </div>
          <a href="#contact" className={styles.customQuoteCta}>
            Request Custom Quote →
          </a>
        </div>
      </div>
    </section>
  );
}
