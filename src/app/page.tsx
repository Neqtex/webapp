'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { 
  Home, 
  ClipboardCheck, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Calendar,
  X,
  CheckCircle,
  Search,
  TestTube,
  Rocket,
  HeartHandshake,
  Building2,
  Stethoscope,
  ExternalLink,
  Star,
  Loader2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/neqtexdev1/30min';

type PanelId = 'welcome' | 'assessment' | 'who' | 'process' | 'contact' | 'book' | null;

interface NavTile {
  id: PanelId;
  icon: React.ElementType;
  label: string;
}

const navTiles: NavTile[] = [
  { id: 'welcome', icon: Home, label: 'Welcome' },
  { id: 'assessment', icon: ClipboardCheck, label: 'Assessment' },
  { id: 'who', icon: Users, label: 'Who We Help' },
  { id: 'process', icon: Briefcase, label: 'How It Works' },
  { id: 'contact', icon: MessageSquare, label: 'Contact' },
  { id: 'book', icon: Calendar, label: 'Book Now' },
];

export default function HomePage() {
  const [activePanel, setActivePanel] = useState<PanelId>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openPanel = (id: PanelId) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActivePanel(id);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closePanel = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActivePanel(null);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // ESC key handler for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePanel) {
        closePanel();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePanel]);

  // Focus trap for modal accessibility
  useEffect(() => {
    if (activePanel && modalRef.current) {
      modalRef.current.focus();
    }
  }, [activePanel]);

  return (
    <>
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-[-1]"
        style={{ 
          backgroundImage: 'url("/hero.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main Content - Hidden when modal is active */}
      <div className={`flex items-center min-h-screen transition-opacity duration-300 ${activePanel ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex items-center w-full px-4 py-12 md:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto gap-8 lg:gap-16">
            
            {/* Left Side - Branding */}
            <div className="text-center lg:text-right lg:max-w-md">
              <h1 className="text-4xl md:text-5xl mb-4">Neqtex</h1>
              <div className="w-32 h-0.5 bg-white mx-auto lg:ml-auto lg:mr-0 mb-4">
                <div className="w-8 h-2 bg-white ml-auto -mt-0.5" />
              </div>
              <p className="text-lg opacity-90 mb-8">
                Operational Offload & Cost Relief for small teams who are tired of paying for work they shouldn't be doing.
              </p>
              
              {/* Logo */}
              <img src="/neqtex_logo.svg" alt="Neqtex Logo" className="w-[300px] h-auto mx-auto lg:ml-auto lg:mr-0" />
            </div>

            {/* Right Side - Navigation Grid - Responsive */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-[360px]">
              {navTiles.map((tile) => {
                const Icon = tile.icon;
                
                // Assessment links to separate page
                if (tile.id === 'assessment') {
                  return (
                    <Link
                      key={tile.id}
                      href="/assessment"
                      aria-label={`Go to ${tile.label} page`}
                      className="group relative w-full aspect-square sm:w-[165px] sm:h-[165px] border border-white bg-transparent hover:bg-[#2c2a35] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#006599] focus:ring-offset-2 focus:ring-offset-transparent"
                    >
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-4 sm:mb-6 group-hover:text-[#a9a9a9] transition-colors" />
                      <span className="absolute bottom-2 sm:bottom-3 left-0 right-0 text-center text-xs sm:text-sm group-hover:text-[#a9a9a9] transition-colors">
                        {tile.label}
                      </span>
                    </Link>
                  );
                }
                
                return (
                  <button
                    key={tile.id}
                    onClick={() => openPanel(tile.id)}
                    aria-label={`Open ${tile.label} panel`}
                    className="group relative w-full aspect-square sm:w-[165px] sm:h-[165px] border border-white bg-transparent hover:bg-[#2c2a35] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#006599] focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 mb-4 sm:mb-6 group-hover:text-[#a9a9a9] transition-colors" />
                    <span className="absolute bottom-2 sm:bottom-3 left-0 right-0 text-center text-xs sm:text-sm group-hover:text-[#a9a9a9] transition-colors">
                      {tile.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Hidden when modal is active */}
      <div className={`fixed bottom-0 left-0 right-0 text-center py-4 bg-black/60 transition-opacity duration-300 ${activePanel ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <p className="text-sm opacity-80">Copyright © 2026 Neqtex LLC</p>
          <div className="flex gap-4 text-sm opacity-80">
            <Link href="/privacy" className="hover:text-[#006599] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#006599] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Panel Overlay */}
      {activePanel && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closePanel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="panel-title"
        >
          <div 
            ref={modalRef}
            tabIndex={-1}
            className="glass-modal relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 md:p-12 animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closePanel}
              className="glass-close-btn absolute top-4 right-4 text-white z-10"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Panel Content */}
            <PanelContent id={activePanel} />
          </div>
        </div>
      )}
    </>
  );
}

function PanelContent({ id }: { id: PanelId }) {
  switch (id) {
    case 'welcome':
      return <WelcomePanel />;
    case 'who':
      return <WhoPanel />;
    case 'process':
      return <ProcessPanel />;
    case 'contact':
      return <ContactPanel />;
    case 'book':
      return <BookPanel />;
    default:
      return null;
  }
}

function WelcomePanel() {
  const testimonials = [
    {
      quote: "Neqtex identified $4,200/month in wasted operational costs we didn't even know we had. ROI in the first 60 days.",
      author: "Sarah M.",
      role: "Owner, Regional Law Firm",
      stars: 5
    },
    {
      quote: "Finally, someone who speaks our language. No tech jargon, just real solutions that actually work.",
      author: "Michael R.",
      role: "CEO, Medical Practice",
      stars: 5
    },
    {
      quote: "The assessment alone was worth it. They found 15+ hours of weekly tasks we could eliminate immediately.",
      author: "Jennifer L.",
      role: "Operations Manager, Construction Co.",
      stars: 5
    }
  ];

  return (
    <div>
      <h2 id="panel-title" className="text-3xl mb-6">Welcome to Neqtex</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="mb-4">
            We help small teams <strong>stop paying for work they shouldn't be doing</strong>.
          </p>
          <p className="mb-4">
            Most small businesses are drowning in operational overhead — repetitive tasks, manual processes, 
            and inefficiencies that drain time and money. We're here to change that.
          </p>
          <p>
            Our approach is simple: identify what's costing you, design safe ways to offload it, 
            and implement solutions that actually work — without disruption or tech jargon.
          </p>
        </div>
        <div>
          <p className="mb-4">
            <strong>What makes us different?</strong>
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#006599] mt-1 flex-shrink-0" />
              <span>Real relief, not just automation</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#006599] mt-1 flex-shrink-0" />
              <span>No tech jargon, no complexity</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#006599] mt-1 flex-shrink-0" />
              <span>Safe implementation that doesn't disrupt</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#006599] mt-1 flex-shrink-0" />
              <span>Prove value before any big commitment</span>
            </li>
          </ul>
          <p className="mt-6 text-[#a9a9a9]">
            Ready to see where you can start saving? 
            <a 
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer" 
              className="text-[#006599] hover:text-[#0e7fb9] ml-1 underline inline-flex items-center gap-1"
            >
              Book your free assessment
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-10 pt-8 border-t border-[#4d4c59]">
        <h3 className="text-xl mb-6 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          What Our Clients Say
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-inner p-4">
              <div className="flex gap-0.5 mb-2">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-sm mb-3 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="text-xs text-[#a9a9a9]">
                <strong className="text-white">{testimonial.author}</strong><br />
                {testimonial.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhoPanel() {
  const targets = [
    { icon: Briefcase, title: 'Accounting & Professional Services' },
    { icon: Home, title: 'Property Managers & Real Estate Operators' },
    { icon: Stethoscope, title: 'Medical Clinics & Offices' },
    { icon: Building2, title: 'Operations-Heavy SMBs' },
  ];

  return (
    <div>
      <h2 className="text-3xl mb-6">We Help Businesses Like Yours</h2>
      <p className="mb-8">
        Our approach works best for <strong>operations-heavy small and medium businesses</strong> — 
        teams that are spending too much time on repetitive work that could be offloaded.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {targets.map((target, i) => {
          const Icon = target.icon;
          return (
            <div key={i} className="flex items-center gap-4 p-4 glass-inner hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-[#006599]/30 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-[#006599]" />
              </div>
              <span>{target.title}</span>
            </div>
          );
        })}
      </div>

      <div className="glass-inner p-6">
        <h3 className="text-xl mb-4">Common Signs You Need Us:</h3>
        <ul className="space-y-2 text-[#a9a9a9]">
          <li>• Your team is overwhelmed with repetitive, low-value tasks</li>
          <li>• You're paying for work that feels like it could be eliminated</li>
          <li>• Processes have grown inefficient over time</li>
          <li>• You don't have time to identify and fix operational issues</li>
        </ul>
      </div>
    </div>
  );
}

function ProcessPanel() {
  const steps = [
    { icon: Search, title: 'Assess', desc: 'We uncover operational overload and identify where your team is losing time.' },
    { icon: TestTube, title: 'Prove', desc: 'Deliver a small Proof-of-Relief to show real results before any big commitment.' },
    { icon: Rocket, title: 'Deploy', desc: 'Safe implementation of solutions that fit your existing workflow.' },
    { icon: HeartHandshake, title: 'Support', desc: 'Optional ongoing help to ensure everything keeps running smoothly.' },
  ];

  return (
    <div>
      <h2 className="text-3xl mb-6">How It Works</h2>
      <p className="mb-8">
        A simple, safe process designed to get you results without disruption.
      </p>
      
      <div className="space-y-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#006599] rounded-full flex items-center justify-center text-lg font-semibold">
                {i + 1}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5 text-[#006599]" />
                  <h3 className="text-xl">{step.title}</h3>
                </div>
                <p className="text-[#a9a9a9]">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-[#4d4c59]">
        <p className="text-center">
          <strong>No commitment required.</strong> Start with a free assessment and see results before deciding.
        </p>
      </div>
    </div>
  );
}

function ContactPanel() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setFormState('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      setFormState('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  if (formState === 'success') {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl mb-4">Message Sent!</h2>
        <p className="text-[#a9a9a9] mb-6">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <button 
          onClick={() => setFormState('idle')} 
          className="btn-glass"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl mb-6">Contact Us</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formState === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-200">{errorMessage}</p>
              </div>
            )}
            <div>
              <label className="block mb-2 text-sm">Name *</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Your name" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                disabled={formState === 'loading'}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Email *</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="your@email.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                disabled={formState === 'loading'}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Company</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Your company" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                disabled={formState === 'loading'}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Message *</label>
              <textarea 
                className="form-control" 
                placeholder="How can we help?" 
                rows={4} 
                required 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                disabled={formState === 'loading'}
              />
            </div>
            <button 
              type="submit" 
              className="btn-glass flex items-center justify-center gap-2"
              disabled={formState === 'loading'}
            >
              {formState === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
        <div>
          <h3 className="text-xl mb-4">Get In Touch</h3>
          <div className="space-y-4 text-[#a9a9a9]">
            <p>
              <strong className="text-white">Email:</strong><br />
              info@neqtex.com
            </p>
            <p>
              <strong className="text-white">Phone:</strong><br />
              (555) 123-4567
            </p>
            <p>
              <strong className="text-white">Location:</strong><br />
              Remote-First Company
            </p>
          </div>
          
          <div className="mt-8 p-4 glass-inner">
            <p className="text-sm">
              <strong>Prefer to schedule directly?</strong><br />
              Book a free assessment call at a time that works for you.
            </p>
            <a 
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass mt-4 text-sm inline-flex items-center gap-2"
            >
              Book Free Assessment
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookPanel() {
  return (
    <div>
      <h2 className="text-3xl mb-6">Book Your Free Assessment</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="mb-6">
            Take the first step toward operational relief. Schedule a <strong>no-obligation assessment</strong> and 
            discover where you can start saving time and money.
          </p>
          
          <h3 className="text-xl mb-4">What to Expect:</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#006599] mt-1 flex-shrink-0" />
              <span>30-45 minute Zoom or in-person session</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#006599] mt-1 flex-shrink-0" />
              <span>Complete process mapping and review</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#006599] mt-1 flex-shrink-0" />
              <span>3-5 quick-win opportunities identified</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#006599] mt-1 flex-shrink-0" />
              <span>Written actionable recommendations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#006599] mt-1 flex-shrink-0" />
              <span>No sales pressure, no obligation</span>
            </li>
          </ul>
        </div>
        <div className="glass-inner p-6">
          <h3 className="text-xl mb-4">Schedule Now</h3>
          <p className="text-[#a9a9a9] mb-6">
            Click below to choose a time that works best for you. Our calendar is synced in real-time.
          </p>
          <a 
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass w-full text-center flex items-center justify-center gap-2 mb-4"
          >
            <Calendar className="w-5 h-5" />
            Open Scheduling Calendar
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-xs text-[#a9a9a9] text-center">
            Powered by Calendly • 30-minute session
          </p>
        </div>
      </div>

      {/* Pricing Transparency Section */}
      <div className="mt-10 pt-8 border-t border-[#4d4c59]">
        <h3 className="text-xl mb-6">Transparent Pricing</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass-inner p-5 text-center">
            <p className="text-2xl font-bold text-[#006599] mb-2">Free</p>
            <p className="font-semibold mb-2">Assessment</p>
            <p className="text-sm text-[#a9a9a9]">No-obligation operational review with actionable recommendations</p>
          </div>
          <div className="glass-inner p-5 text-center border-[#006599] border">
            <p className="text-2xl font-bold text-[#006599] mb-2">$500-2K</p>
            <p className="font-semibold mb-2">Proof of Relief</p>
            <p className="text-sm text-[#a9a9a9]">Small pilot project to demonstrate ROI before larger commitment</p>
          </div>
          <div className="glass-inner p-5 text-center">
            <p className="text-2xl font-bold text-[#006599] mb-2">Custom</p>
            <p className="font-semibold mb-2">Full Implementation</p>
            <p className="text-sm text-[#a9a9a9]">Tailored solution based on your specific needs and scope</p>
          </div>
        </div>
        <p className="text-center text-[#a9a9a9] text-sm mt-4">
          All pricing discussed transparently after your free assessment. No surprises, no hidden fees.
        </p>
      </div>
    </div>
  );
}
