'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, 
  Search, 
  CheckCircle, 
  FileText, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Calendar,
  Star
} from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/neqtexdev1/30min';

// Note: Move metadata to a separate layout.tsx or use generateMetadata for this page
// For now, metadata is handled by the root layout

export default function AssessmentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What exactly is 'operational offloading'?",
      a: "It's the process of identifying tasks that drain your team's time and finding ways to eliminate, automate, or delegate them — without disrupting how you work."
    },
    {
      q: "Is this just another automation tool pitch?",
      a: "No. We focus on real relief, not selling software. Solutions might include process improvements, better delegation, or yes — sometimes technology. But only if it actually helps."
    },
    {
      q: "How long before we see results?",
      a: "Most clients see actionable insights during the free assessment itself. Our 'Proof of Relief' pilot typically delivers measurable results within 2-4 weeks."
    },
    {
      q: "Do we need to change our existing systems?",
      a: "Rarely. We work with what you have and only recommend changes that make sense for your team. No rip-and-replace approaches."
    },
    {
      q: "What if we're not ready to commit after the assessment?",
      a: "That's completely fine. The assessment report is yours to keep, and many clients implement our recommendations on their own. No pressure, ever."
    }
  ];

  const testimonials = [
    {
      quote: "The assessment alone saved us $3,200/month in operational waste.",
      name: "Jennifer M.",
      role: "Operations Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face"
    },
    {
      quote: "No pushy sales. Just real solutions that actually fit our workflow.",
      name: "Marcus T.",
      role: "CEO, Law Firm",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      quote: "We recovered 20+ hours per week. My team can finally focus.",
      name: "Dr. Sarah C.",
      role: "Practice Owner",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face"
    }
  ];

  return (
    <>
      {/* Background - Same as main page */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-[-1]"
        style={{ backgroundImage: 'url("/hero.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            <img src="/neqtex_logo.svg" alt="Neqtex" className="h-10" />
          </div>

          {/* Hero Section */}
          <section className="mb-12">
            <h1 className="text-4xl md:text-6xl mb-4">
              Free Operational Assessment
            </h1>
            <div className="w-24 h-0.5 bg-white mb-6">
              <div className="w-6 h-2 bg-white -mt-0.5" />
            </div>
            <p className="text-xl text-white/90 max-w-2xl">
              Discover where your business is losing time and money — and how to fix it.
              <br />
              <span className="text-white/80">No tech jargon. No obligation. No sales fluff.</span>
            </p>
          </section>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            
            {/* Left Column - What's Included */}
            <div className="lg:col-span-2 glass-modal p-8">
              <h2 className="text-2xl mb-6">What's Included</h2>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="glass-inner p-4 flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#006599] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">30-45 Min Session</p>
                    <p className="text-sm text-white/80">Zoom or in-person review</p>
                  </div>
                </div>
                <div className="glass-inner p-4 flex items-start gap-4">
                  <Search className="w-6 h-6 text-[#006599] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Process Mapping</p>
                    <p className="text-sm text-white/80">We identify bottlenecks</p>
                  </div>
                </div>
                <div className="glass-inner p-4 flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#006599] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">3-5 Quick Wins</p>
                    <p className="text-sm text-white/80">Immediate opportunities</p>
                  </div>
                </div>
                <div className="glass-inner p-4 flex items-start gap-4">
                  <FileText className="w-6 h-6 text-[#006599] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Actionable Report</p>
                    <p className="text-sm text-white/80">Yours to keep</p>
                  </div>
                </div>
              </div>

              {/* Consultation Image */}
              <div className="relative rounded-lg overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                  alt="Business consultation"
                  width={800}
                  height={300}
                  className="w-full h-48 object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-sm text-white/90">Real conversations. Real solutions.</p>
                </div>
              </div>

              <p className="text-white/80">
                We believe in proving our value before asking for any commitment. 
                The assessment gives you real insights you can act on — whether you work with us or not.
              </p>
            </div>

            {/* Right Column - CTA & Testimonials */}
            <div className="space-y-6">
              {/* Schedule CTA */}
              <div className="glass-modal p-6">
                <h3 className="text-xl mb-4">Ready to Start?</h3>
                <p className="text-white/80 mb-6 text-sm">
                  Schedule your free assessment. Most clients see potential savings within the first call.
                </p>
                <a 
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass w-full text-center flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Assessment
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Testimonials */}
              <div className="glass-modal p-6">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Client Results
                </h3>
                <div className="space-y-4">
                  {testimonials.map((t, i) => (
                    <div key={i} className="glass-inner p-3">
                      <p className="text-sm italic mb-2">&ldquo;{t.quote}&rdquo;</p>
                      <div className="flex items-center gap-3">
                        <Image
                          src={t.image}
                          alt={t.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-xs font-semibold">{t.name}</p>
                          <p className="text-xs text-white/70">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="glass-modal p-8 mb-12">
            <h2 className="text-2xl mb-6">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-inner overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                    aria-expanded={openFaq === index}
                  >
                    <span className="font-medium pr-4">{faq.q}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 flex-shrink-0 text-[#006599]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 flex-shrink-0 text-white/50" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-white/80 text-sm">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="text-center mb-12">
            <p className="text-xl mb-6">
              <strong>No commitment required.</strong>
              <span className="text-white/80 block sm:inline sm:ml-2">
                Start with a free assessment and see results before deciding.
              </span>
            </p>
            <a 
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Schedule Your Free Assessment
              <ExternalLink className="w-4 h-4" />
            </a>
          </section>

          {/* Footer */}
          <footer className="text-center py-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-white/70">
              <p>Copyright © 2026 Neqtex LLC</p>
              <div className="flex gap-4">
                <Link href="/about" className="hover:text-[#006599] transition-colors">About Us</Link>
                <Link href="/privacy" className="hover:text-[#006599] transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-[#006599] transition-colors">Terms of Service</Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
