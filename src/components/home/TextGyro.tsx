"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Vector3, type Group } from "three";
import {
  measureNaturalWidth,
  prepareWithSegments,
} from "@chenglou/pretext";
import {
  Crystal,
  Lights,
  Nucleus,
  Rig,
  supportsWebGL,
} from "./gyroPrimitives";
import { COLUMN_INK, LEFT, RIGHT } from "./statementCopy";

const WORDS = [...LEFT, ...RIGHT].join(" ").split(/\s+/).filter(Boolean);
const TAU = Math.PI * 2;
const CAMERA_Z = 8.6;
const FOV = 36;
const CRYSTAL_R = 1.22;
const WORLD_H = 2 * Math.tan(((FOV * Math.PI) / 180) / 2) * CAMERA_Z;

type Token = { text: string; width: number };
type Glyph = Token & { theta: number };

const RING_DEFS: Array<{
  radius: number;
  tilt: [number, number, number];
  speed: number;
  offset: number;
}> = [
  { radius: 1.62, tilt: [Math.PI / 2, 0, 0], speed: 0.32, offset: 0 },
  { radius: 2.02, tilt: [Math.PI / 3.2, 0.55, 0.18], speed: -0.24, offset: 9 },
  { radius: 2.46, tilt: [1.12, -0.48, 0.36], speed: 0.16, offset: 18 },
];

function packRing(
  tokens: Token[],
  radius: number,
  start: number,
  pxPerWorld: number,
  gap: number,
): Glyph[] {
  const room = TAU * radius * pxPerWorld;
  const picked: Token[] = [];
  let cursor = start;
  let taken = 0;
  while (taken < room) {
    const token = tokens[cursor % tokens.length];
    if (taken + token.width + gap > room && picked.length) break;
    picked.push(token);
    taken += token.width + gap;
    cursor += 1;
  }
  const extra = Math.max(0, room - taken) / Math.max(1, picked.length);
  const step = gap + extra;
  let theta = 0;
  return picked.map((token) => {
    const span = (token.width + step) / (radius * pxPerWorld);
    const mid = theta + span / 2;
    theta += span;
    return { ...token, theta: mid };
  });
}

const worldPos = new Vector3();
const projected = new Vector3();

function coversOrb(
  x: number,
  y: number,
  width: number,
  height: number,
  wordWidth: number,
) {
  const r = (CRYSTAL_R / WORLD_H) * height + wordWidth * 0.5;
  const dx = x - width / 2;
  const dy = y - height / 2;
  return dx * dx + dy * dy < r * r;
}

function HtmlRing({
  radius,
  tilt,
  speed,
  glyphs,
  reduced,
  layer,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  glyphs: Glyph[];
  reduced: boolean;
  layer: HTMLDivElement | null;
}) {
  const spin = useRef<Group>(null);
  const spans = useRef<HTMLSpanElement[]>([]);
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    if (!layer) return;
    const nodes: HTMLSpanElement[] = [];
    for (const glyph of glyphs) {
      const span = document.createElement("span");
      span.textContent = glyph.text;
      span.style.position = "absolute";
      span.style.left = "0";
      span.style.top = "0";
      span.style.whiteSpace = "nowrap";
      span.style.willChange = "transform, opacity";
      span.style.pointerEvents = "none";
      layer.appendChild(span);
      nodes.push(span);
    }
    spans.current = nodes;
    return () => {
      for (const node of nodes) node.remove();
      spans.current = [];
    };
  }, [layer, glyphs]);

  useFrame((_, dt) => {
    if (!spin.current) return;
    if (!reduced) spin.current.rotation.z += speed * dt;

    const nodes = spans.current;
    if (!nodes.length) return;

    for (let i = 0; i < glyphs.length; i += 1) {
      const glyph = glyphs[i];
      const node = nodes[i];
      if (!node) continue;

      worldPos.set(
        radius * Math.cos(glyph.theta),
        radius * Math.sin(glyph.theta),
        0,
      );
      spin.current.localToWorld(worldPos);
      projected.copy(worldPos).project(camera);

      const x = (projected.x * 0.5 + 0.5) * size.width;
      const y = (-projected.y * 0.5 + 0.5) * size.height;
      const front = Math.max(0, Math.min(1, 0.5 - projected.z));
      const hidden = coversOrb(x, y, size.width, size.height, glyph.width);

      node.style.opacity = hidden ? "0" : (0.42 + 0.58 * front).toFixed(3);
      node.style.visibility = hidden ? "hidden" : "visible";
      node.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    }
  });

  return (
    <group rotation={tilt}>
      <group ref={spin} />
    </group>
  );
}

