import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/**
 * The wordmark is set in the display face at a tight tracking. Until there
 * is a real logotype, confident typography is the identity.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-baseline gap-2 font-display",
        className,
      )}
    >
      <span className="text-[1.0625rem] font-bold tracking-[-0.02em] text-ink">
        {site.shortName}
      </span>
      <span className="text-small font-medium tracking-[-0.01em] text-muted transition-colors duration-150 ease-standard group-hover:text-neutral">
        Consultancy
      </span>
    </Link>
  );
}
