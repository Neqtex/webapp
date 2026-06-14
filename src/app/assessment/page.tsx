import { Clock, Search, CheckCircle2, FileText, Calendar, ExternalLink, ChevronDown } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/layout/PageHeader";
import { SITE } from "@/lib/constants";

const INCLUDED = [
  {
    icon: Clock,
    title: "Focused session",
    body: "A 30–45 minute working session to understand your operations.",
  },
  {
    icon: Search,
    title: "Opportunity mapping",
    body: "Identify bottlenecks, data sources, risks, and measurable wins.",
  },
  {
    icon: CheckCircle2,
    title: "Prioritized opportunities",
    body: "A shortlist of high-value workflows worth automating first.",
  },
  {
    icon: FileText,
    title: "Practical map",
    body: "A written summary of where private AI can realistically help.",
  },
];

const FAQS = [
  {
    q: "What happens during the assessment?",
    a: "We review your workflows, data sources, and infrastructure constraints, then identify where private AI or automation can reduce real operational drag.",
  },
  {
    q: "Do we need technical staff on the call?",
    a: "It helps to have someone who understands your operations and someone aware of your data and systems, but it isn't required. We translate between both.",
  },
  {
    q: "Is this a sales pitch?",
    a: "No. The goal is a practical map of opportunities. You leave with something useful whether or not you work with us.",
  },
  {
    q: "How do you handle sensitive information?",
    a: "We discuss your data at a level that doesn't require exposing it. Deployment recommendations are designed around keeping sensitive data under your control.",
  },
];

export default function AssessmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Assessment"
        title={
          <>
            A focused assessment of where{" "}
            <span className="text-gradient-gold">AI can actually help.</span>
          </>
        }
        intro="Start with a clear-eyed evaluation of your workflows, data, infrastructure constraints, and highest-value automation opportunities — no obligation."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={SITE.calendly} external>
            <Calendar className="h-4 w-4" strokeWidth={1.5} />
            Book a time
            <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
          </Button>
          <Button href="/contact" variant="secondary">
            Send details instead
          </Button>
        </div>
      </PageHeader>

      <Section className="pt-4">
        <div className="max-w-2xl">
          <Eyebrow>What&apos;s included</Eyebrow>
          <h2 className="mt-6 text-balance">Useful from the first call.</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUDED.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 70}>
              <div className="card h-full p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-gold text-gold">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-serif text-lg">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line" containerSize="narrow">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-6 text-balance">Questions, answered.</h2>
        <div className="mt-10 space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="card group overflow-hidden p-0 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-serif text-lg">
                {faq.q}
                <ChevronDown
                  className="h-5 w-5 flex-shrink-0 text-gold transition-transform group-open:rotate-180"
                  strokeWidth={1.5}
                />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-text-secondary">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <section className="border-t border-line py-24 lg:py-32">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface-elevated px-6 py-16 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(200,169,106,0.16),transparent_55%)]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance">
                Ready to map your highest-value opportunities?
              </h2>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href={SITE.calendly} external>
                  <Calendar className="h-4 w-4" strokeWidth={1.5} />
                  Schedule Assessment
                </Button>
                <Button href={`mailto:${SITE.email}`} external variant="secondary">
                  Email Neqtex
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
