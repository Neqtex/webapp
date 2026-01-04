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
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-[-1]"
        style={{ backgroundImage: 'url("/hero.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="glass-modal p-8 md:p-12">
          <Link href="/" className="text-[#006599] hover:text-[#0e7fb9] mb-6 inline-block">
            ← Back to Home
          </Link>
          
          <h1 className="text-4xl mb-8">Terms of Service</h1>
          <p className="text-[#a9a9a9] mb-8">Last updated: January 3, 2026</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#a9a9a9]">
                By accessing and using the Neqtex website and services, you accept and agree to be bound 
                by the terms and provisions of this agreement. If you do not agree to these terms, 
                please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">2. Services Description</h2>
              <p className="text-[#a9a9a9]">
                Neqtex provides operational offloading and cost relief consulting services for businesses. 
                Our services include operational assessments, process optimization, and implementation support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">3. Free Assessment</h2>
              <p className="text-[#a9a9a9]">
                Our free operational assessment is provided at no cost and with no obligation. 
                The assessment includes a consultation session and a written report with recommendations. 
                You are under no obligation to purchase any services following the assessment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">4. Confidentiality</h2>
              <p className="text-[#a9a9a9]">
                We treat all information shared during assessments and consultations as confidential. 
                We will not disclose your business information to third parties without your consent, 
                except as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">5. Intellectual Property</h2>
              <p className="text-[#a9a9a9]">
                All content on this website, including text, graphics, logos, and software, is the 
                property of Neqtex LLC and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">6. Limitation of Liability</h2>
              <p className="text-[#a9a9a9]">
                Neqtex shall not be liable for any indirect, incidental, special, consequential, or 
                punitive damages resulting from your use of our services or any information provided 
                during assessments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">7. Modifications</h2>
              <p className="text-[#a9a9a9]">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting to our website. Your continued use of our services constitutes 
                acceptance of any modifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">8. Governing Law</h2>
              <p className="text-[#a9a9a9]">
                These terms shall be governed by and construed in accordance with the laws of the 
                United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">9. Contact</h2>
              <p className="text-[#a9a9a9]">
                For questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:hello@neqtex.com" className="text-[#006599] hover:text-[#0e7fb9]">
                  hello@neqtex.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
