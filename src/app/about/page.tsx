'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft,
  Target,
  Heart,
  Shield,
  Users,
  Linkedin,
  Mail,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Award
} from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Results First',
      description: 'We prove value before asking for commitment. Every engagement starts with measurable outcomes.'
    },
    {
      icon: Heart,
      title: 'Human-Centered',
      description: 'Technology serves people, not the other way around. We design solutions that fit how you actually work.'
    },
    {
      icon: Shield,
      title: 'Safe Implementation',
      description: 'No rip-and-replace approaches. We integrate carefully with your existing systems and workflows.'
    },
    {
      icon: Users,
      title: 'Partnership Mindset',
      description: 'We succeed when you succeed. Our ongoing support ensures lasting results, not quick fixes.'
    }
  ];

  const teamImages = [
    {
      src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      alt: 'Professional team member'
    },
    {
      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      alt: 'Professional team member'
    },
    {
      src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
      alt: 'Professional team member'
    }
  ];

  return (
    <>
      {/* Background */}
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
              About Neqtex
            </h1>
            <div className="w-24 h-0.5 bg-white mb-6">
              <div className="w-6 h-2 bg-white -mt-0.5" />
            </div>
            <p className="text-xl text-white/80 max-w-2xl">
              We're on a mission to help accounting and legal teams reclaim their time 
              and stop paying for work that drains their resources.
            </p>
          </section>

          {/* Our Story Section */}
          <section className="glass-modal p-8 mb-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl mb-4">Our Story</h2>
                <p className="text-white/70 mb-4">
                  Neqtex was born from a simple observation: too many professional services firms 
                  are drowning in operational overhead. Accounting teams buried in manual data entry. 
                  Law firms spending billable hours on administrative tasks. Medical practices 
                  struggling with inefficient workflows.
                </p>
                <p className="text-white/70 mb-4">
                  We saw talented professionals spending more time on busywork than on the work 
                  that actually matters — serving their clients and growing their practices.
                </p>
                <p className="text-white/70">
                  That's why we created Neqtex: to provide <strong className="text-white">operational offload and cost relief</strong> that 
                  actually works. No tech jargon, no complex implementations, no disruption to 
                  what's already working. Just real solutions that free your team to focus on 
                  what they do best.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop"
                  alt="Team collaboration"
                  width={400}
                  height={300}
                  className="rounded-lg w-full h-40 object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop"
                  alt="Business meeting"
                  width={400}
                  height={300}
                  className="rounded-lg w-full h-40 object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                  alt="Strategy session"
                  width={400}
                  height={300}
                  className="rounded-lg w-full h-40 object-cover col-span-2"
                />
              </div>
            </div>
          </section>

          {/* Founder Section */}
          <section className="glass-modal p-8 mb-8">
            <h2 className="text-2xl mb-6">Meet the Founder</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="relative">
                  <Image
                    src="/chikeHS.jpg"
                    alt="Chike Okonta - Founder of Neqtex"
                    width={400}
                    height={400}
                    className="rounded-lg w-full aspect-square object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                    <h3 className="text-xl font-semibold">Chike Okonta</h3>
                    <p className="text-white/70 text-sm">Founder & CEO</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <a 
                    href="https://linkedin.com/in/chikeokonta" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glass-inner p-2 hover:bg-white/10 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5 text-[#006599]" />
                  </a>
                  <a 
                    href="mailto:chike@neqtex.com"
                    className="glass-inner p-2 hover:bg-white/10 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5 text-[#006599]" />
                  </a>
                </div>
              </div>
              <div className="lg:col-span-2">
                <p className="text-white/80 mb-4">
                  Chike Okonta founded Neqtex with a vision to transform how professional services 
                  firms handle their operational burdens. With a background spanning technology, 
                  business consulting, and operations management, Chike brings a unique perspective 
                  to solving the everyday challenges that accounting and legal teams face.
                </p>
                <p className="text-white/70 mb-6">
                  "I've seen firsthand how much time and money gets wasted on tasks that don't 
                  add value," says Chike. "My goal with Neqtex is simple: help teams identify 
                  what's costing them, prove we can fix it, and then deliver lasting solutions. 
                  We start small, prove value, then scale responsibly."
                </p>
                
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="glass-inner p-4 flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-[#006599] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Operations Expert</p>
                      <p className="text-xs text-white/50">Process optimization specialist</p>
                    </div>
                  </div>
                  <div className="glass-inner p-4 flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-[#006599] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Tech Background</p>
                      <p className="text-xs text-white/50">Software & systems experience</p>
                    </div>
                  </div>
                  <div className="glass-inner p-4 flex items-start gap-3">
                    <Award className="w-5 h-5 text-[#006599] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Client-Focused</p>
                      <p className="text-xs text-white/50">Results-driven approach</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="glass-modal p-8 mb-8">
            <h2 className="text-2xl mb-6">Our Values</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="glass-inner p-5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#006599]/30 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#006599]" />
                      </div>
                      <h3 className="text-lg font-semibold">{value.title}</h3>
                    </div>
                    <p className="text-white/60 text-sm">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Our Approach */}
          <section className="glass-modal p-8 mb-8">
            <h2 className="text-2xl mb-6">Our Approach</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-white/70 mb-4">
                  We don't believe in one-size-fits-all solutions or ripping out systems that work. 
                  Our approach is methodical, safe, and proven:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#006599] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80"><strong>Assessment</strong> — We map your processes and identify opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#006599] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80"><strong>Proof of Concept</strong> — We demonstrate value with a small pilot</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#006599] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80"><strong>Deployment</strong> — We implement solutions that fit your workflow</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#006599] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80"><strong>Ongoing Support</strong> — We ensure lasting results, not quick fixes</span>
                  </li>
                </ul>
                <p className="text-white/60 mt-4 italic">
                  "We start small, prove value, then scale responsibly."
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                {teamImages.map((img, index) => (
                  <Image
                    key={index}
                    src={img.src}
                    alt={img.alt}
                    width={120}
                    height={120}
                    className="rounded-lg w-24 h-32 sm:w-28 sm:h-36 object-cover"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center mb-12">
            <h2 className="text-2xl mb-4">Ready to Work Together?</h2>
            <p className="text-white/60 mb-6 max-w-xl mx-auto">
              Start with a free operational assessment. No commitment, no sales pressure — 
              just actionable insights you can use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/assessment"
                className="btn-glass inline-flex items-center justify-center gap-2"
              >
                Learn About Our Assessment
              </Link>
              <a 
                href="https://calendly.com/neqtexdev1/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass inline-flex items-center justify-center gap-2 bg-[#006599]/30"
              >
                Book Free Assessment
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-white/50">
              <p>Copyright © 2026 Neqtex LLC</p>
              <div className="flex gap-4">
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
