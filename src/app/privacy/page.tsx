import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neqtex.com';

export const metadata = {
  title: 'Privacy Policy | Neqtex',
  description: 'Neqtex Privacy Policy - How we collect, use, and protect your information.',
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8 lg:py-32">
      <Link href="/" className="text-sm text-gold transition-colors hover:text-gold-soft">
        ← Back to home
      </Link>

      <h1 className="mt-8 mb-3">Privacy Policy</h1>
      <p className="mb-10 text-sm text-text-muted">Last updated: January 3, 2026</p>

      <div className="space-y-10 leading-relaxed">
            <section>
              <h2 className="text-2xl mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect information you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 text-text-secondary">
                <li>Name and contact information (email address, phone number)</li>
                <li>Company name and business information</li>
                <li>Messages and communications you send to us</li>
                <li>Information provided during assessments or consultations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 text-text-secondary">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Schedule and conduct assessments</li>
                <li>Send you information about our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">3. Information Sharing</h2>
              <p className="text-text-secondary">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as necessary to provide our services or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">4. Data Security</h2>
              <p className="text-text-secondary">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">5. Cookies</h2>
              <p className="text-text-secondary">
                We use cookies and similar tracking technologies to analyze website traffic and improve 
                your experience. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">6. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-text-secondary">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">7. Contact Us</h2>
              <p className="text-text-secondary">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:info@neqtex.com" className="text-gold hover:text-gold-soft">
                  info@neqtex.com
                </a>
              </p>
            </section>
      </div>
    </div>
  );
}
