'use client';

import { useState } from 'react';
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
  Clock,
  FileText,
  ExternalLink
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

  return (
    <>
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-[-1]"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Content */}
      <div className="flex items-center min-h-screen">
        <div className="flex items-center w-full px-4 py-12 md:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto gap-8 lg:gap-16">
            
            {/* Left Side - Branding */}
            <div className="text-center lg:text-right lg:max-w-md">
              <h1 className="text-4xl md:text-5xl mb-4">Neqtex</h1>
              <div className="w-32 h-0.5 bg-white mx-auto lg:ml-auto lg:mr-0 mb-4">
                <div className="w-8 h-2 bg-white ml-auto -mt-0.5" />
              </div>
              <p className="text-lg opacity-90 mb-8">
                Operational Offload & Cost Relief for accounting and legal teams tired of paying for work they shouldn't be doing.
              </p>
              
              {/* Logo Box */}
              <div className="inline-block border-2 border-white p-8 mt-4">
                <span className="text-4xl md:text-5xl font-light tracking-wider">Neqtex</span>
              </div>
            </div>

            {/* Right Side - Navigation Grid */}
            <div className="grid grid-cols-2 gap-3 max-w-[360px]">
              {navTiles.map((tile) => {
                const Icon = tile.icon;
                return (
                  <button
                    key={tile.id}
                    onClick={() => openPanel(tile.id)}
                    className="group relative w-[165px] h-[165px] border border-white bg-transparent hover:bg-[#2c2a35] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center"
                  >
                    <Icon className="w-10 h-10 mb-6 group-hover:text-[#a9a9a9] transition-colors" />
                    <span className="absolute bottom-3 left-0 right-0 text-center text-sm group-hover:text-[#a9a9a9] transition-colors">
                      {tile.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 text-center py-4 bg-black/60">
        <p className="text-sm opacity-80">Copyright © 2026 Neqtex LLC</p>
      </div>

      {/* Panel Overlay */}
      {activePanel && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closePanel}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#2c2a35] p-8 md:p-12 animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closePanel}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
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
    case 'assessment':
      return <AssessmentPanel />;
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
  return (
    <div>
      <h2 className="text-3xl mb-6">Welcome to Neqtex</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="mb-4">
            We help accounting and legal teams <strong>stop paying for work they shouldn't be doing</strong>.
          </p>
          <p className="mb-4">
            Most professional services firms are drowning in operational overhead — repetitive tasks, manual processes, 
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
    </div>
  );
}

function AssessmentPanel() {
  return (
    <div>
      <h2 className="text-3xl mb-6">Free Operational Assessment</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="mb-4">
            Our <strong>Free Operational Offload Assessment</strong> uncovers hidden inefficiencies and 
            recommends simple process relief that saves time and money.
          </p>
          <p className="mb-6 text-[#a9a9a9]">No tech jargon. No obligation. No sales fluff.</p>
          
          <h3 className="text-xl mb-4">What's Included:</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#006599] mt-1 flex-shrink-0" />
              <span>30-45 min Zoom or in-person review</span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-[#006599] mt-1 flex-shrink-0" />
              <span>We map out your current processes</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#006599] mt-1 flex-shrink-0" />
              <span>We highlight 3-5 opportunities to offload work</span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-[#006599] mt-1 flex-shrink-0" />
              <span>You receive a simple, actionable report</span>
            </li>
          </ul>
        </div>
        <div className="bg-[#353541] p-6">
          <h3 className="text-xl mb-4">Why It's Free</h3>
          <p className="mb-4">
            We believe in proving our value before asking for any commitment. 
            The assessment gives you real insights you can act on — 
            whether you work with us or not.
          </p>
          <p className="mb-6">
            Most clients see potential savings within the first call.
          </p>
          <a 
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full text-center flex items-center justify-center gap-2"
          >
            Schedule Your Free Assessment
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function WhoPanel() {
  const targets = [
    { icon: Briefcase, title: 'Accounting Firms & CPAs' },
    { icon: Building2, title: 'Law Firms & Legal Practices' },
    { icon: Home, title: 'Property Managers & Real Estate Operators' },
    { icon: Stethoscope, title: 'Medical Clinics & Offices' },
  ];

  return (
    <div>
      <h2 className="text-3xl mb-6">We Help Teams Like Yours</h2>
      <p className="mb-8">
        Our approach works best for <strong>accounting firms, legal practices, and professional services teams</strong> — 
        organizations spending too much time on repetitive work that could be offloaded.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {targets.map((target, i) => {
          const Icon = target.icon;
          return (
            <div key={i} className="flex items-center gap-4 p-4 bg-[#353541] hover:bg-[#4d4c59] transition-colors">
              <div className="w-12 h-12 bg-[#006599]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-[#006599]" />
              </div>
              <span>{target.title}</span>
            </div>
          );
        })}
      </div>

      <div className="bg-[#353541] p-6">
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
  return (
    <div>
      <h2 className="text-3xl mb-6">Contact Us</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <form className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Name *</label>
              <input type="text" className="form-control" placeholder="Your name" required />
            </div>
            <div>
              <label className="block mb-2 text-sm">Email *</label>
              <input type="email" className="form-control" placeholder="your@email.com" required />
            </div>
            <div>
              <label className="block mb-2 text-sm">Company</label>
              <input type="text" className="form-control" placeholder="Your company" />
            </div>
            <div>
              <label className="block mb-2 text-sm">Message *</label>
              <textarea className="form-control" placeholder="How can we help?" rows={4} required />
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
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
              <strong className="text-white">Location:</strong><br />
              Remote-First Company
            </p>
          </div>
          
          <div className="mt-8 p-4 bg-[#353541]">
            <p className="text-sm">
              <strong>Prefer to schedule directly?</strong><br />
              Book a free assessment call at a time that works for you.
            </p>
            <a 
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-4 text-sm inline-flex items-center gap-2"
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
        <div className="bg-[#353541] p-6">
          <h3 className="text-xl mb-4">Schedule Now</h3>
          <p className="text-[#a9a9a9] mb-6">
            Click below to choose a time that works best for you. Our calendar is synced in real-time.
          </p>
          <a 
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full text-center flex items-center justify-center gap-2 mb-4"
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
    </div>
  );
}
