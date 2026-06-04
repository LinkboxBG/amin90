import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return allRoutes.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority:
      route === "/"
        ? 1
        : route.startsWith("/pogrebalna-agenciya-")
          ? 0.7
          : route === "/ceni" || route === "/kontakti"
            ? 0.9
            : 0.8,
  }));
}
