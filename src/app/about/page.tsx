import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { founderPerson } from '@/config/site';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About DeepDivers: Published Research Team',
  description:
    'Meet DeepDivers: a research support team led by published AI researcher Asad Farooq, helping students and researchers worldwide. You stay the author.',
  keywords: [
    'about DeepDivers',
    'freelance research team',
    'hire data scientist',
    'academic writing experts',
    'machine learning freelancer',
    'AI development team',
    'professional research services',
    'Asad Farooq researcher',
  ],
  alternates: {
    canonical: 'https://deepdivers.services/about',
  },
  openGraph: {
    title: 'About DeepDivers — Expert Research & Data Science Team',
    description:
      'A research support team led by published AI researcher Asad Farooq: statistics, editing, formatting, systematic reviews and ML research.',
    url: 'https://deepdivers.services/about',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

/**
 * Structured data for the About page — AboutPage, BreadcrumbList, and Person schema.
 */
function AboutPageJsonLd() {
  const siteUrl = 'https://deepdivers.services';

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${siteUrl}/about#webpage`,
        url: `${siteUrl}/about`,
        name: 'About DeepDivers — Expert Research, Data Science & AI Team',
        description:
          'Meet the DeepDivers team — published researchers, data scientists, and developers offering 90+ professional services worldwide.',
        isPartOf: { '@id': `${siteUrl}/#website` },
        dateModified: '2026-02-19',
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: `${siteUrl}/about` },
        ],
      },
      {
        ...founderPerson,
        jobTitle: 'Founder & Team Lead',
        description:
          'Computer science graduate with a strong background in AI, machine learning, academic publishing, and full-stack development.',
        knowsAbout: [
          'Machine Learning',
          'Deep Learning',
          'Python',
          'Data Science',
          'Next.js',
          'Academic Research',
          'LaTeX',
          'AWS',
        ],
        image: `${siteUrl}/ProfilePicture.webp`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}

const guarantees = [
  {
    icon: '🔄',
    title: 'Unlimited Revisions',
    description:
      'Not satisfied with a deliverable? We revise until you are — at no extra cost. Your satisfaction is non-negotiable.',
  },
  {
    icon: '💰',
    title: 'Refund Guarantee',
    description:
      'If we fail to deliver what was agreed or miss the deadline for reasons within our control, you receive a full or partial refund under our Refund Policy.',
  },
  {
    icon: '🔒',
    title: 'Confidential',
    description:
      'Your data, research, and project details are strictly private. We never share, publish, or reuse client work.',
  },
  {
    icon: '⏱️',
    title: 'On-Time Delivery',
    description:
      'Every project comes with a clear timeline agreed before work starts, and we keep you updated if anything changes.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Share Your Brief',
    description:
      'Send your requirements, files, budget and deadline through the quote form, email or WhatsApp. An NDA is available on request.',
  },
  {
    step: '02',
    title: 'We Assign a Dedicated Expert',
    description:
      'A qualified researcher, data scientist, or developer is assigned to your project based on the domain and complexity.',
  },
  {
    step: '03',
    title: 'Track Progress & Collaborate',
    description:
      'Receive regular updates via WhatsApp or email. Request changes anytime — we work with you, not in isolation.',
  },
  {
    step: '04',
    title: 'Review, Revise & Approve',
    description:
      'Review the deliverables. Request unlimited revisions until you are fully satisfied. Then approve and we finalize.',
  },
];

