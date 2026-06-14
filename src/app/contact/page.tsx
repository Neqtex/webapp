import type { Metadata } from "next";
import { Mail, Calendar, ShieldCheck } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Neqtex about private AI, Small Language Models, and intelligent automation. Start with a focused assessment of your highest-value opportunities.",
  alternates: { canonical: `${SITE.url}/contact` },
};

export default function ContactPage() {
  return (
    <Section className="pt-28 sm:pt-32 lg:pt-40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 text-balance">Let&apos;s talk specifics.</h1>
            <p className="mt-6 max-w-md text-text-secondary">
              Tell us what you&apos;re trying to improve. We&apos;ll help map
              your workflows, data, and infrastructure constraints to the
              highest-value automation opportunities.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-4 text-text-secondary transition-colors hover:text-text-primary"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-gold">
                  <Mail className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-text-muted">
                    Email
                  </span>
                  {SITE.email}
                </span>
              </a>
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-text-secondary transition-colors hover:text-text-primary"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-gold">
                  <Calendar className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-text-muted">
                    Schedule
                  </span>
                  Book an assessment call
                </span>
              </a>
            </div>

            <div className="mt-10 flex items-start gap-3 rounded-xl border border-line bg-surface p-5 text-sm text-text-secondary">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" strokeWidth={1.5} />
              We treat your information with discretion. No spam, no list
              reselling — just a direct conversation.
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
