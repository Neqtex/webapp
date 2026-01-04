'use client';

import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  if (!GA_ID || GA_ID === 'G-XXXXXXXXXX') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Default to denied for GDPR compliance
          gtag('consent', 'default', {
            'analytics_storage': 'denied'
          });
          
          // Check if user has already consented
          if (localStorage.getItem('cookie-consent') === 'accepted') {
            gtag('consent', 'update', {
              'analytics_storage': 'granted'
            });
          }
          
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
