export default function PageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Base vertical gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#070807_0%,#0b0d0c_100%)]" />
      {/* Soft gold radial, top-right */}
      <div className="absolute -right-1/4 -top-1/4 h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(200,169,106,0.10),transparent_60%)] blur-2xl" />
      {/* Subtle grid */}
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      {/* Fine noise */}
      <div className="bg-noise absolute inset-0 opacity-[0.05]" />
    </div>
  );
}
