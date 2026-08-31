import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** "wide" is for full-bleed layouts; "narrow" is for reading-length text. */
  width?: "default" | "wide" | "narrow";
};

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-[78rem]",
  wide: "max-w-[92rem]",
};

/**
 * Every piece of page content sits inside a Container. It owns the maximum
 * width and the left/right gutters, so no section has to think about them.
 */
export function Container({
  children,
  className,
  width = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        widths[width],
        className,
      )}
    >
      {children}
    </div>
  );
}
