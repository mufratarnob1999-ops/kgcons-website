import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "quiet";
type Size = "md" | "lg";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsLink = BaseProps & {
  href: string;
  type?: never;
  onClick?: never;
  disabled?: never;
};

type ButtonAsButton = BaseProps & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const base =
  "inline-flex items-center justify-center rounded-edge font-sans font-medium " +
  "transition-colors duration-150 ease-standard " +
  "disabled:opacity-50 disabled:pointer-events-none";

/*
  Only "solid" uses the accent colour, and there should be at most one solid
  button visible on screen at a time. That restraint is what keeps the accent
  reading as emphasis rather than decoration.
*/
const variants: Record<Variant, string> = {
  solid: "bg-accent text-canvas hover:bg-ink",
  outline:
    "border border-hairline text-ink hover:border-neutral hover:bg-surface",
  quiet: "text-muted hover:text-ink underline-offset-4 hover:underline px-0",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-small",
  lg: "h-13 px-7 text-body",
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "solid",
    size = "md",
    className,
    ...rest
  } = props;

  const classes = cn(
    base,
    variants[variant],
    variant === "quiet" ? "h-auto" : sizes[size],
    className,
  );

  if ("href" in rest && rest.href) {
    return (
      <Link href={rest.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = rest as ButtonAsButton;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
