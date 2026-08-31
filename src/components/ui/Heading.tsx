import { cn } from "@/lib/cn";

type HeadingProps = {
  children: React.ReactNode;
  /**
   * The HTML heading level. Choose this for document structure and screen
   * readers — a page should have exactly one h1, and levels should not skip.
   */
  as?: "h1" | "h2" | "h3" | "h4";
  /** The visual size, chosen independently of the level above. */
  size?: "display" | "title" | "heading" | "subheading";
  className?: string;
};

const sizes = {
  display: "text-display",
  title: "text-title",
  heading: "text-heading",
  subheading: "text-subheading",
};

/**
 * Editorial typography is the core of this identity, so headings are a
 * primitive rather than ad-hoc classes. Size and semantic level are kept
 * separate: a visually large heading can still correctly be an h2.
 */
export function Heading({
  children,
  as: Tag = "h2",
  size = "heading",
  className,
}: HeadingProps) {
  return (
    <Tag className={cn("font-display text-ink", sizes[size], className)}>
      {children}
    </Tag>
  );
}
