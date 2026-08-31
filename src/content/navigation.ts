/**
 * Navigation.
 *
 * The header and footer both read from here, so a link only ever needs to
 * be added in one place.
 *
 * `primary` is the main header navigation. When the Student Consultancy
 * division launches, it becomes a second entry alongside these, and the
 * routes below move under a `/social` prefix. Nothing else has to change.
 */

export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "What we do", href: "/services" },
  { label: "How we work", href: "/approach" },
  { label: "About", href: "/about" },
];

/** The single call to action in the header. */
export const primaryCta: NavLink = {
  label: "Book a consultation",
  href: "/consultation",
};

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Consultancy",
    links: [
      { label: "What we do", href: "/services" },
      { label: "How we work", href: "/approach" },
      { label: "Book a consultation", href: "/consultation" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];
