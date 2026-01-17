import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Neqtex | Operational Offload & Cost Relief for Accounting & Legal Teams",
  description: "We help accounting and legal teams stop paying for work they shouldn't be doing. Free operational offload assessment for accounting firms, law practices, and professional services.",
  keywords: ["operational offload", "cost relief", "accounting automation", "legal practice efficiency", "professional services consulting", "operational assessment", "accounting firms", "law firms"],
  authors: [{ name: "Neqtex LLC" }],
  creator: "Neqtex LLC",
  publisher: "Neqtex LLC",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://neqtex.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Neqtex",
    title: "Neqtex | Operational Offload & Cost Relief for Accounting & Legal Teams",
    description: "We help accounting and legal teams stop paying for work they shouldn't be doing. Free operational offload assessment.",
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
    title: "Neqtex | Operational Offload & Cost Relief for Accounting & Legal Teams",
    description: "We help accounting and legal teams stop paying for work they shouldn't be doing. Free operational offload assessment.",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/neqtex_logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
                    url: `${siteUrl}/icon-512x512.png`,
                    width: 512,
                    height: 512,
                  },
                  image: `${siteUrl}/icon-512x512.png`,
                  description: 'Operational Offload & Cost Relief for accounting and legal teams tired of paying for work they shouldn\'t be doing.',
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
                  name: 'Neqtex | Operational Offload & Cost Relief for Accounting & Legal Teams',
                  isPartOf: {
                    '@id': `${siteUrl}/#website`,
                  },
                  about: {
                    '@id': `${siteUrl}/#organization`,
                  },
                  description: 'We help accounting and legal teams stop paying for work they shouldn\'t be doing. Free operational offload assessment for accounting firms, law practices, and professional services.',
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
