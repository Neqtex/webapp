import Container from "@/components/ui/Container";
import { TRUST_SIGNALS } from "@/lib/constants";

export default function TrustStrip() {
  return (
    <div className="border-y border-line bg-surface/30">
      <Container>
        <ul className="grid grid-cols-2 divide-line text-center sm:grid-cols-4 sm:divide-x">
          {TRUST_SIGNALS.map((signal) => (
            <li
              key={signal}
              className="px-4 py-6 text-xs font-medium uppercase tracking-[0.16em] text-text-muted"
            >
              {signal}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
