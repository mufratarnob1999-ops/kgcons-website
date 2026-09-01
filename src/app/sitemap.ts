import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/* Add each new route here as it is built. */
const routes = [
  "/",
  "/services",
  "/approach",
  "/consultation",
  "/schedule",
  "/about",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
  "/legal/refund",
];

const legalRoutes = new Set(["/legal/privacy", "/legal/terms", "/legal/refund"]);

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : legalRoutes.has(route) ? 0.3 : 0.7,
  }));
}
