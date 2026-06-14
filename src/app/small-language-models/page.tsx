import type { Metadata } from "next";
import { Check } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import CTASection from "@/components/home/CTASection";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Small Language Models",
  description:
    "Right-sized language models that run in private cloud or controlled infrastructure — lower cost, lower latency, and tuned to your business language and tasks.",
  alternates: { canonical: `${SITE.url}/small-language-models` },
};

const WHY_SLM = [
  {
    icon: "Server",
    title: "Deployable in controlled environments",
    body: "Compact enough to run in private cloud or on hardware you govern, keeping data inside your boundary.",
  },
  {
    icon: "Gauge",
    title: "Lower cost and latency",
    body: "Right-sized models cut inference cost and respond quickly for high-volume operational tasks.",
  },
  {
    icon: "SlidersHorizontal",
    title: "Tuned to your domain",
    body: "Fine-tuned on your language, tasks, and processes — specific rather than generic.",
  },
];

const APPROACH = [
  {
    number: "01",
    title: "Define the task",
    body: "We scope a narrow, high-value task where a focused model outperforms a general one.",
  },
  {
    number: "02",
    title: "Curate the data",
    body: "Prepare and evaluate company-specific data for retrieval and fine-tuning.",
  },
  {
    number: "03",
    title: "Fine-tune & evaluate",
    body: "Adapt a base model, then measure quality against real examples before rollout.",
  },
  {
    number: "04",
    title: "Deploy & monitor",
    body: "Ship into your environment with evaluation and monitoring in place.",
  },
];

const COMPARISON = [
  {
    dimension: "Data control",
    general: "Often routed to third-party APIs",
    slm: "Runs in environments you govern",
  },
  {
    dimension: "Cost at scale",
    general: "Per-token cost grows quickly",
    slm: "Lower, more predictable inference cost",
  },
  {
    dimension: "Task fit",
    general: "Broad, generic capability",
    slm: "Tuned to specific workflows",
  },
  {
    dimension: "Latency",
    general: "Variable, network-dependent",
    slm: "Fast, local responses",
  },
];

export default function SmallLanguageModelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Small Language Models"
        title={
          <>
            Right-sized models,{" "}
            <span className="text-gradient-gold">tuned to your work</span>
          </>
        }
        intro="Small Language Models are compact, efficient models that can run in private cloud or controlled infrastructure. For focused business tasks, they often beat large general models on cost, latency, and control."
      >
        <Button href="/assessment">Schedule Assessment</Button>
      </PageHeader>

      <Section className="pt-4">
        <div className="grid gap-4 md:grid-cols-3">
          {WHY_SLM.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="card h-full p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-gold">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-serif text-xl">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="max-w-2xl">
          <Eyebrow>SLM vs. General Models</Eyebrow>
          <h2 className="mt-6 text-balance">
            When smaller is the smarter choice.
          </h2>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface">
                <th className="px-5 py-4 font-medium text-text-muted"></th>
                <th className="px-5 py-4 font-medium text-text-secondary">
                  General LLM
                </th>
                <th className="px-5 py-4 font-medium text-gold">
                  Small Language Model
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.dimension} className="border-b border-line last:border-0">
                  <td className="px-5 py-4 font-medium text-text-primary">
                    {row.dimension}
                  </td>
                  <td className="px-5 py-4 text-text-secondary">{row.general}</td>
                  <td className="px-5 py-4 text-text-secondary">
                    <span className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" strokeWidth={2} />
                      {row.slm}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-text-muted">
          Large general models still have their place. The goal is fit — not
          fashion.
        </p>
      </Section>

      <Section className="border-t border-line">
        <div className="max-w-2xl">
          <Eyebrow>Implementation</Eyebrow>
          <h2 className="mt-6 text-balance">How we implement SLMs.</h2>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
          {APPROACH.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 80}>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
                {step.number}
              </p>
              <h3 className="mt-2 font-serif text-lg">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CTASection
        eyebrow="Get Started"
        title="Curious whether an SLM fits your workflow?"
        body="We'll help you identify a focused task, evaluate feasibility, and estimate the cost and control benefits of a right-sized model."
      />
    </>
  );
}
