import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessSection() {
  return (
    <Section id="process" className="border-t border-line">
      <div className="max-w-2xl">
        <Eyebrow>Process</Eyebrow>
        <h2 className="mt-6 text-balance">
          Start small. Prove value. Scale responsibly.
        </h2>
        <p className="mt-6 text-text-secondary">
          A deliberate path from first assessment to measured, expanding
          impact.
        </p>
      </div>

      <ol className="mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        {PROCESS_STEPS.map((step, i) => (
          <Reveal as="li" key={step.number} delay={i * 90} className="relative">
            {/* connector */}
            {i < PROCESS_STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] translate-x-6 bg-gradient-to-r from-line-gold to-transparent md:block"
              />
            )}
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line-gold text-gold">
              <Icon name={step.icon} className="h-5 w-5" />
            </span>
            <p className="mt-5 font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
              {step.number}
            </p>
            <h3 className="mt-2 font-serif text-xl">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {step.description}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
