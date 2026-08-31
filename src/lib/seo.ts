import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Builds the metadata object for a page.
 *
 * Every page should export:
 *   export const metadata = pageMetadata({ title: "...", description: "..." });
 *
 * This keeps titles, link previews and canonical URLs consistent without
 * repeating the same block on every route.
 */
export function pageMetadata({
  title,
  description = site.description,
  path = "/",
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Structured data describing the organisation. Search engines use this to
 * understand who the site belongs to. Extend it once real details exist.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.contact.email,
    ...(site.social.length > 0 && {
      sameAs: site.social.map((s) => s.href),
    }),
  };
}
