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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://deepdivers.services/#organization",
        name: "DeepDivers",
        url: "https://deepdivers.services",
        logo: {
          "@type": "ImageObject",
          url: "https://deepdivers.services/logo.png",
          width: 400,
          height: 400,
        },
        description:
          "Professional freelance team offering research paper writing, data analysis, machine learning, AI solutions, and content services.",
        email: "support@deepdivers.services",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+92-312-5065538",
          contactType: "customer service",
          availableLanguage: ["English"],
          areaServed: "Worldwide",
        },
        sameAs: [
          "https://www.fiverr.com/deepdivers",
          "https://www.upwork.com/deepdivers",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://deepdivers.services/#website",
        url: "https://deepdivers.services",
        name: "DeepDivers",
        description:
          "Professional Research, Data Science & AI Services",
        publisher: {
          "@id": "https://deepdivers.services/#organization",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://deepdivers.services/#service",
        name: "DeepDivers - Research & Data Science Services",
        url: "https://deepdivers.services",
        description:
          "Expert freelance services for academic research, data analysis, machine learning, AI development, and professional content writing.",
        provider: {
          "@id": "https://deepdivers.services/#organization",
        },
        areaServed: {
          "@type": "Place",
          name: "Worldwide",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Research & Data Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Research Paper Writing",
                description: "Publication-ready manuscripts, systematic reviews, and literature analysis",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Data Analysis & Visualization",
                description: "Statistical analysis, SPSS, R, Python data analysis and visualization",
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
        priceRange: "$25 - $500+",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "50",
          bestRating: "5",
          worstRating: "1",
        },
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
