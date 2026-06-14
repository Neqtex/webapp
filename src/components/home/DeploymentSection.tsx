import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { DEPLOYMENT_MODELS } from "@/lib/constants";

export default function DeploymentSection() {
  return (
    <Section className="border-t border-line">
      <div className="max-w-2xl">
        <Eyebrow>Deployment Models</Eyebrow>
        <h2 className="mt-6 text-balance">
          Deployment models built around your constraints.
        </h2>
        <p className="mt-6 text-text-secondary">
          The right deployment depends on sensitivity, budget, workload, and
          internal technical capacity. We help you choose deliberately, not by
          default.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DEPLOYMENT_MODELS.map((model, i) => (
          <Reveal key={model.title} delay={(i % 4) * 70}>
            <div className="card card-hover flex h-full flex-col p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line text-gold">
                <Icon name={model.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-serif text-lg">{model.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {model.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
