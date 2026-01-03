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

export const metadata: Metadata = {
  title: "DeepDivers | Academic Research, Data Science & Content Services",
  description:
    "Expert team delivering publication-ready manuscripts, AI/ML solutions, data analysis, and professional content services for academics and businesses worldwide. Available on Fiverr, Upwork & Freelancer.",
  keywords: [
    "research services",
    "academic writing",
    "data analysis",
    "machine learning",
    "AI services",
    "manuscript formatting",
    "copyediting",
    "proofreading",
    "LaTeX",
    "Next.js development",
    "freelance research",
  ],
  authors: [{ name: "DeepDivers Team" }],
  creator: "DeepDivers",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "DeepDivers | Academic Research, Data Science & Content Services",
    description:
      "Expert team delivering publication-ready manuscripts, AI/ML solutions, and professional content services.",
    siteName: "DeepDivers",
    images: [
      {
        url: "/logo.png",
        width: 400,
        height: 400,
        alt: "DeepDivers Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepDivers | Research & Data Science Services",
    description:
      "Publication-ready manuscripts, AI/ML solutions, and professional content services.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
