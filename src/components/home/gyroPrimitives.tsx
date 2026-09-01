"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { FrontSide, type Group, type Mesh } from "three";

export const GOLD = "#c8a96a";
export const GOLD_SOFT = "#e2c987";
export const BRONZE = "#8a6a3f";

export function Lights() {
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

export function Nucleus({ reduced }: { reduced: boolean }) {
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

export function Crystal({ dense = false }: { dense?: boolean }) {
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[1.08, 0]} />
        <meshStandardMaterial
          color={dense ? "#453a28" : "#161512"}
          metalness={dense ? 0.4 : 0.62}
          roughness={dense ? 0.4 : 0.26}
          emissive={dense ? "#8a682c" : "#3d3118"}
          emissiveIntensity={dense ? 1.05 : 0.45}
        />
      </mesh>
      <mesh scale={1.004}>
        <icosahedronGeometry args={[1.08, 0]} />
        <meshBasicMaterial
          color={GOLD_SOFT}
          wireframe
          transparent={!dense}
          opacity={dense ? 1 : 0.78}
          depthWrite={false}
          side={dense ? FrontSide : undefined}
        />
      </mesh>
    </group>
  );
}

export function Rig({
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

export function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
