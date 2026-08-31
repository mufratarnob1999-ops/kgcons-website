import Link from "next/link";
import { cn } from "@/lib/cn";
import { socialIcons } from "@/content/socialIcons";

type Glyph = "facebook" | "instagram" | "tiktok";

const glyphs: Record<Glyph, React.ReactNode> = {
  facebook: (
    <path
      d="M13.5 8.5h1.8V6.1h-1.8c-1.7 0-3 1.3-3 3v1.4H9v2.4h1.5V18h2.4v-5.1h1.8l.3-2.4h-2.1V9.1c0-.3.3-.6.6-.6Z"
      fill="currentColor"
    />
  ),
  instagram: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="4.2" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="15.9" cy="8.1" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: (
    <path
      d="M13.2 5.5c.3 1.5 1.3 2.6 3 2.8v2.1c-1.1 0-2.1-.3-3-1v4.6a4 4 0 1 1-4-4c.2 0 .4 0 .6.05v2.15a1.9 1.9 0 1 0 1.4 1.83V5.5h2Z"
      fill="currentColor"
    />
  ),
};

/**
 * Facebook, Instagram and TikTok as a small icon row — the geometric,
 * rounded-square container matches the near-square-corner token so this
 * reads as part of the same system rather than a bolted-on widget.
 */
export function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socialIcons.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            aria-label={item.name}
            className="group flex h-9 w-9 items-center justify-center rounded-edge border border-hairline text-muted transition-colors duration-150 ease-standard hover:border-neutral hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              {glyphs[item.name.toLowerCase() as Glyph]}
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}
