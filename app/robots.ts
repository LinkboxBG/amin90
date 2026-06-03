import type { MetadataRoute } from "next";
import { SITE_URL, IS_STAGING } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (IS_STAGING) {
    // Preview / staging — без индексиране
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }
  // Production
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
