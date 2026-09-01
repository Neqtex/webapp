"use client";

import dynamic from "next/dynamic";
import Section from "@/components/ui/Section";
import { COLUMN_INK, LEFT, RIGHT, STATEMENT } from "./statementCopy";

function GyroPlaceholder() {
  return (
    <div className="relative mx-auto aspect-square w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(200,169,106,0.22),transparent_68%)] blur-2xl"
      />
    </div>
  );
}

const TextGyro = dynamic(() => import("./TextGyro"), {
  ssr: false,
  loading: () => <GyroPlaceholder />,
});

export default function StatementSection() {
  return (
    <Section containerSize="wide" className="relative overflow-hidden">
      <header className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3">
        <p className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.28em] text-gold">
          The Premise
        </p>
        <p className="font-sans text-[0.62rem] uppercase tracking-[0.22em] text-text-muted">
          Neqtex Review &nbsp;·&nbsp; Vol. I &nbsp;·&nbsp; Private AI
        </p>
      </header>

      <h2 className="mt-8 max-w-5xl text-balance">
        Most organizations do not need more software.
      </h2>
      <p className="mt-4 max-w-2xl font-serif text-xl leading-snug text-text-secondary sm:text-[1.65rem]">
        They need the work between the software to disappear.
      </p>

      <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,32rem)_minmax(0,1fr)] lg:gap-x-8 lg:gap-y-0">
        <div
          className="hidden font-serif text-[1.02rem] font-normal leading-[1.75] [text-align:justify] hyphens-auto lg:block"
          style={{ color: COLUMN_INK }}
        >
          <p className="editorial-drop">{LEFT[0]}</p>
          {LEFT.slice(1).map((paragraph) => (
            <p key={paragraph} className="mt-5">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mx-auto w-full max-w-[32rem]">
          <TextGyro className="max-w-none" caption={false} />
        </div>

        <div
          className="font-serif text-[1.02rem] font-normal leading-[1.75] [text-align:justify] hyphens-auto"
          style={{ color: COLUMN_INK }}
        >
          <div className="lg:hidden">
            <p className="editorial-drop">{LEFT[0]}</p>
            {LEFT.slice(1).map((paragraph) => (
              <p key={paragraph} className="mt-5">
                {paragraph}
              </p>
            ))}
          </div>
          {RIGHT.map((paragraph, i) => (
            <p
              key={paragraph}
              className={`${i === 0 ? "mt-5 lg:mt-0" : "mt-5"} ${
                i === RIGHT.length - 1 ? "font-medium text-text-primary" : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <footer className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
        <blockquote className="max-w-xl font-serif text-2xl leading-snug text-gold-soft sm:text-[1.85rem]">
          “Your data stays where it belongs.”
        </blockquote>
        <p className="font-sans text-[0.62rem] uppercase tracking-[0.22em] text-text-muted">
          Neqtex &nbsp;·&nbsp; The Premise &nbsp;·&nbsp; 01
        </p>
      </footer>

      <p className="sr-only">{STATEMENT}</p>
    </Section>
  );
}
