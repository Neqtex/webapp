import { Database, GitBranch, Bot, Users } from "lucide-react";

const LAYERS = [
  {
    label: "Business Data",
    description: "Documents, SOPs, records, and operational knowledge.",
    Icon: Database,
  },
  {
    label: "Retrieval · Fine-Tuning · Automation",
    description: "Where raw information becomes usable intelligence.",
    Icon: GitBranch,
  },
  {
    label: "Private AI Assistants",
    description: "Secure assistants operating within controlled environments.",
    Icon: Bot,
  },
  {
    label: "Employees · Teams · Departments",
    description: "The people who put the system to work, with oversight.",
    Icon: Users,
  },
];

/** Layered architecture: data flows upward into the hands of teams. */
export default function ArchitectureDiagram() {
  return (
    <div className="flex flex-col gap-3">
      {LAYERS.map((layer, i) => (
        <div key={layer.label} className="relative">
          <div className="card flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-line-gold text-gold">
              <layer.Icon className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <div>
              <p className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-text-muted">
                Layer {i + 1}
              </p>
              <p className="font-serif text-lg text-text-primary">
                {layer.label}
              </p>
              <p className="text-sm text-text-secondary">{layer.description}</p>
            </div>
          </div>
          {i < LAYERS.length - 1 && (
            <div
              aria-hidden="true"
              className="mx-auto h-3 w-px bg-gradient-to-b from-line-gold to-transparent"
            />
          )}
        </div>
      ))}
    </div>
  );
}
