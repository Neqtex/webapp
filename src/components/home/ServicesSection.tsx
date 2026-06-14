import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/constants";

export default function ServicesSection() {
  return (
    <Section id="services" className="border-t border-line">
      <div className="max-w-2xl">
        <Eyebrow>What Neqtex Builds</Eyebrow>
        <h2 className="mt-6 text-balance">
          Practical systems, built around your business.
        </h2>
        <p className="mt-6 text-text-secondary">
          Private AI systems, workflow automation, SLM deployments, fine-tuned
          knowledge systems, and the infrastructure to run them responsibly.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <Reveal key={service.title} delay={(i % 3) * 80}>
            <div className="card card-hover group h-full p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line text-gold transition-colors group-hover:border-line-gold">
                <Icon name={service.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-serif text-xl">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {service.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
