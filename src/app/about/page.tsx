import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About Us — Expert Research, Data Science & AI Team',
  description:
    'Meet DeepDivers — published researchers & data scientists offering 60+ services worldwide. Unlimited revisions, 24/7 support. From $25.',
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
      'Published researchers and experienced professionals offering 60+ services worldwide. Unlimited revisions, refund guarantee.',
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
          'Meet the DeepDivers team — published researchers, data scientists, and developers offering 60+ professional services worldwide.',
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
        '@type': 'Person',
        name: 'Asad Farooq',
        jobTitle: 'Founder & Team Lead',
        worksFor: { '@id': `${siteUrl}/#organization` },
        description:
          'Computer science graduate with a strong foundation in academic publishing, machine learning, and full-stack development.',
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
        url: siteUrl,
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
      'If we fail to deliver what was promised or miss the agreed deadline, you receive a full or partial refund. No questions asked.',
  },
  {
    icon: '🔒',
    title: '100% Confidential',
    description:
      'Your data, research, and project details are strictly private. We never share, publish, or reuse client work.',
  },
  {
    icon: '⏱️',
    title: 'On-Time Delivery',
    description:
      'Every project comes with a clear timeline. We commit to deadlines and deliver — or your money back.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Hand Over Your Project',
    description:
      'Submit your requirements through our platform. Describe the task, attach files, set your budget and timeline.',
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
  { value: '60+', label: 'Professional Services' },
  { value: '190+', label: 'Countries Served' },
  { value: '100%', label: 'Satisfaction Guarantee' },
  { value: '24/7', label: 'Support Available' },
];

export default function AboutPage() {
  return (
    <main className={styles.aboutPage}>
      <AboutPageJsonLd />
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>About DeepDivers</span>
            <h1 className={styles.heroTitle}>
              Your Tasks. <span className={styles.highlight}>Our Experts.</span> Done Right.
            </h1>
            <p className={styles.heroDescription}>
              DeepDivers is a professional task-handoff platform. You delegate your research, 
              data science, AI, and development projects to us — and we assign dedicated experts 
              who deliver with precision, on time, every time.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/#service-catalog" className={styles.btnPrimary}>
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
              We believe that brilliant ideas should never be held back by the complexity 
              of execution. Whether you&apos;re a researcher needing a manuscript formatted for 
              a top-tier journal, a student working on a thesis, or a business requiring 
              AI-driven data solutions — <strong>you shouldn&apos;t have to do it all yourself</strong>.
            </p>
            <p className={styles.missionText}>
              DeepDivers exists to bridge the gap between your vision and professional-grade 
              execution. Hand over your project, and let our dedicated team of researchers, 
              data scientists, and developers bring it to life.
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
            A specialized team based in Pakistan, serving clients across 190+ countries.
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
                Computer science graduate with a strong foundation in academic publishing, 
                machine learning, and full-stack development. Leading DeepDivers with a 
                mission to deliver world-class research and technology solutions.
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
                Beyond our team lead, DeepDivers operates with a network of dedicated 
                researchers, data analysts, content writers, and developers — each assigned 
                to projects that match their specialized expertise.
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
          <h2 className={styles.ctaTitle}>Ready to Hand Over Your Project?</h2>
          <p className={styles.ctaDescription}>
            Browse our catalog of 60+ services, get a free quote, and let our experts 
            handle the rest. No commitment required.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/#service-catalog" className={styles.btnPrimary}>
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
  );
}
