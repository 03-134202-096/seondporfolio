import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://deepdivers.services";

// Viewport & theme-color — split from metadata per Next.js 15+ convention.
// This ensures correct mobile scaling, dark-mode theme color, and PWA presentation.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0066ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "DeepDivers | Research Paper Writing, Data Analysis, ML/AI & Development Services",
    template: "%s | DeepDivers",
  },
  description:
    "Hire published researchers & data scientists for research papers, data analysis, ML/AI model training, web scraping, LaTeX formatting, Next.js development & more. 90+ services, unlimited revisions, 24/7 support — from $25.",
  applicationName: "DeepDivers",
  keywords: [
    // Core research & academic
    "research paper writing services",
    "academic writing help",
    "hire someone to write research paper",
    "Q1 journal paper writing",
    "research paper editing service",
    "manuscript formatting",
    "thesis writing help",
    "dissertation assistance",
    "systematic review services",
    "meta-analysis services",
    "literature review writing",
    "research methodology help",
    "PRISMA systematic review",
    "end to end paper publication support",
    "research proposal writing",
    "grant proposal writing service",
    "IRB ERB ethics application",
    "annotated bibliography writing",
    "research gap analysis",
    // Editing & formatting
    "copyediting services",
    "proofreading services",
    "English language editing academic",
    "paraphrasing and rewriting service",
    "humanizing AI generated text",
    "plagiarism check and removal",
    "citation formatting APA MLA Chicago",
    "reviewer response letter writing",
    "LaTeX formatting IEEE Springer Elsevier",
    "LaTeX typesetting service",
    "Overleaf setup collaboration",
    // Data, AI & ML
    "data analysis services",
    "statistical analysis expert",
    "SPSS analysis service",
    "R programming services",
    "Python data analysis freelancer",
    "machine learning freelancer",
    "deep learning services",
    "AI development services",
    "ML model training service",
    "hyperparameter tuning service",
    "YOLO object detection training",
    "NLP model development",
    "computer vision solutions",
    "vision transformer ViT development",
    "graph attention network GAT",
    "medical AI cancer detection",
    "radiomics research service",
    "data cleaning preprocessing service",
    "data annotation for machine learning",
    "data visualization Python",
    "GPU experiment execution service",
    // Scraping & dev
    "web scraping service Python",
    "Scrapy BeautifulSoup Selenium",
    "e-commerce scraping service",
    "Next.js developer for hire",
    "Nest.js backend developer",
    "AWS deployment service",
    "AWS ECS S3 ElastiCache",
    "portfolio website development",
    "API development integration",
    "database design optimization",
    // Writing & content
    "academic poster design",
    "presentation slides design academic",
    "white paper writing service",
    "case study writing",
    "medical healthcare article writing",
    "blog writing SEO content",
    // Platform-targeted
    "freelance researcher Pakistan",
    "freelance AI developer",
    "Upwork data scientist",
    "Fiverr research writer",
    "freelance academic writer",
    "DeepDivers services",
    "Asad Farooq researcher",
  ],
  authors: [{ name: "DeepDivers Team", url: siteUrl }],
  creator: "DeepDivers",
  publisher: "DeepDivers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": [
        { url: "/blog/rss.xml", title: "DeepDivers Blog RSS Feed" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title:
      "DeepDivers | Research Paper Writing, Data Analysis, ML/AI & Development Services",
    description:
      "Published researchers & data scientists offering research papers, data analysis, ML/AI, web scraping, LaTeX, and development services. Unlimited revisions. Refund guarantee. Available 24/7 worldwide.",
    siteName: "DeepDivers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DeepDivers — Professional Research, Data Science & AI Services",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepDivers | Research, Data Science & AI Services",
    description:
      "Research papers, AI/ML, data analysis, LaTeX & dev services from published researchers. 100% satisfaction. From $25.",
    images: ["/og-image.png"],
    creator: "@deepdivers",
    site: "@deepdivers",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.json",
  category: "technology",
  // Replace the placeholder strings below after verifying each property in the
  // respective webmaster tool (Google Search Console, Bing Webmaster Tools, Yandex Webmaster).
  // Google Search Console: https://search.google.com/search-console
  // Bing Webmaster Tools: https://www.bing.com/webmasters
  // Yandex Webmaster: https://webmaster.yandex.com
  verification: {
    // google: "REPLACE_WITH_GOOGLE_VERIFICATION_CODE",
    // other: {
    //   "msvalidate.01": "REPLACE_WITH_BING_VERIFICATION_CODE",
    //   "yandex-verification": "REPLACE_WITH_YANDEX_VERIFICATION_CODE",
    //   "facebook-domain-verification": "REPLACE_WITH_FACEBOOK_VERIFICATION_CODE",
    // },
  },
  other: {
    // Help Pinterest / LinkedIn / X parsers get the right description.
    "og:locale:alternate": ["en_GB", "en_IN", "en_CA", "en_AU"],
    "msapplication-TileColor": "#0066ff",
    "msapplication-TileImage": "/icon-192.png",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "DeepDivers",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Reusable address object for consistency across all schemas
  const businessAddress = {
    "@type": "PostalAddress",
    streetAddress: "Bahria University, Center of Excellence in AI (COE-AI), Shangrila Road, Sector E-8",
    addressLocality: "Islamabad",
    addressRegion: "Islamabad Capital Territory",
    postalCode: "44000",
    addressCountry: "PK",
  };

  // Reusable geo coordinates
  const geoCoordinates = {
    "@type": "GeoCoordinates",
    latitude: 33.7215,
    longitude: 73.0433,
  };

  // Reusable opening hours
  const openingHours = [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "14:00",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization Schema - Base entity
      {
        "@type": "Organization",
        "@id": "https://deepdivers.services/#organization",
        name: "DeepDivers",
        url: "https://deepdivers.services",
        logo: {
          "@type": "ImageObject",
          "@id": "https://deepdivers.services/#logo",
          url: "https://deepdivers.services/logo.png",
          contentUrl: "https://deepdivers.services/logo.png",
          width: 400,
          height: 400,
          caption: "DeepDivers Logo",
        },
        image: {
          "@type": "ImageObject",
          url: "https://deepdivers.services/og-image.png",
          width: 1200,
          height: 630,
        },
        description:
          "Professional freelance team offering research paper writing, data analysis, machine learning, AI solutions, and content services.",
        email: "support@deepdivers.services",
        telephone: "+92-312-5065538",
        address: businessAddress,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+92-312-5065538",
          contactType: "customer service",
          availableLanguage: ["English", "Urdu"],
          areaServed: "Worldwide",
        },
        sameAs: [
          "https://www.fiverr.com/deepdivers",
          "https://www.upwork.com/deepdivers",
          "https://www.freelancer.com/deepdivers",
        ],
        areaServed: {
          "@type": "Country",
          name: "Worldwide",
        },
        knowsAbout: [
          "Research Paper Writing",
          "Data Analysis",
          "Machine Learning",
          "AI Development",
          "Statistical Analysis",
          "Python Programming",
          "Academic Writing",
        ],
      },
      // WebSite Schema - For Google Search box and site name
      {
        "@type": "WebSite",
        "@id": "https://deepdivers.services/#website",
        url: "https://deepdivers.services",
        name: "DeepDivers",
        alternateName: "DeepDivers Services",
        description: "Professional Research, Data Science & AI Services",
        publisher: {
          "@id": "https://deepdivers.services/#organization",
        },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://deepdivers.services/?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      // LocalBusiness Schema - Required for local SEO with proper address
      {
        "@type": "LocalBusiness",
        "@id": "https://deepdivers.services/#localbusiness",
        name: "DeepDivers",
        description:
          "Professional freelance services for academic research, data analysis, machine learning, AI development, and content writing.",
        url: "https://deepdivers.services",
        telephone: "+92-312-5065538",
        email: "support@deepdivers.services",
        image: "https://deepdivers.services/og-image.png",
        logo: "https://deepdivers.services/logo.png",
        address: businessAddress,
        geo: geoCoordinates,
        priceRange: "$25 - $500+",
        openingHoursSpecification: openingHours,
        sameAs: [
          "https://www.fiverr.com/deepdivers",
          "https://www.upwork.com/deepdivers",
          "https://www.freelancer.com/deepdivers",
        ],
      },
      // ProfessionalService Schema - MUST have address field for Google validation
      {
        "@type": "ProfessionalService",
        "@id": "https://deepdivers.services/#service",
        name: "DeepDivers - Research & Data Science Services",
        url: "https://deepdivers.services",
        description:
          "Expert freelance services for academic research, data analysis, machine learning, AI development, and professional content writing.",
        image: "https://deepdivers.services/og-image.png",
        logo: "https://deepdivers.services/logo.png",
        telephone: "+92-312-5065538",
        email: "support@deepdivers.services",
        // CRITICAL: address field is REQUIRED for ProfessionalService (subtype of LocalBusiness)
        address: businessAddress,
        geo: geoCoordinates,
        priceRange: "$25 - $500+",
        openingHoursSpecification: openingHours,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "50",
          bestRating: "5",
          worstRating: "1",
        },
        areaServed: "Worldwide",
        availableLanguage: ["English", "Urdu"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Research & Data Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Research Paper Writing",
                description:
                  "Publication-ready manuscripts, systematic reviews, and literature analysis",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Data Analysis & Visualization",
                description:
                  "Statistical analysis, SPSS, R, Python data analysis and visualization",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Machine Learning & AI",
                description: "Deep learning models, neural networks, and AI solutions",
              },
            },
          ],
        },
        sameAs: [
          "https://www.fiverr.com/deepdivers",
          "https://www.upwork.com/deepdivers",
          "https://www.freelancer.com/deepdivers",
        ],
      },
      // BreadcrumbList Schema for navigation
      {
        "@type": "BreadcrumbList",
        "@id": "https://deepdivers.services/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://deepdivers.services",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://deepdivers.services/#services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Portfolio",
            item: "https://deepdivers.services/#portfolio",
          },
        ],
      },
    ],
  };

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Preconnect to critical third-party origins for Core Web Vitals (LCP) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Preload the LCP hero image so it starts fetching before CSS resolves it */}
        <link
          rel="preload"
          as="image"
          href="/landingIntro.webp"
          type="image/webp"
          fetchPriority="high"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
