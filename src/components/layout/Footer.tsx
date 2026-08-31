import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline">
      <Container>
        <div className="grid gap-14 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="measure mt-5 text-small text-muted">
              {site.description}
            </p>
            <p className="mt-6 text-small text-muted">
              <a
                href={`mailto:${site.contact.email}`}
                className="text-ink underline-offset-4 transition-colors duration-150 ease-standard hover:text-accent hover:underline"
              >
                {site.contact.email}
              </a>
            </p>
            <ul className="mt-4 space-y-1 text-small text-muted">
              {site.entities.map((entity) => (
                <li key={entity.name}>
                  {entity.name} — {entity.jurisdiction}
                </li>
              ))}
            </ul>
            <SocialIcons className="mt-6" />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-6 md:col-start-7">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h2 className="font-display text-small font-semibold text-neutral">
                  {group.heading}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-small text-muted transition-colors duration-150 ease-standard hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-hairline py-8 text-label text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.domain}</p>
        </div>
      </Container>
    </footer>
  );
}
