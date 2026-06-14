import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/home/CTASection";
import { SERVICES, DEPLOYMENT_MODELS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Private AI systems, Small Language Model deployment, workflow automation, dataset curation, fine-tuning, and knowledge systems — built for control and measurable value.",
  alternates: { canonical: `${SITE.url}/solutions` },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title={<>What Neqtex builds</>}
        intro="A focused set of capabilities for organizations that need practical AI: secure systems, right-sized models, and automation tied to real operational value."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/assessment">Schedule Assessment</Button>
          <Button href="/private-ai" variant="secondary">
            Explore Private AI
          </Button>
        </div>
      </PageHeader>

      <Section className="pt-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 80}>
              <div className="card card-hover group h-full p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line text-gold transition-colors group-hover:border-line-gold">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <h2 className="mt-6 font-serif text-xl">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="max-w-2xl">
          <Eyebrow>Deployment</Eyebrow>
          <h2 className="mt-6 text-balance">
            Delivered the way your constraints require.
          </h2>
          <p className="mt-6 text-text-secondary">
            The right deployment depends on sensitivity, budget, workload, and
            internal technical capacity.
          </p>
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
        eyebrow="Next Step"
        title="Not sure which solution fits?"
        body="Start with an assessment. We will map your workflows, data, and infrastructure constraints to the highest-value opportunities."
      />
    </>
  );
}
