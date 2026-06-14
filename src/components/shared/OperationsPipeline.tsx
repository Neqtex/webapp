"use client";

import { useEffect, useRef, useState } from "react";
import { Database, Search, Cpu, Workflow, Eye } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import PipelineDiagram, { type PipelineStage } from "./PipelineDiagram";

interface Stage extends PipelineStage {
  body: string;
}

const STAGES: Stage[] = [
  {
    tag: "Inputs",
    label: "Ingest & Curate",
    Icon: Database,
    body: "We bring in the documents, records, and SOPs that hold your operational knowledge, then clean and structure them for safe use — the foundation every reliable system depends on.",
  },
  {
    tag: "Context",
    label: "Retrieve",
    Icon: Search,
    body: "When a request comes in, the system pulls only the relevant context from your knowledge base through retrieval — so responses are grounded in your business, not the open internet.",
  },
  {
    tag: "Model",
    label: "Reason",
    Icon: Cpu,
    body: "A right-sized or fine-tuned model interprets the task using that context — drafting, classifying, summarizing, or deciding — within the guardrails you define.",
  },
  {
    tag: "Action",
    label: "Automate",
    Icon: Workflow,
    body: "Approved outputs trigger work across your operational systems: routing tasks, updating records, generating documents, or moving a process forward.",
  },
  {
    tag: "Oversight",
    label: "Review & Improve",
    Icon: Eye,
    body: "People review what matters, while evaluation and monitoring feed results back into the pipeline — so quality compounds over time instead of drifting.",
  },
];

interface OperationsPipelineProps {
  /** Adds a top border to separate from a preceding section. */
  bordered?: boolean;
}

export default function OperationsPipeline({
  bordered = true,
}: OperationsPipelineProps) {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index ?? 0));
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`py-20 sm:py-24 lg:py-32 ${bordered ? "border-t border-line" : ""}`}
    >
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>How It Runs</Eyebrow>
          <h2 className="mt-6 text-balance">
            From raw information to operational action.
          </h2>
          <p className="mt-6 text-text-secondary">
            Every Neqtex system follows the same disciplined pipeline — work
            flows from your data, through retrieval and reasoning, into action,
            with oversight feeding quality back to the start.
          </p>
        </div>

        <div className="mt-14 lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Pinned graph */}
          <div className="lg:sticky lg:top-24 lg:flex lg:h-[80vh] lg:flex-col lg:justify-center">
            <PipelineDiagram stages={STAGES} active={active} reduced={reduced} />
          </div>

          {/* Scrolling explanations */}
          <ol className="mt-10 lg:mt-0">
            {STAGES.map((stage, i) => (
              <li
                key={stage.label}
                data-index={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="border-b border-line py-8 last:border-b-0 lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center lg:border-b-0 lg:py-0"
              >
                <div
                  className={`transition-opacity duration-500 ${
                    active === i ? "lg:opacity-100" : "lg:opacity-40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-gold lg:hidden">
                      <stage.Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <span className="font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
                      {String(i + 1).padStart(2, "0")} — {stage.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl sm:text-3xl">
                    {stage.label}
                  </h3>
                  <p className="mt-4 max-w-md text-text-secondary">
                    {stage.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
