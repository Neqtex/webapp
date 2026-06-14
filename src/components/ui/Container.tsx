import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** narrow caps width at ~880px for reading-length content */
  size?: "default" | "narrow" | "wide";
}

const widths: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export default function Container({
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 ${widths[size]} ${className}`}>
      {children}
    </div>
  );
}
