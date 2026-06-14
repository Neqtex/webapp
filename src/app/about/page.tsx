import Image from "next/image";
import { Check } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import PageHeader from "@/components/layout/PageHeader";
import CTASection from "@/components/home/CTASection";

const VALUES = [
  {
    icon: "ShieldCheck",
    title: "Control over hype",
    body: "We prioritize keeping your data, infrastructure, and process under control — not chasing the newest model.",
  },
  {
    icon: "Gauge",
    title: "Measurable value",
    body: "Every engagement is tied to something you can observe: time saved, drag reduced, decisions improved.",
  },
  {
    icon: "Layers",
    title: "Practical implementation",
    body: "We build systems that hold up in production, integrating with what you already run.",
  },
  {
    icon: "Eye",
    title: "Restraint and oversight",
    body: "Human-in-the-loop review and monitoring keep AI accountable, not autonomous by default.",
  },
];

const CREDENTIALS = [
  "Software engineering background",
  "AI systems experience",
  "Workflow automation expertise",
  "Cloud & infrastructure exposure",
  "Practical implementation focus",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={<>Built by technical operators, not AI tourists.</>}
        intro="Neqtex exists to help organizations adopt AI the way serious teams adopt any infrastructure — deliberately, securely, and with a clear line to operational value."
      />

      <Section className="pt-4">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="relative overflow-hidden rounded-2xl border border-line">
            <Image
              src="/chikeHS.jpg"
              alt="Chike Okonta, Founder of Neqtex"
              width={520}
              height={620}
              className="aspect-[4/5] w-full object-cover grayscale-[35%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-5">
              <p className="font-serif text-xl">Chike Okonta</p>
              <p className="text-sm text-text-secondary">Founder, Neqtex</p>
            </div>
          </div>

          <div>
            <Eyebrow>The Founder</Eyebrow>
            <h2 className="mt-6 text-balance">
              Engineering judgment, applied to AI.
            </h2>
            <p className="mt-6 text-text-secondary">
              Neqtex pairs hands-on software engineering with real automation and
              infrastructure experience. The focus is implementation that works
              under operational load — not demos that fall apart in production.
            </p>
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {CREDENTIALS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
            <blockquote className="mt-10 border-l-2 border-line-gold pl-6">
              <p className="font-serif text-xl italic leading-relaxed text-text-primary">
                &ldquo;The goal is not to add AI for show. The goal is to reduce
                real operational drag without losing control of the
                business.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="max-w-2xl">
          <Eyebrow>Principles</Eyebrow>
          <h2 className="mt-6 text-balance">How we work.</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={(i % 2) * 80}>
              <div className="card h-full p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-gold">
                  <Icon name={value.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-xl">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
