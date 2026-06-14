import { ReactNode } from "react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pb-12 pt-24 sm:pt-28 lg:pb-16 lg:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(200,169,106,0.10),transparent_45%)]"
      />
      <Container>
        <div className="max-w-3xl animate-fade-up">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-balance">{title}</h1>
          {intro && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary">
              {intro}
            </p>
          )}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
