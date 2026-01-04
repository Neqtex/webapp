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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/neqtex_logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
