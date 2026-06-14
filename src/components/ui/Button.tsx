import { ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  external?: boolean;
  type?: never;
  onClick?: never;
}

interface ActionButtonProps extends BaseProps {
  href?: never;
  external?: never;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    className = "",
    fullWidth = false,
  } = props;

  const classes = `btn ${variantClass[variant]} ${
    fullWidth ? "w-full" : ""
  } ${className}`.trim();

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = props as ActionButtonProps;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
