import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { LogoMark } from "./LogoMark";

/**
 * The mark plus the wordmark, set in the display face at a tight tracking.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 font-display",
        className,
      )}
    >
      <LogoMark className="h-7 w-7 text-ink transition-colors duration-150 ease-standard group-hover:text-neutral" />
      <span className="flex items-baseline gap-2">
        <span className="text-[1.0625rem] font-bold tracking-[-0.02em] text-ink">
          {site.shortName}
        </span>
        <span className="text-small font-medium tracking-[-0.01em] text-muted transition-colors duration-150 ease-standard group-hover:text-neutral">
          Consultancy
        </span>
      </span>
    </Link>
  );
}