function Scene({
  reduced,
  allowDrag,
  rings,
}: {
  reduced: boolean;
  allowDrag: boolean;
  rings: Glyph[][];
}) {
  const parent = useThree((state) => state.gl.domElement.parentElement);
  const [layer, setLayer] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!parent) return;
    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.className = "font-serif text-[1.02rem] font-normal";
    el.style.cssText = `position:absolute;inset:0;pointer-events:none;overflow:hidden;color:${COLUMN_INK}`;
    parent.appendChild(el);
    setLayer(el);
    return () => {
      el.remove();
      setLayer(null);
    };
  }, [parent]);

  return (
    <>
      <Lights />
      <Rig reduced={reduced} allowDrag={allowDrag}>
        <Nucleus reduced={reduced} />
        <Crystal dense />
        {RING_DEFS.map((def, i) => (
          <HtmlRing
            key={def.radius}
            radius={def.radius}
            tilt={def.tilt}
            speed={def.speed}
            glyphs={rings[i] ?? []}
            reduced={reduced}
            layer={layer}
          />
        ))}
      </Rig>
    </>
  );
}

function CoreFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-44 w-44 rounded-full border border-line-gold bg-surface-elevated shadow-[0_0_80px_-10px_rgba(200,169,106,0.55)]" />
    </div>
  );
}

function pxPerWorldAt(width: number) {
  const worldH = 2 * Math.tan(((FOV * Math.PI) / 180) / 2) * CAMERA_Z;
  return width / worldH;
}

/** Crystal gyro whose rings are the same HTML type as the magazine columns. */
export default function TextGyro({
  className = "",
  caption = true,
}: {
  className?: string;
  caption?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [allowDrag, setAllowDrag] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [inView, setInView] = useState(true);
  const [rings, setRings] = useState<Glyph[][]>([]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const sync = () => {
      setReduced(motion.matches);
      setAllowDrag(!coarse.matches);
    };
    sync();
    setWebgl(supportsWebGL());
    motion.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let cancelled = false;

    const measure = () => {
      const probe = document.createElement("span");
      probe.className = "font-serif text-[1.02rem] font-normal";
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
      wrap.appendChild(probe);
      const style = getComputedStyle(probe);
      const spacing =
        style.letterSpacing === "normal" ? 0 : parseFloat(style.letterSpacing);
      const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const gap = Math.max(6, parseFloat(style.fontSize) * 0.33);
      const tokens = WORDS.map((text) => ({
        text,
        width: measureNaturalWidth(
          prepareWithSegments(text, font, { letterSpacing: spacing || 0 }),
        ),
      }));
      probe.remove();

      const scale = pxPerWorldAt(wrap.clientWidth);
      setRings(
        RING_DEFS.map((def) =>
          packRing(tokens, def.radius, def.offset, scale, gap),
        ),
      );
    };

    document.fonts.ready.then(() => {
      if (cancelled) return;
      measure();
    });

    const observer = new ResizeObserver(() => {
      if (!cancelled) measure();
    });
    observer.observe(wrap);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="A crystalline core held inside three rings of rotating text."
      className={`relative mx-auto w-full max-w-[720px] font-serif text-[1.02rem] font-normal ${className} ${
        allowDrag ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[10%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(200,169,106,0.4),transparent_68%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[16%] left-1/2 h-10 w-[48%] -translate-x-1/2 rounded-full bg-black/45 blur-xl"
      />

      <div className="relative aspect-square w-full">
        {webgl ? (
          <Canvas
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
            }}
            dpr={[1, 1.75]}
            camera={{ position: [0, 0.06, CAMERA_Z], fov: FOV }}
            frameloop={reduced || !inView ? "demand" : "always"}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <Scene reduced={reduced} allowDrag={allowDrag} rings={rings} />
          </Canvas>
        ) : (
          <CoreFallback />
        )}
      </div>

      {caption && allowDrag && !reduced ? (
        <p className="pointer-events-none mt-1 text-center font-sans text-[0.62rem] uppercase tracking-[0.18em] text-text-muted">
          Drag to inspect
        </p>
      ) : null}
    </div>
  );
}
