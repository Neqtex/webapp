import { Check } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import { PRIVATE_AI_FEATURES } from "@/lib/constants";
import ArchitectureDiagram from "./ArchitectureDiagram";

export default function PrivateAISection() {
  return (
    <Section className="border-t border-line">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>Private AI</Eyebrow>
          <h2 className="mt-6 text-balance">
            Your company&apos;s AI. Your data. Your rules.
          </h2>
          <p className="mt-6 max-w-md text-text-secondary">
            Neqtex helps organizations deploy AI systems that can operate inside
            controlled environments, using business-specific knowledge while
            reducing exposure of sensitive information.
          </p>

          <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {PRIVATE_AI_FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm text-text-secondary"
              >
                <Check
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold"
                  strokeWidth={2}
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pt-4">
          <ArchitectureDiagram />
        </div>
      </div>
    </Section>
  );
}
