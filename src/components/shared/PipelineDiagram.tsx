import { ArrowUp, type LucideIcon } from "lucide-react";

export interface PipelineStage {
  label: string;
  tag: string;
  Icon: LucideIcon;
}

interface PipelineDiagramProps {
  stages: PipelineStage[];
  active: number;
  reduced?: boolean;
}

/**
 * Vertical pipeline graph: stage nodes connected by a spine, an animated
 * "data packet" flowing down the spine, a highlighted active stage, and a
 * feedback-loop return line indicating evaluation feeding back to inputs.
 */
export default function PipelineDiagram({
  stages,
  active,
  reduced = false,
}: PipelineDiagramProps) {
  return (
    <div className="relative rounded-2xl border border-line bg-surface/40 p-6 sm:p-8">
      <div className="relative pr-10">
        {/* Spine */}
        <span
          aria-hidden="true"
          className="absolute bottom-7 left-[27px] top-7 w-px bg-line"
        />
        {/* Flowing data packet */}
        {!reduced && (
          <span
            aria-hidden="true"
            className="absolute left-[27px] -translate-x-1/2 animate-[neq-flow_4s_linear_infinite]"
          >
            <span className="block h-2 w-2 rounded-full bg-gold-soft shadow-[0_0_12px_2px_rgba(226,201,135,0.7)]" />
          </span>
        )}

        {/* Feedback loop (output → input) */}
        <div
          aria-hidden="true"
          className="absolute bottom-9 right-1 top-9 hidden sm:block"
        >
          <span className="absolute inset-y-0 right-2 w-px border-r border-dashed border-line-gold/50" />
          <ArrowUp className="absolute -top-1 right-0 h-3.5 w-3.5 text-gold/70" strokeWidth={1.5} />
          <span className="absolute right-3 top-1/2 origin-right -translate-y-1/2 rotate-180 whitespace-nowrap text-[0.6rem] uppercase tracking-[0.18em] text-text-muted [writing-mode:vertical-rl]">
            Evaluation feedback
          </span>
        </div>

        <ul className="relative space-y-5">
          {stages.map((stage, i) => {
            const isActive = i === active;
            return (
              <li key={stage.label} className="flex items-center gap-4">
                <span
                  className={`relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border bg-surface-elevated transition-all duration-500 ${
                    isActive
                      ? "border-line-gold text-gold shadow-[0_0_28px_-6px_rgba(200,169,106,0.6)]"
                      : "border-line text-text-secondary"
                  }`}
                >
                  {isActive && !reduced && (
                    <span className="absolute inset-0 animate-ping rounded-xl border border-line-gold opacity-30 [animation-duration:2.5s]" />
                  )}
                  <stage.Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <p
                    className={`font-sans text-[0.62rem] uppercase tracking-[0.2em] transition-colors duration-500 ${
                      isActive ? "text-gold" : "text-text-muted"
                    }`}
                  >
                    {stage.tag}
                  </p>
                  <p
                    className={`font-serif text-lg transition-colors duration-500 ${
                      isActive ? "text-text-primary" : "text-text-secondary"
                    }`}
                  >
                    {stage.label}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
