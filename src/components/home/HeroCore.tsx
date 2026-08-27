"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Group, Mesh } from "three";

const GOLD = "#c8a96a";
const GOLD_SOFT = "#e2c987";
const BRONZE = "#8a6a3f";

function Lights() {
  return (
    <>
      <ambientLight intensity={0.28} color="#f4f0e8" />
      <directionalLight
        position={[3.8, 4.2, 2.4]}
        intensity={2.2}
        color={GOLD_SOFT}
      />
      <directionalLight
        position={[-3.2, -0.6, 2.2]}
        intensity={0.55}
        color="#7f8aa3"
      />
      <directionalLight
        position={[0.2, 1.4, -4]}
        intensity={0.45}
        color={GOLD}
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={3.4}
        color={GOLD}
        distance={6.5}
      />
    </>
  );
}

function Nucleus({ reduced }: { reduced: boolean }) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current || reduced) return;
    const s = 0.94 + Math.sin(state.clock.elapsedTime * 1.55) * 0.07;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.3, 0]} />
      <meshBasicMaterial color={GOLD_SOFT} />
    </mesh>
  );
}

function Crystal() {
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[1.08, 0]} />
        <meshStandardMaterial
          color="#161512"
          metalness={0.62}
          roughness={0.26}
          emissive="#3d3118"
          emissiveIntensity={0.45}
        />
      </mesh>
      <mesh scale={1.005}>
        <icosahedronGeometry args={[1.08, 0]} />
        <meshBasicMaterial
          color={GOLD_SOFT}
          wireframe
          transparent
          opacity={0.78}
        />
      </mesh>
    </group>
  );
}

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
  const spin = useRef<Mesh>(null);

  useFrame((_, dt) => {
    if (reduced || !spin.current) return;
    spin.current.rotation.z += speed * dt;
  });

  return (
    <group rotation={tilt}>
      <mesh ref={spin}>
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
  );
}

function Rig({
  children,
  reduced,
  allowDrag,
}: {
  children: ReactNode;
  reduced: boolean;
  allowDrag: boolean;
}) {
  const group = useRef<Group>(null);
  const target = useRef({ x: 0.22, y: 0.55 });
  const current = useRef({ x: 0.22, y: 0.55 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const { gl, invalidate } = useThree();

  useEffect(() => {
    if (!allowDrag) return;
    const el = gl.domElement;

    const onDown = (event: PointerEvent) => {
      dragging.current = true;
      last.current = { x: event.clientX, y: event.clientY };
      el.setPointerCapture(event.pointerId);
    };

    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      const dx = event.clientX - last.current.x;
      const dy = event.clientY - last.current.y;
      last.current = { x: event.clientX, y: event.clientY };
      target.current.y += dx * 0.0075;
      target.current.x = Math.max(
        -0.85,
        Math.min(0.85, target.current.x + dy * 0.0075),
      );
      invalidate();
    };

    const onUp = (event: PointerEvent) => {
      dragging.current = false;
      if (el.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId);
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [allowDrag, gl, invalidate]);

  useFrame((_, dt) => {
    if (!group.current) return;
    if (!dragging.current && !reduced) {
      target.current.y += dt * 0.28;
    }
    const lerp = 1 - Math.exp(-8 * dt);
    current.current.x += (target.current.x - current.current.x) * lerp;
    current.current.y += (target.current.y - current.current.y) * lerp;
    group.current.rotation.x = current.current.x;
    group.current.rotation.y = current.current.y;
  });

  return <group ref={group}>{children}</group>;
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

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
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
