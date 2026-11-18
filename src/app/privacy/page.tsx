import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'DeepDivers Privacy Policy — how we collect, use, and protect your personal information, and the third-party services (including Google AdSense, Google Analytics, Payoneer, Resend) that power this site.',
  alternates: {
    canonical: 'https://deepdivers.services/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | DeepDivers',
    description:
      'How DeepDivers collects, uses, and protects your personal data. Includes disclosures for Google AdSense, Google Analytics, Payoneer, and other third-party services.',
    url: 'https://deepdivers.services/privacy',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

const EFFECTIVE_DATE = 'November 2, 2026';

type ListItem = { title: string; description: string };

type Section = {
  id: string;
  title: string;
  content: string[];
  list?: ListItem[];
  footer?: string[];
};

const sections: Section[] = [
  {
    id: 'overview',
    title: '1. Overview',
    content: [
      'This Privacy Policy explains how DeepDivers ("we," "us," "our") collects, uses, discloses, and protects personal information when you visit deepdivers.services (the "Site") or engage our professional research, data science, machine-learning, and development services (the "Services").',
      'DeepDivers is operated from Islamabad, Pakistan, and provides services to clients worldwide. By using the Site or ordering Services, you agree to the practices described in this Policy. If you do not agree, please do not use the Site or submit personal information through it.',
      `Effective date: ${EFFECTIVE_DATE}.`,
    ],
  },
  {
    id: 'controller',
    title: '2. Data Controller & Contact',
    content: [
      'For the purposes of the EU/UK General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), and comparable laws, DeepDivers is the data controller of the personal information collected through this Site.',
      'For any privacy question, data-access request, deletion request, or opt-out request, contact us at teamdeepdivers@gmail.com or via WhatsApp at +92 312 5065538. We respond to privacy requests within 30 days (sooner where required by law).',
    ],
  },
  {
    id: 'information-we-collect',
    title: '3. Information We Collect',
    content: [
      'We collect only the information needed to provide, improve, and secure our Services. The categories below reflect the actual data flows on this Site.',
    ],
    list: [
      {
        title: 'Information you provide through the contact / quote form',
        description:
          'Your name, email address, selected service category, project description, and (optionally) a project file attachment up to 4 MB. This information is submitted to our transactional email provider (Resend) and delivered to our support inbox so we can respond with a quote.',
      },
      {
        title: 'Information you provide through the newsletter form',
        description:
          'Your email address only. The form posts to formsubmit.co, which delivers the email address to our team inbox so we can send occasional service updates. You can unsubscribe at any time by replying to any newsletter message.',
      },
      {
        title: 'Information you provide during a project engagement',
        description:
          'During active projects, you may share additional project materials over email, WhatsApp, or the platform through which you placed the order (for example, Fiverr or Upwork). We treat all such materials as confidential per our Terms & Conditions.',
      },
      {
        title: 'Payment information',
        description:
          'Payments are processed by Payoneer. We do not collect, store, or have access to your full card number, bank account number, or Payoneer credentials. Payoneer provides us only with a payment confirmation (payer name, email, and amount). Payoneer\'s own privacy practices are described at https://www.payoneer.com/legal/privacy-policy/.',
      },
      {
        title: 'Automatically collected technical information',
        description:
          'When you visit the Site, we and our third-party service providers automatically receive certain information from your browser and device: IP address, approximate geographic location (country/region), browser type and version, operating system, pages viewed, referring URL, device identifiers set by cookies, and timestamps. This information is used for analytics, security, and advertising as described below.',
      },
      {
        title: 'Cookies and similar technologies',
        description:
          'The Site uses cookies, pixels, local storage, and similar technologies to run the Site, measure traffic, and serve advertising. See Section 5 for details and your choices.',
      },
    ],
    footer: [
      'We do not knowingly collect sensitive personal information (such as government IDs, health data, or financial-account numbers) through the Site. Please do not submit sensitive information in the contact form or newsletter.',
    ],
  },
  {
    id: 'how-we-use',
    title: '4. How We Use Your Information',
    content: [
      'We use personal information for the following purposes:',
    ],
    list: [
      {
        title: 'To respond to inquiries and deliver Services',
        description:
          'Preparing quotes, communicating about projects, delivering completed work, issuing refunds, and providing customer support.',
      },
      {
        title: 'To send transactional and service-related emails',
        description:
          'Order confirmations, milestone updates, invoices, revision notifications, and support replies.',
      },
      {
        title: 'To send newsletters and marketing',
        description:
          'If you subscribed through the newsletter form, to send occasional updates about new Services and research insights. You can unsubscribe at any time.',
      },
      {
        title: 'To operate, secure, and improve the Site',
        description:
          'Including analytics on which pages are most useful, detecting fraud and abuse, debugging errors, and improving page performance.',
      },
      {
        title: 'To serve relevant advertising',
        description:
          'The Site participates in the Google AdSense program. Google and its partners use cookies and device identifiers to serve ads based on your prior visits to this Site and other websites, as described in Section 6.',
      },
      {
        title: 'To comply with legal obligations',
        description:
          'Including responding to lawful requests from authorities, enforcing our Terms & Conditions, and keeping accounting records as required by applicable law.',
      },
    ],
  },
  {
    id: 'cookies',
    title: '5. Cookies & Similar Technologies',
    content: [
      'A cookie is a small text file that a website places on your device so the site can recognise you on your next visit. The Site uses the following categories of cookies and similar technologies:',
    ],
    list: [
      {
        title: 'Strictly necessary',
        description:
          'Required for core Site functionality — for example, remembering that you dismissed a promotional banner, or preserving your form input while you add an attachment. These cookies cannot be switched off from within the Site.',
      },
      {
        title: 'Analytics',
        description:
          'Set by Google Analytics 4 (GA4) via the Google tag. These cookies help us understand which pages, services, and blog posts are most useful to visitors. Google Analytics is integrated through the official @next/third-parties/google component and only loads when a measurement ID is configured.',
      },
      {
        title: 'Advertising',
        description:
          'Set by Google AdSense and its advertising partners to serve ads that may be relevant to you, measure ad performance, and prevent the same ad from being shown too often. See Section 6 for the full list of controls and opt-outs.',
      },
    ],
    footer: [
      'Most browsers let you refuse or delete cookies through their settings. Blocking all cookies will not prevent you from reading content on the Site, but some features (such as remembering that you dismissed a banner) may not work as intended, and some ads may be less relevant to you.',
    ],
  },
  {
    id: 'google-advertising',
    title: '6. Google AdSense & Advertising',
    content: [
      'The Site displays advertisements served by Google AdSense (publisher ID pub-6022663985859466) with Auto ads enabled. This section is the formal disclosure Google requires publishers to make.',
      'Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this Site and other websites.',
      'Google\'s use of advertising cookies enables Google and its partners to serve ads to you based on your visit to this Site and/or other sites on the internet.',
      'You may opt out of personalised advertising by Google by visiting Google Ads Settings at https://adssettings.google.com, and you may opt out of a third-party vendor\'s use of cookies for personalised advertising by visiting https://optout.aboutads.info and https://optout.networkadvertising.org.',
      'For visitors in the European Economic Area, the United Kingdom, or Switzerland, we use a Google-certified Consent Management Platform (Google Funding Choices) to request your consent for personalised advertising, in line with the IAB Transparency and Consent Framework and the Google EU user consent policy. You can change your consent choices at any time via the Site\'s consent-management link, which the CMP displays after your first visit.',
      'For visitors in California, Virginia, Colorado, Connecticut, Utah, and other U.S. states granting a right to opt out of the "sale" or "sharing" of personal information for targeted advertising, you may exercise that right by configuring your browser to send a Global Privacy Control (GPC) signal, by using Google Ads Settings, or by emailing teamdeepdivers@gmail.com with the subject "Do Not Sell or Share My Personal Information."',
      'A list of the third-party vendors that may participate in Google ad auctions on this Site, together with their own privacy policies, is published at https://support.google.com/admanager/answer/9012903.',
      'For a complete description of how Google uses information from sites and apps that use its services, see https://policies.google.com/technologies/partner-sites.',
    ],
  },
  {
    id: 'analytics',
    title: '7. Google Analytics',
    content: [
      'The Site uses Google Analytics 4 to measure how visitors use the Site. Google Analytics sets cookies and processes information such as pages viewed, time on page, referrer, device type, and approximate geographic region. IP addresses are anonymised by Google before storage, and we do not share any directly-identifying information (such as name or email) with Google Analytics.',
      'You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on available at https://tools.google.com/dlpage/gaoptout.',
    ],
  },
  {
    id: 'third-parties',
    title: '8. Other Third-Party Service Providers',
    content: [
      'We use the following vetted third-party processors to run the Site. Each processor is bound by its own privacy policy and, where applicable, by a data-processing agreement with us.',
    ],
    list: [
      {
        title: 'Resend (transactional email)',
        description:
          'Delivers quote-request emails from the contact form to our support inbox. Resend processes the name, email, service, message, and any file attachment you submit. See https://resend.com/legal/privacy-policy.',
      },
      {
        title: 'Formsubmit.co (newsletter form)',
        description:
          'Relays newsletter sign-ups to our team inbox. Formsubmit processes only the email address you submit. See https://formsubmit.co/.',
      },
      {
        title: 'Payoneer (payments)',
        description:
          'Processes all payments. Payoneer independently collects the payment information required to complete the transaction. See https://www.payoneer.com/legal/privacy-policy/.',
      },
      {
        title: 'Google LLC (AdSense, Analytics, Fonts)',
        description:
          'Serves advertising, measures traffic, and delivers the web fonts used on this Site. See https://policies.google.com/privacy.',
      },
      {
        title: 'Vercel (hosting)',
        description:
          'The Site is deployed on Vercel, which processes request logs and may store IP addresses briefly for security and reliability. See https://vercel.com/legal/privacy-policy.',
      },
      {
        title: 'WhatsApp (optional support channel)',
        description:
          'If you contact us via the WhatsApp link, your message is processed by Meta Platforms under the WhatsApp Privacy Policy at https://www.whatsapp.com/legal/privacy-policy.',
      },
    ],
    footer: [
      'We do not sell your personal information for money. Some advertising-related data transfers under the CCPA/CPRA definitions can qualify as a "sale" or "sharing"; see Section 6 for how to opt out of those transfers.',
    ],
  },
  {
    id: 'legal-bases',
    title: '9. Legal Bases for Processing (EEA / UK)',
    content: [
      'If you are in the European Economic Area, the United Kingdom, or Switzerland, we rely on the following legal bases under Articles 6 and 7 of the GDPR / UK GDPR:',
    ],
    list: [
      {
        title: 'Contract',
        description:
          'To respond to your quote request, deliver the Services you have ordered, and manage the payment and refund process.',
      },
      {
        title: 'Legitimate interests',
        description:
          'To secure the Site against fraud and abuse, to measure traffic through privacy-respecting analytics, and to send service-related communications you would reasonably expect.',
      },
      {
        title: 'Consent',
        description:
          'For non-essential cookies, personalised advertising, and newsletter subscriptions. You can withdraw consent at any time without affecting the lawfulness of processing before withdrawal.',
      },
      {
        title: 'Legal obligation',
        description:
          'To comply with accounting, tax, and law-enforcement obligations where applicable.',
      },
    ],
  },
  {
    id: 'international-transfers',
    title: '10. International Data Transfers',
    content: [
      'DeepDivers is based in Pakistan, and some of our processors (notably Google, Resend, Formsubmit, Vercel, and Payoneer) are headquartered in the United States and the European Union. When personal information is transferred internationally, we rely on Standard Contractual Clauses, Adequacy Decisions, or other lawful transfer mechanisms made available by the processor.',
      'By submitting personal information through the Site, you acknowledge that your information may be processed outside the country where you reside.',
    ],
  },
  {
    id: 'retention',
    title: '11. Data Retention',
    content: [
      'We retain personal information only for as long as needed to fulfil the purposes described in this Policy, or as required by law.',
    ],
    list: [
      {
        title: 'Quote-request submissions',
        description:
          'Retained for up to 24 months in our support inbox so we can follow up on multi-stage engagements. After that, non-converted inquiries are deleted or anonymised.',
      },
      {
        title: 'Project files and deliverables',
        description:
          'Retained for 30 days after final delivery for revision purposes, then deleted on your written request. We may keep an anonymised, non-identifying summary for portfolio or case-study purposes only with your explicit consent.',
      },
      {
        title: 'Payment records',
        description:
          'Retained for the period required by applicable tax and accounting rules (typically 5–7 years).',
      },
      {
        title: 'Analytics data',
        description:
          'Google Analytics 4 standard retention: 14 months, after which event-level data is automatically deleted by Google.',
      },
      {
        title: 'Advertising identifiers',
        description:
          'Cookie lifetimes are controlled by Google and its partners. You can clear them at any time through your browser settings.',
      },
    ],
  },
  {
    id: 'your-rights',
    title: '12. Your Rights',
    content: [
      'Depending on where you live, you may have the following rights with respect to the personal information we hold about you. We honour these rights for all users to the extent reasonably practicable, regardless of whether local law requires it.',
    ],
    list: [
      {
        title: 'Access',
        description:
          'Request a copy of the personal information we hold about you.',
      },
      {
        title: 'Rectification',
        description:
          'Ask us to correct inaccurate or incomplete information.',
      },
      {
        title: 'Erasure ("right to be forgotten")',
        description:
          'Ask us to delete personal information we no longer need for a legitimate purpose.',
      },
      {
        title: 'Restriction and objection',
        description:
          'Ask us to pause processing, or object to processing based on our legitimate interests, including direct marketing and personalised advertising.',
      },
      {
        title: 'Portability',
        description:
          'Receive personal information you provided in a structured, machine-readable format.',
      },
      {
        title: 'Opt out of "sale" or "sharing" (CCPA/CPRA and similar)',
        description:
          'Opt out of personal-information transfers for advertising purposes. See Section 6 for how.',
      },
      {
        title: 'Withdraw consent',
        description:
          'Where processing is based on consent, withdraw that consent at any time.',
      },
      {
        title: 'Lodge a complaint',
        description:
          'If you are in the EEA/UK, you can also lodge a complaint with your local supervisory authority. A list is published at https://edpb.europa.eu/about-edpb/about-edpb/members_en.',
      },
    ],
    footer: [
      'To exercise any of these rights, email teamdeepdivers@gmail.com with the subject "Privacy Request." We may need to verify your identity before responding. We do not charge a fee for reasonable requests.',
    ],
  },
  {
    id: 'security',
    title: '13. Security',
    content: [
      'We maintain reasonable administrative, technical, and physical safeguards designed to protect personal information from unauthorised access, loss, misuse, or alteration. These include encrypted transport (HTTPS/TLS 1.2+), modern HTTP security headers (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy), restricted access to our support inbox, and secure handling of project files.',
      'No internet transmission is 100% secure. If you become aware of any security issue affecting the Site, please notify us immediately at teamdeepdivers@gmail.com.',
    ],
  },
  {
    id: 'children',
    title: '14. Children’s Privacy',
    content: [
      'The Site and the Services are not directed to children under the age of 16, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can delete it.',
    ],
  },
  {
    id: 'do-not-track',
    title: '15. Do Not Track & Global Privacy Control',
    content: [
      'Browsers can send a Do Not Track (DNT) signal, and increasingly a Global Privacy Control (GPC) signal, indicating that you do not wish to be tracked for advertising purposes. There is no uniform industry interpretation of DNT, so we do not currently respond to the DNT signal. We do, however, treat a GPC signal as a valid opt-out of the "sale" and "sharing" of personal information under the CCPA/CPRA and similar U.S. state laws.',
    ],
  },
  {
    id: 'changes',
    title: '16. Changes to This Policy',
    content: [
      'We may update this Policy from time to time to reflect changes in our Services, our processors, or applicable law. When we do, we will update the effective date above and, for material changes, provide a prominent notice on the Site. Your continued use of the Site after the updated Policy becomes effective constitutes acceptance of the updated Policy.',
    ],
  },
  {
    id: 'contact',
    title: '17. How to Contact Us',
    content: [
      'If you have any question about this Policy or our privacy practices, or you want to exercise any of the rights described above, please contact us at:',
      'DeepDivers — teamdeepdivers@gmail.com — WhatsApp +92 312 5065538 — G-13, Islamabad, Pakistan.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className={styles.privacyPage}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <span className={styles.badge}>Legal</span>
            <h1 className={styles.heroTitle}>Privacy Policy</h1>
            <p className={styles.heroDescription}>
              How we collect, use, and protect your personal information — including the advertising,
              analytics, and payment partners that power this site. Last updated: {EFFECTIVE_DATE}.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.container}>
            <nav className={styles.toc} aria-label="Table of contents">
              <h3>Table of Contents</h3>
              <ul>
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>{s.title}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.sections}>
              {sections.map((section) => (
                <div key={section.id} id={section.id} className={styles.section}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  {section.content.map((paragraph, i) => (
                    <p key={i} className={styles.paragraph}>
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <div className={styles.policyList}>
                      {section.list.map((item) => (
                        <div key={item.title} className={styles.policyItem}>
                          <h4 className={styles.policyItemTitle}>{item.title}</h4>
                          <p className={styles.policyItemDesc}>{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.footer?.map((text, i) => (
                    <p key={i} className={styles.paragraph}>
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.contactBox}>
              <h3>Questions About Your Privacy?</h3>
              <p>
                Email us at{' '}
                <a href="mailto:teamdeepdivers@gmail.com">teamdeepdivers@gmail.com</a>{' '}
                or reach us on{' '}
                <a href="https://wa.me/923125065538" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>. We respond to privacy requests within 30 days.
              </p>
            </div>
          </div>
        </section>

        <div className={styles.backHome}>
          <Link href="/" className={styles.backHomeLink}>
            ← Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
