import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageBackground from "@/components/layout/PageBackground";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://neqtex.com";

export const metadata: Metadata = {
  title: {
    default: "Neqtex | Private AI & Intelligent Automation",
    template: "%s | Neqtex",
  },
  description:
    "Neqtex helps organizations deploy secure private AI systems, Small Language Models, and workflow automation that reduce manual work while keeping sensitive data under control.",
  keywords: [
    "private AI consulting",
    "Small Language Model deployment",
    "SLM implementation",
    "AI workflow automation",
    "on-prem AI systems",
    "private cloud AI",
    "AI fine-tuning services",
    "business automation consulting",
    "internal AI assistant",
    "secure AI deployment",
  ],
  authors: [{ name: "Neqtex LLC" }],
  creator: "Neqtex LLC",
  publisher: "Neqtex LLC",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Neqtex",
    title: "Neqtex | Private AI & Intelligent Automation",
    description:
      "Secure private AI systems, Small Language Models, and workflow automation that reduce manual work while keeping sensitive data under control.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Neqtex — Private AI & Intelligent Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neqtex | Private AI & Intelligent Automation",
    description:
      "Secure private AI systems, Small Language Models, and workflow automation that reduce manual work while keeping sensitive data under control.",
    images: ["/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "Neqtex",
                  url: SITE_URL,
                  logo: {
                    "@type": "ImageObject",
                    url: `${SITE_URL}/icon-512x512.png`,
                    width: 512,
                    height: 512,
                  },
                  description:
                    "Private AI, Small Language Models, and intelligent automation for organizations that need control, security, and measurable operational value.",
                  sameAs: [],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "Neqtex",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                },
                {
                  "@type": "Service",
                  "@id": `${SITE_URL}/#service`,
                  name: "Private AI & Intelligent Automation",
                  provider: { "@id": `${SITE_URL}/#organization` },
                  serviceType: "AI consulting and deployment",
                  description:
                    "Deployment of private AI systems, Small Language Models, fine-tuning, and secure workflow automation.",
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <PageBackground />
        <Navbar />
        <main id="main" className="pt-16 lg:pt-[72px]">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
