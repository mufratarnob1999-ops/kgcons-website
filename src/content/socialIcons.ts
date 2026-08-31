/**
 * The social icon row shown in the footer and on /contact.
 *
 * Facebook has a real profile — see site.ts. Instagram and TikTok don't
 * have live links yet, so they point at "/" for now rather than nowhere.
 * Update `href` here the moment a real profile exists; nothing else needs
 * to change.
 */
export const socialIcons = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/p/Kishoreganj-Consultancy-61594207731801/",
  },
  { name: "Instagram", href: "/" },
  { name: "TikTok", href: "/" },
] as const;
