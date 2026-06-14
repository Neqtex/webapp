import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neqtex.com';

export const metadata = {
  title: 'Terms of Service | Neqtex',
  description: 'Neqtex Terms of Service - Terms and conditions for using our services.',
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
};

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8 lg:py-32">
      <Link href="/" className="text-sm text-gold transition-colors hover:text-gold-soft">
        ← Back to home
      </Link>

      <h1 className="mt-8 mb-3">Terms of Service</h1>
      <p className="mb-10 text-sm text-text-muted">Last updated: January 3, 2026</p>

      <div className="space-y-10 leading-relaxed">
            <section>
              <h2 className="text-2xl mb-4">1. Acceptance of Terms</h2>
              <p className="text-text-secondary">
                By accessing and using the Neqtex website and services, you accept and agree to be bound 
                by the terms and provisions of this agreement. If you do not agree to these terms, 
                please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">2. Services Description</h2>
              <p className="text-text-secondary">
                Neqtex provides private AI, Small Language Model, and intelligent automation consulting and
                implementation services for organizations. Our services include AI readiness assessments,
                solution design, deployment, and ongoing optimization.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">3. Free Assessment</h2>
              <p className="text-text-secondary">
                Our free operational assessment is provided at no cost and with no obligation. 
                The assessment includes a consultation session and a written report with recommendations. 
                You are under no obligation to purchase any services following the assessment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">4. Confidentiality</h2>
              <p className="text-text-secondary">
                We treat all information shared during assessments and consultations as confidential. 
                We will not disclose your business information to third parties without your consent, 
                except as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">5. Intellectual Property</h2>
              <p className="text-text-secondary">
                All content on this website, including text, graphics, logos, and software, is the 
                property of Neqtex LLC and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">6. Limitation of Liability</h2>
              <p className="text-text-secondary">
                Neqtex shall not be liable for any indirect, incidental, special, consequential, or 
                punitive damages resulting from your use of our services or any information provided 
                during assessments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">7. Modifications</h2>
              <p className="text-text-secondary">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting to our website. Your continued use of our services constitutes 
                acceptance of any modifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">8. Governing Law</h2>
              <p className="text-text-secondary">
                These terms shall be governed by and construed in accordance with the laws of the 
                United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">9. Contact</h2>
              <p className="text-text-secondary">
                For questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:info@neqtex.com" className="text-gold hover:text-gold-soft">
                  info@neqtex.com
                </a>
              </p>
            </section>
      </div>
    </div>
  );
}
