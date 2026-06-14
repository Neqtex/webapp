import { ReactNode } from "react";
import Container from "./Container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  containerSize?: "default" | "narrow" | "wide";
  /** render section without the inner Container */
  bare?: boolean;
  "aria-label"?: string;
}

export default function Section({
  children,
  className = "",
  id,
  containerSize = "default",
  bare = false,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 sm:py-24 lg:py-32 ${className}`}
      {...rest}
    >
      {bare ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  );
}
