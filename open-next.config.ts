import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/*
  Every route on this site is statically generated (see `next build` output
  — every page is marked ○ Static). There's no ISR/revalidation happening,
  so the default in-memory cache is enough; no R2 bucket needed.
*/
export default defineCloudflareConfig();
