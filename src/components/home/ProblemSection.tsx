import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { PROBLEMS } from "@/lib/constants";

export default function ProblemSection() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>The Gap</Eyebrow>
          <h2 className="mt-6 text-balance">
            AI adoption is easy. Operationalizing it is not.
          </h2>
          <p className="mt-6 max-w-md text-text-secondary">
            Most organizations know AI can reduce workload, but struggle with
            sensitive data, fragmented systems, unclear ROI, and generic tools
            that do not understand their business.
          </p>
          <p className="mt-4 max-w-md text-text-secondary">
            Neqtex helps bridge that gap with secure, practical implementation.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PROBLEMS.map((problem, i) => (
            <Reveal key={problem.title} delay={i * 80}>
              <div className="card card-hover h-full p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-gold">
                  <Icon name={problem.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-xl">{problem.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {problem.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
