"use client";

import dynamic from "next/dynamic";

function CorePlaceholder() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(200,169,106,0.22),transparent_68%)] blur-2xl"
      />
    </div>
  );
}

const HeroCore = dynamic(() => import("./HeroCore"), {
  ssr: false,
  loading: () => <CorePlaceholder />,
});

/**
 * Client boundary that lazy-loads the WebGL hero artifact.
 * `ssr: false` must live in a Client Component under Next.js 16.
 */
export default function SystemDiagram() {
  return <HeroCore />;
}