const stats = [
  { value: '90+', label: 'Professional Services' },
  { value: '190+', label: 'Clients Worldwide' },
  { value: '5', label: 'Peer-Reviewed Papers' },
  { value: '24/7', label: 'Support Available' },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.aboutPage}>
        <AboutPageJsonLd />

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <span className={styles.badge}>About DeepDivers</span>
              <h1 className={styles.heroTitle}>
                Published researchers. <span className={styles.highlight}>Practical research support.</span>
              </h1>
              <p className={styles.heroDescription}>
                DeepDivers is a research support team led by Asad Farooq, an AI researcher with
                five peer-reviewed papers. We help students, researchers and organisations worldwide
                with statistics, editing, formatting, systematic reviews and machine learning
                experiments, and you stay the author of your work.
              </p>
              <div className={styles.heroButtons}>
                <Link href="/services" className={styles.btnPrimary}>
                  Browse Services →
                </Link>
                <Link href="/#contact" className={styles.btnSecondary}>
                  Get a Free Quote
                </Link>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/ProfilePicture.webp"
                  alt="Asad Farooq — Team Lead at DeepDivers"
                  width={400}
                  height={400}
                  className={styles.heroImage}
                  priority
                />
              </div>
              <div className={styles.imageBadge}>
                <strong>Asad Farooq</strong>
                <span>Founder & Team Lead</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className={styles.mission}>
          <div className={styles.container}>
            <div className={styles.missionContent}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.missionText}>
                We believe good research deserves clear analysis, clean writing and correct
                formatting. Whether you&apos;re preparing a manuscript for a top-tier journal,
                analysing thesis data, running a systematic review or building an AI model, we
                support you at the steps that slow you down, while <strong>the ideas, the writing
                and the credit stay yours</strong>.
              </p>
              <p className={styles.missionText}>
                We work with clients across time zones, quote in US dollars, keep every file
                confidential, and explain our work so you can present and defend it with
                confidence.
              </p>
            </div>
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statCard}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.howItWorks}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>
              From submission to delivery — a streamlined process designed for your convenience.
            </p>
            <div className={styles.stepsGrid}>
              {howItWorks.map((item) => (
                <div key={item.step} className={styles.stepCard}>
                  <div className={styles.stepNumber}>{item.step}</div>
                  <h3 className={styles.stepTitle}>{item.title}</h3>
                  <p className={styles.stepDescription}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className={styles.guarantees}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Guarantees</h2>
            <p className={styles.sectionSubtitle}>
              We stand behind every project with clear, enforceable commitments.
            </p>
            <div className={styles.guaranteesGrid}>
              {guarantees.map((g) => (
                <div key={g.title} className={styles.guaranteeCard}>
                  <div className={styles.guaranteeIcon}>{g.icon}</div>
                  <h3 className={styles.guaranteeTitle}>{g.title}</h3>
                  <p className={styles.guaranteeDescription}>{g.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.team}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Meet the Team</h2>
            <p className={styles.sectionSubtitle}>
              A specialized team of AI and computer science professionals with 3+ years of academic services experience, collaborating with researchers worldwide.
            </p>
            <div className={styles.teamContent}>
              <div className={styles.teamCard}>
                <div className={styles.teamImageWrapper}>
                  <Image
                    src="/ProfilePicture.webp"
                    alt="Asad Farooq — Founder & Team Lead"
                    width={200}
                    height={200}
                    className={styles.teamImage}
                  />
                </div>
                <h3>Asad Farooq</h3>
                <span className={styles.teamRole}>Founder & Team Lead</span>
                <p className={styles.teamBio}>
                  Computer science graduate with a strong background in AI, machine learning, and
                  academic publishing. Leading DeepDivers with a mission to deliver world-class
                  research and technology solutions to clients globally.
                </p>
                <div className={styles.teamCredentials}>
                  <span>📊 Python & Data Science</span>
                  <span>🤖 ML/DL Frameworks</span>
                  <span>💻 Next.js & Nest.js</span>
                  <span>☁️ AWS Services</span>
                  <span>📝 LaTeX Expert</span>
                </div>
              </div>
              <div className={styles.teamInfo}>
                <h3>Dedicated Experts at Your Service</h3>
                <p>
                  Beyond our team lead, DeepDivers operates with a dedicated network of
                  researchers, data analysts, content writers, and developers — each with
                  backgrounds in AI and computer science and 3+ years of hands-on experience
                  in academic services. Every team member is assigned to projects that match
                  their specialized expertise.
                </p>
                <ul className={styles.teamHighlights}>
                  <li>✅ Domain-matched experts for every project</li>
                  <li>✅ Peer-reviewed quality assurance</li>
                  <li>✅ Direct communication throughout the project</li>
                  <li>✅ Available across all major freelancing platforms</li>
                  <li>✅ Published researchers with real-world credentials</li>
                </ul>
                <div className={styles.platformBadges}>
                  <span className={styles.platformBadge}>🟢 Fiverr</span>
                  <span className={styles.platformBadge}>🟢 Upwork</span>
                  <span className={styles.platformBadge}>🔵 Freelancer</span>
                  <span className={styles.platformBadge}>🔵 GitHub</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaDescription}>
              Browse our services, get a free quote within 24 hours, and work with published
              researchers. No commitment required.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/services" className={styles.btnPrimary}>
                Browse Services →
              </Link>
              <Link href="/#contact" className={styles.btnSecondary}>
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Back to Home */}
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
