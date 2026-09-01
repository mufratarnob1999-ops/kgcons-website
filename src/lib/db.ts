import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Sync mode is correct here — it reads from a value already stashed on
 * globalThis by the Worker entrypoint (or by initOpenNextCloudflareForDev
 * in next.config.ts during `next dev`), and only throws during static
 * generation, which none of the routes calling this go through (they all
 * do request-time work that makes Next treat them as dynamic).
 */
export function getDb(): D1Database {
  return getCloudflareContext().env.DB;
}

export function getEnv(): CloudflareEnv {
  return getCloudflareContext().env;
}
