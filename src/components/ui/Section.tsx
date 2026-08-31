import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  children: React.ReactNode;
  /** Sets the HTML id so the section can be linked to directly. */
  id?: string;
  className?: string;
  /** Vertical breathing room. Large sections feel more considered. */
  space?: "compact" | "default" | "generous";
  /** "surface" lifts the band slightly out of the page background. */
  tone?: "canvas" | "surface";
  /** A hairline rule across the top, used to separate adjacent bands. */
  divided?: boolean;
  width?: "default" | "wide" | "narrow";
};

const spacing = {
  compact: "py-16 md:py-20",
  default: "py-20 md:py-28 lg:py-32",
  generous: "py-28 md:py-36 lg:py-44",
};

/**
 * A horizontal band of the page. Handles background, top rule and vertical
 * padding so individual sections never set their own margins — which is the
 * usual cause of inconsistent spacing later on.
 */
export function Section({
  children,
  id,
  className,
  space = "default",
  tone = "canvas",
  divided = false,
  width = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        spacing[space],
        tone === "surface" && "bg-surface",
        divided && "border-t border-hairline",
        className,
      )}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}
