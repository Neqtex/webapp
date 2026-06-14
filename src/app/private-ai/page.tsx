import type { Metadata } from "next";
import { Check } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import ArchitectureDiagram from "@/components/home/ArchitectureDiagram";
import CTASection from "@/components/home/CTASection";
import { PRIVATE_AI_FEATURES, DEPLOYMENT_MODELS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Private AI",
  description:
    "Deploy AI systems that operate inside controlled environments — on-premise or private cloud — using business knowledge while reducing exposure of sensitive data.",
  alternates: { canonical: `${SITE.url}/private-ai` },
};

const PRINCIPLES = [
  {
    icon: "Lock",
    title: "Data stays under control",
    body: "Sensitive information remains within environments you govern, rather than flowing into uncontrolled third-party tools.",
  },
  {
    icon: "Eye",
    title: "Visibility and oversight",
    body: "Human-in-the-loop review, evaluation, and monitoring keep behavior observable and accountable.",
  },
  {
    icon: "Layers",
    title: "Built on your knowledge",
    body: "Retrieval and fine-tuning ground the system in your documents, processes, and domain language.",
  },
];

export default function PrivateAIPage() {
  return (
    <>
      <PageHeader
        eyebrow="Private AI"
        title={
          <>
            Your company&apos;s AI.{" "}
            <span className="text-gradient-gold">Your data. Your rules.</span>
          </>
        }
        intro="Neqtex helps organizations deploy AI systems that can operate inside controlled environments, using business-specific knowledge while reducing exposure of sensitive information."
      >
        <Button href="/assessment">Schedule Assessment</Button>
      </PageHeader>

      <Section className="pt-4">
        <div className="grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="card h-full p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-gold">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-serif text-xl">{p.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Architecture</Eyebrow>
            <h2 className="mt-6 text-balance">
              How a private AI system fits together.
            </h2>
            <p className="mt-6 max-w-md text-text-secondary">
              Information flows upward — from raw business data, through
              retrieval and fine-tuning, into assistants your teams actually
              use, with oversight at every layer.
            </p>
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {PRIVATE_AI_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" strokeWidth={2} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <ArchitectureDiagram />
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="max-w-2xl">
          <Eyebrow>Deployment</Eyebrow>
          <h2 className="mt-6 text-balance">
            Run it where your constraints require.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEPLOYMENT_MODELS.map((model) => (
            <div key={model.title} className="card flex h-full flex-col p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-gold">
                <Icon name={model.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-serif text-lg">{model.title}</h3>
              <p className="mt-3 text-sm text-text-secondary">
                {model.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Get Started"
        title="Explore where private AI fits in your organization."
        body="We'll evaluate your data sensitivity, infrastructure, and workflows to recommend a deployment that balances control, cost, and value."
      />
    </>
  );
}
