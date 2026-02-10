import styles from './Pricing.module.css';
import { isPromoActive, PROMO_CONFIG, getDiscountedPrice } from '@/config/promo';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$25',
    period: 'starting from',
    description: 'Perfect for quick tasks, single deliverables, and small-scope projects.',
    badge: null,
    features: [
      'Single task or document',
      'Copyediting & proofreading',
      'Citation formatting (any style)',
      'Basic data entry or cleaning',
      'Chart or graph creation',
      'Email or cover letter drafting',
      'Abstract or summary writing',
      '1–3 day delivery',
      '1 round of revisions',
      'Email support',
    ],
    cta: 'Get Started',
    href: '#contact',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$100',
    period: 'starting from',
    description: 'Best for research projects, data analysis, and comprehensive academic work.',
    badge: 'Most Popular',
    features: [
      'Everything in Starter, plus:',
      'Research paper writing & editing',
      'Literature review & gap analysis',
      'Statistical analysis (SPSS/Python/R)',
      'Data visualization & infographics',
      'ML/AI model training & tuning',
      'Systematic review support',
      'LaTeX formatting & typesetting',
      'Presentation & poster design',
      '5–10 day delivery',
      'Unlimited revisions',
      'Priority WhatsApp support',
    ],
    cta: 'Order Now',
    href: '#contact',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$300',
    period: 'starting from',
    description: 'Full-scale solutions for complex research, development, and long-term projects.',
    badge: null,
    features: [
      'Everything in Professional, plus:',
      'Full-stack web development (Next.js/Nest.js)',
      'AWS deployment & cloud infrastructure',
      'End-to-end research pipeline',
      'Grant proposal writing',
      'Complete thesis or dissertation support',
      'Web scraping & dataset curation',
      'Custom AI/ML experiment execution',
      'Meta ads campaign management',
      'Dedicated project manager',
      'Custom timeline & milestones',
      '24/7 priority support',
    ],
    cta: 'Contact Us',
    href: '#contact',
    highlighted: false,
  },
];

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
  const promoActive = isPromoActive();

  return (
    <section id="pricing" className={styles.pricing}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Pricing</span>
          <h2 className={styles.title}>Transparent & Affordable Pricing</h2>
          <p className={styles.subtitle}>
            No hidden fees. Choose a package that fits your needs — or request a custom quote
            for your specific project.
          </p>
          {promoActive && (
            <div className={styles.promoBadge}>
              {PROMO_CONFIG.PROMO_LABEL} — {PROMO_CONFIG.DISCOUNT_PERCENT}% OFF All Plans
            </div>
          )}
        </div>

        <div className={styles.plansGrid}>
          {pricingPlans.map((plan) => {
            const discount = promoActive ? getDiscountedPrice(plan.price) : null;

            return (
              <div
                key={plan.name}
                className={`${styles.planCard} ${plan.highlighted ? styles.planHighlighted : ''}`}
              >
                {plan.badge && <span className={styles.planBadge}>{plan.badge}</span>}
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.planPrice}>
                  {discount ? (
                    <>
                      <span className={styles.priceOriginal}>{discount.original}</span>
                      <span className={styles.priceAmount}>{discount.discounted}</span>
                    </>
                  ) : (
                    <span className={styles.priceAmount}>{plan.price}</span>
                  )}
                  <span className={styles.pricePeriod}>{plan.period}</span>
                </div>
                <p className={styles.planDescription}>{plan.description}</p>
                <a
                  href={plan.href}
                  className={`${styles.planCta} ${plan.highlighted ? styles.planCtaHighlighted : ''}`}
                >
                  {plan.cta}
                </a>
                <ul className={styles.featureList}>
                  {plan.features.map((feature) => (
                    <li key={feature} className={styles.featureItem}>
                      <span className={styles.featureCheck}>
                        {feature.startsWith('Everything') ? '🔥' : '✓'}
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className={styles.paymentSection}>
          <h3 className={styles.paymentTitle}>
            💰 Secure Payment via Payoneer
          </h3>
          <p className={styles.paymentSubtitle}>
            We use <strong>Payoneer</strong> to send you a secure payment request. You can pay
            using your preferred method — <strong>no Payoneer account needed</strong>.
            Supports 190+ countries and 150+ currencies.
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
