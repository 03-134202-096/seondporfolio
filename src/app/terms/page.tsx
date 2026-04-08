import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './terms.module.css';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'DeepDivers Terms & Conditions — Refund policy, delivery guarantees, unlimited revisions, confidentiality, and payment terms.',
  alternates: {
    canonical: 'https://deepdivers.services/terms',
  },
  openGraph: {
    title: 'Terms & Conditions | DeepDivers',
    description:
      'Clear, fair, and transparent policies governing DeepDivers services. Refund policy, delivery guarantees, and confidentiality.',
    url: 'https://deepdivers.services/terms',
    type: 'website',
  },
};

const sections = [
  {
    id: 'overview',
    title: '1. Overview',
    content: [
      'These Terms & Conditions ("Terms") govern the use of services provided by DeepDivers ("we," "us," "our") through our website deepdivers.services and associated platforms.',
      'By placing an order or engaging our services, you ("the Client") agree to these Terms in full. If you do not agree with any part of these Terms, please do not use our services.',
    ],
  },
  {
    id: 'services',
    title: '2. Services',
    content: [
      'DeepDivers provides professional research support, data science solutions, content writing, development, and document formatting services as listed in our Service Catalog.',
      'All services are performed by qualified professionals and are subject to the scope, budget, and timeline agreed upon during the quote process.',
      'We reserve the right to decline any project that falls outside our expertise or violates ethical standards.',
    ],
  },
  {
    id: 'pricing',
    title: '3. Pricing & Payment',
    content: [
      'All prices listed on our website are starting prices. Final pricing is determined based on project complexity, scope, and timeline.',
      'Payment is processed securely through Payoneer. We accept credit cards, debit cards, bank transfers, and Payoneer balance. No Payoneer account is required for clients.',
      'For project-based payments, full or partial payment is required before work begins, as agreed in the quote.',
      'For milestone-based payments, payment is due upon completion of each agreed milestone.',
      'Promotional discounts are applied at the time of quote and are subject to the promotional period. Discounts cannot be combined or applied retroactively.',
    ],
  },
  {
    id: 'delivery',
    title: '4. Delivery Guarantees',
    content: [
      'Every project includes a clearly defined delivery timeline agreed upon before work begins.',
      'We are committed to delivering all projects on or before the agreed deadline.',
      'If we fail to deliver within the agreed timeline due to reasons within our control, the Client is entitled to a full or partial refund as outlined in our Refund Policy below.',
      'Delivery timelines may be extended if the Client requests additional scope, provides materials late, or is unresponsive to required communications.',
      'Deliverables are sent via email, WhatsApp, or the platform through which the order was placed.',
    ],
  },
  {
    id: 'revisions',
    title: '5. Revision Policy',
    content: [
      'All projects include unlimited revisions at no additional cost. There are no hidden charges for revision requests — what you agree to pay is what you pay.',
      'Once you receive your deliverables, you may request as many revisions as needed until you are fully satisfied with the work.',
      'Revision requests must fall within the original project scope. Requests for entirely new features or expanded deliverables beyond the agreed scope are treated as a new project and quoted separately.',
      'We commit to completing revision rounds within 1–3 business days, depending on complexity.',
      'For milestone-based projects, revisions are handled at each milestone before proceeding to the next phase. You review and approve each milestone before payment is due for the next one.',
    ],
  },
  {
    id: 'refund',
    title: '6. Refund Policy',
    content: [
      'We believe in fair and transparent refund practices. Refund eligibility depends on the stage of work and the circumstances:',
    ],
    list: [
      {
        title: 'Full Refund',
        description:
          'Issued if we miss an agreed deadline due to reasons within our control and the delay renders the work unusable, or if the deliverable is fundamentally different from what was agreed upon and cannot be corrected through revisions. If a mistake on our end makes the completed work unsuitable for its intended purpose, a full refund is provided without dispute.',
      },
      {
        title: 'Partial Refund',
        description:
          'Issued when work has been partially completed and resources have been utilized. The refund amount is determined based on how much of the project has been completed and the resources invested. For example, if 60% of the work is done, a refund for the remaining 40% may be issued. Partial refunds also apply when deliverables require rework beyond the originally agreed scope.',
      },
      {
        title: 'No Refund',
        description:
          'Applies if the Client changes requirements after work has begun without mutual agreement, if the Client is unresponsive for more than 7 days during the project, or if the deliverable meets the originally agreed specifications and has been approved at a milestone.',
      },
    ],
    footer: [
      'For milestone-based payments, each milestone is reviewed and approved before proceeding. Payments are made only after you verify and accept the deliverable at each stage — ensuring you always receive value before paying.',
      'Refund requests must be submitted within 14 days of delivery via email at support@deepdivers.services.',
      'Refunds are processed within 5–10 business days through the original payment method.',
    ],
  },
  {
    id: 'confidentiality',
    title: '7. Confidentiality',
    content: [
      'We treat all Client data, project materials, and communications as strictly confidential.',
      'We will never share, publish, resell, or reuse any Client work, data, or intellectual property without explicit written consent.',
      'All team members and collaborators are bound by non-disclosure obligations.',
      'Upon project completion, Client data and files are retained for up to 30 days for revision purposes, after which they are permanently deleted upon request.',
    ],
  },
  {
    id: 'intellectual-property',
    title: '8. Intellectual Property',
    content: [
      'Upon full payment, all intellectual property rights to the deliverables are transferred to the Client.',
      'We retain no ownership or usage rights over completed work after payment.',
      'We may request permission to include anonymized project summaries in our portfolio. This is entirely optional and never done without Client consent.',
    ],
  },
  {
    id: 'communication',
    title: '9. Communication & Support',
    content: [
      'Our team is available 24/7 via email (support@deepdivers.services) and WhatsApp (+92 312 5065538).',
      'We aim to respond to all inquiries within 2–4 hours during business hours (9 AM – 12 AM PKT).',
      'Clients are expected to provide timely feedback and required materials to avoid delays in project delivery.',
    ],
  },
  {
    id: 'publication-disclaimer',
    title: '10. Publication Disclaimer',
    content: [
      'DeepDivers provides professional research support services including manuscript preparation, data analysis, statistical consulting, formatting, and submission assistance.',
      'Publication decisions are made solely by independent journal editors and peer reviewers. We do not guarantee journal acceptance, publication, or any specific academic outcome.',
      'Our End-to-End Publication Support service includes research, writing, formatting, and submission assistance. The deliverable is a publication-ready manuscript — not a published paper. The Client receives full value through the completed manuscript, data, and code regardless of the journal\'s editorial decision.',
      'For milestone-based projects, each milestone represents a tangible deliverable (e.g., literature review report, methodology document, complete manuscript). Completed milestones are non-refundable as the work product has been delivered to the Client.',
    ],
  },
  {
    id: 'milestone-payments',
    title: '11. Milestone-Based Payment Structure',
    content: [
      'For large or multi-phase projects (e.g., end-to-end research paper development), we use a milestone-based payment structure to ensure transparency and shared commitment.',
      'Each milestone has a clearly defined deliverable, timeline, and payment amount agreed upon before work begins.',
      'Payment for each milestone is due upon its completion and delivery. Completed milestone payments are non-refundable as the corresponding work product has been delivered.',
      'The Client may choose to discontinue the project at any milestone. In such cases, all work completed up to that point is delivered to the Client, and no further charges apply.',
      'Milestone structures are customized per project and confirmed in writing before work begins.',
    ],
  },
  {
    id: 'liability',
    title: '12. Limitation of Liability',
    content: [
      'DeepDivers provides services on a best-effort basis and does not guarantee specific academic outcomes such as journal acceptance, grades, or funding decisions.',
      'Our liability is limited to the amount paid for the specific service in question.',
      'We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.',
    ],
  },
  {
    id: 'changes',
    title: '13. Changes to Terms',
    content: [
      'We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated effective date.',
      'Continued use of our services after changes constitutes acceptance of the updated Terms.',
    ],
  },
];

export default function TermsPage() {
  return (
    <main className={styles.termsPage}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>Legal</span>
          <h1 className={styles.heroTitle}>Terms & Conditions</h1>
          <p className={styles.heroDescription}>
            Clear, fair, and transparent policies governing our services. 
            Last updated: March 2026.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <nav className={styles.toc}>
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

          <div className={styles.contact}>
            <h3>Questions About Our Terms?</h3>
            <p>
              If you have any questions or concerns about these Terms & Conditions, 
              please contact us at{' '}
              <a href="mailto:support@deepdivers.services">support@deepdivers.services</a>{' '}
              or via{' '}
              <a href="https://wa.me/923125065538" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>.
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
  );
}
