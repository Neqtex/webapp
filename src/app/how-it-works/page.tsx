import { Check } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import CTASection from "@/components/home/CTASection";

const STEPS = [
  {
    number: "01",
    icon: "Search",
    title: "Assessment",
    body: "Identify bottlenecks, data sources, risks, and measurable opportunities.",
    points: [
      "Map current workflows and data sources",
      "Surface sensitivity and infrastructure constraints",
      "Prioritize opportunities by value and feasibility",
    ],
  },
  {
    number: "02",
    icon: "FlaskConical",
    title: "Proof of Concept",
    body: "Build a focused pilot around one high-value workflow.",
    points: [
      "Scope a single, high-impact use case",
      "Build with evaluation criteria defined up front",
      "Validate quality and value before scaling",
    ],
  },
  {
    number: "03",
    icon: "Rocket",
    title: "Deployment",
    body: "Integrate the system into your operational environment.",
    points: [
      "Deploy into the right environment for your constraints",
      "Integrate with existing systems — no rip-and-replace",
      "Add human-in-the-loop review where it matters",
    ],
  },
  {
    number: "04",
    icon: "TrendingUp",
    title: "Optimization",
    body: "Measure usage, improve quality, and expand where ROI is clear.",
    points: [
      "Monitor usage, quality, and outcomes",
      "Refine based on real operational feedback",
      "Expand only where value is demonstrated",
    ],
  },
];

const PRINCIPLES = [
  {
    icon: "ShieldCheck",
    title: "Low risk by design",
    body: "Begin with assessment and a focused pilot. Commit further only once value is proven.",
  },
  {
    icon: "Gauge",
    title: "Measured at every stage",
    body: "We track quality and impact so the value of each step is observable, not assumed.",
  },
  {
    icon: "Layers",
    title: "Works with what you run",
    body: "We integrate carefully with existing systems rather than forcing a platform migration.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title={<>Start small. Prove value. Scale responsibly.</>}
        intro="A deliberate, low-risk path from first assessment to measured, expanding impact — designed to protect your data, budget, and operations along the way."
      >
        <Button href="/assessment">Schedule Assessment</Button>
      </PageHeader>

      <Section className="pt-4">
        <div className="space-y-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 70}>
              <div className="card grid gap-6 p-7 md:grid-cols-[auto_1fr] md:p-9">
                <div className="flex items-center gap-4 md:flex-col md:items-start">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line-gold text-gold">
                    <Icon name={step.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-3xl text-text-muted">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h2 className="font-serif text-2xl">{step.title}</h2>
                  <p className="mt-2 text-text-secondary">{step.body}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {step.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm text-text-secondary"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" strokeWidth={2} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="max-w-2xl">
          <Eyebrow>Why it works</Eyebrow>
          <h2 className="mt-6 text-balance">A method, not a gamble.</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="card h-full p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-gold">
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-serif text-xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
