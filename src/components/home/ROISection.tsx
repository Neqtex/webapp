import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import { ROI_METRICS } from "@/lib/constants";
import ROICalculator from "./ROICalculator";

export default function ROISection() {
  return (
    <Section id="roi" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>Business Impact</Eyebrow>
          <h2 className="mt-6 text-balance">AI should pay for itself.</h2>
          <p className="mt-6 max-w-md text-text-secondary">
            Neqtex focuses on deployments that can be tied to time saved, lower
            operational drag, faster turnaround, or better decision support.
          </p>
          <ul className="mt-8 space-y-3">
            {ROI_METRICS.map((metric) => (
              <li
                key={metric.label}
                className="flex items-center gap-3 text-sm text-text-secondary"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-gold">
                  <Icon name={metric.icon} className="h-4 w-4" />
                </span>
                {metric.label}
              </li>
            ))}
          </ul>
        </div>

        <ROICalculator />
      </div>
    </Section>
  );
}
