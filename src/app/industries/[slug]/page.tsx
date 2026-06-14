import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import CTASection from "@/components/home/CTASection";
import JsonLd from "@/components/JsonLd";
import { INDUSTRIES, PROCESS_STEPS, SITE } from "@/lib/constants";

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) return {};
  return {
    title: `${industry.name} AI Solutions`,
    description: `Private AI and intelligent automation for ${industry.name.toLowerCase()} teams: ${industry.tagline}`,
    alternates: { canonical: `${SITE.url}/industries/${industry.slug}` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Industries",
        item: `${SITE.url}/industries`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: industry.name,
        item: `${SITE.url}/industries/${industry.slug}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Private AI for ${industry.name}`,
    serviceType: "Private AI and intelligent automation",
    description: industry.tagline,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: industry.name,
    url: `${SITE.url}/industries/${industry.slug}`,
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <Container className="pt-24 sm:pt-28 lg:pt-32">
        <Link
          href="/industries"
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          All industries
        </Link>
      </Container>

      <PageHeader
        eyebrow={industry.name}
        title={
          <>
            Private AI for{" "}
            <span className="text-gradient-gold">
              {industry.name.toLowerCase()} teams
            </span>
          </>
        }
        intro={industry.tagline}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/assessment">Schedule Assessment</Button>
          <Button href="/private-ai" variant="secondary">
            How Private AI works
          </Button>
        </div>
      </PageHeader>

      <Section className="pt-4">
        <div className="max-w-2xl">
          <Eyebrow>Use Cases</Eyebrow>
          <h2 className="mt-6 text-balance">
            Where {industry.name.toLowerCase()} teams see value first.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industry.useCases.map((useCase, i) => (
            <Reveal key={useCase} delay={(i % 3) * 70}>
              <div className="card card-hover flex h-full items-start gap-4 p-6">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-line text-gold">
                  <Check className="h-4 w-4" strokeWidth={2} />
                </span>
                <p className="font-serif text-lg text-text-primary">{useCase}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="max-w-2xl">
          <Eyebrow>Approach</Eyebrow>
          <h2 className="mt-6 text-balance">
            Start small. Prove value. Scale responsibly.
          </h2>
          <p className="mt-6 text-text-secondary">
            Every engagement follows the same disciplined path — no rip-and-
            replace, no speculative platform bets.
          </p>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 80}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-gold text-gold">
                <Icon name={step.icon} className="h-5 w-5" />
              </span>
              <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
                {step.number}
              </p>
              <h3 className="mt-2 font-serif text-lg">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CTASection
        eyebrow="Get Started"
        title={`Ready to reduce operational drag in your ${industry.name.toLowerCase()} team?`}
        body="Start with a focused assessment of your workflows, data, and infrastructure constraints."
      />
    </>
  );
}
