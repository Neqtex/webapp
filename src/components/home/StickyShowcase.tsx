"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Library, Gauge, Eye, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

interface Commitment {
  number: string;
  title: string;
  short: string;
  body: string;
  Icon: LucideIcon;
}

const COMMITMENTS: Commitment[] = [
  {
    number: "01",
    title: "Control",
    short: "Data under your control",
    body: "Sensitive information stays inside boundaries you govern — on-premise or in a private environment — rather than flowing into uncontrolled tools.",
    Icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Knowledge",
    short: "Grounded in your business",
    body: "Systems are built on your documents, SOPs, and operational knowledge through retrieval and fine-tuning, so answers reflect how your organization actually works.",
    Icon: Library,
  },
  {
    number: "03",
    title: "Measurable value",
    short: "Tied to real outcomes",
    body: "Every deployment connects to something observable: hours saved, manual tasks reduced, faster turnaround, or better decision support.",
    Icon: Gauge,
  },
  {
    number: "04",
    title: "Oversight",
    short: "Accountable by design",
    body: "Human-in-the-loop review, evaluation, and monitoring keep behavior visible and accountable — AI that supports your team, not one that runs unchecked.",
    Icon: Eye,
  },
];

export default function StickyShowcase() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.index ?? 0
            );
            setActive(idx);
          }
        });
      },
      // Only the block crossing the vertical center counts as active.
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    itemRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const ActiveIcon = COMMITMENTS[active].Icon;

  return (
    <section className="border-t border-line py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="lg:grid lg:grid-cols-2 lg:gap-20">
          {/* Sticky pinned panel */}
          <div className="lg:sticky lg:top-28 lg:flex lg:h-[70vh] lg:flex-col lg:justify-center">
            <Eyebrow>The Neqtex Standard</Eyebrow>
            <h2 className="mt-6 text-balance">
              Engineered around four commitments.
            </h2>
            <p className="mt-6 max-w-md text-text-secondary">
              The principles that hold across every engagement, whatever we
              build and wherever it runs.
            </p>

            {/* Active commitment display (updates on scroll) */}
            <div className="mt-10 hidden lg:block">
              <div
                key={active}
                className="animate-fade rounded-2xl border border-line bg-surface-elevated p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line-gold text-gold">
                    <ActiveIcon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="font-serif text-4xl text-text-muted">
                    {COMMITMENTS[active].number}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl">
                  {COMMITMENTS[active].title}
                </h3>
                <p className="mt-3 text-text-secondary">
                  {COMMITMENTS[active].body}
                </p>
              </div>

              {/* Progress rail */}
              <div className="mt-8 flex gap-2" aria-hidden="true">
                {COMMITMENTS.map((c, i) => (
                  <span
                    key={c.number}
                    className={`h-px flex-1 transition-colors duration-500 ${
                      i <= active ? "bg-line-gold" : "bg-line"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling list */}
          <div className="mt-12 lg:mt-0">
            {COMMITMENTS.map((c, i) => (
              <div
                key={c.number}
                data-index={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="border-b border-line py-10 lg:flex lg:min-h-[60vh] lg:flex-col lg:justify-center lg:border-b-0"
              >
                <div
                  className={`transition-opacity duration-500 ${
                    active === i ? "lg:opacity-100" : "lg:opacity-40"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-gold lg:hidden">
                      <c.Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span className="font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
                      {c.number} — {c.short}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-3xl sm:text-4xl">
                    {c.title}
                  </h3>
                  <p className="mt-4 max-w-md text-text-secondary">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
