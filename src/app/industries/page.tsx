import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Section from "@/components/ui/Section";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/home/CTASection";
import { INDUSTRIES, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Private AI and intelligent automation for accounting, legal, healthcare, and manufacturing teams where precision and data control matter.",
  alternates: { canonical: `${SITE.url}/industries` },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title={<>Built for teams where precision matters.</>}
        intro="The same secure foundation, applied to the workflows that define each field. Explore how Neqtex supports your sector."
      />

      <Section className="pt-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.slug} delay={(i % 2) * 80}>
              <Link
                href={`/industries/${industry.slug}`}
                className="card card-hover group flex h-full flex-col p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line text-gold transition-colors group-hover:border-line-gold">
                  <Icon name={industry.icon} className="h-5 w-5" />
                </span>
                <div className="mt-6 flex items-center gap-2">
                  <h2 className="font-serif text-2xl">{industry.name}</h2>
                  <ArrowUpRight
                    className="h-5 w-5 text-text-muted transition-colors group-hover:text-gold"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="mt-3 text-sm text-text-secondary">
                  {industry.tagline}
                </p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {industry.useCases.slice(0, 4).map((useCase) => (
                    <li
                      key={useCase}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <Check className="h-4 w-4 flex-shrink-0 text-gold" strokeWidth={2} />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Get Started"
        title="Don't see your industry?"
        body="Our approach generalizes to any team carrying repetitive operational work and sensitive data. Let's discuss your specifics."
      />
    </>
  );
}
