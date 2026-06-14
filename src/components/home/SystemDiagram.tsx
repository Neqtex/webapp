"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Database, Workflow, Bot, Cpu, ShieldCheck } from "lucide-react";

const NODES = [
  { label: "Data", Icon: Database, x: 50, y: 6, depth: 38 },
  { label: "Workflows", Icon: Workflow, x: 92, y: 33, depth: 30 },
  { label: "Assistants", Icon: Bot, x: 78, y: 88, depth: 34 },
  { label: "Models", Icon: Cpu, x: 22, y: 88, depth: 34 },
  { label: "Governance", Icon: ShieldCheck, x: 8, y: 33, depth: 30 },
];

/**
 * Abstract "AI operating system" diagram. A central Neqtex node connected to
 * surrounding capability nodes. Animated (rotating orbit rings, traveling data
 * pulses, pulsing core) and interactive (pointer-driven 3D parallax tilt).
 * Ambient motion runs on every device; pointer/touch tilt layers on top.
 * Fully static under prefers-reduced-motion.
 */
export default function SystemDiagram() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number>(0);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const applyTilt = (rx: number, ry: number) => {
    const scene = sceneRef.current;
    if (!scene) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      scene.style.setProperty("--rx", `${rx}deg`);
      scene.style.setProperty("--ry", `${ry}deg`);
    });
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // Invert Y so moving up tilts the top toward the viewer.
    applyTilt(-py * 16, px * 18);
    if (!active) setActive(true);
  };

  const handleLeave = () => {
    setActive(false);
    applyTilt(0, 0);
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const sceneStyle: CSSProperties = {
    transform:
      "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
    transformStyle: "preserve-3d",
    transition: active
      ? "transform 0.12s ease-out"
      : "transform 0.9s cubic-bezier(0.22,1,0.36,1)",
  };

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handleLeave}
      className="relative mx-auto aspect-square w-full max-w-[440px]"
      style={{ perspective: "1100px" }}
    >
      <div ref={sceneRef} className="relative h-full w-full" style={sceneStyle}>
        {/* Lines + animated data pulses */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          {/* Slowly rotating decorative rings */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgba(244,240,232,0.06)"
            strokeWidth="0.3"
            strokeDasharray="0.6 5"
            style={
              reduced
                ? undefined
                : {
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    animation: "neq-spin 80s linear infinite",
                  }
            }
          />
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="none"
            stroke="rgba(200,169,106,0.14)"
            strokeWidth="0.3"
            strokeDasharray="1 4"
            style={
              reduced
                ? undefined
                : {
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    animation: "neq-spin-rev 55s linear infinite",
                  }
            }
          />

          {NODES.map((n, i) => (
            <g key={n.label}>
              <line
                x1="50"
                y1="50"
                x2={n.x}
                y2={n.y}
                stroke="rgba(200,169,106,0.30)"
                strokeWidth="0.3"
              />
              {!reduced && (
                <circle r="0.9" fill="#e2c987">
                  <animateMotion
                    dur="3.4s"
                    begin={`${i * 0.55}s`}
                    repeatCount="indefinite"
                    path={`M50,50 L${n.x},${n.y}`}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.7;1"
                    dur="3.4s"
                    begin={`${i * 0.55}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          ))}
        </svg>

        {/* Center node — lifted toward the viewer in 3D */}
        <div
          className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line-gold bg-surface-elevated shadow-[0_0_50px_-12px_rgba(200,169,106,0.5)]"
          style={{ transform: "translate(-50%,-50%) translateZ(60px)" }}
        >
          {!reduced && (
            <>
              <span className="absolute inset-0 animate-[neq-pulse-soft_4s_ease-in-out_infinite] rounded-full border border-line-gold" />
              <span className="absolute inset-0 animate-ping rounded-full border border-line-gold opacity-20 [animation-duration:3.5s]" />
            </>
          )}
          <span className="font-serif text-xl text-gradient-gold">Neqtex</span>
        </div>

        {/* Outer nodes — each at its own depth for parallax separation */}
        {NODES.map(({ label, Icon, x, y, depth }) => (
          <div
            key={label}
            className="group absolute flex flex-col items-center gap-1.5"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%,-50%) translateZ(${depth}px)`,
            }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-gold transition-colors duration-300 group-hover:border-line-gold">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <span className="text-[0.7rem] tracking-wide text-text-secondary">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
