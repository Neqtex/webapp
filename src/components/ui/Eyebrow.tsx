import { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  plain?: boolean;
  as?: "p" | "span" | "div";
}

export default function Eyebrow({
  children,
  className = "",
  plain = false,
  as: Tag = "p",
}: EyebrowProps) {
  return (
    <Tag className={`eyebrow ${plain ? "eyebrow--plain" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
