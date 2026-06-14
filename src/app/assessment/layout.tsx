import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neqtex.com';

export const metadata: Metadata = {
  title: 'AI Readiness Assessment',
  description: 'A focused assessment of your workflows, data, infrastructure constraints, and highest-value automation opportunities for private AI. No obligation.',
  alternates: {
    canonical: `${siteUrl}/assessment`,
  },
  openGraph: {
    title: 'AI Readiness Assessment | Neqtex',
    description: 'Evaluate your workflows, data, and infrastructure constraints to find where private AI can actually help.',
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
