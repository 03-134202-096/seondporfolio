import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DeepDivers | Academic Research, Data Science & AI Services",
    template: "%s | DeepDivers",
  },
  description:
    "Professional freelance team offering research paper writing, data analysis, machine learning, AI solutions, statistical analysis, and content services. 100% satisfaction guarantee. Available 24/7 on Fiverr, Upwork & Freelancer.",
  keywords: [
    "research paper writing services",
    "academic writing help",
    "data analysis services",
    "machine learning freelancer",
    "AI development services",
    "statistical analysis expert",
    "manuscript formatting",
    "thesis writing help",
    "dissertation assistance",
    "copyediting services",
    "proofreading services",
    "LaTeX formatting",
    "Python data analysis",
    "deep learning services",
    "systematic review",
    "meta-analysis services",
    "literature review writing",
    "research methodology",
    "SPSS analysis",
    "R programming services",
    "data visualization",
    "freelance researcher",
    "academic freelancer",
    "Upwork data scientist",
    "Fiverr research writer",
    "hire someone to write research paper",
    "professional data analysis help",
    "ML model training service",
    "web scraping service Python",
    "LaTeX typesetting IEEE Springer",
    "Next.js developer for hire",
    "AWS deployment service",
    "academic poster design",
    "grant proposal writing service",
    "Q1 journal paper writing",
    "plagiarism check and removal",
    "citation formatting APA MLA Chicago",
    "YOLO object detection training",
    "NLP model development",
    "research paper editing service",
    "freelance AI developer",
    "data cleaning preprocessing service",
    "presentation slides design academic",
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
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "DeepDivers | Academic Research, Data Science & AI Services",
    description:
      "Professional freelance team offering research papers, data analysis, ML/AI solutions, and content services. 100% satisfaction guarantee. Available 24/7.",
    siteName: "DeepDivers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DeepDivers - Professional Research & Data Science Services",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepDivers | Research & Data Science Services",
    description:
      "Professional research papers, AI/ML solutions, data analysis & content services. 100% satisfaction guarantee.",
    images: ["/og-image.png"],
    creator: "@deepdivers",
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
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  category: "technology",
  // IMPORTANT: Add your real Google Search Console verification code here after setup.
  // verification: {
  //   google: "your-actual-google-verification-code",
  // },
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

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
