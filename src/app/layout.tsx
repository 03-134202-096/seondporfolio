import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SITE, postalAddress } from "@/config/site";
import FloatingCTA from "@/components/FloatingCTA/FloatingCTA";
import AnalyticsEvents from "@/components/AnalyticsEvents/AnalyticsEvents";

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
    default: "DeepDivers | Research Support, Statistics & Academic Editing",
    template: "%s | DeepDivers",
  },
  description:
    "Statistical analysis, academic editing, journal formatting, systematic reviews and ML research support from published researchers. You stay the author.",
  applicationName: "DeepDivers",
  authors: [{ name: "DeepDivers Team", url: siteUrl }],
  creator: "DeepDivers",
  publisher: "DeepDivers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // No site-wide canonical: every page sets its own, so a new page can never
  // inherit the homepage canonical by accident.
  alternates: {
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
    title: "DeepDivers | Research Support, Statistics & Academic Editing",
    description:
      "Statistics, editing, journal formatting, systematic reviews and ML research support from published researchers, for clients worldwide. You stay the author.",
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
    title: "DeepDivers | Research Support, Statistics & Academic Editing",
    description:
      "Statistics, editing, formatting, systematic reviews and ML research support from published researchers. Quotes in 24 hours.",
    images: ["/og-image.png"],
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
  category: "education",
  // Replace the placeholder strings below after verifying each property in the
  // respective webmaster tool (Google Search Console, Bing Webmaster Tools, Yandex Webmaster).
  // Google Search Console: https://search.google.com/search-console
  // Bing Webmaster Tools: https://www.bing.com/webmasters
  // Yandex Webmaster: https://webmaster.yandex.com
  // Google Search Console is verified through a DNS TXT record (Domain property).
  verification: {
    other: {
      "msvalidate.01": "0275F6A5A255E251905FAFCD1D9899CD",
      // "yandex-verification": "REPLACE_WITH_YANDEX_VERIFICATION_CODE",
      // "facebook-domain-verification": "REPLACE_WITH_FACEBOOK_VERIFICATION_CODE",
    },
  },
  other: {
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
  // Site-wide structured data. Business details come from src/config/site.ts so
  // the name, email, phone and address match the footer and contact section.
  // No Review / AggregateRating markup about ourselves (Google ignores self-serving
  // reviews and it risks a manual action).
  const organizationDescription =
    "DeepDivers is a research support team offering data analysis, academic editing and formatting, systematic review support, and machine learning research services for students, researchers and organisations worldwide.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE.url}/#logo`,
          url: `${SITE.url}${SITE.logo}`,
          contentUrl: `${SITE.url}${SITE.logo}`,
          width: 512,
          height: 512,
          caption: "DeepDivers logo",
        },
        image: { "@id": `${SITE.url}/#logo` },
        description: organizationDescription,
        email: SITE.email,
        telephone: SITE.phoneE164,
        address: postalAddress,
        founder: { "@id": `${SITE.url}/about#asad-farooq` },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: SITE.email,
          telephone: SITE.phoneE164,
          availableLanguage: ["English", "Urdu"],
          areaServed: "Worldwide",
        },
        ...(SITE.sameAs.length > 0 ? { sameAs: SITE.sameAs } : {}),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#localbusiness`,
        name: SITE.name,
        url: SITE.url,
        image: `${SITE.url}${SITE.ogImage}`,
        logo: `${SITE.url}${SITE.logo}`,
        description: organizationDescription,
        email: SITE.email,
        telephone: SITE.phoneE164,
        address: postalAddress,
        priceRange: "$20 - $1100",
        currenciesAccepted: "USD",
        areaServed: "Worldwide",
        parentOrganization: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        alternateName: ["DeepDivers Research", "deepdivers.services"],
        publisher: { "@id": `${SITE.url}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Fonts are self-hosted by next/font, so only analytics needs an early DNS lookup */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <FloatingCTA />
        {gaId && <AnalyticsEvents />}
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
