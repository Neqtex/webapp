import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import IndustryTabs from "./IndustryTabs";

export default function IndustriesSection() {
  return (
    <Section id="industries" className="border-t border-line">
      <div className="max-w-2xl">
        <Eyebrow>Industries</Eyebrow>
        <h2 className="mt-6 text-balance">
          Built for teams where precision matters.
        </h2>
        <p className="mt-6 text-text-secondary">
          The same secure foundation, applied to the workflows that define each
          field.
        </p>
      </div>
      <IndustryTabs />
    </Section>
  );
}
