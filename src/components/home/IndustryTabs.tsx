"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import Icon from "@/components/ui/Icon";
import { INDUSTRIES } from "@/lib/constants";

export default function IndustryTabs() {
  const [active, setActive] = useState(0);
  const current = INDUSTRIES[active];

  return (
    <div className="mt-12">
      {/* Desktop / tablet: segmented tabs + panel */}
      <div className="hidden md:block">
        <div
          role="tablist"
          aria-label="Industries"
          className="flex flex-wrap gap-2 border-b border-line"
        >
          {INDUSTRIES.map((industry, i) => (
            <button
              key={industry.slug}
              role="tab"
              id={`industry-tab-${industry.slug}`}
              aria-selected={active === i}
              aria-controls={`industry-panel-${industry.slug}`}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2.5 px-5 py-4 text-sm transition-colors ${
                active === i
                  ? "text-gold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Icon name={industry.icon} className="h-4 w-4" />
              {industry.name}
              {active === i && (
                <span className="absolute" />
              )}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`industry-panel-${current.slug}`}
          aria-labelledby={`industry-tab-${current.slug}`}
          className="grid gap-10 pt-10 lg:grid-cols-[1fr_1.2fr]"
        >
          <div>
            <h3 className="font-serif text-3xl">{current.name}</h3>
            <p className="mt-4 max-w-sm text-text-secondary">
              {current.tagline}
            </p>
            <Link
              href={`/industries/${current.slug}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-gold transition-colors hover:text-gold-soft"
            >
              Explore {current.name} use cases
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {current.useCases.map((useCase) => (
              <li
                key={useCase}
                className="card flex items-center gap-3 p-4 text-sm text-text-secondary"
              >
                <Check className="h-4 w-4 flex-shrink-0 text-gold" strokeWidth={2} />
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile: stacked accordion */}
      <div className="space-y-3 md:hidden">
        {INDUSTRIES.map((industry, i) => {
          const isOpen = active === i;
          return (
            <div key={industry.slug} className="card overflow-hidden">
              <button
                aria-expanded={isOpen}
                onClick={() => setActive(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-3 p-5 text-left"
              >
                <span className="flex items-center gap-3">
                  <Icon
                    name={industry.icon}
                    className={`h-5 w-5 ${isOpen ? "text-gold" : "text-text-secondary"}`}
                  />
                  <span className="font-serif text-lg">{industry.name}</span>
                </span>
                <span
                  className={`text-gold transition-transform ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-text-secondary">
                    {industry.tagline}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {industry.useCases.map((useCase) => (
                      <li
                        key={useCase}
                        className="flex items-center gap-3 text-sm text-text-secondary"
                      >
                        <Check
                          className="h-4 w-4 flex-shrink-0 text-gold"
                          strokeWidth={2}
                        />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm text-gold"
                  >
                    Explore use cases
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
