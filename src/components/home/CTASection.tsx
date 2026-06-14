import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  body?: string;
}

export default function CTASection({
  eyebrow = "Get Started",
  title = "Ready to identify where private AI can actually help?",
  body = "Start with a focused assessment. Neqtex will help evaluate your workflows, data, infrastructure constraints, and highest-value automation opportunities.",
}: CTASectionProps) {
  return (
    <section className="border-t border-line py-24 lg:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface-elevated px-6 py-16 text-center sm:px-12 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(200,169,106,0.16),transparent_55%)]"
          />
          <div className="relative">
            <Eyebrow plain className="justify-center">
              {eyebrow}
            </Eyebrow>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance">{title}</h2>
            <p className="mx-auto mt-6 max-w-xl text-text-secondary">{body}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/assessment" variant="primary">
                Schedule Assessment
              </Button>
              <Button href={`mailto:${SITE.email}`} external variant="secondary">
                Email Neqtex
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
