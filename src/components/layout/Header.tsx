"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { primaryNav, primaryCta } from "@/content/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /* The rule under the header only appears once the page has moved, so the
     top of a page reads as one uninterrupted field. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the menu on navigation. */
  useEffect(() => setOpen(false), [pathname]);

  /* While the menu is open: stop the page behind it scrolling, and let
     Escape close it. Both are expected behaviours for a modal surface. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-canvas transition-colors duration-300 ease-standard",
        scrolled && !open && "border-b border-hairline",
      )}
    >
      <Container>
        <div className="flex h-18 items-center justify-between md:h-20">
          <Wordmark />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-9 md:flex"
          >
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "text-small transition-colors duration-150 ease-standard",
                  pathname === link.href
                    ? "text-ink"
                    : "text-muted hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/account"
              aria-current={pathname === "/account" ? "page" : undefined}
              className={cn(
                "text-small transition-colors duration-150 ease-standard",
                pathname === "/account"
                  ? "text-ink"
                  : "text-muted hover:text-ink",
              )}
            >
              Account
            </Link>
            <Button href={primaryCta.href} variant="solid" size="md">
              {primaryCta.label}
            </Button>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ink md:hidden"
          >
            <span className="sr-only">
              {open ? "Close menu" : "Open menu"}
            </span>
            <MenuGlyph open={open} />
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-18 bottom-0 z-50 overflow-y-auto bg-canvas md:hidden"
        >
          <Container>
            <nav aria-label="Primary" className="flex flex-col pt-6 pb-10">
              {primaryNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-hairline py-5 font-display text-heading text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account"
                className="border-b border-hairline py-5 font-display text-heading text-ink"
              >
                Account
              </Link>
              <Button
                href={primaryCta.href}
                variant="solid"
                size="lg"
                className="mt-8 w-full"
              >
                {primaryCta.label}
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}

/** Two rules that cross into an X when the menu is open. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative block h-4 w-6">
      <span
        className={cn(
          "absolute left-0 h-px w-full bg-current transition-transform duration-300 ease-standard",
          open ? "top-1/2 rotate-45" : "top-1",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-px w-full bg-current transition-transform duration-300 ease-standard",
          open ? "top-1/2 -rotate-45" : "top-3",
        )}
      />
    </span>
  );
}
