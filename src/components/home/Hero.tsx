import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import SystemDiagram from "./SystemDiagram";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40">
      {/* Localized hero glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(200,169,106,0.12),transparent_38%)]"
      />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-fade-up">
            <Eyebrow>Private AI &amp; Intelligent Automation</Eyebrow>
            <h1 className="mt-6 max-w-2xl text-balance">
              Private AI &amp; Intelligent Automation for{" "}
              <span className="text-gradient-gold">Growing Organizations</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-secondary">
              Neqtex helps teams deploy secure AI assistants, Small Language
              Models, and workflow automation systems that reduce manual work
              while keeping sensitive data under control.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/assessment" variant="primary">
                Schedule Assessment
              </Button>
              <Button href="/solutions" variant="secondary">
                Explore Solutions
              </Button>
            </div>

            <p className="mt-5 text-sm text-text-muted">
              Built for organizations that need practical AI, not hype.
            </p>
          </div>

          <div className="animate-fade [animation-delay:200ms]">
            <SystemDiagram />
          </div>
        </div>
      </Container>
    </section>
  );
}
