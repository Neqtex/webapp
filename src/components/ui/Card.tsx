import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "li";
}

export default function Card({
  children,
  className = "",
  hover = true,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag className={`card ${hover ? "card-hover" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
