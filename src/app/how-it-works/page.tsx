'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft,
  Search,
  TestTube,
  Rocket,
  HeartHandshake,
  ArrowRight,
  CheckCircle,
  Shield,
  TrendingUp,
  Zap,
  ChevronDown,
  Calendar,
  ExternalLink,
  Clock,
  DollarSign,
  Users,
  BarChart3,
  PieChart,
  Target,
  Award
} from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/neqtexdev1/30min';

export default function HowItWorksPage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-cycle through steps to show interactivity
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setExpandedStep((prev) => {
        if (prev === null || prev >= 3) return 0;
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Stop auto-play when user interacts
  const handleStepClick = (index: number) => {
    setIsAutoPlaying(false);
    setExpandedStep(expandedStep === index ? null : index);
  };

  const steps = [
    { 
      icon: Search, 
      title: 'Assess', 
      subtitle: 'Free Operational Assessment',
      desc: 'We uncover operational overload and identify where your team is losing time and money.',
      details: [
        '30-45 minute deep-dive session (Zoom or in-person)',
        'Complete process mapping of your current workflows',
        'Identify 3-5 immediate opportunities for relief',
        'Receive a written report with actionable recommendations'
      ],
      timeline: '1 session',
      cost: 'Free'
    },
    { 
      icon: TestTube, 
      title: 'Prove', 
      subtitle: 'Proof of Concept',
      desc: 'We demonstrate real value with a small, focused pilot before any major commitment.',
      details: [
        'Pick one high-impact opportunity from the assessment',
        'Design and implement a targeted solution',
        'Measure actual time and cost savings',
        'Document ROI before scaling further'
      ],
      timeline: '2-4 weeks',
      cost: '$500-2K'
    },
    { 
      icon: Rocket, 
      title: 'Deploy', 
      subtitle: 'Full Implementation',
      desc: 'Safe, phased rollout of solutions that integrate with your existing workflow.',
      details: [
        'Expand successful pilots across your organization',
        'Training and documentation for your team',
        'No rip-and-replace — we work with what you have',
        'Careful change management to minimize disruption'
      ],
      timeline: '4-8 weeks',
      cost: 'Custom'
    },
    { 
      icon: HeartHandshake, 
      title: 'Support', 
      subtitle: 'Ongoing Partnership',
      desc: 'Optional continued support to ensure lasting results and continuous improvement.',
      details: [
        'Regular check-ins and performance monitoring',
        'Troubleshooting and optimization as needed',
        'Identify new opportunities as your business evolves',
        'Priority access to new solutions and capabilities'
      ],
      timeline: 'Ongoing',
      cost: 'Monthly retainer'
    },
  ];

  const stats = [
    { value: '85%', label: 'of clients see ROI within 60 days', icon: TrendingUp },
    { value: '20+', label: 'hours saved per week on average', icon: Clock },
    { value: '$4,200', label: 'average monthly savings identified', icon: DollarSign },
    { value: '100%', label: 'of assessments deliver actionable insights', icon: Target },
  ];

  const comparisons = [
    { 
      category: 'Risk Level',
      traditional: 'High upfront investment',
      neqtex: 'Prove value before commitment',
      neqtexBetter: true
    },
    { 
      category: 'Timeline to Results',
      traditional: '6-12 months',
      neqtex: '2-4 weeks for first wins',
      neqtexBetter: true
    },
    { 
      category: 'Implementation',
      traditional: 'Rip and replace',
      neqtex: 'Works with existing systems',
      neqtexBetter: true
    },
    { 
      category: 'Ongoing Support',
      traditional: 'Extra cost, often neglected',
      neqtex: 'Built into partnership',
      neqtexBetter: true
    },
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
        <div className="max-w-6xl mx-auto">
          
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
              How It Works
            </h1>
            <div className="w-24 h-0.5 bg-white mb-6">
              <div className="w-6 h-2 bg-white -mt-0.5" />
            </div>
            <p className="text-xl text-white/90 max-w-2xl mb-2">
              A proven, low-risk process designed to deliver results without disruption.
            </p>
            <p className="text-lg text-white/80 italic">
              "We start small, prove value, then scale responsibly."
            </p>
          </section>

          {/* Stats Section */}
          <section className="glass-modal p-8 mb-8">
            <h2 className="text-2xl mb-6 text-center">Results That Speak for Themselves</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="glass-inner p-5 text-center">
                    <div className="w-12 h-12 bg-[#006599]/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-[#006599]" />
                    </div>
                    <p className="text-3xl md:text-4xl font-bold text-[#006599] mb-1">{stat.value}</p>
                    <p className="text-sm text-white/80">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Visual Process Flow */}
          <section className="glass-modal p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl">The Neqtex Process</h2>
              <p className="text-sm text-white/70 animate-pulse">
                {isAutoPlaying ? '↻ Auto-playing' : 'Click any step to explore'}
              </p>
            </div>
            
            {/* Horizontal Timeline */}
            <div className="relative mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = expandedStep === i;
                  const isPast = expandedStep !== null && i < expandedStep;
                  return (
                    <div 
                      key={i} 
                      className="relative flex flex-col items-center text-center cursor-pointer group"
                      onClick={() => handleStepClick(i)}
                    >
                      {/* Connector line to next step */}
                      {i < steps.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-[75%] w-[calc(100%-50%)] h-0.5">
                          <div className={`h-full rounded-full transition-all duration-500 ${
                            isPast || isActive 
                              ? 'bg-[#006599]' 
                              : 'bg-white/20'
                          }`}>
                            {/* Animated pulse for active connector */}
                            {isActive && (
                              <div className="absolute inset-0 bg-[#006599] rounded-full animate-pulse" />
                            )}
                          </div>
                          {/* Arrow indicator */}
                          <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 border-r-2 border-t-2 rotate-45 transition-colors duration-500 ${
                            isPast || isActive ? 'border-[#006599]' : 'border-white/20'
                          }`} />
                        </div>
                      )}
                      
                      <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#006599] ring-2 ring-[#006599]/50 ring-offset-2 ring-offset-transparent scale-110' 
                          : isPast
                            ? 'bg-[#006599]/60'
                            : 'glass-inner group-hover:bg-white/10 group-hover:scale-110'
                      }`}>
                        <Icon className={`w-7 h-7 transition-colors ${isActive || isPast ? 'text-white' : 'text-[#006599]'}`} />
                        {/* Ripple effect on active */}
                        {isActive && (
                          <div className="absolute inset-0 rounded-full border-2 border-[#006599] animate-ping opacity-30" />
                        )}
                      </div>
                      <h3 className={`font-semibold text-lg mb-1 transition-colors ${isActive ? 'text-[#006599]' : ''}`}>{step.title}</h3>
                      <p className="text-xs text-white/70 mb-2">{step.timeline}</p>
                      <p className="text-sm font-medium text-[#006599]">{step.cost}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Expanded Step Detail */}
            {expandedStep !== null && (
              <div className="glass-inner p-6 animate-in fade-in duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#006599]/20 border border-[#006599]/30 flex items-center justify-center flex-shrink-0">
                    {(() => {
                      const Icon = steps[expandedStep].icon;
                      return <Icon className="w-6 h-6 text-[#006599]" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{steps[expandedStep].title}: {steps[expandedStep].subtitle}</h3>
                    <p className="text-white/80">{steps[expandedStep].desc}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <p className="text-sm font-medium mb-3 text-[#006599]">What's Included:</p>
                    <ul className="space-y-2">
                      {steps[expandedStep].details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-white/80">
                          <CheckCircle className="w-4 h-4 text-[#006599] flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center items-center glass-inner p-6 rounded-lg">
                    <p className="text-sm text-white/70 mb-1">Timeline</p>
                    <p className="text-2xl font-bold mb-4">{steps[expandedStep].timeline}</p>
                    <p className="text-sm text-white/70 mb-1">Investment</p>
                    <p className="text-2xl font-bold text-[#006599]">{steps[expandedStep].cost}</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ROI Visualization */}
          <section className="glass-modal p-8 mb-8">
            <h2 className="text-2xl mb-6">Typical Client Journey</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Time Savings Chart */}
              <div className="glass-inner p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-[#006599]" />
                  <h3 className="font-semibold">Weekly Hours Recovered</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">Before Neqtex</span>
                      <span>0 hrs saved</span>
                    </div>
                    <div className="h-6 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div className="h-full w-0 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">After Assessment</span>
                      <span>5-8 hrs</span>
                    </div>
                    <div className="h-6 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div className="h-full w-[30%] bg-[#006599]/70 rounded-full transition-all duration-1000" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">After Proof of Concept</span>
                      <span>12-15 hrs</span>
                    </div>
                    <div className="h-6 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div className="h-full w-[55%] bg-[#006599]/80 rounded-full transition-all duration-1000" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">After Full Deployment</span>
                      <span>20-30 hrs</span>
                    </div>
                    <div className="h-6 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div className="h-full w-[85%] bg-[#006599] rounded-full transition-all duration-1000" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Savings Chart */}
              <div className="glass-inner p-6">
                <div className="flex items-center gap-2 mb-4">
                  <PieChart className="w-5 h-5 text-[#006599]" />
                  <h3 className="font-semibold">Monthly Cost Impact</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">Operational Waste Identified</span>
                      <span className="text-white/60">-$4,200/mo</span>
                    </div>
                    <div className="h-6 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div className="h-full w-[70%] bg-white/20 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">Quick Wins (Assessment)</span>
                      <span className="text-[#006599]">+$1,200/mo</span>
                    </div>
                    <div className="h-6 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div className="h-full w-[30%] bg-[#006599]/70 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">After Proof of Concept</span>
                      <span className="text-[#006599]">+$2,800/mo</span>
                    </div>
                    <div className="h-6 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div className="h-full w-[55%] bg-[#006599]/80 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">Full Implementation</span>
                      <span className="text-[#006599]">+$4,200/mo</span>
                    </div>
                    <div className="h-6 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div className="h-full w-[85%] bg-[#006599] rounded-full" />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/60 mt-4 text-center">*Based on average client results</p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="glass-modal p-8 mb-8">
            <h2 className="text-2xl mb-6">Why Our Approach is Different</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 font-medium text-white/80"></th>
                    <th className="text-left py-3 px-4 font-medium text-white/80">Traditional Consulting</th>
                    <th className="text-left py-3 px-4 font-medium text-[#006599]">Neqtex Approach</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, index) => (
                    <tr key={index} className="border-b border-white/10">
                      <td className="py-4 px-4 font-medium">{row.category}</td>
                      <td className="py-4 px-4 text-white/70">{row.traditional}</td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#006599]" />
                          {row.neqtex}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Why This Works */}
          <section className="glass-modal p-8 mb-8">
            <h2 className="text-2xl mb-6 text-center">Why This Approach Works</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="glass-inner p-6 text-center">
                <div className="w-16 h-16 bg-[#006599]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[#006599]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Low Risk</h3>
                <p className="text-white/80 text-sm">
                  Start with a free assessment. Only invest more once you've seen proof of value. 
                  No large upfront commitments.
                </p>
              </div>
              <div className="glass-inner p-6 text-center">
                <div className="w-16 h-16 bg-[#006599]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-[#006599]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Measurable Results</h3>
                <p className="text-white/80 text-sm">
                  Track ROI at every stage. We document time saved and costs reduced so you always 
                  know the impact.
                </p>
              </div>
              <div className="glass-inner p-6 text-center">
                <div className="w-16 h-16 bg-[#006599]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-[#006599]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No Disruption</h3>
                <p className="text-white/80 text-sm">
                  We integrate with your existing systems and workflows. No rip-and-replace, 
                  no learning curve headaches.
                </p>
              </div>
            </div>
          </section>

          {/* Team Image Section */}
          <section className="glass-modal p-8 mb-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl mb-4">Real People, Real Results</h2>
                <p className="text-white/80 mb-4">
                  We're not a faceless consulting firm. We're a dedicated team that works alongside 
                  your people to understand your unique challenges and deliver solutions that stick.
                </p>
                <p className="text-white/80 mb-6">
                  Every engagement starts with listening. We learn your processes, understand your 
                  pain points, and design solutions that fit how you actually work — not how some 
                  textbook says you should.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face"
                      alt="Team member"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-[#2c2a35]"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face"
                      alt="Team member"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-[#2c2a35]"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face"
                      alt="Team member"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-[#2c2a35]"
                    />
                  </div>
                  <span className="text-sm text-white/80">Your dedicated Neqtex team</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop"
                  alt="Team collaboration"
                  width={400}
                  height={300}
                  className="rounded-lg w-full h-32 object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                  alt="Strategy session"
                  width={400}
                  height={300}
                  className="rounded-lg w-full h-32 object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop"
                  alt="Business meeting"
                  width={400}
                  height={300}
                  className="rounded-lg w-full h-32 object-cover col-span-2"
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center mb-12">
            <h2 className="text-3xl mb-4">Ready to Get Started?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Take the first step with a free operational assessment. No commitment, no sales pressure — 
              just actionable insights you can use immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass inline-flex items-center justify-center gap-2 bg-[#006599]/30 text-lg px-8 py-4"
              >
                <Calendar className="w-6 h-6" />
                Book Your Free Assessment
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <p className="text-sm text-white/60 mt-4">
              30-minute session • 100% free • No obligation
            </p>
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
