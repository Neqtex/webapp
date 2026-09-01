"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";
import {
  Crystal,
  GOLD,
  GOLD_SOFT,
  BRONZE,
  Lights,
  Nucleus,
  Rig,
  supportsWebGL,
} from "./gyroPrimitives";

function GyroRing({
  radius,
  tube,
  color,
  tilt,
  speed,
  reduced,
}: {
  radius: number;
  tube: number;
  color: string;
  tilt: [number, number, number];
  speed: number;
  reduced: boolean;
}) {
  const spin = useRef<Group>(null);

  useFrame((_, dt) => {
    if (reduced || !spin.current) return;
    spin.current.rotation.z += speed * dt;
  });

  return (
    <group rotation={tilt}>
      <group ref={spin}>
        <mesh>
          <torusGeometry args={[radius, tube, 12, 96]} />
          <meshStandardMaterial
            color={color}
            metalness={0.55}
            roughness={0.32}
            emissive={color}
            emissiveIntensity={0.32}
          />
        </mesh>
      </group>
    </group>
  );
}

function CoreScene({
  reduced,
  allowDrag,
}: {
  reduced: boolean;
  allowDrag: boolean;
}) {
  return (
    <>
      <Lights />
      <Rig reduced={reduced} allowDrag={allowDrag}>
        <Nucleus reduced={reduced} />
        <Crystal />
        <GyroRing
          radius={1.58}
          tube={0.018}
          color={GOLD}
          tilt={[Math.PI / 2, 0, 0]}
          speed={0.32}
          reduced={reduced}
        />
        <GyroRing
          radius={1.86}
          tube={0.014}
          color={GOLD_SOFT}
          tilt={[Math.PI / 3.2, 0.55, 0.18]}
          speed={-0.24}
          reduced={reduced}
        />
        <GyroRing
          radius={2.16}
          tube={0.01}
          color={BRONZE}
          tilt={[1.12, -0.48, 0.36]}
          speed={0.16}
          reduced={reduced}
        />
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

/** WebGL scene for the hero artifact. Loaded client-only via SystemDiagram. */
export default function HeroCore() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [allowDrag, setAllowDrag] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [inView, setInView] = useState(true);

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

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="A three-dimensional crystalline core held inside rotating gold rings."
      className={`relative mx-auto w-full max-w-[560px] ${
        allowDrag ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(200,169,106,0.22),transparent_68%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[18%] left-1/2 h-10 w-[48%] -translate-x-1/2 rounded-full bg-black/45 blur-xl"
      />

      <div className="aspect-square w-full">
        {webgl ? (
          <Canvas
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
            }}
            dpr={[1, 1.75]}
            camera={{ position: [0, 0.06, 8.2], fov: 36 }}
            frameloop={reduced || !inView ? "demand" : "always"}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <CoreScene reduced={reduced} allowDrag={allowDrag} />
          </Canvas>
        ) : (
          <CoreFallback />
        )}
      </div>

      {allowDrag && !reduced ? (
        <p className="pointer-events-none mt-1 text-center font-sans text-[0.62rem] uppercase tracking-[0.18em] text-text-muted">
          Drag to inspect
        </p>
      ) : null}
    </div>
  );
}
