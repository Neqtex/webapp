import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Neqtex',
  description: 'Neqtex Privacy Policy - How we collect, use, and protect your information.',
};

export default function PrivacyPolicy() {
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
          
          <h1 className="text-4xl mb-8">Privacy Policy</h1>
          <p className="text-[#a9a9a9] mb-8">Last updated: January 3, 2026</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect information you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 text-[#a9a9a9]">
                <li>Name and contact information (email address, phone number)</li>
                <li>Company name and business information</li>
                <li>Messages and communications you send to us</li>
                <li>Information provided during assessments or consultations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 text-[#a9a9a9]">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Schedule and conduct assessments</li>
                <li>Send you information about our services</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">3. Information Sharing</h2>
              <p className="text-[#a9a9a9]">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as necessary to provide our services or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">4. Data Security</h2>
              <p className="text-[#a9a9a9]">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">5. Cookies</h2>
              <p className="text-[#a9a9a9]">
                We use cookies and similar tracking technologies to analyze website traffic and improve 
                your experience. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4">6. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-[#a9a9a9]">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4">7. Contact Us</h2>
              <p className="text-[#a9a9a9]">
                If you have any questions about this Privacy Policy, please contact us at{' '}
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
