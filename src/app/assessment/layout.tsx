import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neqtex.com';

export const metadata: Metadata = {
  title: 'Free Operational Assessment | Neqtex',
  description: 'Discover where your business is losing time and money — and how to fix it. Free operational assessment with no obligation. Get 3-5 quick wins and an actionable report.',
  alternates: {
    canonical: `${siteUrl}/assessment`,
  },
  openGraph: {
    title: 'Free Operational Assessment | Neqtex',
    description: 'Discover where your business is losing time and money — and how to fix it. No tech jargon. No obligation.',
    url: `${siteUrl}/assessment`,
    type: 'website',
  },
};

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
