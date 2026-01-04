import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Neqtex | Operational Offload & Cost Relief",
  description: "We help small teams stop paying for work they shouldn't be doing. Free operational offload assessment for accounting firms, property managers, medical clinics, and operations-heavy SMBs.",
  keywords: ["operational offload", "cost relief", "business efficiency", "process automation", "SMB consulting", "operational assessment"],
  authors: [{ name: "Neqtex LLC" }],
  creator: "Neqtex LLC",
  publisher: "Neqtex LLC",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://neqtex.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Neqtex",
    title: "Neqtex | Operational Offload & Cost Relief",
    description: "We help small teams stop paying for work they shouldn't be doing. Free operational offload assessment.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Neqtex - Operational Offload & Cost Relief",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neqtex | Operational Offload & Cost Relief",
    description: "We help small teams stop paying for work they shouldn't be doing. Free operational offload assessment.",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neqtex.com';
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/neqtex_logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet" />
        
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${siteUrl}/#organization`,
                  name: 'Neqtex',
                  url: siteUrl,
                  logo: {
                    '@type': 'ImageObject',
                    url: `${siteUrl}/neqtex_logo.svg`,
                  },
                  description: 'Operational Offload & Cost Relief for small teams who are tired of paying for work they shouldn\'t be doing.',
                  sameAs: [],
                },
                {
                  '@type': 'WebSite',
                  '@id': `${siteUrl}/#website`,
                  url: siteUrl,
                  name: 'Neqtex',
                  publisher: {
                    '@id': `${siteUrl}/#organization`,
                  },
                },
                {
                  '@type': 'WebPage',
                  '@id': `${siteUrl}/#webpage`,
                  url: siteUrl,
                  name: 'Neqtex | Operational Offload & Cost Relief',
                  isPartOf: {
                    '@id': `${siteUrl}/#website`,
                  },
                  about: {
                    '@id': `${siteUrl}/#organization`,
                  },
                  description: 'We help small teams stop paying for work they shouldn\'t be doing. Free operational offload assessment for accounting firms, property managers, medical clinics, and operations-heavy SMBs.',
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
